"use client";

import Link from "next/link";
import {useState} from "react";
import {ArrowRight,Beaker,ExternalLink,Info,MousePointerClick} from "lucide-react";
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
 if(!lab)return null;
 return <section className={styles.labBlock} aria-labelledby="science-restored-lab-title">
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
 </section>;
}
