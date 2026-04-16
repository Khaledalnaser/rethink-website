/**
 * ReThink Setup Script v2.0
 * يُنشئ جميع الملفات المصلّحة ويرفعها على GitHub تلقائياً
 * شغّله بهذا الأمر: node setup.mjs
 */

import fs   from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();
const log  = (msg) => console.log('\n' + msg);
const ok   = (msg) => console.log('  ✅ ' + msg);
const info = (msg) => console.log('  → ' + msg);

log('═══════════════════════════════════════════════');
log('  ReThink — نشر الإصلاحات الشاملة v2.0');
log('═══════════════════════════════════════════════');

// ── إنشاء المجلدات ────────────────────────────────────────────────────────
['scripts', '.github/workflows', 'src'].forEach(d => {
  fs.mkdirSync(path.join(ROOT, d), { recursive: true });
});
ok('المجلدات جاهزة');

// ══════════════════════════════════════════════════════════════════════════
//  FILE 1 — src/topics_history.json
// ══════════════════════════════════════════════════════════════════════════
fs.writeFileSync(path.join(ROOT, 'src/topics_history.json'), '[]', 'utf-8');
ok('src/topics_history.json');

// ══════════════════════════════════════════════════════════════════════════
//  FILE 2 — .github/workflows/daily-agent.yml
// ══════════════════════════════════════════════════════════════════════════
const WORKFLOW = `name: ReThink Daily Content Agent

on:
  schedule:
    - cron: '0 16 * * *'
  workflow_dispatch:

jobs:
  generate-content:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: \${{ secrets.GH_TOKEN }}
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Run ReThink AI Content Agent
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
          TELEGRAM_TOKEN: \${{ secrets.TELEGRAM_TOKEN }}
          TELEGRAM_CHAT_ID: \${{ secrets.TELEGRAM_CHAT_ID }}
        run: node scripts/agent.mjs
      - name: Commit and push
        run: |
          git config --global user.email "agent@rethink-platform.com"
          git config --global user.name "ReThink Agent"
          git add src/data.json src/topics_history.json
          git diff --staged --quiet || git commit -m "Daily content update - \$(date +'%Y-%m-%d')"
          git push
`;
fs.writeFileSync(path.join(ROOT, '.github/workflows/daily-agent.yml'), WORKFLOW, 'utf-8');
ok('.github/workflows/daily-agent.yml');

// ══════════════════════════════════════════════════════════════════════════
//  FILE 3 — scripts/agent.mjs
// ══════════════════════════════════════════════════════════════════════════
const AGENT = `
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

  const obj   = JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g, '').trim());
  const reads = ['٦ د','٧ د','٨ د','٩ د','١٠ د','١٢ د'];
  saveHistory(history, topic);
  return { cat, title: obj.title, desc: obj.desc, body: obj.body || '', date: arabicDate(), read: reads[Math.floor(Math.random() * reads.length)] };
}

async function generateNews() {
  const tags = ['حوار','تغطية','شراكة','جائزة','تقرير','فعالية'];
  const tag  = tags[Math.floor(Math.random() * tags.length)];
  const raw  = await callClaude('انت محرر اخبار لمنصة اعد التفكير الفكرية العربية المستقلة. اكتب بأسلوب صحفي مباشر. لا مبالغة ولا حشو.',
    'اكتب خبرا صحفيا من نوع "' + tag + '" عن نشاط منصة اعد التفكير او تاثيرها. الخبر محدد وواقعي. اجب بـ JSON فقط: {"title":"عنوان الخبر","desc":"وصف الخبر جملة او جملتان"}', 300);
  const obj = JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g, '').trim());
  return { tag, title: obj.title, desc: obj.desc, date: arabicDate() };
}

async function generateBusiness() {
  const tags = ['اعلام','استثمار','توسع','تقنية','شراكة','اطلاق'];
  const tag  = tags[Math.floor(Math.random() * tags.length)];
  const raw  = await callClaude('انت محرر اخبار اعمال لمنصة اعد التفكير. اكتب بلغة اعمال واضحة ومباشرة. الارقام والحقائق تتقدم على الانشاء.',
    'اكتب خبر اعمال من نوع "' + tag + '" عن نمو منصة اعد التفكير تجاريا. اجب بـ JSON فقط: {"title":"عنوان الخبر","desc":"وصف الخبر جملة او جملتان"}', 300);
  const obj = JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g, '').trim());
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

  await notify('<b>ReThink Agent</b> — تحديث يومي ناجح\\n<b>مقال:</b> ' + article.title + '\\n<b>المدة:</b> ' + elapsed + 's');
}

main().catch(async err => {
  console.error('Agent failed:', err.message);
  await notify('<b>ReThink Agent — فشل</b>\\n<code>' + err.message + '</code>');
  process.exit(1);
});
`.trim();

fs.writeFileSync(path.join(ROOT, 'scripts/agent.mjs'), AGENT, 'utf-8');
ok('scripts/agent.mjs');

// ══════════════════════════════════════════════════════════════════════════
//  FILE 4 — src/App.jsx
// ══════════════════════════════════════════════════════════════════════════
const APP = `
import { useState } from "react";
import DATA from './data.json';

const { articles: ARTICLES, videos: VIDEOS, news: NEWS, business: BUSINESS } = DATA;

const AC='#b8860b',ACL='#f5f0e8',BG='#fafaf8',CRD='#ffffff',BDR='#e8e4dc',TX='#1a1a18',MT='#7a756e',SRF='#f2ede4';

const S = {
  page:{background:BG,color:TX,fontFamily:"'Segoe UI',Tahoma,sans-serif",minHeight:'100vh',direction:'rtl'},
  nav:{background:'rgba(250,250,248,0.97)',borderBottom:'1px solid '+BDR,padding:'0 40px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'65px',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 8px rgba(0,0,0,0.06)'},
  navLinks:{display:'flex',gap:'28px',listStyle:'none'},
  navLink:(a)=>({color:a?AC:MT,fontSize:'14px',cursor:'pointer',transition:'color .2s',textDecoration:'none',background:'none',border:'none',fontFamily:'inherit',fontWeight:a?'700':'400'}),
  hero:{minHeight:'88vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'60px 20px',background:'linear-gradient(160deg, #fdf9f0 0%, '+BG+' 60%)'},
  badge:{background:ACL,border:'1px solid #d4b87a',color:AC,padding:'6px 18px',borderRadius:'20px',fontSize:'12px',marginBottom:'28px',display:'inline-block',fontWeight:'600'},
  h1:{fontSize:'clamp(32px,6vw,64px)',fontWeight:'800',lineHeight:1.2,marginBottom:'24px',maxWidth:'800px',color:'#111'},
  gold:{color:AC},
  sub:{color:'#6e6860',fontSize:'clamp(15px,2vw,18px)',maxWidth:'580px',lineHeight:1.9,marginBottom:'40px'},
  btnRow:{display:'flex',gap:'14px',flexWrap:'wrap',justifyContent:'center'},
  btn:(p)=>({background:p?AC:CRD,color:p?'#fff':TX,border:p?'none':'1px solid '+BDR,padding:'12px 28px',borderRadius:'8px',fontSize:'14px',cursor:'pointer',fontWeight:p?'700':'400',fontFamily:'inherit',transition:'all .2s',boxShadow:p?'0 2px 12px rgba(184,134,11,0.25)':'none'}),
  statsRow:{display:'flex',gap:'48px',marginTop:'64px',flexWrap:'wrap',justifyContent:'center'},
  stat:{textAlign:'center'},
  statN:{fontSize:'28px',fontWeight:'800',color:AC},
  statL:{fontSize:'12px',color:MT,marginTop:'4px'},
  sec:(p)=>({padding:'80px 40px',maxWidth:'1100px',margin:'0 auto',...(p||{})}),
  secTitle:{fontSize:'clamp(22px,4vw,34px)',fontWeight:'800',color:'#111'},
  grid:(n)=>({display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax('+(n||280)+'px,1fr))',gap:'20px'}),
  card:{background:CRD,border:'1px solid '+BDR,borderRadius:'12px',padding:'26px',cursor:'pointer',transition:'box-shadow .2s,border-color .2s',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'},
  cardTag:{color:AC,fontSize:'11px',fontWeight:'700',marginBottom:'10px',textTransform:'uppercase',letterSpacing:'1px'},
  cardTitle:{fontSize:'16px',fontWeight:'700',marginBottom:'10px',lineHeight:1.6,color:'#111'},
  cardDesc:{color:MT,fontSize:'13px',lineHeight:1.8},
  cardMeta:{color:'#b0a898',fontSize:'12px',marginTop:'14px',display:'flex',gap:'14px'},
  pillRow:{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'32px'},
  pill:(a)=>({background:a?AC:CRD,color:a?'#fff':MT,border:'1px solid '+(a?AC:BDR),padding:'7px 18px',borderRadius:'20px',fontSize:'13px',cursor:'pointer',fontFamily:'inherit',fontWeight:a?'700':'400',transition:'all .2s'}),
  textarea:{background:SRF,border:'1px solid '+BDR,color:TX,borderRadius:'8px',padding:'12px 15px',width:'100%',outline:'none',fontSize:'14px',fontFamily:'inherit',resize:'vertical',minHeight:'120px'},
  input:{background:SRF,border:'1px solid '+BDR,color:TX,borderRadius:'8px',padding:'12px 15px',width:'100%',outline:'none',fontSize:'14px',fontFamily:'inherit'},
  twoCol:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'},
  footer:{background:SRF,borderTop:'1px solid '+BDR,padding:'48px 40px',textAlign:'center',color:MT,fontSize:'13px'},
};

const PILLARS = [
  {i:'①',t:'السياسة والأمن',d:'قراءة في ما وراء الحدث. من يستفيد من الرواية السائدة؟'},
  {i:'②',t:'الاقتصاد والبنية',d:'الأرقام ليست محايدة. كيف تُبنى القناعات الاقتصادية وتُسوَّق؟'},
  {i:'③',t:'علم النفس الاجتماعي',d:'الآلية المعرفية التي تجعل السيطرة ممكنة دون عنف.'},
  {i:'④',t:'الهوية والتاريخ',d:'اللحظة التي زُرعت فيها هذه الأفكار في المجتمع العربي.'},
  {i:'⑤',t:'الأسئلة الخطيرة',d:'ليست خطيرة لأنها خاطئة. بل لأنها دقيقة جداً.'},
];

function Divider(){return <div style={{height:'1px',background:BDR,maxWidth:'1100px',margin:'0 auto'}}/>}
function SecHeader({title,sub}){return(<div style={{marginBottom:'40px'}}><div style={S.secTitle}>{title}</div>{sub&&<div style={{color:MT,fontSize:'15px',marginTop:'6px'}}>{sub}</div>}</div>)}
function ArticleCard({item}){return(<div style={S.card}><div style={S.cardTag}>{item.cat}</div><div style={S.cardTitle}>{item.title}</div><div style={S.cardDesc}>{item.desc}</div><div style={S.cardMeta}><span>{item.date}</span><span>{item.read} قراءة</span></div></div>)}
function VideoCard({item}){return(<div style={S.card}><div style={{background:ACL,borderRadius:'8px',height:'145px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'16px',border:'1px solid #d4b87a'}}><div style={{width:'44px',height:'44px',background:AC,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'16px',paddingRight:'3px'}}>▶</div></div><div style={S.cardTitle}>{item.title}</div><div style={S.cardDesc}>{item.desc}</div><div style={S.cardMeta}><span>{item.views} مشاهدة</span><span>{item.date}</span></div></div>)}
function NewsCard({item}){return(<div style={S.card}><div style={S.cardTag}>{item.tag}</div><div style={S.cardTitle}>{item.title}</div><div style={S.cardDesc}>{item.desc}</div><div style={S.cardMeta}><span>{item.date}</span></div></div>)}

function HomePage({go}){
  return(<div>
    <div style={S.hero}>
      <div style={S.badge}>منصة فكرية تحليلية مستقلة</div>
      <h1 style={S.h1}>ماذا لو كان كل ما تؤمن به<br/><span style={S.gold}>مجرد برمجة؟</span></h1>
      <p style={S.sub}>محتوى يُعيد قراءة الهوية العربية، ويفكّك الموروث الثقافي، ويطرح الأسئلة التي لا يجرؤ كثيرون على طرحها.</p>
      <div style={S.btnRow}><button style={S.btn(true)} onClick={()=>go('articles')}>ابدأ الاستكشاف</button><button style={S.btn(false)} onClick={()=>go('about')}>عن المنصة</button></div>
      <div style={S.statsRow}>{[{n:'+١٠٠K',l:'متابع'},{n:'+٢٠٠',l:'مقال ومقطع'},{n:'٥',l:'محاور فكرية'},{n:'+٣',l:'سنوات'}].map((s,i)=><div key={i} style={S.stat}><div style={S.statN}>{s.n}</div><div style={S.statL}>{s.l}</div></div>)}</div>
    </div>
    <Divider/>
    <div style={S.sec()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
        <div><div style={S.secTitle}>أحدث المقالات</div><div style={{color:MT,fontSize:'14px',marginTop:'5px'}}>قراءات تحليلية في الهوية والفكر والثقافة</div></div>
        <button style={{...S.btn(false),fontSize:'13px'}} onClick={()=>go('articles')}>عرض الكل</button>
      </div>
      <div style={S.grid(300)}>{ARTICLES.slice(0,3).map((a,i)=><ArticleCard key={i} item={a}/>)}</div>
    </div>
    <Divider/>
    <div style={{background:SRF,padding:'80px 40px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
          <div><div style={S.secTitle}>أحدث الفيديوهات</div><div style={{color:MT,fontSize:'14px',marginTop:'5px'}}>محتوى مرئي يُحرّك العقل ويزعزع اليقين الزائف</div></div>
          <button style={{...S.btn(false),fontSize:'13px'}} onClick={()=>go('videos')}>عرض الكل</button>
        </div>
        <div style={S.grid(255)}>{VIDEOS.slice(0,4).map((v,i)=><VideoCard key={i} item={v}/>)}</div>
      </div>
    </div>
    <Divider/>
    <div style={S.sec()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
        <div><div style={S.secTitle}>آخر الأخبار</div><div style={{color:MT,fontSize:'14px',marginTop:'5px'}}>تغطيات وحوارات وجوائز المنصة</div></div>
        <button style={{...S.btn(false),fontSize:'13px'}} onClick={()=>go('news')}>عرض الكل</button>
      </div>
      <div style={S.grid(300)}>{NEWS.slice(0,3).map((n,i)=><NewsCard key={i} item={n}/>)}</div>
    </div>
    <div style={{background:ACL,borderTop:'1px solid #d4b87a',borderBottom:'1px solid #d4b87a',padding:'60px 40px',textAlign:'center'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={{color:AC,fontSize:'12px',fontWeight:'700',marginBottom:'12px',letterSpacing:'2px'}}>النشرة البريدية</div>
        <div style={{fontSize:'24px',fontWeight:'800',color:'#111',marginBottom:'12px'}}>لا تفوّت أي تفكير جديد</div>
        <div style={{color:MT,fontSize:'14px',marginBottom:'28px'}}>مقال أو فيديو أو سؤال كل أسبوع، مباشرةً في بريدك.</div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <input style={{...S.input,textAlign:'right'}} placeholder="بريدك الإلكتروني"/>
          <button style={S.btn(true)}>اشترك الآن</button>
        </div>
      </div>
    </div>
  </div>);
}

function AboutPage(){return(<div style={S.sec()}><SecHeader title="ما هي أعد التفكير؟" sub="منصة فكرية تحليلية تأسّست من قناعة بسيطة وعميقة"/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'50px',alignItems:'start'}}>
<div>
{['أعد التفكير منصة فكرية تحليلية. الإنسان الذي لا يراجع أفكاره لا يملكها، بل تملكه.','نقدّم محتوى يتحدى الموروث ويفكك الخطاب السائد. لا لهدم الهوية العربية، بل لإعادة بنائها على أسس أكثر صدقاً.','لسنا موقفاً سياسياً، ولا فتوى دينية. نحن سؤال مفتوح في وجه الإجابات الجاهزة.'].map((p,i)=><p key={i} style={{color:'#5a524a',lineHeight:2,marginBottom:'20px',fontSize:'15px'}}>{p}</p>)}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginTop:'32px'}}>
{[{t:'رسالتنا',d:'إنتاج محتوى فكري عميق يُحرّك العقل ويُزعزع اليقين الزائف.'},{t:'رؤيتنا',d:'عالم عربي يفكّر بصوت عالٍ دون خوف ويراجع موروثه بعقل مفتوح.'}].map((m,i)=><div key={i} style={{background:ACL,border:'1px solid #d4b87a',borderRadius:'10px',padding:'20px'}}><div style={{color:AC,fontWeight:'800',marginBottom:'8px',fontSize:'14px'}}>{m.t}</div><div style={{color:MT,fontSize:'13px',lineHeight:1.8}}>{m.d}</div></div>)}
</div></div>
<div>
<div style={{color:AC,fontSize:'13px',fontWeight:'700',marginBottom:'20px',letterSpacing:'1px'}}>المحاور الخمسة</div>
{PILLARS.map((p,i)=><div key={i} style={{display:'flex',gap:'16px',marginBottom:'22px',alignItems:'flex-start',padding:'16px',background:SRF,borderRadius:'10px',border:'1px solid '+BDR}}><div style={{color:AC,fontSize:'20px',lineHeight:1,minWidth:'28px'}}>{p.i}</div><div><div style={{fontWeight:'700',marginBottom:'5px',fontSize:'15px',color:'#111'}}>{p.t}</div><div style={{color:MT,fontSize:'13px',lineHeight:1.7}}>{p.d}</div></div></div>)}
<div style={{background:ACL,border:'1px solid #d4b87a',borderRadius:'10px',padding:'24px'}}><div style={{color:AC,fontSize:'12px',fontWeight:'700',marginBottom:'10px',letterSpacing:'1px'}}>مؤسس المنصة</div><div style={{fontWeight:'700',marginBottom:'8px',fontSize:'16px',color:'#111'}}>خالد الناصر</div><div style={{color:MT,fontSize:'13px',lineHeight:1.8}}>صحفي وكاتب وباحث في شؤون الهوية الثقافية والخطاب الإعلامي. يؤمن أن الكلمة الصادقة أشدّ فائدةً من الصمت المريح.</div></div>
</div></div></div>);}

function ArticlesPage(){const[active,setActive]=useState('الكل');const cats=['الكل','هوية','ثقافة','فكر','نقد','مجتمع'];const filtered=active==='الكل'?ARTICLES:ARTICLES.filter(a=>a.cat===active);return(<div style={S.sec()}><SecHeader title="المقالات" sub="قراءات تحليلية عميقة في الهوية والفكر والثقافة والمجتمع"/><div style={S.pillRow}>{cats.map(c=><button key={c} style={S.pill(active===c)} onClick={()=>setActive(c)}>{c}</button>)}</div><div style={S.grid(300)}>{filtered.map((a,i)=><ArticleCard key={i} item={a}/>)}</div></div>);}
function VideosPage(){return(<div style={S.sec()}><SecHeader title="الفيديو" sub="محتوى مرئي يُحرّك العقل ويزعزع اليقين الزائف"/><div style={S.grid(260)}>{VIDEOS.map((v,i)=><VideoCard key={i} item={v}/>)}</div></div>);}
function NewsPage(){return(<div style={S.sec()}><SecHeader title="الأخبار" sub="تغطيات المنصة وحواراتها وتقديراتها الإعلامية"/><div style={S.grid(300)}>{NEWS.map((n,i)=><NewsCard key={i} item={n}/>)}</div></div>);}
function BusinessPage(){return(<div style={S.sec()}><SecHeader title="أخبار الأعمال" sub="شراكات وتوسعات واتفاقيات المنصة"/><div style={S.grid(300)}>{BUSINESS.map((b,i)=><NewsCard key={i} item={b}/>)}</div></div>);}
function ContactPage(){return(<div style={{...S.sec(),maxWidth:'700px'}}><SecHeader title="تواصل معنا" sub="للتعاون أو الاستفسار أو مجرد سؤال يستحق التفكير"/><div style={{display:'grid',gap:'14px'}}><div style={S.twoCol}><input style={S.input} placeholder="الاسم"/><input style={S.input} placeholder="البريد الإلكتروني"/></div><input style={S.input} placeholder="الموضوع"/><textarea style={S.textarea} placeholder="رسالتك..."/><button style={{...S.btn(true),alignSelf:'flex-start',padding:'13px 32px'}}>أرسل الرسالة</button></div><div style={{display:'flex',gap:'16px',marginTop:'40px',flexWrap:'wrap'}}>{[{l:'يوتيوب',v:'@rethinkAR'},{l:'تويتر/X',v:'@rethinkAR'},{l:'إنستغرام',v:'@rethink.ar'},{l:'بريد',v:'hello@rethink.com'}].map((s,i)=><div key={i} style={{background:ACL,border:'1px solid #d4b87a',borderRadius:'8px',padding:'14px 20px',minWidth:'140px'}}><div style={{color:AC,fontSize:'11px',fontWeight:'700',marginBottom:'5px'}}>{s.l}</div><div style={{color:MT,fontSize:'13px'}}>{s.v}</div></div>)}</div></div>);}

export default function App(){
  const[page,setPage]=useState('home');
  const navItems=[{l:'الرئيسية',k:'home'},{l:'عن المنصة',k:'about'},{l:'المقالات',k:'articles'},{l:'الفيديو',k:'videos'},{l:'الأخبار',k:'news'},{l:'أخبار الأعمال',k:'business'},{l:'تواصل',k:'contact'}];
  const go=k=>{setPage(k);window.scrollTo(0,0);};
  return(<div style={S.page}>
    <style>{'*{box-sizing:border-box;margin:0;padding:0} button:hover{opacity:.8}'}</style>
    <nav style={S.nav}>
      <button style={{...S.navLink(false),fontSize:'19px',fontWeight:'800',color:AC}} onClick={()=>go('home')}>أعد التفكير</button>
      <ul style={{...S.navLinks,flexWrap:'wrap'}}>{navItems.map(n=><li key={n.k}><button style={S.navLink(page===n.k)} onClick={()=>go(n.k)}>{n.l}</button></li>)}</ul>
    </nav>
    {page==='home'&&<HomePage go={go}/>}
    {page==='about'&&<AboutPage/>}
    {page==='articles'&&<ArticlesPage/>}
    {page==='videos'&&<VideosPage/>}
    {page==='news'&&<NewsPage/>}
    {page==='business'&&<BusinessPage/>}
    {page==='contact'&&<ContactPage/>}
    <footer style={S.footer}>
      <div style={{color:AC,fontWeight:'800',fontSize:'16px',marginBottom:'8px'}}>أعد التفكير</div>
      <div>لأن إعادة التفكير هي أول خطوة نحو الحرية</div>
      <div style={{marginTop:'16px',color:'#bbb',fontSize:'12px'}}>© 2026 أعد التفكير — جميع الحقوق محفوظة</div>
    </footer>
  </div>);
}
`.trim();

fs.writeFileSync(path.join(ROOT, 'src/App.jsx'), APP, 'utf-8');
ok('src/App.jsx');

// ══════════════════════════════════════════════════════════════════════════
//  GIT PUSH
// ══════════════════════════════════════════════════════════════════════════
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
log('  رفع الملفات على GitHub...');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
  execSync('git add .', { cwd: ROOT, stdio: 'inherit' });
  info('git add .');

  execSync('git commit -m "fix: complete overhaul v2.0 - agent, workflow, App.jsx"', { cwd: ROOT, stdio: 'inherit' });
  info('git commit done');

  execSync('git push', { cwd: ROOT, stdio: 'inherit' });
  info('git push done');

  log('═══════════════════════════════════════════════');
  log('  ✅ تم! جميع الملفات رُفعت بنجاح على GitHub');
  log('');
  log('  الخطوة الأخيرة — اختبر الوكيل اليومي:');
  log('  https://github.com/Khaledalnaser/rethink-website/actions');
  log('  اضغط "Daily Content Agent" ثم "Run workflow"');
  log('═══════════════════════════════════════════════\n');

} catch (err) {
  log('  ❌ خطأ في git: ' + err.message);
  log('  شغّل هذه الأوامر يدوياً في Git Bash:');
  log('    git add .');
  log('    git commit -m "fix: overhaul v2.0"');
  log('    git push\n');
}