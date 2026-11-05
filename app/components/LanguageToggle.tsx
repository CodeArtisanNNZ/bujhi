"use client";

import {useEffect,useRef,useState} from "react";
import {Languages} from "lucide-react";

type Lang="en"|"bn";

import {translate as translateDynamic} from "../i18n";

const textNodes=new WeakMap<Node,string>();
const attrValues=new WeakMap<Element,Map<string,string>>();
let applying=false;

function translateTextNode(node:Node,lang:Lang){
  if(node.parentElement?.closest("script,style,code,pre,textarea,[data-no-translate],[data-user-content]"))return;
  const current=node.nodeValue||"";
  let source=textNodes.get(node);
  const expected=source===undefined?undefined:translateDynamic(source,lang);
  if(source!==undefined&&current!==expected&&current!==source&&current!==translateDynamic(source,"en")&&current!==translateDynamic(source,"bn"))source=current;
  if(source===undefined)source=current;
  textNodes.set(node,source);
  const next=translateDynamic(source,lang);
  if(next!==current)node.nodeValue=next;
}

function translateAttributes(el:Element,lang:Lang){
  if(el.closest("script,style,code,pre,[data-no-translate],[data-user-content]"))return;
  const attrs=["placeholder","aria-label","aria-valuetext","title","alt"];
  let originals=attrValues.get(el);
  if(!originals){originals=new Map();attrValues.set(el,originals)}
  for(const attr of attrs){
    if(!el.hasAttribute(attr))continue;
    const current=el.getAttribute(attr)||"";
    let source=originals.get(attr);
    const expected=source===undefined?undefined:translateDynamic(source,lang);
    if(source!==undefined&&current!==expected&&current!==source&&current!==translateDynamic(source,"en")&&current!==translateDynamic(source,"bn"))source=current;
    if(source===undefined)source=current;
    originals.set(attr,source);
    const next=translateDynamic(source,lang);
    if(next!==current)el.setAttribute(attr,next);
  }
}

function translateTree(root:ParentNode,lang:Lang){
  applying=true;
  try{
    if(root instanceof Element)translateAttributes(root,lang);
    const walker=document.createTreeWalker(root as Node,NodeFilter.SHOW_TEXT);
    let node:Node|null;
    while((node=walker.nextNode()))translateTextNode(node,lang);
    if("querySelectorAll" in root)(root as ParentNode).querySelectorAll("*").forEach(el=>translateAttributes(el,lang));
  }finally{applying=false}
}

export default function LanguageToggle(){
  const[lang,setLang]=useState<Lang>("en");
  const langRef=useRef<Lang>("en");

  useEffect(()=>{
    let saved:Lang|null=null;try{saved=localStorage.getItem("bujhi-language") as Lang|null}catch{}
    const initial=saved==="bn"?"bn":"en";
    langRef.current=initial;
    setLang(initial);
    document.documentElement.lang=initial==="bn"?"bn":"en";
    translateTree(document.body,initial);
    window.dispatchEvent(new CustomEvent("bujhi-language-changed",{detail:{lang:initial}}));

    const observer=new MutationObserver(mutations=>{
      if(applying)return;
      for(const mutation of mutations){
        if(mutation.type==="characterData"){
          const node=mutation.target;
          const source=textNodes.get(node);
          const current=node.nodeValue||"";
          if(source!==undefined&&current===translateDynamic(source,langRef.current))continue;
          textNodes.set(node,current);
          translateTextNode(node,langRef.current);
        }else if(mutation.type==="attributes"&&mutation.target instanceof Element){
          translateAttributes(mutation.target,langRef.current);
        }else{
          mutation.addedNodes.forEach(node=>{
            if(node.nodeType===Node.TEXT_NODE){
              textNodes.set(node,node.nodeValue||"");
              translateTextNode(node,langRef.current);
            }else if(node instanceof Element){
              translateTree(node,langRef.current);
            }
          });
        }
      }
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:["placeholder","aria-label","aria-valuetext","title","alt"]});
    const syncStorage=(event:StorageEvent)=>{
      if(event.key!=="bujhi-language")return;
      const next:Lang=event.newValue==="bn"?"bn":"en";
      langRef.current=next;setLang(next);document.documentElement.lang=next;
      translateTree(document.body,next);
      window.dispatchEvent(new CustomEvent("bujhi-language-changed",{detail:{lang:next}}));
    };
    window.addEventListener("storage",syncStorage);
    return()=>{observer.disconnect();window.removeEventListener("storage",syncStorage);};
  },[]);

  function choose(next:Lang){
    langRef.current=next;
    setLang(next);
    try{localStorage.setItem("bujhi-language",next)}catch{}
    document.documentElement.lang=next==="bn"?"bn":"en";
    translateTree(document.body,next);
    window.dispatchEvent(new CustomEvent("bujhi-language-changed",{detail:{lang:next}}));
  }

  return <div className="language-toggle-wrap" data-no-translate>
    <div className="language-toggle" role="group" aria-label="Language">
      <Languages aria-hidden="true"/>
      <button type="button" className={lang==="en"?"active":""} onClick={()=>choose("en")}>EN</button>
      <span>/</span>
      <button type="button" className={lang==="bn"?"active":""} onClick={()=>choose("bn")}>বাংলা</button>
    </div>
  </div>;
}
