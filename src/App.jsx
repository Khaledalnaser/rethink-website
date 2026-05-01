import { useState } from "react";
import DATA from './data.json';

const { articles: ARTICLES = [], videos: VIDEOS = [], news: NEWS = [], business: BUSINESS = [] } = DATA || {};

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
function ArticleCard({item}){return(<div style={S.card}><div style={S.cardTag}>{item.cat||''}</div><div style={S.cardTitle}>{item.title||''}</div><div style={S.cardDesc}>{item.desc||''}</div><div style={S.cardMeta}><span>{item.date||''}</span><span>{item.read||''} قراءة</span></div></div>)}
function VideoCard({item}){return(<div style={S.card}><div style={{background:ACL,borderRadius:'8px',height:'145px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'16px',border:'1px solid #d4b87a'}}><div style={{width:'44px',height:'44px',background:AC,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'16px',paddingRight:'3px'}}>▶</div></div><div style={S.cardTitle}>{item.title||''}</div><div style={S.cardDesc}>{item.desc||''}</div><div style={S.cardMeta}><span>{item.views||''} مشاهدة</span><span>{item.date||''}</span></div></div>)}
function NewsCard({item}){return(<div style={S.card}><div style={S.cardTag}>{item.tag||''}</div><div style={S.cardTitle}>{item.title||''}</div><div style={S.cardDesc}>{item.desc||''}</div><div style={S.cardMeta}><span>{item.date||''}</span></div></div>)}

function HomePage({go}){
  const[subEmail,setSubEmail]=useState('');
  const[subDone,setSubDone]=useState(false);
  const handleSubscribe=()=>{if(!subEmail||!subEmail.includes('@'))return;setSubDone(true);};
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
      <div style={S.grid(300)}>{ARTICLES.slice(0,3).map((a)=><ArticleCard key={a.title} item={a}/>)}</div>
    </div>
    <Divider/>
    <div style={{background:SRF,padding:'80px 40px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
          <div><div style={S.secTitle}>أحدث الفيديوهات</div><div style={{color:MT,fontSize:'14px',marginTop:'5px'}}>محتوى مرئي يُحرّك العقل ويزعزع اليقين الزائف</div></div>
          <button style={{...S.btn(false),fontSize:'13px'}} onClick={()=>go('videos')}>عرض الكل</button>
        </div>
        <div style={S.grid(255)}>{VIDEOS.slice(0,4).map((v)=><VideoCard key={v.title} item={v}/>)}</div>
      </div>
    </div>
    <Divider/>
    <div style={S.sec()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
        <div><div style={S.secTitle}>آخر الأخبار</div><div style={{color:MT,fontSize:'14px',marginTop:'5px'}}>تغطيات وحوارات وجوائز المنصة</div></div>
        <button style={{...S.btn(false),fontSize:'13px'}} onClick={()=>go('news')}>عرض الكل</button>
      </div>
      <div style={S.grid(300)}>{NEWS.slice(0,3).map((n)=><NewsCard key={n.title} item={n}/>)}</div>
    </div>
    <div style={{background:ACL,borderTop:'1px solid #d4b87a',borderBottom:'1px solid #d4b87a',padding:'60px 40px',textAlign:'center'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={{color:AC,fontSize:'12px',fontWeight:'700',marginBottom:'12px',letterSpacing:'2px'}}>النشرة البريدية</div>
        <div style={{fontSize:'24px',fontWeight:'800',color:'#111',marginBottom:'12px'}}>لا تفوّت أي تفكير جديد</div>
        <div style={{color:MT,fontSize:'14px',marginBottom:'28px'}}>مقال أو فيديو أو سؤال كل أسبوع، مباشرةً في بريدك.</div>
        {subDone
          ?<div style={{color:AC,fontWeight:'700',fontSize:'15px',padding:'16px',background:CRD,borderRadius:'8px',border:'1px solid #d4b87a'}}>شكراً! سنراسلك قريباً ✓</div>
          :<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <input style={{...S.input,textAlign:'right'}} placeholder="بريدك الإلكتروني" value={subEmail} onChange={e=>setSubEmail(e.target.value)}/>
            <button style={S.btn(true)} onClick={handleSubscribe}>اشترك الآن</button>
          </div>
        }
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

function ArticlesPage(){const[active,setActive]=useState('الكل');const cats=['الكل','هوية','ثقافة','فكر','نقد','مجتمع'];const filtered=active==='الكل'?ARTICLES:ARTICLES.filter(a=>a.cat===active);return(<div style={S.sec()}><SecHeader title="المقالات" sub="قراءات تحليلية عميقة في الهوية والفكر والثقافة والمجتمع"/><div style={S.pillRow}>{cats.map(c=><button key={c} style={S.pill(active===c)} onClick={()=>setActive(c)}>{c}</button>)}</div><div style={S.grid(300)}>{filtered.map((a)=><ArticleCard key={a.title} item={a}/>)}</div></div>);}
function VideosPage(){return(<div style={S.sec()}><SecHeader title="الفيديو" sub="محتوى مرئي يُحرّك العقل ويزعزع اليقين الزائف"/><div style={S.grid(260)}>{VIDEOS.map((v)=><VideoCard key={v.title} item={v}/>)}</div></div>);}
function NewsPage(){return(<div style={S.sec()}><SecHeader title="الأخبار" sub="تغطيات المنصة وحواراتها وتقديراتها الإعلامية"/><div style={S.grid(300)}>{NEWS.map((n)=><NewsCard key={n.title} item={n}/>)}</div></div>);}
function BusinessPage(){return(<div style={S.sec()}><SecHeader title="أخبار الأعمال" sub="شراكات وتوسعات واتفاقيات المنصة"/><div style={S.grid(300)}>{BUSINESS.map((b)=><NewsCard key={b.title} item={b}/>)}</div></div>);}
function ContactPage(){
  const[form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const[sent,setSent]=useState(false);
  const setField=(k,v)=>setForm(f=>({...f,[k]:v}));
  const handleSubmit=()=>{if(!form.name||!form.email||!form.message)return;setSent(true);};
  return(<div style={{...S.sec(),maxWidth:'700px'}}><SecHeader title="تواصل معنا" sub="للتعاون أو الاستفسار أو مجرد سؤال يستحق التفكير"/>
  {sent
    ?<div style={{color:AC,fontWeight:'700',fontSize:'16px',padding:'24px',background:ACL,borderRadius:'10px',border:'1px solid #d4b87a',textAlign:'center',marginBottom:'32px'}}>تم استلام رسالتك. سنتواصل معك قريباً ✓</div>
    :<div style={{display:'grid',gap:'14px'}}>
      <div style={S.twoCol}>
        <input style={S.input} placeholder="الاسم" value={form.name} onChange={e=>setField('name',e.target.value)}/>
        <input style={S.input} placeholder="البريد الإلكتروني" value={form.email} onChange={e=>setField('email',e.target.value)}/>
      </div>
      <input style={S.input} placeholder="الموضوع" value={form.subject} onChange={e=>setField('subject',e.target.value)}/>
      <textarea style={S.textarea} placeholder="رسالتك..." value={form.message} onChange={e=>setField('message',e.target.value)}/>
      <button style={{...S.btn(true),alignSelf:'flex-start',padding:'13px 32px'}} onClick={handleSubmit}>أرسل الرسالة</button>
    </div>
  }
  <div style={{display:'flex',gap:'16px',marginTop:'40px',flexWrap:'wrap'}}>{[{l:'يوتيوب',v:'@rethinkAR'},{l:'تويتر/X',v:'@rethinkAR'},{l:'إنستغرام',v:'@rethink.ar'},{l:'بريد',v:'hello@rethink.com'}].map((s,i)=><div key={i} style={{background:ACL,border:'1px solid #d4b87a',borderRadius:'8px',padding:'14px 20px',minWidth:'140px'}}><div style={{color:AC,fontSize:'11px',fontWeight:'700',marginBottom:'5px'}}>{s.l}</div><div style={{color:MT,fontSize:'13px'}}>{s.v}</div></div>)}</div></div>);}

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
