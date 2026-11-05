"use client";
import Link from "next/link";
import {BookOpen} from "lucide-react";
import type {CSSProperties} from "react";
import {studyBooks} from "../../data/class8StudyBooks";
import {localizedBookTitle,useBujhiLanguage} from "../../lib/i18n";
import WritersLink from "./WritersLink";
import styles from "./study.module.css";

export default function AllClass8Books(){
 const lang=useBujhiLanguage();
 const bn=lang==="bn";
 const n=(value:number)=>value.toLocaleString(bn?"bn-BD":"en-US");
 return <main className={styles.page} lang={lang} data-no-translate>
  <div className={styles.container}>
   <section className={styles.hero}><div>
    <p>{bn?"অষ্টম শ্রেণি":"Class 8"} · NCTB 2026</p>
    <h1>{bn?"বই বেছে, বুঝে পড়ি":"Choose a book. Learn with understanding."}</h1>
    <span>{bn?"২২টি বইয়ের আসল অধ্যায়, পাঠ ও রচনার নাম এক জায়গায়।":"Original chapter and lesson titles from 22 textbooks in one place."}</span>
   </div><div className={styles.chapterStamp}><small>{bn?"বই":"BOOKS"}</small><b>{n(studyBooks.length)}</b></div></section>
   <WritersLink/>
   <nav className={styles.bookGrid} aria-label={bn?"অষ্টম শ্রেণির বই":"Class 8 books"}>
    {studyBooks.map(book=><Link key={book.id} href={`/learn/class-8/${book.id}`} className={styles.bookCard} style={{"--book-accent":book.accent} as CSSProperties}>
      <span><BookOpen size={25}/></span>
      <h2>{localizedBookTitle(book,lang)}</h2>
      <p>{bn?"NCTB ২০২৬":"NCTB 2026"}</p>
      <small>{n(book.entries.length)} {bn?"টি পাঠ-অংশ · পড়া শুরু করি →":"sections · Start reading →"}</small>
    </Link>)}
   </nav>
  </div>
 </main>;
}