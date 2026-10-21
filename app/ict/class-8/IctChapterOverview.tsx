import Link from "next/link";
import {ArrowLeft,ArrowRight,BookOpen} from "lucide-react";
import {class8IctChapters,ictTextbookSource} from "../../data/class8Ict";
import styles from "./reader.module.css";
const bn=(n:number)=>n.toLocaleString("bn-BD",{useGrouping:false});
export default function IctChapterOverview(){
 return <main className={styles.page} lang="bn" data-no-translate><div className={styles.container}>
  <header className={styles.topbar}><nav className={styles.breadcrumb} aria-label="বইয়ে ফিরি"><Link href="/student-dashboard/books/8/ict"><ArrowLeft size={19}/>তথ্য ও যোগাযোগ প্রযুক্তির বইয়ে ফিরি</Link></nav></header>
  <section className={styles.hero}>
   <div><p>অষ্টম শ্রেণি · তথ্য ও যোগাযোগ প্রযুক্তি · NCTB ২০২৬</p><h1>একটি অধ্যায় বেছে পড়ি</h1><span>বইয়ের আসল নাম ও ক্রমে সাজানো পাঠ। প্রতিটি অধ্যায়ে নম্বর বেছে বা পয়েন্টার টেনে একই পৃষ্ঠায় পাঠ বদলাতে পারবে।</span></div>
   <div className={styles.chapterStamp}><small>CHAPTERS</small><b>০৫</b></div>
  </section>
  <nav className={styles.chapterList} aria-label="তথ্য ও যোগাযোগ প্রযুক্তির পাঁচটি অধ্যায়">
   {class8IctChapters.map(chapter=><Link key={chapter.number} href={`/ict/class-8/chapter-${chapter.number}`} className={styles.chapterRow}>
    <span className={styles.chapterNumber}>{bn(chapter.number)}</span><div><h2>{chapter.title}</h2><p>{chapter.intro}</p><small>{bn(chapter.lessons.length)}টি নামযুক্ত পাঠ-অংশ · বইয়ের পাঠ {bn(chapter.lessons[0].number)}–{bn(chapter.lessons[chapter.lessons.length-1].endNumber)} · পৃষ্ঠা {bn(chapter.pages[0])}–{bn(chapter.pages[1])}</small></div><ArrowRight size={20}/>
   </Link>)}
  </nav>
  <p className={styles.sourceNote}><BookOpen size={14} aria-hidden="true"/> পাঠের নাম ও নম্বর: <a href={ictTextbookSource.pdfUrl} target="_blank" rel="noopener noreferrer">{ictTextbookSource.title}</a>। বইয়ের সম্মিলিত পাঠ ২৩–৪৩ ও ৪৭–৬৯ তাদের মূল শিরোনামেই রাখা হয়েছে।</p>
 </div></main>;
}
