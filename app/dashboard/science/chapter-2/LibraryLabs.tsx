"use client";

import Script from "next/script";
import {useEffect,useMemo,useRef,useState} from "react";
import {ArrowRight,Check,ChevronLeft,ChevronRight,Dna,Gamepad2,Pause,Play,RefreshCcw,Sparkles,Target,Zap} from "lucide-react";
import styles from "./librarylabs.module.css";

declare global {
  interface Window {
    anime?: any;
    THREE?: any;
  }
}

const MITO = [
  {name:"ইন্টারফেজ", note:"DNA প্রতিলিপি হয় এবং কোষ বিভাজনের জন্য প্রস্তুত হয়।"},
  {name:"প্রোফেজ", note:"ক্রোমাটিন ঘনীভূত হয়ে দৃশ্যমান chromosome তৈরি করে।"},
  {name:"প্রো-মেটাফেজ", note:"nuclear envelope ভাঙে এবং spindle fibre chromosome-এর সাথে যুক্ত হয়।"},
  {name:"মেটাফেজ", note:"chromosome-গুলো equator-এ এক সারিতে দাঁড়ায়।"},
  {name:"অ্যানাফেজ", note:"sister chromatid আলাদা হয়ে দুই মেরুর দিকে যায়।"},
  {name:"টেলোফেজ", note:"দুই মেরুতে নতুন nucleus তৈরি হয়।"},
  {name:"সাইটোকাইনেসিস", note:"cytoplasm ভাগ হয়ে দুটি daughter cell তৈরি হয়।"}
];

function waitForLib(name:"anime"|"THREE", cb:()=>void){
  let tries=0;
  const tick=()=>{
    if(window[name]) return cb();
    if(tries++<80) window.setTimeout(tick,50);
  };
  tick();
}

function LibraryBadge(){
  return <div className={styles.libraryBadge}><span>FREE LIBRARY POWERED</span><b>Anime.js + Three.js</b></div>;
}

function MitosisLab({start=0}:{start?:number}){
  const[stage,setStage]=useState(start);
  const[playing,setPlaying]=useState(false);
  const[ready,setReady]=useState(false);
  const svgRef=useRef<SVGSVGElement|null>(null);
  const timer=useRef<number|null>(null);

  useEffect(()=>{waitForLib("anime",()=>setReady(true))},[]);

  const animateStage=(to:number)=>{
    const anime=window.anime;
    const svg=svgRef.current;
    if(!anime||!svg){setStage(to);return}
    anime.remove(svg.querySelectorAll("[data-anim]"));
    const chromosomes=Array.from(svg.querySelectorAll<SVGGElement>("[data-chr]"));
    const nucleus=svg.querySelector("[data-nucleus]");
    const nucleus2=svg.querySelector("[data-nucleus2]");
    const spindle=svg.querySelector("[data-spindle]");
    const split=svg.querySelector("[data-split]");

    const target = (i:number)=>{
      const row=-90+i*36;
      if(to===0) return {x:(i%3-1)*82,y:(i%2-.5)*120,scale:.75,rot:(i-2)*13};
      if(to===1) return {x:(i%3-1)*62,y:(i%2-.5)*100,scale:1,rot:(i-2)*9};
      if(to===2) return {x:(i%2?22:-22),y:row,scale:1,rot:0};
      if(to===3) return {x:0,y:row,scale:1,rot:0};
      if(to===4) return {x:(i%2?155:-155),y:row,scale:.86,rot:(i%2?16:-16)};
      return {x:(i%2?132:-132),y:(i%3-1)*50,scale:.62,rot:(i%2?10:-10)};
    };

    chromosomes.forEach((el,i)=>{
      const t=target(i);
      anime({targets:el,translateX:t.x,translateY:t.y,scale:t.scale,rotate:t.rot,duration:820,easing:"easeInOutQuart"});
    });
    anime({targets:nucleus,opacity:to<=1?1:to===2?.15:0,duration:500,easing:"easeOutQuad"});
    anime({targets:nucleus2,opacity:to>=5?1:0,duration:600,easing:"easeOutQuad"});
    anime({targets:spindle,opacity:to>=2&&to<=4?1:0,duration:450});
    anime({targets:split,opacity:to===6?1:0,duration:500});
    setStage(to);
  };

  useEffect(()=>{
    if(!ready)return;
    animateStage(stage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ready]);

  useEffect(()=>{
    if(timer.current) window.clearInterval(timer.current);
    if(!playing)return;
    timer.current=window.setInterval(()=>setStage(v=>{
      const n=(v+1)%MITO.length;
      window.setTimeout(()=>animateStage(n),0);
      return n;
    }),2200);
    return()=>{if(timer.current)window.clearInterval(timer.current)};
  },[playing]);

  return <section className={styles.lab}>
    <Script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js" strategy="afterInteractive" />
    <div className={styles.head}><div><LibraryBadge/><h3>মাইটোসিস — controllable animation</h3><p>Anime.js timeline দিয়ে chromosome movement, nucleus change এবং spindle transition smooth করা হয়েছে।</p></div></div>
    <div className={styles.stage}>
      <svg ref={svgRef} viewBox="0 0 800 460" className={styles.bioSvg}>
        <defs>
          <radialGradient id="cellg" cx="35%" cy="30%"><stop offset="0" stopColor="#ffe8dc"/><stop offset=".72" stopColor="#f2aa9d"/><stop offset="1" stopColor="#c96864"/></radialGradient>
          <radialGradient id="nucg"><stop offset="0" stopColor="#eadbf2"/><stop offset="1" stopColor="#9675a2"/></radialGradient>
        </defs>
        <ellipse cx="400" cy="230" rx="290" ry="170" fill="url(#cellg)" stroke="#90413d" strokeWidth="6"/>
        <ellipse cx="345" cy="175" rx="160" ry="55" fill="#ffffff25"/>
        <g data-anim data-nucleus>
          <circle cx="400" cy="230" r="100" fill="url(#nucg)" stroke="#66506f" strokeWidth="5"/>
          <circle cx="425" cy="207" r="18" fill="#785483"/>
        </g>
        <g data-anim data-nucleus2 opacity="0">
          <circle cx="270" cy="230" r="75" fill="url(#nucg)" stroke="#66506f" strokeWidth="5"/>
          <circle cx="530" cy="230" r="75" fill="url(#nucg)" stroke="#66506f" strokeWidth="5"/>
        </g>
        <g data-anim data-spindle opacity="0" stroke="#f0d485" strokeWidth="2">
          {Array.from({length:11},(_,i)=><g key={i}><line x1="135" y1="230" x2="400" y2={75+i*31}/><line x1="665" y1="230" x2="400" y2={75+i*31}/></g>)}
          <circle cx="135" cy="230" r="9" fill="#e4b45d"/><circle cx="665" cy="230" r="9" fill="#e4b45d"/>
        </g>
        {Array.from({length:6},(_,i)=><g data-anim data-chr key={i} transform={"translate("+(400+(i%3-1)*82)+" "+(230+(i%2-.5)*120)+") scale(.75)"}>
          <path d="M-22 -31 C-8 -17 -7 -7 0 0 C7 -7 8 -17 22 -31" fill="none" stroke={["#9d3f70","#4d7898","#4e8b82","#6d4a79","#dc756b","#5f8c57"][i]} strokeWidth="11" strokeLinecap="round"/>
          <path d="M-22 31 C-8 17 -7 7 0 0 C7 7 8 17 22 31" fill="none" stroke={["#9d3f70","#4d7898","#4e8b82","#6d4a79","#dc756b","#5f8c57"][i]} strokeWidth="11" strokeLinecap="round"/>
          <circle r="6" fill="#e6b358"/>
        </g>)}
        <line data-anim data-split x1="400" y1="62" x2="400" y2="398" stroke="#fff8ea" strokeWidth="18" opacity="0"/>
      </svg>
      <div className={styles.overlay}><span>{stage+1}/7</span><strong>{MITO[stage].name}</strong><p>{MITO[stage].note}</p></div>
    </div>
    <div className={styles.controls}>
      <button onClick={()=>{setPlaying(false);animateStage((stage+6)%7)}}><ChevronLeft/></button>
      <button className={styles.primary} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause/>:<Play/>}{playing?"Pause":"Play"}</button>
      <button onClick={()=>{setPlaying(false);animateStage((stage+1)%7)}}><ChevronRight/></button>
    </div>
    <div className={styles.rail}>{MITO.map((s,i)=><button key={s.name} className={stage===i?styles.active:""} onClick={()=>{setPlaying(false);animateStage(i)}}><b>{i+1}</b><span>{s.name}</span></button>)}</div>
  </section>
}

function DivisionLab(){
  const[type,setType]=useState<"amitosis"|"mitosis"|"meiosis">("mitosis");
  const data={amitosis:{cells:2,result:"1 → 2",copy:"সরাসরি বিভাজন"},mitosis:{cells:2,result:"2n → 2n + 2n",copy:"বৃদ্ধি ও ক্ষয়পূরণ"},meiosis:{cells:4,result:"2n → 4 × n",copy:"জননকোষ তৈরি"}}[type];
  const wrap=useRef<HTMLDivElement|null>(null);
  useEffect(()=>{waitForLib("anime",()=>{if(!wrap.current)return;window.anime({targets:wrap.current.querySelectorAll("[data-child]"),scale:[.2,1],opacity:[0,1],delay:window.anime.stagger(90),duration:520,easing:"easeOutBack"})})},[type]);
  return <section className={styles.lab}>
    <Script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js" strategy="afterInteractive" />
    <div className={styles.head}><div><LibraryBadge/><h3>কোষ বিভাজন compare lab</h3><p>বিভাজনের ধরন বদলালে outcome Anime.js দিয়ে animatedভাবে বদলায়।</p></div></div>
    <div className={styles.tabs}>{(["amitosis","mitosis","meiosis"] as const).map(x=><button key={x} className={type===x?styles.activeTab:""} onClick={()=>setType(x)}>{x==="amitosis"?"অ্যামাইটোসিস":x==="mitosis"?"মাইটোসিস":"মিয়োসিস"}</button>)}</div>
    <div className={styles.compare}><div className={styles.cell}><i/><span>মাতৃকোষ</span></div><ArrowRight/><div ref={wrap} className={styles.children}>{Array.from({length:data.cells},(_,i)=><div data-child className={styles.smallCell} key={i}><i/><b>{type==="meiosis"?"n":"2n"}</b></div>)}</div></div>
    <div className={styles.result}><strong>{data.result}</strong><span>{data.copy}</span></div>
  </section>
}

function GrowthLab(){
  const[round,setRound]=useState(4);
  const stem=useRef<HTMLDivElement|null>(null);
  const leaves=useRef<HTMLDivElement|null>(null);
  const cells=Math.pow(2,round);
  useEffect(()=>{waitForLib("anime",()=>{if(stem.current)window.anime({targets:stem.current,height:90+round*23,duration:600,easing:"easeOutElastic(1,.65)"});if(leaves.current)window.anime({targets:leaves.current.children,scale:[.6,1],rotate:[-8,0],delay:window.anime.stagger(80),duration:500,easing:"easeOutBack"})})},[round]);
  return <section className={styles.lab}>
    <Script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js" strategy="afterInteractive" />
    <div className={styles.head}><div><LibraryBadge/><h3>Growth lab</h3><p>Slider সরাও—Anime.js plant motion-এর সাথে cell growth model দেখাবে।</p></div></div>
    <div className={styles.growth}>
      <div className={styles.plantWorld}><div className={styles.sun}/><div className={styles.soil}/><div ref={stem} className={styles.stem}><div ref={leaves}><i className={styles.leaf1}/><i className={styles.leaf2}/><i className={styles.leaf3}/><i className={styles.leaf4}/></div></div></div>
      <div className={styles.growthPanel}><span>division round</span><strong>{round}</strong><input type="range" min="0" max="10" value={round} onChange={e=>setRound(Number(e.target.value))}/><div><small>সরল model-এ cell</small><b>{cells.toLocaleString("bn-BD")}</b></div><p>প্রতি round-এ সব cell ভাগ হলে সংখ্যা হয় 2ⁿ। বাস্তবে সব cell একই সময়ে ভাগ হয় না।</p></div>
    </div>
  </section>
}

const MEI=[
 {name:"Interphase",cells:1,n:"2n",note:"DNA replicate হয়েছে।"},
 {name:"Prophase I",cells:1,n:"2n",note:"homologous chromosome pair হয়; crossing-over হতে পারে।"},
 {name:"Metaphase I",cells:1,n:"2n",note:"pair equator-এ সাজে।"},
 {name:"Anaphase I",cells:1,n:"2n",note:"homologous chromosome আলাদা হয়।"},
 {name:"Telophase I",cells:2,n:"n",note:"দুটি haploid cell।"},
 {name:"Prophase II",cells:2,n:"n",note:"দুই cell আবার প্রস্তুত হয়।"},
 {name:"Metaphase II",cells:2,n:"n",note:"chromosome আবার equator-এ।"},
 {name:"Anaphase II",cells:2,n:"n",note:"sister chromatid আলাদা হয়।"},
 {name:"Telophase II",cells:4,n:"n",note:"চারটি haploid cell।"}
];

function MeiosisLab({start=0}:{start?:number}){
  const[stage,setStage]=useState(start);
  const[playing,setPlaying]=useState(false);
  const box=useRef<HTMLDivElement|null>(null);
  useEffect(()=>{waitForLib("anime",()=>{if(!box.current)return;window.anime({targets:box.current.querySelectorAll("[data-mei]"),scale:[.7,1],opacity:[0,1],delay:window.anime.stagger(75),duration:620,easing:"easeOutElastic(1,.7)"})})},[stage]);
  useEffect(()=>{if(!playing)return;const id=window.setInterval(()=>setStage(v=>(v+1)%MEI.length),2100);return()=>window.clearInterval(id)},[playing]);
  const d=MEI[stage];
  return <section className={styles.lab}>
    <Script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js" strategy="afterInteractive" />
    <div className={styles.head}><div><LibraryBadge/><h3>মিয়োসিস chromosome tracker</h3><p>Stage-by-stage cell count ও ploidy Anime.js transition দিয়ে দেখানো হয়েছে।</p></div></div>
    <div ref={box} className={styles.meiosisArea}>{Array.from({length:d.cells},(_,i)=><div data-mei key={i} className={styles.meiCell}><span>{d.n}</span><div><b className={styles.blue}>X</b><b className={styles.pink}>X</b></div></div>)}</div>
    <div className={styles.result}><strong>{d.name}</strong><span>{d.note}</span></div>
    <div className={styles.controls}><button onClick={()=>{setPlaying(false);setStage(v=>(v+8)%9)}}><ChevronLeft/></button><button className={styles.primary} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause/>:<Play/>}{playing?"Pause":"Play"}</button><button onClick={()=>{setPlaying(false);setStage(v=>(v+1)%9)}}><ChevronRight/></button></div>
    <div className={styles.rail}>{MEI.map((s,i)=><button key={s.name} className={stage===i?styles.active:""} onClick={()=>{setPlaying(false);setStage(i)}}><b>{i+1}</b><span>{s.name}</span></button>)}</div>
  </section>
}

function ZoomLab(){
  const[level,setLevel]=useState(0);
  const art=useRef<HTMLDivElement|null>(null);
  const levels=["কোষ","নিউক্লিয়াস","ক্রোমোজোম","DNA","জিন"];
  useEffect(()=>{waitForLib("anime",()=>{if(!art.current)return;window.anime({targets:art.current.querySelectorAll("[data-layer]"),scale:[.8,1],opacity:[0,1],delay:window.anime.stagger(100),duration:650,easing:"easeOutExpo"})})},[level]);
  return <section className={styles.lab}>
    <Script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js" strategy="afterInteractive" />
    <div className={styles.head}><div><LibraryBadge/><h3>Cell → Gene zoom journey</h3><p>Anime.js layer transitions ব্যবহার করে cell-এর ভিতরে ধাপে ধাপে zoom করো।</p></div></div>
    <div className={styles.zoomGrid}>
      <div ref={art} className={styles.zoomArt}>
        {level===0&&<div data-layer className={styles.bigCell}><i/></div>}
        {level===1&&<div data-layer className={styles.bigNucleus}/>}
        {level===2&&<div data-layer className={styles.bigChrom}>X</div>}
        {level>=3&&<div data-layer className={styles.dnaLadder}>{Array.from({length:12},(_,i)=><i key={i}/>)}{level===4&&<b>GENE</b>}</div>}
      </div>
      <div className={styles.zoomInfo}><span>LEVEL {level+1}/5</span><strong>{levels[level]}</strong><p>{["কোষের ভিতরে nucleus থাকে।","nucleus-এর ভিতরে chromosome থাকে।","chromosome DNA-কে compact করে বহন করে।","DNA-তে hereditary information থাকে।","gene হলো DNA-এর নির্দিষ্ট কার্যকর অংশ।"][level]}</p></div>
    </div>
    <div className={styles.rail}>{levels.map((x,i)=><button key={x} className={level===i?styles.active:""} onClick={()=>setLevel(i)}><b>{i+1}</b><span>{x}</span></button>)}</div>
  </section>
}

function DnaThreeLab(){
  const mount=useRef<HTMLDivElement|null>(null);
  const[loaded,setLoaded]=useState(false);
  useEffect(()=>{
    if(!loaded||!mount.current||!window.THREE)return;
    const THREE=window.THREE;
    const el=mount.current;
    while(el.firstChild)el.removeChild(el.firstChild);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(42,1,.1,1000);camera.position.set(0,0,15);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    const resize=()=>{const w=Math.max(280,el.clientWidth),h=Math.max(360,el.clientHeight);renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()};
    resize();el.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff,1.3));
    const light=new THREE.DirectionalLight(0xffffff,1.5);light.position.set(5,5,8);scene.add(light);
    const group=new THREE.Group();scene.add(group);
    const matA=new THREE.MeshStandardMaterial({color:0x8e315d,roughness:.35});
    const matB=new THREE.MeshStandardMaterial({color:0x39798b,roughness:.35});
    const pairMats={A:new THREE.MeshStandardMaterial({color:0xc84f59}),T:new THREE.MeshStandardMaterial({color:0x4c9589}),G:new THREE.MeshStandardMaterial({color:0xd19d40}),C:new THREE.MeshStandardMaterial({color:0x597eab})};
    const seq=["A","T","G","C","A","G","T","C","G","A","C","T","G","C","A","T","G","C","A","T"];
    const comp:{[k:string]:string}={A:"T",T:"A",G:"C",C:"G"};
    const sphere=new THREE.SphereGeometry(.18,22,22);
    const cylinder=new THREE.CylinderGeometry(.06,.06,1,12);
    for(let i=0;i<seq.length;i++){
      const a=i*.58,y=(i-(seq.length-1)/2)*.42,r=2.4;
      const p1=new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r);
      const p2=new THREE.Vector3(Math.cos(a+Math.PI)*r,y,Math.sin(a+Math.PI)*r);
      const s1=new THREE.Mesh(sphere,matA),s2=new THREE.Mesh(sphere,matB);s1.position.copy(p1);s2.position.copy(p2);group.add(s1,s2);
      const mid=p1.clone().add(p2).multiplyScalar(.5),dir=p2.clone().sub(p1),len=dir.length();
      const rod=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,len,10),new THREE.MeshStandardMaterial({color:0xf0d9ab}));rod.position.copy(mid);rod.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize());group.add(rod);
      const ba=new THREE.Mesh(new THREE.SphereGeometry(.28,18,18),pairMats[seq[i]]);ba.position.copy(p1.clone().lerp(p2,.38));group.add(ba);
      const bb=new THREE.Mesh(new THREE.SphereGeometry(.28,18,18),pairMats[comp[seq[i]]]);bb.position.copy(p1.clone().lerp(p2,.62));group.add(bb);
    }
    let dragging=false,lastX=0,lastY=0,raf=0;
    const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)};
    const move=(e:PointerEvent)=>{if(!dragging)return;group.rotation.y+=(e.clientX-lastX)*.01;group.rotation.x+=(e.clientY-lastY)*.006;lastX=e.clientX;lastY=e.clientY};
    const up=()=>{dragging=false};
    renderer.domElement.addEventListener("pointerdown",down);renderer.domElement.addEventListener("pointermove",move);renderer.domElement.addEventListener("pointerup",up);renderer.domElement.addEventListener("pointercancel",up);
    const animate=()=>{if(!dragging)group.rotation.y+=.004;renderer.render(scene,camera);raf=requestAnimationFrame(animate)};animate();
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);renderer.domElement.removeEventListener("pointerdown",down);renderer.domElement.removeEventListener("pointermove",move);renderer.domElement.removeEventListener("pointerup",up);renderer.dispose();while(el.firstChild)el.removeChild(el.firstChild)};
  },[loaded]);
  return <section className={styles.lab}>
    <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js" strategy="afterInteractive" onLoad={()=>setLoaded(true)} />
    <div className={styles.head}><div><LibraryBadge/><h3>DNA 3D viewer</h3><p>Three.js WebGL renderer ব্যবহার করা হয়েছে। Drag করে double helix ঘুরিয়ে দেখো।</p></div></div>
    <div className={styles.threeWrap}><div ref={mount} className={styles.threeMount}/><div className={styles.threeInfo}><Dna/><strong>Three.js molecular view</strong><p>দুটি backbone, complementary base-pair এবং double-helix twist একসাথে দেখানো হয়েছে।</p><span>A ↔ T · G ↔ C</span></div></div>
  </section>
}

function PunnettLab(){
  const[mom,setMom]=useState("Aa");
  const[dad,setDad]=useState("Aa");
  const box=useRef<HTMLDivElement|null>(null);
  const gam=(g:string)=>g[0]===g[1]?[g[0],g[0]]:[g[0],g[1]];
  const m=gam(mom),d=gam(dad);
  const kids=[m[0]+d[0],m[1]+d[0],m[0]+d[1],m[1]+d[1]].map(x=>x==="aA"?"Aa":x);
  useEffect(()=>{waitForLib("anime",()=>{if(box.current)window.anime({targets:box.current.querySelectorAll("[data-kid]"),scale:[.65,1],opacity:[0,1],delay:window.anime.stagger(70),duration:420,easing:"easeOutBack"})})},[mom,dad]);
  return <section className={styles.lab}>
    <Script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js" strategy="afterInteractive" />
    <div className={styles.head}><div><LibraryBadge/><h3>Punnett square genetics game</h3><p>Parent genotype বদলাও; Anime.js result transition-এর সাথে সম্ভাব্য সন্তান genotype দেখো।</p></div></div>
    <div className={styles.parents}><label>মা<select value={mom} onChange={e=>setMom(e.target.value)}><option>AA</option><option>Aa</option><option>aa</option></select></label><ArrowRight/><label>বাবা<select value={dad} onChange={e=>setDad(e.target.value)}><option>AA</option><option>Aa</option><option>aa</option></select></label></div>
    <div ref={box} className={styles.punnett}><b>×</b><b>{m[0]}</b><b>{m[1]}</b><b>{d[0]}</b><span data-kid>{kids[0]}</span><span data-kid>{kids[1]}</span><b>{d[1]}</b><span data-kid>{kids[2]}</span><span data-kid>{kids[3]}</span></div>
    <div className={styles.note}><Lightbulb/><span>এটি single-gene Mendelian pattern বোঝানোর simplified model; বাস্তব মানুষের অনেক trait polygenic এবং environment-নির্ভর।</span></div>
  </section>
}

export default function LibraryLabs({lesson}:{lesson:number}){
  if(lesson===1)return <DivisionLab/>;
  if(lesson===2)return <MitosisLab start={0}/>;
  if(lesson===3)return <MitosisLab start={2}/>;
  if(lesson===4)return <GrowthLab/>;
  if(lesson===5)return <MeiosisLab start={0}/>;
  if(lesson===6)return <MeiosisLab start={4}/>;
  if(lesson===7)return <ZoomLab/>;
  if(lesson===8)return <DnaThreeLab/>;
  return <PunnettLab/>;
}
