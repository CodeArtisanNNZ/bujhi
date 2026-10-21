"use client";

// deploy retry: class 8 ICT chapter cards

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
  const bookUsesEnglish=Boolean(book&&/^[A-Za-z]/.test(book.title));
  const ui=(bn:string,en:string)=>bookUsesEnglish?en:bn;
  const classLabelBn:Record<StudentClassKey,string>={"6":"ষষ্ঠ শ্রেণি","7":"সপ্তম শ্রেণি","8":"অষ্টম শ্রেণি","9-10":"নবম থেকে দশম শ্রেণি"};
  const classLabel=classKey?(bookUsesEnglish?studentClassLabels[classKey]:classLabelBn[classKey]):"";
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
        if(classKey==="8"){router.replace(`/learn/class-8/${bookId}`);return;}
        setReady(true);
      }catch{
        router.replace("/login?role=student");
      }
    })();
  },[classKey,bookId,router]);

  if(!classKey||!book){
    return <main className={styles.page}><section className={styles.error}><h1>{ui("পাঠ পাওয়া যায়নি","Lesson not found")}</h1><Link href="/student-dashboard">{ui("আমার ডেস্কে ফিরি","Back to my desk")}</Link></section></main>;
  }

  if(!ready)return <main className={styles.page}><div className={styles.loading}>{ui("পাঠ খোলা হচ্ছে…","Opening lesson…")}</div></main>;

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link className={styles.back} href={`/student-dashboard/books/${classKey}/${book.id}`}><ArrowLeft/>{ui("বইয়ে ফিরি","Back to book")}</Link>
    </header>

    <section className={styles.lessonPage}>
      <div className={styles.lessonHero} style={{"--accent":book.accent} as React.CSSProperties}>
        <p>{classLabel} · {ui("পাঠ শিখি","Learn Lesson")}</p>
        <h1>{book.title}</h1>
        <span>{book.englishTitle}</span>
      </div>

      <div className={styles.lessonWorkspace}>
        <article className={styles.lessonCard}>
          <BookOpen/>
          <strong>{ui("বোঝো","Understand")}</strong>
          <p>{ui("নির্বাচিত অধ্যায়ের ব্যাখ্যা মূল NCTB পাঠ্যবই অনুসারে এখানে থাকবে।","The lesson explanation for the selected chapter will follow the actual NCTB textbook.")}</p>
        </article>
        <article className={styles.lessonCard}>
          <Play/>
          <strong>{ui("চিত্রে শেখো","Learn visually")}</strong>
          <p>{ui("চিত্র, সিমুলেশন, উদাহরণ ও পাঠ-সহায়ক উপকরণ একই পাঠের সঙ্গে থাকবে।","Diagrams, simulations, examples and reading support will stay attached to the same lesson.")}</p>
        </article>
        <article className={styles.lessonCard}>
          <PenLine/>
          <strong>{ui("অনুশীলন","Practice")}</strong>
          <p>{ui("প্রশ্ন ও বোঝাপড়া যাচাই মূল পাঠের সঙ্গে মিল রেখে থাকবে।","Questions and understanding checks will follow the exact lesson.")}</p>
        </article>
      </div>

      <div className={styles.lessonNotice}>
        {ui("এই বইয়ের জন্য পাঠের জায়গা প্রস্তুত। মূল PDF/বিষয়বস্তু যুক্ত হলে বইয়ের আসল অধ্যায় ও পাঠের কাঠামো এখানেই যুক্ত হবে।","This lesson route is ready for this exact book. When the real PDF/content is available, its real chapter and lesson structure can be connected here.")}
      </div>
    </section>
  </main>;
}
