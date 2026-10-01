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
type SectionId="concept"|"background"|"europe"|"palashi"|"exploitation"|"crown"|"recap";

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
    imageFile:"Job Charnock.jpg",license:"CC BY-SA 4.0",
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


const dualTimeline=[
  {year:"১৭৬৫",title:"দেওয়ানি ও দ্বৈত শাসন",text:"কোম্পানি বাংলা-বিহার-উড়িষ্যার রাজস্ব আদায়ের ক্ষমতা পায়। নবাবের হাতে শাসন ও বিচার বিভাগের দায়িত্ব থাকে।",impact:"ক্ষমতা ও দায়িত্ব আলাদা হয়ে যায়।"},
  {year:"১৭৭০",title:"ছিয়াত্তরের মন্বন্তর",text:"অনাবৃষ্টি ও খরায় ফসলের ব্যাপক ক্ষতি হয়। দুর্ভিক্ষের মধ্যেও কোম্পানি রাজস্বের চাপ কমায়নি।",impact:"খাদ্যসংকটের সঙ্গে কঠোর রাজস্বচাপ মানুষের দুর্দশা আরও তীব্র করে।"},
  {year:"১৭৭২",title:"দ্বৈত শাসনের অবসান",text:"ওয়ারেন হেস্টিংস দ্বৈত শাসনের অবসান ঘটিয়ে কোম্পানির হাতে দেওয়ানি প্রশাসন আরও সরাসরি নেয়।",impact:"দায়িত্বহীন ক্ষমতার পর্ব শেষ হলেও ঔপনিবেশিক নিয়ন্ত্রণ আরও প্রত্যক্ষ হয়।"},
  {year:"১৭৭৩",title:"নতুন ঔপনিবেশিক প্রশাসন",text:"Regulating Act-এর পর গভর্নরদের পদবি গভর্নর জেনারেলে রূপ নেয় এবং কোম্পানি শাসনের ওপর ব্রিটিশ পার্লামেন্টের নিয়ন্ত্রণ বাড়ে।",impact:"বাংলার শাসন ক্রমে একটি আরও কেন্দ্রীভূত ঔপনিবেশিক কাঠামোয় বাঁধা পড়ে।"}
];

const governorGenerals:Person[]=[
  {
    name:"ওয়ারেন হেস্টিংস",
    identity:"ইস্ট ইন্ডিয়া কোম্পানির শাসক",
    action:"১৭৭২ সালে দ্বৈত শাসনের অবসান ঘটিয়ে রাজস্ব ও প্রশাসনে কোম্পানির প্রত্যক্ষ নিয়ন্ত্রণ বাড়ান।",
    significance:"কোম্পানি শাসনকে আরও সংগঠিত ও কেন্দ্রীভূত করার গুরুত্বপূর্ণ ব্যক্তি।",
    period:"১৭৭২–১৭৮৫",
    imageFile:"Warren Hastings.jpg",license:"Public domain"
  },
  {
    name:"লর্ড কর্নওয়ালিস",
    identity:"গভর্নর জেনারেল",
    action:"১৭৯৩ সালে চিরস্থায়ী বন্দোবস্ত চালু করেন।",
    significance:"রাজস্ব আদায়ের স্বার্থে জমিদার শ্রেণিকে শক্তিশালী করা হয়; কৃষকের নিরাপত্তা ও দরকষাকষির অবস্থান দুর্বল থাকে।",
    period:"১৭৮৬–১৭৯৩",
    imageFile:"Lord Cornwallis.jpg",license:"Public domain"
  },
  {
    name:"লর্ড ওয়েলেসলি",
    identity:"গভর্নর জেনারেল",
    action:"ব্রিটিশ সাম্রাজ্য বিস্তারের নীতিকে জোরদার করেন।",
    significance:"সামরিক ও কূটনৈতিক উপায়ে কোম্পানির ভূখণ্ডগত আধিপত্য আরও বাড়ে।",
    period:"১৭৯৮–১৮০৫",
    imageFile:"Richard Wellesley.jpeg",license:"Public domain"
  },
  {
    name:"লর্ড উইলিয়াম বেন্টিঙ্ক",
    identity:"গভর্নর জেনারেল",
    action:"প্রশাসন ও শিক্ষায় পরিবর্তন আনেন; সামাজিক সংস্কারের কিছু উদ্যোগে স্থানীয় সংস্কারকদের সহযোগিতা দেন।",
    significance:"কিছু সংস্কারমূলক পদক্ষেপ থাকলেও এগুলো ঔপনিবেশিক শাসনের বৃহত্তর ক্ষমতা কাঠামোর ভেতরেই ঘটেছিল।",
    period:"১৮২৮–১৮৩৫",
    imageFile:"William Bentinck, 1st Graf Bentinck.jpg",license:"Public domain"
  },
  {
    name:"লর্ড হার্ডিঞ্জ",
    identity:"গভর্নর জেনারেল",
    action:"শিক্ষা ও প্রশাসনিক পরিবর্তনের ধারায় কাজ করেন।",
    significance:"ঔপনিবেশিক প্রশাসনকে আরও বিস্তৃত ও কার্যকর করার সময়ের একজন গুরুত্বপূর্ণ শাসক।",
    period:"১৮৪৪–১৮৪৮",
    imageFile:"Henryhardinge.jpg",license:"Public domain"
  },
  {
    name:"লর্ড ডালহৌসি",
    identity:"গভর্নর জেনারেল",
    action:"রেল, ডাক ও তার যোগাযোগ বিস্তারের পাশাপাশি ব্রিটিশ ভূখণ্ডগত নিয়ন্ত্রণ বাড়ান।",
    significance:"যোগাযোগব্যবস্থা প্রশাসন, বাণিজ্য ও সৈন্য চলাচল সহজ করে ঔপনিবেশিক রাষ্ট্রের ক্ষমতা সুসংহত করে।",
    period:"১৮৪৮–১৮৫৬",
    imageFile:"Dalhousie.jpg",license:"Public domain"
  }
];

const crownPeople:Person[]=[
  {
    name:"লর্ড ক্যানিং",
    identity:"প্রথম ভাইসরয়",
    action:"১৮৫৮ সালের ভারত শাসন আইনের পর ব্রিটিশ Crown-এর প্রতিনিধি হিসেবে শাসন পরিচালনা করেন।",
    significance:"কোম্পানি শাসনের অবসান হলেও ভারতের শাসন ভারতীয় জনগণের হাতে ফেরেনি; তা সরাসরি ব্রিটিশ সরকারের অধীনে যায়।",
    period:"১৮৫৮–১৮৬২",
    imageFile:"Lord Viscount Canning.jpg",license:"Public domain"
  }
];

const colonialControlPoints=[
  {n:"১",title:"ভূমি ও রাজস্ব",text:"রাজস্বব্যবস্থা ঔপনিবেশিক প্রশাসনের নিয়ন্ত্রণে কেন্দ্রীভূত হয়।",harm:"কৃষক ও প্রজাদের ওপর রাজস্বচাপ শাসনের প্রধান অর্থনৈতিক ভিত্তি হয়ে ওঠে।",visual:"🌾 → ৳ → 🏛"},
  {n:"২",title:"চিরস্থায়ী বন্দোবস্ত · ১৭৯৩",text:"ব্রিটিশদের অনুগত ও রাজস্ব-দায়ী জমিদার শ্রেণিকে শক্তিশালী করা হয়।",harm:"চাষির শ্রম ও জমির ওপর নির্ভর করেও রাজস্বব্যবস্থায় কৃষক ছিল দুর্বল পক্ষ।",visual:"কৃষক → জমিদার → ঔপনিবেশিক রাজস্ব"},
  {n:"৩",title:"রাষ্ট্র ও প্রশাসনে কর্তৃত্ব",text:"আইন, বিচার, রাজস্ব ও প্রশাসনিক দপ্তরে ইংরেজ নিয়ন্ত্রণ সুসংহত করা হয়।",harm:"নিজেদের দেশের রাজনৈতিক সিদ্ধান্তে স্থানীয় মানুষের কর্তৃত্ব সীমিত থাকে।",visual:"⚖ + ৳ + 🏛 = CONTROL"},
  {n:"৪",title:"মুর্শিদাবাদ → কলকাতা",text:"প্রশাসনিক দপ্তর, শিক্ষা ও বাণিজ্যিক প্রতিষ্ঠান কলকাতাকেন্দ্রিক করা হয়।",harm:"ক্ষমতার কেন্দ্র এমন শহরে সরতে থাকে যেখানে ঔপনিবেশিক প্রশাসনের নিয়ন্ত্রণ সবচেয়ে শক্তিশালী ছিল।",visual:"মুর্শিদাবাদ → কলকাতা"}
];

const crownTimeline=[
  {year:"১৮৫৭",title:"সিপাহি বিদ্রোহ",text:"বিভিন্ন ব্যারাকে বিদ্রোহ ছড়িয়ে পড়ে; ব্রিটিশ বাহিনী কঠোরভাবে তা দমন করে।"},
  {year:"১৮৫৮",title:"কোম্পানি থেকে Crown",text:"ভারত শাসন আইনে East India Company-এর প্রশাসনিক শাসনের অবসান হয়; সরাসরি ব্রিটিশ সরকারি শাসন শুরু হয়।"},
  {year:"১৮৬১–৬২",title:"আইনপরিষদ",text:"বঙ্গীয় আইনপরিষদের কাঠামো গড়ে ওঠে, কিন্তু শুরুতে সদস্যরা নির্বাচিত ছিলেন না এবং চূড়ান্ত কর্তৃত্ব ব্রিটিশ শাসকদের কাছেই থাকে।"},
  {year:"১৯৪৭",title:"ঔপনিবেশিক শাসনের অবসান",text:"ব্রিটিশ শাসনের অবসানের সঙ্গে ভারত ও পাকিস্তান নামে দুটি রাষ্ট্র প্রতিষ্ঠিত হয়।"}
];

const crownHarms=[
  {title:"কৃষক সংখ্যাগরিষ্ঠ, জমিদার অল্প কিন্তু শক্তিশালী",text:"সমাজে বিপুল কৃষক জনগোষ্ঠীর বিপরীতে সুবিধাপ্রাপ্ত জমিদার শ্রেণি ছিল তুলনামূলকভাবে ছোট কিন্তু ক্ষমতাশালী।",visual:"🌾🌾🌾🌾  ↔  🏠"},
  {title:"কৃষি ও তাঁতশিল্পের দুর্বলতা",text:"পাঠ্যবই বাংলার কৃষি ও এককালের সমৃদ্ধ তাঁতশিল্পকে ঔপনিবেশিক অর্থনীতির চাপে গভীরভাবে দুর্বল হয়ে পড়ার কথা তুলে ধরে।",visual:"🧵 ↓   🌾 চাপের মধ্যে"},
  {title:"স্থানীয় শিল্প ও বণিকগোষ্ঠীর সীমাবদ্ধতা",text:"স্থানীয় কুটির ও ক্ষুদ্র শিল্প এবং সংগঠিত বণিকশক্তি ঔপনিবেশিক অর্থনৈতিক কাঠামোয় শক্তিশালী ভিত্তি গড়ে তুলতে পারেনি।",visual:"🏪 ↓   🏭 বাইরে"},
  {title:"নারী ও মধ্যবিত্তের সীমিত অগ্রগতি",text:"সামাজিক বাধা ও সীমিত সুযোগের কারণে নারীসমাজ পিছিয়ে ছিল এবং মধ্যবিত্ত সমাজও দীর্ঘ সময় দুর্বল ছিল।",visual:"সুযোগ কম → অংশগ্রহণ কম"},
  {title:"ধনী সাম্রাজ্য, দরিদ্র উপনিবেশ",text:"ব্রিটেন শিল্প ও সাম্রাজ্যিক সম্পদে দ্রুত সমৃদ্ধ হচ্ছিল, অথচ ভারত ছিল তার উপনিবেশ এবং সম্পদ আহরণের ক্ষেত্র।",visual:"উপনিবেশের সম্পদ → সাম্রাজ্য"}
];

function Portrait({person,large=false}:{person:Person;large?:boolean}){
  if(!person.imageFile)return <div className={large?styles.portraitFallbackLarge:styles.portraitFallback}><span>{person.name.slice(0,1)}</span><small>মুক্ত ও নির্ভরযোগ্য প্রতিকৃতি পাওয়া যায়নি</small></div>;
  return <figure className={large?styles.portraitLarge:styles.portrait}>
    <img src={commons(person.imageFile)} alt={`${person.name}-এর ঐতিহাসিক/প্রতিনিধিত্বমূলক চিত্র`} loading="lazy"/>
    <figcaption><span>{person.license}</span><a href={commonsPage(person.imageFile)} target="_blank" rel="noopener noreferrer">Wikimedia Commons <ExternalLink/></a></figcaption>
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
    {id:"exploitation" as SectionId,label:"পাঠ ৪ · দ্বৈত শাসন",icon:<CircleDollarSign/>},
    {id:"crown" as SectionId,label:"পাঠ ৫ · ১৮৫৮–১৯৪৭",icon:<Landmark/>},
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
          <span>এখন পর্যন্ত আলোচিত পাঠগুলো এক ধারাবাহিক গল্পে · উপনিবেশের ধারণা থেকে দ্বৈত শাসন ও ১৮৫৮–১৯৪৭-এর ব্রিটিশ সরকারি শাসন পর্যন্ত</span>
        </div>
        <div className={styles.heroStamp}><small>CHAPTER</small><b>০১</b></div>
      </section>

      {role==="teacher"&&<aside className={styles.teacherGuide}>
        <div><BookOpen/><strong>শিক্ষকের পাঠ পরিকল্পনা · ৪৫–৫০ মিনিট</strong></div>
        <p><b>প্রথম সেশন:</b> উপনিবেশের ধারণা → অশোক থেকে সিরাজ → ইউরোপীয় বাণিজ্য → পলাশী। <b>দ্বিতীয় সেশন:</b> ১৭৬৫–১৭৭৩ দ্বৈত শাসন → দুর্ভিক্ষ ও রাজস্বচাপ → গভর্নর জেনারেল → ১৮৫৮–১৯৪৭ Crown rule ও তার সামাজিক-অর্থনৈতিক প্রভাব। প্রতিটি অংশে আগে শিক্ষার্থীর অনুমান নিন, পরে evidence reveal করুন।</p>
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

      {section==="exploitation"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>পাঠ ৪ · ঔপনিবেশিক শাসন ও শোষণ</span><h2>দ্বৈত শাসন: ক্ষমতা একদিকে, দায়িত্ব আরেকদিকে</h2><p>১৭৬৫–১৭৭৩ সময়টাকে ৪টি তারিখে বুঝি—সংজ্ঞা মুখস্থ নয়, মানুষের অভিজ্ঞতা দিয়ে।</p></div>

        <div className={styles.dualHook}>
          <article><small>নবাব</small><Crown/><h3>দায়িত্ব আছে</h3><p>শাসন ও বিচার বিভাগের দায়িত্ব</p><strong>কিন্তু প্রয়োজনীয় অর্থনৈতিক ক্ষমতা সীমিত</strong></article>
          <div className={styles.dualEquals}><span>≠</span><b>দ্বৈত শাসন</b><small>ক্ষমতা ও দায়িত্ব বিচ্ছিন্ন</small></div>
          <article><small>East India Company</small><CircleDollarSign/><h3>ক্ষমতা আছে</h3><p>রাজস্ব আদায় ও প্রতিরক্ষার ক্ষমতা</p><strong>কিন্তু মানুষের দৈনন্দিন শাসনের দায় সরাসরি নেয় না</strong></article>
        </div>

        <div className={styles.dualFormula}>
          <strong>সবচেয়ে সহজ ভাষায়</strong>
          <span>নবাব = ক্ষমতাহীন দায়িত্ব</span>
          <b>+</b>
          <span>কোম্পানি = দায়িত্বহীন ক্ষমতা</span>
        </div>

        <div className={styles.timeline1765}>
          {dualTimeline.map((item,i)=><button key={item.year} className={selectedDual===i?styles.timeline1765Active:""} onClick={()=>setSelectedDual(i)}><b>{item.year}</b><span>{item.title}</span></button>)}
        </div>
        <article className={styles.timeline1765Focus}>
          <small>{dualTimeline[selectedDual].year}</small>
          <h3>{dualTimeline[selectedDual].title}</h3>
          <p>{dualTimeline[selectedDual].text}</p>
          <div><strong>মানুষের জীবনে এর অর্থ</strong><span>{dualTimeline[selectedDual].impact}</span></div>
        </article>

        <div className={styles.curseMachine}>
          <div className={styles.sectionMini}><small>HOW THE PRESSURE BUILDS</small><h3>কীভাবে এই ব্যবস্থা মানুষের জন্য অভিশাপে পরিণত হলো?</h3></div>
          <div className={styles.pressureFlow}>
            {[
              ["কোম্পানির বেশি রাজস্বের চাহিদা","৳ ↑"],
              ["কৃষক ও প্রজার ওপর অতিরিক্ত কর","চাপ ↑"],
              ["অনাবৃষ্টি ও খরা","ফসল ↓"],
              ["কর কমানো হলো না","দাবি ↔"],
              ["খাদ্য ও অর্থের সংকট","সংকট ↑"],
              ["১৭৭০ · ছিয়াত্তরের মন্বন্তর","মানবিক বিপর্যয়"]
            ].map(([title,visual],i)=><div key={title}><span>{i+1}</span><strong>{title}</strong><b>{visual}</b>{i<5&&<ChevronRight/>}</div>)}
          </div>
          <p className={styles.accuracyNote}><b>গুরুত্বপূর্ণ:</b> দুর্ভিক্ষকে একটিমাত্র কারণ দিয়ে বোঝানো হবে না। অনাবৃষ্টি ও খরায় ফসলহানি হয়েছিল; কঠোর রাজস্বচাপ এবং কর না কমানো মানুষের দুর্দশা আরও বাড়ায়।</p>
        </div>

        <div className={styles.famineView}>
          <article><span>🌧️✕</span><strong>পর পর অনাবৃষ্টি</strong><p>পানির অভাব ও খরা</p></article>
          <ChevronRight/>
          <article><span>🌾↓</span><strong>ফসলের ক্ষতি</strong><p>খাদ্যের প্রাপ্যতা কমে</p></article>
          <ChevronRight/>
          <article><span>৳</span><strong>রাজস্বচাপ বহাল</strong><p>সংকটের সময়ও করের বোঝা কমেনি</p></article>
          <ChevronRight/>
          <article><span>১৭৭০</span><strong>ছিয়াত্তরের মন্বন্তর</strong><p>পাঠ্যবই অনুযায়ী বাংলার প্রায় এক-তৃতীয়াংশ মানুষের মৃত্যু ঘটে</p></article>
        </div>

        <div className={styles.responsibilityTest}>
          <div><small>INTERACTIVE IDEA</small><h3>“সমস্যা হলে কার কাছে যাবে?”</h3><p>দ্বৈত শাসনের দুর্বলতা ধরতে দুই দিক দেখো।</p></div>
          <article><Crown/><strong>নবাবের কাছে গেলে</strong><p>প্রশাসনিক দায় আছে, কিন্তু রাজস্ব ও বাস্তব ক্ষমতার বড় অংশ কোম্পানির হাতে।</p></article>
          <article><CircleDollarSign/><strong>কোম্পানির কাছে গেলে</strong><p>অর্থ ও প্রতিরক্ষার ক্ষমতা আছে, কিন্তু সাধারণ মানুষের দৈনন্দিন প্রশাসনের দায় থেকে দূরে থাকে।</p></article>
        </div>

        <div className={styles.governorSection}>
          <div className={styles.sectionMini}><small>নাম + মুখ + একটি মূল কাজ</small><h3>উল্লেখযোগ্য গভর্নর জেনারেল</h3><p>দীর্ঘ জীবনী নয়—প্রত্যেকের সঙ্গে একটি প্রধান ধারণা যুক্ত করো।</p></div>
          <div className={styles.governorTabs}>
            {governorGenerals.map((person,i)=><button key={person.name} className={selectedGovernor===i?styles.governorActive:""} onClick={()=>setSelectedGovernor(i)}><Portrait person={person}/><span><small>{person.period}</small><strong>{person.name}</strong></span></button>)}
          </div>
          <div className={styles.governorFocus}>
            <Portrait person={governorGenerals[selectedGovernor]} large/>
            <div><small>{governorGenerals[selectedGovernor].period}</small><h3>{governorGenerals[selectedGovernor].name}</h3><p>{governorGenerals[selectedGovernor].action}</p><strong>{governorGenerals[selectedGovernor].significance}</strong></div>
          </div>
        </div>

        <div className={styles.controlPoints}>
          <div className={styles.sectionMini}><small>৪টি মূল পয়েন্ট</small><h3>কীভাবে ঔপনিবেশিক নিয়ন্ত্রণ স্থায়ী কাঠামো পেল?</h3></div>
          <div>{colonialControlPoints.map(item=><article key={item.n}><b>{item.n}</b><small>{item.visual}</small><h3>{item.title}</h3><p>{item.text}</p><strong>ক্ষতির দিক: {item.harm}</strong></article>)}</div>
        </div>
      </section>}

      {section==="crown"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>পাঠ ৫ · বাংলায় ব্রিটিশ শাসন · ১৮৫৮–১৯৪৭</span><h2>কোম্পানি গেল—ঔপনিবেশিক নিয়ন্ত্রণ গেল না</h2><p>এই অংশে প্রতিটি ঘটনা একটি প্রশ্ন দিয়ে দেখো: <b>কার হাতে ক্ষমতা গেল, আর তার খরচ কে বহন করল?</b></p></div>

        <div className={styles.crownSwitch}>
          <article><small>১৮৫৮-এর আগে</small><Store/><h3>East India Company</h3><p>বাণিজ্যিক কোম্পানি হয়েও রাষ্ট্রীয় ক্ষমতা চালায়</p></article>
          <ChevronRight/>
          <article><small>১৮৫৮-এর পরে</small><Crown/><h3>British Crown</h3><p>ভারতের শাসন সরাসরি ব্রিটিশ সরকারের হাতে যায়</p></article>
          <div><strong>শাসক কাঠামো বদলেছে</strong><span>কিন্তু ভারতীয় জনগণের হাতে সার্বভৌম ক্ষমতা ফেরেনি</span></div>
        </div>

        <div className={styles.crownTimeline}>
          {crownTimeline.map(item=><article key={item.year}><b>{item.year}</b><strong>{item.title}</strong><p>{item.text}</p></article>)}
        </div>

        <div className={styles.viceroyCard}>
          <Portrait person={crownPeople[0]} large/>
          <div><small>প্রথম ভাইসরয়</small><h3>{crownPeople[0].name}</h3><p>{crownPeople[0].action}</p><strong>{crownPeople[0].significance}</strong></div>
        </div>

        <div className={styles.controlDoors}>
          <div className={styles.sectionMini}><small>WHO CONTROLS THE COUNTRY?</small><h3>চারটি দরজা, একই ঔপনিবেশিক কর্তৃত্ব</h3></div>
          <div>
            {[
              ["🏛","প্রশাসন","গুরুত্বপূর্ণ দপ্তর ও সিদ্ধান্তের চূড়ান্ত নিয়ন্ত্রণ ব্রিটিশ শাসনের হাতে।"],
              ["⚖","আইন ও বিচার","আইনপরিষদ তৈরি হলেও শুরুতে তা নির্বাচিত গণপ্রতিনিধিত্বের প্রতিষ্ঠান ছিল না; ব্রিটিশ কর্তৃত্ব বহাল ছিল।"],
              ["৳","রাজস্ব","ভূমি ও রাজস্বব্যবস্থা ছিল ঔপনিবেশিক রাষ্ট্রের আয়ের প্রধান ভিত্তি।"],
              ["🛡","রাষ্ট্রীয় শক্তি","সেনা ও প্রশাসনিক শক্তি ব্রিটিশ শাসন টিকিয়ে রাখে।"]
            ].map(([icon,title,text])=><article key={title}><span>{icon}</span><strong>{title}</strong><p>{text}</p></article>)}
          </div>
        </div>

        <div className={styles.impactWall}>
          <div className={styles.sectionMini}><small>DOCUMENTED HARMS</small><h3>১৮৫৮–১৯৪৭: সমাজ ও অর্থনীতিতে যে ক্ষতিগুলো স্পষ্ট</h3><p>পাঠ্যবইয়ের প্রতিটি paragraph-কে আলাদা story হিসেবে দেখানো হয়েছে।</p></div>
          <div>{crownHarms.map((item,i)=><article key={item.title}><b>{String(i+1).padStart(2,"0")}</b><small>{item.visual}</small><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>

        <div className={styles.infrastructureLens}>
          <div>
            <small>রেল · ডাক · তার</small>
            <h3>“নতুন অবকাঠামো” — কিন্তু কার প্রয়োজনকে আগে সেবা দিচ্ছিল?</h3>
            <p>রেল, ডাক ও তার যোগাযোগ মানুষের ব্যবহারের সুযোগও তৈরি করে। একই সঙ্গে এগুলো ঔপনিবেশিক প্রশাসনের জন্য সৈন্য, তথ্য ও পণ্য দ্রুত সরানো এবং দূরবর্তী অঞ্চল নিয়ন্ত্রণ সহজ করে। তাই একে শুধু “উপকার” বা শুধু “ক্ষতি”—কোনোটাই এককভাবে দেখানো হবে না; বরং <b>colonial purpose</b> এবং মানুষের বাস্তব ব্যবহার দুটোই আলাদা করে দেখানো হবে।</p>
          </div>
          <div className={styles.infrastructureFlow}><span>সৈন্য</span><ChevronRight/><span>তথ্য</span><ChevronRight/><span>পণ্য</span><ChevronRight/><strong>দ্রুত ঔপনিবেশিক নিয়ন্ত্রণ</strong></div>
        </div>

        <div className={styles.colonialDefinitionReturn}>
          <small>শুরুর সংজ্ঞায় ফিরে যাই</small>
          <h3>ঔপনিবেশিক শাসন শুধু “বিদেশি শাসক” নয়</h3>
          <div><span>ক্ষমতা</span><b>+</b><span>ভূমি</span><b>+</b><span>অর্থ</span><b>+</b><span>প্রশাসন</span><b>+</b><span>বাণিজ্য</span></div>
          <p>যখন এই নিয়ন্ত্রণগুলো স্থানীয় জনগণের পরিবর্তে বাইরের সাম্রাজ্যিক শক্তির স্বার্থে সংগঠিত হয়, তখন শোষণ একটি পুরো ব্যবস্থায় পরিণত হয়।</p>
        </div>
      </section>}

      {section==="recap"&&<section className={styles.panel}>
        <div className={styles.sectionTitle}><span>RECAP</span><h2>এখন পর্যন্ত পুরো গল্পটা একসঙ্গে জুড়ে দাও</h2><p>নাম ও সাল আলাদা আলাদা না রেখে পরিবর্তনের ধারাটি ধরো।</p></div>

        <div className={styles.recapFlow}>
          <article><Compass/><span>১</span><strong>উপনিবেশ কী?</strong><p>বাইরের শক্তির নিয়ন্ত্রণ যখন অর্থনীতি, প্রশাসন ও রাজনৈতিক সিদ্ধান্তে পৌঁছে যায়।</p></article>
          <article><Crown/><span>২</span><strong>বাংলা আগে কী ছিল?</strong><p>দীর্ঘ সময় ধরে বিভিন্ন স্বাধীন ও সাম্রাজ্যিক রাজনৈতিক কাঠামোর মধ্য দিয়ে বদলেছে।</p></article>
          <article><Ship/><span>৩</span><strong>ইউরোপীয়রা কেন এল?</strong><p>প্রথমে বাণিজ্যের জন্য—বাংলার মূল্যবান পণ্য ও বাজার তাদের আকৃষ্ট করে।</p></article>
          <article><Swords/><span>৪</span><strong>কীভাবে ক্ষমতা বদলাল?</strong><p>বাণিজ্যিক দ্বন্দ্ব + কর্তৃত্বের দ্বন্দ্ব + অভ্যন্তরীণ ষড়যন্ত্র → পলাশী → কোম্পানির রাজনৈতিক প্রভাব।</p></article><article><CircleDollarSign/><span>৫</span><strong>দ্বৈত শাসনে কী হলো?</strong><p>কোম্পানির হাতে ক্ষমতা, নবাবের হাতে দায়িত্ব → রাজস্বচাপ → ১৭৭০-এর দুর্ভিক্ষে মানুষের সংকট আরও গভীর।</p></article><article><Landmark/><span>৬</span><strong>১৮৫৮-এর পর কী বদলাল?</strong><p>কোম্পানির বদলে British Crown সরাসরি শাসন নেয়; ঔপনিবেশিক নিয়ন্ত্রণ প্রশাসন, রাজস্ব ও রাষ্ট্রীয় প্রতিষ্ঠানে বহাল থাকে।</p></article>
        </div>

        <div className={styles.bigChain}>
          <span>আগমন</span><ChevronRight/><span>বাণিজ্য</span><ChevronRight/><span>পলাশী</span><ChevronRight/><span>দ্বৈত শাসন</span><ChevronRight/><span>রাজস্ব ও প্রশাসনিক নিয়ন্ত্রণ</span><ChevronRight/><span>Crown rule</span><ChevronRight/><span>১৯৪৭</span>
        </div>

        <div className={styles.checks}>
          <h3>নিজেকে যাচাই করো</h3>
          {[
            ["বিদেশি বাণিজ্য আর উপনিবেশ কি একই জিনিস?","না। বাণিজ্য উপনিবেশ নয়; শাসনক্ষমতা ও নিয়ন্ত্রণের পরিবর্তনটাই মূল।"],
            ["ইউরোপীয়রা বাংলায় প্রথমে কেন আসে?","মূলত বাণিজ্য ও বাজারের জন্য।"],
            ["পলাশীর কারণ ৩ bucket-এ কী?","বাণিজ্য ও অর্থ · ক্ষমতা ও কর্তৃত্ব · অভ্যন্তরীণ ষড়যন্ত্র।"],
            ["পলাশীর সবচেয়ে বড় পরিবর্তন কী?","ইস্ট ইন্ডিয়া কোম্পানির বাণিজ্যিক শক্তি থেকে রাজনৈতিক নিয়ামক শক্তি হয়ে ওঠার পথ খুলে যায়।"],["দ্বৈত শাসনের সবচেয়ে বড় সমস্যা কী?","ক্ষমতা ও দায়িত্ব দুই জায়গায় ভাগ হয়ে যায়—কোম্পানির হাতে অর্থনৈতিক ক্ষমতা, নবাবের হাতে দায়।"],["১৮৫৮ সালে কি ভারত স্বাধীন হয়?","না। কোম্পানি শাসনের অবসান হয়, কিন্তু শাসন সরাসরি British Crown-এর হাতে যায়।"]
          ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>

        <div className={styles.nextLesson}><CheckCircle2/><div><small>NEXT · পাঠ ৬–৭</small><h3>ঔপনিবেশিক শাসনের প্রতিক্রিয়া</h3><p>দীর্ঘদিনের রাজনৈতিক ও অর্থনৈতিক নিয়ন্ত্রণের বিরুদ্ধে বাংলায় নবজাগরণ, প্রতিবাদ ও ব্রিটিশবিরোধী আন্দোলন কীভাবে গড়ে উঠল?</p></div></div>
      </section>}

      <footer className={styles.footer}>
        <p>পাঠ কাঠামো: NCTB Class 8 Bangladesh and Global Studies · Chapter 1-এর আলোচিত অংশ। Lesson 4–5-এ দ্বৈত শাসন, ১৭৭০-এর দুর্ভিক্ষ, গভর্নর জেনারেল, ১৮৫৮–১৯৪৭ British Crown rule এবং পাঠ্যবইয়ে বর্ণিত সামাজিক-অর্থনৈতিক প্রভাব যোগ করা হয়েছে। ঐতিহাসিক চিত্রগুলো মুক্ত লাইসেন্স / public-domain Wikimedia Commons উৎস থেকে দেখানো হয়েছে।</p>
      </footer>
    </div>
  </main>;
}
