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
    return <main className={styles.page}><section className={styles.error}><h1>Lesson not found</h1><Link href="/student-dashboard">Back to my desk</Link></section></main>;
  }

  if(!ready)return <main className={styles.page}><div className={styles.loading}>Opening lesson mode…</div></main>;

  if(classKey==="8"&&book.id==="science")return <main className={styles.page}>
    <header className={styles.topbar}><Link className={styles.brand} href="/">বুঝি</Link><Link className={styles.back} href="/student-dashboard/books/8/science"><ArrowLeft/>Back to science book</Link></header>
    <section className={styles.lessonPage}><div className={styles.lessonHero} style={{"--accent":book.accent} as React.CSSProperties}><p>Class 8 · Science · NCTB 2026</p><h1>বিজ্ঞান</h1><span>Open a chapter from your actual textbook.</span></div>
    <div className={styles.lessonWorkspace}><Link className={styles.lessonCard} href="/science/class-8/chapter-1"><BookOpen/><strong>১. প্রাণিজগতের শ্রেণিবিন্যাস</strong><p>Explore the classification tree, identify animals and practise from printed pages 1–12.</p></Link><Link className={styles.lessonCard} href="/dashboard/science/chapter-2"><Play/><strong>২. জীবের বৃদ্ধি ও বংশগতি</strong><p>Explore cell division and the existing Chapter 2 simulations.</p></Link></div>
    <div className={styles.lessonWorkspace}><Link className={styles.lessonCard} href="/dashboard/science/chapter-2?lesson=5"><Play/><strong>মিয়োসিস-I ও II · ইন্টারেক্টিভ ক্রোমোজোম ল্যাব</strong><p>পাঠ ৫–৬: সমসংস্থ ক্রোমোজোম ও সিস্টার ক্রোমাটিড অনুসরণ করো।</p></Link></div>
    <div className={styles.lessonWorkspace}><Link className={styles.lessonCard} href="/dashboard/science/chapter-2?lesson=7"><Play/><strong>Cell → Nucleus → Chromosome → DNA → Gene Zoom</strong><p>পাঠ ৭: continuous zoom করে দেখো বংশগত তথ্য কোষের ভিতরে কীভাবে সংগঠিত থাকে।</p></Link></div>
    <div className={styles.lessonWorkspace}><Link className={styles.lessonCard} href="/science/class-8/chapter-4?topic=seed"><Play/><strong>অধ্যায় ৪ · বীজ অঙ্কুরোদ্গম পরীক্ষাগার</strong><p>পানি, অক্সিজেন ও তাপমাত্রা বদলে ফল দেখো এবং বাস্তব বীজের সঙ্গে তুলনা করো।</p></Link></div>
    <div className={styles.lessonWorkspace}>{[
      {number:3,title:"ব্যাপন, অভিস্রবণ ও প্রস্বেদন",detail:"Diffusion, osmosis and transpiration"},
      {number:4,title:"উদ্ভিদের বংশ বৃদ্ধি",detail:"Plant reproduction"},
      {number:5,title:"সমন্বয় ও নিঃসরণ",detail:"Coordination and excretion"},
      {number:6,title:"পরমাণুর গঠন",detail:"Build atoms and electron shells"}
    ].map(chapter=><Link className={styles.lessonCard} key={chapter.number} href={`/science/class-8/chapter-${chapter.number}`}><BookOpen/><strong>{chapter.number}. {chapter.title}</strong><p>{chapter.detail} · Interactive textbook lesson</p></Link>)}</div>
    <div className={styles.lessonWorkspace}>{[
      {number:7,title:"পৃথিবী ও মহাকর্ষ",detail:"Gravity and weight practice"},
      {number:8,title:"রাসায়নিক বিক্রিয়া",detail:"Balance equations and observe reactions"},
      {number:9,title:"বর্তনী ও চলবিদ্যুৎ",detail:"Circuits and Ohm's law"},
      {number:10,title:"অম্ল, ক্ষারক ও লবণ",detail:"Indicators and safe chemistry"},
      {number:11,title:"আলো",detail:"Refraction and ray model"},
      {number:12,title:"মহাকাশ ও উপগ্রহ",detail:"Orbits and satellite applications"},
      {number:13,title:"খাদ্য ও পুষ্টি",detail:"Food groups and recall cards"},
      {number:14,title:"পরিবেশ এবং বাস্তুতন্ত্র",detail:"Food chains and ecosystem relationships"}
    ].map(chapter=><Link className={styles.lessonCard} key={chapter.number} href={`/science/class-8/chapter-${chapter.number}`}><BookOpen/><strong>{chapter.number}. {chapter.title}</strong><p>{chapter.detail} · Discover → Explore → Do → Remember → Check</p></Link>)}</div></section>
  </main>;

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link className={styles.brand} href="/">বুঝি</Link>
      <Link className={styles.back} href={`/student-dashboard/books/${classKey}/${book.id}`}><ArrowLeft/>Back to book</Link>
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
          <strong>Understand</strong>
          <p>The lesson explanation for the selected chapter will live here, based on the actual NCTB textbook.</p>
        </article>
        <article className={styles.lessonCard}>
          <Play/>
          <strong>Learn visually</strong>
          <p>Diagrams, simulations, examples and read-aloud material can attach to the same lesson.</p>
        </article>
        <article className={styles.lessonCard}>
          <PenLine/>
          <strong>Practice</strong>
          <p>Questions and understanding checks will follow the exact lesson instead of using made-up chapters.</p>
        </article>
      </div>

      <div className={styles.lessonNotice}>
        This lesson route is ready for this exact book. I have intentionally not inserted fake chapter names. When the real PDF/content is uploaded, its real chapter and lesson structure can be connected here.
      </div>
    </section>
  </main>;
}
