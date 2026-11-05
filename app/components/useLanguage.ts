"use client";
import {useSyncExternalStore} from "react";
export type Language="en"|"bn";
export function currentLanguage():Language{return typeof document!=="undefined"&&document.documentElement.lang==="bn"?"bn":"en";}
function subscribe(notify:()=>void){
 const observer=new MutationObserver(notify);
 observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
 window.addEventListener("bujhi-language-changed",notify);
 return()=>{observer.disconnect();window.removeEventListener("bujhi-language-changed",notify);};
}
export function useLanguage(){return useSyncExternalStore(subscribe,currentLanguage,():Language=>"en");}
