"use client";

import {useEffect,useState,type CSSProperties} from "react";
import {createPeekSchedule,PEEK_DURATION} from "./peekSchedule";
import styles from "./bujhi-peek.module.css";

function Eye(){
  return <g className={styles.blink}>
    <ellipse rx="55" ry="105" fill="#080808"/>
    <ellipse cx="17" cy="-39" rx="17" ry="24" fill="#fff"/>
    <circle cx="-9" cy="-10" r="7" fill="#fff"/>
  </g>;
}

function Paw({x,side}:{x:number;side:"left"|"right"}){
  return <g transform={`translate(${x} 381)`}>
    <g className={side==="left"?styles.leftHand:styles.rightHand}>
      <g className={side==="left"?styles.leftFade:styles.rightFade}>
        <path d="M-52 2C-55-19-31-36-3-36C26-36 49-18 52 3C55 24 30 39 0 39C-29 39-54 25-52 2Z" fill="url(#bujhi-peek-paw)" stroke="#111" strokeWidth="6.5" strokeLinejoin="round"/>
        <ellipse cx="-8" cy="-13" rx="31" ry="14" fill="#fff" opacity=".75"/>
      </g>
    </g>
  </g>;
}

export default function BujhiPeek(){
  const [visit,setVisit]=useState<{top:number}|null>(null);

  useEffect(()=>{
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const schedule=createPeekSchedule(
      ()=>setVisit({top:38+Math.random()*28}),
      ()=>setVisit(null),
      {
        now:()=>performance.now(),random:()=>Math.random(),
        setTimer:(callback,delay)=>window.setTimeout(callback,delay),
        clearTimer:timer=>window.clearTimeout(timer),
        canShow:()=>!document.querySelector('dialog[open],[aria-modal="true"],.modal,.bujhi-menu[aria-expanded="true"]')
          &&!document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')
      }
    );
    const sync=()=>{if(document.hidden||motion.matches)schedule.pause();else schedule.resume();};
    document.addEventListener("visibilitychange",sync);
    motion.addEventListener("change",sync);
    sync();
    return()=>{
      document.removeEventListener("visibilitychange",sync);
      motion.removeEventListener("change",sync);
      schedule.dispose();
    };
  },[]);

  if(!visit)return null;
  return <div className={styles.peek} style={{top:`${visit.top}%`,"--peek-duration":`${PEEK_DURATION}ms`} as CSSProperties} aria-hidden="true" data-no-translate data-bujhi-peek>
    <svg viewBox="0 0 300 780" width="300" height="780" focusable="false">
      <defs>
        <clipPath id="bujhi-peek-edge"><rect width="960" height="388"/></clipPath>
        <clipPath id="bujhi-peek-hands"><rect width="960" height="434"/></clipPath>
        <linearGradient id="bujhi-peek-paw" x1="0" y1="0" x2=".35" y2="1"><stop stopColor="#fff"/><stop offset=".7" stopColor="#fff"/><stop offset="1" stopColor="#e5e6ed"/></linearGradient>
      </defs>
      <g transform="translate(388 -90) rotate(90)">
        <g clipPath="url(#bujhi-peek-edge)">
          <g className={styles.lift}><g className={styles.tilt}>
            <svg x="200" y="105.02" width="560" height="286.98" viewBox="363 49 1323 678" overflow="visible">
              <image x="363" y="49" width="1323" height="678" href="/mascot/bujhi-peek-head.webp"/>
              <g className={styles.gaze}>
                <g transform="translate(856 570)"><Eye/></g>
                <g transform="translate(1200 570)"><Eye/></g>
              </g>
            </svg>
          </g></g>
        </g>
        <g clipPath="url(#bujhi-peek-hands)"><Paw x={244} side="left"/><Paw x={716} side="right"/></g>
      </g>
    </svg>
  </div>;
}
