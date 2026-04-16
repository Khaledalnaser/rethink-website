import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH    = path.join(__dirname, '../src/data.json');
const HISTORY_PATH = path.join(__dirname, '../src/topics_history.json');
const API_KEY          = process.env.ANTHROPIC_API_KEY;
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
    if (!fs.existsSync(HISTORY_PATH)) return [];
    const raw = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'));
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return raw.filter(t => t.ts > cutoff);
  } catch { return []; }
}

function saveHistory(history, newTopic) {
  const updated = [...history, { topic: newTopic, ts: Date.now() }].slice(-60);
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(updated, null, 2), 'utf-8');
}

async function callClaude(system, user, maxTokens = 1200) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }]
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Claude API error');
  return data.content[0].text.trim();
}

async function researchTopic(topic) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: 'ابحث عن واقعة او رقم حقيقي موثق يتعلق بهذا الموضوع: "' + topic + '". اريد حدثا واحدا غير متوقع. اجب بجملتين بالعربية.' }]
      })
    });
    const data = await res.json();
    const textBlock = data.content?.find(b => b.type === 'text');
    return textBlock?.text?.trim() || '';
  } catch { return ''; }
}

const SYSTEM = 'انت محرر اول في منصة اعد التفكير العربية للتحليل الفكري النقدي. صوتك: محقق لا معلم. متشكك لا منبه. دافئ لا بارد. قواعد الكتابة: الجملة لا تتجاوز 25 كلمة. الفقرة لا تتجاوز 4 جمل. الصوت المبني للمجهول ممنوع. الافتتاحية تبدا بالصدمة لا بالسياق. لا شرطة مضاعفة. ممنوع: في الختام / دعنا نتامل / يعد ذلك / من المؤكد / في عالم / في ظل. الخاتمة تفتح سؤالا لا تغلق اجابة. المكتوب بالعربية لا المترجم اليها.';

async function generateArticle(history) {
  const cats = ['هوية','نقد','ثقافة','فكر','مجتمع'];
  const cat  = cats[Math.floor(Math.random() * cats.length)];
  const used = history.map(h => h.topic).join('، ');

  const topic = await callClaude(SYSTEM,
    'اقترح موضوعا فكريا نقديا في تصنيف "' + cat + '" لمنصة اعد التفكير. المواضيع المستخدمة مؤخرا (تجنبها): ' + (used || 'لا يوجد') + '. اجب بموضوع واحد فقط في جملة واحدة.', 100);

  const research = await researchTopic(topic);

  const diagnostics = await callClaude(SYSTEM,
    'الموضوع: "' + topic + '" واقعة بحثية: "' + research + '" اجب على هذه الاسئلة الخمسة بايجاز (جملة لكل سؤال): 1.لماذا يهم هذا الموضوع الان؟ 2.من يختار الصمت عنه؟ 3.من يستفيد من الرواية السائدة؟ 4.اين يتكرر هذا في التاريخ العربي؟ 5.ماذا يحدث لو طرح على مائدة عشاء عربية؟', 400);

  const raw = await callClaude(SYSTEM,
    'الموضوع: "' + topic + '" التصنيف: ' + cat + ' الواقعة البحثية: "' + research + '" التشخيص: ' + diagnostics + ' اكتب المقال الكامل. ابدا مباشرة بالجملة الافتتاحية الصادمة. لا مقدمات. اجب بـ JSON فقط: {"title":"عنوان جريء لا يتجاوز 7 كلمات","desc":"جملة افتتاحية واحدة تشويقية","body":"نص المقال الكامل"}', 1000);

  const obj   = JSON.parse(raw.replace(/```json|```/g, '').trim());
  const reads = ['٦ د','٧ د','٨ د','٩ د','١٠ د','١٢ د'];
  saveHistory(history, topic);
  return { cat, title: obj.title, desc: obj.desc, body: obj.body || '', date: arabicDate(), read: reads[Math.floor(Math.random() * reads.length)] };
}

async function generateNews() {
  const tags = ['حوار','تغطية','شراكة','جائزة','تقرير','فعالية'];
  const tag  = tags[Math.floor(Math.random() * tags.length)];
  const raw  = await callClaude('انت محرر اخبار لمنصة اعد التفكير الفكرية العربية المستقلة. اكتب بأسلوب صحفي مباشر. لا مبالغة ولا حشو.',
    'اكتب خبرا صحفيا من نوع "' + tag + '" عن نشاط منصة اعد التفكير او تاثيرها. الخبر محدد وواقعي. اجب بـ JSON فقط: {"title":"عنوان الخبر","desc":"وصف الخبر جملة او جملتان"}', 300);
  const obj = JSON.parse(raw.replace(/```json|```/g, '').trim());
  return { tag, title: obj.title, desc: obj.desc, date: arabicDate() };
}

async function generateBusiness() {
  const tags = ['اعلام','استثمار','توسع','تقنية','شراكة','اطلاق'];
  const tag  = tags[Math.floor(Math.random() * tags.length)];
  const raw  = await callClaude('انت محرر اخبار اعمال لمنصة اعد التفكير. اكتب بلغة اعمال واضحة ومباشرة. الارقام والحقائق تتقدم على الانشاء.',
    'اكتب خبر اعمال من نوع "' + tag + '" عن نمو منصة اعد التفكير تجاريا. اجب بـ JSON فقط: {"title":"عنوان الخبر","desc":"وصف الخبر جملة او جملتان"}', 300);
  const obj = JSON.parse(raw.replace(/```json|```/g, '').trim());
  return { tag, title: obj.title, desc: obj.desc, date: arabicDate() };
}

async function main() {
  const t0 = Date.now();
  console.log('ReThink Agent v2.0 — ' + new Date().toISOString());
  if (!API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');

  const data    = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const history = loadHistory();

  console.log('Generating article...');
  const article  = await generateArticle(history);
  console.log('Article: ' + article.title);

  console.log('Generating news...');
  const news     = await generateNews();
  console.log('News: ' + news.title);

  console.log('Generating business news...');
  const business = await generateBusiness();
  console.log('Business: ' + business.title);

  data.articles  = [article,  ...data.articles ].slice(0, 20);
  data.news      = [news,     ...data.news     ].slice(0, 20);
  data.business  = [business, ...data.business ].slice(0, 20);
  data.lastUpdate = new Date().toISOString();

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('Done in ' + elapsed + 's');

  await notify('<b>ReThink Agent</b> — تحديث يومي ناجح\n<b>مقال:</b> ' + article.title + '\n<b>المدة:</b> ' + elapsed + 's');
}

main().catch(async err => {
  console.error('Agent failed:', err.message);
  await notify('<b>ReThink Agent — فشل</b>\n<code>' + err.message + '</code>');
  process.exit(1);
});