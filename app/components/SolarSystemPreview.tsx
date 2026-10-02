"use client";

import {useEffect,useState} from "react";

type Planet={
  name:string;
  bn:string;
  orbit:number;
  duration:number;
  size:number;
  light:string;
  color:string;
  dark:string;
  factEn:string;
  factBn:string;
  rings?:boolean;
};

const PLANETS:Planet[]=[
  {name:"Mercury",bn:"বুধ",orbit:24,duration:7,size:7,light:"#e6ddd2",color:"#8c867e",dark:"#4f4a45",factEn:"Mercury completes one orbit in only 88 Earth days.",factBn:"বুধ মাত্র ৮৮ পৃথিবী দিনে সূর্যকে একবার প্রদক্ষিণ করে।"},
  {name:"Venus",bn:"শুক্র",orbit:33,duration:10,size:10,light:"#fff0bd",color:"#d9aa67",dark:"#8b6236",factEn:"Venus is the hottest planet because its dense atmosphere traps heat.",factBn:"ঘন বায়ুমণ্ডল তাপ আটকে রাখায় শুক্র সৌরজগতের সবচেয়ে উষ্ণ গ্রহ।"},
  {name:"Earth",bn:"পৃথিবী",orbit:43,duration:13,size:11,light:"#c9efff",color:"#2d87c8",dark:"#153e73",factEn:"Earth takes about 365.25 days to orbit the Sun.",factBn:"পৃথিবী সূর্যকে একবার প্রদক্ষিণ করতে প্রায় ৩৬৫.২৫ দিন সময় নেয়।"},
  {name:"Mars",bn:"মঙ্গল",orbit:53,duration:17,size:9,light:"#f5a06a",color:"#b84f2f",dark:"#6c251f",factEn:"Mars appears red because iron minerals on its surface have oxidized.",factBn:"পৃষ্ঠের লৌহ খনিজ জারিত হওয়ায় মঙ্গলকে লালচে দেখায়।"},
  {name:"Jupiter",bn:"বৃহস্পতি",orbit:64,duration:24,size:19,light:"#f0d1a1",color:"#bd8a63",dark:"#6d4a3a",factEn:"Jupiter is the largest planet in the Solar System.",factBn:"বৃহস্পতি সৌরজগতের সবচেয়ে বড় গ্রহ।"},
  {name:"Saturn",bn:"শনি",orbit:75,duration:31,size:17,light:"#fff0b0",color:"#d3b16d",dark:"#79613b",factEn:"Saturn's rings are made mostly of ice particles with some rock and dust.",factBn:"শনির বলয় মূলত বরফের কণা, সঙ্গে কিছু শিলা ও ধূলিকণা দিয়ে তৈরি।",rings:true},
  {name:"Uranus",bn:"ইউরেনাস",orbit:86,duration:38,size:14,light:"#d3ffff",color:"#74c9cc",dark:"#357f85",factEn:"Uranus rotates with an extreme tilt, almost on its side.",factBn:"ইউরেনাসের অক্ষ এত বেশি হেলানো যে গ্রহটি প্রায় পাশ ফিরে ঘোরে।"},
  {name:"Neptune",bn:"নেপচুন",orbit:96,duration:45,size:14,light:"#9fc1ff",color:"#3c64cf",dark:"#1f2e7c",factEn:"Neptune has some of the fastest winds measured in the Solar System.",factBn:"নেপচুনে সৌরজগতের সবচেয়ে দ্রুতগতির কিছু বায়ুপ্রবাহ দেখা যায়।"}
];

type Props={running:boolean;onFact:(text:string)=>void};

export default function SolarSystemPreview({running,onFact}:Props){
  const[selected,setSelected]=useState(2);
  const[lang,setLang]=useState<"en"|"bn">("en");

  useEffect(()=>{
    const sync=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);

  function choosePlanet(index:number){
    setSelected(index);
    const planet=PLANETS[index];
    onFact(lang==="bn"?planet.factBn:planet.factEn);
  }

  const active=PLANETS[selected];

  return <div className="solar-real" data-no-translate>
    <div className="solar-star-field" aria-hidden="true"/>
    <div className="solar-sun-real" aria-hidden="true"/>

    {PLANETS.map((planet,index)=><div
      key={planet.name}
      className="solar-orbit-real"
      style={{
        width:`${planet.orbit}%`,
        height:`${planet.orbit*0.48}%`,
        animationDuration:`${planet.duration}s`,
        animationDelay:`-${index*1.37}s`,
        animationPlayState:running?"running":"paused"
      }}
      aria-hidden="true"
    >
      <button
        type="button"
        className={`solar-planet-real ${planet.rings?"has-rings":""} ${selected===index?"selected":""}`}
        style={{
          width:`${planet.size}px`,
          height:`${planet.size}px`,
          background:`radial-gradient(circle at 32% 28%, ${planet.light} 0 16%, ${planet.color} 48%, ${planet.dark} 100%)`
        }}
        onClick={()=>choosePlanet(index)}
        aria-label={lang==="bn"?`${planet.bn} সম্পর্কে জানো`:`Learn about ${planet.name}`}
        title={lang==="bn"?planet.bn:planet.name}
      />
    </div>)}

    <div className="solar-real-label">
      <small>{lang==="bn"?"নির্বাচিত গ্রহ":"Selected planet"}</small>
      <strong>{lang==="bn"?active.bn:active.name}</strong>
    </div>
    <span className="solar-real-hint">{lang==="bn"?"তথ্যের জন্য গ্রহে চাপ দিন":"Tap a planet for a fact"}</span>
  </div>;
}
