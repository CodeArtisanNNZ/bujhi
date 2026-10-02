"use client";

import {useEffect,useMemo,useRef,useState,type CSSProperties} from "react";

type Props={running:boolean;onFact?:(text:string)=>void};

const FACTS={
  en:[
    "DNA stores genetic information in a double-helix structure.",
    "A pairs with T, while G pairs with C.",
    "The sugar-phosphate backbone forms the two outer rails of DNA.",
    "A gene is a specific region of DNA that carries biological instructions."
  ],
  bn:[
    "DNA ডাবল-হেলিক্স গঠনে জিনগত তথ্য সংরক্ষণ করে।",
    "A-এর সঙ্গে T এবং G-এর সঙ্গে C জোড়া বাঁধে।",
    "সুগার-ফসফেট ব্যাকবোন DNA-এর বাইরের দুটি রেল তৈরি করে।",
    "জিন হলো DNA-এর নির্দিষ্ট অঞ্চল, যেখানে জৈবিক নির্দেশনা থাকে।"
  ]
} as const;

const PAIRS=["AT","GC","TA","CG","AT","GC","CG","TA","AT","GC","TA","CG","GC","AT","CG","TA","AT","GC"] as const;

type HelixStyle=CSSProperties & {
  "--pair-y":string;
  "--pair-turn":string;
  "--pair-delay":string;
};

export default function CellZoomPreview({running,onFact}:Props){
  const[lang,setLang]=useState<"en"|"bn">("en");
  const[factIndex,setFactIndex]=useState(0);
  const[drag,setDrag]=useState(0);
  const dragStart=useRef<number|null>(null);
  const dragOrigin=useRef(0);

  useEffect(()=>{
    const sync=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);

  const pairs=useMemo(()=>PAIRS.map((pair,index)=>({
    pair,
    index,
    gene:index>=7&&index<=11,
    style:{
      "--pair-y":`${index*13-110}px`,
      "--pair-turn":`${index*34}deg`,
      "--pair-delay":`${-index*.09}s`
    } as HelixStyle
  })),[]);

  function showFact(){
    const next=(factIndex+1)%FACTS.en.length;
    setFactIndex(next);
    onFact?.(FACTS[lang][next]);
  }

  function pointerDown(event:React.PointerEvent<HTMLDivElement>){
    dragStart.current=event.clientX;
    dragOrigin.current=drag;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event:React.PointerEvent<HTMLDivElement>){
    if(dragStart.current===null)return;
    setDrag(dragOrigin.current+(event.clientX-dragStart.current)*.65);
  }

  function pointerUp(event:React.PointerEvent<HTMLDivElement>){
    dragStart.current=null;
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return <div className={`dna3d-preview ${running?"":"paused"}`} data-no-translate>
    <div className="dna3d-space" aria-hidden="true"/>
    <div className="dna3d-nucleus" aria-hidden="true"/>

    <div
      className="dna3d-stage"
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
      style={{"--drag-turn":`${drag}deg`} as CSSProperties}
      role="img"
      aria-label={lang==="bn"?"ঘূর্ণায়মান ত্রিমাত্রিক DNA ডাবল হেলিক্স":"Rotating three-dimensional DNA double helix"}
    >
      <div className="dna3d-helix">
        {pairs.map(({pair,index,gene,style})=><div
          key={index}
          className={`dna3d-pair ${gene?"gene":""}`}
          style={style}
        >
          <i className="dna3d-backbone left"/>
          <span className={`dna3d-base left base-${pair[0].toLowerCase()}`}>{pair[0]}</span>
          <b className="dna3d-bond"/>
          <span className={`dna3d-base right base-${pair[1].toLowerCase()}`}>{pair[1]}</span>
          <i className="dna3d-backbone right"/>
        </div>)}
      </div>
      <div className="dna3d-gene-bracket" aria-hidden="true"><span>{lang==="bn"?"জিন অঞ্চল":"GENE REGION"}</span></div>
    </div>

    <div className="dna3d-label">
      <small>{lang==="bn"?"আণবিক দৃশ্য":"Molecular view"}</small>
      <strong>{lang==="bn"?"DNA ডাবল হেলিক্স":"DNA Double Helix"}</strong>
    </div>

    <button type="button" className="dna3d-fact" onClick={showFact}>
      {lang==="bn"?"তথ্যের জন্য চাপ দিন":"Tap for a fact"}
    </button>
    <span className="dna3d-drag-hint">{lang==="bn"?"ঘোরাতে টানুন":"Drag to rotate"}</span>
  </div>;
}
