"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {createContext,useContext,useEffect,useState} from "react";
import {Menu,X,Sun,Moon} from "lucide-react";
import LanguageToggle from "./LanguageToggle";
type Theme="light"|"dark";
const ThemeContext=createContext({theme:"light" as Theme,toggleTheme:()=>{}});
export const useTheme=()=>useContext(ThemeContext);
export default function SiteShell({children}:{children:React.ReactNode}){
 const [theme,setTheme]=useState<Theme>("light");
 const [open,setOpen]=useState(false);
 const [role,setRole]=useState<string|null>(null);
 const [lang,setLang]=useState("en");
 const path=usePathname();
 useEffect(()=>{
  setTheme(document.documentElement.dataset.theme==="dark"?"dark":"light");
  const language=()=>setLang(document.documentElement.lang);
  language();
  const observer=new MutationObserver(language);
  observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  const sync=(event:StorageEvent)=>{if(event.key==="bujhi-theme"&&(event.newValue==="dark"||event.newValue==="light")){setTheme(event.newValue);document.documentElement.dataset.theme=event.newValue}};
  window.addEventListener("storage",sync);
  return()=>{observer.disconnect();window.removeEventListener("storage",sync)};
 },[]);
 useEffect(()=>{
  setOpen(false);
  const controller=new AbortController();
  fetch("/api/me",{signal:controller.signal,cache:"no-store"}).then(r=>r.ok?r.json():null).then(data=>setRole(data?.profile?.role||data?.user?.role||data?.role||null)).catch(()=>{});
  return()=>controller.abort();
 },[path]);
 useEffect(()=>{
  const syncFrames=()=>{document.querySelectorAll("iframe").forEach(frame=>{try{if(frame.hasAttribute("srcdoc")||new URL(frame.src,location.href).origin===location.origin)frame.contentWindow?.postMessage({type:"bujhi-theme",theme:document.documentElement.dataset.theme},"*")}catch{}})};
  const observer=new MutationObserver(syncFrames);observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  document.addEventListener("load",syncFrames,true);syncFrames();
  return()=>{observer.disconnect();document.removeEventListener("load",syncFrames,true)};
 },[]);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
 function toggleTheme(){const next=theme==="dark"?"light":"dark";setTheme(next);document.documentElement.dataset.theme=next;try{localStorage.setItem("bujhi-theme",next)}catch{};window.dispatchEvent(new Event("bujhi-theme-change"));}
 const bn=lang==="bn";
 const links=[{href:"/",label:bn?"হোম":"Home"},{href:"/about",label:bn?"আমাদের সম্পর্কে":"About Us"},{href:"/register",label:bn?"সাইন আপ":"Sign Up"},{href:"/login",label:bn?"লগইন":"Login"},...(role==="teacher"?[{href:"/teacher-dashboard",label:bn?"শিক্ষকের ডেস্ক":"Teacher Desk"}]:role==="student"?[{href:"/student-dashboard",label:bn?"শিক্ষার্থীর ডেস্ক":"Student Desk"}]:[{href:"/login?role=student",label:bn?"শিক্ষার্থীর ডেস্ক":"Student Desk"},{href:"/login?role=teacher",label:bn?"শিক্ষকের ডেস্ক":"Teacher Desk"}])];
 return <ThemeContext.Provider value={{theme,toggleTheme}}><a className="skip-link" href="#bujhi-content">{bn?"মূল বিষয়বস্তুতে যাও":"Skip to content"}</a><header className="bujhi-nav" data-no-translate><div className="bujhi-nav-inner"><Link className="bujhi-brand" href="/" aria-label="Bujhi home"><img src="/optimized/bujhi-icon-96.webp" width="36" height="36" alt=""/>Bujhi</Link><nav id="bujhi-navigation" aria-label={bn?"প্রধান নেভিগেশন":"Main navigation"} className={open?"bujhi-links is-open":"bujhi-links"}>{links.map(link=><Link key={link.href} href={link.href} aria-current={path===link.href?"page":undefined}>{link.label}</Link>)}</nav><div className="bujhi-nav-actions"><LanguageToggle/><button className="theme-switch" onClick={toggleTheme} aria-label={bn?(theme==="dark"?"হালকা মোড চালু করো":"ডার্ক মোড চালু করো"):(theme==="dark"?"Switch to light mode":"Switch to dark mode")} aria-pressed={theme==="dark"}>{theme==="dark"?<Sun size={20}/>:<Moon size={20}/>}</button><button className="bujhi-menu" aria-label={bn?"নেভিগেশন মেনু":"Navigation menu"} aria-expanded={open} aria-controls="bujhi-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div></header><div id="bujhi-content">{children}</div></ThemeContext.Provider>
}
