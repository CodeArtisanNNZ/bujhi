"use client";

import {useEffect,useMemo,useState} from "react";
import {
 ArrowRight,Atom,Check,ChevronLeft,ChevronRight,Dna,Gamepad2,Lightbulb,
 Pause,Play,RefreshCcw,Sparkles,Target,Zap
} from "lucide-react";
import styles from "./cinematic.module.css";

type PlayerProps={
 index:number; total:number; playing:boolean;
 onPlay:()=>void; onPrev:()=>void; onNext:()=>void; onSeek:(n:number)=>void;
};
function Player({index,total,playing,onPlay,onPrev,onNext,onSeek}:PlayerProps){
 return <div className={styles.player}>
  <div className={styles.playerButtons}>
   <button onClick={onPrev} aria-label="আগের ধাপ"><ChevronLeft/></button>
   <button className={styles.play} onClick={onPlay} aria-label={playing?"Pause":"Play"}>{playing?<Pause/>:<Play/>}</button>
   <button onClick={onNext} aria-label="পরের ধাপ"><ChevronRight/></button>
  </div>
  <input aria-label="ধাপ নির্বাচন" type="range" min="0" max={total-1} value={index} onChange={e=>onSeek(Number(e.target.value))}/>
  <span>{index+1}/{total}</span>
 </div>
}

function CellScene({phase}:{phase:string}){
 const cfg:{[k:string]:{name:string;sub:string;left:number;right:number;mid:boolean;split:boolean;nuclei:number}}={
  interphase:{name:"ইন্টারফেজ",sub:"প্রস্তুতি চলছে",left:47,right:53,mid:false,split:false,nuclei:1},
  prophase:{name:"প্রোফেজ",sub:"ক্রোমোজোম মোটা হচ্ছে",left:44,right:56,mid:false,split:false,nuclei:1},
  prometaphase:{name:"প্রো-মেটাফেজ",sub:"নিউক্লিয়ার পর্দা ভাঙছে",left:42,right:58,mid:false,split:false,nuclei:0},
  metaphase:{name:"মেটাফেজ",sub:"মাঝখানে সারিবদ্ধ",left:49,right:51,mid:true,split:false,nuclei:0},
  anaphase:{name:"অ্যানাফেজ",sub:"দুই মেরুতে টান",left:28,right:72,mid:false,split:false,nuclei:0},
  telophase:{name:"টেলোফেজ",sub:"দুটি নিউক্লিয়াস",left:26,right:74,mid:false,split:false,nuclei:2},
  cytokinesis:{name:"সাইটোকাইনেসিস",sub:"দুটি অপত্য কোষ",left:24,right:76,mid:false,split:true,nuclei:2}
 };
 const c=cfg[phase]||cfg.interphase;
 const chromosomes=[
  {side:"l",dy:-40,rot:18},{side:"r",dy:-40,rot:-20},
  {side:"l",dy:12,rot:-18},{side:"r",dy:12,rot:18}
 ];
 return <div className={styles.cellScene}>
  <div className={styles.sceneLabel}><span>{c.name}</span><small>{c.sub}</small></div>
  <svg viewBox="0 0 720 430" role="img" aria-label={c.name+" cell animation"}>
   <defs>
    <radialGradient id="cellFill"><stop offset="0" stopColor="#ffd9c8"/><stop offset=".75" stopColor="#f4aa9c"/><stop offset="1" stopColor="#d26f68"/></radialGradient>
    <radialGradient id="nucleusFill"><stop offset="0" stopColor="#eadcf2"/><stop offset="1" stopColor="#9f7cab"/></radialGradient>
    <filter id="cellShadow"><feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity=".18"/></filter>
   </defs>
   <ellipse cx="360" cy="215" rx="270" ry="160" fill="url(#cellFill)" stroke="#923d38" strokeWidth="7" filter="url(#cellShadow)"/>
   <ellipse cx="325" cy="175" rx="180" ry="78" fill="#ffffff2e"/>
   {c.nuclei===1&&<circle cx="360" cy="215" r="93" fill="url(#nucleusFill)" stroke="#674c73" strokeWidth="5" opacity={phase==="prometaphase"?.35:.95}/>}
   {c.nuclei===2&&<><circle cx="215" cy="215" r="73" fill="url(#nucleusFill)" stroke="#674c73" strokeWidth="5"/><circle cx="505" cy="215" r="73" fill="url(#nucleusFill)" stroke="#674c73" strokeWidth="5"/></>}
   {["prometaphase","metaphase","anaphase"].includes(phase)&&<g stroke="#f4e4af" strokeWidth="3" opacity=".95">
    <circle cx="110" cy="215" r="10" fill="#e3bc63"/><circle cx="610" cy="215" r="10" fill="#e3bc63"/>
    {chromosomes.map((x,i)=>{const tx=x.side==="l"?c.left*7.2:c.right*7.2;const ty=215+x.dy;return <g key={i}><line x1="110" y1="215" x2={tx} y2={ty}/><line x1="610" y1="215" x2={tx} y2={ty}/></g>})}
   </g>}
   {chromosomes.map((x,i)=>{
    const base=x.side==="l"?c.left:c.right;
    const xPos=base*7.2;
    const yPos=215+x.dy;
    return <g key={i} transform={"translate("+xPos+" "+yPos+") rotate("+x.rot+")"}>
     <path d="M-22 -30 C-8 -16 -8 -7 0 0 C8 -7 8 -16 22 -30" fill="none" stroke="#6b1d4f" strokeWidth="12" strokeLinecap="round"/>
     <path d="M-22 30 C-8 16 -8 7 0 0 C8 7 8 16 22 30" fill="none" stroke="#6b1d4f" strokeWidth="12" strokeLinecap="round"/>
     <circle r="6.5" fill="#f2b64d" stroke="#6f3f19" strokeWidth="2"/>
    </g>
   })}
   {c.mid&&<line x1="360" y1="80" x2="360" y2="350" stroke="#ffffff99" strokeWidth="2" strokeDasharray="8 8"/>}
   {c.split&&<path d="M360 58 C332 118 335 312 360 372" fill="none" stroke="#fff5e7" strokeWidth="18" opacity=".9"/>}
  </svg>
 </div>
}

const mito=[
 {key:"interphase",name:"ইন্টারফেজ",copy:"কোষ বিভাজনের আগে প্রস্তুতি নেয়। DNA প্রতিলিপি হয়।"},
 {key:"prophase",name:"প্রোফেজ",copy:"ক্রোমাটিন ঘনীভূত হয়ে দৃশ্যমান ক্রোমোজোম তৈরি করে।"},
 {key:"prometaphase",name:"প্রো-মেটাফেজ",copy:"নিউক্লিয়ার পর্দা ভাঙে, স্পিন্ডল তন্তু কাজ শুরু করে।"},
 {key:"metaphase",name:"মেটাফেজ",copy:"ক্রোমোজোমগুলো কোষের বিষুবীয় অঞ্চলে সারিবদ্ধ হয়।"},
 {key:"anaphase",name:"অ্যানাফেজ",copy:"সিস্টার ক্রোমাটিড আলাদা হয়ে বিপরীত দুই মেরুর দিকে যায়।"},
 {key:"telophase",name:"টেলোফেজ",copy:"দুই পাশে নতুন নিউক্লিয়াস তৈরি হয়।"},
 {key:"cytokinesis",name:"সাইটোকাইনেসিস",copy:"সাইটোপ্লাজম ভাগ হয়ে দুটি অপত্য কোষ তৈরি হয়।"}
];

function MitosisLab({start=0}:{start?:number}){
 const[index,setIndex]=useState(start);
 const[playing,setPlaying]=useState(false);
 const[speed,setSpeed]=useState(1);
 const[challenge,setChallenge]=useState<string|null>(null);
 const m=mito[index];

 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>setIndex(v=>v===mito.length-1?0:v+1),2400/speed);
  return()=>window.clearInterval(id);
 },[playing,speed]);

 function chooseStage(i:number){
  setIndex(i); setPlaying(false);
  if(challenge)setChallenge(i===3?"correct":"wrong");
 }

 return <div className={styles.lab}>
  <div className={styles.labTop}>
   <div><span className={styles.badge}><Atom/>CONTROL IT YOURSELF</span><h3>মাইটোসিস মুভি</h3><p>ভিডিওর মতো play করো, কিন্তু প্রতিটি মুহূর্ত তুমি নিজে নিয়ন্ত্রণ করতে পারবে।</p></div>
   <div className={styles.speed}><span>গতি</span>{[.7,1,1.4].map(v=><button key={v} className={speed===v?styles.on:""} onClick={()=>setSpeed(v)}>{v}×</button>)}</div>
  </div>
  <CellScene phase={m.key}/>
  <div className={styles.explainBar}><div><span>এখন কী হচ্ছে?</span><strong>{m.name}</strong></div><p>{m.copy}</p></div>
  <Player index={index} total={mito.length} playing={playing} onPlay={()=>setPlaying(v=>!v)} onPrev={()=>setIndex(v=>v===0?mito.length-1:v-1)} onNext={()=>setIndex(v=>v===mito.length-1?0:v+1)} onSeek={n=>{setIndex(n);setPlaying(false)}}/>
  <div className={styles.stageButtons}>{mito.map((x,i)=><button key={x.key} onClick={()=>chooseStage(i)} className={i===index?styles.stageOn:""}><span>{i+1}</span><b>{x.name}</b></button>)}</div>
  <div className={styles.challenge}>
   <Target/><div><strong>Mini challenge</strong><span>কোন ধাপে ক্রোমোজোমগুলো মাঝখানে সারিবদ্ধ হয়?</span></div>
   <button onClick={()=>setChallenge("asking")}>Try</button>
  </div>
  {challenge==="asking"&&<div className={styles.challengeChoices}>{mito.map((x,i)=><button key={x.key} onClick={()=>{setIndex(i);setChallenge(i===3?"correct":"wrong")}}>{x.name}</button>)}</div>}
  {challenge==="correct"&&<div className={styles.correct}><Check/>ঠিক! সেটাই মেটাফেজ।</div>}
  {challenge==="wrong"&&<div className={styles.wrong}>আরেকবার দেখো—মাঝখানে এক সরল রেখায় সাজা ধাপটি খুঁজে বের করো।</div>}
 </div>
}

function DivisionTypes(){
 const[type,setType]=useState<"amitosis"|"mitosis"|"meiosis">("mitosis");
 const data={
  amitosis:{title:"অ্যামাইটোসিস",sub:"সরাসরি বিভাজন",cells:2,label:"1 → 2",copy:"নিউক্লিয়াস সরাসরি ভাগ হয়। স্পষ্ট spindle বা ধাপভিত্তিক chromosome movement নেই।"},
  mitosis:{title:"মাইটোসিস",sub:"সমীকরণিক বিভাজন",cells:2,label:"2n → 2n + 2n",copy:"একটি দেহকোষ থেকে দুটি প্রায় একই রকম অপত্য কোষ তৈরি হয়।"},
  meiosis:{title:"মিয়োসিস",sub:"হ্রাসমূলক বিভাজন",cells:4,label:"2n → 4 × n",copy:"জনন মাতৃকোষ দুই দফা বিভাজিত হয়ে চারটি haploid কোষ তৈরি করে।"}
 }[type];
 return <div className={styles.lab}>
  <div className={styles.labTop}><div><span className={styles.badge}><Gamepad2/>PICK AND COMPARE</span><h3>একই 'কোষ বিভাজন'—কিন্তু তিন রকম গল্প</h3><p>একটি বেছে দেখো, তারপর অন্যটির সঙ্গে তুলনা করো।</p></div></div>
  <div className={styles.switcher}>{(["amitosis","mitosis","meiosis"] as const).map(k=><button key={k} className={type===k?styles.on:""} onClick={()=>setType(k)}>{k==="amitosis"?"অ্যামাইটোসিস":k==="mitosis"?"মাইটোসিস":"মিয়োসিস"}</button>)}</div>
  <div className={styles.divisionPlayground}>
   <div className={styles.parentCell}><div className={styles.nucleus}/><span>মাতৃকোষ</span></div>
   <ArrowRight/>
   <div className={styles.resultCells}>{Array.from({length:data.cells},(_,i)=><div key={i}><div className={styles.nucleus}/><span>{type==="meiosis"?"n":"2n"}</span></div>)}</div>
  </div>
  <div className={styles.bigResult}><span>{data.sub}</span><strong>{data.label}</strong><p>{data.copy}</p></div>
  <div className={styles.compareChips}><button onClick={()=>setType("amitosis")}>সবচেয়ে সরাসরি</button><button onClick={()=>setType("mitosis")}>বৃদ্ধির জন্য</button><button onClick={()=>setType("meiosis")}>জননের জন্য</button></div>
 </div>
}

function GrowthLab(){
 const[round,setRound]=useState(0);
 const cells=Math.pow(2,round);
 const height=Math.min(28+round*7,92);
 return <div className={styles.lab}>
  <div className={styles.labTop}><div><span className={styles.badge}><Sparkles/>GROW IT</span><h3>একটি ছোট্ট চারা বড় করো</h3><p>slider বাড়াও। একই সাথে cell number আর plant growth বদলাবে।</p></div></div>
  <div className={styles.growthGrid}>
   <div className={styles.plantScene}>
    <div className={styles.sun}/>
    <div className={styles.soil}/>
    <div className={styles.plant} style={{height:height+"%"}}>
     <div className={styles.stem}/>
     <div className={styles.leaf+" "+styles.leaf1}/><div className={styles.leaf+" "+styles.leaf2}/>
     {round>4&&<><div className={styles.leaf+" "+styles.leaf3}/><div className={styles.leaf+" "+styles.leaf4}/></>}
    </div>
   </div>
   <div className={styles.growthPanel}>
    <span>বিভাজনের round</span><strong>{round}</strong>
    <input type="range" min="0" max="10" value={round} onChange={e=>setRound(Number(e.target.value))}/>
    <div className={styles.cellCount}><small>সরল মডেলে কোষ সংখ্যা</small><b>{cells.toLocaleString("bn-BD")}</b></div>
    <p>প্রতিটি round-এ সব কোষ ভাগ হলে সংখ্যা দ্বিগুণ হয়: <b>2<sup>n</sup></b>। বাস্তব উদ্ভিদে সব কোষ একই সময়ে ভাগ হয় না।</p>
   </div>
  </div>
  <div className={styles.growthDots}>{Array.from({length:Math.min(cells,64)},(_,i)=><i key={i}/>)}</div>
 </div>
}

const meiosis=[
 {name:"শুরু",cells:1,ploidy:"2n",copy:"একটি diploid জনন মাতৃকোষ।"},
 {name:"Prophase I",cells:1,ploidy:"2n",copy:"homologous chromosome জোড়া কাছাকাছি আসে।"},
 {name:"Meiosis I",cells:2,ploidy:"n",copy:"homologous chromosome আলাদা হয়; chromosome set অর্ধেক।"},
 {name:"Meiosis II",cells:4,ploidy:"n",copy:"sister chromatid আলাদা হয়।"},
 {name:"শেষ",cells:4,ploidy:"n",copy:"চারটি haploid কোষ তৈরি হয়।"}
];

function MeiosisLab({start=0}:{start?:number}){
 const[index,setIndex]=useState(start);
 const[playing,setPlaying]=useState(false);
 const m=meiosis[index];

 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>setIndex(v=>v===meiosis.length-1?0:v+1),2600);
  return()=>window.clearInterval(id);
 },[playing]);

 return <div className={styles.lab}>
  <div className={styles.labTop}><div><span className={styles.badge}><Zap/>TWO DIVISIONS</span><h3>মিয়োসিস: 2n থেকে চারটি n</h3><p>রঙ দিয়ে homologous chromosome আর sister chromatid আলাদা করে দেখানো হয়েছে।</p></div></div>
  <div className={styles.meiosisBoard}>
   <div className={styles.meiCells}>{Array.from({length:m.cells},(_,i)=><div className={styles.meiCell} key={i}><span>{m.ploidy}</span><div className={styles.chromPair}><b className={styles.pink}>X</b><b className={styles.blue}>X</b></div></div>)}</div>
   <div className={styles.meiCaption}><span>{m.name}</span><p>{m.copy}</p></div>
  </div>
  <Player index={index} total={meiosis.length} playing={playing} onPlay={()=>setPlaying(v=>!v)} onPrev={()=>setIndex(v=>v===0?meiosis.length-1:v-1)} onNext={()=>setIndex(v=>v===meiosis.length-1?0:v+1)} onSeek={n=>{setIndex(n);setPlaying(false)}}/>
  <div className={styles.ploidyStrip}><div className={index>=0?styles.done:""}><b>2n</b><span>শুরু</span></div><i>→</i><div className={index>=2?styles.done:""}><b>n</b><span>Meiosis I</span></div><i>→</i><div className={index>=3?styles.done:""}><b>4 × n</b><span>Meiosis II</span></div></div>
 </div>
}

function ZoomLab(){
 const[level,setLevel]=useState(0);
 const levels=[
  {name:"কোষ",copy:"কোষের ভিতরে নিউক্লিয়াস থাকে।"},
  {name:"নিউক্লিয়াস",copy:"নিউক্লিয়াসের ভিতরে ক্রোমোজোম থাকে।"},
  {name:"ক্রোমোজোম",copy:"ক্রোমোজোম DNA-কে সংগঠিতভাবে বহন করে।"},
  {name:"DNA",copy:"DNA-তে বংশগত তথ্য সংরক্ষিত থাকে।"},
  {name:"জিন",copy:"জিন হলো DNA-এর নির্দিষ্ট কার্যকর অংশ।"}
 ];
 return <div className={styles.lab}>
  <div className={styles.labTop}><div><span className={styles.badge}><Dna/>ZOOM JOURNEY</span><h3>কোষ থেকে জিন পর্যন্ত</h3><p>প্রতিটি layer ট্যাপ করো—ভেতরে ঢুকে যাও।</p></div></div>
  <div className={styles.zoomWorld}>
   <div className={styles.zoomVisual}>
    <div className={styles.bigCell} style={{opacity:level===0?1:.18}}/>
    <div className={styles.bigNucleus} style={{transform:"scale("+(level>=1?1.35:1)+")",opacity:level<=1?1:.16}}/>
    <div className={styles.bigChromosome} style={{transform:"scale("+(level>=2?1.35:1)+")",opacity:level<=2?1:.15}}>X</div>
    <div className={styles.bigDna} style={{opacity:level>=3?1:.1}}>{Array.from({length:10},(_,i)=><i key={i}/>)}</div>
    {level===4&&<div className={styles.geneFlag}>GENE</div>}
   </div>
   <div className={styles.zoomInfo}><span>LEVEL {level+1}/5</span><h4>{levels[level].name}</h4><p>{levels[level].copy}</p></div>
  </div>
  <div className={styles.zoomSteps}>{levels.map((x,i)=><button key={x.name} className={level===i?styles.on:""} onClick={()=>setLevel(i)}><b>{i+1}</b><span>{x.name}</span></button>)}</div>
 </div>
}

function DnaPuzzle(){
 const sequence=useMemo(()=>["A","G","T","C","A","C"],[]);
 const pair:{[k:string]:string}={A:"T",T:"A",G:"C",C:"G"};
 const[answers,setAnswers]=useState<(string|null)[]>(Array(sequence.length).fill(null));
 const[done,setDone]=useState(false);
 function pick(i:number,b:string){const next=[...answers];next[i]=b;setAnswers(next);setDone(next.every((x,j)=>x===pair[sequence[j]]))}
 function reset(){setAnswers(Array(sequence.length).fill(null));setDone(false)}
 return <div className={styles.lab}>
  <div className={styles.labTop}><div><span className={styles.badge}><Gamepad2/>PUZZLE MODE</span><h3>DNA partner খুঁজে দাও</h3><p>প্রতিটি base-এর নিচে তার complementary base বসাও।</p></div><button className={styles.reset} onClick={reset}><RefreshCcw/>Reset</button></div>
  <div className={styles.dnaPuzzle}>
   <div className={styles.topBases}>{sequence.map((b,i)=><span key={i} className={styles["base"+b]}>{b}</span>)}</div>
   <div className={styles.pairLines}>{sequence.map((_,i)=><i key={i}/>)}</div>
   <div className={styles.answerBases}>{sequence.map((b,i)=><div key={i}><span className={answers[i]?styles["base"+answers[i]]:""}>{answers[i]||"?"}</span><div className={styles.baseChoices}>{["A","T","G","C"].map(x=><button key={x} onClick={()=>pick(i,x)}>{x}</button>)}</div></div>)}</div>
  </div>
  <div className={styles.rules}><div><strong>A ↔ T</strong><span>Adenine pairs with Thymine</span></div><div><strong>G ↔ C</strong><span>Guanine pairs with Cytosine</span></div></div>
  {done&&<div className={styles.win}><Sparkles/><div><strong>Perfect match!</strong><span>সব complementary base ঠিক বসিয়েছ।</span></div></div>}
 </div>
}

function HeredityGame(){
 const[mom,setMom]=useState<"A"|"a">("A");
 const[dad,setDad]=useState<"A"|"a">("a");
 const child=mom+dad;
 return <div className={styles.lab}>
  <div className={styles.labTop}><div><span className={styles.badge}><Gamepad2/>MIX THE GENES</span><h3>বংশগতি: allele mix করে দেখো</h3><p>এটি inheritance বোঝানোর সরল model—বাস্তব বৈশিষ্ট্য অনেক সময় বহু gene ও environment দ্বারা প্রভাবিত হয়।</p></div></div>
  <div className={styles.parentPickers}>
   <div><span>মায়ের allele</span><div>{["A","a"].map(x=><button key={x} onClick={()=>setMom(x as "A"|"a")} className={mom===x?styles.on:""}>{x}</button>)}</div></div>
   <ArrowRight/>
   <div><span>বাবার allele</span><div>{["A","a"].map(x=><button key={x} onClick={()=>setDad(x as "A"|"a")} className={dad===x?styles.on:""}>{x}</button>)}</div></div>
  </div>
  <div className={styles.childResult}><span>সন্তানের genotype</span><strong>{child}</strong><p>একটি allele এসেছে মা থেকে, একটি বাবা থেকে।</p></div>
  <div className={styles.infoFlow}><button className={styles.flowOn}>DNA</button><ArrowRight/><button>RNA</button><ArrowRight/><button>Protein</button><ArrowRight/><button>Trait</button></div>
  <div className={styles.note}><Lightbulb/><span>একটি gene-এর simple example দিয়ে inheritance বোঝানো হয়েছে; সব human trait এভাবে single-gene rule মানে না।</span></div>
 </div>
}

export default function CinematicLab({lesson}:{lesson:number}){
 if(lesson===1)return <DivisionTypes/>;
 if(lesson===2)return <MitosisLab start={0}/>;
 if(lesson===3)return <MitosisLab start={2}/>;
 if(lesson===4)return <GrowthLab/>;
 if(lesson===5)return <MeiosisLab start={0}/>;
 if(lesson===6)return <MeiosisLab start={2}/>;
 if(lesson===7)return <ZoomLab/>;
 if(lesson===8)return <DnaPuzzle/>;
 return <HeredityGame/>;
}
