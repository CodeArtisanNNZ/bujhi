"use client";

import {useEffect,useState} from "react";
import {
 ArrowRight,ChevronLeft,ChevronRight,CircleDot,Dna,Microscope,
 Pause,Play,RefreshCcw,ScanSearch,SlidersHorizontal,Sparkles
} from "lucide-react";
import styles from "./cinematic.module.css";

const MEDIA={
 bacteria:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Bacteria%20cell%20division.jpg?width=1400",
 root:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mitosis%20in%20Onion%20Root%20Tip.jpg?width=1400",
 prophase:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mitosis%20in%20Onion%20Root%20-%20various%20stages%20(Prophase%20and%20Interphase).jpg?width=1400",
 metaphase:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mitosis%20in%20Onion%20Root%20-%20various%20stages%20(Metaphase).jpg?width=1400",
 anaphase:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mitosis%20in%20Onion%20Root%20-%20various%20stages%20(Anaphase%20and%20Interphase).jpg?width=1400",
 telophase:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mitosis%20in%20Onion%20Root%20-%20various%20stages%20(Metaphase%20and%20Telophase%20with%20cell%20plate).jpg?width=1400",
 meiosisA:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Meiosislillitrmpollen40x1.jpg?width=1400",
 meiosisB:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Meiosislillitrmpollen40x3.jpg?width=1400",
 meiosisC:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Meiosislillitrmpollen100x3.jpg?width=1400",
 chromosomes:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Metaphase%20chromosomes.jpg?width=1200"
};

const sources={
 mitosis:"https://commons.wikimedia.org/wiki/Category:Mitosis_in_plant_cells",
 meiosis:"https://commons.wikimedia.org/wiki/Category:Microscopic_images_of_meiosis_in_Lilium_pollen",
 bacteria:"https://commons.wikimedia.org/wiki/File:Bacteria_cell_division.jpg",
 chromosome:"https://commons.wikimedia.org/wiki/File:Metaphase_chromosomes.jpg"
};

function ImageFallback({src,alt,position="50% 50%",zoom=1}:{src:string;alt:string;position?:string;zoom?:number}){
 const[failed,setFailed]=useState(false);
 if(failed)return <div className={styles.imageFallback}><Microscope/><span>Microscope image could not load.</span></div>;
 return <img src={src} alt={alt} style={{objectPosition:position,transform:`scale(${zoom})`}} onError={()=>setFailed(true)}/>;
}

function BioIllustration({phase}:{phase:string}){
 const locations:{[key:string]:{x:number;y:number;rot:number}[]}={
  interphase:[{x:43,y:47,rot:12},{x:55,y:42,rot:-20},{x:49,y:57,rot:35},{x:60,y:57,rot:-10}],
  prophase:[{x:42,y:43,rot:28},{x:58,y:43,rot:-28},{x:42,y:58,rot:-18},{x:58,y:58,rot:18}],
  prometaphase:[{x:39,y:38,rot:25},{x:59,y:42,rot:-25},{x:45,y:61,rot:-15},{x:61,y:60,rot:15}],
  metaphase:[{x:49,y:34,rot:0},{x:50,y:45,rot:0},{x:50,y:56,rot:0},{x:49,y:67,rot:0}],
  anaphase:[{x:31,y:38,rot:-18},{x:68,y:38,rot:18},{x:31,y:61,rot:18},{x:68,y:61,rot:-18}],
  telophase:[{x:28,y:44,rot:8},{x:72,y:44,rot:-8},{x:28,y:57,rot:-8},{x:72,y:57,rot:8}],
  cytokinesis:[{x:24,y:45,rot:8},{x:76,y:45,rot:-8},{x:24,y:56,rot:-8},{x:76,y:56,rot:8}]
 };
 const items=locations[phase]||locations.interphase;
 const split=phase==="cytokinesis";
 const twoNuclei=phase==="telophase"||phase==="cytokinesis";
 const spindle=["prometaphase","metaphase","anaphase"].includes(phase);
 return <svg className={styles.bioSvg} viewBox="0 0 640 390" role="img" aria-label="Scientific schematic of the current cell-division stage">
  <defs>
   <radialGradient id="cyto" cx="45%" cy="38%"><stop offset="0" stopColor="#f8d9cf"/><stop offset="1" stopColor="#c77c72"/></radialGradient>
   <radialGradient id="nuc" cx="40%" cy="35%"><stop offset="0" stopColor="#d9c7e6"/><stop offset="1" stopColor="#826190"/></radialGradient>
   <filter id="soft"><feGaussianBlur stdDeviation="8"/></filter>
   <filter id="shadow"><feDropShadow dx="0" dy="5" stdDeviation="6" floodOpacity=".18"/></filter>
  </defs>
  <ellipse cx="320" cy="195" rx={split?250:230} ry="153" fill="url(#cyto)" stroke="#944a45" strokeWidth="7" filter="url(#shadow)"/>
  <ellipse cx="310" cy="180" rx="170" ry="100" fill="#ffffff1f" filter="url(#soft)"/>
  {!twoNuclei&&phase!=="metaphase"&&phase!=="anaphase"&&phase!=="prometaphase"&&<ellipse cx="320" cy="194" rx="96" ry="90" fill="url(#nuc)" stroke="#5e4569" strokeWidth="5" opacity={phase==="prophase"?.62:.85}/>}
  {twoNuclei&&<><ellipse cx="208" cy="194" rx="72" ry="72" fill="url(#nuc)" stroke="#5e4569" strokeWidth="5"/><ellipse cx="432" cy="194" rx="72" ry="72" fill="url(#nuc)" stroke="#5e4569" strokeWidth="5"/></>}
  {spindle&&<g stroke="#f1d8a5" strokeWidth="3" opacity=".85">
   {items.map((it,i)=><g key={i}><line x1="92" y1="195" x2={it.x*6.4} y2={it.y*3.9}/><line x1="548" y1="195" x2={it.x*6.4} y2={it.y*3.9}/></g>)}
   <circle cx="92" cy="195" r="10" fill="#e1bf74"/><circle cx="548" cy="195" r="10" fill="#e1bf74"/>
  </g>}
  {items.map((it,i)=><g key={i} transform={`translate(${it.x*6.4} ${it.y*3.9}) rotate(${it.rot})`}>
   <path d="M-19 -27 C-8 -18 -6 -7 0 0 C6 -7 8 -18 19 -27" fill="none" stroke="#5c2247" strokeWidth="10" strokeLinecap="round"/>
   <path d="M-19 27 C-8 18 -6 7 0 0 C6 7 8 18 19 27" fill="none" stroke="#5c2247" strokeWidth="10" strokeLinecap="round"/>
   <circle r="6" fill="#f0b056" stroke="#6f3d20" strokeWidth="2"/>
  </g>)}
  {split&&<path d="M320 42 C290 102 291 290 320 348" fill="none" stroke="#f8e8d5" strokeWidth="18" opacity=".9"/>}
  <g className={styles.svgLabels}>
   <line x1="500" y1="76" x2="447" y2="118"/><text x="506" y="72">কোষপর্দা</text>
   {spindle&&<><line x1="530" y1="315" x2="465" y2="260"/><text x="430" y="335">স্পিন্ডল তন্তু</text></>}
   <line x1="104" y1="86" x2="190" y2="130"/><text x="35" y="78">ক্রোমোজোম</text>
  </g>
 </svg>
}

const mitoFrames=[
 {key:"interphase",label:"ইন্টারফেজ",time:"00:00",image:MEDIA.root,position:"50% 44%",note:"প্রস্তুতি পর্ব",detail:"নিউক্লিয়াস অক্ষত থাকে। DNA প্রতিলিপি সম্পন্ন হয়, কিন্তু ক্রোমোজোম এখনও আলাদা X-আকৃতিতে দেখা যায় না।",watch:"গোলাকার/সমজাতীয় নিউক্লিয়াস খুঁজে দেখো।"},
 {key:"prophase",label:"প্রোফেজ",time:"00:04",image:MEDIA.prophase,position:"48% 51%",note:"ক্রোমোজোম দৃশ্যমান",detail:"ক্রোমাটিন ঘনীভূত হতে থাকে। প্রতিলিপিকৃত ক্রোমোজোম ছোট ও মোটা হয়ে স্পষ্ট হতে শুরু করে।",watch:"গাঢ়, জমাট chromatin লক্ষ্য করো।"},
 {key:"prometaphase",label:"প্রো-মেটাফেজ",time:"00:08",image:MEDIA.prophase,position:"64% 45%",note:"পর্দা ভাঙে",detail:"নিউক্লিয়ার পর্দা বিলুপ্ত হয় এবং স্পিন্ডল তন্তু ক্রোমোজোমের সঙ্গে সংযোগ স্থাপন করে।",watch:"ক্রোমোজোমগুলো আর একটি স্পষ্ট নিউক্লিয়াসের ভিতরে বন্দি নেই।"},
 {key:"metaphase",label:"মেটাফেজ",time:"00:12",image:MEDIA.metaphase,position:"49% 48%",note:"মাঝখানে সারি",detail:"ক্রোমোজোমগুলো কোষের বিষুবীয় অঞ্চলে এক সরল সমতলে সাজে। এখানেই তারা সবচেয়ে condensed অবস্থায় থাকে।",watch:"কোষের মাঝ বরাবর গাঢ় chromosome plate খুঁজে দেখো।"},
 {key:"anaphase",label:"অ্যানাফেজ",time:"00:16",image:MEDIA.anaphase,position:"52% 48%",note:"দুই দিকে টান",detail:"সেন্ট্রোমিয়ার বিভক্ত হয়। sister chromatid আলাদা হয়ে দুই বিপরীত মেরুর দিকে সরে যায়।",watch:"একটি গাঢ় রেখা নয়—দুটি পৃথক chromosome group দেখো।"},
 {key:"telophase",label:"টেলোফেজ",time:"00:20",image:MEDIA.telophase,position:"45% 53%",note:"দুটি নিউক্লিয়াস",detail:"দুই মেরুতে পৌঁছানো ক্রোমোজোমের চারদিকে নতুন নিউক্লিয়ার পর্দা তৈরি হয়।",watch:"দুটি নতুন nuclear region এবং মাঝের cell plate লক্ষ্য করো।"},
 {key:"cytokinesis",label:"সাইটোকাইনেসিস",time:"00:24",image:MEDIA.telophase,position:"54% 51%",note:"কোষ আলাদা",detail:"উদ্ভিদকোষে মাঝ বরাবর cell plate তৈরি হয়ে দুই অপত্য কোষকে আলাদা করে।",watch:"মাঝখানের নতুন বিভাজক প্রাচীরটি চিহ্নিত করো।"}
];

function PlayerChrome({index,total,playing,onPlay,onPrev,onNext,onSeek}:{index:number;total:number;playing:boolean;onPlay:()=>void;onPrev:()=>void;onNext:()=>void;onSeek:(n:number)=>void}){
 return <div className={styles.playerChrome}>
  <div className={styles.playerButtons}>
   <button onClick={onPrev} aria-label="Previous frame"><ChevronLeft/></button>
   <button className={styles.playButton} onClick={onPlay} aria-label={playing?"Pause animation":"Play animation"}>{playing?<Pause/>:<Play/>}</button>
   <button onClick={onNext} aria-label="Next frame"><ChevronRight/></button>
  </div>
  <input aria-label="Animation timeline" type="range" min="0" max={total-1} value={index} onChange={e=>onSeek(Number(e.target.value))}/>
  <span>{String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
 </div>
}

function MitosisCinema({start=0}:{start?:number}){
 const[index,setIndex]=useState(start);
 const[playing,setPlaying]=useState(false);
 const[zoom,setZoom]=useState(1);
 const frame=mitoFrames[index];

 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>setIndex(v=>v===mitoFrames.length-1?0:v+1),2900);
  return()=>window.clearInterval(id);
 },[playing]);

 return <div className={styles.cinema}>
  <div className={styles.cinemaTop}>
   <div><span className={styles.labTag}><Microscope/>REAL MICROSCOPY + EXPLANATION MODEL</span><h3>মাইটোসিস · Interactive microscope film</h3><p>ভিডিওর মতো play করো, অথবা timeline ধরে প্রতিটি ধাপ নিজে নিয়ন্ত্রণ করো।</p></div>
   <div className={styles.zoomControl}><ScanSearch/><label>Microscope zoom</label><input type="range" min="1" max="1.8" step=".05" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/></div>
  </div>

  <div className={styles.stageGrid}>
   <figure className={styles.microFrame}>
    <div className={styles.frameImage}><ImageFallback src={frame.image} alt={`Onion root microscopy showing ${frame.label}`} position={frame.position} zoom={zoom}/><div className={styles.frameVignette}/><div className={styles.microscopeHud}><span>ALLIUM ROOT TIP</span><b>{frame.time}</b></div><div className={styles.focusRing}/></div>
    <figcaption><Microscope/><span><b>বাস্তব microscope view</b>{frame.watch}</span></figcaption>
   </figure>
   <figure className={styles.modelFrame}>
    <div className={styles.modelCanvas}><BioIllustration phase={frame.key}/></div>
    <figcaption><Sparkles/><span><b>ব্যাখ্যার model</b>বাস্তব ছবিতে যা দেখছ, model-এ সেই ঘটনাই পরিষ্কার করে দেখানো হয়েছে।</span></figcaption>
   </figure>
  </div>

  <div className={styles.frameInfo}><div><span>বর্তমান ধাপ</span><h4>{frame.label}</h4></div><div><span>কী ঘটছে</span><p>{frame.detail}</p></div><div><span>Focus</span><strong>{frame.note}</strong></div></div>
  <PlayerChrome index={index} total={mitoFrames.length} playing={playing} onPlay={()=>setPlaying(v=>!v)} onPrev={()=>setIndex(v=>v===0?mitoFrames.length-1:v-1)} onNext={()=>setIndex(v=>v===mitoFrames.length-1?0:v+1)} onSeek={n=>{setIndex(n);setPlaying(false)}}/>
  <div className={styles.thumbStrip}>{mitoFrames.map((f,i)=><button key={f.key} className={i===index?styles.thumbOn:""} onClick={()=>{setIndex(i);setPlaying(false)}}><span>{i+1}</span><b>{f.label}</b></button>)}</div>
  <p className={styles.credit}>Microscopy: Wikimedia Commons, onion-root mitosis images by Ibn Anvar / Natalierussell77. <a href={sources.mitosis} target="_blank" rel="noreferrer">Source & licences</a></p>
 </div>
}

function DivisionCinema(){
 const[type,setType]=useState<"amitosis"|"mitosis"|"meiosis">("mitosis");
 const cards={
  amitosis:{title:"অ্যামাইটোসিস",image:MEDIA.bacteria,source:sources.bacteria,tag:"সরাসরি বিভাজনের বাস্তব উদাহরণ",body:"এই microscope image-এ bacterial cell division দেখা যায়। অষ্টম শ্রেণির ধারণা হিসেবে এটিকে সরাসরি বিভাজনের ফল—একটি কোষ থেকে দুইটি—বোঝার জন্য ব্যবহার করো।",result:"1 → 2"},
  mitosis:{title:"মাইটোসিস",image:MEDIA.root,source:sources.mitosis,tag:"Onion root tip · বাস্তব কোষ",body:"বর্ধনশীল onion root tip-এ একসঙ্গে বিভিন্ন mitotic stage দেখা যায়। দেহবৃদ্ধির জন্য এমন বিভাজন বারবার ঘটে।",result:"2n → 2n + 2n"},
  meiosis:{title:"মিয়োসিস",image:MEDIA.meiosisA,source:sources.meiosis,tag:"Lilium pollen · meiosis",body:"Lilium pollen mother cell-এ meiosis পর্যবেক্ষণ করা যায়। দুই দফা nuclear division শেষে chromosome set অর্ধেক হয়।",result:"2n → n + n + n + n"}
 }[type];
 return <div className={styles.cinema}>
  <div className={styles.cinemaTop}><div><span className={styles.labTag}><Microscope/>REAL CELLS</span><h3>একটি ধারণা, তিনটি বাস্তব biological view</h3><p>নামের পার্থক্য নয়—ছবিতে ফলাফল ও chromosome behaviour ধরো।</p></div></div>
  <div className={styles.switcher}>{(["amitosis","mitosis","meiosis"] as const).map(k=><button className={type===k?styles.switchOn:""} onClick={()=>setType(k)} key={k}>{k==="amitosis"?"অ্যামাইটোসিস":k==="mitosis"?"মাইটোসিস":"মিয়োসিস"}</button>)}</div>
  <div className={styles.featureStage}>
   <div className={styles.featureImage}><ImageFallback src={cards.image} alt={cards.tag}/><div className={styles.photoLabel}><Microscope/><span>{cards.tag}</span></div></div>
   <div className={styles.featureText}><span>{cards.title}</span><strong>{cards.result}</strong><p>{cards.body}</p><a href={cards.source} target="_blank" rel="noreferrer">Microscopy source →</a></div>
  </div>
 </div>
}

function GrowthCinema(){
 const[division,setDivision]=useState(0);
 const cells=Math.pow(2,division);
 return <div className={styles.cinema}>
  <div className={styles.cinemaTop}><div><span className={styles.labTag}><Microscope/>TISSUE VIEW</span><h3>একটি growing root-এর ভিতরে কী হচ্ছে?</h3><p>বাস্তব root-tip image-এর উপর division count বদলে growth-এর মূল ধারণা দেখো।</p></div></div>
  <div className={styles.growthStage}>
   <div className={styles.growthPhoto}><ImageFallback src={MEDIA.root} alt="Onion root tip cells under microscope" zoom={1+.035*division}/><div className={styles.scanLines}/><div className={styles.growthHud}><span>SIMULATED DIVISION ROUNDS</span><strong>{division}</strong></div></div>
   <div className={styles.growthData}><span>যদি প্রতিটি কোষ প্রতিবার ভাগ হয়</span><strong>{cells.toLocaleString("bn-BD")} কোষ</strong><p>১টি কোষ থেকে শুরু করে {division} round-এর সরল mathematical model। বাস্তব tissue-তে সব কোষ একই সময়ে বিভাজিত হয় না।</p><input type="range" min="0" max="10" value={division} onChange={e=>setDivision(Number(e.target.value))}/><div className={styles.scaleLabels}><span>১</span><span>division rounds</span><span>১০</span></div></div>
  </div>
  <div className={styles.growthFormula}><CircleDot/><span>1 cell</span><b>× 2 each round</b><strong>2<sup>n</sup></strong><em>cell number rises → tissue can grow</em></div>
  <p className={styles.credit}>Real onion-root microscopy: Wikimedia Commons. <a href={sources.mitosis} target="_blank" rel="noreferrer">Source & licences</a></p>
 </div>
}

const meiosisFrames=[
 {label:"Prophase I",image:MEDIA.meiosisA,caption:"homologous chromosome জোড়া কাছাকাছি আসে; genetic exchange-এর সুযোগ তৈরি হয়।",diagram:"PAIR"},
 {label:"Metaphase I",image:MEDIA.meiosisB,caption:"homologous pairs কোষের মাঝ বরাবর সাজে।",diagram:"PAIR → |"},
 {label:"Anaphase I",image:MEDIA.meiosisB,caption:"homologous chromosome দুই মেরুর দিকে যায়; sister chromatids তখনও যুক্ত।",diagram:"← X   X →"},
 {label:"Meiosis II",image:MEDIA.meiosisC,caption:"দুটি কোষে আবার বিভাজন; এবার sister chromatid আলাদা হয়।",diagram:"2 cells → 4"},
 {label:"Four haploid cells",image:MEDIA.meiosisC,caption:"শেষে চারটি haploid cell; প্রতিটিতে এক সেট chromosome।",diagram:"n · n · n · n"}
];

function MeiosisCinema({start=0}:{start?:number}){
 const[index,setIndex]=useState(start);
 const[playing,setPlaying]=useState(false);
 const frame=meiosisFrames[index];
 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>setIndex(v=>v===meiosisFrames.length-1?0:v+1),3200);
  return()=>window.clearInterval(id);
 },[playing]);
 return <div className={styles.cinema}>
  <div className={styles.cinemaTop}><div><span className={styles.labTag}><Microscope/>LILIUM POLLEN MICROSCOPY</span><h3>মিয়োসিস · Two divisions, controllable film</h3><p>Microscope frame বদলাও এবং chromosome-number story একই সাথে follow করো।</p></div></div>
  <div className={styles.meiStage}>
   <figure className={styles.meiPhoto}><ImageFallback src={frame.image} alt={`Lilium pollen meiosis: ${frame.label}`}/><div className={styles.frameVignette}/><div className={styles.meiLabel}>{frame.label}</div></figure>
   <div className={styles.meiModel}>
    <span>CHROMOSOME STORY</span><strong>{frame.diagram}</strong>
    <div className={styles.ploidyMeter}><div className={index===0?styles.ploidyOn:""}><b>2n</b><small>diploid start</small></div><i>→</i><div className={index>=1?styles.ploidyOn:""}><b>n</b><small>after meiosis I</small></div><i>→</i><div className={index>=3?styles.ploidyOn:""}><b>4 × n</b><small>final cells</small></div></div>
    <p>{frame.caption}</p>
   </div>
  </div>
  <PlayerChrome index={index} total={meiosisFrames.length} playing={playing} onPlay={()=>setPlaying(v=>!v)} onPrev={()=>setIndex(v=>v===0?meiosisFrames.length-1:v-1)} onNext={()=>setIndex(v=>v===meiosisFrames.length-1?0:v+1)} onSeek={n=>{setIndex(n);setPlaying(false)}}/>
  <p className={styles.credit}>Lilium pollen meiosis micrographs: John Elson, Wikimedia Commons (CC BY 3.0). <a href={sources.meiosis} target="_blank" rel="noreferrer">Source & licence</a></p>
 </div>
}

function ChromosomeCinema(){
 const[level,setLevel]=useState(0);
 const labels=[
  {name:"Microscope",title:"Metaphase chromosomes",body:"বাস্তব microscope image-এ condensed chromosome-গুলো আলাদা structure হিসেবে দেখা যায়।"},
  {name:"Chromosome",title:"একটি chromosome আলাদা করো",body:"প্রতিলিপির পরে একটি chromosome-এ দুই sister chromatid থাকে।"},
  {name:"Chromatid",title:"দুটি sister chromatid",body:"দুটি chromatid centromere অঞ্চলে যুক্ত থাকে।"},
  {name:"DNA",title:"Chromatin খুললে DNA",body:"chromosome-এর ভিতরে DNA protein-এর সঙ্গে প্যাক করা থাকে।"},
  {name:"Gene",title:"DNA-এর নির্দিষ্ট অংশ = gene",body:"একটি gene হলো DNA sequence-এর একটি কার্যকর অংশ।"}
 ];
 return <div className={styles.cinema}>
  <div className={styles.cinemaTop}><div><span className={styles.labTag}><Microscope/>MICROSCOPE → MOLECULE</span><h3>Real chromosome থেকে gene পর্যন্ত zoom</h3><p>বাস্তব image থেকে শুরু করে ধাপে ধাপে molecular model-এ নামো।</p></div></div>
  <div className={styles.zoomCinema}>
   <div className={styles.chromPhoto}><ImageFallback src={MEDIA.chromosomes} alt="Metaphase chromosomes microscopy" zoom={1+level*.12}/><div className={styles.zoomTarget} style={{transform:`translate(-50%,-50%) scale(${1-level*.12})`}}/></div>
   <div className={styles.moleculeStage}>
    <svg viewBox="0 0 620 330" className={styles.dnaSvg}>
     <defs><linearGradient id="chr" x1="0" x2="1"><stop stopColor="#80234d"/><stop offset=".5" stopColor="#b24e74"/><stop offset="1" stopColor="#5f1737"/></linearGradient></defs>
     <g opacity={level<3?1:.18} transform={`translate(${level*25} 0) scale(${1+level*.07})`}>
      <path d="M220 55 C270 90 265 128 310 165 C267 204 270 245 220 278" fill="none" stroke="url(#chr)" strokeWidth="42" strokeLinecap="round"/>
      <path d="M400 55 C350 90 355 128 310 165 C353 204 350 245 400 278" fill="none" stroke="url(#chr)" strokeWidth="42" strokeLinecap="round"/>
      <circle cx="310" cy="165" r="24" fill="#edb55c" stroke="#6b401d" strokeWidth="6"/>
     </g>
     <g opacity={level>=3?1:.12}>
      {Array.from({length:13},(_,i)=><g key={i} transform={`translate(${180+i*22} ${80+i*5}) rotate(${i%2?25:-25})`}><line x1="-22" y1="0" x2="22" y2="0" stroke={i%2?"#3d7a76":"#b04d55"} strokeWidth="7" strokeLinecap="round"/><circle cx="-22" cy="0" r="5" fill="#f3d18c"/><circle cx="22" cy="0" r="5" fill="#f3d18c"/></g>)}
      <path d="M150 75 C250 10 365 220 470 150 C365 80 250 290 150 225" fill="none" stroke="#4f657c" strokeWidth="4"/>
     </g>
     {level===4&&<g><rect x="300" y="128" width="92" height="62" rx="14" fill="#f1b447" opacity=".9"/><text x="346" y="165" textAnchor="middle" fontSize="20" fontWeight="800" fill="#3b2a1d">GENE</text></g>}
    </svg>
    <span>LEVEL {level+1}/5</span><h4>{labels[level].title}</h4><p>{labels[level].body}</p>
   </div>
  </div>
  <div className={styles.zoomSteps}>{labels.map((x,i)=><button onClick={()=>setLevel(i)} className={i===level?styles.zoomOn:""} key={x.name}><b>{i+1}</b><span>{x.name}</span></button>)}</div>
  <p className={styles.credit}>Chromosome microscopy: Wikimedia Commons, CC BY-SA. <a href={sources.chromosome} target="_blank" rel="noreferrer">Source & licence</a></p>
 </div>
}

function DnaCinema(){
 const[sequence,setSequence]=useState(["A","T","G","C","G","A","C","T"]);
 const comp=(b:string)=>({A:"T",T:"A",G:"C",C:"G"} as Record<string,string>)[b];
 const randomize=()=>{const b=["A","T","G","C"];setSequence(Array.from({length:8},()=>b[Math.floor(Math.random()*4)]))};
 return <div className={styles.cinema}>
  <div className={styles.cinemaTop}><div><span className={styles.labTag}><Dna/>MOLECULAR MODEL</span><h3>DNA · 3D double-helix model</h3><p>এটি photograph নয়—DNA-এর scientifically faithful molecular teaching model। Base pair বদলে নিজে pattern পরীক্ষা করো।</p></div><button className={styles.randomBtn} onClick={randomize}><RefreshCcw/>নতুন sequence</button></div>
  <div className={styles.dnaLab}>
   <div className={styles.helix3d}>{sequence.map((b,i)=><div className={styles.rung} style={{transform:`translate(-50%,-50%) rotateY(${i*34}deg) translateY(${(i-3.5)*26}px)`}} key={i}><span className={styles["nuc"+b]}>{b}</span><i/><span className={styles["nuc"+comp(b)]}>{comp(b)}</span></div>)}</div>
   <div className={styles.baseBoard}><span>BASE PAIRING</span>{sequence.map((b,i)=><div key={i}><b className={styles["nuc"+b]}>{b}</b><i>···</i><b className={styles["nuc"+comp(b)]}>{comp(b)}</b></div>)}</div>
  </div>
  <div className={styles.ruleCards}><div><strong>A ↔ T</strong><span>Adenine pairs with Thymine</span></div><div><strong>G ↔ C</strong><span>Guanine pairs with Cytosine</span></div><div><strong>2 strands</strong><span>complementary information</span></div></div>
 </div>
}

function HeredityCinema(){
 const[step,setStep]=useState(0);
 const flow=[
  {k:"DNA",title:"তথ্য সংরক্ষণ",copy:"DNA sequence-এ hereditary information থাকে।"},
  {k:"RNA",title:"তথ্য ব্যবহার",copy:"RNA gene information ব্যবহারের পথে মধ্যস্থতা করে।"},
  {k:"PROTEIN",title:"কোষে কাজ",copy:"Protein কোষের structure ও function-এ কাজ করে।"},
  {k:"TRAIT",title:"বৈশিষ্ট্যে অবদান",copy:"Gene ও environment—দুটিই বহু trait-এর প্রকাশে ভূমিকা রাখে।"}
 ];
 return <div className={styles.cinema}>
  <div className={styles.cinemaTop}><div><span className={styles.labTag}><SlidersHorizontal/>CONTROLLED INFORMATION FLOW</span><h3>Gene থেকে trait — signal path</h3><p>প্রতিটি stage ট্যাপ করে তথ্যের যাত্রা follow করো।</p></div></div>
  <div className={styles.signalTrack}>{flow.map((x,i)=><button onClick={()=>setStep(i)} className={i===step?styles.signalOn:""} key={x.k}><span>{String(i+1).padStart(2,"0")}</span><strong>{x.k}</strong>{i<flow.length-1&&<ArrowRight/>}</button>)}</div>
  <div className={styles.signalStage}>
   <div className={styles.signalPulse} style={{left:(step*31.5+5)+"%"}}/>
   <div><span>{flow[step].k}</span><h4>{flow[step].title}</h4><p>{flow[step].copy}</p></div>
   <div className={styles.familyModel}><div><b>মা</b><span>n</span></div><i>+</i><div><b>বাবা</b><span>n</span></div><i>→</i><div className={styles.childCell}><b>সন্তান</b><span>2n</span></div></div>
  </div>
 </div>
}

export default function CinematicLab({lesson}:{lesson:number}){
 if(lesson===1)return <DivisionCinema/>;
 if(lesson===2)return <MitosisCinema start={0}/>;
 if(lesson===3)return <MitosisCinema start={2}/>;
 if(lesson===4)return <GrowthCinema/>;
 if(lesson===5)return <MeiosisCinema start={0}/>;
 if(lesson===6)return <MeiosisCinema start={2}/>;
 if(lesson===7)return <ChromosomeCinema/>;
 if(lesson===8)return <DnaCinema/>;
 return <HeredityCinema/>;
}
