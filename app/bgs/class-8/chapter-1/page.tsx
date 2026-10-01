"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {
  ArrowLeft,BookOpen,CheckCircle2,ChevronRight,CircleDollarSign,
  Compass,Crown,ExternalLink,Landmark,PauseCircle,PlayCircle,
  RotateCcw,Shield,Ship,Store,Swords
} from "lucide-react";
import styles from "./chapter.module.css";

type Role="teacher"|"student";
type SectionId="concept"|"background"|"europe"|"palashi"|"recap";

const commons=(file:string)=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;
const commonsPage=(file:string)=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(" ","_"))}`;

type Person={
  name:string;
  identity:string;
  action:string;
  significance:string;
  period:string;
  imageFile?:string;
  license?:string;
  imageNote?:string;
};

const backgroundPeople:Person[]=[
  {
    name:"সম্রাট অশোক",
    identity:"মৌর্য সম্রাট · ভারতীয় উপমহাদেশ",
    action:"অশোকের যুগে বাংলার উত্তরাংশ মৌর্য রাজনৈতিক পরিসরের অংশ ছিল।",
    significance:"বাংলার প্রাচীন রাজনৈতিক পটভূমি বোঝার একটি গুরুত্বপূর্ণ সূচনা।",
    period:"খ্রিস্টপূর্ব ৩য় শতক",
    imageFile:"Statue of Ashoka.jpg",license:"CC0",
    imageNote:"আধুনিক শিল্পীর তৈরি অশোকের মূর্তি; সমসাময়িক প্রতিকৃতি নয়।"
  },
  {
    name:"রাজা শশাঙ্ক",
    identity:"গৌড় / বাংলা",
    action:"গুপ্ত-পরবর্তী সময়ে গৌড়কে কেন্দ্র করে স্বাধীন শাসন প্রতিষ্ঠা করেন।",
    significance:"বাংলায় স্বাধীন আঞ্চলিক রাজনৈতিক শক্তির উত্থান বোঝাতে গুরুত্বপূর্ণ।",
    period:"৭ম শতক"
  },
  {
    name:"রাজা লক্ষণসেন",
    identity:"সেন শাসিত বাংলা",
    action:"সেন শাসনের শেষ পর্যায়ের রাজা; তাঁর সময়েই বখতিয়ার খলজির আক্রমণ ঘটে।",
    significance:"বাংলার রাজনৈতিক ক্ষমতার আরেকটি বড় পরিবর্তনের ঠিক আগের শাসক।",
    period:"১২শ শতকের শেষভাগ–১৩শ শতকের শুরু"
  },
  {
    name:"ইখতিয়ার উদ্দিন মোহাম্মদ বিন বখতিয়ার খলজি",
    identity:"তুর্কি সেনাপতি",
    action:"নদিয়া আক্রমণ করে বাংলার একটি অংশে নতুন রাজনৈতিক কর্তৃত্বের পথ তৈরি করেন।",
    significance:"বাংলায় তুর্কি-মুসলিম শাসন বিস্তারের গুরুত্বপূর্ণ মোড়।",
    period:"১২০৪–১২০৬ খ্রিস্টাব্দ"
  },
  {
    name:"ফখরউদ্দিন মুবারক শাহ",
    identity:"সোনারগাঁওয়ের শাসনকর্তা",
    action:"দিল্লির কর্তৃত্ব অস্বীকার করে স্বাধীন শাসনের ঘোষণা দেন।",
    significance:"স্বাধীন বাংলা সুলতানি যুগের সূচনার সঙ্গে যুক্ত।",
    period:"১৩৩৮ খ্রিস্টাব্দ"
  },
  {
    name:"সুলতান শামসুদ্দিন ইলিয়াস শাহ",
    identity:"বাংলার স্বাধীন সুলতান",
    action:"বাংলার বৃহৎ অংশকে একটি শাসনের অধীনে একত্র করেন।",
    significance:"বাংলার স্বাধীন সুলতানি শাসনকে সুসংহত করেন।",
    period:"১৪শ শতক"
  },
  {
    name:"সুলতান আলাউদ্দিন হুসেন শাহ",
    identity:"বাংলার স্বাধীন সুলতানি শাসক",
    action:"তাঁর আমলে বাংলা শিল্প-সাহিত্য ও সাংস্কৃতিক বিকাশ গুরুত্বপূর্ণ হয়ে ওঠে।",
    significance:"স্বাধীন সুলতানি বাংলার সাংস্কৃতিক বিকাশ বোঝাতে গুরুত্বপূর্ণ।",
    period:"১৫শ শতকের শেষভাগ–১৬শ শতকের শুরু"
  },
  {
    name:"সম্রাট হুমায়ুন",
    identity:"মোগল সম্রাট",
    action:"১৫৩৮ সালে বাংলার গৌড় অঞ্চলে মোগল প্রভাব প্রতিষ্ঠার চেষ্টা করেন।",
    significance:"বাংলায় মোগল হস্তক্ষেপের প্রাথমিক বড় ধাপ।",
    period:"১৫৩৮ খ্রিস্টাব্দ",
    imageFile:"Contemporary portrait of Humayun (painted in Kabul, in 1550-55).jpg",license:"Public domain",
    imageNote:"১৬শ শতকের সমসাময়িক মোগল প্রতিকৃতি।"
  },
  {
    name:"শের খান সুর",
    identity:"বিহারের আফগান শাসক",
    action:"হুমায়ুনকে পরাজিত করে বাংলা ও উত্তর ভারতে আফগান শক্তি প্রতিষ্ঠা করেন।",
    significance:"মোগল কর্তৃত্ব স্থায়ী হওয়ার আগে ক্ষমতার পরিবর্তন বোঝায়।",
    period:"১৬শ শতকের মধ্যভাগ",
    imageFile:"Painting of Sher Shah Suri from a manuscript of Tarikh-i-Khandan-i-Timuriya, prepared by the court painters of Mughal emperor Akbar, circa 16th century.jpg",license:"Public domain",
    imageNote:"১৬শ শতকের মোগল পাণ্ডুলিপির চিত্র।"
  },
  {
    name:"সম্রাট আকবর",
    identity:"মোগল সম্রাট",
    action:"১৫৭৬ সালের পর বাংলার বড় অংশে মোগল কর্তৃত্ব বিস্তৃত হয়।",
    significance:"বাংলায় মোগল শাসন বিস্তারের বড় turning point।",
    period:"১৫৭৬ খ্রিস্টাব্দ থেকে",
    imageFile:"Portrait of Akbar by Manohar.jpg",license:"Public domain"
  },
  {
    name:"মানসিংহ",
    identity:"সম্রাট আকবরের সেনাপতি",
    action:"বারোভূঁইয়াদের দমন করে মোগল কর্তৃত্ব বাড়ানোর চেষ্টা করেন।",
    significance:"পূর্ববাংলায় মোগল শাসন প্রতিষ্ঠার সংগ্রাম বোঝাতে গুরুত্বপূর্ণ।",
    period:"১৬শ শতকের শেষভাগ",
    imageFile:"Portrait of Raja Man Singh I of Amber.jpg",license:"Public domain"
  },
  {
    name:"ঈশা খাঁ",
    identity:"পূর্ববাংলা · বারোভূঁইয়াদের নেতা",
    action:"মোগল অগ্রযাত্রার বিরুদ্ধে স্থানীয় প্রতিরোধ গড়ে তোলেন।",
    significance:"পূর্ববাংলার আঞ্চলিক প্রতিরোধের প্রধান প্রতিনিধি।",
    period:"১৬শ শতকের শেষভাগ",
    imageFile:"Isa Khan.jpg",license:"Public domain",
    imageNote:"পরবর্তী সময়ের পাঠ্যবই-ভিত্তিক স্কেচ; সমসাময়িক প্রতিকৃতি নয়।"
  },
  {
    name:"সম্রাট জাহাঙ্গীর",
    identity:"মোগল সম্রাট",
    action:"তাঁর আমলে পূর্ববাংলায় মোগল কর্তৃত্ব আরও সুসংহত হয়।",
    significance:"ঢাকার ‘জাহাঙ্গীরনগর’ নাম তাঁর নামানুসারে ব্যবহৃত হয়।",
    period:"১৭শ শতকের শুরু",
    imageFile:"Contemporary portrait of Jahangir, circa 1610.jpg",license:"Public domain"
  },
  {
    name:"ইসলাম খান চিশতি",
    identity:"মোগল সুবেদার",
    action:"ঢাকাকে প্রশাসনিক কেন্দ্র করে বারোভূঁইয়াদের প্রতিরোধ ভেঙে মোগল নিয়ন্ত্রণ শক্ত করেন।",
    significance:"পূর্ববাংলায় মোগল কর্তৃত্ব সুসংহত করার গুরুত্বপূর্ণ ব্যক্তি।",
    period:"১৬১০ খ্রিস্টাব্দ"
  },
  {
    name:"নবাব সিরাজউদ্দৌলা",
    identity:"বাংলা-বিহার-উড়িষ্যার নবাব",
    action:"ইংরেজ ইস্ট ইন্ডিয়া কোম্পানির বাড়তে থাকা স্বাধীন ক্ষমতার বিরোধিতা করেন।",
    significance:"তাঁর সময়েই পলাশীর যুদ্ধ ঘটে; এখানেই পরবর্তী উপনিবেশিক ক্ষমতার গল্পে প্রবেশ করি।",
    period:"১৭৫৬–১৭৫৭ খ্রিস্টাব্দ",
    imageFile:"Siraj ud-Daulah.jpg",license:"Public domain"
  }
];

const europePeople:Person[]=[
  {
    name:"ভাস্কো-দা-গামা",
    identity:"পর্তুগিজ নাবিক",
    action:"১৪৯৮ সালে সমুদ্রপথে দক্ষিণ ভারতের কালিকট বন্দরে পৌঁছান।",
    significance:"ইউরোপ থেকে ভারতবর্ষে সমুদ্রপথের বাণিজ্য বিস্তারের বড় সুযোগ তৈরি হয়।",
    period:"১৪৯৮",
    imageFile:"Vasco da Gama (Gaspar Correia).jpg",license:"Public domain",
    imageNote:"১৬শ শতকের প্রাচীনতম পরিচিত চিত্রগুলোর একটি।"
  },
  {
    name:"বার্নিয়ের",
    identity:"ফরাসি পর্যটক ও চিকিৎসক",
    action:"বাংলার বাণিজ্য ও কাশিমবাজারের সিল্ক উৎপাদন সম্পর্কে বর্ণনা লিখেছেন।",
    significance:"বাংলার বাণিজ্যিক সমৃদ্ধির একটি প্রত্যক্ষ ইউরোপীয় বিবরণ পাওয়া যায়।",
    period:"১৭শ শতক · ১৬৬৬-এর বিবরণ",
    imageFile:"Painting of François Bernier, a 17th century French physician and traveller who documented Mughal India.png",license:"Public domain"
  },
  {
    name:"জব চার্নক",
    identity:"ইংরেজ ইস্ট ইন্ডিয়া কোম্পানির কর্মকর্তা",
    action:"সুতানুটি-কলকাতা অঞ্চলে ইংরেজ কোম্পানির স্থায়ী বাণিজ্যিক অবস্থান শক্ত করার সঙ্গে তাঁর নাম যুক্ত।",
    significance:"কলকাতা পরবর্তীতে ইংরেজদের একটি বড় বাণিজ্যিক ও রাজনৈতিক কেন্দ্রে পরিণত হয়।",
    period:"১৬৯০",
    imageFile:"Job Charnock.jpg",license:"CC BY-SA 4.0",credit:"Chingaaribera",
    imageNote:"Wikimedia Commons-এ মুক্ত লাইসেন্সে প্রকাশিত আধুনিক পুনর্নির্মিত চিত্র।"
  }
];

const europeanPowers=[
  {name:"পর্তুগিজ",from:"পর্তুগাল",idea:"সমুদ্রপথ ধরে প্রথমদিকের ইউরোপীয় বাণিজ্যিক শক্তি"},
  {name:"ডাচ",from:"হল্যান্ড",idea:"বাংলার পণ্য নিয়ে বাণিজ্য ও কারখানা/কুঠি"},
  {name:"ডেনিশ",from:"ডেনমার্ক",idea:"ইউরোপীয় বাণিজ্য প্রতিযোগিতায় অংশ নেয়"},
  {name:"ইংরেজ",from:"ইংল্যান্ড",idea:"ইস্ট ইন্ডিয়া কোম্পানির মাধ্যমে বাণিজ্য বিস্তার; পরে রাজনৈতিক প্রভাব বাড়ে"},
  {name:"ফরাসি",from:"ফ্রান্স",idea:"বাংলায় বাণিজ্যকেন্দ্র স্থাপন করে প্রতিযোগিতায় অংশ নেয়"}
];

const causeBuckets=[
  {id:"trade",title:"বাণিজ্য ও অর্থের দ্বন্দ্ব",icon:"৳",summary:"বাণিজ্যিক সুবিধা, শুল্ক ও রাজস্ব নিয়ে বিরোধ।"},
  {id:"power",title:"ক্ষমতা ও কর্তৃত্বের দ্বন্দ্ব",icon:"⚖",summary:"বাংলায় শেষ সিদ্ধান্ত কার—নবাব, নাকি বিদেশি কোম্পানি?"},
  {id:"plot",title:"অভ্যন্তরীণ ষড়যন্ত্র",icon:"◐",summary:"সিরাজের বিরোধীরা কোম্পানির সঙ্গে যুক্ত হওয়ায় তাঁর অবস্থান দুর্বল হয়।"}
] as const;

const palashiCauses=[
  {n:"১",bucket:"trade",title:"বাণিজ্যিক সুবিধার অপব্যবহার",simple:"কোম্পানি বিশেষ সুবিধা এমনভাবে ব্যবহার করছিল যে নবাবের রাজস্ব ক্ষতিগ্রস্ত হচ্ছিল।"},
  {n:"২",bucket:"trade",title:"শুল্ক ও রাজস্ব নিয়ে বিরোধ",simple:"কোম্পানির ব্যবসা ও শুল্ক-সুবিধা নিয়ে নবাবি প্রশাসনের সঙ্গে দ্বন্দ্ব বাড়ে।"},
  {n:"৩",bucket:"power",title:"অনুমতি ছাড়া দুর্গ মজবুত করা",simple:"ইংরেজরা নিজেদের সামরিক অবস্থান শক্ত করছিল, যা নবাবের কর্তৃত্বের প্রশ্ন তোলে।"},
  {n:"৪",bucket:"power",title:"নবাবের নির্দেশ অমান্য",simple:"কোম্পানি নবাবের সব নির্দেশ মেনে চলছিল না।"},
  {n:"৫",bucket:"power",title:"রাজনীতিতে কোম্পানির হস্তক্ষেপ",simple:"বাণিজ্যের বাইরে গিয়ে কোম্পানি বাংলার রাজনৈতিক পরিস্থিতিতে প্রভাব বাড়াতে থাকে।"},
  {n:"৬",bucket:"plot",title:"সিরাজের বিরোধীদের সঙ্গে যোগাযোগ",simple:"নবাবের বিরোধী কিছু প্রভাবশালী ব্যক্তি কোম্পানির সঙ্গে যোগাযোগ করে।"},
  {n:"৭",bucket:"plot",title:"মীর জাফরের সঙ্গে গোপন সমঝোতা",simple:"যুদ্ধের আগেই সিরাজকে সরানোর পরিকল্পনায় মীর জাফর গুরুত্বপূর্ণ হয়ে ওঠেন।"},
  {n:"৮",bucket:"plot",title:"বাহিনীর ভেতরে ঐক্যের অভাব",simple:"যুদ্ধের সময় নবাবের বাহিনীর গুরুত্বপূর্ণ অংশ সক্রিয়ভাবে লড়েনি।"}
] as const;

const palashiBlocks=[
  {title:"ইংরেজরা তখন কারা?",tag:"বণিক",text:"শুরুতে ইংরেজ ইস্ট ইন্ডিয়া কোম্পানি বাংলার শাসক নয়—তারা মূলত ব্যবসায়ী।",visual:"🚢  →  📦"},
  {title:"ব্যবসা বড় হতে থাকে",tag:"বাণিজ্য",text:"বাংলার রেশম, মিহি কাপড় ও অন্যান্য মূল্যবান পণ্যের ব্যবসা বাড়ার সঙ্গে কোম্পানির প্রভাবও বাড়ে।",visual:"📦  📦  📦"},
  {title:"বাণিজ্য নিয়ে বিরোধ",tag:"অর্থ",text:"বিশেষ বাণিজ্যিক সুবিধা ও রাজস্বের প্রশ্নে নবাবি প্রশাসন ও কোম্পানির দ্বন্দ্ব তীব্র হয়।",visual:"৳  ↔  ⚖"},
  {title:"কে সিদ্ধান্ত নেবে?",tag:"কর্তৃত্ব",text:"নবাব চাইছেন বাংলায় তাঁর আইন ও কর্তৃত্ব চলুক; কোম্পানি নিজের স্বাধীন ক্ষমতা বাড়াচ্ছে।",visual:"👑  ↔  🏰"},
  {title:"বিরোধ থেকে সংঘর্ষ",tag:"সংঘর্ষ",text:"বাণিজ্যিক ও রাজনৈতিক দ্বন্দ্ব ধীরে ধীরে সামরিক সংঘর্ষের দিকে যায়।",visual:"⚖  →  ⚔"},
  {title:"ভেতরের ষড়যন্ত্র",tag:"ভাঙন",text:"সিরাজের বিরোধী অংশের সঙ্গে কোম্পানির গোপন যোগাযোগ তাঁর অবস্থান দুর্বল করে।",visual:"👥  →  ◐"},
  {title:"পলাশীর যুদ্ধ",tag:"২৩ জুন ১৭৫৭",text:"পলাশীতে যুদ্ধ হয়। বাহিনীর ভেতরের নিষ্ক্রিয়তা ও ষড়যন্ত্রের মধ্যে সিরাজ পরাজিত হন।",visual:"⚔  ১৭৫৭  ⚔"},
  {title:"আসল পরিবর্তন",tag:"Turning point",text:"কোম্পানি আর শুধু বণিক থাকল না—বাংলার রাজনীতিতে প্রধান নিয়ামক শক্তি হয়ে ওঠার পথ খুলে গেল।",visual:"💼  →  🏛"}
];

function Portrait({person,large=false}:{person:Person;large?:boolean}){
  if(!person.imageFile)return <div className={large?styles.portraitFallbackLarge:styles.portraitFallback}><span>{person.name.slice(0,1)}</span><small>মুক্ত ও নির্ভরযোগ্য প্রতিকৃতি পাওয়া যায়নি</small></div>;
  return <figure className={large?styles.portraitLarge:styles.portrait}>
    <img src={commons(person.imageFile)} alt={`${person.name}-এর ঐতিহাসিক/প্রতিনিধিত্বমূলক চিত্র`} loading="lazy"/>
    <figcaption><span>{person.license}{person.credit?` · ${person.credit}`:""}</span><a href={commonsPage(person.imageFile)} target="_blank" rel="noopener noreferrer">Wikimedia Commons <ExternalLink/></a></figcaption>
  </figure>;
}

export default function BgsChapterOne(){
  const[role,setRole]=useState<Role>("student");
  const[section,setSection]=useState<SectionId>("concept");
  const[selectedPerson,setSelectedPerson]=useState(0);
  const[selectedEurope,setSelectedEurope]=useState(0);
  const[selectedCause,setSelectedCause]=useState(0);
  const[palashiStep,setPalashiStep]=useState(0);
  const[playing,setPlaying]=useState(false);

  useEffect(()=>{
    void (async()=>{
      try{
        const response=await fetch("/api/me",{cache:"no-store"});
        if(!response.ok)return;
        const data=await response.json() as {profile?:{role?:string}};
        if(data.profile?.role==="teacher")setRole("teacher");
      }catch{}
    })();
  },[]);

  useEffect(()=>{
    if(!playing)return;
    const timer=window.setInterval(()=>setPalashiStep(value=>{
      if(value>=palashiBlocks.length-1){setPlaying(false);return value}
      return value+1;
    }),3200);
    return ()=>window.clearInterval(timer);
  },[playing]);

  const back=role==="teacher"?"/teacher-dashboard":"/student-dashboard/books/8/bangladesh-global-studies/learn";
  const activeCause=palashiCauses[selectedCause];
  const activeBucket=causeBuckets.find(item=>item.id===activeCause.bucket)!;
  const selected=backgroundPeople[selectedPerson];
  const europeSelected=europePeople[selectedEurope];

  const nav=[
    {id:"concept" as SectionId,label:"১. উপনিবেশ কী?",icon:<Compass/>},
    {id:"background" as SectionId,label:"২. অশোক থেকে সিরাজ",icon:<Crown/>},
    {id:"europe" as SectionId,label:"৩. ইউরোপীয় আগমন",icon:<Ship/>},
    {id:"palashi" as SectionId,label:"৪. পলাশী",icon:<Swords/>},
    {id:"recap" as SectionId,label:"মনে রাখি",icon:<CheckCircle2/>}
  ];

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link href={back} className={styles.back}><ArrowLeft/> {role==="teacher"?"শিক্ষক ডেস্কে ফিরি":"বইয়ের পাঠে ফিরি"}</Link>
      <Link href="/" className={styles.brand}><img src="/bujhi-icon.png" alt=""/><strong>বুঝি</strong></Link>
      <span className={styles.rolePill}>{role==="teacher"?"শিক্ষক ভিউ":"শিক্ষার্থী ভিউ"}</span>
    </header>

    <div className={styles.wrap}>
      <section className={styles.hero}>
        <div>
          <p>অষ্টম শ্রেণি · বাংলাদেশ ও বিশ্বপরিচয় · অধ্যায় ১</p>
          <h1>উপনিবেশিক যুগ ও বাংলার স্বাধীনতা সংগ্রাম</h1>
          <span>এই build-এ এখন পর্যন্ত আলোচিত প্রথম ৪টি অংশ · বুঝে শেখো, নাম মুখস্থ করার আগে গল্পটা ধরো</span>
        </div>
        <div className={styles.heroStamp}><small>CHAPTER</small><b>০১</b></div>
      </section>

      {role==="teacher"&&<aside className={styles.teacherGuide}>
        <div><BookOpen/><strong>শিক্ষকের পাঠ পরিকল্পনা · ৪৫–৫০ মিনিট</strong></div>
        <p><b>৮ মিনিট</b> উপনিবেশের ধারণা → <b>১২ মিনিট</b> অশোক থেকে সিরাজ timeline → <b>১০ মিনিট</b> ইউরোপীয় বাণিজ্য বিস্তার → <b>১৫–২০ মিনিট</b> পলাশীর কারণ, ৩ bucket ও ৮-block story। প্রতিটি অংশে আগে প্রশ্ন করুন, পরে উত্তর দেখান।</p>
      </aside>}

      <nav className={styles.lessonNav} aria-label="Chapter 1 learning path">
        {nav.map(item=><button key={item.id} className={section===item.id?styles.navActive:""} onClick={()=>setSection(item.id)}>{item.icon}<span>{item.label}</span></button>)}
      </nav>

      {section==="concept"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>PART 01</span><h2>উপনিবেশিক শাসন বুঝি</h2><p>তারিখে যাওয়ার আগে ৩টি শব্দ পরিষ্কার করি।</p></div>

        <div className={styles.definitionGrid}>
          <article><Landmark/><small>উপনিবেশ</small><h3>নিয়ন্ত্রিত অঞ্চল</h3><p>যখন কোনো অঞ্চল বাইরের শক্তির রাজনৈতিক, অর্থনৈতিক বা প্রশাসনিক নিয়ন্ত্রণের অধীনে চলে যায়।</p></article>
          <article><Compass/><small>উপনিবেশবাদ</small><h3>নিয়ন্ত্রণ প্রতিষ্ঠার ব্যবস্থা</h3><p>অন্য অঞ্চল ও জনগোষ্ঠীর ভূমি, অর্থনীতি, বাণিজ্য, সম্পদ বা সিদ্ধান্তের ওপর নিজের স্বার্থে নিয়ন্ত্রণ তৈরি করা।</p></article>
          <article><Shield/><small>উপনিবেশিক শাসন</small><h3>নিয়ন্ত্রণ যখন শাসনে পরিণত হয়</h3><p>কর, প্রশাসন, আইন, অর্থনীতি ও রাজনৈতিক সিদ্ধান্তে বাইরের শক্তি বাস্তব কর্তৃত্ব প্রয়োগ করে।</p></article>
        </div>

        <div className={styles.notEqual}>
          <strong>সব বিদেশি উপস্থিতি উপনিবেশ নয়</strong>
          <div><span>বিদেশি মানুষের আগমন</span><b>≠</b><span>উপনিবেশ</span></div>
          <div><span>বিদেশি বাণিজ্য</span><b>≠</b><span>উপনিবেশ</span></div>
          <div><span>বিদেশি প্রভাব</span><b>≠</b><span>সবসময় উপনিবেশ</span></div>
          <p>কিন্তু যখন <b>ক্ষমতা + অর্থনীতি + সিদ্ধান্ত গ্রহণের অধিকার</b> বাইরের শক্তির হাতে যেতে থাকে, তখন উপনিবেশিক শাসনের দিকে পরিবর্তন ঘটে।</p>
        </div>

        <div className={styles.process}>
          <h3>Colonization-কে একটি process হিসেবে দেখো</h3>
          <div className={styles.processTrack}>
            {["যোগাযোগ / আগমন","বাণিজ্যিক উপস্থিতি","প্রভাব বৃদ্ধি","রাজনীতিতে হস্তক্ষেপ","সামরিক / রাজনৈতিক ক্ষমতা","প্রশাসন ও রাজস্ব নিয়ন্ত্রণ","উপনিবেশিক শাসন"].map((x,i)=><div key={x}><span>{i+1}</span><strong>{x}</strong>{i<6&&<ChevronRight/>}</div>)}
          </div>
        </div>

        <div className={styles.coreQuestion}><small>এই প্রশ্নটি মনে রাখো</small><h3>“একটি ব্যবসায়ী শক্তি কখন আর শুধু ব্যবসায়ী থাকে না?”</h3><p>পরের তিনটি অংশে এই প্রশ্নের উত্তর খুঁজবে।</p></div>
      </section>}

      {section==="background"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>PART 02</span><h2>বাংলার রাজনৈতিক পটভূমি</h2><p>অশোক থেকে সিরাজউদ্দৌলা—নাম নয়, ক্ষমতার পরিবর্তনের গল্প।</p></div>

        <div className={styles.timelineStrip}>
          {backgroundPeople.map((person,i)=><button key={person.name} className={selectedPerson===i?styles.timelineActive:""} onClick={()=>setSelectedPerson(i)}><span>{person.period}</span><strong>{person.name}</strong></button>)}
        </div>

        <div className={styles.personFocus}>
          <Portrait person={selected} large/>
          <div>
            <small>{selected.period}</small>
            <h3>{selected.name}</h3>
            <p className={styles.identity}>{selected.identity}</p>
            <dl>
              <div><dt>কী করেছিলেন?</dt><dd>{selected.action}</dd></div>
              <div><dt>কেন গুরুত্বপূর্ণ?</dt><dd>{selected.significance}</dd></div>
            </dl>
            {selected.imageNote&&<p className={styles.imageNote}>{selected.imageNote}</p>}
          </div>
        </div>

        <div className={styles.peopleGrid}>
          {backgroundPeople.map((person,i)=><button key={person.name} className={selectedPerson===i?styles.personCardActive:""} onClick={()=>{setSelectedPerson(i);document.querySelector("main")?.scrollIntoView({behavior:"smooth",block:"start"})}}>
            <Portrait person={person}/>
            <span><small>{person.period}</small><strong>{person.name}</strong><em>{person.significance}</em></span>
          </button>)}
        </div>

        <div className={styles.memoryLine}>
          <strong>এক লাইনের mental timeline</strong>
          <p>মৌর্য রাজনৈতিক পরিসর → স্বাধীন গৌড় → সেন শাসন → তুর্কি আগমন → স্বাধীন সুলতানি বাংলা → মোগল বাংলা → নবাবি বাংলা → সিরাজউদ্দৌলা</p>
        </div>
      </section>}

      {section==="europe"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>PART 03</span><h2>বাংলায় ইউরোপীয়দের আগমন ও বাণিজ্য বিস্তার</h2><p>এই অংশের গল্প: বাজারের খোঁজ → সমুদ্রপথ → বাংলার পণ্য → বাণিজ্যকেন্দ্র → ইংরেজদের বাড়তি প্রভাব।</p></div>

        <div className={styles.tradeFlow}>
          {["ইউরোপে নতুন বাজারের প্রয়োজন","১৪৯৮ · সমুদ্রপথে কালিকট","বাংলার পণ্যের আকর্ষণ","কুঠি ও বাণিজ্যকেন্দ্র","ইংরেজ কোম্পানির প্রভাব বৃদ্ধি"].map((x,i)=><div key={x}><span>{i+1}</span><strong>{x}</strong>{i<4&&<ChevronRight/>}</div>)}
        </div>

        <div className={styles.europeLayout}>
          <div className={styles.europePeople}>
            {europePeople.map((person,i)=><button key={person.name} className={selectedEurope===i?styles.europePersonActive:""} onClick={()=>setSelectedEurope(i)}><Portrait person={person}/><span><small>{person.period}</small><strong>{person.name}</strong></span></button>)}
          </div>
          <article className={styles.europeFocus}>
            <Portrait person={europeSelected} large/>
            <div><small>{europeSelected.period}</small><h3>{europeSelected.name}</h3><p>{europeSelected.action}</p><strong>{europeSelected.significance}</strong>{europeSelected.imageNote&&<em>{europeSelected.imageNote}</em>}</div>
          </article>
        </div>

        <div className={styles.powers}>
          <h3>কারা বাণিজ্যে এল?</h3>
          <div>{europeanPowers.map(power=><article key={power.name}><Store/><small>{power.from}</small><strong>{power.name}</strong><p>{power.idea}</p></article>)}</div>
        </div>

        <div className={styles.fourIdeas}>
          <article><b>১</b><strong>কেন এল?</strong><span>বাজার, রেশম, মিহি কাপড়, মসলা ও অন্যান্য মূল্যবান পণ্যের জন্য।</span></article>
          <article><b>২</b><strong>কারা এল?</strong><span>পর্তুগিজ, ডাচ, ডেনিশ, ইংরেজ ও ফরাসি বণিক শক্তি।</span></article>
          <article><b>৩</b><strong>কী করল?</strong><span>বাণিজ্য → কুঠি/কারখানা → স্থায়ী বাণিজ্যকেন্দ্র → বেশি মুনাফা।</span></article>
          <article><b>৪</b><strong>কী বদলাল?</strong><span>ইংরেজ কোম্পানি অন্যদের তুলনায় প্রভাবশালী হয়ে পরের রাজনৈতিক দ্বন্দ্বের ভিত্তি তৈরি করে।</span></article>
        </div>

        <div className={styles.memoryLine}><strong>মনে রাখার লাইন</strong><p>১৪৯৮ ভাস্কো-দা-গামা → ইউরোপীয় বাণিজ্য → বাংলার মূল্যবান পণ্য → কুঠি ও কেন্দ্র → জব চার্নক / কলকাতা → ইংরেজ প্রভাব বৃদ্ধি</p></div>
      </section>}

      {section==="palashi"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>PART 04</span><h2>বাংলায় উপনিবেশিক শক্তির বিজয়</h2><p>পলাশীর যুদ্ধকে যুদ্ধের খুঁটিনাটি নয়—<b>বণিক থেকে রাজনৈতিক শক্তি</b> হওয়ার গল্প হিসেবে বুঝি।</p></div>

        <div className={styles.bucketGrid}>
          {causeBuckets.map(bucket=><article key={bucket.id}><span>{bucket.icon}</span><small>CAUSE BUCKET</small><strong>{bucket.title}</strong><p>{bucket.summary}</p></article>)}
        </div>

        <div className={styles.causeBoard}>
          <div className={styles.causeList}>
            {palashiCauses.map((cause,i)=><button key={cause.n} className={selectedCause===i?styles.causeActive:""} onClick={()=>setSelectedCause(i)}><span>{cause.n}</span><strong>{cause.title}</strong></button>)}
          </div>
          <article className={styles.causeExplain}>
            <small>{activeBucket.title}</small><h3>{activeCause.n}. {activeCause.title}</h3><p>{activeCause.simple}</p>
            <div><span>{activeBucket.icon}</span><b>{activeBucket.summary}</b></div>
          </article>
        </div>

        <div className={styles.animationHeader}>
          <div><small>৮-BLOCK STORY</small><h3>পলাশীর গল্প · ধাপে ধাপে</h3></div>
          <div><button onClick={()=>setPlaying(v=>!v)}>{playing?<><PauseCircle/> থামাও</>:<><PlayCircle/> অটো চালাও</>}</button><button onClick={()=>{setPlaying(false);setPalashiStep(0)}}><RotateCcw/> আবার</button></div>
        </div>

        <div className={styles.palashiStage}>
          <div className={styles.storyRail}>
            {palashiBlocks.map((block,i)=><button key={block.title} aria-label={block.title} onClick={()=>{setPlaying(false);setPalashiStep(i)}} className={palashiStep===i?styles.storyDotActive:i<palashiStep?styles.storyDotDone:""}><span>{i+1}</span></button>)}
          </div>
          <div className={styles.sirajCenter}>
            <Portrait person={backgroundPeople[14]} large/>
            <div><small>কেন্দ্রীয় চরিত্র</small><strong>নবাব সিরাজউদ্দৌলা</strong></div>
          </div>
          <article key={palashiStep} className={styles.storyCard}>
            <small>BLOCK {palashiStep+1} · {palashiBlocks[palashiStep].tag}</small>
            <h3>{palashiBlocks[palashiStep].title}</h3>
            <div className={styles.storyVisual}>{palashiBlocks[palashiStep].visual}</div>
            <p>{palashiBlocks[palashiStep].text}</p>
            <div className={styles.storyControls}>
              <button disabled={palashiStep===0} onClick={()=>{setPlaying(false);setPalashiStep(v=>Math.max(0,v-1))}}>← আগের</button>
              <span>{palashiStep+1} / 8</span>
              <button disabled={palashiStep===7} onClick={()=>{setPlaying(false);setPalashiStep(v=>Math.min(7,v+1))}}>পরের →</button>
            </div>
          </article>
        </div>

        <div className={styles.mirJafarCard}>
          <Portrait person={{name:"মীর জাফর",identity:"",action:"",significance:"",period:"১৭৫৭",imageFile:"Mir Ja'afar.jpg",license:"Public domain"}}/>
          <div><small>ষড়যন্ত্রের অংশ</small><h3>মীর জাফর</h3><p>পলাশীর আগের গোপন সমঝোতা ও যুদ্ধের সময় নিষ্ক্রিয়তার প্রসঙ্গে এই নামটি মনে রাখো। এখানে লক্ষ্য কোনো দীর্ঘ জীবনী নয়—<b>সিরাজের নিজের পক্ষের ভাঙন</b> বোঝা।</p></div>
        </div>

        <div className={styles.beforeAfter}>
          <article><small>পলাশীর আগে</small><Ship/><strong>East India Company</strong><p>বাণিজ্য · জাহাজ · পণ্য · কুঠি</p></article>
          <ChevronRight/>
          <article><small>পলাশীর পরে</small><Landmark/><strong>East India Company</strong><p>বাণিজ্য + সামরিক শক্তি + বাড়তে থাকা রাজনৈতিক প্রভাব</p></article>
        </div>

        <div className={styles.coreQuestion}><small>সবচেয়ে গুরুত্বপূর্ণ takeaway</small><h3>বণিক → রাজনৈতিক শক্তি</h3><p>পলাশী ছিল একদিনে সম্পূর্ণ উপনিবেশ গড়ে ওঠা নয়; কিন্তু বাংলায় কোম্পানির রাজনৈতিক আধিপত্য বিস্তারের একটি বড় turning point।</p></div>
      </section>}

      {section==="recap"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>RECAP</span><h2>চার অংশকে এক গল্পে জুড়ে দাও</h2><p>নাম ও সাল আলাদা আলাদা না রেখে পরিবর্তনের ধারাটি ধরো।</p></div>

        <div className={styles.recapFlow}>
          <article><Compass/><span>১</span><strong>উপনিবেশ কী?</strong><p>বাইরের শক্তির নিয়ন্ত্রণ যখন অর্থনীতি, প্রশাসন ও রাজনৈতিক সিদ্ধান্তে পৌঁছে যায়।</p></article>
          <article><Crown/><span>২</span><strong>বাংলা আগে কী ছিল?</strong><p>দীর্ঘ সময় ধরে বিভিন্ন স্বাধীন ও সাম্রাজ্যিক রাজনৈতিক কাঠামোর মধ্য দিয়ে বদলেছে।</p></article>
          <article><Ship/><span>৩</span><strong>ইউরোপীয়রা কেন এল?</strong><p>প্রথমে বাণিজ্যের জন্য—বাংলার মূল্যবান পণ্য ও বাজার তাদের আকৃষ্ট করে।</p></article>
          <article><Swords/><span>৪</span><strong>কীভাবে ক্ষমতা বদলাল?</strong><p>বাণিজ্যিক দ্বন্দ্ব + কর্তৃত্বের দ্বন্দ্ব + অভ্যন্তরীণ ষড়যন্ত্র → পলাশী → কোম্পানির রাজনৈতিক প্রভাব।</p></article>
        </div>

        <div className={styles.bigChain}>
          <span>আগমন</span><ChevronRight/><span>বাণিজ্য</span><ChevronRight/><span>প্রভাব</span><ChevronRight/><span>দ্বন্দ্ব</span><ChevronRight/><span>পলাশী</span><ChevronRight/><span>রাজনৈতিক শক্তি</span>
        </div>

        <div className={styles.checks}>
          <h3>নিজেকে যাচাই করো</h3>
          {[
            ["বিদেশি বাণিজ্য আর উপনিবেশ কি একই জিনিস?","না। বাণিজ্য উপনিবেশ নয়; শাসনক্ষমতা ও নিয়ন্ত্রণের পরিবর্তনটাই মূল।"],
            ["ইউরোপীয়রা বাংলায় প্রথমে কেন আসে?","মূলত বাণিজ্য ও বাজারের জন্য।"],
            ["পলাশীর কারণ ৩ bucket-এ কী?","বাণিজ্য ও অর্থ · ক্ষমতা ও কর্তৃত্ব · অভ্যন্তরীণ ষড়যন্ত্র।"],
            ["পলাশীর সবচেয়ে বড় পরিবর্তন কী?","ইস্ট ইন্ডিয়া কোম্পানির বাণিজ্যিক শক্তি থেকে রাজনৈতিক নিয়ামক শক্তি হয়ে ওঠার পথ খুলে যায়।"]
          ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>

        <div className={styles.nextLesson}><CircleDollarSign/><div><small>NEXT</small><h3>উপনিবেশিক শাসন ও শোষণ</h3><p>একটি বিদেশি কোম্পানি যখন দেশের রাজনীতি নিয়ন্ত্রণ করতে শুরু করে, তখন সাধারণ মানুষ ও অর্থনীতির ওপর কী প্রভাব পড়ে?</p></div></div>
      </section>}

      <footer className={styles.footer}>
        <p>পাঠ কাঠামো: NCTB Class 8 Bangladesh and Global Studies · Chapter 1-এর আলোচিত অংশ। ঐতিহাসিক চিত্রগুলো শুধুমাত্র মুক্ত লাইসেন্স / public-domain উৎস থেকে দেখানো হয়েছে; যেখানে নির্ভরযোগ্য মুক্ত প্রতিকৃতি পাওয়া যায়নি সেখানে তা স্পষ্টভাবে বলা হয়েছে।</p>
      </footer>
    </div>
  </main>;
}
