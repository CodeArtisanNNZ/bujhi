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
import {class8BgsPlans} from "../../../../../data/class8BgsPlans";

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
  const[ictChapter,setIctChapter]=useState<number|null>(null);
  const[ictLesson,setIctLesson]=useState(0);

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
    return <main className={styles.page}><section className={styles.error}><h1>{ui("পাঠ পাওয়া যায়নি","Lesson not found")}</h1><Link href="/student-dashboard">{ui("আমার ডেস্কে ফিরি","Back to my desk")}</Link></section></main>;
  }

  if(!ready)return <main className={styles.page}><div className={styles.loading}>{ui("পাঠ খোলা হচ্ছে…","Opening lesson…")}</div></main>;

  if(classKey==="8"&&book.id==="bangladesh-global-studies")return <main className={styles.page}>
    <section className={styles.lessonWorkspace} aria-label="বাংলাদেশ ও বিশ্বপরিচয়ের ১৩টি অধ্যায়">
      {class8BgsPlans.map(chapter=><Link
        key={chapter.number}
        className={styles.lessonCard}
        href={chapter.number===1?"/bgs/class-8/chapter-1":`/bgs/class-8/chapter-${chapter.number}`}
      >
        <BookOpen/>
        <strong>{chapter.number.toLocaleString("bn-BD")}. {chapter.title}</strong>
        <p>{chapter.question}</p>
      </Link>)}
    </section>
  </main>;

  if(classKey==="8"&&book.id==="ict"){
    const ictLessons=[
      {number:1,title:"তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব",detail:"দৈনন্দিন জীবন, শিক্ষা ও কাজের জগতে ICT কেন গুরুত্বপূর্ণ—বাস্তব উদাহরণ দিয়ে বুঝি।"},
      {number:2,title:"কর্মসৃজন ও কর্মপ্রাপ্তিতে তথ্য ও যোগাযোগ প্রযুক্তি",detail:"ICT কীভাবে নতুন কাজের সুযোগ তৈরি করে এবং কর্মক্ষেত্র বদলে দেয়।"},
      {number:3,title:"যোগাযোগ",detail:"একমুখী ও দ্বিমুখী যোগাযোগ, অনলাইন যোগাযোগ এবং ওয়েব কনফারেন্সিং বুঝি।"},
      {number:4,title:"ব্যবসায়ে তথ্য ও যোগাযোগ প্রযুক্তি",detail:"বিক্রয়, মজুদ, হিসাব ও বিপণনে ICT-এর ব্যবহার দেখি।"},
      {number:5,title:"সরকারি কর্মকাণ্ডে তথ্য ও যোগাযোগ প্রযুক্তির প্রয়োগ",detail:"ই-গভর্ন্যান্স ও ডিজিটাল সরকারি সেবার সুবিধা বুঝি।"},
      {number:6,title:"চিকিৎসা",detail:"টেলিমেডিসিন, রোগীর তথ্য ও স্বাস্থ্যসেবায় ICT-এর ভূমিকা বুঝি।"},
      {number:7,title:"গবেষণা",detail:"তথ্য সংগ্রহ, বিশ্লেষণ, সংরক্ষণ ও গবেষণায় ICT কীভাবে সাহায্য করে।"}
    ];

    if(ictChapter===1){
      const activeLesson=ictLessons[ictLesson]||ictLessons[0];
      return <main className={styles.page}>
        <header className={styles.topbar}>
          <button type="button" className={styles.back} onClick={()=>{setIctChapter(null);setIctLesson(0)}}><ArrowLeft/>ICT অধ্যায়গুলোতে ফিরি</button>
        </header>
        <section className={styles.lessonPage}>
          <div className={styles.ictChapterHero} style={{"--accent":book.accent} as React.CSSProperties}>
            <div>
              <p>অষ্টম শ্রেণি · তথ্য ও যোগাযোগ প্রযুক্তি · অধ্যায় ১</p>
              <h1>তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব</h1>
              <span>একটি পাঠ বেছে নাও। প্রতিটি পাঠ একই অধ্যায়ের ধারাবাহিক অংশ হিসেবে নিচে খুলবে।</span>
            </div>
            <div className={styles.ictChapterStamp}><small>CHAPTER</small><b>০১</b></div>
          </div>

          <nav className={styles.ictLessonNav} aria-label="অধ্যায় ১-এর ৭টি পাঠ">
            {ictLessons.map((lesson,index)=><button
              type="button"
              key={lesson.number}
              className={index===ictLesson?styles.ictLessonActive:""}
              onClick={()=>setIctLesson(index)}
            >
              <BookOpen/>
              <span>{lesson.number.toLocaleString("bn-BD")}. {lesson.title}</span>
            </button>)}
          </nav>

          <article className={styles.ictLessonPanel}>
            <div className={styles.ictLessonHeading}>
              <span>পাঠ {activeLesson.number.toLocaleString("bn-BD")}</span>
              <h2>{activeLesson.title}</h2>
              <p>{activeLesson.detail}</p>
            </div>

            <div className={styles.ictLessonBody}>
              <section>
                <small>এই পাঠে কী বুঝবে</small>
                <h3>{activeLesson.title}</h3>
                <p>{activeLesson.detail}</p>
              </section>
              <section>
                <small>মনে রাখো</small>
                <p>তথ্য ও যোগাযোগ প্রযুক্তি শুধু কম্পিউটার ব্যবহার নয়—তথ্য সংগ্রহ, সংরক্ষণ, আদান-প্রদান এবং বাস্তব সমস্যার সমাধানে প্রযুক্তির ব্যবহারই এর মূল বিষয়।</p>
              </section>
              <section>
                <small>নিজেকে জিজ্ঞেস করো</small>
                <p>এই পাঠের ধারণাটি তোমার নিজের স্কুল, পরিবার বা দৈনন্দিন জীবনের কোন উদাহরণের সঙ্গে মেলে?</p>
              </section>
            </div>
          </article>
        </section>
      </main>;
    }

    return <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.back} href="/student-dashboard/books/8/ict"><ArrowLeft/>তথ্য ও যোগাযোগ প্রযুক্তির বইয়ে ফিরি</Link>
      </header>
      <section className={styles.lessonPage}>
        <div className={styles.lessonHero} style={{"--accent":book.accent} as React.CSSProperties}>
          <p>অষ্টম শ্রেণি · তথ্য ও যোগাযোগ প্রযুক্তি · NCTB ২০২৬</p>
          <h1>তথ্য ও যোগাযোগ প্রযুক্তি</h1>
          <span>অধ্যায় বেছে নাও। “পাঠ শিখি” অংশে PDF নয়—Bujhi lesson content খুলবে।</span>
        </div>
        <div className={styles.ictWorkspace} aria-label="অষ্টম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তির ৫টি অধ্যায়">
          {[
            {number:1,title:"তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব",detail:"শিক্ষা, স্বাস্থ্য, ব্যবসা, কর্মসংস্থান ও দৈনন্দিন জীবনে ICT কীভাবে পরিবর্তন আনে তা বুঝো।"},
            {number:2,title:"কম্পিউটার নেটওয়ার্ক",detail:"নেটওয়ার্ক কী, কেন দরকার, তথ্য ভাগাভাগি এবং সংযুক্ত কম্পিউটারের কাজ বোঝো।"},
            {number:3,title:"তথ্য ও যোগাযোগ প্রযুক্তির নিরাপদ ও নৈতিক ব্যবহার",detail:"পাসওয়ার্ড, ভাইরাস, অনলাইন নিরাপত্তা, গোপনীয়তা ও দায়িত্বশীল ডিজিটাল আচরণ শিখো।"},
            {number:4,title:"স্প্রেডশিটের ব্যবহার",detail:"সারি, কলাম, সেল, সূত্র ও হিসাবের মাধ্যমে তথ্য সাজানো এবং বিশ্লেষণ করা শিখো।"},
            {number:5,title:"শিক্ষা ও দৈনন্দিন জীবনে ইন্টারনেটের ব্যবহার",detail:"তথ্য খোঁজা, ই-মেইল, অনলাইন শিক্ষা ও দৈনন্দিন ডিজিটাল সেবার ব্যবহার বোঝো।"}
          ].map(chapter=>chapter.number===1?<button
            type="button"
            className={styles.ictCard}
            key={chapter.number}
            onClick={()=>{setIctChapter(1);setIctLesson(0)}}
          >
            <span className={styles.chapterBadge}>অধ্যায় {chapter.number.toLocaleString("bn-BD")}</span>
            <BookOpen/>
            <strong>{chapter.title}</strong>
            <p>{chapter.detail}</p>
            <small>৭টি পাঠে ভাগ করে পড়ো →</small>
          </button>:<article className={styles.ictCard} key={chapter.number}>
            <span className={styles.chapterBadge}>অধ্যায় {chapter.number.toLocaleString("bn-BD")}</span>
            <BookOpen/>
            <strong>{chapter.title}</strong>
            <p>{chapter.detail}</p>
            <small>পাঠ তৈরি হচ্ছে</small>
          </article>)}
        </div>
      </section>
    </main>;
  }

  if(classKey==="8"&&book.id==="science")return <main className={styles.page}>
    <header className={styles.topbar}><Link className={styles.back} href="/student-dashboard/books/8/science"><ArrowLeft/>বিজ্ঞানের বইয়ে ফিরি</Link></header>
    <section className={styles.lessonPage}><div className={styles.lessonHero} style={{"--accent":book.accent} as React.CSSProperties}><p>অষ্টম শ্রেণি · বিজ্ঞান · NCTB ২০২৬</p><h1>বিজ্ঞান</h1><span>তোমার মূল পাঠ্যবই থেকে একটি অধ্যায় খোলো।</span></div>
    <div className={styles.lessonWorkspace}><Link className={styles.lessonCard} href="/science/class-8/chapter-1"><BookOpen/><strong>১. প্রাণিজগতের শ্রেণিবিন্যাস</strong><p>শ্রেণিবিন্যাস বৃক্ষ দেখো, প্রাণী শনাক্ত করো এবং বইয়ের পৃষ্ঠা ১ থেকে ১২ থেকে অনুশীলন করো।</p></Link><Link className={styles.lessonCard} href="/dashboard/science/chapter-2"><Play/><strong>২. জীবের বৃদ্ধি ও বংশগতি</strong><p>কোষ বিভাজন, মিয়োসিস-I ও II, ক্রোমোজোম, DNA, জিন এবং বংশগত তথ্যের ধারাবাহিক জুম, সবই অধ্যায় ২-এর ভিতরে।</p></Link></div>
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
