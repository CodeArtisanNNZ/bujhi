"use client";
import ResponsiveImage from "./components/ResponsiveImage";
import SolarSystemPreview from "./components/SolarSystemPreview";
import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowRight,BookOpen,Brain,Compass,FlaskConical,Menu,Pause,PenLine,Play,PlayCircle,Sparkles,X} from "lucide-react";
import {openThoughtFacts} from "./data/openThoughtFacts";

const modes={Read:{title:"A tiny universe on paper",copy:"Follow one clear idea at a time."},Watch:{title:"See motion make sense",copy:"Watch a difficult idea become visible."},Explore:{title:"The Solar System",copy:"Watch the planets orbit the Sun."},Practice:{title:"Try it without pressure",copy:"Choose, test, and learn from the answer."}};

export default function Home(){
 const[menu,setMenu]=useState(false);const[mode,setMode]=useState<keyof typeof modes>("Explore");const[running,setRunning]=useState(true);const[toast,setToast]=useState("");const[quiz,setQuiz]=useState(false);const[answer,setAnswer]=useState<number|null>(null);const[lastThoughtIndex,setLastThoughtIndex]=useState(-1);const[thoughtLang,setThoughtLang]=useState<"en"|"bn">("en");
 function note(text:string){setToast(text);window.setTimeout(()=>setToast(""),4200)}
 useEffect(()=>{
  const sync=()=>setThoughtLang(document.documentElement.lang==="bn"?"bn":"en");
  sync();
  window.addEventListener("bujhi-language-changed",sync);
  return()=>window.removeEventListener("bujhi-language-changed",sync);
 },[]);
 function openRandomThought(){let next=Math.floor(Math.random()*openThoughtFacts.length);if(openThoughtFacts.length>1&&next===lastThoughtIndex)next=(next+1)%openThoughtFacts.length;setLastThoughtIndex(next);const fact=openThoughtFacts[next];note(thoughtLang==="bn"?fact.bn:fact.en)}
 return <main>

  <section className="hero">
   <div className="hero-copy"><p className="eyebrow">Built for the Bangladeshi curriculum</p><h1>Learn it<br/>your way.</h1><div className="hero-actions"><Link href="/register?role=student">Join as a Student <ArrowRight/></Link><Link href="/register?role=teacher">Join as a Teacher <ArrowRight/></Link></div><button className="hidden-spark" onClick={()=>setQuiz(true)}><Sparkles/> I found something</button></div>
   <div className="notebook-wrap"><div className="paper back-one"/><div className="paper back-two"/><article className="notebook"><div className="rings">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div><div className="book-meta"><span>Interactive preview</span><span>Tap anything</span></div><h2>A peek inside Bujhi?</h2><div className="mode-row">{Object.keys(modes).map(key=>{const Icon=key==="Read"?BookOpen:key==="Watch"?PlayCircle:key==="Explore"?Compass:PenLine;return <button key={key} className={mode===key?"active":""} onClick={()=>setMode(key as keyof typeof modes)}><Icon/>{key}</button>})}</div>
    <div className="lesson"><div className="lesson-copy"><p>{mode} · Universe</p><h3>{modes[mode].title}</h3><span>{modes[mode].copy}</span></div>{mode==="Explore"?<SolarSystemPreview running={running} onFact={note}/>:<button className="mode-activity" onClick={()=>note(mode==="Read"?"Try reading the idea aloud, then explain it without looking.":mode==="Watch"?"Imagine a time-lapse showing one full orbit.":"Quick check: Earth takes about 365 days to orbit the Sun.")}>{mode==="Read"?<BookOpen/>:mode==="Watch"?<Play/>:<Brain/>}<span>Try this approach</span></button>}</div>
    <footer className="book-footer"><button onClick={()=>setRunning(!running)}>{running?<Pause/>:<Play/>}{running?"Pause orbit":"Play orbit"}</button><span>Tap a planet for a fact</span></footer>
   </article></div>
  </section>
  <section className="touch-strip"><button onClick={openRandomThought} title="Open one of 1,000 learning facts"><BookOpen/><span>Open a thought</span></button><button onClick={()=>setQuiz(true)}><Brain/><span>Try a hidden quiz</span></button><button onClick={openRandomThought} title="Find one of 1,000 tiny facts"><Sparkles/><span>Find a tiny fact</span></button><button onClick={()=>{location.href="/login?role=student"}}><FlaskConical/><span>Open your learning desk</span></button></section>
  <section className="promise" data-no-translate>
   <p className="eyebrow">{thoughtLang==="bn"?"পাঠ্যবইয়ের বাইরেও শেখা":"Learning beyond the textbook"}</p>
   <h2>{thoughtLang==="bn"?"এমন পাঠ, যা বইয়ের পাতার বাইরেও গিয়ে ধারণাকে আরও সহজে বুঝতে সাহায্য করে।":"Lessons that go beyond the page and make ideas easier to understand."}</h2>
   <div>
    <article><b>01</b><h3>{thoughtLang==="bn"?"দেখুন":"See it"}</h3><p>{thoughtLang==="bn"?"কঠিন বিষয়কে এমন দৃশ্যে দেখুন, যা ধাপে ধাপে সহজে অনুসরণ করা যায়।":"Turn difficult topics into visuals you can actually follow."}</p></article>
    <article><b>02</b><h3>{thoughtLang==="bn"?"বুঝুন":"Understand it"}</h3><p>{thoughtLang==="bn"?"প্রতিটি পাঠকে এমন উদাহরণের সঙ্গে মিলিয়ে বুঝুন, যা ধারণাটিকে আরও পরিষ্কার করে।":"Connect each lesson to examples that make the idea clearer."}</p></article>
    <article><b>03</b><h3>{thoughtLang==="bn"?"চেষ্টা করুন":"Try it"}</h3><p>{thoughtLang==="bn"?"ছোট ছোট কাজের মাধ্যমে শেখা বিষয়কে আরও ভালোভাবে মনে রাখুন।":"Use small activities to make what you learned stick."}</p></article>
   </div>
   <Link href="/about">{thoughtLang==="bn"?"কেন বুঝি?":"Why Bujhi? exists"} <ArrowRight/></Link>
  </section>
  <footer className="site-footer"><Link className="brand" href="/"><ResponsiveImage sizes="38px" src="/optimized/bujhi-icon-96.webp" alt=""/>Bujhi</Link><p>Built around the way students actually learn.</p><span>© 2026 Bujhi?</span></footer>
  {quiz&&<div className="modal" onMouseDown={e=>{if(e.target===e.currentTarget){setQuiz(false);setAnswer(null)}}}><section><button className="close" onClick={()=>{setQuiz(false);setAnswer(null)}}><X/></button><p className="eyebrow">Hidden desk quiz</p><h2>Why do we experience seasons?</h2>{["Earth moves closer to the Sun","Earth’s axis is tilted","The Sun becomes colder"].map((item,i)=><button className={`quiz-option ${answer===i?(i===1?"correct":"wrong"):""}`} key={item} onClick={()=>setAnswer(i)}>{item}</button>)}{answer!==null&&<p className="result">{answer===1?"Exactly. The tilt changes how directly sunlight reaches each hemisphere.":"Not quite. Distance is not the main reason—try the tilt."}</p>}</section></div>}
  {toast&&<div className="toast">{toast}</div>}
 </main>
}
