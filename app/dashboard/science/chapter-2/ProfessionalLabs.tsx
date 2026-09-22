"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {
 ArrowRight,Check,ChevronLeft,ChevronRight,Dna,Gamepad2,Lightbulb,
 Pause,Play,RefreshCcw,Rotate3D,Sparkles,Target,Zap
} from "lucide-react";
import styles from "./professional.module.css";

type DrawFn=(ctx:CanvasRenderingContext2D,w:number,h:number,now:number)=>void;

function CanvasSurface({draw,label,onPointerDown,onPointerMove,onPointerUp}:{draw:DrawFn;label:string;onPointerDown?:(e:React.PointerEvent<HTMLCanvasElement>)=>void;onPointerMove?:(e:React.PointerEvent<HTMLCanvasElement>)=>void;onPointerUp?:(e:React.PointerEvent<HTMLCanvasElement>)=>void}){
 const ref=useRef<HTMLCanvasElement|null>(null);
 const drawRef=useRef(draw);
 drawRef.current=draw;
 useEffect(()=>{
  const canvas=ref.current;
  if(!canvas)return;
  let raf=0;
  let dead=false;
  const render=(now:number)=>{
   if(dead)return;
   const rect=canvas.getBoundingClientRect();
   const dpr=Math.min(window.devicePixelRatio||1,2);
   const pw=Math.max(1,Math.round(rect.width*dpr));
   const ph=Math.max(1,Math.round(rect.height*dpr));
   if(canvas.width!==pw||canvas.height!==ph){canvas.width=pw;canvas.height=ph}
   const ctx=canvas.getContext("2d");
   if(ctx){
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,rect.width,rect.height);
    drawRef.current(ctx,rect.width,rect.height,now);
   }
   raf=requestAnimationFrame(render);
  };
  raf=requestAnimationFrame(render);
  return()=>{dead=true;cancelAnimationFrame(raf)};
 },[]);
 return <canvas ref={ref} className={styles.canvas} aria-label={label} role="img" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}/>;
}

const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=(t:number)=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const rgba=(hex:string,a:number)=>{
 const h=hex.replace("#","");
 const n=parseInt(h,16);
 return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
};

const palette={
 red:"#990000",coral:"#dc756b",pink:"#a94c7b",purple:"#6d4a79",
 teal:"#4e8b82",blue:"#4d7898",gold:"#e4b65c",cream:"#fff4e6",
 ink:"#38251e",green:"#5f8c57"
};

function drawOrganicCell(ctx:CanvasRenderingContext2D,cx:number,cy:number,rx:number,ry:number,now:number,pinch=0){
 ctx.save();
 ctx.beginPath();
 const steps=96;
 for(let i=0;i<=steps;i++){
  const a=(i/steps)*Math.PI*2;
  const wobble=Math.sin(a*3+now*.0013)*2.2+Math.sin(a*5-now*.001)*1.3;
  const waist=1-pinch*Math.exp(-Math.pow(Math.cos(a),2)*7)*.58;
  const x=cx+Math.cos(a)*(rx+wobble)*waist;
  const y=cy+Math.sin(a)*(ry+wobble);
  if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
 }
 ctx.closePath();
 const g=ctx.createRadialGradient(cx-rx*.25,cy-ry*.35,20,cx,cy,Math.max(rx,ry));
 g.addColorStop(0,"#ffe4d6");
 g.addColorStop(.68,"#f3ae9e");
 g.addColorStop(1,"#cc6c67");
 ctx.fillStyle=g;ctx.fill();
 ctx.strokeStyle="#8d3b38";ctx.lineWidth=4;ctx.stroke();
 ctx.globalAlpha=.26;
 ctx.fillStyle="#fff";
 ctx.beginPath();ctx.ellipse(cx-rx*.22,cy-ry*.34,rx*.43,ry*.18,-.2,0,Math.PI*2);ctx.fill();
 ctx.restore();
}

function drawNucleus(ctx:CanvasRenderingContext2D,x:number,y:number,r:number,alpha=1){
 if(alpha<=0)return;
 ctx.save();ctx.globalAlpha=alpha;
 const g=ctx.createRadialGradient(x-r*.25,y-r*.3,4,x,y,r);
 g.addColorStop(0,"#eadcf2");g.addColorStop(1,"#8f6a9b");
 ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
 ctx.strokeStyle="#65456f";ctx.lineWidth=3;ctx.stroke();
 ctx.fillStyle="#765282";ctx.beginPath();ctx.arc(x+r*.18,y-r*.12,r*.17,0,Math.PI*2);ctx.fill();
 ctx.restore();
}

function drawChromosome(ctx:CanvasRenderingContext2D,x:number,y:number,size:number,color:string,rot=0,alpha=1,centromere=true){
 ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.rotate(rot);
 ctx.strokeStyle=color;ctx.lineCap="round";ctx.lineWidth=Math.max(5,size*.18);
 const arm=size*.55;
 ctx.beginPath();ctx.moveTo(-arm*.55,-arm);ctx.quadraticCurveTo(-arm*.7,-arm*.2,0,0);ctx.quadraticCurveTo(-arm*.7,arm*.2,-arm*.55,arm);ctx.stroke();
 ctx.beginPath();ctx.moveTo(arm*.55,-arm);ctx.quadraticCurveTo(arm*.7,-arm*.2,0,0);ctx.quadraticCurveTo(arm*.7,arm*.2,arm*.55,arm);ctx.stroke();
 if(centromere){ctx.fillStyle=palette.gold;ctx.beginPath();ctx.arc(0,0,size*.12,0,Math.PI*2);ctx.fill()}
 ctx.restore();
}

function drawChromatid(ctx:CanvasRenderingContext2D,x:number,y:number,size:number,color:string,dir:number,alpha=1){
 ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.rotate(dir*.22);
 ctx.strokeStyle=color;ctx.lineWidth=Math.max(5,size*.19);ctx.lineCap="round";
 ctx.beginPath();ctx.moveTo(0,-size*.45);ctx.quadraticCurveTo(-dir*size*.22,0,0,size*.45);ctx.stroke();
 ctx.fillStyle=palette.gold;ctx.beginPath();ctx.arc(0,0,size*.1,0,Math.PI*2);ctx.fill();
 ctx.restore();
}

const mitosisStages=[
 {name:"ইন্টারফেজ",copy:"DNA প্রতিলিপি হয়; কোষ বিভাজনের জন্য প্রস্তুত হয়।"},
 {name:"প্রোফেজ",copy:"ক্রোমাটিন ঘনীভূত হয়ে দৃশ্যমান ক্রোমোজোম তৈরি করে।"},
 {name:"প্রো-মেটাফেজ",copy:"নিউক্লিয়ার পর্দা ভাঙে; spindle fibre ক্রোমোজোমের সাথে যুক্ত হয়।"},
 {name:"মেটাফেজ",copy:"ক্রোমোজোমগুলো কোষের বিষুবীয় অঞ্চলে এক সারিতে সাজে।"},
 {name:"অ্যানাফেজ",copy:"sister chromatid আলাদা হয়ে বিপরীত দুই মেরুর দিকে যায়।"},
 {name:"টেলোফেজ",copy:"দুই মেরুতে নতুন nuclear envelope তৈরি হয়।"},
 {name:"সাইটোকাইনেসিস",copy:"সাইটোপ্লাজম ভাগ হয়ে দুটি অপত্য কোষ তৈরি হয়।"}
];

function MitosisStudio({start=0}:{start?:number}){
 const[phase,setPhase]=useState(start);
 const[playing,setPlaying]=useState(false);
 const[speed,setSpeed]=useState(1);
 const[labels,setLabels]=useState(true);
 const[challenge,setChallenge]=useState<null|"open"|"ok"|"no">(null);
 const phaseRef=useRef(start),progress=useRef(.05),last=useRef(0),playingRef=useRef(false),speedRef=useRef(1);
 useEffect(()=>{phaseRef.current=phase;progress.current=.05},[phase]);
 useEffect(()=>{playingRef.current=playing},[playing]);
 useEffect(()=>{speedRef.current=speed},[speed]);

 const draw:DrawFn=(ctx,w,h,now)=>{
  if(!last.current)last.current=now;
  const dt=Math.min(40,now-last.current);last.current=now;
  if(playingRef.current){
   progress.current+=dt*.00028*speedRef.current;
   if(progress.current>=1){
    progress.current=0;
    const next=(phaseRef.current+1)%mitosisStages.length;
    phaseRef.current=next;setPhase(next);
   }
  }
  const p=ease(clamp(progress.current));
  const cx=w*.5,cy=h*.51,rx=Math.min(w*.36,310),ry=Math.min(h*.39,185);
  const pinch=phaseRef.current===6?p:0;
  drawOrganicCell(ctx,cx,cy,rx,ry,now,pinch);
  const phaseNow=phaseRef.current;

  for(let i=0;i<34;i++){
   const a=i*2.399+now*.00003;
   const rr=(i%7)/7;
   const x=cx+Math.cos(a)*rx*.72*rr;
   const y=cy+Math.sin(a)*ry*.7*rr;
   ctx.fillStyle=rgba(i%2?palette.coral:palette.gold,.16);
   ctx.beginPath();ctx.arc(x,y,1.6+(i%3),0,Math.PI*2);ctx.fill();
  }

  const nucleusAlpha=phaseNow<=1?1:phaseNow===2?1-p:0;
  if(nucleusAlpha>0)drawNucleus(ctx,cx,cy,Math.min(rx,ry)*.48,nucleusAlpha);

  if(phaseNow>=2&&phaseNow<=4){
   const pole=rx*.78;
   ctx.strokeStyle=rgba(palette.gold,.5);ctx.lineWidth=1.3;
   for(let i=0;i<10;i++){
    const yy=cy-ry*.5+i*(ry/9);
    ctx.beginPath();ctx.moveTo(cx-pole,cy);ctx.quadraticCurveTo(cx,yy,cx+pole,cy);ctx.stroke();
   }
   ctx.fillStyle=palette.gold;
   ctx.beginPath();ctx.arc(cx-pole,cy,7,0,Math.PI*2);ctx.fill();
   ctx.beginPath();ctx.arc(cx+pole,cy,7,0,Math.PI*2);ctx.fill();
  }

  const colors=[palette.pink,palette.blue,palette.teal,palette.purple,palette.coral,palette.green];
  for(let i=0;i<6;i++){
   const row=(i-2.5)*30;
   const scatterX=((i%3)-1)*54;
   const scatterY=((i%2)-.5)*66;
   if(phaseNow===0){
    ctx.save();ctx.strokeStyle=rgba(colors[i],.72);ctx.lineWidth=2.2;ctx.beginPath();
    for(let k=0;k<14;k++){
     const a=k*.8+i;
     const x=cx+scatterX+Math.cos(a)*22;
     const y=cy+scatterY+Math.sin(a*1.35)*16;
     if(k===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.stroke();ctx.restore();
   }else if(phaseNow===1){
    const x=lerp(cx+scatterX,cx+scatterX*.75,p);
    const y=lerp(cy+scatterY,cy+scatterY*.7,p);
    drawChromosome(ctx,x,y,40,colors[i],i*.32-.7,.55+.45*p);
   }else if(phaseNow===2){
    const x=lerp(cx+scatterX*.75,cx+(i%2?18:-18),p);
    const y=lerp(cy+scatterY*.7,cy+row,p);
    drawChromosome(ctx,x,y,43,colors[i],lerp(i*.32-.7,0,p),1);
   }else if(phaseNow===3){
    const x=lerp(cx+(i%2?18:-18),cx,p);
    const y=lerp(cy+row,cy+row*.92,p);
    drawChromosome(ctx,x,y,44,colors[i],0,1);
   }else if(phaseNow===4){
    const spread=lerp(0,rx*.58,p);
    drawChromatid(ctx,cx-spread,cy+row*.85,40,colors[i],-1);
    drawChromatid(ctx,cx+spread,cy+row*.85,40,colors[i],1);
   }else{
    const spread=rx*.55;
    const shrink=phaseNow===5?1-.35*p:.64;
    drawChromatid(ctx,cx-spread,cy+row*.65,38*shrink,colors[i],-1,.9);
    drawChromatid(ctx,cx+spread,cy+row*.65,38*shrink,colors[i],1,.9);
   }
  }

  if(phaseNow===5||phaseNow===6){
   const a=phaseNow===5?p:1;
   drawNucleus(ctx,cx-rx*.48,cy,Math.min(rx,ry)*.33,a);
   drawNucleus(ctx,cx+rx*.48,cy,Math.min(rx,ry)*.33,a);
  }

  if(labels){
   ctx.save();ctx.font="700 12px sans-serif";ctx.fillStyle=palette.ink;
   ctx.fillText("কোষপর্দা",cx+rx*.58,cy-ry*.72);
   if(phaseNow>=2&&phaseNow<=4)ctx.fillText("spindle fibre",cx-rx*.12,cy+ry*.83);
   ctx.fillText(phaseNow>=4?"chromatid":"chromosome",cx-rx*.9,cy-ry*.72);
   ctx.restore();
  }
 };

 return <div className={styles.proLab}>
  <div className={styles.proHead}>
   <div><span className={styles.eyebrow}><Zap/>SMOOTH CELL ENGINE</span><h3>মাইটোসিস · তুমি director</h3><p>Play করো, stage বদলাও, speed নিয়ন্ত্রণ করো—প্রতিটি chromosome continuous motion-এ কী করছে সেটা দেখো।</p></div>
   <div className={styles.toolRow}><button className={labels?styles.toolOn:""} onClick={()=>setLabels(v=>!v)}>Labels</button>{[.6,1,1.5].map(v=><button key={v} className={speed===v?styles.toolOn:""} onClick={()=>setSpeed(v)}>{v}×</button>)}</div>
  </div>
  <CanvasSurface draw={draw} label={"Interactive mitosis animation: "+mitosisStages[phase].name}/>
  <div className={styles.captionBar}><div><span>বর্তমান ধাপ</span><strong>{mitosisStages[phase].name}</strong></div><p>{mitosisStages[phase].copy}</p></div>
  <div className={styles.controls}><button onClick={()=>setPhase(v=>(v+mitosisStages.length-1)%mitosisStages.length)}><ChevronLeft/></button><button className={styles.playBtn} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause/>:<Play/>}{playing?"Pause":"Play"}</button><button onClick={()=>setPhase(v=>(v+1)%mitosisStages.length)}><ChevronRight/></button></div>
  <div className={styles.stageRail}>{mitosisStages.map((s,i)=><button key={s.name} onClick={()=>{setPhase(i);setPlaying(false)}} className={phase===i?styles.activeStage:""}><b>{i+1}</b><span>{s.name}</span></button>)}</div>
  <div className={styles.miniChallenge}><Target/><div><strong>Quick challenge</strong><span>কোন ধাপে chromosome মাঝখানে সাজে?</span></div><button onClick={()=>setChallenge("open")}>Answer</button></div>
  {challenge==="open"&&<div className={styles.answerRow}>{["প্রোফেজ","মেটাফেজ","অ্যানাফেজ"].map((x,i)=><button key={x} onClick={()=>setChallenge(i===1?"ok":"no")}>{x}</button>)}</div>}
  {challenge==="ok"&&<div className={styles.good}><Check/>ঠিক — মেটাফেজে।</div>}
  {challenge==="no"&&<div className={styles.retry}>আরেকবার timeline-এ মেটাফেজ দেখো।</div>}
 </div>
}

function DivisionComparator(){
 const[type,setType]=useState<"amitosis"|"mitosis"|"meiosis">("mitosis");
 const data={
  amitosis:{title:"অ্যামাইটোসিস",result:"১ → ২",tag:"direct",cells:2,color:palette.gold,copy:"সরাসরি বিভাজন। জটিল stage-by-stage spindle movement নেই।"},
  mitosis:{title:"মাইটোসিস",result:"2n → 2n + 2n",tag:"growth",cells:2,color:palette.teal,copy:"দেহের বৃদ্ধি ও ক্ষয়পূরণে দুটি সমগুণসম্পন্ন অপত্য কোষ।"},
  meiosis:{title:"মিয়োসিস",result:"2n → 4 × n",tag:"reproduction",cells:4,color:palette.pink,copy:"জননকোষ তৈরির জন্য দুই দফা বিভাজন; chromosome set অর্ধেক।"}
 }[type];
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Gamepad2/>COMPARE MODE</span><h3>একটি মাতৃকোষ, তিন রকম outcome</h3><p>একটি বেছে দেখো—cell number আর chromosome result সাথে সাথে বদলে যাবে।</p></div></div>
  <div className={styles.segment}>{(["amitosis","mitosis","meiosis"] as const).map(x=><button key={x} className={type===x?styles.segmentOn:""} onClick={()=>setType(x)}>{x==="amitosis"?"অ্যামাইটোসিস":x==="mitosis"?"মাইটোসিস":"মিয়োসিস"}</button>)}</div>
  <div className={styles.comparatorStage}>
   <div className={styles.demoCell}><i/><span>মাতৃকোষ</span></div><ArrowRight/>
   <div className={styles.resultGrid}>{Array.from({length:data.cells},(_,i)=><div className={styles.smallCell} style={{"--cell-accent":data.color} as React.CSSProperties} key={i}><i/><b>{type==="meiosis"?"n":"2n"}</b></div>)}</div>
  </div>
  <div className={styles.outcome}><span>{data.tag}</span><strong>{data.result}</strong><p>{data.copy}</p></div>
 </div>
}

function GrowthLab(){
 const[round,setRound]=useState(4);
 const cells=Math.pow(2,round);
 const visible=Math.min(cells,80);
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Sparkles/>GROWTH LAB</span><h3>Cell division দিয়ে একটি চারা বড় করো</h3><p>Division round বাড়ালে cell number, root আর shoot—তিনটিই কীভাবে বদলায় দেখো।</p></div></div>
  <div className={styles.growthArea}>
   <div className={styles.plantWorld}>
    <div className={styles.sun}/>
    <div className={styles.cloud+" "+styles.cloud1}/><div className={styles.cloud+" "+styles.cloud2}/>
    <div className={styles.soil}/>
    <div className={styles.plant} style={{height:(95+(round/10)*240)+"px"}}>
     <div className={styles.stem}/><div className={styles.leaf+" "+styles.l1}/><div className={styles.leaf+" "+styles.l2}/>{round>5&&<><div className={styles.leaf+" "+styles.l3}/><div className={styles.leaf+" "+styles.l4}/></>}<div className={styles.root+" "+styles.r1}/><div className={styles.root+" "+styles.r2}/>
    </div>
   </div>
   <div className={styles.growthControl}><span>division round</span><strong>{round}</strong><input type="range" min="0" max="10" value={round} onChange={e=>setRound(Number(e.target.value))}/><div><small>সরল model-এ cell</small><b>{cells.toLocaleString("bn-BD")}</b></div><p>প্রতি round-এ সব cell একবার ভাগ হলে সংখ্যা হয় <b>2<sup>n</sup></b>। বাস্তব tissue-তে সব cell একই সময়ে ভাগ হয় না।</p></div>
  </div>
  <div className={styles.cellCloud}>{Array.from({length:visible},(_,i)=><i key={i} style={{animationDelay:(i%12)*35+"ms"}}/>)}{cells>visible&&<span>+ আরও {cells-visible}</span>}</div>
 </div>
}

const meiosisStages=[
 "Interphase","Prophase I","Metaphase I","Anaphase I","Telophase I","Prophase II","Metaphase II","Anaphase II","Telophase II"
];
const meiosisCopy=[
 "DNA ইতিমধ্যে replicate হয়েছে। প্রতিটি chromosome-এ দুই sister chromatid।",
 "homologous chromosome জোড়া বাঁধে; crossing-over হতে পারে।",
 "homologous pair equator-এ পাশাপাশি সাজে।",
 "homologous chromosome দুই মেরুর দিকে আলাদা হয়।",
 "দুটি haploid cell তৈরি হয়; chromosome এখনও দুই chromatid-যুক্ত।",
 "দুই haploid cell-এ নতুন spindle তৈরি হয়।",
 "প্রতিটি cell-এ chromosome মাঝখানে সাজে।",
 "sister chromatid আলাদা হয়ে বিপরীত দিকে যায়।",
 "শেষে চারটি haploid cell তৈরি হয়।"
];

function MeiosisStudio({start=0}:{start?:number}){
 const[phase,setPhase]=useState(start);
 const[playing,setPlaying]=useState(false);
 const[crossover,setCrossover]=useState(true);
 const phaseRef=useRef(start),pRef=useRef(.1),last=useRef(0),playRef=useRef(false);
 useEffect(()=>{phaseRef.current=phase;pRef.current=.05},[phase]);
 useEffect(()=>{playRef.current=playing},[playing]);

 const draw:DrawFn=(ctx,w,h,now)=>{
  if(!last.current)last.current=now;
  const dt=Math.min(40,now-last.current);last.current=now;
  if(playRef.current){
   pRef.current+=dt*.00024;
   if(pRef.current>=1){pRef.current=0;const n=(phaseRef.current+1)%9;phaseRef.current=n;setPhase(n)}
  }
  const p=ease(clamp(pRef.current));
  const st=phaseRef.current;
  const cellR=Math.min(w*.19,h*.29,125);
  const colors=[palette.blue,palette.pink];
  const centers=st<4?[[w*.5,h*.52]]:st<8?[[w*.3,h*.52],[w*.7,h*.52]]:[[w*.2,h*.52],[w*.4,h*.52],[w*.6,h*.52],[w*.8,h*.52]];
  centers.forEach(([cx,cy],ci)=>{
   drawOrganicCell(ctx,cx,cy,cellR,cellR*.82,now+(ci*500),0);
   if(st===0)drawNucleus(ctx,cx,cy,cellR*.48,1);
  });

  const drawPair=(cx:number,cy:number,spread:number,alpha=1,small=1)=>{
   drawChromosome(ctx,cx-spread,cy,42*small,colors[0],-.08,alpha);
   drawChromosome(ctx,cx+spread,cy,42*small,colors[1],.08,alpha);
   if(crossover&&st===1){
    ctx.save();ctx.strokeStyle=palette.gold;ctx.lineWidth=5;ctx.lineCap="round";
    ctx.beginPath();ctx.moveTo(cx-8,cy-18);ctx.lineTo(cx+8,cy+18);ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx+8,cy-18);ctx.lineTo(cx-8,cy+18);ctx.stroke();ctx.restore();
   }
  };

  if(st===0){
   drawPair(w*.5,h*.47,42);drawPair(w*.5,h*.61,42);
  }else if(st===1){
   drawPair(w*.5,h*.47,20);drawPair(w*.5,h*.61,20);
  }else if(st===2){
   ctx.strokeStyle=rgba("#ffffff",.7);ctx.setLineDash([6,7]);ctx.beginPath();ctx.moveTo(w*.5,h*.22);ctx.lineTo(w*.5,h*.82);ctx.stroke();ctx.setLineDash([]);
   drawPair(w*.5,h*.45,18);drawPair(w*.5,h*.59,18);
  }else if(st===3){
   const d=lerp(22,cellR*.58,p);
   drawChromosome(ctx,w*.5-d,h*.46,40,colors[0],0);drawChromosome(ctx,w*.5+d,h*.46,40,colors[1],0);
   drawChromosome(ctx,w*.5-d,h*.60,40,colors[1],0);drawChromosome(ctx,w*.5+d,h*.60,40,colors[0],0);
  }else if(st<=6){
   centers.forEach(([cx,cy],ci)=>{
    if(st===4||st===5){drawPair(cx,cy-18,24,1,.9);drawPair(cx,cy+28,24,1,.9)}
    else{drawChromosome(ctx,cx,cy-35,38,ci?colors[1]:colors[0],0);drawChromosome(ctx,cx,cy+35,38,ci?colors[0]:colors[1],0)}
   });
  }else if(st===7){
   centers.forEach(([cx,cy],ci)=>{
    const d=lerp(8,cellR*.45,p);
    drawChromatid(ctx,cx-d,cy-28,34,ci?colors[1]:colors[0],-1);drawChromatid(ctx,cx+d,cy-28,34,ci?colors[1]:colors[0],1);
    drawChromatid(ctx,cx-d,cy+28,34,ci?colors[0]:colors[1],-1);drawChromatid(ctx,cx+d,cy+28,34,ci?colors[0]:colors[1],1);
   });
  }else{
   centers.forEach(([cx,cy],ci)=>{drawChromatid(ctx,cx,cy-12,30,ci%2?colors[1]:colors[0],ci%2?1:-1);drawChromatid(ctx,cx,cy+18,30,ci%2?colors[0]:colors[1],ci%2?-1:1)});
  }

  ctx.fillStyle=palette.ink;ctx.font="800 12px sans-serif";
  ctx.fillText("maternal",20,25);ctx.fillStyle=colors[0];ctx.fillRect(82,16,22,9);
  ctx.fillStyle=palette.ink;ctx.fillText("paternal",120,25);ctx.fillStyle=colors[1];ctx.fillRect(180,16,22,9);
 };

 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Zap/>TWO-DIVISION ENGINE</span><h3>মিয়োসিস · chromosome tracker</h3><p>maternal আর paternal chromosome আলাদা রঙে—pairing, separation এবং চারটি haploid cell পর্যন্ত follow করো।</p></div><button className={crossover?styles.toolOn:""} onClick={()=>setCrossover(v=>!v)}>Crossing-over</button></div>
  <CanvasSurface draw={draw} label={"Interactive meiosis animation: "+meiosisStages[phase]}/>
  <div className={styles.captionBar}><div><span>phase {phase+1}/9</span><strong>{meiosisStages[phase]}</strong></div><p>{meiosisCopy[phase]}</p></div>
  <div className={styles.controls}><button onClick={()=>setPhase(v=>(v+8)%9)}><ChevronLeft/></button><button className={styles.playBtn} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause/>:<Play/>}{playing?"Pause":"Play"}</button><button onClick={()=>setPhase(v=>(v+1)%9)}><ChevronRight/></button></div>
  <div className={styles.meiosisRail}>{meiosisStages.map((s,i)=><button key={s} className={phase===i?styles.activeStage:""} onClick={()=>{setPhase(i);setPlaying(false)}}><b>{i+1}</b><span>{s}</span></button>)}</div>
  <div className={styles.ploidy}><div className={phase>=0?styles.ploidyOn:""}><b>2n</b><span>start</span></div><i>→</i><div className={phase>=4?styles.ploidyOn:""}><b>n</b><span>after I</span></div><i>→</i><div className={phase>=8?styles.ploidyOn:""}><b>4 × n</b><span>final</span></div></div>
 </div>
}

function ZoomJourney(){
 const[level,setLevel]=useState(0);
 const levels=[
  {name:"কোষ",copy:"কোষের ভিতরে নিউক্লিয়াস থাকে।"},
  {name:"নিউক্লিয়াস",copy:"নিউক্লিয়াসে chromosome থাকে।"},
  {name:"ক্রোমোজোম",copy:"chromosome DNA-কে compact করে বহন করে।"},
  {name:"DNA",copy:"DNA-তে hereditary information থাকে।"},
  {name:"জিন",copy:"gene হলো DNA-এর নির্দিষ্ট কার্যকর অংশ।"}
 ];
 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Dna/>ZOOM JOURNEY</span><h3>একটি কোষের ভিতরে ঢুকে যাও</h3><p>প্রতিটি level-এ tap করলে camera আরও গভীরে যাবে।</p></div></div>
  <div className={styles.zoomStage}>
   <div className={styles.zoomArt} data-level={level}>
    <div className={styles.zCell}/><div className={styles.zNucleus}/><div className={styles.zChromosome}>X</div>
    <div className={styles.zDna}>{Array.from({length:13},(_,i)=><i key={i}/>)}</div>
    <div className={styles.geneBand}>GENE</div>
   </div>
   <div className={styles.zoomCopy}><span>LEVEL {level+1}/5</span><h4>{levels[level].name}</h4><p>{levels[level].copy}</p><div className={styles.zoomHint}>Tap the next level →</div></div>
  </div>
  <div className={styles.zoomRail}>{levels.map((x,i)=><button key={x.name} className={i===level?styles.activeStage:""} onClick={()=>setLevel(i)}><b>{i+1}</b><span>{x.name}</span></button>)}</div>
 </div>
}

const DNA_PAIRS:{[k:string]:string}={A:"T",T:"A",G:"C",C:"G"};
const dnaColors:{[k:string]:string}={A:"#c84f59",T:"#4c9589",G:"#d19d40",C:"#597eab"};

function DnaStudio(){
 const canvasWrap=useRef<HTMLDivElement|null>(null);
 const[auto,setAuto]=useState(true);
 const[selected,setSelected]=useState(8);
 const[sequence,setSequence]=useState(["A","T","G","C","A","G","T","C","G","A","C","T","G","C","A","T","C","G"]);
 const drag=useRef({down:false,x:0,y:0,yaw:0,pitch:0});
 const yawRef=useRef(.4),pitchRef=useRef(-.08),autoRef=useRef(auto),selRef=useRef(selected);
 useEffect(()=>{autoRef.current=auto},[auto]);useEffect(()=>{selRef.current=selected},[selected]);

 function randomize(){const b=["A","T","G","C"];setSequence(Array.from({length:18},()=>b[Math.floor(Math.random()*4)]));setSelected(8)}

 const draw:DrawFn=(ctx,w,h,now)=>{
  if(autoRef.current&&!drag.current.down){yawRef.current+=.0035}
  const points:{x:number;y:number;z:number;base:string;strand:number;i:number}[]=[];
  const centerX=w*.5,centerY=h*.5;
  const radius=Math.min(w*.18,105),spacing=Math.min(h*.044,20),cam=420;
  const cy=Math.cos(yawRef.current),sy=Math.sin(yawRef.current),cp=Math.cos(pitchRef.current),sp=Math.sin(pitchRef.current);
  const project=(x:number,y:number,z:number)=>{
   const x1=x*cy-z*sy,z1=x*sy+z*cy;
   const y1=y*cp-z1*sp,z2=y*sp+z1*cp;
   const s=cam/(cam+z2+140);
   return {x:centerX+x1*s,y:centerY+y1*s,z:z2,s};
  };
  for(let i=0;i<sequence.length;i++){
   const a=i*.56;
   const y=(i-(sequence.length-1)/2)*spacing;
   const p1=project(Math.cos(a)*radius,y,Math.sin(a)*radius);
   const p2=project(Math.cos(a+Math.PI)*radius,y,Math.sin(a+Math.PI)*radius);
   points.push({...p1,base:sequence[i],strand:0,i},{...p2,base:DNA_PAIRS[sequence[i]],strand:1,i});
  }
  const rail=(strand:number,color:string)=>{
   const arr=points.filter(p=>p.strand===strand);
   ctx.beginPath();arr.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
   ctx.strokeStyle=color;ctx.lineWidth=9;ctx.lineCap="round";ctx.lineJoin="round";ctx.stroke();
   ctx.strokeStyle=rgba("#ffffff",.35);ctx.lineWidth=2;ctx.stroke();
  };
  const pairs=Array.from({length:sequence.length},(_,i)=>{
   const a=points.find(p=>p.i===i&&p.strand===0)!;const b=points.find(p=>p.i===i&&p.strand===1)!;
   return {a,b,z:(a.z+b.z)/2,i};
  }).sort((a,b)=>b.z-a.z);
  pairs.forEach(({a,b,i})=>{
   ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=i===selRef.current?palette.gold:rgba("#f3d7a1",.75);ctx.lineWidth=i===selRef.current?7:4;ctx.stroke();
  });
  rail(0,"#8e315d");rail(1,"#39798b");
  points.sort((a,b)=>b.z-a.z).forEach(p=>{
   const r=clamp(10*p.s,5,14);
   ctx.fillStyle=dnaColors[p.base];ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle="#fff8";ctx.lineWidth=1.3;ctx.stroke();
   if(p.i===selRef.current){ctx.strokeStyle=palette.gold;ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.x,p.y,r+5,0,Math.PI*2);ctx.stroke()}
  });
  ctx.fillStyle=palette.ink;ctx.font="800 12px sans-serif";ctx.fillText("drag to rotate",18,h-18);
 };

 const pointerDown=(e:React.PointerEvent<HTMLCanvasElement>)=>{e.currentTarget.setPointerCapture(e.pointerId);drag.current={down:true,x:e.clientX,y:e.clientY,yaw:yawRef.current,pitch:pitchRef.current};setAuto(false)};
 const pointerMove=(e:React.PointerEvent<HTMLCanvasElement>)=>{if(!drag.current.down)return;const ny=drag.current.yaw+(e.clientX-drag.current.x)*.009;const np=clamp(drag.current.pitch+(e.clientY-drag.current.y)*.006,-.65,.65);yawRef.current=ny;pitchRef.current=np};
 const pointerUp=()=>{drag.current.down=false};

 return <div className={styles.proLab}>
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Rotate3D/>3D-LIKE MOLECULAR LAB</span><h3>DNA double helix · হাতে ঘুরিয়ে দেখো</h3><p>Drag করে molecule rotate করো। একটি base-pair select করলে complementary partner highlight হবে।</p></div><div className={styles.toolRow}><button className={auto?styles.toolOn:""} onClick={()=>setAuto(v=>!v)}>Auto rotate</button><button onClick={randomize}><RefreshCcw/>Sequence</button></div></div>
  <div ref={canvasWrap}><CanvasSurface draw={draw} label="Interactive rotatable DNA double helix" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp}/></div>
  <div className={styles.basePicker}>{sequence.map((b,i)=><button key={i} className={selected===i?styles.baseOn:""} onClick={()=>{setSelected(i);setAuto(false)}}><span style={{background:dnaColors[b]}}>{b}</span><i>↔</i><span style={{background:dnaColors[DNA_PAIRS[b]]}}>{DNA_PAIRS[b]}</span></button>)}</div>
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
  <div className={styles.proHead}><div><span className={styles.eyebrow}><Gamepad2/>MENDELIAN GAME</span><h3>Allele mix করে probability দেখো</h3><p>এটি single-gene inheritance বোঝানোর simplified model। Parent genotype বদলাও এবং চারটি সম্ভাব্য combination দেখো।</p></div></div>
  <div className={styles.parentControls}><label>মায়ের genotype<select value={mom} onChange={e=>setMom(e.target.value)}><option>AA</option><option>Aa</option><option>aa</option></select></label><ArrowRight/><label>বাবার genotype<select value={dad} onChange={e=>setDad(e.target.value)}><option>AA</option><option>Aa</option><option>aa</option></select></label></div>
  <div className={styles.punnett}>
   <div className={styles.corner}>×</div><div className={styles.headCell}>{m[0]}</div><div className={styles.headCell}>{m[1]}</div>
   <div className={styles.headCell}>{d[0]}</div><div className={styles.childCell}>{children[0]}</div><div className={styles.childCell}>{children[1]}</div>
   <div className={styles.headCell}>{d[1]}</div><div className={styles.childCell}>{children[2]}</div><div className={styles.childCell}>{children[3]}</div>
  </div>
  <div className={styles.probability}>{["AA","Aa","aa"].map(g=><div key={g}><span>{g}</span><strong>{((counts[g]||0)/4*100).toFixed(0)}%</strong><i><b style={{width:((counts[g]||0)/4*100)+"%"}}/></i></div>)}</div>
  <div className={styles.note}><Lightbulb/><span>বাস্তব মানুষের বহু বৈশিষ্ট্য একাধিক gene ও environment দ্বারা প্রভাবিত হয়। এই game শুধুমাত্র Mendelian single-gene pattern বোঝায়।</span></div>
 </div>
}

export default function ProfessionalLabs({lesson}:{lesson:number}){
 if(lesson===1)return <DivisionComparator/>;
 if(lesson===2)return <MitosisStudio start={0}/>;
 if(lesson===3)return <MitosisStudio start={2}/>;
 if(lesson===4)return <GrowthLab/>;
 if(lesson===5)return <MeiosisStudio start={0}/>;
 if(lesson===6)return <MeiosisStudio start={4}/>;
 if(lesson===7)return <ZoomJourney/>;
 if(lesson===8)return <DnaStudio/>;
 return <PunnettLab/>;
}
