"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {
 ArrowLeft,BookOpen,Brain,ChevronLeft,ChevronRight,CircleCheck,Globe2,
 HeartHandshake,LampDesk,LogOut,MessageCircle,Monitor,PlayCircle,Volume2,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";

type Profile={full_name?:string;role?:string;class_level?:string};
type Book={id:string;title:string;short:string;tone:string;category:"Core"|"Life"|"Religion"};
type WizardStep=1|2|3|4;

const books:Book[]=[
 {id:"bangla",title:"Bangla",short:"বাংলা",tone:"cream",category:"Core"},
 {id:"english",title:"English",short:"English",tone:"red",category:"Core"},
 {id:"math",title:"Mathematics",short:"গণিত",tone:"green",category:"Core"},
 {id:"science",title:"Science",short:"বিজ্ঞান",tone:"blue",category:"Core"},
 {id:"history",title:"History & Social Science",short:"ইতিহাস",tone:"rust",category:"Core"},
 {id:"digital",title:"Digital Technology",short:"ডিজিটাল",tone:"navy",category:"Core"},
 {id:"health",title:"Health Protection",short:"স্বাস্থ্য সুরক্ষা",tone:"rose",category:"Life"},
 {id:"life",title:"Life & Livelihood",short:"জীবন ও জীবিকা",tone:"olive",category:"Life"},
 {id:"arts",title:"Arts & Culture",short:"শিল্প ও সংস্কৃতি",tone:"ochre",category:"Life"},
 {id:"islam",title:"Islam Education",short:"ইসলাম শিক্ষা",tone:"forest",category:"Religion"},
 {id:"hindu",title:"Hindu Religion Education",short:"হিন্দুধর্ম",tone:"saffron",category:"Religion"},
 {id:"christian",title:"Christian Religion Education",short:"খ্রিস্টধর্ম",tone:"slate",category:"Religion"},
 {id:"buddhist",title:"Buddhist Religion Education",short:"বৌদ্ধধর্ম",tone:"maroon",category:"Religion"}
];

const learningStyles=[
 {id:"visual",label:"Show me visually",copy:"Diagrams, visual steps and illustrated explanations.",icon:PlayCircle},
 {id:"simulation",label:"Let me explore",copy:"Small interactive simulations, examples and experiments.",icon:Brain},
 {id:"audio",label:"Read it aloud",copy:"Listen to the lesson while following it on screen.",icon:Volume2},
 {id:"teacher",label:"Teach me like a teacher",copy:"A guided explanation with questions and checkpoints.",icon:BookOpen}
];

const globeFacts=[
 "Bangladesh sits on the Ganges-Brahmaputra-Meghna delta.",
 "About 71% of Earth is covered by water.",
 "A day on Venus is longer than its year.",
 "The Pacific Ocean is larger than all Earth's land combined."
];

const friendPrompts=[
 {id:"overwhelmed",label:"Study feels overwhelming",reply:"Choose one small thing for the next 10 minutes. You do not need to finish everything at once."},
 {id:"vent",label:"I just need to vent",reply:"Write it down without trying to make it perfect. You can sort out what to do later."},
 {id:"motivation",label:"I cannot get started",reply:"Try a tiny start: open one chapter, read one heading, or solve one question. Starting counts."},
 {id:"school",label:"Something at school is bothering me",reply:"If it keeps bothering you, consider telling someone you trust — a parent, sibling, teacher, counsellor or close friend."}
];

export default function StudentDashboard(){
 const[profile,setProfile]=useState<Profile>({class_level:"8"});
 const[selectedBook,setSelectedBook]=useState<Book>(books.find(b=>b.id==="science")||books[0]);
 const[chapter,setChapter]=useState("4");
 const[light,setLight]=useState(true);
 const[laptopOpen,setLaptopOpen]=useState(false);
 const[friendOpen,setFriendOpen]=useState(false);
 const[lessonOpen,setLessonOpen]=useState(false);
 const[style,setStyle]=useState("teacher");
 const[step,setStep]=useState<WizardStep>(1);
 const[globeFact,setGlobeFact]=useState("Tap the globe for a tiny world fact.");
 const[friendReply,setFriendReply]=useState("Choose what feels closest to how you are feeling right now.");
 const chapters=useMemo(()=>Array.from({length:14},(_,i)=>String(i+1)),[]);

 useEffect(()=>{
  try{
   const saved=localStorage.getItem("bujhi-demo-user");
   if(saved){
    const data=JSON.parse(saved) as Profile;
    if(data.role==="student")setProfile(data);
   }
  }catch{}
 },[]);

 function logout(){
  try{localStorage.removeItem("bujhi-demo-auth")}catch{}
  location.href="/";
 }

 function chooseBook(book:Book){
  setSelectedBook(book);
  setChapter(book.id==="science"?"4":"1");
  setStep(2);
  setLaptopOpen(true);
 }

 function openLaptop(){setStep(1);setLaptopOpen(true)}
 function newFact(){setGlobeFact(globeFacts[Math.floor(Math.random()*globeFacts.length)])}
 function goNext(){setStep(s=>Math.min(4,s+1) as WizardStep)}
 function goBack(){setStep(s=>Math.max(1,s-1) as WizardStep)}
 function startLesson(){setLaptopOpen(false);setLessonOpen(true)}

 const firstName=profile.full_name?.trim().split(" ")[0];
 const modeLabel=learningStyles.find(x=>x.id===style)?.label||"Teach me like a teacher";

 return <main className={`${styles.page} ${light?styles.lightOn:styles.lightOff}`}>
  <header className={styles.header}>
   <Link className={styles.brand} href="/"><img src="/bujhi-icon.png" alt=""/>Bujhi</Link>
   <div className={styles.studentMeta}>
    <span>Student desk</span>
    <strong>Class {profile.class_level||"8"}</strong>
    <button onClick={logout}><LogOut/>Log out</button>
   </div>
  </header>

  <section className={styles.room}>
   <div className={styles.welcome}>
    <p>Your learning desk</p>
    <h1>{firstName?`Hi, ${firstName}.`:"Welcome to Class 8."}</h1>
    <span>Pick a book from the shelf. Your desk will guide you from subject to chapter to the way you want to learn.</span>
   </div>

   <div className={styles.bookshelf} aria-label="Class 8 books">
    <div className={styles.shelfTopline}>
     <div className={styles.shelfLabel}><BookOpen/>Class 8 · NCTB shelf</div>
     <a className={styles.nctbLink} href="https://nctb.gov.bd/pages/static-pages/695b9858c4774958d7b703d8" target="_blank" rel="noreferrer">Official 2026 Class 8 textbooks <ChevronRight/></a>
    </div>

    {(["Core","Life","Religion"] as const).map(category=><div className={styles.bookGroup} key={category}>
     <span className={styles.categoryTag}>{category==="Core"?"Core subjects":category==="Life"?"Life, health & creativity":"Religion & ethics"}</span>
     <div className={styles.books}>
      {books.filter(book=>book.category===category).map(book=><button key={book.id} onClick={()=>chooseBook(book)} className={`${styles.book} ${styles[book.tone]} ${selectedBook.id===book.id?styles.activeBook:""}`}>
       <span>{book.short}</span><small>{book.title}</small>
      </button>)}
     </div>
    </div>)}
   </div>

   <div className={styles.deskWrap}>
    <div className={styles.deskBack}/>

    <button className={styles.lamp} onClick={()=>setLight(v=>!v)} aria-label="Toggle desk lamp">
     <LampDesk/><span>{light?"Turn lamp off":"Turn lamp on"}</span>
    </button>

    <button className={styles.globe} onClick={newFact}>
     <Globe2/><span>{globeFact}</span>
    </button>

    <div className={styles.paperCard}>
     <span>Today</span>
     <strong>{selectedBook.title}</strong>
     <small>Chapter {chapter} · {modeLabel}</small>
    </div>

    <button className={styles.friend} onClick={()=>setFriendOpen(true)}>
     <MessageCircle/><span>Talk to a friend</span><small>A private student check-in corner</small>
    </button>

    <button className={styles.laptop} onClick={openLaptop} aria-label="Open learning laptop">
     <div className={styles.screen}>
      <Monitor/>
      <p>Ready when you are</p>
      <strong>{selectedBook.title}</strong>
      <span>Chapter {chapter}</span>
      <small>Tap the laptop to choose your learning path</small>
     </div>
     <div className={styles.keyboard}/>
    </button>

    <div className={styles.deskEdge}/>
   </div>
  </section>

  {laptopOpen&&<div className={styles.overlay} onMouseDown={e=>{if(e.currentTarget===e.target)setLaptopOpen(false)}}>
   <section className={styles.learningPanel}>
    <button className={styles.close} onClick={()=>setLaptopOpen(false)} aria-label="Close"><X/></button>
    <div className={styles.panelHeading}>
     <div><p className={styles.kicker}>Your learning laptop</p><h2>Build your lesson.</h2></div>
     <div className={styles.steps} aria-label={`Step ${step} of 4`}>{[1,2,3,4].map(n=><i key={n} className={n<=step?styles.doneStep:""}/>)}</div>
    </div>

    <div key={step} className={styles.stepPane}>
     {step===1&&<>
      <p className={styles.stepNumber}>01 · Subject</p>
      <h3>Which book do you want to learn?</h3>
      <div className={styles.subjectGrid}>{books.map(book=><button key={book.id} onClick={()=>{setSelectedBook(book);setChapter(book.id==="science"?"4":"1");setStep(2)}} className={selectedBook.id===book.id?styles.selectedSubject:""}><span className={`${styles.bookDot} ${styles[book.tone]}`}/><strong>{book.title}</strong><small>{book.short}</small></button>)}</div>
     </>}

     {step===2&&<>
      <p className={styles.stepNumber}>02 · Chapter</p>
      <h3>{selectedBook.title}: which chapter?</h3>
      <div className={styles.chapterGrid}>{chapters.map(c=><button key={c} className={chapter===c?styles.selectedChapter:""} onClick={()=>setChapter(c)}><span>Chapter</span><strong>{c}</strong></button>)}</div>
      <div className={styles.stepActions}><button className={styles.backButton} onClick={goBack}><ChevronLeft/>Subject</button><button className={styles.nextButton} onClick={goNext}>Choose learning style <ChevronRight/></button></div>
     </>}

     {step===3&&<>
      <p className={styles.stepNumber}>03 · Learning style</p>
      <h3>How do you want to learn this lesson?</h3>
      <div className={styles.styleGrid}>{learningStyles.map(item=>{const Icon=item.icon;return <button key={item.id} className={style===item.id?styles.selectedStyle:""} onClick={()=>setStyle(item.id)}><Icon/><strong>{item.label}</strong><span>{item.copy}</span></button>})}</div>
      <div className={styles.stepActions}><button className={styles.backButton} onClick={goBack}><ChevronLeft/>Chapter</button><button className={styles.nextButton} onClick={goNext}>Review lesson <ChevronRight/></button></div>
     </>}

     {step===4&&<>
      <p className={styles.stepNumber}>04 · Ready</p>
      <h3>Your lesson is ready.</h3>
      <div className={styles.readyCard}>
       <CircleCheck/>
       <div><span>Class {profile.class_level||"8"}</span><strong>{selectedBook.title} · Chapter {chapter}</strong><small>{modeLabel}</small></div>
      </div>
      <div className={styles.lessonMap}><div><span>1</span><p>Understand the idea</p></div><div><span>2</span><p>Try it your way</p></div><div><span>3</span><p>Check what clicked</p></div></div>
      <div className={styles.stepActions}><button className={styles.backButton} onClick={goBack}><ChevronLeft/>Learning style</button><button className={styles.nextButton} onClick={startLesson}>Start lesson <ChevronRight/></button></div>
     </>}
    </div>
   </section>
  </div>}

  {lessonOpen&&<div className={styles.overlay}>
   <section className={styles.lessonPanel}>
    <button className={styles.close} onClick={()=>setLessonOpen(false)} aria-label="Close"><X/></button>
    <p className={styles.kicker}>Lesson space</p>
    <h2>{selectedBook.title} · Chapter {chapter}</h2>
    <p className={styles.lessonMode}>{modeLabel}</p>
    <div className={styles.lessonWorkspace}>
     <article><span>01</span><strong>Concept</strong><p>The main explanation will appear here, built around the selected NCTB chapter.</p></article>
     <article><span>02</span><strong>Explore</strong><p>The visual, simulation, audio or teacher-style activity will open here.</p></article>
     <article><span>03</span><strong>Check</strong><p>A short understanding check will help decide what explanation should come next.</p></article>
    </div>
    <div className={styles.lessonFooter}><button onClick={()=>setLessonOpen(false)}><ArrowLeft/>Back to desk</button><span>Frontend lesson shell · content comes next</span></div>
   </section>
  </div>}

  {friendOpen&&<div className={styles.overlay} onMouseDown={e=>{if(e.currentTarget===e.target)setFriendOpen(false)}}>
   <section className={styles.friendPanel}>
    <button className={styles.close} onClick={()=>setFriendOpen(false)} aria-label="Close"><X/></button>
    <div className={styles.friendTitle}><HeartHandshake/><div><p className={styles.kicker}>Student-only corner</p><h2>Talk to a friend.</h2></div></div>
    <p>This is a quiet check-in space. For this frontend prototype, nothing you type here is saved or sent anywhere.</p>
    <div className={styles.friendChoices}>{friendPrompts.map(item=><button key={item.id} onClick={()=>setFriendReply(item.reply)}>{item.label}</button>)}</div>
    <div className={styles.friendNote}><MessageCircle/><div><strong>A small next step</strong><span>{friendReply}</span></div></div>
    <textarea aria-label="Private note" placeholder="Write what is on your mind…"/>
    <p className={styles.safetyNote}>If you feel unsafe or in immediate danger, contact a trusted adult or local emergency support. This corner is not emergency or medical care.</p>
   </section>
  </div>}
 </main>
}
