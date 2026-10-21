import Link from "next/link";
import {BookOpen} from "lucide-react";
import type {CSSProperties} from "react";
import {studyBooks} from "../../data/class8StudyBooks";
import styles from "./study.module.css";
export const metadata={title:"অষ্টম শ্রেণির সব বই · Bujhi"};
export default function AllClass8Books(){return <main className={styles.page} lang="bn" data-no-translate><div className={styles.container}><section className={styles.hero}><div><p>অষ্টম শ্রেণি · NCTB ২০২৬</p><h1>বই বেছে, বুঝে পড়ি</h1><span>২২টি বইয়ের আসল অধ্যায়, পাঠ ও রচনার নাম এক জায়গায়।</span></div><div className={styles.chapterStamp}><small>বই</small><b>২২</b></div></section><nav className={styles.bookGrid} aria-label="অষ্টম শ্রেণির বই">{studyBooks.map(b=><Link key={b.id} href={`/learn/class-8/${b.id}`} className={styles.bookCard} style={{"--book-accent":b.accent} as CSSProperties}><span><BookOpen size={25}/></span><h2>{b.title}</h2><p>{b.englishTitle}</p><small>{b.entries.length.toLocaleString("bn-BD")}টি পাঠ-অংশ · পড়া শুরু করি →</small></Link>)}</nav></div></main>;}
