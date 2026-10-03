"use client";
import ResponsiveImage from "./components/ResponsiveImage";
import SolarSystemPreview from "./components/SolarSystemPreview";
import CellZoomPreview from "./components/CellZoomPreview";
import BangladeshMapPreview from "./components/BangladeshMapPreview";
import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowRight,BookOpen,Brain,FlaskConical,Pause,Play,X} from "lucide-react";
import {openThoughtFacts} from "./data/openThoughtFacts";
import {hiddenQuizQuestions} from "./data/hiddenQuizQuestions";


// Deployment refresh: Bangladesh map rotation
export default function Home(){
 const[running,setRunning]=useState(true);const[homeDemo,setHomeDemo]=useState<"solar"|"cell"|"map"|null>(null);const[toast,setToast]=useState("");const[quiz,setQuiz]=useState(false);const[quizIndex,setQuizIndex]=useState(0);const[answer,setAnswer]=useState<number|null>(null);const[lastThoughtIndex,setLastThoughtIndex]=useState(-1);const[thoughtLang,setThoughtLang]=useState<"en"|"bn">("en");
 function note(text:string){setToast(text);window.setTimeout(()=>setToast(""),4200)}
 useEffect(()=>{
  const sync=()=>setThoughtLang(document.documentElement.lang==="bn"?"bn":"en");
  sync();
  window.addEventListener("bujhi-language-changed",sync);
  return()=>window.removeEventListener("bujhi-language-changed",sync);
 },[]);
 useEffect(()=>{
  const raw=Number(localStorage.getItem("bujhi-home-preview-count")||"0");
  const count=Number.isFinite(raw)&&raw>=0?Math.floor(raw):0;
  const demos:["map","solar","cell"]=["map","solar","cell"];
  const next=demos[count%3];
  setHomeDemo(next);
  localStorage.setItem("bujhi-home-preview-count",String((count+1)%3));
 },[]);
 function openRandomThought(){let next=Math.floor(Math.random()*openThoughtFacts.length);if(openThoughtFacts.length>1&&next===lastThoughtIndex)next=(next+1)%openThoughtFacts.length;setLastThoughtIndex(next);const fact=openThoughtFacts[next];note(thoughtLang==="bn"?fact.bn:fact.en)}
 function openRandomQuiz(){setAnswer(null);setQuizIndex(current=>{let next=Math.floor(Math.random()*hiddenQuizQuestions.length);if(hiddenQuizQuestions.length>1&&next===current)next=(next+1)%hiddenQuizQuestions.length;return next});setQuiz(true)}
 const currentQuiz=hiddenQuizQuestions[quizIndex];
 return <main>

  <section className="hero">
   <div className="hero-copy"><p className="eyebrow">Built for the Bangladeshi curriculum</p><h1>Learn it<br/>your way.</h1><div className="hero-actions"><Link href="/register?role=student">Join as a Student <ArrowRight/></Link><Link href="/register?role=teacher">Join as a Teacher <ArrowRight/></Link></div><button className="hidden-spark" onClick={openRandomQuiz}>I found something</button></div>
   <div className="notebook-wrap"><div className="paper back-one"/><div className="paper back-two"/><article className="notebook"><div className="rings">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div><div className="book-meta"><span>Interactive preview</span><span>Tap anything</span></div><h2>A peek inside Bujhi?</h2>
    {homeDemo==="map"
     ?<div className="lesson home-map-lesson"><BangladeshMapPreview compact/></div>
     :<div className="lesson"><div className="lesson-copy">
       <p>{homeDemo==="cell"?(thoughtLang==="bn"?"জীববিজ্ঞান":"Biology"):(homeDemo==="solar"?(thoughtLang==="bn"?"অন্বেষণ · মহাবিশ্ব":"Explore · Universe"):(thoughtLang==="bn"?"ইন্টারঅ্যাকটিভ বিজ্ঞান":"Interactive science"))}</p>
       <h3>{homeDemo==="cell"?("DNA"):(homeDemo==="solar"?(thoughtLang==="bn"?"সৌরজগৎ":"The Solar System"):(thoughtLang==="bn"?"লোড হচ্ছে":"Loading"))}</h3>
       <span>{homeDemo==="cell"?(thoughtLang==="bn"?"ঘুরিয়ে দেখুন।":"Drag to explore."):(homeDemo==="solar"?(thoughtLang==="bn"?"গ্রহগুলোকে সূর্যের চারদিকে ঘুরতে দেখুন।":"Watch the planets orbit the Sun."):(thoughtLang==="bn"?"প্রিভিউ প্রস্তুত হচ্ছে…":"Preparing your preview…"))}</span>
      </div>
      {homeDemo==="cell"?<CellZoomPreview running={running} onFact={note}/>:homeDemo==="solar"?<SolarSystemPreview running={running} onFact={note}/>:<div className="science-preview-loading" aria-hidden="true"/>}</div>}
    {homeDemo!=="cell"&&<footer className="book-footer">{homeDemo==="solar"?<button onClick={()=>setRunning(!running)}>{running?<Pause/>:<Play/>}{running?"Pause orbit":"Play orbit"}</button>:homeDemo==="map"?<Link href="/explore/bangladesh">{thoughtLang==="bn"?"পুরো মানচিত্র খুলুন":"Open full map"} <ArrowRight/></Link>:<span/>}<span>{homeDemo==="solar"?"Tap a planet for a fact":homeDemo==="map"?(thoughtLang==="bn"?"জানতে একটি বিভাগে চাপ দিন":"Tap a division to explore"):"Loading preview…"}</span></footer>}
   </article></div>
  </section>
  <section className="touch-strip"><button onClick={openRandomThought} title="Open one of 1,000 learning facts"><BookOpen/><span>Open a thought</span></button><button onClick={openRandomQuiz}><Brain/><span>Try a hidden quiz</span></button><button onClick={openRandomThought} title="Find one of 1,000 tiny facts"><span>Find a tiny fact</span></button><button onClick={()=>{location.href="/login?role=student"}}><FlaskConical/><span>Open your learning desk</span></button></section>
  <section className="promise" data-no-translate>
   <p className="eyebrow">{thoughtLang==="bn"?"পাঠ্যবইয়ের বাইরেও শেখা":"Learning beyond the textbook"}</p>
   <h2>{thoughtLang==="bn"?"এমন পাঠ, যা বইয়ের বাইরেও যায়।":"Lessons that go beyond the book."}</h2>
   <div>
    <article><b>01</b><h3>{thoughtLang==="bn"?"দেখুন":"See it"}</h3><p>{thoughtLang==="bn"?"কঠিন বিষয়কে এমন দৃশ্যে দেখুন, যা ধাপে ধাপে সহজে অনুসরণ করা যায়।":"Turn difficult topics into visuals you can actually follow."}</p></article>
    <article><b>02</b><h3>{thoughtLang==="bn"?"বুঝুন":"Understand it"}</h3><p>{thoughtLang==="bn"?"প্রতিটি পাঠকে এমন উদাহরণের সঙ্গে মিলিয়ে বুঝুন, যা ধারণাটিকে আরও পরিষ্কার করে।":"Connect each lesson to examples that make the idea clearer."}</p></article>
    <article><b>03</b><h3>{thoughtLang==="bn"?"চেষ্টা করুন":"Try it"}</h3><p>{thoughtLang==="bn"?"ছোট ছোট কাজের মাধ্যমে শেখা বিষয়কে আরও ভালোভাবে মনে রাখুন।":"Use small activities to make what you learned stick."}</p></article>
   </div>
   <Link href="/about">{thoughtLang==="bn"?"কেন বুঝি?":"Why Bujhi? exists"} <ArrowRight/></Link>
  </section>
  <footer className="site-footer"><Link className="brand" href="/"><ResponsiveImage sizes="38px" src="/optimized/bujhi-icon-96.webp" alt=""/>Bujhi</Link><p>Built around the way students actually learn.</p><span>© 2026 Bujhi?</span></footer>
  {quiz&&<div className="modal" onMouseDown={e=>{if(e.target===e.currentTarget){setQuiz(false);setAnswer(null)}}}><section data-no-translate><button className="close" onClick={()=>{setQuiz(false);setAnswer(null)}}><X/></button><div className="quiz-meta"><p className="eyebrow">{thoughtLang==="bn"?"গোপন ডেস্ক কুইজ":"Hidden desk quiz"}</p><span>{thoughtLang==="bn"?currentQuiz.categoryBn:currentQuiz.categoryEn} · {String(quizIndex+1).padStart(4,"0")} / 1000</span></div><h2>{thoughtLang==="bn"?currentQuiz.questionBn:currentQuiz.questionEn}</h2>{(thoughtLang==="bn"?currentQuiz.optionsBn:currentQuiz.optionsEn).map((item,i)=><button disabled={answer!==null} className={`quiz-option ${answer!==null?(i===currentQuiz.correct?"correct":answer===i?"wrong":""):""}`} key={`${quizIndex}-${i}`} onClick={()=>setAnswer(i)}>{item}</button>)}{answer!==null&&<div className={`result ${answer===currentQuiz.correct?"result-correct":"result-wrong"}`}><strong>{answer===currentQuiz.correct?(thoughtLang==="bn"?"ঠিক!":"Correct!"):(thoughtLang==="bn"?"আরেকটু ভাবি।":"Not quite.")}</strong><p>{thoughtLang==="bn"?currentQuiz.explanationBn:currentQuiz.explanationEn}</p></div>}<button className="quiz-next" onClick={openRandomQuiz}>{thoughtLang==="bn"?"আরেকটি কুইজ":"Another quiz"} <ArrowRight/></button></section></div>}
  {toast&&<div className="toast">{toast}</div>}
 </main>
}
