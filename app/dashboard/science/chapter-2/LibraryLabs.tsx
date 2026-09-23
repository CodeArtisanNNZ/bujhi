"use client";

import {useState} from "react";
import styles from "./librarylabs.module.css";


type ResourceKind="mitosis"|"meiosis";
type ResourceTab={id:string;label:string;url:string;embed:string;kind:"site"|"video"|"reference";note:string};

const PROVIDED_RESOURCES:Record<ResourceKind,ResourceTab[]>={
  mitosis:[
    {
      id:"sim1",
      label:"Interactive simulation 1",
      url:"https://nihal-dump.github.io/mitosis-simulation/",
      embed:"https://nihal-dump.github.io/mitosis-simulation/",
      kind:"site",
      note:"Your provided mitosis simulation reference."
    },
    {
      id:"sim2",
      label:"Interactive simulation 2",
      url:"https://all-science-sims.vercel.app/#/biology/mitosis",
      embed:"https://all-science-sims.vercel.app/#/biology/mitosis",
      kind:"site",
      note:"Your second provided mitosis simulation reference."
    },
    {
      id:"video",
      label:"Mitosis video",
      url:"https://youtu.be/7ybxaYhRpIA",
      embed:"https://www.youtube-nocookie.com/embed/7ybxaYhRpIA?rel=0",
      kind:"video",
      note:"The mitosis animation video from your reference sheet."
    },
    {
      id:"reference",
      label:"Stage reference",
      url:"https://www.thoughtco.com/stages-of-mitosis-373534",
      embed:"https://www.thoughtco.com/stages-of-mitosis-373534",
      kind:"reference",
      note:"Stage order and visual reference supplied in your PDF."
    }
  ],
  meiosis:[
    {
      id:"sim",
      label:"Bujhi meiosis tracker",
      url:"/simulations/class-8/meiosis.html",
      embed:"/simulations/class-8/meiosis.html",
      kind:"site",
      note:"Track maternal and paternal chromosomes through Meiosis I and II in Bujhi."
    },
    {
      id:"video",
      label:"Meiosis video",
      url:"https://youtu.be/a0wYd1v9Wdg",
      embed:"https://www.youtube-nocookie.com/embed/a0wYd1v9Wdg?rel=0",
      kind:"video",
      note:"The public meiosis video from your reference sheet; the uploaded MP4 was also used as the visual reference."
    },
    {
      id:"reference",
      label:"Stage reference",
      url:"https://openstax.org/books/biology-ap-courses/pages/11-1-the-process-of-meiosis",
      embed:"https://openstax.org/books/biology-ap-courses/pages/11-1-the-process-of-meiosis",
      kind:"reference",
      note:"Use this alongside the meiosis stage diagram you supplied."
    }
  ]
};

function ProvidedResourceLab({kind,focus}:{kind:ResourceKind;focus:string}){
  const resources=PROVIDED_RESOURCES[kind];
  const[active,setActive]=useState(resources[0].id);
  const current=resources.find(r=>r.id===active)||resources[0];
  return <section className={styles.resourceLab}>
    <div className={styles.resourceHead}>
      <div>
        <span>{kind==="meiosis"?"BUJHI · LIVE LAB":"YOUR PROVIDED REFERENCES"}</span>
        <h3>{kind==="mitosis"?"Mitosis":"Meiosis"} · watch, control, compare</h3>
        <p>{focus}</p>
      </div>
      <a href={current.url} target="_blank" rel="noreferrer">বড় করে দেখো ↗</a>
    </div>
    <div className={styles.resourceTabs}>
      {resources.map(r=><button key={r.id} className={r.id===active?styles.resourceTabOn:""} onClick={()=>setActive(r.id)}>{r.label}</button>)}
    </div>
    <div className={styles.resourceFrameWrap}>
      {current.kind==="reference"?
        <div className={styles.referencePanel}>
          <div className={styles.referenceIcon}>↗</div>
          <strong>{kind==="mitosis"?"Mitosis stage reference":"Meiosis stage reference"}</strong>
          <p>{current.note}</p>
          <a href={current.url} target="_blank" rel="noreferrer">রেফারেন্স খোলো</a>
          <div className={styles.stageMini}>
            {(kind==="mitosis"
              ?["Interphase","Prophase","Late Prophase","Metaphase","Anaphase","Telophase","Cytokinesis"]
              :["Interphase","Prophase I","Metaphase I","Anaphase I","Telophase I","Prophase II","Metaphase II","Anaphase II","Telophase II"]
            ).map((x,i)=><span key={x}><b>{i+1}</b>{x}</span>)}
          </div>
        </div>
        :
        <iframe
          key={current.embed}
          className={styles.resourceFrame+(kind==="meiosis"&&current.kind==="site"?" "+styles.meiosisFrame:"")}
          src={current.embed}
          title={current.label}
          loading="lazy"
          allow={current.kind==="video"?"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share":"fullscreen"}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      }
    </div>
    <div className={styles.resourceNote}>
      <span>{current.kind==="video"?"VIDEO":current.kind==="site"?"INTERACTIVE":"REFERENCE"}</span>
      <p>{current.note}</p>
      {current.kind==="site"&&kind==="mitosis"&&<small>বুঝির ভেতরে এম্বেড করা সাইট না খুললে উপরের “বড় করে দেখো” ব্যবহার করো—মূল সিমুলেশন সরাসরি খুলবে।</small>}
    </div>
  </section>;
}

const sharedCss = `
:root{--red:#990000;--cream:#fff8ef;--ink:#34251f;--muted:#725f56;--line:#dfcec2}
*{box-sizing:border-box}body{margin:0;font-family:Arial,"Noto Sans Bengali",sans-serif;background:var(--cream);color:var(--ink)}
.app{min-height:560px;background:linear-gradient(180deg,#fffaf5,#f4e5da)}
.top{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:20px 22px;border-bottom:1px solid var(--line);background:#fffaf7}
.kicker{font-size:11px;font-weight:800;letter-spacing:.12em;color:var(--red)}h2{margin:6px 0 5px;font-family:Georgia,serif;font-size:30px}p{margin:0;color:var(--muted);line-height:1.55;font-size:14px}
.badge{border:1px solid #d5c1b5;border-radius:999px;padding:7px 10px;font-size:11px;font-weight:800;background:white;color:#6c574e}
.stage{position:relative;min-height:380px;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 42%,#fff5e9,#ead6c7 70%,#d9bfad)}
.controls{display:flex;justify-content:center;gap:8px;padding:13px;background:white;border-top:1px solid var(--line)}
button{border:1px solid #d6c4b8;background:white;color:#5f4b43;border-radius:999px;padding:9px 13px;font-weight:800;cursor:pointer}
button.active,button.primary{background:var(--red);border-color:var(--red);color:white}
.rail{display:flex;gap:7px;overflow:auto;padding:12px 14px;background:#fbf3ed}.rail button{min-width:110px;border-radius:12px}
.info{padding:14px 18px;background:#34251f;color:white;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap}.info strong{color:#ffd5cb;font-family:Georgia,serif;font-size:20px}.info span{font-size:13px;color:#dfd0ca}
.cell{width:250px;height:190px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe4d6,#eda194 70%,#c86b66);border:6px solid #93433e;position:relative;box-shadow:0 14px 28px #71452f22}.nucleus{position:absolute;width:95px;height:95px;border-radius:50%;background:radial-gradient(circle,#eadcf1,#9674a2);border:5px solid #66506f;left:50%;top:50%;transform:translate(-50%,-50%)}
.chr{position:absolute;left:50%;top:50%;font:900 44px Arial;color:#7d2458;transform:translate(-50%,-50%);transform-origin:center}.chr:nth-child(2){color:#47758e}.chr:nth-child(3){color:#4e8b82}.chr:nth-child(4){color:#a64f7a}
.split{display:flex;gap:24px;align-items:center;justify-content:center;flex-wrap:wrap}.mini{width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#ffdfd1,#efa093);border:5px solid #97443f;position:relative}.mini b{position:absolute;right:10px;bottom:8px;color:#74322e}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;padding:24px}.card{background:white;border:1px solid var(--line);border-radius:18px;padding:18px}.card h3{margin:0 0 6px;font-family:Georgia,serif}
input[type=range]{width:100%;accent-color:var(--red)}
@media(max-width:650px){h2{font-size:24px}.top{padding:16px;flex-direction:column}.stage{min-height:330px}.grid{grid-template-columns:1fr;padding:14px}}
`;

function page(title:string, subtitle:string, body:string, script:string, libs:string){
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${sharedCss}</style>${libs}</head><body><main class="app"><header class="top"><div><div class="kicker">মুক্ত ওপেন-সোর্স লাইব্রেরি</div><h2>${title}</h2><p>${subtitle}</p></div><div class="badge">বুঝি · অষ্টম শ্রেণি</div></header>${body}</main><script>${script}<\/script></body></html>`;
}

const animeLib = '<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"><\/script>';
const threeLib = '<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"><\/script>';

function divisionDoc(){
  const body=`
  <div class="controls" id="types"><button data-type="amitosis">অ্যামাইটোসিস</button><button class="active" data-type="mitosis">মাইটোসিস</button><button data-type="meiosis">মিয়োসিস</button></div>
  <section class="stage"><div class="cell"><div class="nucleus"></div></div><div style="font-size:38px;margin:0 24px">→</div><div class="split" id="children"></div></section>
  <div class="info"><strong id="result">2n → 2n + 2n</strong><span id="desc">দুটি সমগুণসম্পন্ন অপত্য কোষ</span></div>`;
  const script=`
  const cfg={amitosis:{n:2,r:'1 → 2',d:'সরাসরি বিভাজন'},mitosis:{n:2,r:'2n → 2n + 2n',d:'দুটি সমগুণসম্পন্ন অপত্য কোষ'},meiosis:{n:4,r:'2n → 4 × n',d:'চারটি haploid cell'}};
  const box=document.getElementById('children'),result=document.getElementById('result'),desc=document.getElementById('desc');
  function render(t){document.querySelectorAll('#types button').forEach(b=>b.classList.toggle('active',b.dataset.type===t));box.innerHTML='';for(let i=0;i<cfg[t].n;i++){const d=document.createElement('div');d.className='mini';d.innerHTML='<div class="nucleus" style="width:48px;height:48px;border-width:3px"></div><b>'+(t==='meiosis'?'n':'2n')+'</b>';box.appendChild(d)}result.textContent=cfg[t].r;desc.textContent=cfg[t].d;anime({targets:'#children .mini',scale:[.2,1],opacity:[0,1],delay:anime.stagger(90),duration:650,easing:'easeOutBack'})}
  document.querySelectorAll('#types button').forEach(b=>b.addEventListener('click',()=>render(b.dataset.type)));render('mitosis');`;
  return page("Cell Division Compare","একই 'কোষ বিভাজন'—কিন্তু outcome এক নয়। বেছে দেখে তুলনা করো।",body,script,animeLib);
}

function mitosisDoc(start:number){
  const stages=["ইন্টারফেজ","প্রোফেজ","প্রো-মেটাফেজ","মেটাফেজ","অ্যানাফেজ","টেলোফেজ","সাইটোকাইনেসিস"];
  const notes=["DNA replicate হয়","chromosome দৃশ্যমান হয়","nuclear envelope ভাঙে","chromosome equator-এ সাজে","chromatid দুই মেরুতে যায়","দুটি nucleus তৈরি হয়","দুটি daughter cell তৈরি হয়"];
  const body=`
  <section class="stage"><div class="cell" id="cell"><div class="nucleus" id="nucleus"></div><div id="chroms"><span class="chr">×</span><span class="chr">×</span><span class="chr">×</span><span class="chr">×</span></div></div></section>
  <div class="info"><strong id="stageName"></strong><span id="stageNote"></span></div>
  <div class="controls"><button id="prev">←</button><button class="primary" id="play">চালাও</button><button id="next">→</button></div>
  <div class="rail" id="rail"></div>`;
  const script=`
  const stages=${JSON.stringify(stages)},notes=${JSON.stringify(notes)};let s=${start},timer=null;const chrom=[...document.querySelectorAll('.chr')],nuc=document.getElementById('nucleus');
  const rail=document.getElementById('rail');stages.forEach((x,i)=>{const b=document.createElement('button');b.textContent=(i+1)+' · '+x;b.addEventListener('click',()=>go(i));rail.appendChild(b)});
  function target(i){const row=-60+i*40;if(s===0)return{x:(i%2?45:-45),y:(i<2?-35:35),r:(i-2)*16,sc:.75};if(s===1)return{x:(i%2?40:-40),y:(i<2?-35:35),r:(i-2)*9,sc:1};if(s===2)return{x:(i%2?22:-22),y:row,r:0,sc:1};if(s===3)return{x:0,y:row,r:0,sc:1};if(s===4)return{x:(i%2?105:-105),y:row,r:(i%2?16:-16),sc:.85};return{x:(i%2?85:-85),y:(i<2?-35:35),r:0,sc:.65}}
  function go(n){s=n;document.getElementById('stageName').textContent=stages[s];document.getElementById('stageNote').textContent=notes[s];[...rail.children].forEach((b,i)=>b.classList.toggle('active',i===s));chrom.forEach((el,i)=>{const t=target(i);anime({targets:el,translateX:t.x,translateY:t.y,rotate:t.r,scale:t.sc,duration:850,easing:'easeInOutQuart'})});anime({targets:nuc,opacity:s<=1?1:s===2?.15:0,duration:500});if(s>=5){anime({targets:'#cell',scaleX:s===6?.82:1,duration:650,easing:'easeInOutQuad'})}else anime({targets:'#cell',scaleX:1,duration:450})}
  document.getElementById('prev').onclick=()=>go((s+6)%7);document.getElementById('next').onclick=()=>go((s+1)%7);document.getElementById('play').onclick=e=>{if(timer){clearInterval(timer);timer=null;e.currentTarget.textContent='চালাও'}else{timer=setInterval(()=>go((s+1)%7),2100);e.currentTarget.textContent='Pause'}};go(s);`;
  return page("Mitosis · Anime.js Timeline","চালাও/Pause করো বা যেকোনো stage নিজে বেছে নাও।",body,script,animeLib);
}

function growthDoc(){
  const body=`
  <div class="grid"><div class="card"><div style="height:320px;position:relative;background:linear-gradient(#bde5ef 0 60%,#8a5a35 60%);overflow:hidden;border-radius:16px"><div id="stem" style="position:absolute;left:50%;bottom:25%;width:11px;height:160px;background:#5a9250;border-radius:99px;transform:translateX(-50%)"><i style="position:absolute;width:75px;height:35px;background:#69a95f;border-radius:70% 15% 70% 15%;left:2px;top:38%"></i><i style="position:absolute;width:75px;height:35px;background:#69a95f;border-radius:70% 15% 70% 15%;right:2px;top:55%;transform:scaleX(-1)"></i></div></div></div><div class="card"><h3>বিভাজনের ধাপ</h3><div style="font:700 48px Georgia;color:#990000" id="roundN">4</div><input id="range" type="range" min="0" max="10" value="4"><h3 style="margin-top:20px">সরল মডেলে কোষ</h3><div style="font:700 34px Georgia" id="cells">16</div><p>প্রতি ধাপে সব কোষ ভাগ হলে সংখ্যা হয় 2ⁿ।</p></div></div>`;
  const script=`
  const range=document.getElementById('range'),stem=document.getElementById('stem');function go(){const n=+range.value;document.getElementById('roundN').textContent=n;document.getElementById('cells').textContent=Math.pow(2,n).toLocaleString();anime({targets:stem,height:90+n*22,duration:650,easing:'easeOutElastic(1,.7)'})}range.addEventListener('input',go);go();`;
  return page("Growth Lab · Anime.js","Slider দিয়ে একটি চারা বড় করো এবং cell number কীভাবে বাড়ে দেখো।",body,script,animeLib);
}

function meiosisDoc(start:number){
  const stages=["Interphase","Prophase I","Metaphase I","Anaphase I","Telophase I","Prophase II","Metaphase II","Anaphase II","Telophase II"];
  const cells=[1,1,1,1,2,2,2,2,4];
  const body=`<section class="stage"><div class="split" id="mei"></div></section><div class="info"><strong id="nm"></strong><span id="pl"></span></div><div class="controls"><button id="prev">←</button><button class="primary" id="play">চালাও</button><button id="next">→</button></div><div class="rail" id="rail"></div>`;
  const script=`
  const names=${JSON.stringify(stages)},counts=${JSON.stringify(cells)};let s=${start},timer=null;const rail=document.getElementById('rail');names.forEach((n,i)=>{const b=document.createElement('button');b.textContent=(i+1)+' · '+n;b.onclick=()=>go(i);rail.appendChild(b)});
  function go(n){s=n;const box=document.getElementById('mei');box.innerHTML='';for(let i=0;i<counts[s];i++){const d=document.createElement('div');d.className='mini';d.innerHTML='<div style="display:flex;gap:8px;align-items:center;justify-content:center;height:100%;font:900 34px Arial"><span style="color:#4d7898">X</span><span style="color:#a94c7b">X</span></div><b>'+(s>=4?'n':'2n')+'</b>';box.appendChild(d)}document.getElementById('nm').textContent=names[s];document.getElementById('pl').textContent=s<4?'diploid phase':'haploid phase';[...rail.children].forEach((b,i)=>b.classList.toggle('active',i===s));anime({targets:'#mei .mini',scale:[.4,1],opacity:[0,1],delay:anime.stagger(90),duration:650,easing:'easeOutBack'})}
  document.getElementById('prev').onclick=()=>go((s+8)%9);document.getElementById('next').onclick=()=>go((s+1)%9);document.getElementById('play').onclick=e=>{if(timer){clearInterval(timer);timer=null;e.currentTarget.textContent='চালাও'}else{timer=setInterval(()=>go((s+1)%9),2100);e.currentTarget.textContent='Pause'}};go(s);`;
  return page("Meiosis · Anime.js Tracker","2n থেকে n এবং শেষে চারটি haploid cell—stage ধরে follow করো।",body,script,animeLib);
}

function zoomDoc(){
  const body=`<section class="stage"><div id="zoom" style="width:280px;height:280px;display:grid;place-items:center;position:relative"><div class="cell" id="layer0"><div class="nucleus"></div></div><div id="layer1" style="display:none;width:210px;height:210px;border-radius:50%;background:radial-gradient(circle,#eadcf1,#9674a2);border:7px solid #66506f"></div><div id="layer2" style="display:none;font:900 150px Arial;color:#6b1f50">X</div><div id="layer3" style="display:none;font:900 64px Georgia;color:#4d7898">DNA</div><div id="layer4" style="display:none;background:#f0b94e;border:3px solid #7c5527;border-radius:10px;padding:18px;font-weight:900">জিন</div></div></section><div class="rail" id="rail"></div><div class="info"><strong id="label">কোষ</strong><span id="copy">কোষের ভিতরে নিউক্লিয়াস থাকে।</span></div>`;
  const script=`
  const names=['কোষ','নিউক্লিয়াস','ক্রোমোজোম','DNA','জিন'],copy=['কোষের ভিতরে নিউক্লিয়াস থাকে।','nucleus-এর ভিতরে chromosome থাকে।','chromosome DNA-কে compact করে বহন করে।','DNA-তে hereditary information থাকে।','gene হলো DNA-এর নির্দিষ্ট কার্যকর অংশ।'];const rail=document.getElementById('rail');names.forEach((n,i)=>{const b=document.createElement('button');b.textContent=(i+1)+' · '+n;b.onclick=()=>go(i);rail.appendChild(b)});function go(n){for(let i=0;i<5;i++)document.getElementById('layer'+i).style.display=i===n?'grid':'none';document.getElementById('label').textContent=names[n];document.getElementById('copy').textContent=copy[n];[...rail.children].forEach((b,i)=>b.classList.toggle('active',i===n));anime({targets:'#layer'+n,scale:[.55,1],opacity:[0,1],duration:700,easing:'easeOutExpo'})}go(0);`;
  return page("Cell → Gene Zoom","Anime.js দিয়ে cell-এর ভেতরে layer ধরে zoom করো।",body,script,animeLib);
}

function dnaDoc(){
  const body=`<div class="grid"><div class="card" style="background:#1d1816;min-height:430px;padding:0"><div id="three" style="height:430px;touch-action:none"></div></div><div class="card"><h3>Three.js DNA প্রদর্শক</h3><p>টেনে অণুটি ঘুরিয়ে দেখো। ডাবল হেলিক্সের দুটি মূল সূত্র ও বেস-জোড়ার সংযোগ একসঙ্গে দেখা যাবে।</p><div style="margin-top:18px;background:#f4e7dd;padding:14px;border-radius:14px"><strong style="color:#990000">A ↔ T</strong><br><strong style="color:#990000">G ↔ C</strong></div></div></div>`;
  const script=`
  const THREE=window.THREE,el=document.getElementById('three'),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,el.clientWidth/430,.1,1000);camera.position.z=15;const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setSize(el.clientWidth,430);renderer.setPixelRatio(Math.min(devicePixelRatio,2));el.appendChild(renderer.domElement);scene.add(new THREE.AmbientLight(0xffffff,1.4));const dl=new THREE.DirectionalLight(0xffffff,1.5);dl.position.set(4,5,8);scene.add(dl);const g=new THREE.Group();scene.add(g);const ma=new THREE.MeshStandardMaterial({color:0x8e315d}),mb=new THREE.MeshStandardMaterial({color:0x39798b}),sphere=new THREE.SphereGeometry(.17,18,18);for(let i=0;i<22;i++){const a=i*.55,y=(i-10.5)*.42,r=2.4,p1=new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r),p2=new THREE.Vector3(Math.cos(a+Math.PI)*r,y,Math.sin(a+Math.PI)*r);const s1=new THREE.Mesh(sphere,ma),s2=new THREE.Mesh(sphere,mb);s1.position.copy(p1);s2.position.copy(p2);g.add(s1,s2);const dir=p2.clone().sub(p1),mid=p1.clone().add(p2).multiplyScalar(.5),rod=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,dir.length(),10),new THREE.MeshStandardMaterial({color:0xf0d9ab}));rod.position.copy(mid);rod.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize());g.add(rod)}let drag=false,lx=0,ly=0;renderer.domElement.onpointerdown=e=>{drag=true;lx=e.clientX;ly=e.clientY};renderer.domElement.onpointermove=e=>{if(!drag)return;g.rotation.y+=(e.clientX-lx)*.01;g.rotation.x+=(e.clientY-ly)*.006;lx=e.clientX;ly=e.clientY};renderer.domElement.onpointerup=()=>drag=false;function loop(){if(!drag)g.rotation.y+=.004;renderer.render(scene,camera);requestAnimationFrame(loop)}loop();`;
  return page("DNA 3D · Three.js","Free Three.js WebGL library দিয়ে rotatable DNA model।",body,script,threeLib);
}

function punnettDoc(){
  const body=`<div class="controls"><label>মা <select id="mom"><option>AA</option><option selected>Aa</option><option>aa</option></select></label><span>×</span><label>বাবা <select id="dad"><option>AA</option><option selected>Aa</option><option>aa</option></select></label></div><div class="grid"><div class="card"><div id="punnett" style="display:grid;grid-template-columns:80px 1fr 1fr;border:1px solid #dcc9bd;border-radius:14px;overflow:hidden"></div></div><div class="card"><h3>কী দেখবে?</h3><p>একটি অ্যালিল মা থেকে এবং একটি বাবা থেকে আসে। পিতামাতার জিনোটাইপ বদলালে সম্ভাব্য সমন্বয় বদলায়।</p></div></div>`;
  const script=`
  const mom=document.getElementById('mom'),dad=document.getElementById('dad'),box=document.getElementById('punnett');function gam(g){return g[0]===g[1]?[g[0],g[0]]:[g[0],g[1]]}function render(){const m=gam(mom.value),d=gam(dad.value),kids=[m[0]+d[0],m[1]+d[0],m[0]+d[1],m[1]+d[1]].map(x=>x==='aA'?'Aa':x);box.innerHTML=['×',m[0],m[1],d[0],kids[0],kids[1],d[1],kids[2],kids[3]].map((x,i)=>'<div class="'+(i===0?'corner':i<3||i===3||i===6?'head':'kid')+'" style="min-height:75px;display:grid;place-items:center;border-right:1px solid #e7d9d0;border-bottom:1px solid #e7d9d0;font-weight:900;font-size:22px">'+x+'</div>').join('');anime({targets:'#punnett .kid',scale:[.6,1],opacity:[0,1],delay:anime.stagger(70),duration:500,easing:'easeOutBack'})}mom.onchange=render;dad.onchange=render;render();`;
  return page("Punnett Square Game","Anime.js transition সহ Mendelian genotype combinations।",body,script,animeLib);
}

function getDoc(lesson:number){
  if(lesson===1)return divisionDoc();
  if(lesson===2)return mitosisDoc(0);
  if(lesson===3)return mitosisDoc(2);
  if(lesson===4)return growthDoc();
  if(lesson===5)return meiosisDoc(0);
  if(lesson===6)return meiosisDoc(4);
  if(lesson===7)return zoomDoc();
  if(lesson===8)return dnaDoc();
  return punnettDoc();
}

export default function LibraryLabs({lesson}:{lesson:number}){
  if(lesson>=1&&lesson<=4){
    const focus=lesson===1
      ?"তোমার দেওয়া মাইটোসিস উপকরণগুলো পাশাপাশি তুলনা করে শুরু করো। ট্যাব ব্যবহার করে দুইটি ইন্টারেক্টিভ সিমুলেশন, অ্যানিমেশন ভিডিও ও ধাপের রেফারেন্স দেখো।"
      :lesson===2
      ?"প্রথমে ইন্টারফেজ ও প্রোফেজে মনোযোগ দাও। তারপর সিমুলেশনের ধাপ এগিয়ে দেখে বোঝো কীভাবে ক্রোমোজোম দৃশ্যমান হয়।"
      :lesson===3
      ?"প্রো-মেটাফেজ → মেটাফেজ → অ্যানাফেজ অনুসরণ করো। অ্যানিমেশন থামিয়ে প্রতিটি ধাপের ক্রম রেফারেন্সের সঙ্গে মিলিয়ে দেখো।"
      :"মাইটোসিসের শেষ ধাপগুলো দেখে টেলোফেজ/সাইটোকাইনেসিসের সঙ্গে অপত্য কোষ তৈরি ও বৃদ্ধির সম্পর্ক বোঝো।";
    return <ProvidedResourceLab kind="mitosis" focus={focus}/>;
  }
  if(lesson===5||lesson===6){
    const focus=lesson===5
      ?"বুঝির মিয়োসিস ট্র্যাকার ও ভিডিওতে মিয়োসিস-I অনুসরণ করো: সমসংস্থ ক্রোমোজোমের জোড়া বাঁধা, সারিবদ্ধ হওয়া, পৃথক হওয়া এবং 2n → n পরিবর্তন।"
      :"মিয়োসিস-II অনুসরণ করে দেখো কীভাবে দুইটি হ্যাপ্লয়েড কোষ থেকে চারটি হ্যাপ্লয়েড কোষ তৈরি হয়।";
    return <ProvidedResourceLab kind="meiosis" focus={focus}/>;
  }
  if(lesson===7)return <div className={styles.frameShell}>
    <iframe
      className={styles.frame}
      title="Bujhi Cell to Gene continuous zoom simulator"
      src="/simulations/class-8/hereditary-hierarchy.html"
      loading="lazy"
      allow="fullscreen"
      allowFullScreen
    />
    <div className={styles.sourceNote}>
      বুঝি · অধ্যায় ২ · পাঠ ৭ · কোষ → নিউক্লিয়াস → ক্রোমোজোম → DNA → জিন · <a href="/simulations/class-8/hereditary-hierarchy.html" target="_blank" rel="noreferrer">বড় করে দেখো ↗</a>
    </div>
  </div>;

  if(lesson===9)return <div className={styles.frameShell}>
    <iframe
      className={styles.frame}
      title="Bujhi heredity and gene transfer simulator"
      src="/simulations/class-8/heredity-gene-transfer.html"
      loading="lazy"
      allow="fullscreen"
      allowFullScreen
    />
    <div className={styles.sourceNote}>
      বুঝি · অধ্যায় ২ · পাঠ ৯ · পিতামাতা → গ্যামেট → নিষেক → সন্তান → বৈশিষ্ট্য · <a href="/simulations/class-8/heredity-gene-transfer.html" target="_blank" rel="noreferrer">বড় করে দেখো ↗</a>
    </div>
  </div>;

  return <div className={styles.frameShell}>
    <iframe
      key={lesson}
      className={styles.frame}
      title={"Bujhi Chapter 2 interactive simulation "+lesson}
      sandbox="allow-scripts"
      srcDoc={getDoc(lesson)}
    />
    <div className={styles.sourceNote}>পাঠ ৮-এ DNA শেখার ভিউয়ার ব্যবহার করা হয়েছে; পাঠ ৭ ও ৯-এ বুঝির দেওয়া সিমুলেশন ব্যবহার করা হয়েছে।</div>
  </div>;
}
