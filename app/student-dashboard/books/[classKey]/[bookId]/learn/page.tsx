"use client";

import Link from "next/link";
import {useParams,useRouter} from "next/navigation";
import {useEffect,useMemo,useState} from "react";
import {ArrowLeft,BookOpen,PenLine,Play} from "lucide-react";
import styles from "../../../book.module.css";
import {
  findNctbBook,studentClassKey,studentClassLabels,type StudentClassKey
} from "../../../../../data/nctbBooks";

const validClasses:StudentClassKey[]=["6","7","8","9-10"];

export default function LearnBookPage(){
  const params=useParams();
  const router=useRouter();
  const classKeyRaw=Array.isArray(params.classKey)?params.classKey[0]:String(params.classKey||"");
  const bookId=Array.isArray(params.bookId)?params.bookId[0]:String(params.bookId||"");
  const classKey=validClasses.includes(classKeyRaw as StudentClassKey)?classKeyRaw as StudentClassKey:null;
  const book=useMemo(()=>classKey?findNctbBook(classKey,bookId):undefined,[classKey,bookId]);
  const[ready,setReady]=useState(false);

  useEffect(()=>{
    void (async()=>{
      try{
        const response=await fetch("/api/me",{cache:"no-store"});
        if(!response.ok){router.replace("/login?role=student");return}
        const data=await response.json() as {profile?:{role?:string;class_level?:string}};
        if(data.profile?.role==="teacher"){router.replace("/teacher-dashboard");return}
        const ownClass=studentClassKey(data.profile?.class_level);
        if(classKey&&ownClass!==classKey){router.replace("/student-dashboard");return}
        setReady(true);
      }catch{
        router.replace("/login?role=student");
      }
    })();
  },[classKey,router]);

  if(!classKey||!book){
    return <main className={styles.page}><section className={styles.error}><h1>পাঠ পাওয়া যায়নি</h1><Link href="/student-dashboard">আমার ডেস্কে ফিরি</Link></section></main>;
  }

  if(!ready)return <main className={styles.page}><div className={styles.loading}>পাঠ খোলা হচ্ছে…</div></main>;

  if(classKey==="8"&&book.id==="science")return <main className={styles.page}>
    <header className={styles.topbar}><Link className={styles.brand} href="/">বুঝি</Link><Link className={styles.back} href="/student-dashboard/books/8/science"><ArrowLeft/>বিজ্ঞানের বইয়ে ফিরি</Link></header>
    <section className={styles.lessonPage}><div className={styles.lessonHero} style={{"--accent":book.accent} as React.CSSProperties}><p>অষ্টম শ্রেণি · বিজ্ঞান · NCTB ২০২৬</p><h1>বিজ্ঞান</h1><span>তোমার মূল পাঠ্যবই থেকে একটি অধ্যায় খোলো।</span></div>
    <div className={styles.lessonWorkspace}><Link className={styles.lessonCard} href="/science/class-8/chapter-1"><BookOpen/><strong>১. প্রাণিজগতের শ্রেণিবিন্যাস</strong><p>শ্রেণিবিন্যাস বৃক্ষ দেখো, প্রাণী শনাক্ত করো এবং বইয়ের পৃষ্ঠা ১–১২ থেকে অনুশীলন করো।</p></Link><Link className={styles.lessonCard} href="/dashboard/science/chapter-2"><Play/><strong>২. জীবের বৃদ্ধি ও বংশগতি</strong><p>কোষ বিভাজন, মিয়োসিস-I ও II, ক্রোমোজোম, DNA, জিন এবং বংশগত তথ্যের ধারাবাহিক জুম—সবই অধ্যায় ২-এর ভিতরে।</p></Link></div>
    <div className={styles.lessonWorkspace}><Link className={styles.lessonCard} href="/science/class-8/chapter-4?topic=seed"><Play/><strong>অধ্যায় ৪ · বীজ অঙ্কুরোদ্গম পরীক্ষাগার</strong><p>পানি, অক্সিজেন ও তাপমাত্রা বদলে ফল দেখো এবং বাস্তব বীজের সঙ্গে তুলনা করো।</p></Link></div>
    <div className={styles.lessonWorkspace}>{[
      {number:3,title:"ব্যাপন, অভিস্রবণ ও প্রস্বেদন",detail:"ব্যাপন, অভিস্রবণ ও প্রস্বেদন"},
      {number:4,title:"উদ্ভিদের বংশ বৃদ্ধি",detail:"উদ্ভিদের বংশ বৃদ্ধি"},
      {number:5,title:"সমন্বয় ও নিঃসরণ",detail:"সমন্বয় ও নিঃসরণ"},
      {number:6,title:"পরমাণুর গঠন",detail:"পরমাণু ও ইলেকট্রন খোলক তৈরি করো"}
    ].map(chapter=><Link className={styles.lessonCard} key={chapter.number} href={`/science/class-8/chapter-${chapter.number}`}><BookOpen/><strong>{chapter.number}. {chapter.title}</strong><p>{chapter.detail} · ইন্টারেক্টিভ পাঠ্যবই পাঠ</p></Link>)}</div>
    <div className={styles.lessonWorkspace}>{[
      {number:7,title:"পৃথিবী ও মহাকর্ষ",detail:"মহাকর্ষ ও ওজন অনুশীলন"},
      {number:8,title:"রাসায়নিক বিক্রিয়া",detail:"সমীকরণ সমতা করো ও বিক্রিয়া পর্যবেক্ষণ করো"},
      {number:9,title:"বর্তনী ও চলবিদ্যুৎ",detail:"বর্তনী ও ওহমের সূত্র"},
      {number:10,title:"অম্ল, ক্ষারক ও লবণ",detail:"নির্দেশক ও নিরাপদ রসায়ন"},
      {number:11,title:"আলো",detail:"প্রতিসরণ ও আলোকরশ্মির মডেল"},
      {number:12,title:"মহাকাশ ও উপগ্রহ",detail:"কক্ষপথ ও উপগ্রহের ব্যবহার"},
      {number:13,title:"খাদ্য ও পুষ্টি",detail:"খাদ্যগোষ্ঠী ও মনে রাখার কার্ড"},
      {number:14,title:"পরিবেশ এবং বাস্তুতন্ত্র",detail:"খাদ্যশৃঙ্খল ও বাস্তুতন্ত্রের সম্পর্ক"}
    ].map(chapter=><Link className={styles.lessonCard} key={chapter.number} href={`/science/class-8/chapter-${chapter.number}`}><BookOpen/><strong>{chapter.number}. {chapter.title}</strong><p>{chapter.detail} · খুঁজে দেখো → অনুসন্ধান করো → নিজে করো → মনে রাখো → যাচাই করো</p></Link>)}</div></section>
  </main>;

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link className={styles.brand} href="/">বুঝি</Link>
      <Link className={styles.back} href={`/student-dashboard/books/${classKey}/${book.id}`}><ArrowLeft/>বইয়ে ফিরি</Link>
    </header>

    <section className={styles.lessonPage}>
      <div className={styles.lessonHero} style={{"--accent":book.accent} as React.CSSProperties}>
        <p>{studentClassLabels[classKey]} · Learn Lesson</p>
        <h1>{book.title}</h1>
        <span>{book.englishTitle}</span>
      </div>

      <div className={styles.lessonWorkspace}>
        <article className={styles.lessonCard}>
          <BookOpen/>
          <strong>বোঝো</strong>
          <p>নির্বাচিত অধ্যায়ের ব্যাখ্যা মূল NCTB পাঠ্যবই অনুসারে এখানে থাকবে।</p>
        </article>
        <article className={styles.lessonCard}>
          <Play/>
          <strong>চিত্রে শেখো</strong>
          <p>চিত্র, সিমুলেশন, উদাহরণ ও পাঠ-সহায়ক উপকরণ একই পাঠের সঙ্গে থাকবে।</p>
        </article>
        <article className={styles.lessonCard}>
          <PenLine/>
          <strong>অনুশীলন</strong>
          <p>প্রশ্ন ও বোঝাপড়া যাচাই মূল পাঠের সঙ্গে মিল রেখে থাকবে।</p>
        </article>
      </div>

      <div className={styles.lessonNotice}>
        This lesson route is ready for this exact book. I have intentionally not inserted fake chapter names. When the real PDF/content is uploaded, its real chapter and lesson structure can be connected here.
      </div>
    </section>
  </main>;
}
