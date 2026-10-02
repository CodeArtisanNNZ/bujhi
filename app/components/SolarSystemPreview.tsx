"use client";

/*
Adapted for Bujhi from the MIT-licensed project:
https://github.com/solarsystemjs/solarsystemjs.github.io

MIT License
Copyright (c) 2025-2026 Valentyn Kolesnikov <0009-0003-9608-3364@orcid.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
*/

import {useEffect,useRef,useState} from "react";

type Planet={
  name:string;
  bn:string;
  orbit:number;
  period:number;
  size:number;
  light:string;
  color:string;
  dark:string;
  factEn:string;
  factBn:string;
  rings?:boolean;
  moon?:boolean;
  bands?:boolean;
};

const PLANETS:Planet[]=[
  {name:"Mercury",bn:"বুধ",orbit:.14,period:88,size:2.5,light:"#d9d2c8",color:"#8c867e",dark:"#4f4a45",factEn:"Mercury completes one orbit in only 88 Earth days.",factBn:"বুধ মাত্র ৮৮ পৃথিবী দিনে সূর্যকে একবার প্রদক্ষিণ করে।"},
  {name:"Venus",bn:"শুক্র",orbit:.19,period:224.7,size:3.7,light:"#fff0bd",color:"#d9aa67",dark:"#8b6236",factEn:"Venus is the hottest planet because its dense atmosphere traps heat.",factBn:"ঘন বায়ুমণ্ডল তাপ আটকে রাখায় শুক্র সৌরজগতের সবচেয়ে উষ্ণ গ্রহ।"},
  {name:"Earth",bn:"পৃথিবী",orbit:.25,period:365.25,size:4,light:"#bfe9ff",color:"#2d87c8",dark:"#153e73",factEn:"Earth takes about 365.25 days to orbit the Sun.",factBn:"পৃথিবী সূর্যকে একবার প্রদক্ষিণ করতে প্রায় ৩৬৫.২৫ দিন সময় নেয়।",moon:true},
  {name:"Mars",bn:"মঙ্গল",orbit:.31,period:687,size:3.2,light:"#f5a06a",color:"#b84f2f",dark:"#6c251f",factEn:"Mars appears red because iron minerals on its surface have oxidized.",factBn:"পৃষ্ঠের লৌহ খনিজ জারিত হওয়ায় মঙ্গলকে লালচে দেখায়।"},
  {name:"Jupiter",bn:"বৃহস্পতি",orbit:.39,period:4333,size:7.6,light:"#f0d1a1",color:"#bd8a63",dark:"#6d4a3a",factEn:"Jupiter is the largest planet in the Solar System.",factBn:"বৃহস্পতি সৌরজগতের সবচেয়ে বড় গ্রহ।",bands:true},
  {name:"Saturn",bn:"শনি",orbit:.47,period:10759,size:6.7,light:"#fff0b0",color:"#d3b16d",dark:"#79613b",factEn:"Saturn's rings are made mostly of ice particles with some rock and dust.",factBn:"শনির বলয় মূলত বরফের কণা, সঙ্গে কিছু শিলা ও ধূলিকণা দিয়ে তৈরি।",rings:true},
  {name:"Uranus",bn:"ইউরেনাস",orbit:.55,period:30687,size:5.1,light:"#d3ffff",color:"#74c9cc",dark:"#357f85",factEn:"Uranus rotates with an extreme tilt, almost on its side.",factBn:"ইউরেনাসের অক্ষ এত বেশি হেলানো যে গ্রহটি প্রায় পাশ ফিরে ঘোরে।"},
  {name:"Neptune",bn:"নেপচুন",orbit:.63,period:60190,size:4.9,light:"#9fc1ff",color:"#3c64cf",dark:"#1f2e7c",factEn:"Neptune has some of the fastest winds measured in the Solar System.",factBn:"নেপচুনে সৌরজগতের সবচেয়ে দ্রুতগতির কিছু বায়ুপ্রবাহ দেখা যায়।"}
];

type Props={running:boolean;onFact:(text:string)=>void};

export default function SolarSystemPreview({running,onFact}:Props){
  const canvasRef=useRef<HTMLCanvasElement|null>(null);
  const positionsRef=useRef<Array<{x:number;y:number;r:number}>>([]);
  const anglesRef=useRef(PLANETS.map((_,i)=>i*.72+.25));
  const lastTimeRef=useRef<number|null>(null);
  const frameRef=useRef<number|null>(null);
  const[hovered,setHovered]=useState<number|null>(null);
  const[selected,setSelected]=useState(2);
  const[lang,setLang]=useState<"en"|"bn">("en");

  useEffect(()=>{
    const sync=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    const ctx=canvas.getContext("2d");
    if(!ctx)return;

    let width=1,height=1,dpr=1;
    const stars=Array.from({length:95},(_,i)=>{
      const a=Math.sin((i+1)*12.9898)*43758.5453;
      const b=Math.sin((i+1)*78.233)*24634.6345;
      const c=Math.sin((i+1)*39.425)*9513.778;
      return{
        x:a-Math.floor(a),
        y:b-Math.floor(b),
        r:.35+(c-Math.floor(c))*1.2,
        phase:(i%17)/17*Math.PI*2
      };
    });

    function resize(){
      const rect=canvas.getBoundingClientRect();
      width=Math.max(1,rect.width);
      height=Math.max(1,rect.height);
      dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(width*dpr);
      canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function planetSphere(x:number,y:number,r:number,p:Planet){
      const grad=ctx.createRadialGradient(x-r*.38,y-r*.42,r*.12,x,y,r);
      grad.addColorStop(0,p.light);
      grad.addColorStop(.5,p.color);
      grad.addColorStop(1,p.dark);
      ctx.save();
      ctx.shadowColor=p.light;
      ctx.shadowBlur=Math.max(2,r*.75);
      ctx.fillStyle=grad;
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fill();
      ctx.shadowBlur=0;

      if(p.bands){
        ctx.save();
        ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();
        ctx.globalAlpha=.5;
        for(let i=-2;i<=2;i++){
          ctx.strokeStyle=i%2===0?"#7d5140":"#f0c899";
          ctx.lineWidth=Math.max(.6,r*.16);
          ctx.beginPath();
          ctx.moveTo(x-r,y+i*r*.28);
          ctx.lineTo(x+r,y+i*r*.28);
          ctx.stroke();
        }
        ctx.fillStyle="#9e3d28";
        ctx.beginPath();
        ctx.ellipse(x+r*.35,y+r*.16,r*.22,r*.1,-.2,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
      }

      if(p.name==="Earth"){
        ctx.fillStyle="#4f9f67";
        ctx.beginPath();
        ctx.ellipse(x-r*.2,y-r*.08,r*.28,r*.16,-.5,0,Math.PI*2);
        ctx.ellipse(x+r*.18,y+r*.16,r*.19,r*.11,.4,0,Math.PI*2);
        ctx.fill();
      }

      if(p.name==="Mars"){
        ctx.fillStyle="#7c3226";
        ctx.globalAlpha=.65;
        ctx.beginPath();
        ctx.arc(x-r*.18,y-r*.1,r*.16,0,Math.PI*2);
        ctx.arc(x+r*.22,y+r*.2,r*.12,0,Math.PI*2);
        ctx.fill();
        ctx.globalAlpha=1;
      }
      ctx.restore();
    }

    function ringedPlanet(x:number,y:number,r:number,p:Planet){
      ctx.save();
      ctx.translate(x,y);
      ctx.rotate(-.18);
      ctx.strokeStyle="rgba(232,213,160,.72)";
      ctx.lineWidth=Math.max(1,r*.22);
      ctx.beginPath();
      ctx.ellipse(0,0,r*1.75,r*.56,0,0,Math.PI*2);
      ctx.stroke();
      ctx.strokeStyle="rgba(160,132,86,.55)";
      ctx.lineWidth=Math.max(.7,r*.09);
      ctx.beginPath();
      ctx.ellipse(0,0,r*1.45,r*.44,0,0,Math.PI*2);
      ctx.stroke();
      ctx.restore();
      planetSphere(x,y,r,p);
    }

    function draw(now:number){
      if(!ctx)return;
      if(lastTimeRef.current===null)lastTimeRef.current=now;
      const dt=Math.min(50,now-lastTimeRef.current)/1000;
      lastTimeRef.current=now;

      if(running){
        PLANETS.forEach((p,i)=>{
          const visualPeriod=25*Math.pow(p.period/365.25,.58);
          anglesRef.current[i]=(anglesRef.current[i]+dt*(Math.PI*2/visualPeriod))%(Math.PI*2);
        });
      }

      ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,width,height);

      const bg=ctx.createRadialGradient(width*.5,height*.48,5,width*.5,height*.48,Math.max(width,height)*.72);
      bg.addColorStop(0,"#241c25");
      bg.addColorStop(.45,"#10101b");
      bg.addColorStop(1,"#05060d");
      ctx.fillStyle=bg;
      ctx.fillRect(0,0,width,height);

      const nebula=ctx.createRadialGradient(width*.7,height*.18,0,width*.7,height*.18,width*.55);
      nebula.addColorStop(0,"rgba(96,49,82,.18)");
      nebula.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=nebula;ctx.fillRect(0,0,width,height);

      for(const s of stars){
        const tw=.42+.58*(.5+.5*Math.sin(now*.0013+s.phase));
        ctx.globalAlpha=tw;
        ctx.fillStyle="#fff8ef";
        ctx.beginPath();
        ctx.arc(s.x*width,s.y*height,s.r,0,Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha=1;

      const cx=width*.52,cy=height*.51;
      const base=Math.min(width,height)*.72;

      ctx.save();
      ctx.lineWidth=.65;
      PLANETS.forEach(p=>{
        const rx=base*p.orbit;
        ctx.strokeStyle="rgba(235,220,205,.16)";
        ctx.beginPath();
        ctx.ellipse(cx,cy,rx,rx*.48,-.05,0,Math.PI*2);
        ctx.stroke();
      });
      ctx.restore();

      const corona=ctx.createRadialGradient(cx,cy,1,cx,cy,31);
      corona.addColorStop(0,"rgba(255,248,196,1)");
      corona.addColorStop(.24,"rgba(255,198,58,.98)");
      corona.addColorStop(.58,"rgba(255,130,19,.46)");
      corona.addColorStop(1,"rgba(255,118,0,0)");
      ctx.fillStyle=corona;ctx.beginPath();ctx.arc(cx,cy,31,0,Math.PI*2);ctx.fill();

      const sunGrad=ctx.createRadialGradient(cx-5,cy-6,2,cx,cy,18);
      sunGrad.addColorStop(0,"#fff9c8");
      sunGrad.addColorStop(.38,"#ffd54b");
      sunGrad.addColorStop(.78,"#ff9d12");
      sunGrad.addColorStop(1,"#cf5c09");
      ctx.fillStyle=sunGrad;ctx.beginPath();ctx.arc(cx,cy,15,0,Math.PI*2);ctx.fill();

      const positions:Array<{x:number;y:number;r:number}>=[];
      PLANETS.forEach((p,i)=>{
        const rx=base*p.orbit;
        const angle=anglesRef.current[i];
        const x=cx+Math.cos(angle)*rx;
        const y=cy+Math.sin(angle)*rx*.48;
        const size=Math.max(2,p.size*(base/170));
        positions.push({x,y,r:size});
        if(p.rings)ringedPlanet(x,y,size,p); else planetSphere(x,y,size,p);

        if(p.moon){
          const moonA=now*.0018;
          const moonR=size*2.2;
          ctx.fillStyle="#d7d6d2";
          ctx.beginPath();
          ctx.arc(x+Math.cos(moonA)*moonR,y+Math.sin(moonA)*moonR*.55,Math.max(1,size*.24),0,Math.PI*2);
          ctx.fill();
        }

        const isHot=hovered===i||selected===i;
        if(isHot){
          ctx.strokeStyle="rgba(255,221,153,.88)";
          ctx.lineWidth=1;
          ctx.beginPath();ctx.arc(x,y,size+4,0,Math.PI*2);ctx.stroke();
        }

        if(width>270&&(isHot||i===2||i===4||i===5)){
          ctx.font="600 8px system-ui, sans-serif";
          ctx.fillStyle="rgba(255,247,237,.82)";
          ctx.textAlign="center";
          ctx.fillText(lang==="bn"?p.bn:p.name,x,y-size-7);
        }
      });
      positionsRef.current=positions;

      frameRef.current=requestAnimationFrame(draw);
    }

    resize();
    const ro=new ResizeObserver(resize);ro.observe(canvas);
    frameRef.current=requestAnimationFrame(draw);
    return()=>{
      ro.disconnect();
      if(frameRef.current!==null)cancelAnimationFrame(frameRef.current);
      lastTimeRef.current=null;
    };
  },[running,hovered,selected,lang]);

  function hitFromEvent(e:React.PointerEvent<HTMLCanvasElement>){
    const rect=e.currentTarget.getBoundingClientRect();
    const x=e.clientX-rect.left,y=e.clientY-rect.top;
    let hit:number|null=null;
    let best=Infinity;
    positionsRef.current.forEach((p,i)=>{
      const d=Math.hypot(x-p.x,y-p.y);
      if(d<p.r+9&&d<best){best=d;hit=i}
    });
    return hit;
  }

  function onMove(e:React.PointerEvent<HTMLCanvasElement>){
    setHovered(hitFromEvent(e));
  }

  function onClick(e:React.PointerEvent<HTMLCanvasElement>){
    const hit=hitFromEvent(e);
    if(hit===null)return;
    setSelected(hit);
    const p=PLANETS[hit];
    onFact(lang==="bn"?p.factBn:p.factEn);
  }

  const active=PLANETS[hovered??selected];

  return <div className="solar-real" data-no-translate>
    <canvas
      ref={canvasRef}
      className="solar-real-canvas"
      aria-label={lang==="bn"?"আটটি গ্রহসহ সৌরজগতের অ্যানিমেশন":"Animated Solar System with all eight planets"}
      onPointerMove={onMove}
      onPointerLeave={()=>setHovered(null)}
      onPointerDown={onClick}
    />
    <div className="solar-real-label">
      <small>{lang==="bn"?"নির্বাচিত গ্রহ":"Selected planet"}</small>
      <strong>{lang==="bn"?active.bn:active.name}</strong>
    </div>
    <span className="solar-real-hint">{lang==="bn"?"তথ্যের জন্য গ্রহে চাপ দিন":"Tap a planet for a fact"}</span>
  </div>;
}
