"use client";

import {useEffect,useRef,useState} from "react";
import {X} from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import styles from "./mascot-greeting.module.css";

export default function BujhiMascotButton({bangla}:{bangla:boolean}){
  const [open,setOpen]=useState(false);
  const wrapper=useRef<HTMLDivElement>(null),button=useRef<HTMLButtonElement>(null);
  function close(){setOpen(false);button.current?.focus();}
  useEffect(()=>{
    if(!open)return;
    const outside=(event:PointerEvent)=>{if(event.target instanceof Node&&!wrapper.current?.contains(event.target))setOpen(false);};
    const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);button.current?.focus();}};
    document.addEventListener("pointerdown",outside);
    document.addEventListener("keydown",escape);
    return()=>{document.removeEventListener("pointerdown",outside);document.removeEventListener("keydown",escape);};
  },[open]);
  return <div ref={wrapper} className={styles.wrapper} data-no-translate>
    {open&&<div id="bujhi-greeting" className={styles.bubble}>
      <p role="status">{bangla?"হাই, আমি বুঝি, তোমার পড়ার সঙ্গী।":"Hi, I’m Bujhi, your study buddy."}</p>
      <button type="button" className={styles.close} onClick={close} aria-label={bangla?"বুঝির বার্তা বন্ধ করো":"Close Bujhi’s message"}><X size={15}/></button>
    </div>}
    <button ref={button} type="button" className={styles.mascot} onClick={()=>setOpen(value=>!value)}
      aria-label={bangla?"বুঝিকে হ্যালো বলো":"Say hello to Bujhi"} aria-expanded={open} aria-controls="bujhi-greeting">
      <ResponsiveImage src="/mascot/bujhi-pointer-640.webp" srcSet="/mascot/bujhi-pointer-320.webp 320w, /mascot/bujhi-pointer-640.webp 640w"
        sizes="(max-width: 650px) 100px, (max-width: 1150px) 15vw, 225px" width={640} height={780} alt="" loading="eager"/>
    </button>
  </div>;
}
