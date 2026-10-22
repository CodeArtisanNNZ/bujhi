"use client";

import Link from "next/link";
import {useState} from "react";
import {ArrowLeft,ArrowRight,BookOpen,Feather,Search,X} from "lucide-react";
import {class8Writers,class8LiteratureBooks,class8LiteratureReadings,class8CompiledReadings} from "../../../data/class8Writers";
import type {WriterReading} from "../../../data/class8Writers";
import styles from "./writers.module.css";

const number=(value:number)=>value.toLocaleString("bn-BD",{useGrouping:false});
const normalize=(value:string)=>value.normalize("NFC").replace(/[\u200b-\u200d\ufeff]/g,"").toLocaleLowerCase().trim();

export default function WritersDirectory(){
 const [query,setQuery]=useState("");
 const [bookId,setBookId]=useState("all");
 const [kind,setKind]=useState("all");
 const terms=normalize(query).split(/\s+/).filter(Boolean);
 const matches=(value:string)=>terms.every(term=>normalize(value).includes(term));
 const matchesKind=(reading:{part?:string})=>kind==="all"||(kind==="stories"?["গদ্য","গল্প"].includes(reading.part||""):kind==="poetry"?reading.part==="কবিতা":["নাটক","ভ্রমণ-কাহিনি"].includes(reading.part||""));
 const matchesReading=(reading:WriterReading)=>(bookId==="all"||reading.bookId===bookId)&&matchesKind(reading);
 const writers=class8Writers.filter(writer=>writer.readings.some(matchesReading)&&matches([writer.name,writer.englishName,writer.role,...writer.readings.flatMap(reading=>[reading.title,reading.attribution])].join(" ")));
 const compiled=class8CompiledReadings.filter(reading=>(bookId==="all"||reading.bookId===bookId)&&matchesKind(reading)&&matches(`${reading.title} সংকলিত`));
 const hasFilters=Boolean(query||bookId!=="all"||kind!=="all");
 function reset(){setQuery("");setBookId("all");setKind("all");}

 return <main className={styles.page} lang="bn" data-no-translate><div className={styles.container}>
  <nav className={styles.breadcrumb} aria-label="পাঠের অবস্থান"><Link href="/learn/class-8"><ArrowLeft size={18} aria-hidden="true"/>অষ্টম শ্রেণির সব বই</Link><span>/</span><span aria-current="page">লেখক পরিচিতি</span></nav>
  <header className={styles.hero}>
   <div><p className={styles.eyebrow}><Feather size={18} aria-hidden="true"/>অষ্টম শ্রেণি · NCTB ২০২৬</p><h1>লেখক পরিচিতি</h1><p className={styles.intro}>যাঁর লেখা পড়ছ, তাঁকেও চিনে নাও। সাহিত্য-কণিকা ও আনন্দপাঠের গল্প, কবিতা, নাটক ও ভ্রমণকাহিনির মূল লেখকদের পরিচিতি এক জায়গায়।</p></div>
   <dl className={styles.stats}><div><dt>মূল লেখক</dt><dd>{number(class8Writers.length)}</dd></div><div><dt>সাহিত্যের বই</dt><dd>{number(class8LiteratureBooks.length)}</dd></div><div><dt>পাঠ ও রচনা</dt><dd>{number(class8LiteratureReadings.length)}</dd></div></dl>
  </header>
  <section className={styles.directory} aria-labelledby="writer-directory-title">
   <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>লেখক পরিচিতি</p><h2 id="writer-directory-title">যাঁদের লেখা পড়ছি</h2></div><p className={styles.resultCount} aria-live="polite" aria-atomic="true">{number(writers.length)} জনের পরিচিতি</p></div>
   <div className={styles.filters}>
    <label className={styles.search}><Search size={19} aria-hidden="true"/><span className={styles.srOnly}>লেখক বা পাঠ খুঁজুন</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="লেখক, কবি বা পাঠের নাম খুঁজি…"/></label>
    <div className={styles.creditFilter}><label htmlFor="writer-kind">পাঠের ধরন</label><select id="writer-kind" value={kind} onChange={event=>setKind(event.target.value)}><option value="all">সব রচনার লেখক</option><option value="stories">গদ্য ও গল্পের লেখক</option><option value="poetry">কবিতার লেখক</option><option value="other">নাটক ও ভ্রমণের লেখক</option></select></div>
    <nav className={styles.bookFilters} aria-label="বই অনুযায়ী লেখক বাছাই"><button type="button" aria-pressed={bookId==="all"} onClick={()=>setBookId("all")}>সব বই</button>{class8LiteratureBooks.map(book=><button key={book.id} type="button" aria-pressed={bookId===book.id} onClick={()=>setBookId(book.id)}>{book.title}</button>)}{hasFilters&&<button type="button" className={styles.reset} onClick={reset}><X size={15} aria-hidden="true"/>সব দেখাই</button>}</nav>
   </div>
   <div className={styles.writerGrid}>{writers.map(writer=><article key={writer.id} id={writer.id} className={styles.writerCard} data-writer-id={writer.id}>
    <div className={styles.writerHeading}><span className={styles.pen} aria-hidden="true"><Feather size={23}/></span><div><p>লেখক · {writer.role}</p><h3>{writer.name}</h3></div></div>
    <p className={styles.writerIntro}>{writer.intro}</p>
    <div className={styles.readings}><h4>এই শ্রেণিতে তাঁর পাঠ</h4>{writer.readings.filter(matchesReading).map(reading=><Link key={`${reading.bookId}-${reading.chapter}`} href={reading.href}><div><span>{reading.bookTitle} · {reading.part}</span><strong>{reading.title}</strong>{reading.attribution.includes(" · ")&&<small>{reading.attribution.split(" · ").slice(1).join(" · ")}</small>}<small>বইয়ের পৃষ্ঠা {number(reading.pages[0])}–{number(reading.pages[1])}</small></div><ArrowRight size={18} aria-hidden="true"/></Link>)}</div>
   </article>)}</div>
   {compiled.map(reading=><aside className={styles.compiled} key={reading.href}><BookOpen size={23} aria-hidden="true"/><div><h3>সংকলিত পাঠ: {reading.title}</h3><p>বইয়ে এই রচনাটি ‘সংকলিত’ হিসেবে দেওয়া আছে। তাই এখানে কোনো ব্যক্তিকে এর লেখক হিসেবে দেখানো হয়নি।</p><Link href={reading.href}>পাঠটি পড়ি <ArrowRight size={16} aria-hidden="true"/></Link></div></aside>)}
   {!writers.length&&!compiled.length&&<div className={styles.empty}><Search size={28} aria-hidden="true"/><h3>এই নামে কোনো পরিচিতি পাওয়া যায়নি</h3><p>নামের বানান বদলে বা অন্য বই বেছে আবার খুঁজে দেখো।</p><button type="button" onClick={reset}>সব লেখক দেখাই</button></div>}
  </section>
  <footer className={styles.sources}><h2><BookOpen size={20} aria-hidden="true"/>মূল বইয়ের সঙ্গে মিলিয়ে পড়ি</h2><p>এখানে মূল রচনার লেখকদের পরিচিতি দেওয়া আছে। অনুবাদ ও রূপান্তরের কৃতিত্ব সংশ্লিষ্ট পাঠের নিচে আলাদাভাবে উল্লেখ করা হয়েছে। একই লেখকের একাধিক পাঠ একটি পরিচিতির সঙ্গে যুক্ত আছে। পৃষ্ঠাসংখ্যা বইয়ে ছাপা পৃষ্ঠা অনুযায়ী।</p><div>{class8LiteratureBooks.map(book=><a key={book.id} href={book.pdfPath} target="_blank" rel="noopener noreferrer">{book.title} · মূল বই <ArrowRight size={16} aria-hidden="true"/></a>)}</div></footer>
 </div></main>;
}
