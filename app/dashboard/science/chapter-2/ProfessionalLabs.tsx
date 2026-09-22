"use client";

import {useEffect,useMemo,useState} from "react";
import {
 ArrowRight,Check,ChevronLeft,ChevronRight,Dna,Gamepad2,Lightbulb,
 Pause,Play,RefreshCcw,Rotate3D,Sparkles,Target,Zap
} from "lucide-react";
import styles from "./professional.module.css";

const mitoStages=[
 {name:"ইন্টারফেজ",copy:"DNA প্রতিলিপি হয় এবং কোষ বিভাজনের জন্য প্রস্তুত হয়।"},
 {name:"প্রোফেজ",copy:"ক্রোমাটিন ঘনীভূত হয়ে দৃশ্যমান chromosome তৈরি করে।"},
 {name:"প্রো-মেটাফেজ",copy:"nuclear envelope ভাঙে এবং spindle chromosome-এর সাথে যুক্ত হয়।"},
 {name:"মেটাফেজ",copy:"chromosome-গুলো equator-এ এক সারিতে দাঁড়ায়।"},
 {name:"অ্যানাফেজ",copy:"sister chromatid আলাদা হয়ে দুই মেরুর দিকে যায়।"},
 {name:"টেলোফেজ",copy:"দুই মেরুতে নতুন nucleus তৈরি হয়।"},
 {name:"সাইটোকাইনেসিস",copy:"cytoplasm ভাগ হয়ে দুটি daughter cell তৈরি হয়।"}
];

const chromColors=["#9d3f70","#4d7898","#4e8b82","#6d4a79","#dc756b","#5f8c57"];

function CellBackdrop({split=false}:{split?:boolean}){
 return <g className={styles.cellBackdrop}>
  {split?<><ellipse cx="275" cy="230" rx="190" ry="145"/><ellipse cx="525" cy="230" rx="190" ry="145"/></>:<ellipse cx="400" cy="230" rx="292" ry="170"/>}
  <ellipse className={styles.cellHighlight} cx={split?245:345} cy="180" rx="150" ry="60"/>
 </g>
}

function XChromosome({x,y,color,scale=1,opacity=1,rotate=0}:{x:number;y:number;color:string;scale?:number;opacity?:number;rotate?:number}){
 return <g className={styles.svgMove} style={{opacity}} transform={"translate("+x+" "+y+") rotate("+rotate+") scale("+scale+")"}>
  <path d="M-24 -34 C-8 -18 -7 -7 0 0 C7 -7 8 -18 24 -34" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"/>
  <path d="M-24 34 C-8 18 -7 7 0 0 C7 7 8 18 24 34" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"/>
  <circle r="7" fill="#e5b458" stroke="#6f451e" strokeWidth="2"/>
 </g>
}

function Chromatid({x,y,color,side}:{x:number;y:number;color:string;side:-1|1}){
 return <g className={styles.svgMove} transform={"translate("+x+" "+y+") rotate("+(side*12)+")"}>
  <path d={"M0 -30 Q"+(-side*15)+" 0 0 30"} fill="none" stroke={color} strokeWidth="11" strokeLinecap="round"/>
  <circle r="6" fill="#e5b458" stroke="#6f451e" strokeWidth="2"/>
 </g>
}

function MitosisMovie({start=0}:{start?:number}){
 const[stage,setStage]=useState(start);
 const[playing,setPlaying]=useState(false);
 const[speed,setSpeed]=useState(1);
 const[labels,setLabels]=useState(true);
 const[quiz,setQuiz]=useState<null|"ask"|"ok"|"no">(null);

 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>setStage(v=>(v+1)%mitoStages.length),2100/speed);
  return()=>window.clearInterval(id);
 },[playing,speed]);

 const pre=stage<4;
 const split=stage===6;
 const nucleusOpacity=stage<=1?1:stage===2?.2:0;
 const positions=useMemo(()=>Array.from({length:6},(_,i)=>{
  const row=138+i*36;
  if(stage===0)return {x:310+(i%3)*90,y:165+(i%2)*110,r:i*14-30};
  if(stage===1)return {x:325+(i%3)*70,y:170+(i%2)*110,r:i*10-25};
  if(stage===2)return {x:365+(i%2)*70,y:145+i*32,r:i%2?8:-8};
  if(stage===3)return {x:400,y:140+i*36,r:0};
  return {x:400,y:140+i*36,r:0};
 }),[stage]);

 return <div className={styles.proLab}>
  <div className={styles.proHead}>
   <div><span className={styles.eyebrow}><Zap/>PRO-ANIMATION MODE</span><h3>মাইটোসিস · তুমি director</h3><p>ভিডিওর মতো play করো, কিন্তু যেকোনো stage-এ থামিয়ে chromosome movement নিজের গতিতে দেখো।</p></div>
   <div className={styles.toolRow}><button className={labels?styles.toolOn:""} onClick={()=>setLabels(v=>!v)}>Labels</button>{[.6,1,1.5].map(v=><button key={v} className={speed===v?styles.toolOn:""} onClick={()=>setSpeed(v)}>{v}×</button>)}</div>
  </div>
  <div className={styles.svgStage}>
   <svg viewBox="0 0 800 460" role="img" aria-label={"Mitosis animation "+mitoStages[stage].name}>
    <defs>
     <radialGradient id="cellProFill" cx="35%" cy="28%"><stop offset="0" stopColor="#ffe7da"/><stop offset=".72" stopColor="#f0aa9c"/><stop offset="1" stopColor="#cc6a66"/></radialGradient>
     <radialGradient id="nucProFill" cx="38%" cy="32%"><stop offset="0" stopColor="#eadcf2"/><stop offset="1" stopColor="#9673a2"/></radialGradient>
     <filter id="softShadow"><feDropShadow dx="0" dy="9" stdDeviation="10" floodOpacity=".16"/></filter>
    </defs>
    <CellBackdrop split={split}/>
    {Array.from({length:24},(_,i)=><circle key={i} cx={185+(i*73)%430} cy={110+(i*47)%230} r={2+(i%3)} fill={i%2?"#fff2":"#7d3f3722"}/>)}
    <g className={styles.svgFade} style={{opacity:nucleusOpacity}}>
     <circle cx="400" cy="230" r="98" fill="url(#nucProFill)" stroke="#654b70" strokeWidth="5"/>
     <circle cx="425" cy="210" r="19" fill="#74527f"/>
    </g>
    <g className={styles.svgFade} style={{opacity:stage>=2&&stage<=4?1:0}}>
     <circle cx="135" cy="230" r="10" fill="#e4b55b"/><circle cx="665" cy="230" r="10" fill="#e4b55b"/>
     {Array.from({length:11},(_,i)=>{const y=80+i*30;return <g key={i} stroke="#e7c977" strokeWidth="2" opacity=".7"><line x1="135" y1="230" x2="400" y2={y}/><line x1="665" y1="230" x2="400" y2={y}/></g>})}
    </g>
    {pre&&positions.map((p,i)=><XChromosome key={i} x={p.x} y={p.y} rotate={p.r} color={chromColors[i]}/>)}
    {stage===4&&Array.from({length:6},(_,i)=>{const y=140+i*36;return <g key={i}><Chromatid x={245} y={y} color={chromColors[i]} side={-1}/><Chromatid x={555} y={y} color={chromColors[i]} side={1}/></g>})}
    {stage>=5&&Array.from({length:6},(_,i)=>{const y=170+(i%3)*45;return <g key={i}><Chromatid x={275+(i%2)*16} y={y} color={chromColors[i]} side={-1}/><Chromatid x={525+(i%2)*16} y={y} color={chromColors[i]} side={1}/></g>})}
    <g className={styles.svgFade} style={{opacity:stage>=5?1:0}}>
     <circle cx="275" cy="230" r="78" fill="url(#nucProFill)" stroke="#654b70" strokeWidth="5"/>
     <circle cx="525" cy="230" r="78" fill="url(#nucProFill)" stroke="#654b70" strokeWidth="5"/>
    </g>
    {stage===3&&<line x1="400" y1="78" x2="400" y2="382" stroke="#fff" strokeWidth="2" strokeDasharray="8 8" opacity=".72"/>}
    {labels&&<g className={styles.labels}><path d="M110 65 L170 115"/><text x="32" y="58">কোষপর্দা</text><path d="M645 78 L565 135"/><text x="647" y="72">chromosome</text>{stage>=2&&stage<=4&&<><path d="M105 385 L205 320"/><text x="32" y="402">spindle fibre</text></>}</g>}
   </svg>
   <div className={styles.stageBadge}><span>{String(stage+1).padStart(2,"0")}</span><div><strong>{mitoStages[stage].name}</strong><small>{mitoStages[stage].copy}</small></div></div>
  </div>
  <div className={styles.controls}><button onClick={()=>{setStage(v=>(v+6)%7);setPlaying(false)}}><ChevronLeft/></button><button className={styles.playBtn} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause/>:<Play/>}{playing?"Pause":"Play"}</button><button onClick={()=>{setStage(v=>(v+1)%7);setPlaying(false)}}><ChevronRight/></button></div>
  <div className={styles.stageRail}>{mitoStages.map((s,i)=><button key={s.name} className={stage===i?styles.activeStage:""} onClick={()=>{setStage(i);setPlaying(false)}}><b>{i+1}</b><span>{s.name}</span></button>)}</div>
  <div className={styles.miniChallenge}><Target/><div><strong>Quick challenge</strong><span>কোন stage-এ chromosome equator-এ সারি বাঁধে?</span></div><button onClick={()=>setQuiz("ask")}>Answer</button></div>
  {quiz==="ask"&&<div className={styles.answerRow}>{["প্রোফেজ","মেটাফেজ","অ্যানাফেজ"].map((x,i)=><button key={x} onClick={()=>setQuiz(i===1?"ok":"no")}>{x}</button>)}</div>}
  {quiz==="ok"&&<div className={styles.good}><Check/>ঠিক — মেটাফেজ।</div>}
  {quiz==="no"&&<div className={styles.retry}>মেটাফেজ stage-টা আবার play করে দেখো।</div>}
 </div>
}

function DivisionComparator(){
 const[type,setType]=useState<"amitosis"|"mitosis"|"meiosis">("mitosis");
 const data={
  amitosis:{result:"১ → ২",tag:"direct",cells:2,copy:"সরাসরি বিভাজন; complex spindle-stage sequence থাকে না।"},
  mitosis:{result:"2n → 2n + 2n",tag:"growth",cells:2,copy:"দেহের বৃদ্ধি ও ক্ষয়পূরণের জন্য দুটি সমগুণসম্পন্ন daughter cell।"},
  meiosis:{result:"2n → 4 × n",tag:"reproduction",cells:4,copy:"দুই দফা বিভাজনে চারটি haploid cell; chromosome set অর্ধেক।"}
 }[type];
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Gamepad2/>COMPARE MODE</span><h3>একটি মাতৃকোষ, তিন রকম outcome</h3><p>বিভাজনের ধরন বদলাও এবং result চোখের সামনে বদলে যেতে দেখো।</p></div></div>
  <div className={styles.segment}>{(["amitosis","mitosis","meiosis"] as const).map(x=><button key={x} className={type===x?styles.segmentOn:""} onClick={()=>setType(x)}>{x==="amitosis"?"অ্যামাইটোসিস":x==="mitosis"?"মাইটোসিস":"মিয়োসিস"}</button>)}</div>
  <div className={styles.comparatorStage}>
   <div className={styles.demoCell}><i/><span>মাতৃকোষ</span></div><ArrowRight/>
   <div className={styles.resultGrid}>{Array.from({length:data.cells},(_,i)=><div className={styles.smallCell} key={i}><i/><b>{type==="meiosis"?"n":"2n"}</b></div>)}</div>
  </div>
  <div className={styles.outcome}><span>{data.tag}</span><strong>{data.result}</strong><p>{data.copy}</p></div>
 </div>
}

function GrowthLab(){
 const[round,setRound]=useState(4);
 const cells=Math.pow(2,round);
 const height=95+(round/10)*240;
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Sparkles/>GROWTH LAB</span><h3>Cell division দিয়ে একটি চারা বড় করো</h3><p>Slider সরাও—cell number, root এবং shoot একসাথে কীভাবে বদলায় দেখো।</p></div></div>
  <div className={styles.growthArea}>
   <div className={styles.plantWorld}><div className={styles.sun}/><div className={styles.cloud+" "+styles.cloud1}/><div className={styles.cloud+" "+styles.cloud2}/><div className={styles.soil}/><div className={styles.plant} style={{height}}><div className={styles.stem}/><div className={styles.leaf+" "+styles.l1}/><div className={styles.leaf+" "+styles.l2}/>{round>5&&<><div className={styles.leaf+" "+styles.l3}/><div className={styles.leaf+" "+styles.l4}/></>}<div className={styles.root+" "+styles.r1}/><div className={styles.root+" "+styles.r2}/></div></div>
   <div className={styles.growthControl}><span>division round</span><strong>{round}</strong><input type="range" min="0" max="10" value={round} onChange={e=>setRound(Number(e.target.value))}/><div><small>সরল model-এ cell</small><b>{cells.toLocaleString("bn-BD")}</b></div><p>প্রতি round-এ সব cell ভাগ হলে সংখ্যা হয় <b>2<sup>n</sup></b>। বাস্তব tissue-তে সব cell একই সময়ে ভাগ হয় না।</p></div>
  </div>
  <div className={styles.cellCloud}>{Array.from({length:Math.min(cells,80)},(_,i)=><i key={i} style={{animationDelay:(i%12)*35+"ms"}}/>)}{cells>80&&<span>+ আরও {cells-80}</span>}</div>
 </div>
}

const meiStages=[
 {name:"Interphase",cells:1,copy:"DNA replicate হয়েছে; chromosome-এ দুই sister chromatid।"},
 {name:"Prophase I",cells:1,copy:"homologous chromosome pair হয়; crossing-over হতে পারে।"},
 {name:"Metaphase I",cells:1,copy:"homologous pair equator-এ পাশাপাশি সাজে।"},
 {name:"Anaphase I",cells:1,copy:"homologous chromosome আলাদা হয়ে দুই মেরুতে যায়।"},
 {name:"Telophase I",cells:2,copy:"দুটি haploid cell তৈরি হয়।"},
 {name:"Prophase II",cells:2,copy:"দুই haploid cell-এ নতুন spindle তৈরি হয়।"},
 {name:"Metaphase II",cells:2,copy:"প্রতিটি cell-এ chromosome মাঝখানে সাজে।"},
 {name:"Anaphase II",cells:2,copy:"sister chromatid আলাদা হয়।"},
 {name:"Telophase II",cells:4,copy:"শেষে চারটি haploid cell।"}
];

function MeiosisMovie({start=0}:{start?:number}){
 const[stage,setStage]=useState(start);
 const[playing,setPlaying]=useState(false);
 const[crossover,setCrossover]=useState(true);

 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>setStage(v=>(v+1)%meiStages.length),2200);
  return()=>window.clearInterval(id);
 },[playing]);

 const d=meiStages[stage];
 const centers=d.cells===1?[[400,230]]:d.cells===2?[[255,230],[545,230]]:[[165,230],[325,230],[485,230],[645,230]];
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Zap/>TWO-DIVISION ENGINE</span><h3>মিয়োসিস · chromosome tracker</h3><p>maternal আর paternal chromosome আলাদা colour-এ follow করো—pairing থেকে চারটি haploid cell পর্যন্ত।</p></div><button className={crossover?styles.toolOn:""} onClick={()=>setCrossover(v=>!v)}>Crossing-over</button></div>
  <div className={styles.svgStage}>
   <svg viewBox="0 0 800 460" role="img" aria-label={"Meiosis "+d.name}>
    <defs><radialGradient id="meiCell" cx="35%" cy="28%"><stop offset="0" stopColor="#ffe6d8"/><stop offset=".72" stopColor="#efaa9d"/><stop offset="1" stopColor="#c96a66"/></radialGradient></defs>
    {centers.map((c,i)=><g key={i} className={styles.svgMove}><ellipse cx={c[0]} cy={c[1]} rx={d.cells===4?95:135} ry={d.cells===4?100:135} fill="url(#meiCell)" stroke="#913e3a" strokeWidth="5"/></g>)}
    {stage<4&&<>
     <XChromosome x={stage===2?380:340} y={190} color="#4d7898" rotate={stage===1?-6:0}/><XChromosome x={stage===2?420:390} y={190} color="#a94c7b" rotate={stage===1?6:0}/>
     <XChromosome x={stage===2?380:410} y={275} color="#4d7898" rotate={stage===1?6:0}/><XChromosome x={stage===2?420:460} y={275} color="#a94c7b" rotate={stage===1?-6:0}/>
     {crossover&&stage===1&&<g stroke="#e4b65c" strokeWidth="7" strokeLinecap="round"><line x1="356" y1="174" x2="375" y2="205"/><line x1="376" y1="174" x2="357" y2="205"/></g>}
    </>}
    {stage===3&&<>{[185,275].map((y,i)=><g key={y}><XChromosome x={260} y={y} color={i?"#a94c7b":"#4d7898"}/><XChromosome x={540} y={y} color={i?"#4d7898":"#a94c7b"}/></g>)}</>}
    {stage>=4&&stage<=6&&centers.map((c,i)=><g key={i}><XChromosome x={c[0]} y={190} color={i%2?"#a94c7b":"#4d7898"} scale={.82}/><XChromosome x={c[0]} y={270} color={i%2?"#4d7898":"#a94c7b"} scale={.82}/></g>)}
    {stage===7&&centers.map((c,i)=><g key={i}><Chromatid x={c[0]-48} y={195} color={i?"#a94c7b":"#4d7898"} side={-1}/><Chromatid x={c[0]+48} y={195} color={i?"#a94c7b":"#4d7898"} side={1}/><Chromatid x={c[0]-48} y={270} color={i?"#4d7898":"#a94c7b"} side={-1}/><Chromatid x={c[0]+48} y={270} color={i?"#4d7898":"#a94c7b"} side={1}/></g>)}
    {stage===8&&centers.map((c,i)=><g key={i}><Chromatid x={c[0]} y={205} color={i%2?"#a94c7b":"#4d7898"} side={i%2?1:-1}/><Chromatid x={c[0]} y={260} color={i%2?"#4d7898":"#a94c7b"} side={i%2?-1:1}/></g>)}
    <g className={styles.legend}><circle cx="40" cy="28" r="7" fill="#4d7898"/><text x="54" y="33">maternal</text><circle cx="145" cy="28" r="7" fill="#a94c7b"/><text x="159" y="33">paternal</text></g>
   </svg>
   <div className={styles.stageBadge}><span>{String(stage+1).padStart(2,"0")}</span><div><strong>{d.name}</strong><small>{d.copy}</small></div></div>
  </div>
  <div className={styles.controls}><button onClick={()=>{setStage(v=>(v+8)%9);setPlaying(false)}}><ChevronLeft/></button><button className={styles.playBtn} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause/>:<Play/>}{playing?"Pause":"Play"}</button><button onClick={()=>{setStage(v=>(v+1)%9);setPlaying(false)}}><ChevronRight/></button></div>
  <div className={styles.meiosisRail}>{meiStages.map((s,i)=><button key={s.name} className={stage===i?styles.activeStage:""} onClick={()=>{setStage(i);setPlaying(false)}}><b>{i+1}</b><span>{s.name}</span></button>)}</div>
  <div className={styles.ploidy}><div className={styles.ploidyOn}><b>2n</b><span>start</span></div><i>→</i><div className={stage>=4?styles.ploidyOn:""}><b>n</b><span>after I</span></div><i>→</i><div className={stage>=8?styles.ploidyOn:""}><b>4 × n</b><span>final</span></div></div>
 </div>
}

function ZoomJourney(){
 const[level,setLevel]=useState(0);
 const levels=[
  {name:"কোষ",copy:"কোষের ভিতরে nucleus থাকে।"},
  {name:"নিউক্লিয়াস",copy:"nucleus-এর ভিতরে chromosome থাকে।"},
  {name:"ক্রোমোজোম",copy:"chromosome DNA-কে compact করে বহন করে।"},
  {name:"DNA",copy:"DNA-তে hereditary information থাকে।"},
  {name:"জিন",copy:"gene হলো DNA-এর নির্দিষ্ট কার্যকর অংশ।"}
 ];
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Dna/>ZOOM JOURNEY</span><h3>একটি কোষের ভিতরে ঢুকে যাও</h3><p>Level ট্যাপ করো—camera যেন cell থেকে gene পর্যন্ত zoom করছে।</p></div></div>
  <div className={styles.zoomStage}>
   <div className={styles.zoomArt} data-level={level}><div className={styles.zCell}/><div className={styles.zNucleus}/><div className={styles.zChromosome}>X</div><div className={styles.zDna}>{Array.from({length:13},(_,i)=><i key={i}/>)}</div><div className={styles.geneBand}>GENE</div></div>
   <div className={styles.zoomCopy}><span>LEVEL {level+1}/5</span><h4>{levels[level].name}</h4><p>{levels[level].copy}</p><div className={styles.zoomHint}>Next layer →</div></div>
  </div>
  <div className={styles.zoomRail}>{levels.map((x,i)=><button key={x.name} className={i===level?styles.activeStage:""} onClick={()=>setLevel(i)}><b>{i+1}</b><span>{x.name}</span></button>)}</div>
 </div>
}

const pair:{[k:string]:string}={A:"T",T:"A",G:"C",C:"G"};
const baseColors:{[k:string]:string}={A:"#c84f59",T:"#4c9589",G:"#d19d40",C:"#597eab"};

function DnaStudio(){
 const[rotation,setRotation]=useState(18);
 const[auto,setAuto]=useState(true);
 const[selected,setSelected]=useState(7);
 const[sequence,setSequence]=useState(["A","T","G","C","A","G","T","C","G","A","C","T","G","C","A","T"]);

 useEffect(()=>{
  if(!auto)return;
  const id=window.setInterval(()=>setRotation(v=>(v+3)%360),80);
  return()=>window.clearInterval(id);
 },[auto]);

 function randomize(){const b=["A","T","G","C"];setSequence(Array.from({length:16},()=>b[Math.floor(Math.random()*4)]));setSelected(7)}

 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Rotate3D/>MOLECULE LAB</span><h3>DNA double helix · ঘুরিয়ে দেখো</h3><p>Auto rotate বন্ধ করে slider দিয়ে helix ঘোরাও। Base pair ট্যাপ করলে তার partner highlight হবে।</p></div><div className={styles.toolRow}><button className={auto?styles.toolOn:""} onClick={()=>setAuto(v=>!v)}>Auto rotate</button><button onClick={randomize}><RefreshCcw/>Sequence</button></div></div>
  <div className={styles.helixPanel}>
   <div className={styles.helixScene} style={{transform:"rotateX(-7deg) rotateY("+rotation+"deg)"}}>
    {sequence.map((b,i)=><div className={styles.helixRung} style={{top:(18+i*20),transform:"translateX(-50%) rotateY("+(i*32)+"deg)"}} key={i}><button className={selected===i?styles.rungOn:""} onClick={()=>{setSelected(i);setAuto(false)}}><span style={{background:baseColors[b]}}>{b}</span><i/><span style={{background:baseColors[pair[b]]}}>{pair[b]}</span></button></div>)}
    <div className={styles.helixRail+" "+styles.railA}/><div className={styles.helixRail+" "+styles.railB}/>
   </div>
   <div className={styles.helixInfo}><span>selected base pair</span><strong>{sequence[selected]} ↔ {pair[sequence[selected]]}</strong><p>{sequence[selected]==="A"||sequence[selected]==="T"?"Adenine ও Thymine complementary pair।":"Guanine ও Cytosine complementary pair।"}</p><label>নিজে ঘোরাও<input type="range" min="0" max="360" value={rotation} onChange={e=>{setRotation(Number(e.target.value));setAuto(false)}}/></label></div>
  </div>
  <div className={styles.basePicker}>{sequence.map((b,i)=><button key={i} className={selected===i?styles.baseOn:""} onClick={()=>{setSelected(i);setAuto(false)}}><span style={{background:baseColors[b]}}>{b}</span><i>↔</i><span style={{background:baseColors[pair[b]]}}>{pair[b]}</span></button>)}</div>
  <div className={styles.rules}><div><strong>A ↔ T</strong><span>Adenine pairs with Thymine</span></div><div><strong>G ↔ C</strong><span>Guanine pairs with Cytosine</span></div><div><strong>2 strands</strong><span>complementary information</span></div></div>
 </div>
}

function PunnettLab(){
 const[mom,setMom]=useState("Aa");
 const[dad,setDad]=useState("Aa");
 const gametes=(g:string)=>g[0]===g[1]?[g[0],g[0]]:[g[0],g[1]];
 const m=gametes(mom),d=gametes(dad);
 const children=[m[0]+d[0],m[1]+d[0],m[0]+d[1],m[1]+d[1]].map(g=>g==="aA"?"Aa":g);
 const counts=children.reduce((acc,g)=>({...acc,[g]:(acc[g]||0)+1}),{} as Record<string,number>);
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Gamepad2/>MENDELIAN GAME</span><h3>Allele mix করে probability দেখো</h3><p>Parent genotype বদলাও এবং চারটি সম্ভাব্য child combination সঙ্গে সঙ্গে দেখো।</p></div></div>
  <div className={styles.parentControls}><label>মায়ের genotype<select value={mom} onChange={e=>setMom(e.target.value)}><option>AA</option><option>Aa</option><option>aa</option></select></label><ArrowRight/><label>বাবার genotype<select value={dad} onChange={e=>setDad(e.target.value)}><option>AA</option><option>Aa</option><option>aa</option></select></label></div>
  <div className={styles.punnett}><div className={styles.corner}>×</div><div className={styles.headCell}>{m[0]}</div><div className={styles.headCell}>{m[1]}</div><div className={styles.headCell}>{d[0]}</div><div className={styles.childCell}>{children[0]}</div><div className={styles.childCell}>{children[1]}</div><div className={styles.headCell}>{d[1]}</div><div className={styles.childCell}>{children[2]}</div><div className={styles.childCell}>{children[3]}</div></div>
  <div className={styles.probability}>{["AA","Aa","aa"].map(g=><div key={g}><span>{g}</span><strong>{((counts[g]||0)/4*100).toFixed(0)}%</strong><i><b style={{width:((counts[g]||0)/4*100)+"%"}}/></i></div>)}</div>
  <div className={styles.note}><Lightbulb/><span>এটি single-gene Mendelian pattern বোঝানোর simplified model। বাস্তব মানুষের বহু trait একাধিক gene ও environment দ্বারা প্রভাবিত হয়।</span></div>
 </div>
}

export default function ProfessionalLabs({lesson}:{lesson:number}){
 if(lesson===1)return <DivisionComparator/>;
 if(lesson===2)return <MitosisMovie start={0}/>;
 if(lesson===3)return <MitosisMovie start={2}/>;
 if(lesson===4)return <GrowthLab/>;
 if(lesson===5)return <MeiosisMovie start={0}/>;
 if(lesson===6)return <MeiosisMovie start={4}/>;
 if(lesson===7)return <ZoomJourney/>;
 if(lesson===8)return <DnaStudio/>;
 return <PunnettLab/>;
}
