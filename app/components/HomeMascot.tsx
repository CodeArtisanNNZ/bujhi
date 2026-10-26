"use client";
import {useLayoutEffect,useRef} from "react";
import BujhiMascotButton from "./BujhiMascotButton";
import styles from "../home.module.css";

// Normalized silhouette landmarks in the pointer artwork, including its outline.
const HEAD_EDGE=.617,POINTER_EDGE=.869;
export default function HomeMascot({bangla}:{bangla:boolean}){
  const wrapper=useRef<HTMLDivElement>(null);
  useLayoutEffect(()=>{
    const mascot=wrapper.current,stage=mascot?.closest("section");
    const notebook=stage?.querySelector<HTMLElement>(".notebook"),screen=stage?.querySelector<HTMLElement>(".lesson");
    if(!mascot||!stage||!notebook||!screen)return;
    const place=()=>{
      mascot.style.removeProperty("width");mascot.style.removeProperty("left");
      if(window.innerWidth<=650)return;
      const room=stage.getBoundingClientRect(),book=notebook.getBoundingClientRect(),content=screen.getBoundingClientRect();
      const wanted=mascot.getBoundingClientRect().width;
      const width=Math.min(wanted,Math.max(80,(content.left-book.left-10)/(POINTER_EDGE-HEAD_EDGE)));
      mascot.style.width=width+"px";
      mascot.style.left=(book.left-room.left-width*HEAD_EDGE)+"px";
    };
    const observer=new ResizeObserver(place);observer.observe(stage);observer.observe(notebook);observer.observe(screen);
    window.addEventListener("resize",place);place();
    return()=>{observer.disconnect();window.removeEventListener("resize",place);};
  },[]);
  return <div ref={wrapper} className={styles.heroMascot} data-home-mascot data-head-edge={HEAD_EDGE} data-pointer-edge={POINTER_EDGE}><BujhiMascotButton bangla={bangla}/></div>;
}
