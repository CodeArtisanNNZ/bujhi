"use client";

import Link from "next/link";
import {useState} from "react";
import {ArrowRight,Beaker,CheckCircle2,Copy,ExternalLink,Eye,Info,MousePointerClick} from "lucide-react";
import LibraryLabs from "../../dashboard/science/chapter-2/LibraryLabs";
import styles from "./science-labs.module.css";

const chapterTwoLessons=[
 "কোষ বিভাজনের প্রকারভেদ",
 "মাইটোসিস: প্রস্তুতি ও প্রোফেজ",
 "মাইটোসিস: প্রো-মেটাফেজ থেকে অ্যানাফেজ",
 "টেলোফেজ, সাইটোকাইনেসিস ও বৃদ্ধি",
 "মিয়োসিস-I",
 "মিয়োসিস-II",
 "কোষ → নিউক্লিয়াস → ক্রোমোজোম → DNA → জিন",
 "DNA ও বংশগত তথ্য",
 "বংশগতি ও জিন সঞ্চারণ"
];

const restored:Record<number,{title:string;copy:string;src:string;full:string;steps:string[]}>={
 3:{
  title:"ব্যাপন কণা সিমুলেটর",
  copy:"ঘনত্ব, তাপমাত্রা ও কণার চলাচল বদলে ব্যাপনকে চোখের সামনে দেখো।",
  src:"/simulations/class-8/diffusion.html",
  full:"/simulations/class-8/diffusion.html",
  steps:["প্রথমে কণাগুলোর শুরুর অবস্থান দেখো।","একটি ভেরিয়েবল বদলে কণার চলাচল তুলনা করো।","শেষে বেশি ঘনত্ব থেকে কম ঘনত্বের দিকে সামগ্রিক ছড়িয়ে পড়া নিজের ভাষায় বলো।"]
 },
 4:{
  title:"বীজ অঙ্কুরোদ্গম পরীক্ষাগার",
  copy:"পানি, অক্সিজেন ও তাপমাত্রা বদলে অঙ্কুরোদ্গমের শর্তগুলো তুলনা করো।",
  src:"/simulations/class-8/seed-germination.html",
  full:"/simulations/class-8/seed-germination.html",
  steps:["পানি, অক্সিজেন ও তাপমাত্রার একটি সেট বেছে নাও।","ফলাফল দেখে কোন শর্তে অঙ্কুরোদ্গম ভালো হচ্ছে তুলনা করো।","তারপর অন্য একটি সেট দিয়ে পরীক্ষা করে পার্থক্য লিখে রাখো।"]
 },
 5:{
  title:"স্নায়ু সংকেত সিমুলেটর",
  copy:"উদ্দীপনা থেকে গ্রাহক, স্নায়ু, কেন্দ্রীয় স্নায়ুতন্ত্র ও প্রতিক্রিয়া পর্যন্ত সংকেতের পথ অনুসরণ করো।",
  src:"/simulations/class-8/neuron-signal.html",
  full:"/simulations/class-8/neuron-signal.html",
  steps:["একটি উদ্দীপনা দিয়ে শুরু করো।","সংকেত কোন ধাপে কোথায় যাচ্ছে তা অনুসরণ করো।","শেষে sensory neuron, CNS ও motor neuron-এর ভূমিকা আলাদা করে বলো।"]
 }
};

const ictd3DUrl="https://digitalcontent.gov.bd/portal/three-d";

type Ictd3DResource={
 sourceTitle:string;
 currentUse:string;
 before:string;
 observe:string[];
 after:string;
};

const ictd3DByChapter:Record<number,Ictd3DResource[]>={
 4:[
  {
   sourceTitle:"১১তম অধ্যায় : পুষ্পের বিভিন্ন প্রকার",
   currentUse:"বর্তমান Bujhi অধ্যায় ৪ · উদ্ভিদের বংশ বৃদ্ধি",
   before:"দেখার আগে ভাবো: সব ফুলের গঠন কি একই রকম?",
   observe:["ফুলের দৃশ্যমান অংশগুলো কোথায় অবস্থান করছে খেয়াল করো।","একটি ফুলের সঙ্গে আরেকটির গঠনের পার্থক্য তুলনা করো।","যে গঠনগুলো উদ্ভিদের বংশবৃদ্ধির সঙ্গে সম্পর্কিত, সেগুলো বইয়ের চিত্রের সঙ্গে মিলিয়ে দেখো।"],
   after:"দেখার পর: দুই ধরনের ফুলের অন্তত ২টি গঠনগত পার্থক্য নিজের ভাষায় বলো।"
  }
 ],
 5:[
  {
   sourceTitle:"৮ম অধ্যায় : একটি নেফ্রন",
   currentUse:"বর্তমান Bujhi অধ্যায় ৫ · সমন্বয় ও নিঃসরণ",
   before:"দেখার আগে ভাবো: কিডনির ভেতরের ক্ষুদ্র কার্যকর এককটি কীভাবে বর্জ্য ছাঁকতে পারে?",
   observe:["নেফ্রনের শুরু, নলাকার পথ ও শেষ অংশ আলাদা করে খুঁজে দেখো।","রক্ত থেকে ছাঁকনির পর তরল কোন পথে এগোয় তা অনুসরণ করো।","বইয়ের নেফ্রন চিত্রের সঙ্গে 3D মডেলের অবস্থান মিলিয়ে দেখো।"],
   after:"দেখার পর: নেফ্রনের পথটি শুরু থেকে শেষ পর্যন্ত ৩–৪ ধাপে বলো।"
  },
  {
   sourceTitle:"৭ম অধ্যায় : মানব শ্বসনতন্ত্র",
   currentUse:"অধ্যায় ৫-এর মানবদেহ বোঝার সহায়ক 3D",
   before:"দেখার আগে ভাবো: নাক দিয়ে ঢোকা বাতাস শেষ পর্যন্ত কোথায় পৌঁছায়?",
   observe:["বায়ু চলাচলের পথটি উপর থেকে নিচে অনুসরণ করো।","প্রধান অঙ্গগুলোর পারস্পরিক অবস্থান খেয়াল করো।","শ্বাস নেওয়া ও গ্যাস বিনিময়ের ধারণা বইয়ের মানবদেহ বিষয়ক অংশের সঙ্গে যুক্ত করো।"],
   after:"দেখার পর: বাতাসের যাত্রাপথ নিজের ভাষায় ধারাবাহিকভাবে বলো।"
  },
  {
   sourceTitle:"৬ষ্ঠ অধ্যায় : বিভিন্ন ধরনের রক্তকণিকা",
   currentUse:"অধ্যায় ৫-এর মানবদেহ বোঝার সহায়ক 3D",
   before:"দেখার আগে ভাবো: সব রক্তকণিকা দেখতে ও কাজ করতে কি একই?",
   observe:["আকার ও গঠনের দৃশ্যমান পার্থক্যগুলো খুঁজে দেখো।","ভিন্ন ধরনের রক্তকণিকাকে পাশাপাশি তুলনা করো।","প্রতিটি ধরনের জন্য একটি করে মূল কাজ বই/নোট থেকে মিলিয়ে নাও।"],
   after:"দেখার পর: তিন ধরনের রক্তকণিকার একটি করে গঠনগত বা কাজের পার্থক্য বলো।"
  }
 ]
};

function Ictd3DStudyShelf({chapter}:{chapter:number}){
 const items=ictd3DByChapter[chapter]||[];
 const[copied,setCopied]=useState<string|null>(null);
 if(items.length===0)return null;
 async function copyTitle(title:string){
  try{
   await navigator.clipboard.writeText(title);
   setCopied(title);
   window.setTimeout(()=>setCopied(current=>current===title?null:current),1800);
  }catch{
   setCopied(null);
  }
 }
 return <section className={styles.ictdShelf} aria-label="ICTD Digital Lab 3D study resources">
  <header className={styles.ictdHead}>
   <div><span>ICTD DIGITAL LAB · 3D</span><h3>3D দেখে বইয়ের ধারণা মিলিয়ে নাও</h3><p>ICTD-এর 3D মডেলগুলো এখানে বর্তমান Bujhi অধ্যায়ের সঙ্গে বিষয়ভিত্তিকভাবে সাজানো হয়েছে। উৎসের পুরোনো অধ্যায় নম্বরকে Bujhi-এর ২০২৬ অধ্যায় নম্বর হিসেবে ধরবে না।</p></div>
   <Eye aria-hidden="true"/>
  </header>
  <div className={styles.ictdHow}>
   <b>খোলার নিয়ম</b>
   <span>১. “ICTD 3D খুলুন” চাপো</span><span>২. অষ্টম শ্রেণি + বিজ্ঞান বেছে নাও</span><span>৩. নিচের সঠিক শিরোনামটি খুঁজে খোলো</span>
  </div>
  <div className={styles.ictdGrid}>
   {items.map((item,index)=><article className={styles.ictdCard} key={item.sourceTitle}>
    <div className={styles.ictdCardTop}><span>{String(index+1).padStart(2,"0")}</span><div><small>{item.currentUse}</small><h4>{item.sourceTitle}</h4></div></div>
    <p className={styles.beforePrompt}>{item.before}</p>
    <div className={styles.observeBox}><strong><Eye/>3D-তে কী দেখবে</strong><ol>{item.observe.map(point=><li key={point}>{point}</li>)}</ol></div>
    <p className={styles.afterPrompt}><CheckCircle2/>{item.after}</p>
    <div className={styles.ictdActions}>
     <a href={ictd3DUrl} target="_blank" rel="noopener noreferrer">ICTD 3D খুলুন <ExternalLink/></a>
     <button type="button" onClick={()=>copyTitle(item.sourceTitle)}><Copy/>{copied===item.sourceTitle?"কপি হয়েছে":"শিরোনাম কপি"}</button>
    </div>
   </article>)}
  </div>
  <p className={styles.ictdSourceNote}>উৎস: তথ্য ও যোগাযোগ প্রযুক্তি অধিদপ্তর · ICTD Digital Lab · 3D বিষয়বস্তু। Bujhi এখানে শুধু পড়ার ক্রম ও বোঝার নির্দেশনা সাজিয়েছে।</p>
 </section>;
}


export default function ScienceInteractiveLabs({chapter}:{chapter:number}){
 const[chapterTwoLesson,setChapterTwoLesson]=useState(1);

 if(chapter===2){
  return <section className={styles.labBlock} aria-labelledby="science-restored-lab-title">
   <header className={styles.labHead}>
    <div><span>আগের Bujhi ল্যাবগুলো ফিরেছে</span><h3 id="science-restored-lab-title">অধ্যায় ২ · অ্যানিমেশন ও সিমুলেশন</h3><p>বর্তমান বইয়ের কাঠামো অপরিবর্তিত রেখে আগের ৯টি ইন্টার‌্যাক্টিভ ল্যাব আবার এই অধ্যায়ের ভেতরেই যুক্ত করা হয়েছে।</p></div>
    <Beaker aria-hidden="true"/>
   </header>
   <div className={styles.guide}><Info aria-hidden="true"/><p><strong>কীভাবে ব্যবহার করবে:</strong> নিচের একটি পাঠ বেছে নাও → সিমুলেশনে কী বদলাচ্ছে লক্ষ্য করো → তারপর বইয়ের ব্যাখ্যার সঙ্গে মিলিয়ে দেখো।</p></div>
   <div className={styles.lessonRail} role="tablist" aria-label="অধ্যায় ২ ইন্টার‌্যাক্টিভ ল্যাব">
    {chapterTwoLessons.map((name,index)=><button type="button" role="tab" aria-selected={chapterTwoLesson===index+1} className={chapterTwoLesson===index+1?styles.active:""} key={name} onClick={()=>setChapterTwoLesson(index+1)}><b>{String(index+1).padStart(2,"0")}</b><span>{name}</span></button>)}
   </div>
   <div className={styles.chapterTwoFrame}><LibraryLabs lesson={chapterTwoLesson}/></div>
   <Link className={styles.openChapter} href={"/dashboard/science/chapter-2?lesson="+chapterTwoLesson}>পুরো অধ্যায়ের ইন্টার‌্যাক্টিভ পাঠ খুলুন <ArrowRight/></Link>
  </section>;
 }

 const lab=restored[chapter];
 const hasIctd=(ictd3DByChapter[chapter]||[]).length>0;
 if(!lab&&!hasIctd)return null;
 return <>
  {lab&&<section className={styles.labBlock} aria-labelledby="science-restored-lab-title">
   <header className={styles.labHead}>
    <div><span>ইন্টার‌্যাক্টিভ বিজ্ঞান</span><h3 id="science-restored-lab-title">{lab.title}</h3><p>{lab.copy}</p></div>
    <Beaker aria-hidden="true"/>
   </header>
   <div className={styles.instructions}>
    <div><MousePointerClick aria-hidden="true"/><strong>শুরু করার আগে</strong></div>
    <ol>{lab.steps.map((step,index)=><li key={step}><span>{(index+1).toLocaleString("bn-BD")}</span>{step}</li>)}</ol>
   </div>
   <div className={styles.frameWrap}><iframe src={lab.src} title={lab.title} loading="lazy" allow="fullscreen" allowFullScreen/></div>
   <a className={styles.fullscreen} href={lab.full} target="_blank" rel="noopener noreferrer">বড় করে দেখুন <ExternalLink/></a>
  </section>}
  <Ictd3DStudyShelf chapter={chapter}/>
 </>;
}
