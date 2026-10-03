"use client";

import {useEffect,useMemo,useState} from "react";

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

  const days=useMemo(()=>{
    if(!now)return [] as Array<number|null>;
    const year=now.getFullYear();
    const month=now.getMonth();
    const firstDay=new Date(year,month,1).getDay();
    const daysInMonth=new Date(year,month+1,0).getDate();
    return [
      ...Array.from({length:firstDay},()=>null),
      ...Array.from({length:daysInMonth},(_,i)=>i+1)
    ];
  },[now]);

  if(!now)return <div className={className} aria-hidden="true"/>;

  const locale=lang==="bn"?"bn-BD":"en-US";
  const month=now.toLocaleDateString(locale,{month:"long"});
  const year=now.toLocaleDateString(locale,{year:"numeric"});
  const weekdayLabels=lang==="bn"
    ?["র","সো","ম","বু","বৃ","শু","শ"]
    :["S","M","T","W","T","F","S"];
  const today=now.getDate();

  const number=(value:number)=>lang==="bn"
    ?value.toLocaleString("bn-BD",{useGrouping:false})
    :String(value);

  return <section className={className} aria-label={lang==="bn"?"চলতি মাসের ক্যালেন্ডার":"Current month calendar"}>
    <span className="deskCalendarRings" aria-hidden="true"><i/><i/></span>
    <header className="deskCalendarHeader">
      <strong>{month}</strong>
      <small>{year}</small>
    </header>
    <div className="deskCalendarWeekdays" aria-hidden="true">
      {weekdayLabels.map((day,index)=><span key={index}>{day}</span>)}
    </div>
    <div className="deskCalendarGrid">
      {days.map((day,index)=>day===null
        ?<span key={`blank-${index}`} className="deskCalendarBlank" aria-hidden="true"/>
        :<span key={day} className={day===today?"deskCalendarToday":""} aria-current={day===today?"date":undefined}>{number(day)}</span>
      )}
    </div>
  </section>;
}
