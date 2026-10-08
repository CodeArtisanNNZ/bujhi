"use client";

import {useEffect,useState} from "react";
import styles from "./tracker.module.css";

type Props={chapter:number;lessonNames:string[]};
export default function BgsLessonTracker({chapter,lessonNames}:Props) {
  const [done,setDone]=useState<number[]>([]);
  const [loaded,setLoaded]=useState(false);
  const key="bujhi-bgs8-chapter-"+chapter+"-progress";
  useEffect(()=>{
    try {
      const stored=JSON.parse(localStorage.getItem(key)||"[]");
      if(Array.isArray(stored))setDone(stored.filter((index:unknown)=>Number.isInteger(index)&&Number(index)>=0&&Number(index)<lessonNames.length));
    } catch {/* Storage may be unavailable. */}
    setLoaded(true);
  },[key,lessonNames.length]);
  function update(index:number,checked:boolean) {
    const value=checked?[...new Set([...done,index])]:done.filter(n=>n!==index);
    setDone(value);
    try{localStorage.setItem(key,JSON.stringify(value));}catch{/* Keep session-only progress. */}
  }
  return <section className={styles.tracker} aria-label="আমার অধ্যায় অগ্রগতি">
    <div className={styles.heading}>
      <div><p className={styles.kicker}>আমার অগ্রগতি</p><h2>যতটুকু শিখেছ, চিহ্ন দাও</h2></div>
      <strong aria-live="polite">{loaded?done.length.toLocaleString("bn-BD"):"–"} / {lessonNames.length.toLocaleString("bn-BD")} ধাপ</strong>
    </div>
    <progress value={loaded?done.length:0} max={lessonNames.length} aria-label="সম্পন্ন ধাপ"/>
    <div className={styles.checks}>
      {lessonNames.map((name,i)=><label key={name}>
        <input type="checkbox" checked={done.includes(i)} onChange={event=>update(i,event.target.checked)} disabled={!loaded}/>
        <span>{name} — আমি নিজে কাজটি করেছি</span>
      </label>)}
    </div>
    <p className={styles.note}>এটি তোমার নিজের চেকলিস্ট; স্বয়ংক্রিয় পরীক্ষার ফল নয়। একই ব্রাউজারে অগ্রগতি সংরক্ষিত থাকে।</p>
  </section>;
}
