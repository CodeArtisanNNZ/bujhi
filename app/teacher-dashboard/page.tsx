"use client";
import {useLanguage} from "../components/useLanguage";
import {translate,localizeBook} from "../i18n";
import ResponsiveImage from "../components/ResponsiveImage";
import CupSteam from "../components/CupSteam";
import DeskCalendar from "../components/DeskCalendar";

// Production teacher desk route

import {useEffect,useMemo,useState} from "react";
import {
  BookOpen,ChevronLeft,ChevronRight,FileText,FolderOpen,
  LogOut,NotebookPen,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "./teacher.module.css";
import {class8BgsPlans} from "../data/class8BgsPlans";
import {studentBookCatalog,studentClassLabels,type NctbBook,type StudentClassKey} from "../data/nctbBooks";

type Profile={full_name?:string;role?:string;subject?:string};
type Drink="boba"|"tea"|"coffee"|"water"|"lemonade";
const classFolders=[
  {value:6,label:"Class 6 new",accent:"#566b59"},
  {value:7,label:"Class 7 new",accent:"#4d6788"},
  {value:8,label:"Class 8 new",accent:"#8e332f"},
  {value:9,label:"Class 9&10",accent:"#a77534"}
];

function teacherClassKey(value:number):StudentClassKey{
  if(value===6)return "6";
  if(value===7)return "7";
  if(value===8)return "8";
  return "9-10";
}

function teacherBooksForClass(value:number):NctbBook[]{
  const books=studentBookCatalog[teacherClassKey(value)];
  if(value===6||value===7||value===8){
    return books.filter(book=>
      book.pdfPath.startsWith("https://drive.google.com/file/d/")||
      (value===8&&book.id==="science"&&book.pdfPath==="/nctb/2026/class-8/science.pdf")
    );
  }
  return books;
}

const drinkOptions:{id:Drink;label:string;image:string}[]=[
  {id:"boba",label:"বাবল টি",image:"/bobatea.png"},
  {id:"tea",label:"চা",image:"/classictea.png"},
  {id:"coffee",label:"কফি",image:"/classiccoffee.png"},
  {id:"water",label:"পানি",image:"/glassofwater.png"},
  {id:"lemonade",label:"লেবুর শরবত",image:"/lemonade.png"}
];

export default function TeacherDashboard(){
  const language=useLanguage();
  const t=(value:string)=>translate(value,language);
  const[profile,setProfile]=useState<Profile>({});
  const[selectedClass,setSelectedClass]=useState(8);
  const[selectedBookRaw,setSelectedBook]=useState<NctbBook|null>(null);
  const selectedBook=selectedBookRaw?localizeBook(studentBookCatalog[teacherClassKey(selectedClass)].find(book=>book.id===selectedBookRaw.id)||selectedBookRaw,language):null;
  const[folderOpen,setFolderOpen]=useState(false);
  const[deskLightOn,setDeskLightOn]=useState(true);
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
      const savedLamp=localStorage.getItem("bujhi-teacher-desk-lamp");
      if(savedLamp==="off")setDeskLightOn(false);
    }catch{}
  },[]);

  const teacherName=profile.full_name?.trim().split(" ")[0]||t("শিক্ষক");
  const activeDrink=drinkOptions.find(item=>item.id===drink)||drinkOptions[2];
  const booksForClass=useMemo(
    ()=>teacherBooksForClass(selectedClass).map(book=>localizeBook(book,language)),
    [selectedClass,language]
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

  function openBookPdf(book:NctbBook){
    window.open(book.pdfPath,"_blank","noopener,noreferrer");
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

  function toggleDeskLamp(){
    setDeskLightOn(current=>{
      const next=!current;
      try{localStorage.setItem("bujhi-teacher-desk-lamp",next?"on":"off")}catch{}
      return next;
    });
  }

  return <main data-no-translate lang={language} className={`${styles.page} ${deskLightOn?"":styles.pageDim}`}>
    <section className={styles.referenceDesk} aria-label={t("বুঝি? শিক্ষক ডেস্ক")}>
      <div className={styles.teacherBadge}>
        <FolderOpen/><span>{t("তোমার শ্রেণিগুলো")}</span>
      </div>

      <div className={styles.dynamicProfile}>
        <span><UsersRound/></span><strong>{teacherName}</strong>
        <button type="button" onClick={logout} aria-label={t("লগ আউট")}><LogOut/></button>
      </div>

      <div className={styles.folderShelf} aria-label={t("শ্রেণির ফোল্ডার")}>
        {classFolders.map(folder=><button
          type="button"
          key={folder.value}
          className={styles.classFolder}
          style={{backgroundColor:folder.accent}}
          onClick={()=>openClass(folder.value)}
          aria-label={t(`${t(folder.label)} folder খোলো`)}
        >
          <span className={styles.folderTab}/>
          <span className={styles.folderPapers}><i/><i/><i/></span>
          <span className={styles.folderHole}/>
          <strong>{t(folder.label)}</strong>
          <small>{t(`${teacherBooksForClass(folder.value).length}টি বই · NCTB ২০২৬`)}</small>
        </button>)}
      </div>

      <div className={styles.deskSurface} aria-hidden="true"/>

      <div className={styles.lamp} aria-hidden="true">
        <ResponsiveImage className={styles.lampImage} sizes="360px" src="/ef6af6f1-43c9-41fe-9c24-5f3873a95c33.png" alt="" draggable={false}/>
      </div>

      <button
        type="button"
        className={`${styles.roomLightSwitch} ${deskLightOn?styles.lightOn:styles.lightOff}`}
        onClick={toggleDeskLamp}
        aria-pressed={deskLightOn}
        aria-label={deskLightOn?t("ডেস্কের আলো কমাও"):t("ডেস্কের আলো বাড়াও")}
      >
        <span className={styles.roomLightTrack} aria-hidden="true">
          <span className={`${styles.roomLightState} ${styles.roomLightOff}`}>{t("বন্ধ")}</span>
          <span className={`${styles.roomLightState} ${styles.roomLightOn}`}>{t("চালু")}</span>
          <span className={styles.roomLightThumb}><i/></span>
        </span>
      </button>

      <DeskCalendar className={styles.liveCalendar}/>

      <div className={styles.moneyPlant} aria-hidden="true">
        <ResponsiveImage sizes="360px" src="/29e8b631-9c79-4996-b225-405227aa1153.png" alt="" draggable={false}/>
      </div>

      <div className={styles.teacherNotebook}>
        <div className={styles.notebookBinding}/>
        <p>{t("শিক্ষকের পাঠ ডেস্ক")}</p>
        <h1>{selectedBook?selectedBook.title:t("পরিকল্পনা করো। শেখাও। বুঝতে সাহায্য করো।")}</h1>
        <span>
          {selectedBook
            ?t(`${t(studentClassLabels[teacherClassKey(selectedClass)])} · ${selectedBook.title} · NCTB ২০২৬`)
            :t("NCTB ২০২৬-এর পাঠ্যবই দেখতে শ্রেণির ফোল্ডার খোলো।")}
        </span>
        <button type="button" onClick={()=>openClass(selectedClass)}>
          <FolderOpen size={17}/>
          {selectedBook?t("শ্রেণির ফোল্ডার খোলো"):t(`${t(studentClassLabels[teacherClassKey(selectedClass)])} খোলো`)}
          <ChevronRight size={16}/>
        </button>
        <small>{t("শ্রেণি → NCTB ২০২৬ পাঠ্যবই → বই")}</small>
      </div>

      <button type="button" className={styles.stickyHotspot} onClick={()=>setNoteOpen(true)} aria-label={t("নোট খোলো")}>
        <strong>{t("নোট")}</strong>
        {note&&<span data-user-content>{note}</span>}
      </button>

      <nav className={styles.actionHotspots} aria-label={t("শিক্ষকের সরঞ্জাম")}>
        <button type="button" onClick={()=>openClass(selectedClass)}><FolderOpen size={18}/>{t("আমার শ্রেণিগুলো")}</button>
        <button type="button" onClick={()=>setFolderOpen(true)}><BookOpen size={18}/>{t("পাঠসমূহ")}</button>
        <button type="button" onClick={()=>setNoteOpen(true)}><NotebookPen size={18}/>{t("আমার নোট")}</button>
      </nav>

      <aside className={styles.drinkArea}>
        <button type="button" className={styles.cupHotspot} onClick={()=>setDrinkOpen(v=>!v)} aria-expanded={drinkOpen}>
          <span key={drink} className={styles.drinkImageFrame}>
            {(drink==="tea"||drink==="coffee")&&<CupSteam drink={drink}/>}
            <ResponsiveImage className={styles.drinkImage} sizes="180px" src={activeDrink.image} alt="" draggable={false}/>
          </span>
          <span className={styles.drinkLabel}>{t(activeDrink.label)}{t("· বদলাও")}</span>
        </button>
        {drinkOpen&&<div className={styles.drinkMenu}>
          <div className={styles.drinkMenuTitle}>{t("পানীয় বেছে নাও")}</div>
          {drinkOptions.map(item=><button type="button" key={item.id} className={drink===item.id?styles.drinkActive:""} onClick={()=>chooseDrink(item.id)}>
            <span className={styles.drinkThumb}><ResponsiveImage sizes="80px" src={item.image} alt="" draggable={false}/></span>
            <span>{t(item.label)}</span>
          </button>)}
        </div>}
      </aside>
    </section>

    {folderOpen&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setFolderOpen(false)}}>
      <section className={styles.folderPanel}>
        <button className={styles.closeButton} onClick={()=>setFolderOpen(false)} aria-label={t("বন্ধ করো")}><X/></button>
        <header>
          <div className={styles.panelFolderIcon}><FolderOpen/></div>
          <div>
            <p>{t(studentClassLabels[teacherClassKey(selectedClass)])}{t("· NCTB ২০২৬")}</p>
            <h2>{selectedBook?selectedBook.title:t(`${booksForClass.length}টি পাঠ্যবই`)}</h2>
          </div>
        </header>

        {!selectedBook?<div className={styles.subjectGrid}>
          {booksForClass.map(book=><button
            key={book.id}
            onClick={()=>selectedClass>=6&&selectedClass<=8?openBookPdf(book):setSelectedBook(book)}
            style={{"--accent":book.accent} as React.CSSProperties}
            aria-label={selectedClass>=6&&selectedClass<=8?t(`${book.title} PDF খোলো`):t(`${book.title} খোলো`)}
          >
            <span className={styles.subjectTab}/>
            <FileText/>
            <span>
              <strong>{book.title}</strong>
              <small className={styles.subjectMeta}>{book.englishTitle} · {t(book.category)} · NCTB 2026</small>
            </span>
            <ChevronRight/>
          </button>)}
        </div>:<>
          <button className={styles.backButton} onClick={()=>setSelectedBook(null)}><ChevronLeft/>{t("বই")}</button>
          <div className={styles.subjectDetail}>
            <div className={styles.detailAccent} style={{background:selectedBook.accent}}/>
            <p>NCTB 2026 · {t(selectedBook.category)}</p>
            <h3>{selectedBook.title}</h3>
            <div className={styles.detailStats}>
              <span><b>{t(studentClassLabels[teacherClassKey(selectedClass)])}</b></span>
              <span><b>{selectedBook.englishTitle}</b></span>
              <span><b>NCTB 2026</b></span>
            </div>
            <div className={styles.choiceList}>
              <strong>{t("পাঠ্যবই PDF")}</strong>
              <div>{selectedBook.pdfPath.startsWith("https://drive.google.com/file/d/")||selectedClass===8&&selectedBook.id==="science"
                ? <a href={selectedBook.pdfPath} target="_blank" rel="noopener noreferrer">{t("সম্পূর্ণ পাঠ্যবই খোলো →")}</a>
                : <span>{t("PDF এখনো যুক্ত হয়নি")}</span>}</div>
              {selectedClass===8&&<div><a href="https://digitalcontent.gov.bd/portal/audios" target="_blank" rel="noopener noreferrer">{t("ফ্রি অডিও রিসোর্স →")}</a> · <a href="https://talkingbookbangla.com/" target="_blank" rel="noopener noreferrer">{t("টকিং বুক লাইব্রেরি →")}</a></div>}
            </div>
            {selectedClass===8&&selectedBook.id==="bangladesh-global-studies"&&<div className={styles.choiceList}>
              <strong>{t("১৩টি অধ্যায়ের পাঠ পরিকল্পনা")}</strong>
              <div><a href="/bgs/class-8">{t("সব অধ্যায়ের লক্ষ্য, সময়, কার্যক্রম ও মূল্যায়ন →")}</a></div>
              {class8BgsPlans.map(chapter=><div key={chapter.number}>
                <a href={chapter.number===1?"/bgs/class-8/chapter-1":"/bgs/class-8/chapter-"+chapter.number}>
                  {chapter.number.toLocaleString("bn-BD")}. {chapter.title} →
                </a>
              </div>)}
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ৪ · বীজ ও অঙ্কুরোদ্গম")}</strong>
              <div><a href="/science/class-8/chapter-4?topic=seed">{t("বীজ অঙ্কুরোদ্গমের ব্যবহারিক কাজ ও সিমুলেশন খোলো →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ৫ · প্রতিবর্ত ক্রিয়া ও স্নায়ু সংকেত")}</strong>
              <div><a href="/science/class-8/chapter-5?topic=reflex">{t("স্নায়ু সংকেত সিমুলেটর খোলো →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ২ · মিয়োসিস-I ও II")}</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=5">{t("ইন্টারেক্টিভ ক্রোমোজোম ট্র্যাকার খোলো →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ২ · কোষ → নিউক্লিয়াস → ক্রোমোজোম → DNA → জিন")}</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=7">{t("পাঠ ৭-এর ধারাবাহিক বংশগত তথ্য জুম খোলো →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ২ · বংশগতি ও জিন সঞ্চারণ")}</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=9">{t("পাঠ ৯-এর বংশগতি ও জিন সঞ্চারণ ল্যাব খোলো →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ১ · প্রাণিজগতের শ্রেণিবিন্যাস")}</strong>
              <div><a href="/science/class-8/chapter-1">{t("শ্রেণিবিন্যাস অনুসন্ধান ও শিক্ষক নির্দেশিকা খোলো →")}</a></div>
              {[
                {number:3,title:t("ব্যাপন, অভিস্রবণ ও প্রস্বেদন")},
                {number:4,title:t("উদ্ভিদের বংশ বৃদ্ধি")},
                {number:5,title:t("সমন্বয় ও নিঃসরণ")},
                {number:6,title:t("পরমাণুর গঠন")}
              ].map(chapter=><div key={chapter.number}><a href={`/science/class-8/chapter-${chapter.number}`}>{t("অধ্যায়")}{chapter.number} · {chapter.title} →</a></div>)}
              {[
                {number:7,title:t("পৃথিবী ও মহাকর্ষ")},
                {number:8,title:t("রাসায়নিক বিক্রিয়া")},
                {number:9,title:t("বর্তনী ও চলবিদ্যুৎ")},
                {number:10,title:t("অম্ল, ক্ষারক ও লবণ")},
                {number:11,title:t("আলো")},
                {number:12,title:t("মহাকাশ ও উপগ্রহ")},
                {number:13,title:t("খাদ্য ও পুষ্টি")},
                {number:14,title:t("পরিবেশ এবং বাস্তুতন্ত্র")}
              ].map(chapter=><div key={chapter.number}><a href={`/science/class-8/chapter-${chapter.number}`}>{t("অধ্যায়")}{chapter.number} · {chapter.title} →</a></div>)}
              <div><a href="/nctb/2026/class-8/science-chapter-1.pdf" target="_blank" rel="noopener noreferrer">{t("মূল পাঠ্যবইয়ের অধ্যায় ১ খোলো →")}</a></div>
            </div>}
            <button className={styles.keepSubject} onClick={()=>setFolderOpen(false)}>{t("এই বইটি ডেস্কে রাখো")}</button>
          </div>
        </>}
      </section>
    </div>}

    {noteOpen&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setNoteOpen(false)}}>
      <section className={styles.notePanel}>
        <button className={styles.closeButton} onClick={()=>setNoteOpen(false)} aria-label={t("বন্ধ করো")}><X/></button>
        <p>{t("শিক্ষকের নোট")}</p>
        <h2>{t("মনে রাখার মতো কিছু")}</h2>
        <textarea value={note} onChange={e=>saveNote(e.target.value)} placeholder={t("কোনো মনে রাখার কথা, ধারণা বা শ্রেণিকক্ষের নোট লিখুন…")} maxLength={500}/>
        <small>{note.length}{t("/500 · এই ডিভাইসে স্বয়ংক্রিয়ভাবে সংরক্ষিত")}</small>
      </section>
    </div>}
  </main>;
}
