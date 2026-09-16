"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {BookOpen,Brain,ChevronRight,Globe2,LampDesk,LogOut,MessageCircle,Monitor,PlayCircle,Volume2,X} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";

type Profile={full_name?:string;role?:string;class_level?:string};

type Book={id:string;title:string;short:string;tone:string};
const books:Book[]=[
 {id:"bangla",title:"Bangla",short:"বাংলা",tone:"cream"},
 {id:"english",title:"English",short:"English",tone:"red"},
 {id:"math",title:"Mathematics",short:"গণিত",tone:"green"},
 {id:"science",title:"Science",short:"বিজ্ঞান",tone:"blue"},
 {id:"history",title:"History & Social Science",short:"ইতিহাস",tone:"rust"},
 {id:"digital",title:"Digital Technology",short:"ডিজিটাল",tone:"navy"},
 {id:"life",title:"Life & Livelihood",short:"জীবন ও জীবিকা",tone:"olive"}
];

const learningStyles=[
 {id:"visual",label:"Show me visually",copy:"Diagrams, illustrations and step-by-step visual explanations.",icon:PlayCircle},
 {id:"simulation",label:"Let me explore",copy:"Interactive simulations and small experiments.",icon:Brain},
 {id:"audio",label:"Read it aloud",copy:"Listen while following the lesson on screen.",icon:Volume2},
 {id:"teacher",label:"Teach me like a teacher",copy:"A guided explanation with questions along the way.",icon:BookOpen}
];

export default function StudentDashboard(){
 const[profile,setProfile]=useState<Profile>({class_level:"8"});
 const[selectedBook,setSelectedBook]=useState<Book>(books[3]);
 const[chapter,setChapter]=useState("4");
 const[light,setLight]=useState(true);
 const[laptopOpen,setLaptopOpen]=useState(false);
 const[friendOpen,setFriendOpen]=useState(false);
 const[style,setStyle]=useState("teacher");
 const[globeFact,setGlobeFact]=useState("Tap the globe for a tiny world fact.");
 const chapters=useMemo(()=>Array.from({length:14},(_,i)=>String(i+1)),[]);

 useEffect(()=>{
  fetch("/api/me").then(async r=>{if(r.ok){const data=await r.json();if(data.profile)setProfile(data.profile)}}).catch(()=>{});
 },[]);

 async function logout(){await fetch("/api/auth/logout",{method:"POST"});location.href="/"}
 function chooseBook(book:Book){setSelectedBook(book);setChapter("1");setLaptopOpen(true)}
 function newFact(){const facts=["Bangladesh sits on the Ganges-Brahmaputra-Meghna delta.","About 71% of Earth is covered by water.","A day on Venus is longer than its year.","The Pacific Ocean is larger than all Earth's land combined."];setGlobeFact(facts[Math.floor(Math.random()*facts.length)])}

 return <main className={`${styles.page} ${light?styles.lightOn:styles.lightOff}`}>
  <header className={styles.header}>
   <Link className={styles.brand} href="/"><img src="/bujhi-icon.png" alt=""/>Bujhi</Link>
   <div className={styles.studentMeta}><span>Student desk</span><strong>Class {profile.class_level||"8"}</strong><button onClick={logout}><LogOut/>Log out</button></div>
  </header>

  <section className={styles.room}>
   <div className={styles.welcome}><p>Your learning desk</p><h1>{profile.full_name?`Welcome, ${profile.full_name.split(" ")[0]}.`:"Welcome to Class 8."}</h1><span>Pick a book from the shelf, then use the laptop to choose how you want to learn it.</span></div>

   <div className={styles.bookshelf} aria-label="Class 8 books">
    <div className={styles.shelfLabel}><BookOpen/>Class 8 · NCTB shelf</div>
    <div className={styles.books}>
     {books.map(book=><button key={book.id} onClick={()=>chooseBook(book)} className={`${styles.book} ${styles[book.tone]} ${selectedBook.id===book.id?styles.activeBook:""}`}><span>{book.short}</span><small>{book.title}</small></button>)}
    </div>
    <a className={styles.nctbLink} href="https://nctb.gov.bd/" target="_blank" rel="noreferrer">Open official NCTB textbook source <ChevronRight/></a>
   </div>

   <div className={styles.deskWrap}>
    <div className={styles.deskBack}/>
    <button className={styles.lamp} onClick={()=>setLight(v=>!v)} aria-label="Toggle desk lamp"><LampDesk/><span>{light?"Turn lamp off":"Turn lamp on"}</span></button>
    <button className={styles.globe} onClick={newFact}><Globe2/><span>{globeFact}</span></button>
    <button className={styles.friend} onClick={()=>setFriendOpen(true)}><MessageCircle/><span>Talk to a friend</span><small>Student mental-health corner</small></button>

    <button className={styles.laptop} onClick={()=>setLaptopOpen(true)} aria-label="Open learning laptop">
     <div className={styles.screen}>
      <Monitor/>
      <strong>{selectedBook.title}</strong>
      <span>Chapter {chapter}</span>
      <small>Tap to choose how you learn</small>
     </div>
     <div className={styles.keyboard}/>
    </button>
    <div className={styles.deskEdge}/>
   </div>
  </section>

  {laptopOpen&&<div className={styles.overlay} onMouseDown={e=>{if(e.currentTarget===e.target)setLaptopOpen(false)}}>
   <section className={styles.learningPanel}>
    <button className={styles.close} onClick={()=>setLaptopOpen(false)}><X/></button>
    <p className={styles.kicker}>Your learning laptop</p>
    <h2>What do you want to learn?</h2>
    <div className={styles.flowRow}>
     <label><span>Subject</span><select value={selectedBook.id} onChange={e=>{const found=books.find(b=>b.id===e.target.value);if(found)setSelectedBook(found)}}>{books.map(b=><option key={b.id} value={b.id}>{b.title}</option>)}</select></label>
     <label><span>Chapter</span><select value={chapter} onChange={e=>setChapter(e.target.value)}>{chapters.map(c=><option key={c} value={c}>Chapter {c}</option>)}</select></label>
    </div>
    <h3>How do you want to learn this lesson?</h3>
    <div className={styles.styleGrid}>{learningStyles.map(item=>{const Icon=item.icon;return <button key={item.id} className={style===item.id?styles.selectedStyle:""} onClick={()=>setStyle(item.id)}><Icon/><strong>{item.label}</strong><span>{item.copy}</span></button>})}</div>
    <div className={styles.lessonReady}><div><span>{selectedBook.title}</span><strong>Chapter {chapter}</strong><small>{learningStyles.find(x=>x.id===style)?.label}</small></div><button onClick={()=>setLaptopOpen(false)}>Start lesson <ChevronRight/></button></div>
   </section>
  </div>}

  {friendOpen&&<div className={styles.overlay} onMouseDown={e=>{if(e.currentTarget===e.target)setFriendOpen(false)}}>
   <section className={styles.friendPanel}>
    <button className={styles.close} onClick={()=>setFriendOpen(false)}><X/></button>
    <p className={styles.kicker}>Student-only corner</p><h2>Talk to a friend</h2>
    <p>This first version is a quiet check-in space. Nothing you type here is saved or shared.</p>
    <div className={styles.friendChoices}><button>I feel overwhelmed with study</button><button>I just need to vent</button><button>I need motivation</button><button>I want to talk about school</button></div>
    <div className={styles.friendNote}><MessageCircle/><div><strong>You do not have to solve everything at once.</strong><span>Write what is on your mind, or reach out to someone you trust. This corner is for support, not medical or emergency care.</span></div></div>
    <textarea placeholder="Write what you are feeling or thinking…"/>
   </section>
  </div>}
 </main>
}
