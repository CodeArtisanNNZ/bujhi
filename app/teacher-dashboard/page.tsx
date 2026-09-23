"use client";

// Production teacher desk route

import {useEffect,useMemo,useState} from "react";
import {
  BookOpen,ChevronLeft,ChevronRight,FileText,FolderOpen,
  LogOut,NotebookPen,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "./teacher.module.css";
import {studentBookCatalog,type NctbBook,type StudentClassKey} from "../data/nctbBooks";

type Profile={full_name?:string;role?:string;subject?:string};
type Drink="boba"|"tea"|"coffee"|"water"|"lemonade";
const classFolders=[
  {value:6,accent:"#566b59"},
  {value:7,accent:"#4d6788"},
  {value:8,accent:"#8e332f"},
  {value:9,accent:"#a77534"},
  {value:10,accent:"#665574"}
];

function teacherClassKey(value:number):StudentClassKey{
  if(value===6)return "6";
  if(value===7)return "7";
  if(value===8)return "8";
  return "9-10";
}

const drinkOptions:{id:Drink;label:string;image:string}[]=[
  {id:"boba",label:"Boba tea",image:"/bobatea.png"},
  {id:"tea",label:"Tea",image:"/classictea.png"},
  {id:"coffee",label:"Coffee",image:"/classiccoffee.png"},
  {id:"water",label:"Water",image:"/glassofwater.png"},
  {id:"lemonade",label:"Lemonade",image:"/lemonade.png"}
];

export default function TeacherDashboard(){
  const[profile,setProfile]=useState<Profile>({});
  const[selectedClass,setSelectedClass]=useState(8);
  const[selectedBook,setSelectedBook]=useState<NctbBook|null>(null);
  const[folderOpen,setFolderOpen]=useState(false);
  const[lightOn,setLightOn]=useState(true);
  const[drink,setDrink]=useState<Drink>("coffee");
  const[drinkOpen,setDrinkOpen]=useState(false);
  const[note,setNote]=useState("");
  const[noteOpen,setNoteOpen]=useState(false);

  useEffect(()=>{
    void (async()=>{
      try{
        const response=await fetch("/api/me",{cache:"no-store"});
        if(!response.ok){
          location.replace("/login?role=teacher");
          return;
        }
        const data=await response.json() as {profile?:Profile};
        if(data.profile?.role==="student"){
          location.replace("/dashboard");
          return;
        }
        if(data.profile)setProfile(data.profile);
      }catch{
        location.replace("/login?role=teacher");
      }
    })();

    try{
      const savedNote=localStorage.getItem("bujhi-teacher-note");
      if(savedNote)setNote(savedNote);
      const savedDrink=localStorage.getItem("bujhi-teacher-drink") as Drink|null;
      if(savedDrink&&drinkOptions.some(item=>item.id===savedDrink))setDrink(savedDrink);
    }catch{}
  },[]);

  const teacherName=profile.full_name?.trim().split(" ")[0]||"Teacher";
  const activeDrink=drinkOptions.find(item=>item.id===drink)||drinkOptions[2];
  const booksForClass=useMemo(
    ()=>studentBookCatalog[teacherClassKey(selectedClass)],
    [selectedClass]
  );

  async function logout(){
    try{await fetch("/api/auth/logout",{method:"POST"})}catch{}
    try{
      localStorage.removeItem("bujhi-demo-auth");
      localStorage.removeItem("bujhi-demo-user");
    }catch{}
    location.href="/login?role=teacher";
  }

  function openClass(value:number){
    setSelectedClass(value);
    setSelectedBook(null);
    setFolderOpen(true);
  }

  function chooseDrink(next:Drink){
    setDrink(next);
    setDrinkOpen(false);
    try{localStorage.setItem("bujhi-teacher-drink",next)}catch{}
  }

  function saveNote(value:string){
    setNote(value);
    try{localStorage.setItem("bujhi-teacher-note",value)}catch{}
  }

  return <main className={`${styles.page} ${lightOn?"":styles.pageDim}`}>
    <section className={styles.referenceDesk} aria-label="Bujhi teacher desk">
      <div className={styles.deskBrand}><a href="/" aria-label="Bujhi home"><img src="/bujhi-icon.png" alt=""/><strong>Bujhi</strong></a><span>Teacher desk</span></div>

      <div className={styles.teacherBadge}>
        <FolderOpen/><span>Your classes</span>
      </div>

      <div className={styles.dynamicProfile}>
        <span><UsersRound/></span><strong>{teacherName}</strong>
        <button type="button" onClick={logout} aria-label="Log out"><LogOut/></button>
      </div>

      <div className={styles.folderShelf} aria-label="Class folders">
        {classFolders.map(folder=><button
          type="button"
          key={folder.value}
          className={styles.classFolder}
          style={{backgroundColor:folder.accent}}
          onClick={()=>openClass(folder.value)}
          aria-label={`Open Class ${folder.value} folder`}
        >
          <span className={styles.folderTab}/>
          <span className={styles.folderPapers}><i/><i/><i/></span>
          <span className={styles.folderHole}/>
          <strong>Class {folder.value}</strong>
          <small>{studentBookCatalog[teacherClassKey(folder.value)].length} books · NCTB 2026</small>
        </button>)}
      </div>

      <div className={styles.deskSurface} aria-hidden="true"/>

      <div className={styles.lamp} aria-hidden="true">
        <img className={styles.lampImage} src="/ef6af6f1-43c9-41fe-9c24-5f3873a95c33.png" alt="" draggable={false}/>
      </div>

      <button
        type="button"
        className={styles.roomLightSwitch}
        onClick={()=>setLightOn(value=>!value)}
        aria-pressed={lightOn}
        aria-label={lightOn?"Turn lamp off":"Turn lamp on"}
      >
        <span className={styles.roomLightDot}/>
        <span>{lightOn?"Lamp on":"Lamp off"}</span>
      </button>

      <div className={styles.moneyPlant} aria-hidden="true">
        <img src="/29e8b631-9c79-4996-b225-405227aa1153.png" alt="" draggable={false}/>
      </div>

      <div className={styles.teacherNotebook}>
        <div className={styles.notebookBinding}/>
        <p>Teacher lesson desk</p>
        <h1>{selectedBook?selectedBook.title:"Plan. Teach. Help them understand."}</h1>
        <span>
          {selectedBook
            ?`Class ${selectedClass} · ${selectedBook.englishTitle} · NCTB 2026`
            :"Open a class folder to see its NCTB 2026 textbooks."}
        </span>
        <button type="button" onClick={()=>openClass(selectedClass)}>
          <FolderOpen size={17}/>
          {selectedBook?"Open class folder":`Open Class ${selectedClass}`}
          <ChevronRight size={16}/>
        </button>
        <small>Class → NCTB 2026 textbooks → book</small>
      </div>

      <button type="button" className={styles.stickyHotspot} onClick={()=>setNoteOpen(true)} aria-label="Open note">
        <strong>Note</strong>
        {note&&<span>{note}</span>}
      </button>

      <nav className={styles.actionHotspots} aria-label="Teacher tools">
        <button type="button" onClick={()=>openClass(selectedClass)}><FolderOpen size={18}/>My classes</button>
        <button type="button" onClick={()=>setFolderOpen(true)}><BookOpen size={18}/>Lessons</button>
        <button type="button" onClick={()=>setNoteOpen(true)}><NotebookPen size={18}/>My notes</button>
      </nav>

      <aside className={styles.drinkArea}>
        <button type="button" className={styles.cupHotspot} onClick={()=>setDrinkOpen(v=>!v)} aria-expanded={drinkOpen}>
          <span key={drink} className={styles.drinkImageFrame}>
            {(drink==="tea"||drink==="coffee")&&<span className={styles.steam}><i/><i/><i/></span>}
            <img className={styles.drinkImage} src={activeDrink.image} alt="" draggable={false}/>
          </span>
          <span className={styles.drinkLabel}>{activeDrink.label} · Change</span>
        </button>
        {drinkOpen&&<div className={styles.drinkMenu}>
          <div className={styles.drinkMenuTitle}>Choose a drink</div>
          {drinkOptions.map(item=><button type="button" key={item.id} className={drink===item.id?styles.drinkActive:""} onClick={()=>chooseDrink(item.id)}>
            <span className={styles.drinkThumb}><img src={item.image} alt="" draggable={false}/></span>
            <span>{item.label}</span>
          </button>)}
        </div>}
      </aside>
    </section>

    {folderOpen&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setFolderOpen(false)}}>
      <section className={styles.folderPanel}>
        <button className={styles.closeButton} onClick={()=>setFolderOpen(false)} aria-label="Close"><X/></button>
        <header>
          <div className={styles.panelFolderIcon}><FolderOpen/></div>
          <div>
            <p>Class {selectedClass} · NCTB 2026</p>
            <h2>{selectedBook?selectedBook.title:`${booksForClass.length} textbooks`}</h2>
          </div>
        </header>

        {!selectedBook?<div className={styles.subjectGrid}>
          {booksForClass.map(book=><button
            key={book.id}
            onClick={()=>setSelectedBook(book)}
            style={{"--accent":book.accent} as React.CSSProperties}
            aria-label={`Open ${book.title}`}
          >
            <span className={styles.subjectTab}/>
            <FileText/>
            <span>
              <strong>{book.title}</strong>
              <small className={styles.subjectMeta}>{book.englishTitle} · {book.category} · NCTB 2026</small>
            </span>
            <ChevronRight/>
          </button>)}
        </div>:<>
          <button className={styles.backButton} onClick={()=>setSelectedBook(null)}><ChevronLeft/> Books</button>
          <div className={styles.subjectDetail}>
            <div className={styles.detailAccent} style={{background:selectedBook.accent}}/>
            <p>NCTB 2026 · {selectedBook.category}</p>
            <h3>{selectedBook.title}</h3>
            <div className={styles.detailStats}>
              <span><b>Class {selectedClass}</b></span>
              <span><b>{selectedBook.englishTitle}</b></span>
              <span><b>NCTB 2026</b></span>
            </div>
            <div className={styles.choiceList}>
              <strong>পাঠ্যবই PDF</strong>
              <div>{selectedBook.pdfPath.startsWith("https://drive.google.com/file/d/")||selectedClass===8&&selectedBook.id==="science"
                ? <a href={selectedBook.pdfPath} target="_blank" rel="noopener noreferrer">সম্পূর্ণ পাঠ্যবই খোলো →</a>
                : <span>PDF এখনো যুক্ত হয়নি</span>}</div>
            </div>
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>অধ্যায় ৪ · বীজ ও অঙ্কুরোদ্গম</strong>
              <div><a href="/science/class-8/chapter-4?topic=seed">বীজ অঙ্কুরোদ্গমের ব্যবহারিক কাজ ও সিমুলেশন খোলো →</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>অধ্যায় ৫ · প্রতিবর্ত ক্রিয়া ও স্নায়ু সংকেত</strong>
              <div><a href="/science/class-8/chapter-5?topic=reflex">স্নায়ু সংকেত সিমুলেটর খোলো →</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>অধ্যায় ২ · মিয়োসিস-I ও II</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=5">ইন্টারেক্টিভ ক্রোমোজোম ট্র্যাকার খোলো →</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>অধ্যায় ২ · কোষ → নিউক্লিয়াস → ক্রোমোজোম → DNA → জিন</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=7">পাঠ ৭-এর ধারাবাহিক বংশগত তথ্য জুম খোলো →</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>অধ্যায় ২ · বংশগতি ও জিন সঞ্চারণ</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=9">পাঠ ৯-এর বংশগতি ও জিন সঞ্চারণ ল্যাব খোলো →</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>অধ্যায় ১ · প্রাণিজগতের শ্রেণিবিন্যাস</strong>
              <div><a href="/science/class-8/chapter-1">শ্রেণিবিন্যাস অনুসন্ধান ও শিক্ষক নির্দেশিকা খোলো →</a></div>
              {[
                {number:3,title:"ব্যাপন, অভিস্রবণ ও প্রস্বেদন"},
                {number:4,title:"উদ্ভিদের বংশ বৃদ্ধি"},
                {number:5,title:"সমন্বয় ও নিঃসরণ"},
                {number:6,title:"পরমাণুর গঠন"}
              ].map(chapter=><div key={chapter.number}><a href={`/science/class-8/chapter-${chapter.number}`}>অধ্যায় {chapter.number} · {chapter.title} →</a></div>)}
              {[
                {number:7,title:"পৃথিবী ও মহাকর্ষ"},
                {number:8,title:"রাসায়নিক বিক্রিয়া"},
                {number:9,title:"বর্তনী ও চলবিদ্যুৎ"},
                {number:10,title:"অম্ল, ক্ষারক ও লবণ"},
                {number:11,title:"আলো"},
                {number:12,title:"মহাকাশ ও উপগ্রহ"},
                {number:13,title:"খাদ্য ও পুষ্টি"},
                {number:14,title:"পরিবেশ এবং বাস্তুতন্ত্র"}
              ].map(chapter=><div key={chapter.number}><a href={`/science/class-8/chapter-${chapter.number}`}>অধ্যায় {chapter.number} · {chapter.title} →</a></div>)}
              <div><a href="/nctb/2026/class-8/science-chapter-1.pdf" target="_blank" rel="noopener noreferrer">মূল পাঠ্যবইয়ের অধ্যায় ১ খোলো →</a></div>
            </div>}
            <button className={styles.keepSubject} onClick={()=>setFolderOpen(false)}>Keep this book on my desk</button>
          </div>
        </>}
      </section>
    </div>}

    {noteOpen&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setNoteOpen(false)}}>
      <section className={styles.notePanel}>
        <button className={styles.closeButton} onClick={()=>setNoteOpen(false)} aria-label="Close"><X/></button>
        <p>Teacher notes</p>
        <h2>Something to remember</h2>
        <textarea value={note} onChange={e=>saveNote(e.target.value)} placeholder="Write a reminder, idea, or classroom note…" maxLength={500}/>
        <small>{note.length}/500 · saved automatically on this device</small>
      </section>
    </div>}
  </main>;
}
