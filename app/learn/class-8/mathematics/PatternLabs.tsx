"use client";

import {useEffect,useId,useRef,useState} from "react";
import {ArrowRight,Check,Pause,Play,RotateCcw} from "lucide-react";
import {bn,fibonacci,isMagicSquare,isPrime,MAGIC_LINES,magicLineSums,matchsticks,multiples,nthTerm,positionOf,readNumber,sequence,sumDots,type MagicBoard} from "./patternMath";
import s from "./pattern.module.css";

function usePlayback(length:number,delay=700){
  const [at,setAt]=useState(0),[playing,setPlaying]=useState(false);
  useEffect(()=>{
    if(!playing)return;
    if(at>=length-1){setPlaying(false);return;}
    const timer=window.setTimeout(()=>setAt(n=>n+1),delay);
    return ()=>window.clearTimeout(timer);
  },[playing,at,length,delay]);
  return {at,playing,setAt,setPlaying,reset:()=>{setAt(0);setPlaying(false);}};
}

function Playback({p,length,label="নিয়মের চলন দেখি"}:{p:ReturnType<typeof usePlayback>;length:number;label?:string}){
  return <div className={s.playback}><button type="button" onClick={()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){p.setPlaying(false);p.setAt(p.at===length-1?0:p.at+1);return;}if(p.at===length-1)p.setAt(0);p.setPlaying(!p.playing);}} aria-pressed={p.playing}>{p.playing?<Pause size={16}/>:<Play size={16}/>} {p.playing?"থামাই":label}</button><button type="button" onClick={()=>{p.setPlaying(false);p.setAt(Math.min(length-1,p.at+1));}} disabled={p.at===length-1}>এক ধাপ <ArrowRight size={16}/></button><button type="button" onClick={p.reset} aria-label="অ্যানিমেশন আবার শুরু করি"><RotateCcw size={16}/></button><span>{bn(p.at+1)} / {bn(length)}</span></div>;
}

export function Slider({label,value,min=1,max,onChange}:{label:string;value:number;min?:number;max:number;onChange:(n:number)=>void}){
  const id=useId();
  return <label className={s.slider} htmlFor={id}><span>{label}<b>{bn(value)}</b></span><input id={id} type="range" min={min} max={max} step="1" value={value} onChange={e=>onChange(Number(e.target.value))}/><small>{bn(min)}<span>টেনে বদলাও · তীরচিহ্ন দিয়েও চলে</span>{bn(max)}</small></label>;
}

export function NumberChallenge({question,answer,hint,explain,onSolved,solved=false}:{question:string;answer:number;hint:string;explain:string;onSolved?:()=>void;solved?:boolean}){
  const id=useId();
  const [value,setValue]=useState(""),[checked,setChecked]=useState(false),[correct,setCorrect]=useState(false);
  const done=correct||solved;
  return <form className={s.challenge} onSubmit={e=>{e.preventDefault();const ok=value.trim()!==""&&readNumber(value)===answer;setChecked(true);setCorrect(ok);if(ok)onSolved?.();}}>
    <label htmlFor={id}><span className={s.micro}>ছোট চ্যালেঞ্জ</span><strong>{question}</strong></label>
    {!done&&<div className={s.answerRow}><input id={id} inputMode="numeric" autoComplete="off" value={value} onChange={e=>{setValue(e.target.value);setChecked(false);}} aria-label={question} placeholder="তোমার উত্তর" required/><button type="submit">মিলিয়ে দেখি <ArrowRight size={16}/></button></div>}
    <p className={done?s.success:s.feedback} role="status">{done?<><Check size={16}/> {explain}</>:checked?hint:"আগে আন্দাজ করো, তারপর ল্যাবে মিলিয়ে নাও।"}</p>
  </form>;
}

export function RuleChoice(){
  const [choice,setChoice]=useState<number|null>(null);
  const [growing,setGrowing]=useState(false);const p=usePlayback(6);
  const options=["● ▲ ● ▲ ● ▲","● ▲ ▲ ● ● ▲","● ● ▲ ▲ ● ▲"];
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>দেখি → আন্দাজ করি</span><h3>Pattern or Not?</h3><p>নিয়মটি হলো: একটি বৃত্ত, একটি ত্রিভুজ, আবার একটি বৃত্ত। কোনটি এই নিয়ম মানে?</p></div><div className={s.choiceGrid}>{options.map((text,i)=><button type="button" key={text} aria-pressed={choice===i} onClick={()=>setChoice(i)} className={choice===i?s.chosen:""}><span className={s.shapeSequence}>{text}</span><small>প্যাটার্ন {bn(i+1)}</small></button>)}</div><p className={choice===0?s.success:s.feedback} role="status">{choice===null?"শুধু রং নয়, আকারের ক্রমটিও লক্ষ করো।":choice===0?"ঠিক ধরেছ! বৃত্ত ও ত্রিভুজ পর্যায়ক্রমে ফিরে এসেছে।":"দ্বিতীয় আকারটির পর আবার বৃত্ত আসার কথা। প্রতিটি জোড়া দেখে চেষ্টা করো।"}</p><div className={s.tabs} role="group" aria-label="ফিরে আসে নাকি বাড়ে"><button type="button" aria-pressed={!growing} onClick={()=>{setGrowing(false);p.reset();}}>ফিরে আসে</button><button type="button" aria-pressed={growing} onClick={()=>{setGrowing(true);p.reset();}}>বাড়তে থাকে</button></div><div className={s.patternReveal} aria-label={growing?`${bn(p.at+1)}টি বিন্দুর সারি`:`${bn(p.at+1)}টি আকারের পুনরাবৃত্তি`}>{Array.from({length:p.at+1},(_,i)=><span key={i}>{growing?"●":i%2===0?"●":"▲"}</span>)}</div><Playback p={p} length={6} label="আকারের চলন দেখি"/><p className={s.caption}>{growing?"প্রতি ধাপে একটি নতুন বিন্দু। একই নিয়মে সারিটি বড় হচ্ছে।":"বৃত্ত → ত্রিভুজ; একই জোড়া বারবার ফিরে আসে।"}</p><div className={s.observation}><b>নিয়ম বদলালেও প্যাটার্ন হতে পারে।</b><p>কোনো ছোট সংখ্যাতালিকার একাধিক ব্যাখ্যা হতে পারে। এখানে আমরা দেওয়া নিয়মের সঙ্গে মিল খুঁজছি; অন্য তালিকাকে চিরদিনের জন্য ‘প্যাটার্ন নয়’ বলছি না।</p></div></div>;
}

export function PatternMachine(){
  const [start,setStart]=useState(2),[amount,setAmount]=useState(3),[op,setOp]=useState<"add"|"multiply">("add");
  const p=usePlayback(6);const values=sequence(start,op,amount);const id=useId();
  return <div className={s.lab}>
    <div className={s.labHeading}><span className={s.micro}>Pattern Machine</span><h3>একটি সংখ্যা ঢোকে। একটি নিয়ম কাজ করে।</h3><p>পরের সংখ্যাটি দেখার আগে অনুমান করো। তারপর এক ধাপ করে মিলিয়ে নাও।</p></div>
    <div className={s.machineStrip} aria-label="তৈরি হওয়া সংখ্যার প্যাটার্ন">{values.map((n,i)=><div className={s.termGroup} key={i}>{i>0&&<span className={s.operation}>{op==="add"?"+":"×"}{bn(amount)}<ArrowRight size={15}/></span>}<div className={`${s.term} ${i===p.at?s.termActive:""} ${i>p.at?s.termHidden:""}`}><small>{bn(i+1)} নং</small><b>{i<=p.at?bn(n):"?"}</b></div></div>)}</div>
    <Playback p={p} length={6}/>
    <div className={s.controls}><Slider label="শুরুর সংখ্যা" value={start} min={0} max={10} onChange={n=>{setStart(n);p.reset();}}/><label className={s.field} htmlFor={id}><span>কী কাজ করবে?</span><select id={id} value={op} onChange={e=>{setOp(e.target.value as "add"|"multiply");p.reset();}}><option value="add">যোগ (+)</option><option value="multiply">গুণ (×)</option></select></label><Slider label={op==="add"?"প্রতিবার যোগ করি":"প্রতিবার গুণ করি"} value={amount} max={5} onChange={n=>{setAmount(n);p.reset();}}/></div>
    <div className={s.equation}>{p.at===0?`শুরু → ${bn(start)}`:`${bn(values[p.at-1])} ${op==="add"?"+":"×"} ${bn(amount)} = ${bn(values[p.at])}`}</div>
    <p className={s.caption}>{op==="add"?`পাশাপাশি দুটি পদের পার্থক্য সবসময় ${bn(amount)}।`:`প্রতিটি পদ আগের পদের ${bn(amount)} গুণ। শূন্য দিয়ে শুরু করলে সব পদই শূন্য থাকে।`}</p>
  </div>;
}

export function SquareLab(){
  const [n,setN]=useState(4),[view,setView]=useState<"square"|"odd"|"even">("square");
  const [arranged,setArranged]=useState(true);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  const total=view==="square"?n*n:view==="odd"?2*n-1:2*n;
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>Dot-square Lab</span><h3>সংখ্যাটি আসলে কতগুলো বিন্দু?</h3></div><div className={s.tabs} role="group" aria-label="বিন্দু দেখার ধরন">{([["square","বর্গসংখ্যা"],["odd","বিজোড় সংখ্যা"],["even","জোড় সংখ্যা"]] as const).map(([id,label])=><button type="button" key={id} aria-pressed={view===id} onClick={()=>setView(id)}>{label}</button>)}</div>
    <div className={s.dotStage}>
      <svg viewBox="0 0 320 290" role="img" aria-label={view==="square"?`${bn(n)} বাই ${bn(n)} ঘরে ${bn(total)}টি বিন্দু`:view==="odd"?`${bn(total)}টি বিন্দু; একটি জোড়াহীন`:`${bn(total)}টি বিন্দু ${bn(n)}টি জোড়ায়`}>
        {Array.from({length:total},(_,i)=>{const row=view==="square"?Math.floor(i/n):Math.floor(i/2),col=view==="square"?i%n:i%2;const step=view==="square"?Math.min(42,240/n):Math.min(22,240/n);const x=view==="square"?160+(col-(n-1)/2)*step:145+col*30,y=view==="square"?140+(row-(n-1)/2)*step:25+row*step;const fresh=view==="square"?(row===n-1||col===n-1):view==="odd"&&i===total-1;return <circle key={i} cx={arranged?x:25+(i*47)%270} cy={arranged?y:25+(i*31)%240} r={view==="square"?Math.max(4,Math.min(9,step*.23)):7} className={`${s.dot} ${fresh?s.newDot:""}`}/>;})}
        <text x="160" y="283" textAnchor="middle" className={s.svgLabel}>{view==="square"?`${bn(n)} × ${bn(n)} = ${bn(total)}`:view==="odd"?`${bn(n-1)} জোড়া + ১ = ${bn(total)}`:`${bn(n)} জোড়া = ${bn(total)}`}</text>
      </svg>
    </div><Slider label="n · অবস্থান" value={n} max={12} onChange={setN}/>
    <button type="button" className={s.textButton} onClick={()=>{if(timer.current)clearTimeout(timer.current);setArranged(false);timer.current=setTimeout(()=>setArranged(true),450);}}><Play size={16}/> বিন্দুগুলো সাজিয়ে দেখি</button>
    <div className={s.observation}>{view==="square"?<><b>{bn((n-1)**2)} + <em>{bn(2*n-1)}</em> = {bn(n*n)}</b><p>লাল নতুন সারি ও কলাম মিলে {bn(2*n-1)}টি বিন্দু। তাই পরপর দুটি বর্গসংখ্যার পার্থক্য বিজোড়: ৩, ৫, ৭, ৯…</p></>:<><b>{view==="odd"?"একটি বিন্দু জোড়াহীন থাকে।":"সব বিন্দু জোড়া করা যায়।"}</b><p>{view==="odd"?"n-তম ধনাত্মক বিজোড় সংখ্যা = ২n − ১।":"n-তম ধনাত্মক জোড় সংখ্যা = ২n।"}</p></>}</div>
  </div>;
}

export function PrimeSieveLab(){
  const [base,setBase]=useState(2),[crossed,setCrossed]=useState<number[]>([]),[completed,setCompleted]=useState<number[]>([]),[cursor,setCursor]=useState<number|null>(null),[inspected,setInspected]=useState<number|null>(null),[playing,setPlaying]=useState(false);
  const crossedRef=useRef<HTMLDivElement>(null);const steps=multiples(base);
  useEffect(()=>{const grid=crossedRef.current;if(!grid||cursor===null)return;const cell=grid.children[cursor-1] as HTMLElement;if(cell)grid.scrollTo({top:Math.max(0,cell.offsetTop-grid.clientHeight/2),behavior:"auto"});},[cursor]);
  function mark(value:number){setCursor(value);setCrossed(old=>old.includes(value)?old:[...old,value]);}
  function step(){const next=cursor===null?steps[0]:steps[steps.indexOf(cursor)+1];if(next!==undefined){mark(next);}else{setPlaying(false);setCompleted(old=>old.includes(base)?old:[...old,base]);}}
  useEffect(()=>{if(!playing)return;const t=window.setTimeout(step,160);return ()=>clearTimeout(t);});
  const finished=completed.length===4;
  const count=Array.from({length:99},(_,i)=>i+2).filter(n=>!crossed.includes(n)).length;
  const factor=inspected===null?null:Array.from({length:Math.max(0,inspected-2)},(_,i)=>i+2).find(n=>inspected%n===0);
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>Prime Sieve Lab · ১–১০০</span><h3>যার অন্য গুণনীয়ক আছে, তাকে চিহ্নিত করি।</h3><p>২, ৩, ৫ ও ৭-এর গুণিতক কাটো। চলন্ত ঘরটি দেখায় কোন গুণিতক কেন বাদ পড়ছে।</p></div>
    <div className={s.tabs} role="group" aria-label="মৌলিক ছাঁকনির ধাপ">{[2,3,5,7].map(n=><button type="button" aria-pressed={base===n} key={n} onClick={()=>{setBase(n);setCursor(null);setPlaying(false);}}>{bn(n)}-এর গুণিতক {completed.includes(n)&&<Check size={14}/>}</button>)}</div>
    <div className={s.sieveReadout}>{cursor===null?<><b>{bn(base)}</b> থাকবে; {bn(base)} × ২ থেকে কাটতে শুরু করো।</>:<><b>{bn(base)} × {bn(cursor/base)} = {bn(cursor)}</b><span>দুটি ১-এর বড় গুণনীয়ক → যৌগিক</span></>}</div>
    <div className={s.primeGrid} ref={crossedRef} aria-label="১ থেকে ১০০ সংখ্যার ছক">{Array.from({length:100},(_,i)=>i+1).map(n=><button type="button" key={n} aria-label={`${bn(n)}${n===1?", মৌলিক বা যৌগিক নয়":crossed.includes(n)?", কাটা গুণিতক":finished?", মৌলিক":""}`} aria-pressed={inspected===n} className={`${n===1?s.neither:""} ${crossed.includes(n)?s.crossed:""} ${cursor===n?s.cursor:""} ${n===base?s.base:""} ${finished&&isPrime(n)?s.prime:""}`} onClick={()=>setInspected(n)}>{bn(n)}{crossed.includes(n)&&<span aria-hidden="true"/>}</button>)}</div>
    <div className={s.playback}><button type="button" aria-pressed={playing} onClick={()=>{if(cursor===steps[steps.length-1])setCursor(null);setPlaying(!playing);}}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?"থামাই":"চলন দেখি"}</button><button type="button" onClick={()=>{setPlaying(false);step();}}>একটি গুণিতক</button><button type="button" onClick={()=>{setPlaying(false);setCrossed(old=>[...new Set([...old,...steps])]);setCursor(steps[steps.length-1]);setCompleted(old=>old.includes(base)?old:[...old,base]);}}>এই ধাপ শেষ করি</button><button type="button" aria-label="ছাঁকনি নতুন করে শুরু করি" onClick={()=>{setCrossed([]);setCompleted([]);setCursor(null);setInspected(null);setPlaying(false);setBase(2);}}><RotateCcw size={16}/></button></div>
    <p className={finished?s.success:s.caption} role="status">{finished?`ছাঁকনি সম্পূর্ণ! ১–১০০-তে ${bn(count)}টি মৌলিক সংখ্যা রইল।`:`${bn(completed.length)} / ৪ ধাপ শেষ। অবশিষ্ট ${bn(count)}টি সংখ্যাকে এখনো সবগুলো মৌলিক বলা যাবে না।`}</p>
    <div className={s.observation}>{inspected===null?<><b>একটি সংখ্যা ছুঁয়ে খুঁজি।</b><p>প্রমাণ দেখতে ছকের যেকোনো সংখ্যায় চাপ দাও।</p></>:inspected===1?<><b>১ মৌলিকও নয়, যৌগিকও নয়।</b><p>মৌলিক সংখ্যার ঠিক দুটি ভিন্ন ধনাত্মক গুণনীয়ক থাকে। ১-এর আছে শুধু একটি।</p></>:isPrime(inspected)?<><b>{bn(inspected)} মৌলিক।</b><p>এর ধনাত্মক গুণনীয়ক শুধু ১ ও {bn(inspected)}। {inspected===2?"২ একমাত্র জোড় মৌলিক সংখ্যা।":"অন্য কোনো সংখ্যা দিয়ে নিঃশেষে ভাগ যায় না।"}</p></>:<><b>{bn(inspected)} = {bn(factor!)} × {bn(inspected/factor!)}</b><p>১ ও নিজের বাইরে গুণনীয়ক পাওয়া গেল, তাই এটি যৌগিক।</p></>}</div>
    <p className={s.caption}>১০০-এর বর্গমূল ১০। প্রতিটি যৌগিক সংখ্যার অন্তত একটি মৌলিক গুণনীয়ক ১০ বা তার কম; তাই ২, ৩, ৫, ৭ পর্যন্ত ছাঁকলেই যথেষ্ট।</p>
  </div>;
}

export function FibonacciLab(){
  const [a,setA]=useState(1),[b,setB]=useState(1);const p=usePlayback(7,950);const values=fibonacci(a,b,8);const at=p.at+1;
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>Fibonacci Generator</span><h3>আগের দুটি সংখ্যা হাত মেলালে…</h3><p>প্রথম দুটি সংখ্যা বেছে নাও। পরের প্রতিটি সংখ্যা তাদের আগের দুটি পদের যোগফল।</p></div>
    <div className={s.fibCombine}>{at>1?<><span key={`a${at}`}>{bn(values[at-2])}</span><i>+</i><span key={`b${at}`}>{bn(values[at-1])}</span><ArrowRight/><strong key={at}>{bn(values[at])}</strong></>:<><span>{bn(a)}</span><span>{bn(b)}</span><small>শুরুর দুটি পদ</small></>}</div>
    <div className={s.fibTerms}>{values.map((n,i)=><div key={i} className={`${s.term} ${i===at?s.termActive:""} ${i>at?s.termHidden:""}`}><small>{bn(i+1)} নং</small><b>{i<=at?bn(n):"?"}</b></div>)}</div>
    <Playback p={p} length={7} label="দুটি থেকে পরেরটি"/>
    <div className={s.controls}><Slider label="প্রথম সংখ্যা" value={a} min={0} max={9} onChange={n=>{setA(n);p.reset();}}/><Slider label="দ্বিতীয় সংখ্যা" value={b} min={0} max={9} onChange={n=>{setB(n);p.reset();}}/></div>
    <p className={s.caption}>{a===1&&b===1?"১, ১, ২, ৩, ৫, ৮… পরিচিত Fibonacci ধারা।":a===0&&b===0?"দুটি শুরুর পদই ০ হলে যোগ করেও সব পদ ০ হয়।":"শুরুর সংখ্যা বদলেছে, যোগের নিয়ম একই। এটি তোমার Fibonacci-ধরনের ধারা।"}</p>
  </div>;
}

export function MagicSquareLab({mission=false,onSolved,solved=false}:{mission?:boolean;onSolved?:()=>void;solved?:boolean}){
  const initial:MagicBoard=mission?[2,null,6,9,5,1,4,3,null]:[null,null,null,null,5,null,null,null,null];
  const [board,setBoard]=useState<MagicBoard>(mission&&solved?[2,7,6,9,5,1,4,3,8]:initial),[selected,setSelected]=useState<number|null>(null),[checked,setChecked]=useState(false);const p=usePlayback(8,1000);
  const fixed=(i:number)=>mission?(solved||initial[i]!==null):i===4;
  const sums=magicLineSums(board),valid=isMagicSquare(board);const used=board.filter((n):n is number=>n!==null);
  function place(index:number,value:number|null){
    if(fixed(index)||value===null||!Number.isInteger(value)||value<1||value>9)return;
    const previous=board.indexOf(value);if(previous!==-1&&fixed(previous))return;
    setBoard(old=>old.map((n,i)=>i===index?value:n===value?null:n));setSelected(null);setChecked(false);
  }
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>Magic Square · একই যোগফল</span><h3>{mission?"দুটি হারানো টাইল বসাও।":"নয়টি ঘর। আটটি যোগফল। একটি নিয়ম।"}</h3><p>সংখ্যা বেছে ঘরে চাপ দাও, অথবা টেনে বসাও। কিবোর্ডে Tab ও Enter দিয়েও করা যায়। ঘরের টাইল বেছে অন্য ঘরে সরানো যায়।</p></div>
    <div className={s.magicWorkspace}><div className={s.magicGrid} aria-label="তিন বাই তিন ম্যাজিক স্কয়ার">{board.map((n,i)=><button type="button" key={i} className={`${fixed(i)?s.fixedTile:""} ${!mission&&MAGIC_LINES[p.at].includes(i)?s.glowTile:""} ${selected!==null&&selected===n?s.selectedTile:""}`} aria-label={`সারি ${bn(Math.floor(i/3)+1)}, কলাম ${bn(i%3+1)}: ${n===null?"খালি":bn(n)}${fixed(i)?", স্থির ঘর":""}`} aria-pressed={!fixed(i)&&n!==null&&selected===n} draggable={n!==null&&!fixed(i)} onDragStart={e=>{if(n!==null)e.dataTransfer.setData("text/plain",String(n));}} onDragOver={e=>{if(!fixed(i))e.preventDefault();}} onDrop={e=>{e.preventDefault();place(i,Number(e.dataTransfer.getData("text/plain")));}} onClick={()=>{if(fixed(i))return;if(selected!==null)place(i,selected);else if(n!==null)setSelected(n);}}>{n===null?<span className={s.emptyTile}>+</span>:bn(n)}{fixed(i)&&<small>স্থির</small>}</button>)}</div>
    <div className={s.magicSums}><strong>লক্ষ্য: প্রতিটি যোগফল ১৫</strong>{sums.map((sum,i)=><div className={`${sum===15?s.correctSum:""} ${p.at===i&&!mission?s.sumActive:""}`} key={i}><span>{i<3?`সারি ${bn(i+1)}`:i<6?`কলাম ${bn(i-2)}`:`কর্ণ ${bn(i-5)}`}</span><b>{sum===null?"—":bn(sum)}</b>{sum===15&&<Check size={14}/>}</div>)}</div></div>
    <div className={s.tileTray} aria-label="বসানোর জন্য সংখ্যা">{Array.from({length:9},(_,i)=>i+1).map(n=><button type="button" key={n} disabled={used.includes(n)} aria-pressed={selected===n} className={selected===n?s.selectedTile:""} draggable={!used.includes(n)} onDragStart={e=>e.dataTransfer.setData("text/plain",String(n))} onClick={()=>setSelected(n)}>{bn(n)}</button>)}</div>
    {selected!==null&&<p className={s.caption} role="status">{bn(selected)} বেছে নিয়েছ। এবার একটি বদলানো যায় এমন ঘরে চাপ দাও। <button type="button" className={s.inlineButton} onClick={()=>setSelected(null)}>বাতিল</button></p>}
    <div className={s.playback}><button type="button" onClick={()=>{setChecked(true);if(valid)onSolved?.();}}><Check size={16}/> সব যোগফল মিলাই</button><button type="button" disabled={mission&&solved} onClick={()=>{setBoard(initial);setSelected(null);setChecked(false);p.reset();}}><RotateCcw size={16}/> নতুন চেষ্টা</button></div>
    {(checked||solved)&&<p className={valid||solved?s.success:s.feedback} role="status">{valid||solved?"তৈরি! ১–৯ একবার করে আছে; তিন সারি, তিন কলাম ও দুই কর্ণের যোগফলই ১৫।":board.includes(null)?"কিছু ঘর এখনো খালি। অবশিষ্ট টাইল বসিয়ে আবার মিলাও।":"প্রতিটি সারি, কলাম এবং দুই কর্ণই দেখো। সবগুলোকে ১৫ করতে হবে।"}</p>}
    {!mission&&<><Playback p={p} length={8} label="সারি → কলাম → কর্ণ দেখি"/><details className={s.hint}><summary>একটু ইঙ্গিত চাই</summary><p>১+২+…+৯ = ৪৫। তিনটি সমান সারিতে ৪৫ ভাগ হলে প্রতিটি সারির যোগফল ১৫। কেন্দ্রে ৫, বিপরীত ঘরের জোড়ার যোগফল ১০। কোণগুলোতে জোড় সংখ্যা দিয়ে চেষ্টা করো।</p></details></>}
  </div>;
}

export function MatchstickDiagram({n,animated=false}:{n:number;animated?:boolean}){
  const sticks=matchsticks(n);
  return <svg className={s.stickDiagram} style={{minWidth:n>4?n*64:undefined}} viewBox={`-0.3 -0.45 ${n+.6} 2.05`} role="img" aria-label={`${bn(n)}টি সংযুক্ত বর্গ, ${bn(sticks.length)}টি কাঠি; নতুন বর্গে তিনটি নতুন কাঠি`}>
    {sticks.map((stick,i)=><line key={`${n}-${i}`} x1={stick.x1} y1={stick.y1} x2={stick.x2} y2={stick.y2} className={`${s.stick} ${stick.fresh?s.freshStick:""} ${stick.shared?s.sharedStick:""} ${animated&&stick.fresh?s.drawStick:""}`}/>)}
    {Array.from({length:n},(_,i)=><text key={i} x={i+.5} y="1.46" textAnchor="middle" className={s.stickNumber}>{bn(i+1)}</text>)}
  </svg>;
}

export function MatchstickBuilder(){
  const [n,setN]=useState(3),[rule,setRule]=useState(false);const [replay,setReplay]=useState(0);const viewport=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=viewport.current;if(el)el.scrollTo({left:el.scrollWidth-el.clientWidth,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});},[n]);
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>Matchstick Builder</span><h3>নতুন বর্গে চারটি কাঠিই কি লাগবে?</h3><p>সোনালি পাশটি আগে থেকেই আছে। লাল তিনটি কাঠি যোগ হলেই পরের বর্গ তৈরি।</p></div>
    <div className={s.stickViewport} ref={viewport} tabIndex={0} aria-label="সংযুক্ত বর্গের চিত্র; পাশে সরিয়ে সব বর্গ দেখি"><MatchstickDiagram key={replay} n={n} animated/></div>
    <div className={s.legend}><span><i className={s.redSwatch}/>নতুন কাঠি</span><span><i className={s.goldSwatch}/>ভাগ করা পাশ</span><span><i/>আগের কাঠি</span></div>
    <Slider label="বর্গের সংখ্যা · n" value={n} max={20} onChange={setN}/><div className={s.equation}>{bn(n)} বর্গ = <strong>{bn(matchsticks(n).length)}</strong> কাঠি</div>
    <div className={s.playback}><button type="button" disabled={n===20} onClick={()=>setN(n+1)}>আরেকটি বর্গ <ArrowRight size={16}/></button><button type="button" onClick={()=>setReplay(replay+1)}><Play size={16}/> নতুন কাঠি যোগ হতে দেখি</button><button type="button" onClick={()=>setRule(!rule)} aria-expanded={rule}>{rule?"নিয়ম গুটিয়ে রাখি":"প্রতিবার কত বাড়ে?"}</button></div>
    {rule&&<div className={s.observation}><b>৪, ৭, ১০, ১৩… প্রতিবার +৩</b><p>প্রথম বর্গে ৪টি। বাকি {bn(n-1)}টি বর্গে ৩টি করে। ৪ + ৩ × {bn(n-1)} = {bn(3*n+1)}। পরের পাঠে এই ভাবনাকেই বীজগণিতের নিয়ম বানাব।</p></div>}
  </div>;
}

export function NthTermMachine(){
  const [a,setA]=useState(3),[b,setB]=useState(1),[n,setN]=useState(4),[target,setTarget]=useState("61"),[reverse,setReverse]=useState(false);const p=usePlayback(5,1100);
  const id=useId();const targetNumber=readNumber(target),position=target.trim()===""?null:positionOf(a,b,targetNumber);
  const formula=`${bn(a)}n ${b<0?"−":"+"} ${bn(Math.abs(b))}`;
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>nth-term Machine</span><h3>একই নিয়ম, যেকোনো অবস্থান।</h3><p>n হলো পদের অবস্থান। প্রতিবার কত বাড়ে এবং বাড়তি কত থাকে, তা আলাদা করে দেখো।</p></div>
    <div className={s.algebraSteps}>{[1,2,3,4].map((i)=><div key={i} className={p.at===i-1?s.algebraActive:""}><small>n = {bn(i)}</small><b>{bn(nthTerm(a,b,i))}</b><span>{bn(a)} × <em>{bn(i)}</em> {b<0?"−":"+"} {bn(Math.abs(b))}</span></div>)}</div>
    {p.at===4&&<div className={s.equation}>নিয়ম: <strong>{formula}</strong></div>}<Playback p={p} length={5} label="প্যাটার্ন থেকে সূত্র বানাই"/>
    <div className={s.controls}><Slider label="প্রতিবার বাড়ে · a" value={a} max={9} onChange={v=>{setA(v);setReverse(false);p.reset();}}/><Slider label="বাড়তি অংশ · b" value={b} min={-5} max={9} onChange={v=>{setB(v);setReverse(false);p.reset();}}/><Slider label="কোন অবস্থান? · n" value={n} max={50} onChange={setN}/></div>
    <div className={s.equation}>{bn(a)} × {bn(n)} {b<0?"−":"+"} {bn(Math.abs(b))} = <strong>{bn(nthTerm(a,b,n))}</strong></div>
    <form className={s.reverseMachine} onSubmit={e=>{e.preventDefault();setReverse(true);}}><label htmlFor={id}>উল্টো মেশিন: কোন অবস্থানে এই সংখ্যা?</label><div className={s.answerRow}><input id={id} inputMode="numeric" value={target} onChange={e=>{setTarget(e.target.value);setReverse(false);}} required/><button type="submit">অবস্থান খুঁজি</button></div>{reverse&&<p role="status" className={position===null?s.feedback:s.success}>{position===null?`(${bn(targetNumber)} − (${bn(b)})) ÷ ${bn(a)} ধনাত্মক পূর্ণসংখ্যা নয়। তাই এই ধারায় সংখ্যাটি নেই।`:`n = (${bn(targetNumber)} − (${bn(b)})) ÷ ${bn(a)} = ${bn(position)}। অর্থাৎ ${bn(position)}তম পদ।`}</p>}</form>
  </div>;
}

export function SumLab(){
  const [n,setN]=useState(5),[joined,setJoined]=useState(false),[formula,setFormula]=useState(false);const dots=sumDots(n);const step=Math.min(27,245/(n+1));
  return <div className={s.lab}><div className={s.labHeading}><span className={s.micro}>Pattern Sum · বিন্দুর সিঁড়ি</span><h3>একই সিঁড়ি দুবার নিলে কী আকার হবে?</h3><p>লাল সিঁড়িতে ১ + ২ + … + {bn(n)}টি বিন্দু। সোনালি সিঁড়িটি তার আরেকটি কপি, উল্টো করে রাখা।</p></div>
    <svg className={s.sumDiagram} viewBox="0 0 590 370" role="img" aria-label={joined?`${bn(n)} সারি, প্রতি সারিতে ${bn(n+1)} বিন্দুর আয়তক্ষেত্র; লাল ও সোনালি অংশ সমান`:`দুটি আলাদা সিঁড়ি, প্রতিটিতে ${bn(n*(n+1)/2)}টি বিন্দু`}>
      {dots.map(({row,col,copy})=>{const x=joined?295+(col-n/2)*step:copy?425+(col-n/2)*step:155+(col-n/2)*step;const y=165+(row-(n-1)/2)*step;return <circle key={`${row}-${col}`} cx={x} cy={y} r={Math.min(8,step*.27)} className={`${s.dot} ${copy?s.copyDot:s.newDot}`}/>;})}
      <text x={joined?295:155} y="330" textAnchor="middle" className={s.svgLabel}>{joined?`${bn(n)} সারি × ${bn(n+1)} কলাম`:`S = ${bn(n*(n+1)/2)}`}</text>{!joined&&<text x="425" y="330" textAnchor="middle" className={s.svgLabel}>আরেকটি S</text>}
    </svg>
    <Slider label="শেষ সংখ্যা · n" value={n} max={12} onChange={v=>{setN(v);setFormula(false);}}/>
    <div className={s.playback}><button type="button" onClick={()=>{setJoined(!joined);setFormula(false);}}><Play size={16}/>{joined?"সিঁড়ি আলাদা করি":"দুটি সিঁড়ি জোড়া দিই"}</button><button type="button" disabled={!joined} onClick={()=>setFormula(true)}>এবার সূত্র খুঁজি</button></div>
    {formula?<div className={s.observation}><b>২S = n(n + ১) → S = n(n + ১) ÷ ২</b><p>আয়তক্ষেত্রে দুটি সমান সিঁড়ি আছে, তাই অর্ধেক নিই। এখানে S = {bn(n)} × {bn(n+1)} ÷ ২ = {bn(n*(n+1)/2)}।</p></div>:<p className={s.caption}>{joined?"প্রতি সারিতে বিন্দু গুনে দেখো। পুরো আয়তক্ষেত্রটি একটি সিঁড়ির কত গুণ?":"আগে দুটি সিঁড়ি জোড়া দাও; তারপর কেন সূত্র কাজ করে খুঁজে বের করো।"}</p>}
  </div>;
}

const LABS=[{id:"number",label:"সংখ্যা",Component:PatternMachine},{id:"shape",label:"আকার",Component:MatchstickBuilder},{id:"fibonacci",label:"Fibonacci",Component:FibonacciLab},{id:"prime",label:"মৌলিক",Component:PrimeSieveLab},{id:"magic",label:"ম্যাজিক",Component:MagicSquareLab},{id:"algebra",label:"সূত্র",Component:NthTermMachine}];
export function FreePatternLab(){
  const [active,setActive]=useState("number");const item=LABS.find(l=>l.id===active)!;
  return <div className={s.freeLab}><div className={s.tabs} role="group" aria-label="নিজের পরীক্ষার ল্যাব বাছাই">{LABS.map(l=><button type="button" key={l.id} aria-pressed={active===l.id} onClick={()=>setActive(l.id)}>{l.label}</button>)}</div><item.Component key={active}/><label className={s.notebook}>আমার আবিষ্কার<textarea rows={3} maxLength={500} placeholder="কী বদলালে? কী দেখলে? তোমার নিয়মটি নিজের ভাষায় লেখো।"/><small>এই লেখাটি শুধু বর্তমান খোলা পাতায় থাকবে। এখানে নম্বর নেই—পরীক্ষা করো, ভুল ধরো, আবার চেষ্টা করো।</small></label></div>;
}
