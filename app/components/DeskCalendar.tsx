"use client";

import {useEffect,useState} from "react";

export default function DeskCalendar({className=""}:{className?:string}){
  const[now,setNow]=useState<Date|null>(null);
  const[lang,setLang]=useState<"en"|"bn">("en");

  useEffect(()=>{
    const syncLanguage=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    const syncTime=()=>setNow(new Date());
    syncLanguage();
    syncTime();
    const timer=window.setInterval(syncTime,60000);
    const observer=new MutationObserver(syncLanguage);
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
    return()=>{window.clearInterval(timer);observer.disconnect()};
  },[]);

  if(!now)return <div className={className} aria-hidden="true"/>;

  const locale=lang==="bn"?"bn-BD":"en-US";
  const month=now.toLocaleDateString(locale,{month:"long"});
  const weekday=now.toLocaleDateString(locale,{weekday:"long"});
  const year=now.toLocaleDateString(locale,{year:"numeric"});
  const day=now.toLocaleDateString(locale,{day:"numeric"});

  return <time className={className} dateTime={now.toISOString()}>
    <span className="deskCalendarRings" aria-hidden="true"><i/><i/></span>
    <span className="deskCalendarMonth">{month}</span>
    <strong className="deskCalendarDate">{day}</strong>
    <span className="deskCalendarWeekday">{weekday}</span>
    <small className="deskCalendarYear">{year}</small>
  </time>;
}
