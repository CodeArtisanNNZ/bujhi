"use client";

import {useEffect,useState} from "react";

type Props={running:boolean;onFact?:(text:string)=>void};

const STAGES=[
  {
    en:"Cell",bn:"কোষ",
    descEn:"A cell is the basic structural and functional unit of life.",
    descBn:"কোষ হলো জীবদেহের গঠন ও কাজের মৌলিক একক।"
  },
  {
    en:"Nucleus",bn:"নিউক্লিয়াস",
    descEn:"The nucleus stores most of the cell's genetic material.",
    descBn:"নিউক্লিয়াসে কোষের অধিকাংশ জিনগত উপাদান সংরক্ষিত থাকে।"
  },
  {
    en:"Chromosome",bn:"ক্রোমোজোম",
    descEn:"Chromosomes package long DNA molecules into compact structures.",
    descBn:"ক্রোমোজোম দীর্ঘ DNA অণুকে গুছিয়ে কমপ্যাক্ট কাঠামো তৈরি করে।"
  },
  {
    en:"DNA",bn:"DNA",
    descEn:"DNA carries hereditary information in a double-helix molecule.",
    descBn:"DNA ডাবল-হেলিক্স অণুতে বংশগত তথ্য বহন করে।"
  },
  {
    en:"Gene",bn:"জিন",
    descEn:"A gene is a specific stretch of DNA that contains biological instructions.",
    descBn:"জিন হলো DNA-এর নির্দিষ্ট অংশ, যেখানে জৈবিক নির্দেশনা থাকে।"
  }
] as const;

export default function CellZoomPreview({running,onFact}:Props){
  const[stage,setStage]=useState(0);
  const[lang,setLang]=useState<"en"|"bn">("en");

  useEffect(()=>{
    const sync=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);

  const current=STAGES[stage];

  function go(next:number){
    const index=(next+STAGES.length)%STAGES.length;
    setStage(index);
    const item=STAGES[index];
    onFact?.(lang==="bn"?item.descBn:item.descEn);
  }

  function deeper(){go(stage===STAGES.length-1?0:stage+1)}

  return <div className={`cell-zoom-preview ${running?"":"paused"}`} data-no-translate>
    <button
      type="button"
      className="cell-zoom-stage"
      onClick={deeper}
      aria-label={lang==="bn"?"আরও গভীরে জুম করুন":"Zoom deeper"}
    >
      <svg className="cell-zoom-svg" viewBox="0 0 400 230" role="img" aria-label={lang==="bn"?current.bn:current.en}>
        <defs>
          <radialGradient id="cellBody" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#f7d8cf"/>
            <stop offset="55%" stopColor="#c97f86"/>
            <stop offset="100%" stopColor="#7e3d55"/>
          </radialGradient>
          <radialGradient id="nucleusBody" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#dfc7ef"/>
            <stop offset="58%" stopColor="#8664a6"/>
            <stop offset="100%" stopColor="#4c315e"/>
          </radialGradient>
          <linearGradient id="chromosomeBody" x1="0" x2="1">
            <stop offset="0%" stopColor="#7f4d95"/>
            <stop offset="48%" stopColor="#c795cf"/>
            <stop offset="100%" stopColor="#65407e"/>
          </linearGradient>
          <linearGradient id="dnaOne" x1="0" x2="1">
            <stop offset="0%" stopColor="#7e5aa6"/>
            <stop offset="100%" stopColor="#cf8eaa"/>
          </linearGradient>
          <linearGradient id="dnaTwo" x1="0" x2="1">
            <stop offset="0%" stopColor="#7ac1c8"/>
            <stop offset="100%" stopColor="#6589be"/>
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {stage===0&&<g className="cell-stage-visual">
          <ellipse cx="202" cy="116" rx="134" ry="86" fill="url(#cellBody)" opacity=".96"/>
          <ellipse cx="202" cy="116" rx="139" ry="91" fill="none" stroke="#f7c5bd" strokeWidth="5" opacity=".72"/>
          <ellipse cx="202" cy="116" rx="126" ry="78" fill="none" stroke="#8e4861" strokeWidth="1.5" opacity=".55"/>
          <circle cx="205" cy="111" r="38" fill="url(#nucleusBody)" stroke="#e3cdf0" strokeWidth="3"/>
          <circle cx="205" cy="111" r="14" fill="#6e477f" opacity=".72"/>
          <g fill="#f3b181" opacity=".8">
            <ellipse cx="126" cy="91" rx="17" ry="7" transform="rotate(-24 126 91)"/>
            <ellipse cx="281" cy="139" rx="20" ry="8" transform="rotate(18 281 139)"/>
            <ellipse cx="263" cy="78" rx="14" ry="6" transform="rotate(-33 263 78)"/>
          </g>
          <g fill="#915d75" opacity=".5">
            <circle cx="155" cy="145" r="5"/><circle cx="306" cy="105" r="4"/><circle cx="102" cy="130" r="4"/>
            <circle cx="243" cy="163" r="4"/><circle cx="168" cy="69" r="3"/>
          </g>
          <circle className="cell-pulse-ring" cx="205" cy="111" r="47" fill="none" stroke="#ead7f4" strokeWidth="2"/>
        </g>}

        {stage===1&&<g className="cell-stage-visual">
          <circle cx="200" cy="114" r="82" fill="url(#nucleusBody)" stroke="#ddc7eb" strokeWidth="6"/>
          <circle cx="200" cy="114" r="72" fill="none" stroke="#a88bbb" strokeWidth="1.4" opacity=".72"/>
          <g fill="#e6d4ef" opacity=".88">
            {Array.from({length:14}).map((_,i)=>{
              const a=(i/14)*Math.PI*2;
              return <circle key={i} cx={200+78*Math.cos(a)} cy={114+78*Math.sin(a)} r="2.8"/>;
            })}
          </g>
          <g className="chromatin" fill="none" stroke="#d5b8e3" strokeWidth="3" strokeLinecap="round">
            <path d="M154 96 C166 70,188 86,181 108 S199 135,215 110 S246 93,248 119"/>
            <path d="M162 134 C174 116,184 147,202 132 S230 143,239 122"/>
            <path d="M177 75 C192 90,214 70,228 87"/>
          </g>
          <circle className="nucleus-glow" cx="200" cy="114" r="32" fill="#714985" opacity=".24"/>
        </g>}

        {stage===2&&<g className="cell-stage-visual chromosome-stage">
          <path d="M145 48 C162 45 177 57 185 78 L200 101 L216 77 C227 57 241 45 258 48 C267 51 271 62 266 74 L228 116 L266 157 C272 169 267 181 256 183 C239 186 225 175 216 154 L200 132 L185 155 C174 176 161 186 144 183 C133 180 128 168 135 156 L173 116 L135 75 C128 62 134 51 145 48Z" fill="url(#chromosomeBody)" stroke="#e1c8e9" strokeWidth="3"/>
          <ellipse cx="200" cy="116" rx="17" ry="13" fill="#f0d3e6" opacity=".62"/>
          <g fill="none" stroke="#eddae9" strokeWidth="1.5" opacity=".55">
            <path d="M148 63 C173 73 176 94 190 109"/>
            <path d="M252 62 C229 75 225 94 210 108"/>
            <path d="M149 169 C170 155 178 139 191 125"/>
            <path d="M251 169 C230 155 223 139 209 125"/>
          </g>
          <circle className="chromosome-focus" cx="200" cy="116" r="28" fill="none" stroke="#f0cddf" strokeWidth="2"/>
        </g>}

        {(stage===3||stage===4)&&<g className="cell-stage-visual dna-stage">
          <path d="M105 28 C190 52 210 92 295 116 C210 140 190 180 105 204" fill="none" stroke="url(#dnaOne)" strokeWidth="8" strokeLinecap="round"/>
          <path d="M295 28 C210 52 190 92 105 116 C190 140 210 180 295 204" fill="none" stroke="url(#dnaTwo)" strokeWidth="8" strokeLinecap="round"/>
          {Array.from({length:11}).map((_,i)=>{
            const y=38+i*15.4;
            const t=i/10;
            const wave=Math.sin(t*Math.PI*2);
            const x1=200-85*wave;
            const x2=200+85*wave;
            const active=stage===4&&i>=4&&i<=7;
            return <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={active?"#ffd166":"#d8c7d8"} strokeWidth={active?5:3} opacity={active?1:.7}/>;
          })}
          {stage===4&&<g className="gene-highlight">
            <rect x="88" y="91" width="224" height="62" rx="26" fill="none" stroke="#ffd166" strokeWidth="3" strokeDasharray="8 6"/>
            <path d="M100 82 V72 H300 V82" fill="none" stroke="#ffd166" strokeWidth="3" strokeLinecap="round"/>
            <text x="200" y="63" textAnchor="middle" fill="#ffe7a4" fontSize="14" fontWeight="800">{lang==="bn"?"জিন অঞ্চল":"GENE REGION"}</text>
          </g>}
        </g>}
      </svg>

      <span className="cell-stage-badge">
        <small>{String(stage+1).padStart(2,"0")} / 05</small>
        <strong>{lang==="bn"?current.bn:current.en}</strong>
      </span>

      <span className="cell-stage-copy">{lang==="bn"?current.descBn:current.descEn}</span>
      <span className="cell-zoom-hint">{lang==="bn"?(stage===4?"আবার শুরু করুন":"আরও গভীরে যেতে চাপ দিন"):(stage===4?"Tap to restart":"Tap to zoom deeper")}</span>
    </button>

    <div className="cell-zoom-progress" aria-label={lang==="bn"?"জুম ধাপ":"Zoom stages"}>
      {STAGES.map((item,index)=><button
        key={item.en}
        type="button"
        className={index===stage?"active":""}
        onClick={()=>go(index)}
        aria-label={lang==="bn"?item.bn:item.en}
        title={lang==="bn"?item.bn:item.en}
      />)}
    </div>
  </div>;
}
