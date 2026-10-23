"use client";

import Link from "next/link";
import {useEffect,useRef,useState,type ReactNode} from "react";
import {ArrowLeft,ArrowRight,BookOpen,Check,ChevronLeft,ChevronRight,FlaskConical,Lightbulb,MoveRight,Play} from "lucide-react";
import {FibonacciLab,FreePatternLab,MagicSquareLab,MatchstickBuilder,MatchstickDiagram,NthTermMachine,NumberChallenge,PatternMachine,PrimeSieveLab,RuleChoice,SquareLab,SumLab} from "./PatternLabs";
import PatternMission from "./PatternMission";
import {bn} from "./patternMath";
import s from "./pattern.module.css";

const LESSONS=[
  {title:"প্যাটার্ন চিনে নিই",short:"Pattern",hook:"কী ফিরে আসে? আর কী বদলে যায়?",why:"কখনো একই আকার বারবার ফিরে আসে, কখনো একটি নির্দিষ্ট নিয়মে আকার বা সংখ্যা বাড়ে। প্রথমটি repeating pattern, দ্বিতীয়টি growing pattern। নিয়মটি বুঝলে পরের ধাপ অনুমান করা যায়।",remember:"প্যাটার্ন মানে শুধু পুনরাবৃত্তি নয়; একটি নিয়ম মেনে পরিবর্তনও হতে পারে।",next:"সংখ্যাগুলো কি একটি মেশিনের নিয়ম মেনে বের হচ্ছে?"},
  {title:"সংখ্যার প্যাটার্ন",short:"Number",hook:"২ → ৫ → ৮ → ১১… পরের দরজা কোন সংখ্যায় খুলবে?",why:"পাশাপাশি পদের পার্থক্য বের করো। একই সংখ্যা যোগ হলে পার্থক্য স্থির থাকে। গুণের নিয়মে প্রতিটি পদ আগের পদের একটি নির্দিষ্ট গুণ; যোগের নিয়মের সঙ্গে তা মিলিয়ে দেখো।",remember:"উত্তর মুখস্থ নয়—প্রথমে নিয়ম খুঁজে বের করো।",next:"একটি সংখ্যা কি সত্যি একটি বর্গ হয়ে দাঁড়াতে পারে?"},
  {title:"বিজোড়, জোড় ও বর্গসংখ্যা",short:"Square",hook:"১৬টি বিন্দুতে বর্গ হয়। ২৫টিতে কেন আরও বড় বর্গ হয়?",why:"n সারির প্রতিটিতে nটি বিন্দু রাখলে মোট n²টি। আগের বর্গের ডানে একটি কলাম ও নিচে একটি সারি যোগ করো; কোণের বিন্দুটি একবার গুনলেই নতুন স্তরে থাকে ২n−১টি বিন্দু।",remember:"পরপর বর্গসংখ্যার পার্থক্য ৩, ৫, ৭, ৯…; নতুন স্তরটি সবসময় বিজোড়।",next:"যে সংখ্যাগুলোকে শুধু ১ ও নিজে দিয়ে ভাগ করা যায়, তারা কোথায়?"},
  {title:"মৌলিক সংখ্যা",short:"Prime",hook:"১০০টি সংখ্যার ভিড়ে মৌলিকগুলোকে কীভাবে আলাদা করবে?",why:"মৌলিক সংখ্যার ঠিক দুটি ভিন্ন ধনাত্মক গুণনীয়ক: ১ ও নিজে। ২-এর নিজের ঘরটি রেখে ৪, ৬, ৮… কাটো, কারণ সেগুলোতে ২ গুণনীয়ক। একইভাবে ৩, ৫ ও ৭ ব্যবহার করলেই ১–১০০-এর সব যৌগিক বাদ পড়বে।",remember:"২ একমাত্র জোড় মৌলিক সংখ্যা। ১ মৌলিকও নয়, যৌগিকও নয়।",next:"যদি পরের সংখ্যাটিকে আগের দুটি সংখ্যা মিলে বানায়?"},
  {title:"Fibonacci pattern",short:"Fibonacci",hook:"১, ১, ২, ৩, ৫… এখানে বাড়ার পরিমাণও কেন বদলাচ্ছে?",why:"একটি পদ নয়, আগের দুটি পদ একসঙ্গে দেখো। তাদের যোগ করলেই পরের পদ আসে। প্রথম দুটি পদ বদলানো যায়; তখনও একই নিয়মে একটি Fibonacci-ধরনের ধারা তৈরি হয়।",remember:"পরের পদ = তার ঠিক আগের দুটি পদের যোগফল।",next:"নয়টি সংখ্যা কি আট দিকে একই যোগফল দিতে পারে?"},
  {title:"Magic Square",short:"Magic Square",hook:"১–৯ একবার করে বসিয়ে সব দিকের যোগফল ১৫ করতে পারবে?",why:"একটি সারি মিললেই ম্যাজিক স্কয়ার হয় না। তিনটি সারি, তিনটি কলাম ও দুটি কর্ণ—আটটি যোগফলই সমান হতে হবে। ১ থেকে ৯-এর মোট ৪৫; তিন সমান সারিতে ভাগ হলে প্রত্যেকটিতে ১৫।",remember:"১–৯ দিয়ে বানানো ৩×৩ ম্যাজিক স্কয়ারের ম্যাজিক যোগফল ১৫।",next:"একই পাশ ভাগ করে নিলে কাঠি কতটা বেঁচে যায়?"},
  {title:"জ্যামিতিক প্যাটার্ন",short:"Geometry",hook:"১ বর্গে ৪টি কাঠি। তাহলে ২ বর্গে কি ৮টি লাগবে?",why:"পাশাপাশি বর্গগুলো একটি পাশ ভাগ করে। তাই নতুন বর্গের বাম পাশ আগে থেকেই আছে; উপরে, ডানে ও নিচে তিনটি নতুন কাঠি যথেষ্ট। প্রথম বর্গের ৪টির সঙ্গে প্রতিটি নতুন বর্গে ৩টি করে যোগ হয়।",remember:"সংযুক্ত বর্গে প্রথমবার ৪টি কাঠি, এরপর প্রতিটি নতুন বর্গে ৩টি।",next:"২০টি না এঁকেই কি কাঠির সংখ্যা বের করা যায়?"},
  {title:"Pattern → Algebra",short:"Algebra",hook:"৪, ৭, ১০, ১৩… ১০০তম পদ না লিখে কীভাবে পাবে?",why:"প্রথম পদে ৩×১+১, দ্বিতীয় পদে ৩×২+১। অবস্থানটি বদলাচ্ছে, তাই তার জায়গায় n লিখি। কাঠির ক্ষেত্রেও ৪+৩(n−১) = ৩n+১। একই যুক্তি দিয়ে সাধারণ নিয়ম an+b বানানো যায়।",remember:"n হলো অবস্থান বা চিত্রের ক্রমিক সংখ্যা; এখানে গণনা শুরু n=১ থেকে।",next:"অনেক সংখ্যার যোগফলও কি একটি ছবিতে ধরা যায়?"},
  {title:"Pattern sums",short:"Pattern Sum",hook:"১+২+…+২০ একে একে যোগ না করে কীভাবে পাবে?",why:"১, ২, ৩… বিন্দুর সারি মিলে একটি সিঁড়ি। একই সিঁড়ি উল্টো করে পাশে বসালে n সারি ও n+১ কলামের আয়তক্ষেত্র হয়। আয়তক্ষেত্রে দুটি সমান সিঁড়ি, তাই একটি সিঁড়ির বিন্দু পেতে মোটের অর্ধেক নিই।",remember:"একই সিঁড়ি দুবার নিলে আয়তক্ষেত্র হয়। একটি সিঁড়ির বিন্দু পেতে আয়তক্ষেত্রের অর্ধেক নিই।",next:"এবার সব মেশিন তোমার। নিজের প্রশ্নের পরীক্ষা করবে?"},
  {title:"Pattern Lab",short:"Pattern Lab",hook:"তুমি নিয়ম বদলালে কী বদলাবে? কোন জিনিসটি একই থাকবে?",why:"একবারে একটি জিনিস বদলাও, ফল দেখার আগে একটি অনুমান করো, তারপর পরীক্ষা করো। ফল না মিললে নিজের নিয়মটি সংশোধন করো। অন্য কাউকে কেন কাজ করে বোঝাতে পারলেই আবিষ্কারটি আরও স্পষ্ট হবে।",remember:"আবিষ্কার করো → পরীক্ষা করো → ভুল ধরো → নিয়ম আবার লেখো। এখানে নম্বর নেই।",next:"পাঁচটি রহস্যের মানচিত্রে এবার নিজের আবিষ্কার কাজে লাগাও।"}
];

function Opening(){
  const [answers,setAnswers]=useState<(number|null)[]>([null,null,null,null]),[stage,setStage]=useState(3),[animating,setAnimating]=useState(false);
  const questions=[{title:"রঙের পরের ধাপ",options:["লাল","নীল","সবুজ"],correct:1,hint:"লাল, নীল—একই জোড়া বারবার ফিরছে।"},{title:"২, ৪, ৬, ৮, ?",options:["৯","১০","১২"],correct:1,hint:"প্রতিবার ২ করে যোগ করো।"},{title:"১, ৪, ৯, ১৬, ?",options:["২০","২৫","৩২"],correct:1,hint:"১×১, ২×২, ৩×৩, ৪×৪… এবার ৫×৫।"},{title:"১ → ২ → ৩ → ৪ বর্গ",options:["১২ কাঠি","১৩ কাঠি","১৬ কাঠি"],correct:1,hint:"৪, ৭, ১০… নতুন বর্গে তিনটি করে কাঠি যোগ হয়।"}];
  useEffect(()=>{if(!animating)return;if(stage>=3){setAnimating(false);return;}const t=setTimeout(()=>setStage(n=>n+1),800);return ()=>clearTimeout(t);},[animating,stage]);
  const recognized=answers.some((a,i)=>a===questions[i].correct);
  return <section className={s.opening} aria-labelledby="opening-title"><div className={s.sectionIntro}><span className={s.micro}>আগে দেখি, তারপর নাম দিই</span><h2 id="opening-title">কিছু একটা মিলছে, তাই না?</h2><p>চারটি অসম্পূর্ণ ছবি। তোমার অনুমানটি বেছে নাও। ভুল হলে আবার চেষ্টা করো।</p></div>
    <div className={s.openingGrid}>{questions.map((q,i)=><article className={s.puzzle} key={q.title}><p className={s.micro}>রহস্য ০{bn(i+1)}</p>{i===0?<div className={s.colorPattern} aria-label="লাল, নীল, লাল, নীল, লাল, প্রশ্নচিহ্ন">{[0,1,0,1,0].map((color,j)=><i className={color===0?s.redCircle:s.blueCircle} key={j}/>)}<b>?</b></div>:i===3?<div className={s.openingSticks}><MatchstickDiagram n={stage}/><button type="button" aria-label="কাঠির বর্গ বাড়তে দেখি" onClick={()=>{setStage(1);setAnimating(true);}}><Play size={14}/> ১ → ২ → ৩</button></div>:<div className={s.puzzleSequence}>{q.title}</div>}<h3>{i===0?"পরের রংটি কী?":i===3?"চারটি বর্গে কয়টি কাঠি?":"প্রশ্নচিহ্নের জায়গায় কত?"}</h3><div className={s.puzzleChoices}>{q.options.map((text,j)=><button type="button" aria-pressed={answers[i]===j} className={answers[i]===j?s.chosen:""} key={text} onClick={()=>setAnswers(old=>old.map((a,k)=>k===i?j:a))}>{text}</button>)}</div><p className={answers[i]===q.correct?s.success:s.feedback} role="status">{answers[i]===null?"আগে নিজে আন্দাজ করো।":answers[i]===q.correct?<><Check size={15}/> ঠিক ধরেছ! {q.hint}</>:q.hint}</p></article>)}</div>
    {recognized&&<div className={s.firstDiscovery} role="status"><Lightbulb/><div><h3>তুমি এখনই একটি pattern চিনে ফেলেছ।</h3><p>একটি নিয়ম মেনে সাজানো বা বদলানো আকার ও সংখ্যার ধারাতেই প্যাটার্ন খুঁজে পাই। এবার নিয়মটি দেখব, বদলাব, আর নিজের ভাষায় তৈরি করব।</p></div></div>}
  </section>;
}

function Lesson({index,children,challenge}:{index:number;children:ReactNode;challenge?:ReactNode}){
  const lesson=LESSONS[index];
  return <section id={`pattern-lesson-${index+1}`} data-pattern-lesson={index} className={s.lesson} aria-labelledby={`pattern-title-${index+1}`}>
    <header className={s.lessonHeader}><span className={s.lessonNumber}>{String(index+1).padStart(2,"0")}</span><div><span className={s.micro}>দেখি · আন্দাজ করি</span><h2 id={`pattern-title-${index+1}`}>{lesson.title}</h2><p>{lesson.hook}</p></div></header>
    <div className={s.lessonBody}><div className={s.experiment}><p className={s.stageLabel}><FlaskConical size={16}/> দেখি → চলন দেখি → নিজে বদলাই</p>{children}</div><aside className={s.reasoning}><div><span className={s.micro}>কেন এমন হয়?</span><p>{lesson.why}</p></div><div className={s.remember}><Lightbulb size={20}/><div><b>মনে রাখো</b><p>{lesson.remember}</p></div></div>{challenge}<a className={s.nextDiscovery} href={index<9?`#pattern-lesson-${index+2}`:"#pattern-mission"}><small>পরের আবিষ্কার</small><span>{lesson.next}</span><ArrowRight size={18}/></a></aside></div>
  </section>;
}

export default function PatternChapter({pdfPath}:{pdfPath:string}){
  const [active,setActive]=useState(0);const rail=useRef<HTMLDivElement>(null);const root=useRef<HTMLElement>(null);const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  useEffect(()=>{
    const header=document.querySelector(".bujhi-nav");
    const update=()=>{const h=header?.getBoundingClientRect().height||0;root.current?.style.setProperty("--pattern-header-height",`${h}px`);};update();
    const resize=new ResizeObserver(update);if(header)resize.observe(header);
    const nodes=Array.from(document.querySelectorAll<HTMLElement>("[data-pattern-lesson]"));
    let frame=0;
    const sync=()=>{
      frame=0;
      const top=(header?.getBoundingClientRect().height||0)+120;
      const current=nodes.filter(n=>n.getBoundingClientRect().top<=top).at(-1);
      if(current)setActive(Number(current.dataset.patternLesson));else setActive(0);
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(sync);};
    window.addEventListener("scroll",onScroll,{passive:true});sync();
    return ()=>{resize.disconnect();window.removeEventListener("scroll",onScroll);cancelAnimationFrame(frame);};
  },[]);
  useEffect(()=>{const button=buttons.current[active],viewport=rail.current;if(button&&viewport)viewport.scrollTo({left:Math.max(0,button.offsetLeft-(viewport.clientWidth-button.clientWidth)/2),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});},[active]);
  function jump(index:number){setActive(index);document.getElementById(`pattern-lesson-${index+1}`)?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});}
  return <main className={s.page} ref={root} lang="bn" data-no-translate>
    <div className={s.container}><nav className={s.breadcrumb} aria-label="পাঠের অবস্থান"><Link href="/learn/class-8/mathematics"><ArrowLeft size={16}/> গণিত বইয়ে ফিরি</Link><span>অষ্টম শ্রেণি / অধ্যায় ১</span></nav>
      <header className={s.hero}><div><p className={s.kicker}><FlaskConical size={16}/> BUJHI DISCOVERY LAB · গণিত</p><h1>প্যাটার্ন<span>দেখো। বদলাও।<br/>নিয়মটা নিজেই বানাও।</span></h1><p className={s.heroDescription}>কাঠি, বিন্দু আর সংখ্যার ভেতর লুকিয়ে আছে নিয়ম। দশটি ছোট আবিষ্কারে চলো সেই নিয়ম খুঁজে বের করি।</p><a className={s.heroCta} href="#opening-title">প্রথম রহস্যটি দেখি <ArrowRight size={18}/></a></div><div className={s.heroArt} aria-hidden="true"><span className={s.artLabel}>A RULE IS HIDING HERE</span><div className={s.heroDots}>{[1,4,9].map((n,i)=><div key={n}><div style={{gridTemplateColumns:`repeat(${i+1},1fr)`}}>{Array.from({length:n},(_,j)=><i key={j}/>)}</div><b>{bn(n)}</b></div>)}</div><span className={s.artArrow}>১² <MoveRight/> ২² <MoveRight/> ৩²</span><div className={s.artRule}>পরের ধাপটি তুমি তৈরি করবে। <span>?</span></div></div></header>
      <ol className={s.learningFlow} aria-label="শেখার পথ">{["দেখি","আন্দাজ করি","animation দেখি","নিজে change করি","rule খুঁজি","formula বানাই","ছোট challenge করি"].map((text,i)=><li key={text}><span>{String(i+1).padStart(2,"0")}</span>{text}{i<6&&<ChevronRight size={13}/>}</li>)}</ol>
      <Opening/>
    </div>
    <nav className={s.lessonNav} aria-label="প্যাটার্নের দশটি পাঠ"><div className={s.navInner}><button type="button" className={s.navArrow} onClick={()=>jump(active-1)} disabled={active===0} aria-label="আগের আবিষ্কারে যাই"><ChevronLeft size={20}/></button><div className={s.navViewport} ref={rail}><div className={s.navTrack}><div className={s.slidingPointer} style={{transform:`translateX(${active*124}px)`}} aria-hidden="true"/>{LESSONS.map((lesson,i)=><button type="button" key={lesson.short} ref={node=>{buttons.current[i]=node;}} onClick={()=>jump(i)} aria-current={active===i?"step":undefined} aria-label={`${String(i+1).padStart(2,"0")} ${lesson.title}`}><span>{String(i+1).padStart(2,"0")}</span><b>{lesson.short}</b></button>)}</div></div><button type="button" className={s.navArrow} onClick={()=>jump(active+1)} disabled={active===9} aria-label="পরের আবিষ্কারে যাই"><ChevronRight size={20}/></button></div><div className={s.navCaption}><span>{LESSONS[active].title}</span><a href="#pattern-mission">Pattern Mission <FlagMark/></a></div></nav>
    <div className={s.container}>
      <Lesson index={0} challenge={<NumberChallenge question="● ▲ ● ▲ ● — পরের আকারের কয়টি বাহু?" answer={3} hint="পরেরটি ত্রিভুজ। ত্রিভুজের বাহু গুনে দেখো।" explain="৩টি বাহু। বৃত্তের পর আবার ত্রিভুজ আসে।"/>}><RuleChoice/></Lesson>
      <Lesson index={1} challenge={<NumberChallenge question="২, ৫, ৮, ১১, ? — পরের পদ কত?" answer={14} hint="পাশাপাশি দুটি পদের পার্থক্য ৩। ১১-এর সঙ্গে ৩ যোগ করো।" explain="১৪। একই +৩ নিয়ম আরেকবার কাজে লাগালে।"/>}><PatternMachine/></Lesson>
      <Lesson index={2} challenge={<NumberChallenge question="৫² থেকে ৬²-তে যেতে নতুন কয়টি বিন্দু লাগবে?" answer={11} hint="৩৬ − ২৫ করে দেখো। অথবা ২×৬ − ১।" explain="১১টি। নতুন L-আকৃতির স্তরে ২×৬ − ১টি বিন্দু।"/>}><SquareLab/></Lesson>
      <Lesson index={3} challenge={<NumberChallenge question="২, ৩, ৫, ৭, ১১-এর পরের মৌলিক সংখ্যা কত?" answer={13} hint="১২-কে ২ দিয়ে ভাগ যায়। পরের সংখ্যাটির গুণনীয়ক খোঁজো।" explain="১৩। এর ধনাত্মক গুণনীয়ক শুধু ১ ও ১৩।"/>}><PrimeSieveLab/></Lesson>
      <Lesson index={4} challenge={<NumberChallenge question="২, ৩, ৫, ৮, ? — এবার কত?" answer={13} hint="শেষ দুটি পদ ৫ ও ৮। তাদের যোগ করো।" explain="১৩। ৫ + ৮ = ১৩।"/>}><FibonacciLab/></Lesson>
      <Lesson index={5} challenge={<NumberChallenge question="কেন্দ্রে ৫ হলে বিপরীত ঘরের দুটি সংখ্যার যোগফল কত?" answer={10} hint="মাঝখান দিয়ে যাওয়া সারির যোগফল ১৫। সেখান থেকে ৫ বাদ দাও।" explain="১০। বিপরীত দুটি সংখ্যা + কেন্দ্রের ৫ = ১৫।"/>}><MagicSquareLab/></Lesson>
      <Lesson index={6} challenge={<NumberChallenge question="পাশাপাশি ৫টি সংযুক্ত বর্গে কয়টি কাঠি?" answer={16} hint="৪ + ৪×৩ হিসাব করো।" explain="১৬টি। প্রথম বর্গে ৪, পরের চারটিতে ৩টি করে।"/>}><MatchstickBuilder/></Lesson>
      <Lesson index={7} challenge={<NumberChallenge question="নিয়ম ৭n + ২ হলে দশম পদ কত?" answer={72} hint="n-এর জায়গায় ১০ বসাও: ৭×১০ + ২।" explain="৭২। অবস্থান n=১০ সূত্রে বসিয়েই দশম পদ পেলে।"/>}><NthTermMachine/></Lesson>
      <Lesson index={8} challenge={<NumberChallenge question="১ + ২ + … + ২০ = কত?" answer={210} hint="২০×২১-এর অর্ধেক নাও।" explain="২১০। দুটি সমান সিঁড়িতে ২০×২১ = ৪২০; একটিতে অর্ধেক।"/>}><SumLab/></Lesson>
      <Lesson index={9} challenge={<NumberChallenge question="মেশিনে শুরু ৩, প্রতিবার ×২ দাও। চতুর্থ পদ কত হবে?" answer={24} hint="৩ → ৬ → ১২ → ?। উত্তর বলার আগে নিজের মেশিনে পরীক্ষা করো।" explain="২৪। নিজের বেছে নেওয়া নিয়মটি পরীক্ষা করে ব্যাখ্যাও করতে পারলে।"/>}><FreePatternLab/></Lesson>
      <PatternMission/>
      <footer className={s.chapterFooter}><div><span className={s.micro}>দেখা থেকে বোঝা</span><h2>এবার নিয়মগুলো নিজের ভাষায় বলো।</h2><p>এই দশটি অনুসন্ধান Bujhi-এর নিজস্ব শেখার পথ। মূল অধ্যায় ‘প্যাটার্ন’—NCTB গণিত, অষ্টম শ্রেণি, পৃষ্ঠা ১–১১। বইয়ের অনুশীলনও করে দেখো।</p></div><div><a href={pdfPath} target="_blank" rel="noopener noreferrer"><BookOpen size={18}/> মূল পাঠ্যবই পড়ি</a><Link href="/learn/class-8/mathematics/chapter-2">পরের অধ্যায়: মুনাফা <ArrowRight size={18}/></Link></div></footer>
    </div>
  </main>;
}

function FlagMark(){return <span aria-hidden="true">↗</span>;}
