"use client";

import Link from "next/link";
import {useState} from "react";
import {ArrowLeft,BookOpen,BriefcaseBusiness,Building2,HeartPulse,MessageCircleMore,Microscope,MonitorSmartphone,Store} from "lucide-react";
import {studentBookCatalog} from "../../../data/nctbBooks";
import styles from "./ict.module.css";

type Lesson={
  number:number;
  title:string;
  summary:string;
  outcomes:string[];
  icon:React.ComponentType<{size?:number}>;
};

const lessons:Lesson[]=[
  {
    number:1,
    title:"তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব",
    summary:"দৈনন্দিন জীবন, শিক্ষা ও কাজের জগতে ICT কেন গুরুত্বপূর্ণ—নীলিমার গল্প থেকে বুঝি।",
    outcomes:["ICT-এর গুরুত্ব ব্যাখ্যা করা","অনলাইনে কাজ ও সেবার সুবিধা চিহ্নিত করা","ICT-এর প্রভাব বাস্তব জীবনের উদাহরণে বোঝানো"],
    icon:MonitorSmartphone
  },
  {
    number:2,
    title:"কর্মসৃজন ও কর্মপ্রাপ্তিতে তথ্য ও যোগাযোগ প্রযুক্তি",
    summary:"ICT কীভাবে কাজের ধরন বদলায়, নতুন কর্মসংস্থান তৈরি করে এবং ঘরে বসে কাজের সুযোগ বাড়ায়।",
    outcomes:["ICT ব্যবহারে কর্মক্ষেত্রের সুবিধা বোঝা","নতুন ধরনের কাজ ও দক্ষতার প্রয়োজন ব্যাখ্যা করা","ঘরে বসে আয় ও আউটসোর্সিংয়ের ধারণা বোঝা"],
    icon:BriefcaseBusiness
  },
  {
    number:3,
    title:"যোগাযোগ",
    summary:"একমুখী ও দ্বিমুখী যোগাযোগ, অনলাইন যোগাযোগ এবং ওয়েব কনফারেন্সিংয়ের ব্যবহার।",
    outcomes:["যোগাযোগে ICT-এর ভূমিকা ব্যাখ্যা করা","একমুখী ও দ্বিমুখী যোগাযোগ আলাদা করা","ওয়েব কনফারেন্সিংয়ের ব্যবহার বোঝা"],
    icon:MessageCircleMore
  },
  {
    number:4,
    title:"ব্যবসায়ে তথ্য ও যোগাযোগ প্রযুক্তি",
    summary:"EPOS, মজুদ নিয়ন্ত্রণ, স্প্রেডশিট, মূল্য সংগ্রহ ও বিপণনে ICT-এর ব্যবহার।",
    outcomes:["ব্যবসায়ে ICT-এর ব্যবহার চিহ্নিত করা","মজুদ ও বিক্রয় ব্যবস্থাপনায় ICT-এর ভূমিকা বোঝা","ডিজিটাল যোগাযোগ ও বিপণনের সুবিধা ব্যাখ্যা করা"],
    icon:Store
  },
  {
    number:5,
    title:"সরকারি কর্মকাণ্ডে তথ্য ও যোগাযোগ প্রযুক্তির প্রয়োগ",
    summary:"ই-গভর্ন্যান্স ও ডিজিটাল সেবার মাধ্যমে সরকারি তথ্য ও সেবা মানুষের কাছে কীভাবে পৌঁছে যায়।",
    outcomes:["সরকারি কাজে ICT ব্যবহারের ক্ষেত্র চিহ্নিত করা","ডিজিটাল সরকারি সেবার সুবিধা বোঝা","তথ্য দ্রুত মানুষের কাছে পৌঁছানোর উপায় ব্যাখ্যা করা"],
    icon:Building2
  },
  {
    number:6,
    title:"চিকিৎসা",
    summary:"ডাটাবেস, টেলিমেডিসিন এবং রোগ প্রতিরোধ ও স্বাস্থ্যসেবায় ICT-এর ভূমিকা।",
    outcomes:["টেলিমেডিসিনের ধারণা বোঝা","স্বাস্থ্য তথ্য সংরক্ষণে ডাটাবেসের ব্যবহার জানা","চিকিৎসা ও রোগ প্রতিরোধে ICT-এর ভূমিকা ব্যাখ্যা করা"],
    icon:HeartPulse
  },
  {
    number:7,
    title:"গবেষণা",
    summary:"তথ্য সংগ্রহ, বিশ্লেষণ, সংরক্ষণ ও গবেষণার বিভিন্ন ধাপে ICT কীভাবে কাজকে সহজ করে।",
    outcomes:["গবেষণার ক্ষেত্র চিহ্নিত করা","গবেষণায় তথ্য সংগ্রহ ও বিশ্লেষণে ICT-এর ব্যবহার বোঝা","গবেষণায় ICT-এর প্রয়োজনীয়তা ব্যাখ্যা করা"],
    icon:Microscope
  }
];

export default function IctClassEightChapterOne(){
  const[selected,setSelected]=useState(0);
  const active=lessons[selected];
  const Icon=active.icon;
  const ictBook=studentBookCatalog["8"].find(book=>book.id==="ict");

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link href="/ict/class-8"><ArrowLeft/>ICT অধ্যায়গুলোতে ফিরি</Link>
      {ictBook&&<a href={ictBook.pdfPath} target="_blank" rel="noopener noreferrer"><BookOpen/>মূল বই</a>}
    </header>

    <section className={styles.hero}>
      <p>অষ্টম শ্রেণি · তথ্য ও যোগাযোগ প্রযুক্তি · অধ্যায় ১</p>
      <h1>তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব</h1>
      <span>অধ্যায়টি ৭টি ছোট পাঠে ভাগ করা হয়েছে। একটি পাঠ বেছে ধাপে ধাপে পড়ো।</span>
    </section>

    <section className={styles.layout}>
      <div className={styles.lessonGrid} aria-label="অধ্যায় ১-এর ৭টি পাঠ">
        {lessons.map((lesson,index)=>{
          const LessonIcon=lesson.icon;
          return <button
            type="button"
            key={lesson.number}
            className={index===selected?styles.activeCard:""}
            onClick={()=>setSelected(index)}
          >
            <span className={styles.lessonNumber}>পাঠ {lesson.number.toLocaleString("bn-BD")}</span>
            <LessonIcon size={25}/>
            <strong>{lesson.title}</strong>
            <p>{lesson.summary}</p>
          </button>;
        })}
      </div>

      <aside className={styles.lessonDetail}>
        <div className={styles.detailIcon}><Icon size={30}/></div>
        <p>পাঠ {active.number.toLocaleString("bn-BD")}</p>
        <h2>{active.title}</h2>
        <span>{active.summary}</span>
        <div className={styles.outcomes}>
          <small>এই পাঠ শেষে তুমি পারবে</small>
          {active.outcomes.map((item,index)=><div key={item}><b>{(index+1).toLocaleString("bn-BD")}</b><span>{item}</span></div>)}
        </div>
        {ictBook&&<a className={styles.pdfButton} href={ictBook.pdfPath} target="_blank" rel="noopener noreferrer"><BookOpen size={18}/> মূল NCTB বই খুলুন</a>}
      </aside>
    </section>
  </main>;
}
