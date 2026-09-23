"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {
 ArrowLeft,ArrowRight,Atom,BookOpen,CheckCircle2,ChevronLeft,ChevronRight,
 CircleHelp,Dna,FlaskConical,GitBranch,GraduationCap,Lightbulb,
 RefreshCcw,Sparkles,Target
} from "lucide-react";
import styles from "./chapter2.module.css";
import LibraryLabs from "./LibraryLabs";

type Lesson={
 id:number; title:string; short:string; eyebrow:string; hook:string;
 explain:string[]; remember:string[]; exam:string; question:string;
 options:string[]; answer:number; why:string;
};

const lessons:Lesson[]=[
 {
  id:1,title:"কোষ বিভাজনের প্রকারভেদ",short:"অ্যামাইটোসিস · মাইটোসিস · মিয়োসিস",eyebrow:"পাঠ ১",
  hook:"একটি ছোট্ট বীজ কীভাবে বড় গাছে পরিণত হয়? আর একটি এককোষী জীব কীভাবে সংখ্যা বাড়ায়? উত্তরটির শুরু—কোষ বিভাজন।",
  explain:[
   "প্রতিটি জীব কোষ দিয়ে গঠিত। নতুন কোষ তৈরির প্রধান উপায় হলো কোষ বিভাজন। এককোষী জীবের ক্ষেত্রে বিভাজন থেকেই নতুন জীব তৈরি হতে পারে; বহুকোষী জীবের ক্ষেত্রে কোষের সংখ্যা বেড়ে দেহের বৃদ্ধি ঘটে।",
   "অষ্টম শ্রেণির এই অধ্যায়ে তিন ধরনের বিভাজনকে আলাদা করে চিনতে হবে—অ্যামাইটোসিস, মাইটোসিস এবং মিয়োসিস। তাদের সবচেয়ে বড় পার্থক্য হলো কোথায় ঘটে, কতটি অপত্য কোষ হয় এবং ক্রোমোজোম সংখ্যা কীভাবে বদলায়।",
   "পাঠ্যবইয়ের ভাষায় অ্যামাইটোসিস হলো প্রত্যক্ষ বিভাজন—নিউক্লিয়াস ও সাইটোপ্লাজম সরাসরি ভাগ হয়ে যায়। মাইটোসিসে সাধারণত দুটি সমগুণসম্পন্ন অপত্য কোষ তৈরি হয় এবং ক্রোমোজোম সংখ্যা অপরিবর্তিত থাকে। মিয়োসিসে একটি জনন মাতৃকোষ থেকে চারটি কোষ তৈরি হয় এবং ক্রোমোজোম সংখ্যা অর্ধেক হয়।"
  ],
  remember:["অ্যামাইটোসিস = প্রত্যক্ষ বিভাজন","মাইটোসিস = ১ কোষ → ২ সমজাতীয় কোষ","মিয়োসিস = ১ জনন মাতৃকোষ → ৪ হ্যাপ্লয়েড কোষ"],
  exam:"কোষ বিভাজন হলো এমন প্রক্রিয়া, যার মাধ্যমে একটি মাতৃকোষ বিভক্ত হয়ে দুই বা ততোধিক অপত্য কোষ সৃষ্টি করে।",
  question:"কোন বিভাজনে অপত্য কোষে ক্রোমোজোম সংখ্যা মাতৃকোষের অর্ধেক হয়?",options:["অ্যামাইটোসিস","মাইটোসিস","মিয়োসিস","সাইটোকাইনেসিস"],answer:2,
  why:"মিয়োসিসে প্রথম বিভাজনের পর ক্রোমোজোম সংখ্যা অর্ধেক হয়ে যায়।"
 },
 {
  id:2,title:"মাইটোসিস: প্রস্তুতি ও প্রোফেজ",short:"ইন্টারফেজ · ক্যারিওকাইনেসিস · প্রোফেজ",eyebrow:"পাঠ ২",
  hook:"মাইটোসিস হঠাৎ শুরু হয় না। কোষ আগে প্রস্তুতি নেয়, তারপর নিউক্লিয়াসের ভিতরে ধাপে ধাপে পরিবর্তন শুরু হয়।",
  explain:[
   "মাইটোসিসকে বড় করে দুটি অংশে ভাবতে পারো—প্রথমে নিউক্লিয়াসের বিভাজন (ক্যারিওকাইনেসিস), তারপর সাইটোপ্লাজমের বিভাজন (সাইটোকাইনেসিস)। বিভাজনের আগে কোষ ইন্টারফেজে প্রস্তুতি নেয় এবং DNA প্রতিলিপি সম্পন্ন করে।",
   "ক্যারিওকাইনেসিসকে বোঝার সুবিধার জন্য প্রোফেজ, প্রো-মেটাফেজ, মেটাফেজ, অ্যানাফেজ ও টেলোফেজ—এই পাঁচ ধাপে ভাগ করা হয়।",
   "প্রোফেজ মাইটোসিসের দীর্ঘস্থায়ী ধাপ। ক্রোমাটিন ঘনীভূত হয়ে দৃশ্যমান ক্রোমোজোম তৈরি করে। প্রতিটি প্রতিলিপিকৃত ক্রোমোজোমে দুটি সিস্টার ক্রোমাটিড থাকে, যেগুলো সেন্ট্রোমিয়ারে যুক্ত।"
  ],
  remember:["ইন্টারফেজ = প্রস্তুতি","ক্যারিওকাইনেসিস = নিউক্লিয়াসের বিভাজন","সাইটোকাইনেসিস = সাইটোপ্লাজমের বিভাজন","প্রোফেজ = ক্রোমোজোম স্পষ্ট হতে শুরু করে"],
  exam:"মাইটোসিসে ক্যারিওকাইনেসিসের পর সাইটোকাইনেসিস ঘটে; প্রোফেজে ক্রোমোজোম ঘনীভূত ও দৃশ্যমান হয়।",
  question:"মাইটোসিসের সবচেয়ে দীর্ঘস্থায়ী ধাপ কোনটি?",options:["প্রোফেজ","মেটাফেজ","অ্যানাফেজ","টেলোফেজ"],answer:0,
  why:"পাঠ্যবই অনুযায়ী প্রোফেজ মাইটোসিসের সবচেয়ে দীর্ঘস্থায়ী ধাপ।"
 },
 {
  id:3,title:"মাইটোসিস: প্রো-মেটাফেজ থেকে অ্যানাফেজ",short:"স্পিন্ডল · বিষুবীয় অঞ্চল · ক্রোমাটিড বিচ্ছেদ",eyebrow:"পাঠ ৩",
  hook:"এই অংশটাই মাইটোসিসের সবচেয়ে চলমান দৃশ্য—ক্রোমোজোমগুলো সাজে, ধরে রাখা হয়, তারপর দুই মেরুর দিকে টেনে নেওয়া হয়।",
  explain:[
   "প্রো-মেটাফেজে নিউক্লিয়ার পর্দা ও নিউক্লিওলাস বিলুপ্ত হতে থাকে এবং স্পিন্ডল তন্তু তৈরি হয়। স্পিন্ডল যন্ত্রের মাঝের অংশকে বিষুবীয় অঞ্চল বলা হয়।",
   "মেটাফেজে ক্রোমোজোমগুলো বিষুবীয় অঞ্চলে সারিবদ্ধ হয় এবং সেন্ট্রোমিয়ারের মাধ্যমে স্পিন্ডল তন্তুর সাথে যুক্ত থাকে। এই সময় ক্রোমোজোমগুলো সবচেয়ে খাটো ও মোটা দেখায়।",
   "অ্যানাফেজে সেন্ট্রোমিয়ার বিভক্ত হয়। সিস্টার ক্রোমাটিড আলাদা হয়ে অপত্য ক্রোমোজোম হিসেবে বিপরীত দুই মেরুর দিকে সরে যায়। এটাই দুই নতুন নিউক্লিয়াসে সমান ক্রোমোজোম পৌঁছানোর মূল ধাপ।"
  ],
  remember:["প্রো-মেটাফেজ = নিউক্লিয়ার পর্দা বিলুপ্ত + স্পিন্ডল তৈরি","মেটাফেজ = ক্রোমোজোম মাঝখানে সারিবদ্ধ","অ্যানাফেজ = সেন্ট্রোমিয়ার বিভক্ত + ক্রোমাটিড আলাদা"],
  exam:"অ্যানাফেজে সেন্ট্রোমিয়ার বিভক্ত হয়ে ক্রোমাটিডগুলো অপত্য ক্রোমোজোমে পরিণত হয় এবং বিপরীত মেরুর দিকে অগ্রসর হয়।",
  question:"মেটাফেজে ক্রোমোজোম কোথায় অবস্থান করে?",options:["একটি মেরুতে","বিষুবীয় অঞ্চলে","নিউক্লিওলাসে","কোষপ্রাচীরে"],answer:1,
  why:"মেটাফেজের প্রধান বৈশিষ্ট্য হলো বিষুবীয় অঞ্চলে ক্রোমোজোমের সারিবদ্ধতা।"
 },
 {
  id:4,title:"টেলোফেজ, সাইটোকাইনেসিস ও বৃদ্ধির সম্পর্ক",short:"দুটি নিউক্লিয়াস · কোষপ্লেট · ক্লিভেজ",eyebrow:"পাঠ ৪",
  hook:"এখন বিভাজন শেষ করার পালা। দুই পাশে ক্রোমোজোম পৌঁছেছে—এখন তাদের ঘিরে নতুন নিউক্লিয়াস বানাতে হবে এবং পুরো কোষটিও দুই ভাগ হবে।",
  explain:[
   "টেলোফেজে অপত্য ক্রোমোজোম দুই মেরুতে পৌঁছে। তাদের চারপাশে নতুন নিউক্লিয়ার পর্দা গঠিত হয়, নিউক্লিওলাস ফিরে আসে এবং ক্রোমোজোম আবার সরু ক্রোমাটিন অবস্থায় যেতে শুরু করে। ফলে দুটি অপত্য নিউক্লিয়াস তৈরি হয়।",
   "এরপর সাইটোকাইনেসিসে সাইটোপ্লাজম ভাগ হয়। উদ্ভিদকোষে মাঝখানে কোষপ্লেট তৈরি হয়ে নতুন কোষপ্রাচীর গঠন করে। প্রাণিকোষে কোষপর্দায় খাঁজ তৈরি হয়ে ভিতরের দিকে অগ্রসর হয়ে কোষকে দুই ভাগ করে।",
   "এই ধারাবাহিক মাইটোসিসের কারণেই ভ্রূণের বৃদ্ধি, শিশুর দেহবৃদ্ধি, উদ্ভিদের মূল-কাণ্ডের বৃদ্ধি এবং অনেক টিস্যুর ক্ষয়পূরণ সম্ভব হয়।"
  ],
  remember:["টেলোফেজ = দুটি নতুন নিউক্লিয়াস","উদ্ভিদকোষ = কোষপ্লেট","প্রাণিকোষ = ক্লিভেজ/খাঁজ","মাইটোসিস দেহবৃদ্ধি ও ক্ষয়পূরণে গুরুত্বপূর্ণ"],
  exam:"উদ্ভিদকোষে কোষপ্লেট এবং প্রাণিকোষে ক্লিভেজ ফারো তৈরির মাধ্যমে সাইটোকাইনেসিস সম্পন্ন হয়।",
  question:"উদ্ভিদকোষের সাইটোকাইনেসিসে কী গঠিত হয়?",options:["অ্যাস্টার রশ্মি","কোষপ্লেট","সেন্ট্রিওল","নিউক্লিওলাস"],answer:1,
  why:"উদ্ভিদকোষের মাঝ বরাবর কোষপ্লেট তৈরি হয়ে পরবর্তীতে নতুন বিভাজক প্রাচীর গঠন করে।"
 },
 {
  id:5,title:"মিয়োসিস-I: কেন ক্রোমোজোম অর্ধেক হয়",short:"হ্রাসমূলক বিভাজন · 2n → n",eyebrow:"পাঠ ৫",
  hook:"যদি শুক্রাণু ও ডিম্বাণু দুটিতেই দেহকোষের মতো পূর্ণ ক্রোমোজোম থাকত, তাহলে প্রতিটি প্রজন্মে ক্রোমোজোম সংখ্যা দ্বিগুণ হয়ে যেত। প্রকৃতি এই সমস্যা সমাধান করে মিয়োসিস দিয়ে।",
  explain:[
   "মিয়োসিস প্রধানত জননকোষ তৈরির সাথে সম্পর্কিত। একটি ডিপ্লয়েড (2n) জনন মাতৃকোষ থেকে শেষ পর্যন্ত চারটি হ্যাপ্লয়েড (n) কোষ তৈরি হয়।",
   "মিয়োসিস-I কে হ্রাসমূলক বিভাজন বলা হয়, কারণ homologous chromosome জোড়াগুলো আলাদা হয়ে যায় এবং কোষে ক্রোমোজোম সেট অর্ধেক হয়।",
   "ফলে হ্যাপ্লয়েড শুক্রাণু ও হ্যাপ্লয়েড ডিম্বাণু নিষেকে মিললে জাইগোট আবার ডিপ্লয়েড হয়। এভাবে প্রজাতির স্বাভাবিক ক্রোমোজোম সংখ্যা প্রজন্মের পর প্রজন্ম বজায় থাকে।"
  ],
  remember:["ডিপ্লয়েড = 2n","হ্যাপ্লয়েড = n","মিয়োসিস-I = হ্রাসমূলক বিভাজন","দুই হ্যাপ্লয়েড গ্যামেট → নিষেক → ডিপ্লয়েড জাইগোট"],
  exam:"মিয়োসিসে জননকোষের ক্রোমোজোম সংখ্যা অর্ধেক হওয়ায় নিষেকের পর প্রজাতির স্বাভাবিক ক্রোমোজোম সংখ্যা পুনঃস্থাপিত হয়।",
  question:"মিয়োসিস-I এর প্রধান ফল কী?",options:["DNA সম্পূর্ণ নষ্ট হয়","ক্রোমোজোম সংখ্যা দ্বিগুণ হয়","ক্রোমোজোম সেট অর্ধেক হয়","একটি কোষই থাকে"],answer:2,
  why:"মিয়োসিস-I-এ homologous chromosome আলাদা হওয়ায় 2n থেকে n অবস্থা তৈরি হয়।"
 },
 {
  id:6,title:"মিয়োসিস-II ও চারটি অপত্য কোষ",short:"দ্বিতীয় বিভাজন · চার হ্যাপ্লয়েড কোষ",eyebrow:"পাঠ ৬",
  hook:"মিয়োসিস-I শেষে দুটি কোষ হয়েছে, কিন্তু প্রক্রিয়া এখনও শেষ নয়। প্রতিটি কোষ আরও একবার বিভাজিত হয়ে মোট চারটি কোষ তৈরি করবে।",
  explain:[
   "মিয়োসিসে নিউক্লিয়াস পরপর দুবার বিভাজিত হয়—মিয়োসিস-I এবং মিয়োসিস-II। DNA প্রতিলিপি একবারই ঘটে, কিন্তু বিভাজন ঘটে দুবার।",
   "মিয়োসিস-II অনেক দিক থেকে মাইটোসিসের মতো। এখানে সিস্টার ক্রোমাটিডগুলো আলাদা হয় এবং মিয়োসিস-I থেকে পাওয়া দুটি কোষ প্রত্যেকে আবার দুইটি কোষে বিভক্ত হয়।",
   "ফলাফল—একটি ডিপ্লয়েড জনন মাতৃকোষ থেকে চারটি হ্যাপ্লয়েড কোষ। যৌন জনন ও বংশগত ধারাবাহিকতায় এই প্রক্রিয়া অত্যন্ত গুরুত্বপূর্ণ।"
  ],
  remember:["একবার DNA প্রতিলিপি, দুইবার নিউক্লিয়ার বিভাজন","মিয়োসিস-I শেষে ২ কোষ","মিয়োসিস-II শেষে মোট ৪ হ্যাপ্লয়েড কোষ"],
  exam:"মিয়োসিসে একটি মাতৃকোষ পরপর দুইবার বিভাজিত হয়ে চারটি হ্যাপ্লয়েড অপত্য কোষ সৃষ্টি করে।",
  question:"একটি ডিপ্লয়েড জনন মাতৃকোষের পূর্ণ মিয়োসিস শেষে সাধারণভাবে কয়টি অপত্য কোষ হয়?",options:["১","২","৪","৮"],answer:2,
  why:"মিয়োসিস-I-এ ২টি, এরপর মিয়োসিস-II-এ প্রতিটি আবার ভাগ হয়ে মোট ৪টি কোষ হয়।"
 },
 {
  id:7,title:"ক্রোমোজোম, ক্রোমাটিড, সেন্ট্রোমিয়ার ও জিন",short:"বংশগতির ভৌত ভিত্তি",eyebrow:"পাঠ ৭",
  hook:"তোমার চোখের রং, চুলের প্রকৃতি বা আরও অসংখ্য বৈশিষ্ট্যের তথ্য কোথায় রাখা থাকে? উত্তরটি কোষের নিউক্লিয়াসের গভীরে।",
  explain:[
   "নিউক্লিয়াসে থাকা সুতা-সদৃশ গঠনগুলোর মধ্যে বংশগত তথ্য বহনকারী সংগঠিত গঠন হলো ক্রোমোজোম। কোষ বিভাজনের সময় এগুলো ঘনীভূত হয়ে স্পষ্ট দেখা যায়।",
   "প্রতিলিপিকৃত একটি ক্রোমোজোমে দুটি সিস্টার ক্রোমাটিড থাকে; তারা সেন্ট্রোমিয়ার অঞ্চলে যুক্ত। স্পিন্ডল তন্তু এই অঞ্চলের বিশেষ অংশে যুক্ত হয়ে বিভাজনের সময় ক্রোমোজোম সরাতে সাহায্য করে।",
   "জিন হলো DNA-এর একটি কার্যকর অংশ, যা কোনো বৈশিষ্ট্য বা জৈবিক কাজের জন্য প্রয়োজনীয় তথ্য বহন করে। ক্রোমোজোমে বহু জিন থাকে। তাই ক্রোমোজোমকে বংশগতির ভৌত বাহক বলা হয়।"
  ],
  remember:["ক্রোমোজোমে DNA থাকে","জিন = DNA-এর নির্দিষ্ট কার্যকর অংশ","ক্রোমাটিড = প্রতিলিপিকৃত ক্রোমোজোমের এক কপি-অংশ","সেন্ট্রোমিয়ার = সিস্টার ক্রোমাটিড যুক্ত থাকার অঞ্চল"],
  exam:"জিন হলো ক্রোমোজোমে অবস্থিত DNA-এর কার্যকর অংশ, যা বংশগত বৈশিষ্ট্য নিয়ন্ত্রণে ভূমিকা রাখে।",
  question:"জিন প্রধানত কী দিয়ে গঠিত?",options:["লিপিড","DNA-এর নির্দিষ্ট অংশ","শুধু RNA","সাইটোপ্লাজম"],answer:1,
  why:"জিন হলো DNA অণুর নির্দিষ্ট অংশ, যেখানে বংশগত তথ্য থাকে।"
 },
 {
  id:8,title:"DNA: বংশগত তথ্যের প্রধান ধারক",short:"ডাবল হেলিক্স · A–T · G–C",eyebrow:"পাঠ ৮",
  hook:"একটি কোষ কীভাবে জানে কোন প্রোটিন বানাতে হবে, কীভাবে কাজ করতে হবে, আর কোন বৈশিষ্ট্য পরবর্তী প্রজন্মে যেতে পারে? DNA সেই নির্দেশনার প্রধান ভাণ্ডার।",
  explain:[
   "DNA-এর পূর্ণ নাম Deoxyribonucleic Acid। অধিকাংশ জীবের বংশগত তথ্য DNA-তেই সংরক্ষিত থাকে। DNA ক্রোমোজোমের প্রধান উপাদান এবং জিন হলো DNA-এর নির্দিষ্ট অংশ।",
   "DNA-কে একটি পাকানো মইয়ের মতো কল্পনা করতে পারো—দুটি strand একে অন্যকে ঘিরে double helix তৈরি করে। চার ধরনের base হলো A, T, G ও C। সাধারণভাবে A-এর বিপরীতে T এবং G-এর বিপরীতে C জোড়া বাঁধে।",
   "কোষ বিভাজনের আগে DNA প্রতিলিপি তৈরি করে, যাতে নতুন কোষগুলো প্রয়োজনীয় বংশগত তথ্য পায়। এই ধারণাটিই বোঝায় কেন মাইটোসিসে দুই অপত্য কোষে সমগুণসম্পন্ন তথ্য পৌঁছানো সম্ভব।"
  ],
  remember:["DNA = Deoxyribonucleic Acid","A ↔ T","G ↔ C","জিন DNA-এর অংশ","বিভাজনের আগে DNA প্রতিলিপি হয়"],
  exam:"DNA জীবের বংশগত তথ্যের প্রধান রাসায়নিক ধারক; ক্রোমোজোমে অবস্থিত DNA-এর কার্যকর অংশকে জিন বলা হয়।",
  question:"DNA-তে A (Adenine)-এর পরিপূরক base কোনটি?",options:["G","C","T","U"],answer:2,
  why:"DNA-তে Adenine (A) সাধারণত Thymine (T)-এর সঙ্গে জোড়া বাঁধে।"
 },
 {
  id:9,title:"RNA, বংশগতি ও পুরো অধ্যায়ের সংযোগ",short:"DNA → RNA → প্রোটিন → বৈশিষ্ট্য",eyebrow:"পাঠ ৯",
  hook:"বংশগত তথ্য কীভাবে বাবা-মা থেকে গ্যামেট, নিষেক ও সন্তানের বৈশিষ্ট্যে পৌঁছায়? তারপর DNA-র তথ্য ব্যবহার করে কোষ কাজ করবে কীভাবে? এই পাঠে heredity, gene transfer এবং RNA-র ভূমিকা একসাথে জুড়বে।",
  explain:[
   "RNA-এর পূর্ণ নাম Ribonucleic Acid। কোষে বিভিন্ন ধরনের RNA আছে। সহজভাবে বললে, DNA-র তথ্য ব্যবহার করে প্রোটিন তৈরির প্রক্রিয়ায় RNA গুরুত্বপূর্ণ ভূমিকা নেয়। প্রোটিন কোষের গঠন ও কাজের সঙ্গে যুক্ত, তাই জিনের তথ্য থেকে বৈশিষ্ট্য প্রকাশের সেতু তৈরি হয়।",
   "বংশগতি মানে পিতা-মাতার বৈশিষ্ট্য সম্পর্কিত তথ্য সন্তান-সন্ততিতে সঞ্চারিত হওয়া। মেন্ডেল বংশগতির নিয়ম বোঝার ভিত্তি তৈরি করেছিলেন, তাই তাকে জিনতত্ত্বের জনক বলা হয়।",
   "এখন পুরো অধ্যায়টি এক লাইনে জুড়ো: মাইটোসিস দেহের বৃদ্ধি ও কোষের ধারাবাহিকতা বজায় রাখে; মিয়োসিস জননকোষে ক্রোমোজোম সংখ্যা অর্ধেক করে; ক্রোমোজোম DNA ও জিন বহন করে; আর জিনের তথ্য কোষে কাজ করে বৈশিষ্ট্য প্রকাশে সাহায্য করে।"
  ],
  remember:["বংশগতি = বৈশিষ্ট্য-সংক্রান্ত তথ্যের প্রজন্মান্তরে সঞ্চারণ","মেন্ডেল = জিনতত্ত্বের জনক","RNA প্রোটিন তৈরির প্রক্রিয়ায় গুরুত্বপূর্ণ","মাইটোসিস + মিয়োসিস + DNA/জিন = বৃদ্ধি ও বংশগতির মূল গল্প"],
  exam:"ক্রোমোজোম জিনকে বহন করে, DNA বংশগত তথ্য ধারণ করে এবং RNA সেই তথ্যের প্রকাশে গুরুত্বপূর্ণ ভূমিকা পালন করে।",
  question:"কোন ধারাটি জিনের তথ্য থেকে বৈশিষ্ট্য প্রকাশের ধারণা সবচেয়ে ভালো বোঝায়?",options:["RNA → DNA → কোষপ্রাচীর","DNA → RNA → প্রোটিন → বৈশিষ্ট্য","ক্রোমোজোম → পানি → RNA","মাইটোসিস → আলো → DNA"],answer:1,
  why:"DNA-র তথ্য RNA-এর মাধ্যমে প্রোটিন তৈরিতে ব্যবহৃত হয়; প্রোটিনের কাজ বৈশিষ্ট্য প্রকাশে ভূমিকা রাখে।"
 }
];

const mitosisStages=[
 {name:"ইন্টারফেজ",note:"কোষ প্রস্তুতি নেয়, DNA প্রতিলিপি সম্পন্ন হয়।",pos:"rest"},
 {name:"প্রোফেজ",note:"ক্রোমাটিন ঘনীভূত হয়ে ক্রোমোজোম স্পষ্ট হয়।",pos:"cluster"},
 {name:"প্রো-মেটাফেজ",note:"নিউক্লিয়ার পর্দা ভাঙে, স্পিন্ডল তৈরি হয়।",pos:"scatter"},
 {name:"মেটাফেজ",note:"ক্রোমোজোমগুলো বিষুবীয় অঞ্চলে সারিবদ্ধ হয়।",pos:"middle"},
 {name:"অ্যানাফেজ",note:"সিস্টার ক্রোমাটিড আলাদা হয়ে দুই মেরুতে যায়।",pos:"apart"},
 {name:"টেলোফেজ",note:"দুই পাশে নতুন নিউক্লিয়াস তৈরি হয়।",pos:"poles"},
 {name:"সাইটোকাইনেসিস",note:"সাইটোপ্লাজম ভাগ হয়ে দুটি অপত্য কোষ তৈরি হয়।",pos:"split"}
];

function CellDots({count}:{count:number}){
 const visible=Math.min(count,64);
 return <div className={styles.dotField}>{Array.from({length:visible},(_,i)=><i key={i}/>)}{count>64&&<span>+ আরও {count-64}</span>}</div>
}

function DivisionLab(){
 const[type,setType]=useState<"amitosis"|"mitosis"|"meiosis">("mitosis");
 const data={
  amitosis:{label:"অ্যামাইটোসিস",cells:2,chrom:"সরাসরি বিভাজন",copy:"নিউক্লিয়াস ও সাইটোপ্লাজম সরাসরি ভাগ হয়।"},
  mitosis:{label:"মাইটোসিস",cells:2,chrom:"ক্রোমোজোম সংখ্যা একই",copy:"দুটি সমগুণসম্পন্ন অপত্য কোষ।"},
  meiosis:{label:"মিয়োসিস",cells:4,chrom:"ক্রোমোজোম সংখ্যা অর্ধেক",copy:"চারটি হ্যাপ্লয়েড অপত্য কোষ।"}
 }[type];
 return <div className={styles.simCard}>
  <div className={styles.simHead}><div><span>ইন্টার‌্যাক্টিভ তুলনা</span><strong>একটি মাতৃকোষ—তিন রকম ফল</strong></div><FlaskConical/></div>
  <div className={styles.segmented}>{(["amitosis","mitosis","meiosis"] as const).map(x=><button key={x} className={type===x?styles.activeSeg:""} onClick={()=>setType(x)}>{x==="amitosis"?"অ্যামাইটোসিস":x==="mitosis"?"মাইটোসিস":"মিয়োসিস"}</button>)}</div>
  <div className={styles.divisionStage}>
   <div className={styles.motherCell}><span>2n</span><i/></div>
   <div className={styles.flowArrow}>→</div>
   <div className={styles.offspring+" "+styles["cells"+data.cells]}>{Array.from({length:data.cells},(_,i)=><div key={i}><span>{type==="meiosis"?"n":"2n"}</span></div>)}</div>
  </div>
  <div className={styles.simCaption}><strong>{data.label}</strong><span>{data.chrom}</span><p>{data.copy}</p></div>
 </div>
}

function MitosisLab(){
 const[stage,setStage]=useState(0);
 const s=mitosisStages[stage];
 return <div className={styles.simCard}>
  <div className={styles.simHead}><div><span>লাইভ অ্যানিমেশন</span><strong>মাইটোসিস ধাপে ধাপে</strong></div><Atom/></div>
  <div className={styles.phaseTabs}>{mitosisStages.map((x,i)=><button key={x.name} onClick={()=>setStage(i)} className={stage===i?styles.phaseOn:""}>{x.name}</button>)}</div>
  <div className={styles.cellStage+" "+styles[s.pos]}>
   <div className={styles.spindleLine+" "+styles.sp1}/><div className={styles.spindleLine+" "+styles.sp2}/>
   <div className={styles.nucleusBubble}/>
   {[0,1,2,3].map(i=><span className={styles.chromosome+" "+styles["chr"+i]} key={i}>×</span>)}
   <div className={styles.daughterNucleus+" "+styles.dn1}/><div className={styles.daughterNucleus+" "+styles.dn2}/>
  </div>
  <div className={styles.simCaption}><strong>{s.name}</strong><p>{s.note}</p></div>
  <div className={styles.simControls}><button onClick={()=>setStage(v=>Math.max(0,v-1))} disabled={stage===0}><ChevronLeft/>আগের ধাপ</button><span>{stage+1}/{mitosisStages.length}</span><button onClick={()=>setStage(v=>Math.min(mitosisStages.length-1,v+1))} disabled={stage===mitosisStages.length-1}>পরের ধাপ<ChevronRight/></button></div>
 </div>
}

function GrowthLab(){
 const[round,setRound]=useState(5);
 const count=2**round;
 return <div className={styles.simCard}>
  <div className={styles.simHead}><div><span>সংখ্যায় দেখো</span><strong>বারবার মাইটোসিসে কোষ কত দ্রুত বাড়ে?</strong></div><Sparkles/></div>
  <div className={styles.growthNumber}><span>১টি কোষ</span><strong>{count.toLocaleString("bn-BD")}টি কোষ</strong></div>
  <input className={styles.range} type="range" min="0" max="10" value={round} onChange={e=>setRound(Number(e.target.value))}/>
  <div className={styles.rangeLabels}><span>শুরু</span><span>{round} বার বিভাজন</span><span>১০ বার</span></div>
  <CellDots count={count}/>
  <p className={styles.simFoot}>সরল মডেল: প্রতিবার প্রতিটি কোষ একবার করে দুই ভাগ হলে মোট কোষ ≈ 2<sup>n</sup>। বাস্তব দেহে সব কোষ একই সময়ে এভাবে ভাগ হয় না।</p>
 </div>
}

function MeiosisLab(){
 const[step,setStep]=useState(0);
 const stages=[
  {t:"মাতৃ জনন কোষ",sub:"ডিপ্লয়েড (2n)",cells:1,half:false},
  {t:"মিয়োসিস-I",sub:"homologous chromosome আলাদা",cells:2,half:true},
  {t:"মিয়োসিস-II",sub:"sister chromatid আলাদা",cells:4,half:true},
  {t:"ফলাফল",sub:"চারটি হ্যাপ্লয়েড (n) কোষ",cells:4,half:true}
 ];
 const s=stages[step];
 return <div className={styles.simCard}>
  <div className={styles.simHead}><div><span>ক্রোমোজোম ট্র্যাকার</span><strong>2n থেকে n — দুই ধাপের গল্প</strong></div><GitBranch/></div>
  <div className={styles.meiosisTrack}>{stages.map((x,i)=><button key={x.t} className={step===i?styles.phaseOn:""} onClick={()=>setStep(i)}><b>{i+1}</b><span>{x.t}</span></button>)}</div>
  <div className={styles.meiCells}>{Array.from({length:s.cells},(_,i)=><div key={i} className={styles.meiCell}><span>{s.half?"n":"2n"}</span><div className={styles.meiChrom}>{s.half?"×  ×":"××  ××"}</div></div>)}</div>
  <div className={styles.simCaption}><strong>{s.t}</strong><p>{s.sub}</p></div>
  <div className={styles.simControls}><button onClick={()=>setStep(v=>Math.max(0,v-1))} disabled={step===0}><ChevronLeft/>আগে</button><span>{step+1}/4</span><button onClick={()=>setStep(v=>Math.min(3,v+1))} disabled={step===3}>পরে<ChevronRight/></button></div>
 </div>
}

function ChromosomeExplorer(){
 const[level,setLevel]=useState(0);
 const levels=[
  {name:"কোষ",big:"Cell",copy:"কোষের ভিতরে নিউক্লিয়াস থাকে।"},
  {name:"নিউক্লিয়াস",big:"Nucleus",copy:"নিউক্লিয়াসে ক্রোমোজোম থাকে।"},
  {name:"ক্রোমোজোম",big:"Chromosome",copy:"ক্রোমোজোম DNA ও প্রোটিন দিয়ে গঠিত সংগঠিত কাঠামো।"},
  {name:"DNA",big:"DNA",copy:"DNA-তে বংশগত তথ্য সংরক্ষিত থাকে।"},
  {name:"জিন",big:"Gene",copy:"জিন হলো DNA-এর নির্দিষ্ট কার্যকর অংশ।"}
 ];
 return <div className={styles.simCard}>
  <div className={styles.simHead}><div><span>জুম ইন</span><strong>কোষ থেকে জিন পর্যন্ত</strong></div><Dna/></div>
  <div className={styles.zoomTrail}>{levels.map((x,i)=><button key={x.name} onClick={()=>setLevel(i)} className={level===i?styles.phaseOn:""}>{x.name}</button>)}</div>
  <div className={styles.zoomStage}>
   <div className={styles.zoomVisual+" "+styles["zoom"+level]}>
    <div className={styles.cellShell}/><div className={styles.nucleusShell}/><div className={styles.xChrom}>X</div>
    <div className={styles.dnaHelix}>{Array.from({length:9},(_,i)=><i key={i}/>)}</div>
    <div className={styles.geneMark}>GENE</div>
   </div>
   <div><span>স্তর {level+1}</span><strong>{levels[level].big}</strong><p>{levels[level].copy}</p></div>
  </div>
 </div>
}

function DnaLab(){
 const[bases,setBases]=useState(["A","G","T","C","C","A"]);
 const comp=(b:string)=>({A:"T",T:"A",G:"C",C:"G"} as Record<string,string>)[b]||"?";
 function randomize(){const b=["A","T","G","C"];setBases(Array.from({length:6},()=>b[Math.floor(Math.random()*4)]))}
 return <div className={styles.simCard}>
  <div className={styles.simHead}><div><span>বেস-পেয়ার ল্যাব</span><strong>DNA-এর অপর strand পূরণ করো</strong></div><Dna/></div>
  <div className={styles.basePairs}>
   <div>{bases.map((b,i)=><span key={i} className={styles["base"+b]}>{b}</span>)}</div>
   <div className={styles.pairLines}>{bases.map((_,i)=><i key={i}/>)}</div>
   <div>{bases.map((b,i)=><span key={i} className={styles["base"+comp(b)]}>{comp(b)}</span>)}</div>
  </div>
  <div className={styles.ruleRow}><b>A ↔ T</b><b>G ↔ C</b><button onClick={randomize}><RefreshCcw/>নতুন উদাহরণ</button></div>
  <p className={styles.simFoot}>এটি base pairing বোঝানোর সরল শিক্ষণ-চিত্র; DNA-এর প্রকৃত ত্রিমাত্রিক গঠন আরও জটিল।</p>
 </div>
}

function HeredityLab(){
 const[focus,setFocus]=useState(0);
 const chain=[
  {t:"DNA",d:"বংশগত তথ্য সংরক্ষণ করে"},
  {t:"RNA",d:"তথ্য ব্যবহারের পথে গুরুত্বপূর্ণ ভূমিকা নেয়"},
  {t:"Protein",d:"কোষের গঠন ও কাজ সম্পাদন করে"},
  {t:"Trait",d:"বৈশিষ্ট্য প্রকাশে অবদান রাখে"}
 ];
 return <div className={styles.simCard}>
  <div className={styles.simHead}><div><span>তথ্যের পথ</span><strong>জিনের তথ্য থেকে বৈশিষ্ট্য</strong></div><GitBranch/></div>
  <div className={styles.infoFlow}>{chain.map((x,i)=><button key={x.t} className={focus===i?styles.flowOn:""} onClick={()=>setFocus(i)}><strong>{x.t}</strong>{i<chain.length-1&&<ArrowRight/>}</button>)}</div>
  <div className={styles.flowExplain}><span>{chain[focus].t}</span><p>{chain[focus].d}</p></div>
  <div className={styles.generation}><div><span>মা</span><small>জিনের অর্ধেক সেট</small></div><b>+</b><div><span>বাবা</span><small>জিনের অর্ধেক সেট</small></div><b>→</b><div className={styles.child}><span>সন্তান</span><small>দুই উৎসের জিনের সমন্বয়</small></div></div>
  <p className={styles.simFoot}>বৈশিষ্ট্য সাধারণত শুধু একটি জিনে নির্ধারিত হয় না; অনেক বৈশিষ্ট্যে একাধিক জিন ও পরিবেশ দুটোই ভূমিকা রাখে।</p>
 </div>
}

function DetailBox({lesson}:{lesson:number}){
 if(lesson===1)return <div className={styles.detailGrid}>
  <div><strong>অ্যামাইটোসিস</strong><span>প্রত্যক্ষ বিভাজন</span><p>পাঠ্যবইয়ে ব্যাকটেরিয়া, ইস্ট, ছত্রাক ও অ্যামিবার মতো এককোষী জীবের উদাহরণ দেওয়া হয়েছে। মাতৃকোষ সরাসরি দুই ভাগে বিভক্ত হয়।</p></div>
  <div><strong>মাইটোসিস</strong><span>সমীকরণিক বিভাজন</span><p>উদ্ভিদ ও প্রাণীর দেহকোষে ঘটে। ১টি মাতৃকোষ থেকে ২টি অপত্য কোষ; ক্রোমোজোম সংখ্যা একই থাকে।</p></div>
  <div><strong>মিয়োসিস</strong><span>হ্রাসমূলক বিভাজন</span><p>জননকোষ তৈরির সময় ঘটে। ১টি মাতৃকোষ থেকে ৪টি কোষ; ক্রোমোজোম সংখ্যা অর্ধেক হয়।</p></div>
 </div>;
 if(lesson===2)return <div className={styles.detailSplit}>
  <div><span>মাইটোসিস কোথায় হয়?</span><p>প্রাণীর দেহকোষে, ভ্রূণের বৃদ্ধিতে এবং উদ্ভিদের বর্ধনশীল ভাজক টিস্যুতে—যেমন মূল ও কাণ্ডের অগ্রভাগ, কুঁড়ি ও বর্ধনশীল অংশে।</p></div>
  <div><span>কোথায় সাধারণত হয় না?</span><p>পাঠ্যবইয়ের উদাহরণ: পরিণত স্নায়ুকোষ, স্তন্যপায়ী প্রাণীর পরিণত লোহিত রক্তকণিকা ও অনুচক্রিকা এবং উদ্ভিদের অনেক স্থায়ী টিস্যু।</p></div>
 </div>;
 if(lesson===3)return <div className={styles.phaseStrip}><div><b>প্রো-মেটাফেজ</b><span>পর্দা বিলুপ্ত · স্পিন্ডল তৈরি</span></div><i>→</i><div><b>মেটাফেজ</b><span>মাঝখানে সারি</span></div><i>→</i><div><b>অ্যানাফেজ</b><span>ক্রোমাটিড দুই মেরুতে</span></div></div>;
 if(lesson===4)return <div className={styles.compareBox}><div><strong>উদ্ভিদকোষ</strong><p>মাঝখানে কোষপ্লেট তৈরি হয় → প্লেট বড় হয়ে নতুন বিভাজক প্রাচীর গঠন করে।</p></div><div><strong>প্রাণিকোষ</strong><p>কোষপর্দায় cleavage furrow বা খাঁজ তৈরি হয় → ভিতরের দিকে এগিয়ে দুই কোষ আলাদা করে।</p></div></div>;
 if(lesson===5)return <div className={styles.detailSplit}>
  <div><span>মিয়োসিস কোথায় ঘটে?</span><p>জনন মাতৃকোষে। সপুষ্পক উদ্ভিদের পরাগধানী ও ডিম্বকে এবং উন্নত প্রাণীর শুক্রাশয় ও ডিম্বাশয়ে জননকোষ তৈরির সঙ্গে সম্পর্কিত।</p></div>
  <div><span>কেন দরকার?</span><p>গ্যামেটে n ক্রোমোজোম রাখে, যাতে নিষেকের সময় n+n = 2n হয়ে প্রজাতির স্বাভাবিক ক্রোমোজোম সংখ্যা বজায় থাকে।</p></div>
 </div>;
 if(lesson===6)return <div className={styles.compareTable}>
  <div className={styles.compareHead}><b>বিষয়</b><b>মাইটোসিস</b><b>মিয়োসিস</b></div>
  <div><span>বিভাজন</span><span>১ বার</span><span>২ বার</span></div>
  <div><span>অপত্য কোষ</span><span>২টি</span><span>৪টি</span></div>
  <div><span>ক্রোমোজোম</span><span>সংখ্যা একই</span><span>সংখ্যা অর্ধেক</span></div>
  <div><span>প্রধান ভূমিকা</span><span>বৃদ্ধি, ক্ষয়পূরণ</span><span>গ্যামেট সৃষ্টি, সংখ্যা ধ্রুব রাখা</span></div>
 </div>;
 if(lesson===7)return <div className={styles.chromosomeMath}>
  <div><span>মানুষের দেহকোষ</span><strong>46 = 23 জোড়া</strong><small>ডিপ্লয়েড (2n)</small></div><div className={styles.mathArrow}>→ মিয়োসিস →</div><div><span>মানুষের গ্যামেট</span><strong>23</strong><small>হ্যাপ্লয়েড (n)</small></div><div className={styles.mathArrow}>+ 23 →</div><div><span>জাইগোট</span><strong>46</strong><small>আবার 2n</small></div>
 </div>;
 if(lesson===8)return <div className={styles.detailGrid}>
  <div><strong>Chromosome</strong><span>প্যাকেজ</span><p>DNA-কে সংগঠিতভাবে বহন করে।</p></div>
  <div><strong>DNA</strong><span>তথ্যের অণু</span><p>বংশগত তথ্য সংরক্ষণ করে এবং প্রতিলিপি করতে পারে।</p></div>
  <div><strong>Gene</strong><span>DNA-এর অংশ</span><p>নির্দিষ্ট কার্যকর তথ্য বহন করে; অনেক জিন মিলে বৈশিষ্ট্যে অবদান রাখতে পারে।</p></div>
 </div>;
 return <div className={styles.detailSplit}>
  <div><span>মেন্ডেল কেন গুরুত্বপূর্ণ?</span><p>গ্রেগর জোহান মেন্ডেল বৈশিষ্ট্য প্রজন্মে কীভাবে সঞ্চারিত হয় তা পরীক্ষার মাধ্যমে ব্যাখ্যার ভিত্তি তৈরি করেন; তাই তাকে জিনতত্ত্বের জনক বলা হয়।</p></div>
  <div><span>RNA নিয়ে কী মনে রাখবে?</span><p>RNA প্রোটিন তৈরির প্রক্রিয়ায় গুরুত্বপূর্ণ। কিছু ভাইরাসে RNA-ই বংশগত উপাদান হিসেবে কাজ করে—পাঠ্যবইয়ে তামাক মোজাইক ভাইরাসের উদাহরণ দেওয়া হয়।</p></div>
 </div>;
}

function Simulation({lesson}:{lesson:number}){ return <LibraryLabs lesson={lesson}/>; }

export default function ChapterTwo(){
 const[active,setActive]=useState(1);
 useEffect(()=>{const lessonNumber=Number(new URLSearchParams(window.location.search).get("lesson"));if(Number.isInteger(lessonNumber)&&lessonNumber>=1&&lessonNumber<=9)setActive(lessonNumber)},[]);
 const[answers,setAnswers]=useState<Record<number,number>>({});
 const[done,setDone]=useState<Record<number,boolean>>({});
 const lesson=lessons[active-1];
 const score=Object.values(done).filter(Boolean).length;
 const progress=Math.round((score/9)*100);

 function answer(i:number){setAnswers(v=>({...v,[active]:i}));setDone(v=>({...v,[active]:i===lesson.answer}))}
 function next(){setActive(v=>Math.min(9,v+1));window.scrollTo({top:0,behavior:"smooth"})}
 function prev(){setActive(v=>Math.max(1,v-1));window.scrollTo({top:0,behavior:"smooth"})}

 return <main className={styles.page}>
  <header className={styles.topbar}>
   <Link href="/dashboard" className={styles.back}><ArrowLeft/>ডেস্কে ফিরি</Link>
   <Link href="/" className={styles.brand}><img src="/bujhi-icon.png" alt=""/>Bujhi</Link>
   <div className={styles.progressMini}><span>{score}/9 সম্পন্ন</span><i><b style={{width:progress+"%"}}/></i></div>
  </header>

  <section className={styles.hero}>
   <div>
    <p>Class 8 · Science · Chapter 2</p>
    <h1>জীবের বৃদ্ধি<br/><em>ও বংশগতি</em></h1>
    <span>পাঠ ১–৯ · শিক্ষক-স্টাইল ব্যাখ্যা · অ্যানিমেশন · সিমুলেশন · নিজেকে যাচাই</span>
   </div>
   <div className={styles.heroNote}><Lightbulb/><p><strong>এই অধ্যায়ের বড় প্রশ্ন</strong>একটি কোষ থেকে দেহ কীভাবে বড় হয়, আর মা-বাবার বৈশিষ্ট্যের তথ্য কীভাবে পরবর্তী প্রজন্মে যায়?</p></div>
  </section>

  <div className={styles.shell}>
   <aside className={styles.sidebar}>
    <div className={styles.sideTitle}><BookOpen/><div><span>অধ্যায়ের মানচিত্র</span><strong>৯টি পাঠ</strong></div></div>
    <nav>{lessons.map(l=><button key={l.id} onClick={()=>setActive(l.id)} className={active===l.id?styles.activeLesson:""}><b>{String(l.id).padStart(2,"0")}</b><span><strong>{l.title}</strong><small>{l.short}</small></span>{done[l.id]&&<CheckCircle2/>}</button>)}</nav>
    <div className={styles.sideTip}><Target/><p><strong>শুধু মুখস্থ নয়</strong>প্রতিটি animation-এ কী বদলাচ্ছে তা নিজের ভাষায় বলার চেষ্টা করো।</p></div>
   </aside>

   <article className={styles.lesson}>
    <div className={styles.lessonTop}>
     <div><p>{lesson.eyebrow}</p><h2>{lesson.title}</h2><span>{lesson.short}</span></div>
     <div className={styles.lessonNumber}>{String(active).padStart(2,"0")}<small>/09</small></div>
    </div>

    <section className={styles.teacherCard}>
     <div className={styles.teacherBadge}><GraduationCap/><span>Teacher বলছে</span></div>
     <p>{lesson.hook}</p>
    </section>

    <section className={styles.explain}>
     <div className={styles.sectionLabel}><span>01</span><strong>আগে বুঝে নিই</strong></div>
     {lesson.explain.map((p,i)=><p key={i}>{p}</p>)}
     <DetailBox lesson={active}/>
    </section>

    <section>
     <div className={styles.sectionLabel}><span>02</span><strong>চোখের সামনে দেখো</strong></div>
     <Simulation lesson={active}/>
     {active===7&&<p style={{margin:"12px 0 0",fontSize:".82rem",color:"#6b584e"}}><strong style={{color:"#990000"}}>Teacher use:</strong> প্রথমে শিক্ষার্থীদের জিজ্ঞেস করুন বংশগত তথ্য কোথায় থাকে। তারপর continuous zoom-এ Cell → Nucleus → Chromosome → DNA → Gene অনুসরণ করিয়ে শেষে hierarchy মুখে বলতে বলুন।</p>}
     {active===9&&<p style={{margin:"12px 0 0",fontSize:".82rem",color:"#6b584e"}}><strong style={{color:"#990000"}}>Teacher use:</strong> Parent genotype বেছে শুরু করুন → কোন allele গ্যামেটে গেল তা অনুসরণ করুন → fertilization করান → offspring genotype/phenotype দেখান → শেষে Punnett probability আর বাস্তব sample outcome-এর পার্থক্য আলোচনা করুন।</p>}
     
    </section>

    <section className={styles.twoCols}>
     <div className={styles.rememberCard}><div className={styles.cardHead}><Lightbulb/>মনে রাখবে</div>{lesson.remember.map((x,i)=><p key={i}><b>{i+1}</b>{x}</p>)}</div>
     <div className={styles.examCard}><div className={styles.cardHead}><BookOpen/>পরীক্ষায় লেখার মতো</div><p>{lesson.exam}</p></div>
    </section>

    <section className={styles.check}>
     <div className={styles.sectionLabel}><span>03</span><strong>নিজেকে যাচাই</strong></div>
     <div className={styles.question}><CircleHelp/><div><span>একটি প্রশ্ন</span><h3>{lesson.question}</h3></div></div>
     <div className={styles.options}>{lesson.options.map((o,i)=>{
      const chosen=answers[active]===i;
      const answered=answers[active]!==undefined;
      const correct=i===lesson.answer;
      return <button key={o} onClick={()=>answer(i)} className={answered?(correct?styles.correct:chosen?styles.wrong:""):""}><b>{String.fromCharCode(2453+i)}</b><span>{o}</span>{answered&&correct&&<CheckCircle2/>}</button>
     })}</div>
     {answers[active]!==undefined&&<div className={answers[active]===lesson.answer?styles.feedbackGood:styles.feedbackBad}><strong>{answers[active]===lesson.answer?"ঠিক ধরেছ!":"আরেকবার ভাবো"}</strong><span>{lesson.why}</span></div>}
    </section>

    {active===9&&<section className={styles.chapterSummary}>
     <Sparkles/><div><span>Chapter complete</span><h3>পুরো অধ্যায়টি একসাথে</h3><p><b>বৃদ্ধি:</b> মাইটোসিসে কোষের সংখ্যা বাড়ে। <b>জনন:</b> মিয়োসিসে গ্যামেটের ক্রোমোজোম সংখ্যা অর্ধেক হয়। <b>বংশগতি:</b> ক্রোমোজোম DNA ও জিন বহন করে; RNA জিনের তথ্য ব্যবহারের প্রক্রিয়ায় গুরুত্বপূর্ণ।</p></div>
    </section>}

    <footer className={styles.navFoot}>
     <button onClick={prev} disabled={active===1}><ChevronLeft/>আগের পাঠ</button>
     <div><span>পাঠ {active} / 9</span><i><b style={{width:(active/9)*100+"%"}}/></i></div>
     <button onClick={next} disabled={active===9}>পরের পাঠ<ChevronRight/></button>
    </footer>
   </article>
  </div>
 </main>
}
