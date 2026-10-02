"use client";

import {useEffect,useState} from "react";

type Props={running:boolean;onFact?:(text:string)=>void};

const FACTS={
  en:[
    "The nucleus stores most of a cell's genetic material.",
    "Chromosomes package long DNA molecules so they fit inside the nucleus.",
    "DNA is a double helix built from paired bases.",
    "A gene is a specific stretch of DNA carrying biological instructions."
  ],
  bn:[
    "নিউক্লিয়াসে কোষের অধিকাংশ জিনগত উপাদান সংরক্ষিত থাকে।",
    "ক্রোমোজোম দীর্ঘ DNA অণুকে গুছিয়ে নিউক্লিয়াসের ভেতরে রাখে।",
    "DNA হলো জোড়া বেস দিয়ে তৈরি ডাবল হেলিক্স।",
    "জিন হলো DNA-এর নির্দিষ্ট অংশ, যেখানে জৈবিক নির্দেশনা থাকে।"
  ]
} as const;

export default function CellZoomPreview({running,onFact}:Props){
  const[lang,setLang]=useState<"en"|"bn">("en");
  const[factIndex,setFactIndex]=useState(0);

  useEffect(()=>{
    const sync=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);

  function showNextFact(){
    const next=(factIndex+1)%FACTS.en.length;
    setFactIndex(next);
    onFact?.(FACTS[lang][next]);
  }

  return <button
    type="button"
    className={`clean-cell-preview ${running?"":"paused"}`}
    onClick={showNextFact}
    aria-label={lang==="bn"?"কোষ ও DNA সম্পর্কে জানুন":"Explore the cell and DNA"}
    data-no-translate
  >
    <svg className="clean-cell-svg" viewBox="0 0 440 250" role="img" aria-hidden="true">
      <defs>
        <radialGradient id="cellGlow" cx="38%" cy="32%">
          <stop offset="0%" stopColor="#f4c8c6" stopOpacity=".95"/>
          <stop offset="58%" stopColor="#a65d7a" stopOpacity=".82"/>
          <stop offset="100%" stopColor="#41283e" stopOpacity=".96"/>
        </radialGradient>
        <radialGradient id="nucleusGlow" cx="34%" cy="30%">
          <stop offset="0%" stopColor="#e6d6f4"/>
          <stop offset="58%" stopColor="#8d6ab0"/>
          <stop offset="100%" stopColor="#432955"/>
        </radialGradient>
        <linearGradient id="dnaA" x1="0" x2="1">
          <stop offset="0%" stopColor="#c08cdd"/>
          <stop offset="100%" stopColor="#8152ae"/>
        </linearGradient>
        <linearGradient id="dnaB" x1="0" x2="1">
          <stop offset="0%" stopColor="#75d3d0"/>
          <stop offset="100%" stopColor="#4a87c6"/>
        </linearGradient>
        <filter id="cellSoftGlow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <g className="clean-cell-body">
        <ellipse cx="135" cy="128" rx="92" ry="72" fill="url(#cellGlow)"/>
        <ellipse cx="135" cy="128" rx="96" ry="76" fill="none" stroke="#efc2c2" strokeOpacity=".48" strokeWidth="4"/>
        <circle cx="139" cy="126" r="39" fill="url(#nucleusGlow)" stroke="#d8c2ea" strokeWidth="3"/>
        <circle cx="139" cy="126" r="14" fill="#5b3a70" opacity=".6"/>
        <g fill="#e7a77f" opacity=".76">
          <ellipse cx="86" cy="96" rx="15" ry="6" transform="rotate(-25 86 96)"/>
          <ellipse cx="188" cy="154" rx="17" ry="6" transform="rotate(24 188 154)"/>
          <ellipse cx="183" cy="91" rx="12" ry="5" transform="rotate(-34 183 91)"/>
        </g>
        <circle className="clean-nucleus-ring" cx="139" cy="126" r="47" fill="none" stroke="#e6d5f0" strokeWidth="2"/>
      </g>

      <path className="clean-zoom-line" d="M181 108 C221 92 236 78 261 64" fill="none" stroke="#d7b7e8" strokeWidth="1.5" strokeDasharray="5 6"/>

      <g className="clean-dna" transform="translate(236 22)">
        <path d="M20 5 C102 31 102 72 20 96 C-62 120 -62 162 20 191" fill="none" stroke="url(#dnaA)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M150 5 C68 31 68 72 150 96 C232 120 232 162 150 191" fill="none" stroke="url(#dnaB)" strokeWidth="8" strokeLinecap="round"/>
        {Array.from({length:12}).map((_,i)=>{
          const y=12+i*15.2;
          const phase=(i/11)*Math.PI*2;
          const left=85-64*Math.sin(phase);
          const right=85+64*Math.sin(phase);
          return <line
            key={i}
            x1={left}
            y1={y}
            x2={right}
            y2={y}
            stroke={i>=5&&i<=7?"#ffd36a":"#e5d6e7"}
            strokeWidth={i>=5&&i<=7?4:2.5}
            strokeLinecap="round"
            opacity={i>=5&&i<=7?1:.7}
          />;
        })}
        <rect className="clean-gene-focus" x="2" y="78" width="166" height="54" rx="24" fill="none" stroke="#ffd36a" strokeWidth="2" strokeDasharray="7 6"/>
      </g>
    </svg>

    <span className="clean-cell-label">
      <small>{lang==="bn"?"কোষ → নিউক্লিয়াস → DNA":"Cell → Nucleus → DNA"}</small>
      <strong>{lang==="bn"?"জীবনের কোডের ভেতরে":"Inside the code of life"}</strong>
    </span>

    <span className="clean-cell-hint">
      {lang==="bn"?"একটি তথ্যের জন্য চাপ দিন":"Tap for a fact"}
    </span>
  </button>;
}
