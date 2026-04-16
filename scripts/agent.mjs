import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH    = path.join(__dirname, '../src/data.json');
const HISTORY_PATH = path.join(__dirname, '../src/topics_history.json');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TELEGRAM_TOKEN   = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function arabicDate() {
  const d = new Date();
  const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
                  'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const ar = n => String(n).replace(/[0-9]/g, x => '٠١٢٣٤٥٦٧٨٩'[x]);
  return ar(d.getDate()) + ' ' + months[d.getMonth()] + ' ' + ar(d.getFullYear());
}

async function notify(msg) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    await fetch('https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: 'HTML' })
    });
  } catch (e) {}
}

function loadHistory() {
  try {
    if (!fs.existsSync(HISTORY_PATH)) {
      fs.writeFileSync(HISTORY_PATH, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'));
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return raw.filter(t => t.ts > cutoff);
  } catch (e) {
    return [];
  }
}

function saveHistory(history, newTopic) {
  try {
    const updated = [...history, { topic: newTopic, ts: Date.now() }].slice(-60);
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (e) {}
}

async function callGemini(system, user, maxTokens = 1200, attempt = 1) {
  const maxAttempts = 3;
  const backoff = 1000 * attempt;
  
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: system + '\n\n' + user
          }]
        }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.7
        }
      })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error?.message || 'Gemini API error');
    }
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response');
    }
    
    return data.candidates[0].content.parts[0].text.trim();
  } catch (e) {
    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return callGemini(system, user, maxTokens, attempt + 1);
    }
    throw e;
  }
}

const SYSTEM = 'أنت محرر أول في منصة أعد التفكير العربية للتحليل الفكري النقدي. اكتب بأسلوب عميق وتحليلي وجريء.';

async function generateArticle(history) {
  const cats = ['هوية','نقد','ثقافة','فكر','مجتمع'];
  const cat  = cats[Math.floor(Math.random() * cats.length)];
  const used = history.map(h => h.topic).join('، ');

  try {
    const topic = await callGemini(SYSTEM,
      'اقترح موضوعاً فكرياً نقدياً في تصنيف "' + cat + '". المواضيع السابقة: ' + (used || 'لا توجد'));

    const raw = await callGemini(SYSTEM,
      'الموضوع: "' + topic + '"\nالتصنيف: ' + cat + '\n\nاكتب مقالاً عميقاً. اجب بـ JSON:\n{"title":"عنوان","desc":"وصف","body":"محتوى 300+ كلمة"}',
      1500);

    const obj = JSON.parse(raw.replace(/```json|```/g, '').trim());
    const reads = ['٦ د','٧ د','٨ د','٩ د','١٠ د','١٢ د'];
    saveHistory(history, topic);
    return { cat, title: obj.title, desc: obj.desc, body: obj.body || '', date: arabicDate(), read: reads[Math.floor(Math.random() * reads.length)] };
  } catch (e) {
    console.error('Article failed:', e.message);
    throw e;
  }
}

async function generateNews() {
  const tags = ['حوار','تغطية','شراكة','جائزة','تقرير','فعالية'];
  const tag  = tags[Math.floor(Math.random() * tags.length)];
  
  try {
    const raw  = await callGemini('أنت محرر أخبار لأعد التفكير.',
      'خبر "' + tag + '" عن المنصة. اجب بـ JSON:\n{"title":"عنوان","desc":"وصف"}');
    const obj = JSON.parse(raw.replace(/```json|```/g, '').trim());
    return { tag, title: obj.title, desc: obj.desc, date: arabicDate() };
  } catch (e) {
    console.error('News failed:', e.message);
    throw e;
  }
}

async function generateBusiness() {
  const tags = ['إعلام','استثمار','توسع','تقنية','شراكة','إطلاق'];
  const tag  = tags[Math.floor(Math.random() * tags.length)];
  
  try {
    const raw  = await callGemini('أنت محرر أخبار أعمال احترافي.',
      'خبر أعمال "' + tag + '" عن نمو المنصة. اجب بـ JSON:\n{"title":"عنوان","desc":"وصف"}');
    const obj = JSON.parse(raw.replace(/```json|```/g, '').trim());
    return { tag, title: obj.title, desc: obj.desc, date: arabicDate() };
  } catch (e) {
    console.error('Business failed:', e.message);
    throw e;
  }
}

async function main() {
  const t0 = Date.now();
  console.log('ReThink Agent v3.0 (Gemini) — ' + new Date().toISOString());
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');

  try {
    const data    = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    const history = loadHistory();

    console.log('✓ Generating article...');
    const article  = await generateArticle(history);
    console.log('✓ Article: ' + article.title);

    console.log('✓ Generating news...');
    const news     = await generateNews();
    console.log('✓ News: ' + news.title);

    console.log('✓ Generating business...');
    const business = await generateBusiness();
    console.log('✓ Business: ' + business.title);

    data.articles  = [article,  ...data.articles ].slice(0, 20);
    data.news      = [news,     ...data.news     ].slice(0, 20);
    data.business  = [business, ...data.business ].slice(0, 20);
    data.lastUpdate = new Date().toISOString();

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log('✓ Done in ' + elapsed + 's');

    await notify('<b>ReThink Agent ✓</b>\n<b>مقال:</b> ' + article.title + '\n<b>المدة:</b> ' + elapsed + 's');
  } catch (err) {
    console.error('Agent failed:', err.message);
    await notify('<b>❌ ReThink Agent — فشل</b>\n<code>' + err.message.substring(0, 100) + '</code>');
    process.exit(1);
  }
}

main();
