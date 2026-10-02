"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {createContext,useContext,useEffect,useRef,useState} from "react";
import {Menu,X,Sun,Moon} from "lucide-react";
import LanguageToggle from "./LanguageToggle";

type Theme="light"|"dark";
type Role="student"|"teacher";
const ThemeContext=createContext({theme:"light" as Theme,toggleTheme:()=>{}});
export const useTheme=()=>useContext(ThemeContext);

export default function SiteShell({children}:{children:React.ReactNode}){
  const [theme,setTheme]=useState<Theme>("light");
  const [open,setOpen]=useState(false);
  const [role,setRole]=useState<Role|null>(null);
  const [lang,setLang]=useState("en");
  const menuButton=useRef<HTMLButtonElement>(null);
  const header=useRef<HTMLElement>(null);
  const path=usePathname();

  useEffect(()=>{
    const syncTheme=()=>setTheme(document.documentElement.dataset.theme==="dark"?"dark":"light");
    const syncLanguage=()=>setLang(document.documentElement.lang);
    syncTheme();
    syncLanguage();
    const observer=new MutationObserver(()=>{syncTheme();syncLanguage()});
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang","data-theme"]});
    const storage=(event:StorageEvent)=>{
      if(event.key==="bujhi-theme"){
        const preference=event.newValue;
        document.documentElement.dataset.theme=preference==="light"||preference==="dark"
          ?preference:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
      }
    };
    const media=matchMedia("(prefers-color-scheme: dark)");
    const systemTheme=()=>{
      try{if(localStorage.getItem("bujhi-theme"))return}catch{}
      document.documentElement.dataset.theme=media.matches?"dark":"light";
    };
    window.addEventListener("storage",storage);
    media.addEventListener("change",systemTheme);
    return()=>{observer.disconnect();window.removeEventListener("storage",storage);media.removeEventListener("change",systemTheme)};
  },[]);

  useEffect(()=>{
    setOpen(false);
    const controller=new AbortController();
    fetch("/api/me",{signal:controller.signal,cache:"no-store"})
      .then(response=>response.ok?response.json():null)
      .then(data=>setRole(data?.profile?.role==="teacher"?"teacher":data?.profile?.role==="student"?"student":null))
      .catch(()=>{});
    return()=>controller.abort();
  },[path]);

  useEffect(()=>{
    const syncFrames=()=>{
      document.querySelectorAll("iframe").forEach(frame=>{
        try{
          const sameOrigin=new URL(frame.src||location.href,location.href).origin===location.origin;
          if(frame.hasAttribute("srcdoc")||sameOrigin){
            frame.contentWindow?.postMessage({type:"bujhi-theme",theme:document.documentElement.dataset.theme},frame.hasAttribute("srcdoc")?"*":location.origin);
          }
        }catch{}
      });
    };
    const observer=new MutationObserver(syncFrames);
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
    document.addEventListener("load",syncFrames,true);
    syncFrames();
    return()=>{observer.disconnect();document.removeEventListener("load",syncFrames,true)};
  },[]);

  useEffect(()=>{
    if(!open)return;
    const close=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){setOpen(false);menuButton.current?.focus()}
    };
    const outside=(event:PointerEvent)=>{
      if(event.target instanceof Node&&!header.current?.contains(event.target))setOpen(false);
    };
    window.addEventListener("keydown",close);
    window.addEventListener("pointerdown",outside);
    return()=>{window.removeEventListener("keydown",close);window.removeEventListener("pointerdown",outside)};
  },[open]);

  function toggleTheme(){
    const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=next;
    setTheme(next);
    try{localStorage.setItem("bujhi-theme",next)}catch{}
  }

  const bn=lang==="bn";
  const links=[
    {href:"/",label:bn?"হোম":"Home"},
    {href:"/about",label:bn?"আমাদের সম্পর্কে":"About Us"},
    {href:"/register",label:bn?"সাইন আপ":"Sign Up"},
    {href:"/login",label:bn?"লগইন":"Login"},
    ...(role==="teacher"?[{href:"/teacher-dashboard",label:bn?"শিক্ষকের ডেস্ক":"Teacher Desk"}]
      :role==="student"?[{href:"/student-dashboard",label:bn?"শিক্ষার্থীর ডেস্ক":"Student Desk"}]
      :[{href:"/login?role=student",label:bn?"শিক্ষার্থীর ডেস্ক":"Student Desk"},{href:"/login?role=teacher",label:bn?"শিক্ষকের ডেস্ক":"Teacher Desk"}])
  ];

  return <ThemeContext.Provider value={{theme,toggleTheme}}>
    <a className="skip-link" href="#bujhi-content">{bn?"মূল বিষয়বস্তুতে যাও":"Skip to content"}</a>
    <header ref={header} className="bujhi-nav" data-no-translate>
      <div className="bujhi-nav-inner">
        <Link className="bujhi-brand" href="/" aria-label="Bujhi? home"><img src="/optimized/bujhi-icon-96.webp" width="36" height="36" alt=""/>Bujhi?</Link>
        <nav id="bujhi-navigation" aria-label={bn?"প্রধান নেভিগেশন":"Main navigation"} className={open?"bujhi-links is-open":"bujhi-links"}>
          {links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} aria-current={path===link.href||(path==="/signup"&&link.href==="/register")?"page":undefined}>{link.label}</Link>)}
        </nav>
        <div className="bujhi-nav-actions">
          <LanguageToggle/>
          <button type="button" className="theme-switch" onClick={toggleTheme} aria-label={bn?(theme==="dark"?"হালকা মোড চালু করো":"ডার্ক মোড চালু করো"):(theme==="dark"?"Switch to light mode":"Switch to dark mode")} aria-pressed={theme==="dark"}>{theme==="dark"?<Sun size={20}/>:<Moon size={20}/>}</button>
          <button ref={menuButton} type="button" className="bujhi-menu" aria-label={bn?"নেভিগেশন মেনু":"Navigation menu"} aria-expanded={open} aria-controls="bujhi-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
        </div>
      </div>
    </header>
    <div id="bujhi-content" tabIndex={-1}>{children}</div>
  </ThemeContext.Provider>;
}
