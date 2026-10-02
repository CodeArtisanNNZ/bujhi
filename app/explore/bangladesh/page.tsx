"use client";

import {useEffect,useState} from "react";
import BangladeshMapPreview from "../../components/BangladeshMapPreview";

export default function BangladeshExplorerPage(){
  const[lang,setLang]=useState<"en"|"bn">("en");

  useEffect(()=>{
    const sync=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);

  return <main className="bangladesh-explorer-page" data-no-translate>
    <section className="bangladesh-explorer-hero">
      <p className="eyebrow">{lang==="bn"?"বাংলাদেশ ইন্টারঅ্যাকটিভ অ্যাটলাস":"Bangladesh interactive atlas"}</p>
      <h1>{lang==="bn"?"এক দেশ। অনেক জায়গা। প্রতিটি জায়গার একাধিক গল্প।":"One country. Many places. More than one story."}</h1>
      <p>{lang==="bn"
        ?"একটি বিভাগ থেকে শুরু করুন, তারপর জেলার ভেতরে যান। একই জায়গাকে ভূগোল, ইতিহাস ও সংস্কৃতির ভিন্ন দৃষ্টিতে দেখুন।"
        :"Start with a division, drill into its districts, then switch between geography, history and culture to see how the same place can be understood from different angles."}</p>
    </section>
    <section className="bangladesh-explorer-wrap">
      <BangladeshMapPreview/>
    </section>
  </main>;
}
