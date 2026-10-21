import Link from "next/link";
import type {CSSProperties} from "react";
import {ArrowLeft,ArrowRight,BookOpen} from "lucide-react";
import type {StudyBook} from "../../data/class8StudyBooks";
import styles from "./study.module.css";
export default function StudyBookOverview({book}:{book:StudyBook}){
 const en=book.id.startsWith("english");const n=(v:number)=>v.toLocaleString(en?"en":"bn-BD",{useGrouping:false});
 return <main className={styles.page} style={{"--book-accent":book.accent} as CSSProperties} lang={en?"en":"bn"} data-no-translate><div className={styles.container}>
  <header className={styles.topbar}><nav className={styles.breadcrumb}><Link href="/learn/class-8"><ArrowLeft size={18}/>{en?"All Class 8 books":"অষ্টম শ্রেণির সব বই"}</Link></nav></header>
  <section className={styles.hero}><div><p><span className={styles.subjectBadge}>{en?"Class 8":"অষ্টম শ্রেণি"}</span> · NCTB ২০২৬</p><h1>{book.title}</h1><span>{en?"Choose a unit to read, practise and save your place.":"মূল বইয়ের নাম ও ক্রমে সাজানো পাঠ। একটি পাঠ বেছে পড়ে, অনুশীলন করে নিজের জায়গা সংরক্ষণ করো।"}</span></div><div className={styles.chapterStamp}><small>{en?"SECTIONS":"পাঠ-অংশ"}</small><b>{n(book.entries.length)}</b></div></section>
  <nav className={styles.chapterList} aria-label={en?"Textbook contents":"বইয়ের সূচিপত্র"}>{book.entries.map(e=><Link key={e.number} href={`/learn/class-8/${book.id}/chapter-${e.number}`} className={styles.chapterRow}><span className={styles.chapterNumber}>{e.sourceNumber===0?"•":n(e.sourceNumber??e.number)}</span><div>{e.part&&<small>{e.part}</small>}<h2>{e.title}</h2>{e.author&&<p>{e.author}</p>}<p>{e.guide.summary}</p><small>{en?"Textbook pages":"বইয়ের পৃষ্ঠা"} {n(e.pages[0])}–{n(e.pages[1])}</small></div><ArrowRight size={20}/></Link>)}</nav>
  <p className={styles.sourceNote}><BookOpen size={14}/> <a href={book.pdfPath} target="_blank" rel="noopener noreferrer">{en?"Open the complete NCTB textbook":"সম্পূর্ণ মূল NCTB পাঠ্যবই পড়ি"}</a></p>
 </div></main>;
}
