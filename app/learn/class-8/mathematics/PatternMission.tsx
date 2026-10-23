"use client";

import {useEffect,useState} from "react";
import {Check,Flag,RotateCcw} from "lucide-react";
import {MagicSquareLab,NumberChallenge} from "./PatternLabs";
import {bn} from "./patternMath";
import s from "./pattern.module.css";

const KEY="bujhi-class8-pattern-mission-v1";
const TASKS=["সংখ্যার নিয়ম","মৌলিক ছাঁকনি","Fibonacci","ম্যাজিক স্কয়ার","কাঠির রহস্য"];

function PrimeMission({solved,onSolved}:{solved:boolean;onSolved:()=>void}){
  const [removed,setRemoved]=useState<number[]>([]),[checked,setChecked]=useState(false);
  const correct=removed.length===3&&[21,22,25].every(n=>removed.includes(n));
  return <div className={s.missionPuzzle}><h4>২১, ২২, ২৩, ২৫ — যৌগিকগুলো ছেঁকে বাদ দাও।</h4><p>যে সংখ্যাটি কাটতে চাও, সেটিতে চাপ দাও। কেবল মৌলিক সংখ্যাটি রেখে দাও।</p><div className={s.missionNumbers}>{[21,22,23,25].map(n=><button type="button" key={n} disabled={solved} aria-pressed={removed.includes(n)} className={removed.includes(n)?s.removed:""} onClick={()=>{setChecked(false);setRemoved(old=>old.includes(n)?old.filter(x=>x!==n):[...old,n]);}}>{bn(n)}{removed.includes(n)&&<span>বাদ</span>}</button>)}</div><button type="button" className={s.primaryButton} disabled={solved} onClick={()=>{setChecked(true);if(correct)onSolved();}}>ছাঁকনি মিলাই</button><p role="status" className={solved?s.success:s.feedback}>{solved?"২৩ রইল। ২১ = ৩×৭, ২২ = ২×১১, ২৫ = ৫×৫; এগুলো যৌগিক।":checked?"২, ৩ ও ৫ দিয়ে ভাগ করে দেখো। সব যৌগিক বাদ পড়েছে? কোনো মৌলিক কেটে ফেলেছ?":"কাটা সংখ্যায় আবার চাপ দিলে সেটি ফিরবে।"}</p></div>;
}

export default function PatternMission(){
  const [done,setDone]=useState<boolean[]>([false,false,false,false,false]),[active,setActive]=useState(0),[loaded,setLoaded]=useState(false),[attempt,setAttempt]=useState(0),[resetPrompt,setResetPrompt]=useState(false);
  useEffect(()=>{try{const parsed=JSON.parse(localStorage.getItem(KEY)||"null");if(Array.isArray(parsed)&&parsed.length===5&&parsed.every(x=>typeof x==="boolean"))setDone(parsed);}catch{}setLoaded(true);},[]);
  useEffect(()=>{if(!loaded)return;try{localStorage.setItem(KEY,JSON.stringify(done));}catch{}},[done,loaded]);
  const completed=done.filter(Boolean).length;
  function complete(i:number){setDone(old=>old.map((v,n)=>n===i?true:v));}
  return <section className={s.mission} id="pattern-mission" aria-labelledby="mission-title"><div className={s.missionHeading}><span className={s.micro}><Flag size={16}/> অধ্যায় শেষের অভিযান</span><h2 id="mission-title">Pattern Mission</h2><p>পাঁচটি রহস্য। প্রতিটি সমাধানে মানচিত্রের আরেকটি অংশ খুলবে। ল্যাবে ফিরে যাওয়া সবসময় চলে।</p></div>
    <ol className={s.missionMap} aria-label="মিশনের মানচিত্র">{TASKS.map((title,i)=><li key={title}><button type="button" className={`${done[i]?s.missionDone:""} ${active===i?s.missionActive:""}`} aria-current={active===i?"step":undefined} onClick={()=>setActive(i)}><span>{done[i]?<Check size={20}/>:String(i+1).padStart(2,"0")}</span><b>{title}</b><small>{done[i]?"আবিষ্কৃত":"খুঁজে দেখি"}</small></button></li>)}</ol>
    <div className={s.missionPanel} key={`${active}-${attempt}`}><p className={s.micro}>রহস্য {bn(active+1)} / ৫ · {TASKS[active]}</p>
      {active===0&&<NumberChallenge question="৫, ৯, ১৩, ১৭, ? — পরের সংখ্যাটি কত?" answer={21} hint="প্রতিবার কত যোগ হয়েছে? সেই নিয়ম আরেকবার ব্যবহার করো।" explain="২১। প্রতিবার ৪ করে বাড়ে; সাধারণ নিয়ম ৪n + ১।" solved={done[0]} onSolved={()=>complete(0)}/>}
      {active===1&&<PrimeMission solved={done[1]} onSolved={()=>complete(1)}/>}
      {active===2&&<NumberChallenge question="২, ৫, ৭, ১২, ? — আগের দুটি যোগ করলে এবার কত?" answer={19} hint="৭ ও ১২ হলো আগের দুটি পদ। তাদের যোগ করো।" explain="১৯। ৭ + ১২ = ১৯; শুরুর পদ বদলালেও Fibonacci-ধরনের নিয়ম ঠিক আছে।" solved={done[2]} onSolved={()=>complete(2)}/>}
      {active===3&&<MagicSquareLab mission solved={done[3]} onSolved={()=>complete(3)}/>}
      {active===4&&<NumberChallenge question="পাশাপাশি ২০টি সংযুক্ত বর্গ বানাতে কয়টি কাঠি লাগবে?" answer={61} hint="প্রথমটিতে ৪টি, পরের ১৯টিতে ৩টি করে। অথবা ৩n + ১।" explain="৬১। ৪ + ১৯×৩ = ৩×২০ + ১ = ৬১। সবগুলো না এঁকেও নিয়ম দিয়ে উত্তর পেলে।" solved={done[4]} onSolved={()=>complete(4)}/>}
      <div className={s.missionActions}><span role="status">মানচিত্রে {bn(completed)} / ৫ অংশ আবিষ্কৃত</span>{done[active]&&completed<5&&<button type="button" onClick={()=>setActive(done.findIndex((v,i)=>!v&&i>active)!==-1?done.findIndex((v,i)=>!v&&i>active):done.findIndex(v=>!v))}>পরের রহস্য →</button>}</div>
    </div>
    {completed===5&&<div className={s.completion} role="status"><Check size={32}/><h3>সব রহস্যের নিয়ম পেয়ে গেছ!</h3><p>তুমি pattern শুধু চিনতে পারো না—এখন তুমি rule তৈরি, test এবং explain-ও করতে পারো।</p></div>}
    <div className={s.missionFoot}><small>এই ব্রাউজারে মিশনের অগ্রগতি থাকবে।</small>{resetPrompt?<div><span>পাঁচটি রহস্য আবার শুরু করবে?</span><button type="button" onClick={()=>{setDone([false,false,false,false,false]);setActive(0);setAttempt(n=>n+1);setResetPrompt(false);}}>হ্যাঁ, শুরু করি</button><button type="button" onClick={()=>setResetPrompt(false)}>অগ্রগতি রাখি</button></div>:<button type="button" className={s.textButton} onClick={()=>setResetPrompt(true)}><RotateCcw size={14}/> নতুন অভিযান</button>}</div>
  </section>;
}
