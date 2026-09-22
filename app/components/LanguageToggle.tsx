"use client";

import {useEffect,useRef,useState} from "react";
import {Languages} from "lucide-react";

type Lang="en"|"bn";

const pairs:[string,string][]=[
 ["Home","হোম"],["About Us","আমাদের সম্পর্কে"],["Login","লগইন"],["Sign Up","সাইন আপ"],
 ["Built for the Bangladeshi curriculum","বাংলাদেশের শিক্ষাক্রমের জন্য তৈরি"],
 ["Learn it","শিখুন"],["your way.","আপনার নিজের উপায়ে।"],
 ["Choose a subject, explore the lesson, and find the way of learning that works for you.","একটি বিষয় বেছে নিন, পাঠটি ঘুরে দেখুন, আর আপনার জন্য যে শেখার পদ্ধতিটি কাজ করে সেটি খুঁজে নিন।"],
 ["Join as a Student","শিক্ষার্থী হিসেবে যোগ দিন"],["Join as a Teacher","শিক্ষক হিসেবে যোগ দিন"],
 ["I found something","আমি কিছু খুঁজে পেয়েছি"],["Interactive preview","ইন্টারঅ্যাকটিভ প্রিভিউ"],["Tap anything","যেকোনো কিছুতে চাপ দিন"],
 ["A peek inside Bujhi","বুঝির ভেতরে এক ঝলক"],["Read","পড়ুন"],["Watch","দেখুন"],["Explore","অন্বেষণ"],["Practice","অনুশীলন"],
 ["A tiny universe on paper","কাগজে ছোট্ট এক মহাবিশ্ব"],["Follow one clear idea at a time.","একবারে একটি পরিষ্কার ধারণা অনুসরণ করুন।"],
 ["See motion make sense","চলনের মাধ্যমে বুঝুন"],["Watch a difficult idea become visible.","কঠিন ধারণাকে চোখের সামনে সহজ হতে দেখুন।"],
 ["The Solar System","সৌরজগৎ"],["Watch the planets orbit the Sun.","গ্রহগুলোকে সূর্যকে প্রদক্ষিণ করতে দেখুন।"],
 ["Try it without pressure","চাপ ছাড়াই চেষ্টা করুন"],["Choose, test, and learn from the answer.","বেছে নিন, যাচাই করুন, আর উত্তর থেকে শিখুন।"],
 ["Try this approach","এই পদ্ধতিটি চেষ্টা করুন"],["Pause orbit","কক্ষপথ থামান"],["Play orbit","কক্ষপথ চালু করুন"],["Tap a planet for a fact","তথ্য জানতে একটি গ্রহে চাপ দিন"],
 ["Open a thought","একটি ভাবনা খুলুন"],["Try a hidden quiz","গোপন কুইজ চেষ্টা করুন"],["Find a tiny fact","ছোট্ট একটি তথ্য খুঁজুন"],["Open your learning desk","আপনার শেখার ডেস্ক খুলুন"],
 ["One idea, more than one path","একটি ধারণা, বোঝার একাধিক পথ"],["When one explanation does not click, try another.","একটি ব্যাখ্যা বুঝতে না পারলে আরেকটি চেষ্টা করুন।"],
 ["See it","দেখুন"],["Connect it","সংযোগ করুন"],["Try it","চেষ্টা করুন"],
 ["Visual explanations reveal what words can hide.","দৃশ্যভিত্তিক ব্যাখ্যা এমন কিছু দেখায় যা শুধু শব্দে ধরা পড়ে না।"],
 ["Everyday examples make ideas feel real.","দৈনন্দিন উদাহরণ ধারণাকে বাস্তব মনে করায়।"],
 ["Small activities turn information into understanding.","ছোট ছোট কার্যক্রম তথ্যকে বোঝাপড়ায় রূপ দেয়।"],
 ["Why Bujhi exists","কেন বুঝি"],["Built around the way students actually learn.","শিক্ষার্থীরা যেভাবে সত্যি শেখে, সেই ভাবনা থেকে তৈরি।"],
 ["Hidden desk quiz","গোপন ডেস্ক কুইজ"],["Why do we experience seasons?","ঋতু পরিবর্তন কেন হয়?"],
 ["Earth moves closer to the Sun","পৃথিবী সূর্যের আরও কাছে চলে যায়"],["Earth’s axis is tilted","পৃথিবীর অক্ষ হেলানো"],["The Sun becomes colder","সূর্য আরও ঠান্ডা হয়ে যায়"],
 ["Exactly. The tilt changes how directly sunlight reaches each hemisphere.","ঠিক। অক্ষের হেলানো অবস্থার কারণে দুই গোলার্ধে সূর্যালোকের সরাসরি পড়ার পরিমাণ বদলে যায়।"],
 ["Not quite. Distance is not the main reason—try the tilt.","ঠিক নয়। দূরত্ব প্রধান কারণ নয়—অক্ষের হেলানো অবস্থাটি ভাবুন।"],

 ["Back home","হোমে ফিরুন"],["Our story","আমাদের গল্প"],["Bujhi began with a frustration I knew personally.","বুঝির শুরু এমন একটি হতাশা থেকে, যা আমি নিজে অনুভব করেছি।"],
 ["I learned how to prepare the expected answer. But preparing an answer and understanding an idea were not always the same thing.","আমি পরীক্ষায় প্রত্যাশিত উত্তর তৈরি করতে শিখেছিলাম। কিন্তু উত্তর তৈরি করা আর একটি ধারণা সত্যি বোঝা সব সময় এক ছিল না।"],
 ["Follow the story","গল্পটি অনুসরণ করুন"],["A note from the founder","প্রতিষ্ঠাতার একটি কথা"],
 ["Knowing the words is not the same as knowing the idea.","শব্দ জানা আর ধারণা বোঝা এক জিনিস নয়।"],
 ["Three views of the idea","ধারণাটিকে দেখার তিনটি দিক"],["Where the question began","প্রশ্নটির শুরু যেখানে"],["The classroom reality","শ্রেণিকক্ষের বাস্তবতা"],["The future we are building","আমরা যে ভবিষ্যৎ তৈরি করছি"],
 ["An idea gained a platform to become work.","একটি ধারণা বাস্তব কাজে রূপ নেওয়ার প্ল্যাটফর্ম পেল।"],
 ["What we are trying to do","আমরা যা করতে চাই"],["One curriculum. More ways to understand and explain it.","একটি শিক্ষাক্রম। বোঝা ও বোঝানোর আরও অনেক উপায়।"],
 ["For students","শিক্ষার্থীদের জন্য"],["For teachers","শিক্ষকদের জন্য"],["Explore the homepage","হোমপেজ দেখুন"],["Built for understanding.","বোঝার জন্য তৈরি।"],

 ["Choose how you enter","আপনি কীভাবে প্রবেশ করবেন বেছে নিন"],["Student view","শিক্ষার্থী ভিউ"],["Teacher view","শিক্ষক ভিউ"],["Already joined? Log in","আগেই যোগ দিয়েছেন? লগইন করুন"],
 ["Find your place in the classroom.","শ্রেণিকক্ষে আপনার জায়গা খুঁজে নিন।"],["Teacher","শিক্ষক"],["Tap any student to choose a seat and create a student account.","একটি আসন বেছে নিতে যেকোনো শিক্ষার্থীর ওপর চাপ দিন এবং শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন।"],
 ["Sign in to open your teacher desk.","আপনার শিক্ষক ডেস্ক খুলতে সাইন ইন করুন।"],["Sign in as Teacher","শিক্ষক হিসেবে সাইন ইন করুন"],["Open your teacher desk","আপনার শিক্ষক ডেস্ক খুলুন"],["Students' side","শিক্ষার্থীদের দিক"],["Teacher's side","শিক্ষকের দিক"],["Use either arrow to turn","ঘুরতে যেকোনো তীর ব্যবহার করুন"],

 ["Welcome back","আবার স্বাগতম"],["Begin your Bujhi journey","আপনার বুঝি যাত্রা শুরু করুন"],["Log in to your desk","আপনার ডেস্কে লগইন করুন"],["Create your account","আপনার অ্যাকাউন্ট তৈরি করুন"],
 ["Student","শিক্ষার্থী"],["Email address","ইমেইল ঠিকানা"],["Password","পাসওয়ার্ড"],["Full name","পূর্ণ নাম"],["Your name","আপনার নাম"],["At least 6 characters","কমপক্ষে ৬ অক্ষর"],
 ["Subject","বিষয়"],["For example: Science","যেমন: বিজ্ঞান"],["Your Bujhi account is used to open the correct student or teacher desk.","আপনার বুঝি অ্যাকাউন্ট সঠিক শিক্ষার্থী বা শিক্ষক ডেস্ক খুলতে ব্যবহৃত হয়।"],
 ["Log in","লগইন"],["Create account","অ্যাকাউন্ট তৈরি করুন"],["Opening your desk…","আপনার ডেস্ক খোলা হচ্ছে…"],["New to Bujhi?","বুঝিতে নতুন?"],["Already have an account?","আগেই অ্যাকাউন্ট আছে?"],["Choose your place","আপনার জায়গা বেছে নিন"],

 ["Student desk","শিক্ষার্থী ডেস্ক"],["Teacher desk","শিক্ষক ডেস্ক"],["My study desk","আমার পড়ার ডেস্ক"],["A little learning,","অল্প অল্প শেখা,"],["every day.","প্রতিদিন।"],
 ["Pick a book from your shelf to begin.","শুরু করতে তাক থেকে একটি বই বেছে নিন।"],["Your own space to understand","বোঝার জন্য আপনার নিজস্ব জায়গা"],
 ["A thought to keep","মনে রাখার একটি ভাবনা"],["Write something you want to remember…","যা মনে রাখতে চান তা লিখুন…"],["My books","আমার বই"],["My notes","আমার নোট"],
 ["Personal notes","ব্যক্তিগত নোট"],["My sticky note","আমার স্টিকি নোট"],["Saved automatically on this device for now.","এখন এই ডিভাইসে স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে।"],["Saved automatically","স্বয়ংক্রিয়ভাবে সংরক্ষিত"],
 ["Quick check","দ্রুত যাচাই"],["Short concept questions for this chapter.","এই অধ্যায়ের ছোট ধারণাভিত্তিক প্রশ্ন।"],["Practice set","অনুশীলন সেট"],["Topic-wise exercises and revision activities.","বিষয়ভিত্তিক অনুশীলন ও পুনরাবৃত্তি কার্যক্রম।"],["Try again","আবার চেষ্টা করুন"],
 ["Questions based on topics that need another explanation.","যেসব বিষয়ে আরও একটি ব্যাখ্যা দরকার সেগুলোর ওপর ভিত্তি করে প্রশ্ন।"],["Coming with lesson content","পাঠের কনটেন্টের সঙ্গে আসছে"],["Coming with progress data","অগ্রগতির তথ্যের সঙ্গে আসছে"],
 ["Lesson","পাঠ"],["Chapter lesson space","অধ্যায়ের পাঠের জায়গা"],["Chapter-wise lessons will be uploaded here later. The selected book and chapter are already connected to this flow.","অধ্যায়ভিত্তিক পাঠ পরে এখানে আপলোড করা হবে। নির্বাচিত বই ও অধ্যায় ইতিমধ্যে এই প্রবাহের সঙ্গে যুক্ত।"],
 ["Textbook PDF","পাঠ্যবই PDF"],["Open the full official textbook.","সম্পূর্ণ সরকারি পাঠ্যবই খুলুন।"],["PDF coming soon","PDF শিগগিরই আসছে"],["Chapter lessons","অধ্যায়ের পাঠ"],["Choose a chapter","একটি অধ্যায় বেছে নিন"],

 ["Your classes","আপনার ক্লাসসমূহ"],["Teaching folder","শিক্ষণ ফোল্ডার"],["Teacher lesson desk","শিক্ষকের পাঠ ডেস্ক"],["Plan. Teach. Help them understand.","পরিকল্পনা করুন। শেখান। বুঝতে সাহায্য করুন।"],
 ["Open a class folder from the shelf to begin.","শুরু করতে তাক থেকে একটি ক্লাস ফোল্ডার খুলুন।"],["Class → subject → chapter → lesson","ক্লাস → বিষয় → অধ্যায় → পাঠ"],
 ["Teacher note","শিক্ষকের নোট"],["Write a reminder for yourself…","নিজের জন্য একটি স্মরণিকা লিখুন…"],["My classes","আমার ক্লাস"],["Lessons","পাঠসমূহ"],
 ["Choose a subject","একটি বিষয় বেছে নিন"],["Teacher notes","শিক্ষকের নোটসমূহ"],["Something to remember","মনে রাখার মতো কিছু"],["Write a reminder, idea, or classroom note…","একটি স্মরণিকা, ধারণা বা শ্রেণিকক্ষের নোট লিখুন…"],

 ["Choose a drink","একটি পানীয় বেছে নিন"],["Boba tea","বোবা চা"],["Tea","চা"],["Coffee","কফি"],["Water","পানি"],["Lemonade","লেমোনেড"],["Change","পরিবর্তন"],
 ["Room light on","রুমের আলো চালু"],["Room light off","রুমের আলো বন্ধ"],

 ["Book not found","বই পাওয়া যায়নি"],["This textbook is not in this class shelf.","এই পাঠ্যবইটি এই শ্রেণির তাকে নেই।"],["Back to my desk","আমার ডেস্কে ফিরুন"],["Opening your book…","আপনার বই খোলা হচ্ছে…"],
 ["My textbook","আমার পাঠ্যবই"],["Choose how you want to use this book. The PDF button checks for the actual uploaded textbook file. Learn Lesson opens Bujhi's lesson space for this exact book.","আপনি বইটি কীভাবে ব্যবহার করতে চান তা বেছে নিন। PDF বোতামটি আসল আপলোড করা পাঠ্যবই ফাইল আছে কি না যাচাই করে। Learn Lesson এই বইয়ের জন্য বুঝির পাঠের জায়গা খুলে দেয়।"],
 ["Checking PDF…","PDF যাচাই হচ্ছে…"],["Open PDF","PDF খুলুন"],["Read the full NCTB textbook.","সম্পূর্ণ NCTB পাঠ্যবই পড়ুন।"],["Learn Lesson","পাঠ শিখুন"],["Open the lesson workspace for this book.","এই বইয়ের পাঠের ওয়ার্কস্পেস খুলুন।"],["PDF upload slot","PDF আপলোডের স্থান"],
 ["This PDF has not been uploaded yet. The slot is ready for your textbook file.","এই PDF এখনো আপলোড করা হয়নি। আপনার পাঠ্যবই ফাইলের জন্য স্থান প্রস্তুত।"],["The PDF could not be opened right now.","এই মুহূর্তে PDF খোলা যায়নি।"],

 ["Front left","সামনের বাম"],["Front centre","সামনের মাঝখান"],["Front right","সামনের ডান"],["Middle left","মাঝের বাম"],["Middle centre","মাঝের মাঝখান"],["Middle right","মাঝের ডান"],["Back left","পেছনের বাম"],["Back centre","পেছনের মাঝখান"],["Back right","পেছনের ডান"],["Window seat","জানালার পাশের আসন"],["Aisle seat","চলাচলের পাশের আসন"],["Book-corner seat","বইয়ের কোণের আসন"],

 ["Bangla","বাংলা"],["English","ইংরেজি"],["Mathematics","গণিত"],["Science","বিজ্ঞান"],["ICT","আইসিটি"],["Bangladesh Studies","বাংলাদেশ ও বিশ্বপরিচয়"],["Religion","ধর্ম"],["Agriculture","কৃষিশিক্ষা"],["Home Science","গার্হস্থ্য বিজ্ঞান"],["Arts","শিল্প ও সংস্কৃতি"],["Physical Education","শারীরিক শিক্ষা"],["Work Education","কর্ম ও জীবনমুখী শিক্ষা"],
 ["Bangladesh & Global Studies","বাংলাদেশ ও বিশ্বপরিচয়"],["Religion / Ethics","ধর্ম / নৈতিকতা"],["Arts & Culture","শিল্প ও সংস্কৃতি"],["Living things","জীবজগৎ"],["Cells","কোষ"],["Human body systems","মানবদেহের তন্ত্র"],["Food and nutrition","খাদ্য ও পুষ্টি"],["Matter and energy","পদার্থ ও শক্তি"],["Earth and space","পৃথিবী ও মহাকাশ"],
 ["Literature","সাহিত্য"],["Grammar","ব্যাকরণ"],["Writing","লেখা"],["Language practice","ভাষা অনুশীলন"],["Reading","পঠন"],["Revision","পুনরাবৃত্তি"],["Numbers","সংখ্যা"],["Algebra","বীজগণিত"],["Geometry","জ্যামিতি"],["Measurement","পরিমাপ"],["Data","উপাত্ত"],["Probability","সম্ভাবনা"],["Society","সমাজ"],["History","ইতিহাস"],["Citizenship","নাগরিকত্ব"],["Economy","অর্থনীতি"],["Environment","পরিবেশ"],["Digital citizenship","ডিজিটাল নাগরিকত্ব"],["Information","তথ্য"],["Devices","ডিভাইস"],["Networks","নেটওয়ার্ক"],["Creative computing","সৃজনশীল কম্পিউটিং"],["Safety","নিরাপত্তা"],["Values","মূল্যবোধ"],["Character","চরিত্র"],["Community","সম্প্রদায়"],["Responsibility","দায়িত্ব"],["Reflection","পর্যালোচনা"],["Visual art","দৃশ্যশিল্প"],["Music","সংগীত"],["Performance","পরিবেশনা"],["Craft","কারুশিল্প"],["Culture","সংস্কৃতি"],["Creative project","সৃজনশীল প্রকল্প"],

 ["Class 8 · Science · Chapter 2","শ্রেণি ৮ · বিজ্ঞান · অধ্যায় ২"],["Chapter complete","অধ্যায় সম্পূর্ণ"],["Teacher বলছে","শিক্ষক বলছে"]
];

const enToBn=new Map(pairs);
const bnToEn=new Map(pairs.map(([en,bn])=>[bn,en]));

const textNodes=new WeakMap<Node,string>();
const attrValues=new WeakMap<Element,Map<string,string>>();
let applying=false;

function translateDynamic(value:string,lang:Lang){
  const trimmed=value.trim();
  if(!trimmed)return value;
  const map=lang==="bn"?enToBn:bnToEn;
  const exact=map.get(trimmed);
  let out=exact||trimmed;

  if(lang==="bn"){
    out=out
      .replace(/^Class (\d+)$/,"শ্রেণি $1")
      .replace(/^Class (\d+) folder$/,"শ্রেণি $1 ফোল্ডার")
      .replace(/^Open Class (\d+)$/,"শ্রেণি $1 খুলুন")
      .replace(/^Chapter (\d+)$/,"অধ্যায় $1")
      .replace(/^Chapter (\d+) folder$/,"অধ্যায় $1 ফোল্ডার")
      .replace(/^Back to Class (\d+) desk$/,"শ্রেণি $1 ডেস্কে ফিরুন")
      .replace(/^Class (\d+) · (.+)$/,(m,n,rest)=>`শ্রেণি ${n} · ${translateDynamic(rest,"bn").trim()}`)
      .replace(/ · Chapter (\d+)$/," · অধ্যায় $1")
      .replace(/^Open (.+)$/,(m,x)=>`খুলুন ${translateDynamic(x,"bn").trim()}`);
  }else{
    out=out
      .replace(/^শ্রেণি (\d+)$/,"Class $1")
      .replace(/^শ্রেণি (\d+) ফোল্ডার$/,"Class $1 folder")
      .replace(/^শ্রেণি (\d+) খুলুন$/,"Open Class $1")
      .replace(/^অধ্যায় (\d+)$/,"Chapter $1")
      .replace(/^শ্রেণি (\d+) ডেস্কে ফিরুন$/,"Back to Class $1 desk");
  }

  const leading=value.match(/^\s*/)?.[0]||"";
  const trailing=value.match(/\s*$/)?.[0]||"";
  return leading+out+trailing;
}

function translateTextNode(node:Node,lang:Lang){
  if(node.parentElement?.closest("script,style,code,pre,[data-no-translate]"))return;
  const current=node.nodeValue||"";
  let source=textNodes.get(node);
  const expected=source===undefined?undefined:translateDynamic(source,lang);
  if(source!==undefined&&current!==expected&&current!==source)source=current;
  if(source===undefined)source=current;
  textNodes.set(node,source);
  const next=translateDynamic(source,lang);
  if(next!==current)node.nodeValue=next;
}

function translateAttributes(el:Element,lang:Lang){
  const attrs=["placeholder","aria-label","title"];
  let originals=attrValues.get(el);
  if(!originals){originals=new Map();attrValues.set(el,originals)}
  for(const attr of attrs){
    if(!el.hasAttribute(attr))continue;
    const current=el.getAttribute(attr)||"";
    let source=originals.get(attr);
    const expected=source===undefined?undefined:translateDynamic(source,lang);
    if(source!==undefined&&current!==expected&&current!==source)source=current;
    if(source===undefined)source=current;
    originals.set(attr,source);
    const next=translateDynamic(source,lang);
    if(next!==current)el.setAttribute(attr,next);
  }
}

function translateTree(root:ParentNode,lang:Lang){
  applying=true;
  try{
    if(root instanceof Element)translateAttributes(root,lang);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node:Node|null;
    while((node=walker.nextNode()))translateTextNode(node,lang);
    if("querySelectorAll" in root)(root as ParentNode).querySelectorAll("*").forEach(el=>translateAttributes(el,lang));
  }finally{applying=false}
}

export default function LanguageToggle(){
  const[lang,setLang]=useState<Lang>("en");
  const langRef=useRef<Lang>("en");

  useEffect(()=>{
    const saved=(localStorage.getItem("bujhi-language") as Lang|null);
    const initial=saved==="bn"?"bn":"en";
    langRef.current=initial;
    setLang(initial);
    document.documentElement.lang=initial==="bn"?"bn":"en";
    translateTree(document.body,initial);

    const observer=new MutationObserver(mutations=>{
      if(applying)return;
      for(const mutation of mutations){
        if(mutation.type==="characterData"){
          const node=mutation.target;
          const source=textNodes.get(node);
          const current=node.nodeValue||"";
          if(source!==undefined&&current===translateDynamic(source,langRef.current))continue;
          textNodes.set(node,current);
          translateTextNode(node,langRef.current);
        }else{
          mutation.addedNodes.forEach(node=>{
            if(node.nodeType===Node.TEXT_NODE){
              textNodes.set(node,node.nodeValue||"");
              translateTextNode(node,langRef.current);
            }else if(node instanceof Element){
              translateTree(node,langRef.current);
            }
          });
        }
      }
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
    return()=>observer.disconnect();
  },[]);

  function choose(next:Lang){
    langRef.current=next;
    setLang(next);
    localStorage.setItem("bujhi-language",next);
    document.documentElement.lang=next==="bn"?"bn":"en";
    translateTree(document.body,next);
  }

  return <div className="language-toggle-wrap" data-no-translate>
    <div className="language-toggle" role="group" aria-label="Language">
      <Languages aria-hidden="true"/>
      <button type="button" className={lang==="en"?"active":""} onClick={()=>choose("en")}>EN</button>
      <span>/</span>
      <button type="button" className={lang==="bn"?"active":""} onClick={()=>choose("bn")}>বাংলা</button>
    </div>
  </div>;
}
