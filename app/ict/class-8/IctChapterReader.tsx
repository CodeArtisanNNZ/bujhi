"use client";

import Link from "next/link";
import {useEffect,useRef,useState,type CSSProperties} from "react";
import {ArrowLeft,ArrowRight,BarChart3,Bookmark,BookmarkCheck,BookOpen,BriefcaseBusiness,CheckCircle2,ChevronLeft,ChevronRight,FileText,Flag,HeartPulse,HelpCircle,Image as ImageIcon,KeyRound,Landmark,Lightbulb,ListChecks,MessageCircleMore,Microscope,MonitorSmartphone,Radio,RotateCcw,Store,Target,Wifi} from "lucide-react";
import {ictTextbookSource,type IctChapter,type IctLesson} from "../../data/class8Ict";
import IctChapterVisual from "./IctChapterVisual";
import styles from "./reader.module.css";

const bn=(value:number)=>value.toLocaleString("bn-BD",{useGrouping:false});
const lessonLabel=(lesson:IctLesson)=>lesson.number===lesson.endNumber?bn(lesson.number):`${bn(lesson.number)}–${bn(lesson.endNumber)}`;
const sections=[
 {id:"summary",label:"পাঠের সারাংশ",Icon:FileText},
 {id:"concepts",label:"মূল ধারণা",Icon:KeyRound},
 {id:"examples",label:"উদাহরণ",Icon:BookOpen},
 {id:"remember",label:"মনে রাখো",Icon:Lightbulb},
 {id:"questions",label:"নিজেকে জিজ্ঞেস করো",Icon:HelpCircle},
 {id:"application",label:"চিত্র ও প্রয়োগ",Icon:ImageIcon}
];

type ChapterLink={number:number;title:string};

type ChapterOneLabProps={lesson:IctLesson};

type VisualKind="device"|"work"|"message"|"shop"|"service"|"health"|"research"|"book"|"data"|"network";
const visualMomentsByLesson:Record<number,{kind:VisualKind;title:string;caption:string}[]>={
  1:[
    {kind:"device",title:"স্মার্ট দিন",caption:"অ্যালার্ম, ম্যাপ, অনলাইন ক্লাস ও ভিডিও কল—একই দিনে ICT-এর নানা ব্যবহার।"},
    {kind:"network",title:"তথ্য চলাচল",caption:"তথ্য এক যন্ত্র থেকে আরেক যন্ত্রে গিয়ে সেবায় রূপ নেয়।"},
    {kind:"book",title:"শেখা বদলে যায়",caption:"ডিজিটাল কনটেন্টে দেখা, শোনা ও নিজে পরীক্ষা করা সম্ভব।"}
  ],
  2:[
    {kind:"work",title:"ডিজিটাল পেশা",caption:"কোড, ডিজাইন, বিপণন ও নেটওয়ার্ক—ভিন্ন দক্ষতা ভিন্ন কাজ তৈরি করে।"},
    {kind:"device",title:"দূর থেকে কাজ",caption:"ইন্টারনেট অনেক কাজকে স্থাননিরপেক্ষ করে দিয়েছে।"},
    {kind:"data",title:"দক্ষতা + সুযোগ",caption:"শুধু প্রযুক্তি নয়—দক্ষতা, যোগাযোগ ও দায়িত্বশীলতা দরকার।"}
  ],
  3:[
    {kind:"message",title:"বার্তা পাঠাই",caption:"প্রেরক, মাধ্যম ও প্রাপক—যোগাযোগের তিনটি মূল অংশ।"},
    {kind:"network",title:"লাইভ সংযোগ",caption:"ভিডিও কলে দুই পক্ষ একই সময়ে কথা বলতে ও প্রতিক্রিয়া দিতে পারে।"},
    {kind:"data",title:"সঠিক মাধ্যম",caption:"জরুরি বার্তা, ঘোষণা ও প্রতিবেদন—সব কিছুর মাধ্যম এক নয়।"}
  ],
  4:[
    {kind:"shop",title:"বারকোড স্ক্যান",caption:"একটি স্ক্যান দাম খুঁজে পায় এবং বিক্রির তথ্য রেকর্ড করে।"},
    {kind:"data",title:"মজুদ আপডেট",caption:"পণ্য বিক্রি হলে স্টক কমে; তথ্য থেকেই পরের সিদ্ধান্ত আসে।"},
    {kind:"device",title:"ডিজিটাল হিসাব",caption:"স্প্রেডশিট ও POS দ্রুত হিসাব ও বিশ্লেষণে সাহায্য করে।"}
  ],
  5:[
    {kind:"service",title:"ডিজিটাল আবেদন",caption:"আবেদন থেকে সেবা পাওয়া পর্যন্ত ধাপ অনলাইনে অনুসরণ করা যায়।"},
    {kind:"data",title:"ডিজিটাল রেকর্ড",caption:"নথি খোঁজা, সংরক্ষণ ও অগ্রগতি দেখা সহজ হয়।"},
    {kind:"network",title:"দূরত্ব কমে",caption:"সেবার তথ্য দূরের মানুষও দ্রুত পেতে পারে।"}
  ],
  6:[
    {kind:"health",title:"টেলিমেডিসিন",caption:"দূরের রোগী বিশেষজ্ঞের সঙ্গে অনলাইনে যুক্ত হতে পারে।"},
    {kind:"data",title:"রোগীর রেকর্ড",caption:"অনুমতিসাপেক্ষ তথ্য নিরাপদে সংরক্ষণ ও দ্রুত খোঁজা যায়।"},
    {kind:"network",title:"রিপোর্ট ভাগাভাগি",caption:"ডিজিটাল রিপোর্ট প্রয়োজনীয় চিকিৎসকের কাছে দ্রুত পৌঁছাতে পারে।"}
  ],
  7:[
    {kind:"research",title:"তথ্য সংগ্রহ",caption:"গবেষণা প্রশ্নের উত্তর পেতে পরিকল্পিতভাবে ডেটা সংগ্রহ করা হয়।"},
    {kind:"data",title:"চার্টে দেখি",caption:"সংখ্যাকে গ্রাফে দেখলে ধারা ও পার্থক্য দ্রুত বোঝা যায়।"},
    {kind:"book",title:"প্রমাণ থেকে সিদ্ধান্ত",caption:"গবেষণায় মতামতের বদলে সংগৃহীত তথ্য ও বিশ্লেষণ গুরুত্বপূর্ণ।"}
  ]
};

function VisualGlyph({kind}:{kind:VisualKind}){
 const common={size:34,strokeWidth:1.7};
 if(kind==="work")return <BriefcaseBusiness {...common}/>;
 if(kind==="message")return <MessageCircleMore {...common}/>;
 if(kind==="shop")return <Store {...common}/>;
 if(kind==="service")return <Landmark {...common}/>;
 if(kind==="health")return <HeartPulse {...common}/>;
 if(kind==="research")return <Microscope {...common}/>;
 if(kind==="book")return <BookOpen {...common}/>;
 if(kind==="data")return <BarChart3 {...common}/>;
 if(kind==="network")return <Wifi {...common}/>;
 return <MonitorSmartphone {...common}/>;
}

function LessonVisualStrip({lesson}:{lesson:IctLesson}){
 const items=visualMomentsByLesson[lesson.number]||[];
 return <section className={styles.visualStory} aria-label="চিত্রে এই পাঠ">
  <header><span>চিত্রে শেখো</span><strong>এক নজরে বাস্তব উদাহরণ</strong></header>
  <div className={styles.visualStoryGrid}>
   {items.map((item,index)=><figure key={item.title} className={styles.visualMoment} style={{"--visual-delay":String(index*110)+"ms"} as CSSProperties}>
    <div className={styles.visualMomentArt+" "+styles["visual-"+item.kind]}>
     <span className={styles.visualOrb}/><span className={styles.visualLine}/><VisualGlyph kind={item.kind}/>
    </div>
    <figcaption><b>{item.title}</b><span>{item.caption}</span></figcaption>
   </figure>)}
  </div>
 </section>;
}

const patriotismByLesson:Record<number,{title:string;text:string}>={
  1:{title:"প্রযুক্তি যেন সবার কাজে লাগে",text:"দেশকে এগিয়ে নিতে প্রযুক্তির সুবিধা শুধু শহর বা সুবিধাপ্রাপ্ত মানুষের মধ্যে সীমাবদ্ধ না রেখে সবার কাছে সহজ, নিরাপদ ও ব্যবহারযোগ্য করে পৌঁছে দেওয়ার কথা ভাবো।"},
  2:{title:"দক্ষতা দিয়ে দেশের কাজের সুযোগ বাড়াই",text:"নিজে দক্ষ হওয়া শুধু ব্যক্তিগত সাফল্য নয়—নতুন কাজ তৈরি, স্থানীয় সমস্যা সমাধান এবং বাংলাদেশের তরুণদের জন্য আরও সুযোগ তৈরির পথও হতে পারে।"},
  3:{title:"দায়িত্বশীল যোগাযোগই শক্তিশালী সমাজ গড়ে",text:"ভুল তথ্য না ছড়ানো, সম্মানজনক ভাষা ব্যবহার করা এবং যাচাই করে তথ্য শেয়ার করা—ডিজিটাল নাগরিক হিসেবে দেশ ও সমাজের প্রতি দায়িত্বের অংশ।"},
  4:{title:"স্থানীয় ব্যবসাকে প্রযুক্তিতে শক্তিশালী করি",text:"ICT ব্যবহার করে ছোট দোকান, কৃষিপণ্য, হস্তশিল্প বা স্থানীয় উদ্যোগকে আরও দক্ষ ও দৃশ্যমান করা গেলে দেশের অর্থনীতি ও কর্মসংস্থান দুটোই শক্তিশালী হয়।"},
  5:{title:"সেবা হোক স্বচ্ছ, সহজ ও সবার জন্য",text:"ডিজিটাল সরকারি সেবা এমন হওয়া উচিত যাতে সময় ও খরচ কমে, তথ্য নিরাপদ থাকে এবং গ্রামের মানুষসহ প্রত্যেক নাগরিক সমানভাবে সেবা পেতে পারে।"},
  6:{title:"প্রযুক্তি দিয়ে স্বাস্থ্যসেবা কাছে আনি",text:"দূরের মানুষও যেন মানসম্মত স্বাস্থ্যসেবার সঙ্গে যুক্ত হতে পারে—এমন নিরাপদ, মানবিক ও সহজ প্রযুক্তি তৈরি করা দেশের প্রতি দায়িত্বশীল উদ্ভাবনের একটি উদাহরণ।"},
  7:{title:"দেশের সমস্যা তথ্য দিয়ে বুঝি",text:"গবেষণায় সঠিক তথ্য ব্যবহার করে শিক্ষা, পরিবেশ, কৃষি বা জনসেবার বাস্তব সমস্যা বুঝে সমাধান খোঁজা—জ্ঞানকে দেশের উন্নয়নে কাজে লাগানোর শক্তিশালী উপায়।"}
};

const labInstructions:Record<number,{title:string;steps:string[]}>={
  1:{title:"একদিন ICT ছাড়া? — কীভাবে ব্যবহার করবে",steps:["ICT ON অবস্থায় সময়রেখাটি একবার পড়ো।","ICT ON/OFF বোতাম চাপ দিয়ে একই দিনের পরিবর্তন তুলনা করো।","কোন কাজগুলোতে সময়, যাতায়াত বা তথ্য পাওয়ার ধরন বদলেছে—নিজে বলো।"]},
  2:{title:"Skill → Job Explorer — কীভাবে ব্যবহার করবে",steps:["একটি পেশার কার্ডে চাপ দাও।","নিচে প্রয়োজনীয় দক্ষতা ও কাজের ধরন পড়ো।","আরেকটি পেশা বেছে দুটির দক্ষতা ও সুযোগ তুলনা করো।"]},
  3:{title:"যোগাযোগ সিমুলেটর — কীভাবে ব্যবহার করবে",steps:["রেডিও, ইমেইল বা ভিডিও কল—একটি মাধ্যম বেছে নাও।","বার্তা কীভাবে প্রেরক থেকে প্রাপকের কাছে যায় দেখো।","ধরন, প্রতিক্রিয়ার সময় ও ইন্টারনেট প্রয়োজন—তিনটি তথ্য তুলনা করো।"]},
  4:{title:"Mini Digital Shop — কীভাবে ব্যবহার করবে",steps:["শুরুর মজুদ ও বিক্রির পরিমাণ দেখে নাও।","‘স্ক্যান করে ১টি বিক্রি’ চাপ দিয়ে মজুদ ও মোট বিক্রি কীভাবে বদলায় দেখো।","কয়েকবার বিক্রি করে দেখার পর রিসেট চাপ দিয়ে আবার শুরু করো।"]},
  5:{title:"Digital Service Journey — কীভাবে ব্যবহার করবে",steps:["১ নম্বর ধাপ থেকে শুরু করো।","পরের ধাপগুলো একে একে চাপ দিয়ে সেবার অগ্রগতি অনুসরণ করো।","শেষে কাগজভিত্তিক ও ডিজিটাল সেবার পার্থক্য পড়ো।"]},
  6:{title:"Telemedicine Flow — কীভাবে ব্যবহার করবে",steps:["‘রোগীর তথ্য’ ধাপটি আগে দেখো।","পরের ধাপগুলো একে একে চাপ দিয়ে তথ্যের যাত্রা অনুসরণ করো।","শেষে ডিজিটাল স্বাস্থ্যরেকর্ড কেন দরকার তা নিজের ভাষায় বলো।"]},
  7:{title:"Mini Research Lab — কীভাবে ব্যবহার করবে",steps:["‘একটি উত্তর সংগ্রহ করি’ চাপ দিয়ে একটি করে নমুনা যোগ করো।","প্রতিটি উত্তরের সঙ্গে বার চার্ট কীভাবে বদলায় দেখো।","১০টি উত্তর পূর্ণ হলে কোন ব্যবহার-সময় সবচেয়ে বেশি এসেছে তা ব্যাখ্যা করো।"]}
};

function InteractionGuide({lessonNumber}:{lessonNumber:number}){
 const guide=labInstructions[lessonNumber];
 if(!guide)return null;
 return <aside className={styles.interactionGuide} aria-label="ইন্টারঅ্যাকটিভ অংশ ব্যবহারের নির্দেশনা">
  <div className={styles.interactionGuideHead}><ListChecks aria-hidden="true"/><div><small>শুরু করার আগে</small><strong>{guide.title}</strong></div></div>
  <ol>{guide.steps.map((step,index)=><li key={step}><span>{bn(index+1)}</span><p>{step}</p></li>)}</ol>
  <p className={styles.interactionGuideTip}><Lightbulb aria-hidden="true"/>টিপ: শুধু বোতাম চাপবে না—প্রতিবার কী বদলাচ্ছে সেটাও লক্ষ্য করো।</p>
 </aside>;
}


function ChapterOneDigitalLab({lesson}:ChapterOneLabProps){
 const[ictOn,setIctOn]=useState(true);
 const[selectedCareer,setSelectedCareer]=useState(0);
 const[medium,setMedium]=useState<"radio"|"email"|"video">("video");
 const[stock,setStock]=useState(8);
 const[sales,setSales]=useState(0);
 const[govStep,setGovStep]=useState(0);
 const[healthStep,setHealthStep]=useState(0);
 const[researchCount,setResearchCount]=useState(0);

 const careers=[
  {name:"ওয়েব ডেভেলপার",skill:"সমস্যা সমাধান + কোড",mode:"দূর থেকেও কাজ করা যায়"},
  {name:"গ্রাফিক ডিজাইনার",skill:"সৃজনশীলতা + ডিজিটাল টুল",mode:"দেশি ও বৈশ্বিক ক্লায়েন্ট"},
  {name:"ডিজিটাল মার্কেটার",skill:"যোগাযোগ + বিশ্লেষণ",mode:"স্থানীয় ব্যবসাকেও বড় বাজারে নিতে পারে"},
  {name:"নেটওয়ার্ক টেকনিশিয়ান",skill:"যন্ত্র + নেটওয়ার্ক",mode:"স্কুল, অফিস ও প্রতিষ্ঠানে প্রয়োজন"}
 ];
 const dayItems=[
  ["সকাল ৭টা","আবহাওয়া ও অ্যালার্ম","রেডিও/ঘড়ি দেখে আলাদা করে পরিকল্পনা"],
  ["সকাল ৯টা","ডিজিটাল ক্লাস ও ফলাফল","স্কুলে গিয়ে নোটিশ বা ফল জানতে হয়"],
  ["দুপুর ১টা","অনলাইন পেমেন্ট","ব্যাংক/কাউন্টারে গিয়ে কাজ করতে হয়"],
  ["বিকেল ৪টা","ম্যাপ ও যাতায়াত","মানুষকে জিজ্ঞেস করে পথ খুঁজতে হয়"],
  ["রাত ৮টা","ভিডিও কল ও অনলাইন পড়া","দূরের মানুষের সঙ্গে তাৎক্ষণিক যোগাযোগ কঠিন"]
 ];
 const govSteps=["আবেদন","তথ্য যাচাই","প্রক্রিয়াকরণ","অবস্থা দেখা","সেবা পাওয়া"];
 const healthSteps=["রোগীর তথ্য","দূরবর্তী পরামর্শ","রিপোর্ট ভাগাভাগি","ডিজিটাল রেকর্ড","ফলো-আপ"];
 const survey=[2,3,3,4,2,5,3,4,2,3];
 const frequencies=[1,2,3,4,5].map(hour=>survey.filter(value=>value===hour).length);

 return <section className={styles.digitalLab} aria-label="বইয়ের বাইরে ডিজিটালভাবে শেখো">
  <header className={styles.digitalLabHeader}>
   <div><span>বইয়ের সীমার বাইরে</span><h3>দেখো · বদলাও · নিজে পরীক্ষা করো</h3></div>
   <MonitorSmartphone aria-hidden="true"/>
  </header>

  <InteractionGuide lessonNumber={lesson.number}/>

  {lesson.number===1&&<div className={styles.labScene}>
   <div className={styles.labToolbar}><div><strong>একদিন ICT ছাড়া?</strong><span>একই দিনের দুই অভিজ্ঞতা তুলনা করো।</span></div>
    <button type="button" className={ictOn?styles.labToggleOn:""} onClick={()=>setIctOn(value=>!value)}><Wifi/>ICT {ictOn?"ON":"OFF"}</button>
   </div>
   <div className={styles.dayTimeline}>{dayItems.map(([time,on,off],index)=><article key={time} style={{"--delay":String(index*70)+"ms"} as CSSProperties}><b>{time}</b><span>{ictOn?on:off}</span><small>{ictOn?"দ্রুত · সংযুক্ত · তথ্যভিত্তিক":"বেশি সময় · বেশি যাতায়াত"}</small></article>)}</div>
   <p className={styles.labInsight}><Lightbulb/>একটি সংজ্ঞা পড়ার আগে তুমি নিজেই দেখলে—ICT সময়, দূরত্ব ও তথ্য পাওয়ার পদ্ধতি কীভাবে বদলে দেয়।</p>
  </div>}

  {lesson.number===2&&<div className={styles.labScene}>
   <div className={styles.labToolbar}><div><strong>Skill → Job Explorer</strong><span>একটি পেশা বেছে দেখো ICT কী ধরনের কাজ তৈরি করে।</span></div><BriefcaseBusiness/></div>
   <div className={styles.careerMap}>{careers.map((career,index)=><button type="button" key={career.name} className={index===selectedCareer?styles.labChoiceActive:""} onClick={()=>setSelectedCareer(index)}><strong>{career.name}</strong><span>{career.skill}</span></button>)}</div>
   <div className={styles.resultPanel}><b>{careers[selectedCareer].name}</b><span>{careers[selectedCareer].mode}</span><p>প্রযুক্তি কাজের সুযোগ তৈরি করে, কিন্তু দক্ষতা, যোগাযোগ ও দায়িত্বশীলতা ছাড়া শুধু ইন্টারনেট থাকলেই কর্মসংস্থান নিশ্চিত হয় না।</p></div>
  </div>}

  {lesson.number===3&&<div className={styles.labScene}>
   <div className={styles.labToolbar}><div><strong>যোগাযোগ সিমুলেটর</strong><span>মাধ্যম বদলালে বার্তার গতি ও প্রতিক্রিয়া কীভাবে বদলায় দেখো।</span></div><MessageCircleMore/></div>
   <div className={styles.mediumPicker}>
    <button type="button" className={medium==="radio"?styles.labChoiceActive:""} onClick={()=>setMedium("radio")}><Radio/>রেডিও</button>
    <button type="button" className={medium==="email"?styles.labChoiceActive:""} onClick={()=>setMedium("email")}><FileText/>ইমেইল</button>
    <button type="button" className={medium==="video"?styles.labChoiceActive:""} onClick={()=>setMedium("video")}><MonitorSmartphone/>ভিডিও কল</button>
   </div>
   <div className={styles.messageFlow}><span>প্রেরক</span><i className={styles.messagePacket}>“কাল ক্লাস ১০টায়”</i><span>প্রাপক</span></div>
   <div className={styles.communicationFacts}>
    <span><b>ধরন</b>{medium==="radio"?"একমুখী":"দ্বিমুখী"}</span>
    <span><b>প্রতিক্রিয়া</b>{medium==="video"?"তাৎক্ষণিক":medium==="email"?"পরে দেওয়া যায়":"সরাসরি নেই"}</span>
    <span><b>ইন্টারনেট</b>{medium==="radio"?"সবসময় নয়":"প্রয়োজন"}</span>
   </div>
  </div>}

  {lesson.number===4&&<div className={styles.labScene}>
   <div className={styles.labToolbar}><div><strong>Mini Digital Shop</strong><span>একটি খাতা বিক্রি করে দেখো POS কীভাবে একই সঙ্গে হিসাব ও মজুদ বদলায়।</span></div><Store/></div>
   <div className={styles.shopSimulator}>
    <div className={styles.barcode}><i/><i/><i/><i/><i/><span>৳৫০</span></div>
    <div><small>খাতা মজুদ</small><strong>{stock}</strong></div>
    <div><small>আজকের বিক্রি</small><strong>৳{sales}</strong></div>
    <button type="button" disabled={stock===0} onClick={()=>{setStock(value=>Math.max(0,value-1));setSales(value=>value+50)}}>স্ক্যান করে ১টি বিক্রি</button>
    <button type="button" className={styles.resetButton} onClick={()=>{setStock(8);setSales(0)}}><RotateCcw/>রিসেট</button>
   </div>
   <p className={styles.labInsight}><CheckCircle2/>বইয়ে “মজুদ ব্যবস্থাপনা” পড়া যায়; এখানে বিক্রির সঙ্গে সঙ্গে মজুদ ও হিসাব বদলাতে দেখলে কারণ–ফল সম্পর্কটি পরিষ্কার হয়।</p>
  </div>}

  {lesson.number===5&&<div className={styles.labScene}>
   <div className={styles.labToolbar}><div><strong>Digital Service Journey</strong><span>জন্মনিবন্ধনের মতো একটি সেবা কীভাবে ধাপে ধাপে এগোয় দেখো।</span></div><Landmark/></div>
   <div className={styles.serviceJourney}>{govSteps.map((step,index)=><button type="button" key={step} className={index<=govStep?styles.serviceDone:""} onClick={()=>setGovStep(index)}><span>{index+1}</span><b>{step}</b></button>)}</div>
   <div className={styles.compareStrip}><span><b>শুধু কাগজে</b>যাতায়াত · সারি · আবার অফিসে খোঁজ</span><ArrowRight/><span><b>ডিজিটাল সেবা</b>দূর থেকে আবেদন · অবস্থা দেখা · রেকর্ড খোঁজা সহজ</span></div>
  </div>}

  {lesson.number===6&&<div className={styles.labScene}>
   <div className={styles.labToolbar}><div><strong>Telemedicine Flow</strong><span>এটি চিকিৎসা পরামর্শ নয়—শুধু ICT workflow বোঝার মডেল।</span></div><HeartPulse/></div>
   <div className={styles.healthFlow}>{healthSteps.map((step,index)=><button type="button" key={step} className={index<=healthStep?styles.healthDone:""} onClick={()=>setHealthStep(index)}><span>{index+1}</span><b>{step}</b></button>)}</div>
   <div className={styles.healthRecord}><b>ডিজিটাল স্বাস্থ্যরেকর্ড</b><span>রোগীর অনুমতিসাপেক্ষ তথ্য → নিরাপদ সংরক্ষণ → প্রয়োজনের সময় দ্রুত খোঁজা</span></div>
  </div>}

  {lesson.number===7&&<div className={styles.labScene}>
   <div className={styles.labToolbar}><div><strong>Mini Research Lab</strong><span>১০ জন শিক্ষার্থীর দৈনিক ইন্টারনেট ব্যবহারের নমুনা ডেটা বিশ্লেষণ করো।</span></div><Microscope/></div>
   <div className={styles.researchControls}><button type="button" onClick={()=>setResearchCount(value=>Math.min(survey.length,value+1))} disabled={researchCount===survey.length}>একটি উত্তর সংগ্রহ করি</button><span>{researchCount} / {survey.length} উত্তর</span><button type="button" className={styles.resetButton} onClick={()=>setResearchCount(0)}><RotateCcw/>রিসেট</button></div>
   <div className={styles.researchChart} aria-label="ইন্টারনেট ব্যবহারের ঘণ্টা অনুযায়ী বার চার্ট">{frequencies.map((_,index)=>{const visible=survey.slice(0,researchCount).filter(value=>value===index+1).length;return <div key={index}><i style={{height:String(Math.max(6,visible*28))+"px"}}/><b>{index+1} ঘণ্টা</b><small>{visible} জন</small></div>})}</div>
   {researchCount===survey.length&&<p className={styles.labInsight}><BarChart3/>সবচেয়ে বেশি শিক্ষার্থী ৩ ঘণ্টা ব্যবহার করেছে। ডেটা সংগ্রহ → সাজানো → বিশ্লেষণ → সিদ্ধান্ত—এটাই গবেষণায় ICT-এর একটি ছোট উদাহরণ।</p>}
  </div>}

  <aside className={styles.patriotism}>
   <Flag aria-hidden="true"/><div><small>দেশের জন্য ভাবি</small><h3>{patriotismByLesson[lesson.number]?.title}</h3><p>{patriotismByLesson[lesson.number]?.text}</p></div>
  </aside>
 </section>;
}
export default function IctChapterReader({chapter,chapters}:{chapter:IctChapter;chapters:ChapterLink[]}){
 const[selected,setSelected]=useState(0);
 const[bookmarked,setBookmarked]=useState<number|null>(null);
 const[section,setSection]=useState("summary");
 const railRef=useRef<HTMLDivElement>(null);
 const panelRef=useRef<HTMLElement>(null);
 const nodeRefs=useRef<(HTMLButtonElement|null)[]>([]);
 const active=chapter.lessons[selected];
 const storageKey=`bujhi-ict-8-chapter-${chapter.number}-bookmark`;
 const grouped=active.number!==active.endNumber;
 const progress=chapter.lessons.length>1?selected/(chapter.lessons.length-1)*100:0;

 useEffect(()=>{
  const requested=Number(new URLSearchParams(window.location.search).get("lesson"));
  const index=chapter.lessons.findIndex(lesson=>requested>=lesson.number&&requested<=lesson.endNumber);
  if(index>=0)setSelected(index);
  try{const saved=localStorage.getItem(storageKey);const number=Number(saved);if(saved!==null&&chapter.lessons.some(lesson=>lesson.number===number))setBookmarked(number);}catch{}
 },[chapter.lessons,storageKey]);

 useEffect(()=>{
  const rail=railRef.current;
  const node=nodeRefs.current[selected];
  if(!rail||!node)return;
  const behavior=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";
  rail.scrollTo({left:Math.max(0,node.offsetLeft-(rail.clientWidth-node.offsetWidth)/2),behavior});
 },[selected]);

 function selectLesson(index:number,scroll=false){
  const next=Math.max(0,Math.min(chapter.lessons.length-1,index));
  setSelected(next);setSection("summary");
  const url=new URL(window.location.href);
  url.searchParams.set("lesson",String(chapter.lessons[next].number));url.hash="";
  window.history.replaceState(null,"",url);
  if(scroll)panelRef.current?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
 }

 function toggleBookmark(){
  const next=bookmarked===active.number?null:active.number;
  setBookmarked(next);
  try{if(next===null)localStorage.removeItem(storageKey);else localStorage.setItem(storageKey,String(next));}catch{}
 }
 const saved=bookmarked===active.number;
 const previousChapter=chapters.find(item=>item.number===chapter.number-1);
 const nextChapter=chapters.find(item=>item.number===chapter.number+1);

 return <main className={styles.page} lang="bn" data-no-translate>
  <div className={styles.container}>
   <header className={styles.topbar}>
    <nav className={styles.breadcrumb} aria-label="পাঠের অবস্থান">
     <Link href="/student-dashboard/books/8/ict/learn"><ArrowLeft size={19}/><span>বইয়ের পাঠ শিখি</span></Link>
     <ChevronRight size={15}/><Link href="/ict/class-8">অষ্টম শ্রেণি · ICT</Link>
     <ChevronRight size={15}/><span aria-current="page">অধ্যায় {bn(chapter.number)}</span>
    </nav>
    <button type="button" className={`${styles.bookmark} ${saved?styles.saved:""}`} onClick={toggleBookmark} aria-pressed={saved}>
     {saved?<BookmarkCheck size={20}/>:<Bookmark size={20}/>}<span>{saved?"সংরক্ষিত":"পরে পড়ব"}</span>
    </button>
   </header>

   <section className={styles.hero} aria-labelledby="ict-chapter-title">
    <div><p>অষ্টম শ্রেণি · তথ্য ও যোগাযোগ প্রযুক্তি · অধ্যায় {bn(chapter.number)}</p>
     <h1 id="ict-chapter-title">{chapter.title}</h1>
     <span>{chapter.intro}</span>
    </div>
    <div className={styles.chapterStamp} aria-label={`অধ্যায় ${bn(chapter.number)}`}><small>CHAPTER</small><b>{String(chapter.number).padStart(2,"0").replace(/\d/g,digit=>bn(Number(digit)))}</b></div>
   </section>

   <nav className={styles.lessonNavigator} aria-label="পাঠ নির্বাচন" onKeyDown={event=>{
    if(event.target instanceof HTMLInputElement)return;
    if(event.key==="ArrowRight"){event.preventDefault();selectLesson(selected+1);}
    if(event.key==="ArrowLeft"){event.preventDefault();selectLesson(selected-1);}
   }}>
    <button type="button" className={styles.arrowButton} onClick={()=>selectLesson(selected-1)} disabled={selected===0} aria-label="আগের পাঠ"><ChevronLeft/></button>
    <div className={styles.railViewport} ref={railRef}>
     <div className={styles.railCanvas} style={{"--steps":chapter.lessons.length,"--progress":`${progress}%`} as CSSProperties}>
      <input className={styles.lessonRange} type="range" min={0} max={chapter.lessons.length-1} step={1} value={selected}
       onChange={event=>selectLesson(Number(event.target.value))} aria-label="পাঠ বদলাতে স্লাইড করুন" aria-valuetext={`পাঠ ${lessonLabel(active)}: ${active.title}`}/>
      <ol className={styles.lessonNodes}>
       {chapter.lessons.map((lesson,index)=><li key={lesson.number}>
        <button type="button" ref={node=>{nodeRefs.current[index]=node;}} className={`${styles.lessonNode} ${index===selected?styles.currentNode:""} ${index<selected?styles.passedNode:""}`}
         onClick={()=>selectLesson(index)} aria-current={index===selected?"step":undefined} aria-label={`পাঠ ${lessonLabel(lesson)}: ${lesson.title}`}>
         <span className={styles.nodeNumber}>{lessonLabel(lesson)}</span><span className={styles.nodeTitle}>{lesson.title}</span>
        </button>
       </li>)}
      </ol>
     </div>
    </div>
    <button type="button" className={styles.arrowButton} onClick={()=>selectLesson(selected+1)} disabled={selected===chapter.lessons.length-1} aria-label="পরের পাঠ"><ChevronRight/></button>
   </nav>
   <p className={styles.railHint} aria-live="polite" aria-atomic="true">নম্বর বেছে বা সক্রিয় বৃত্তটি টেনে পাঠ বদলাও <span>{bn(selected+1)} / {bn(chapter.lessons.length)} পাঠ-অংশ</span></p>

   <section ref={panelRef} className={styles.workspace} aria-label={`পাঠ ${lessonLabel(active)}: ${active.title}`}>
    <article className={styles.lessonContent} key={active.number}>
     <section id="ict-summary" className={styles.lessonIntro}>
      <div><p className={styles.eyebrow}>পাঠ {lessonLabel(active)} <span>· বইয়ের পৃষ্ঠা {bn(active.pages[0])}–{bn(active.pages[1])}</span></p>
       <h2>{active.title}</h2><p className={styles.summary}>{active.summary}</p>
      </div>
      <figure className={styles.lessonVisual}><IctChapterVisual chapter={chapter.number} lesson={active.number}/><figcaption>{chapter.number===1?active.title:chapter.title}</figcaption></figure>
     </section>
     {chapter.number===1&&<LessonVisualStrip lesson={active}/>}
     {grouped&&<p className={styles.groupNote}><BookOpen size={17}/>মূল বইয়ে পাঠ {lessonLabel(active)} এই একটি শিরোনামের অধীনে একসঙ্গে দেওয়া আছে।</p>}

     <div className={styles.learningGrid}>
      <section className={styles.learningCard}><h3><Target/>এই পাঠ কী শেখাবে</h3><ul>{active.outcomes.map(item=><li key={item}>{item}</li>)}</ul></section>
      <section id="ict-remember" className={styles.learningCard}><h3><Lightbulb/>মনে রাখো</h3><p>{active.remember}</p></section>
      <section id="ict-questions" className={styles.learningCard}><h3><HelpCircle/>নিজেকে জিজ্ঞেস করো</h3>
       <ol className={styles.questions}>{active.questions.map((question,index)=><li key={question.prompt}><span>{bn(index+1)}</span><details><summary>{question.prompt}</summary><p>{question.answer}</p></details></li>)}</ol>
      </section>
     </div>

     <section id="ict-concepts" className={styles.concepts}><h3><KeyRound/>মূল ধারণা</h3><dl>{active.terms.map(item=><div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl></section>
     <section id="ict-examples" className={styles.example}><h3><BookOpen/>উদাহরণে বুঝি</h3><p>{active.example}</p></section>
     <section id="ict-application" className={styles.application}><BookOpen aria-hidden="true"/><h3>বাস্তব জীবনে প্রয়োগ</h3><p>{active.activity}</p></section>
     {chapter.number===1&&<ChapterOneDigitalLab key={active.number} lesson={active}/>}

     <footer className={styles.lessonFooter}>
      <a href={ictTextbookSource.pdfUrl} target="_blank" rel="noopener noreferrer"><BookOpen size={16}/>মূল NCTB পাঠ্যবই</a>
      <div><button type="button" onClick={()=>selectLesson(selected-1,true)} disabled={selected===0}><ChevronLeft size={18}/>আগের পাঠ</button>
       <button type="button" onClick={()=>selectLesson(selected+1,true)} disabled={selected===chapter.lessons.length-1}>পরের পাঠ<ChevronRight size={18}/></button></div>
     </footer>
    </article>
    <aside className={styles.chapterAside}>
     <h2><BookOpen size={21}/>এই পাঠে</h2>
     <nav aria-label="পাঠের অংশগুলো">{sections.map(({id,label,Icon})=><a key={id} href={`#ict-${id}`} className={section===id?styles.activeSection:""} onClick={()=>setSection(id)}><Icon size={19}/><span>{label}</span></a>)}</nav>
     <div className={styles.chapterPicker}><label htmlFor="ict-chapter">অন্য অধ্যায় পড়ি</label><select id="ict-chapter" value={chapter.number} onChange={event=>{window.location.href=`/ict/class-8/chapter-${event.target.value}`;}}>{chapters.map(item=><option key={item.number} value={item.number}>{bn(item.number)}. {item.title}</option>)}</select></div>
     {bookmarked!==null&&!saved&&<button type="button" className={styles.resumeBookmark} onClick={()=>{const index=chapter.lessons.findIndex(lesson=>lesson.number===bookmarked);if(index>=0)selectLesson(index);}}><Bookmark size={16}/>সংরক্ষিত পাঠ {bn(bookmarked)}</button>}
    </aside>
   </section>
   <nav className={styles.chapterNavigation} aria-label="অধ্যায় পরিবর্তন">
    {previousChapter?<Link href={`/ict/class-8/chapter-${previousChapter.number}`}><ArrowLeft size={18}/><span><small>আগের অধ্যায়</small>{previousChapter.title}</span></Link>:<Link href="/ict/class-8"><ListChecks size={18}/>সব অধ্যায়</Link>}
    {nextChapter&&<Link href={`/ict/class-8/chapter-${nextChapter.number}`}><span><small>পরের অধ্যায়</small>{nextChapter.title}</span><ArrowRight size={18}/></Link>}
   </nav>
  </div>
 </main>;
}
