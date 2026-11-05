"use client";
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
import {studentBookCatalog,type NctbBook,type StudentClassKey} from "../data/nctbBooks";
import {localizedBookTitle,localizedClassName,useBujhiLanguage,type BujhiLanguage} from "../lib/i18n";

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
  const language=useBujhiLanguage();
  const t=(bn:string,en:string)=>language==="bn"?bn:en;
  const bookTitle=(book:NctbBook)=>localizedBookTitle(book,language);
  const className=(value:number)=>localizedClassName(teacherClassKey(value),language);
  const drinkName=(drink:Drink)=>({
    boba:t("বাবল টি","Boba tea"),tea:t("চা","Tea"),
    coffee:t("কফি","Coffee"),water:t("পানি","Water"),
    lemonade:t("লেবুর শরবত","Lemonade")
  })[drink];
  const categoryName=(category:NctbBook["category"])=>({
    core:t("মূল বিষয়","Core"),choice:t("ঐচ্ছিক","Elective"),
    religion:t("ধর্ম","Religion"),group:t("বিভাগ","Group"),
    language:t("ভাষা","Language"),arts:t("শিল্প","Arts")
  })[category];
  const[profile,setProfile]=useState<Profile>({});
  const[selectedClass,setSelectedClass]=useState(8);
  const[selectedBook,setSelectedBook]=useState<NctbBook|null>(null);
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

  const teacherName=profile.full_name?.trim().split(" ")[0]||t("শিক্ষক","Teacher");
  const activeDrink=drinkOptions.find(item=>item.id===drink)||drinkOptions[2];
  const booksForClass=useMemo(
    ()=>teacherBooksForClass(selectedClass),
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

  return <main className={`${styles.page} ${deskLightOn?"":styles.pageDim}`} lang={language} data-no-translate>
    <section className={styles.referenceDesk} aria-label={t("বুঝি? শিক্ষক ডেস্ক","Bujhi teacher desk")}>
      <div className={styles.teacherBadge}>
        <FolderOpen/><span>{t("তোমার শ্রেণিগুলো","Your classes")}</span>
      </div>

      <div className={styles.dynamicProfile}>
        <span><UsersRound/></span><strong>{teacherName}</strong>
        <button type="button" onClick={logout} aria-label={t("লগ আউট","Log out")}><LogOut/></button>
      </div>

      <div className={styles.folderShelf} aria-label={t("শ্রেণির ফোল্ডার","Class folders")}>
        {classFolders.map(folder=><button
          type="button"
          key={folder.value}
          className={styles.classFolder}
          style={{backgroundColor:folder.accent}}
          onClick={()=>openClass(folder.value)}
          aria-label={t(`${className(folder.value)} ফোল্ডার খোলো`,`Open ${className(folder.value)} folder`)}
        >
          <span className={styles.folderTab}/>
          <span className={styles.folderPapers}><i/><i/><i/></span>
          <span className={styles.folderHole}/>
          <strong>{className(folder.value)}</strong>
          <small>{t(`${teacherBooksForClass(folder.value).length}টি বই · NCTB ২০২৬`,`${teacherBooksForClass(folder.value).length} books · NCTB 2026`)}</small>
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
        aria-label={deskLightOn?t("ডেস্কের আলো কমাও","Dim the desk light"):t("ডেস্কের আলো বাড়াও","Brighten the desk light")}
      >
        <span className={styles.roomLightTrack} aria-hidden="true">
          <span className={`${styles.roomLightState} ${styles.roomLightOff}`}>{t("বন্ধ","OFF")}</span>
          <span className={`${styles.roomLightState} ${styles.roomLightOn}`}>{t("চালু","ON")}</span>
          <span className={styles.roomLightThumb}><i/></span>
        </span>
      </button>

      <DeskCalendar className={styles.liveCalendar}/>

      <div className={styles.moneyPlant} aria-hidden="true">
        <ResponsiveImage sizes="360px" src="/29e8b631-9c79-4996-b225-405227aa1153.png" alt="" draggable={false}/>
      </div>

      <div className={styles.teacherNotebook}>
        <div className={styles.notebookBinding}/>
        <p>{t("শিক্ষকের পাঠ ডেস্ক","Teacher lesson desk")}</p>
        <h1>{selectedBook?bookTitle(selectedBook):t("পরিকল্পনা করো। শেখাও। বুঝতে সাহায্য করো।","Plan. Teach. Help them understand.")}</h1>
        <span>
          {selectedBook
            ?`${className(selectedClass)} · ${bookTitle(selectedBook)} · NCTB 2026`
            :t("NCTB ২০২৬-এর পাঠ্যবই দেখতে শ্রেণির ফোল্ডার খোলো।","Open a class folder to browse the NCTB 2026 textbooks.")}
        </span>
        <button type="button" onClick={()=>openClass(selectedClass)}>
          <FolderOpen size={17}/>
          {selectedBook?t("শ্রেণির ফোল্ডার খোলো","Open class folder"):t(`${className(selectedClass)} খোলো`,`Open ${className(selectedClass)}`)}
          <ChevronRight size={16}/>
        </button>
        <small>{t("শ্রেণি → NCTB ২০২৬ পাঠ্যবই → বই","Class → NCTB 2026 textbooks → Book")}</small>
      </div>

      <button type="button" className={styles.stickyHotspot} onClick={()=>setNoteOpen(true)} aria-label={t("নোট খোলো","Open note")}>
        <strong>{t("নোট","Note")}</strong>
        {note&&<span>{note}</span>}
      </button>

      <nav className={styles.actionHotspots} aria-label={t("শিক্ষকের সরঞ্জাম","Teacher tools")}>
        <button type="button" onClick={()=>openClass(selectedClass)}><FolderOpen size={18}/>{t("আমার শ্রেণিগুলো","My classes")}</button>
        <button type="button" onClick={()=>setFolderOpen(true)}><BookOpen size={18}/>{t("পাঠসমূহ","Lessons")}</button>
        <button type="button" onClick={()=>setNoteOpen(true)}><NotebookPen size={18}/>{t("আমার নোট","My notes")}</button>
      </nav>

      <aside className={styles.drinkArea}>
        <button type="button" className={styles.cupHotspot} onClick={()=>setDrinkOpen(v=>!v)} aria-expanded={drinkOpen}>
          <span key={drink} className={styles.drinkImageFrame}>
            {(drink==="tea"||drink==="coffee")&&<CupSteam drink={drink}/>}
            <ResponsiveImage className={styles.drinkImage} sizes="180px" src={activeDrink.image} alt="" draggable={false}/>
          </span>
          <span className={styles.drinkLabel}>{drinkName(activeDrink.id)} · {t("বদলাও","Change")}</span>
        </button>
        {drinkOpen&&<div className={styles.drinkMenu}>
          <div className={styles.drinkMenuTitle}>{t("পানীয় বেছে নাও","Choose a drink")}</div>
          {drinkOptions.map(item=><button type="button" key={item.id} className={drink===item.id?styles.drinkActive:""} onClick={()=>chooseDrink(item.id)}>
            <span className={styles.drinkThumb}><ResponsiveImage sizes="80px" src={item.image} alt="" draggable={false}/></span>
            <span>{drinkName(item.id)}</span>
          </button>)}
        </div>}
      </aside>
    </section>

    {folderOpen&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setFolderOpen(false)}}>
      <section className={styles.folderPanel}>
        <button className={styles.closeButton} onClick={()=>setFolderOpen(false)} aria-label={t("বন্ধ করো","Close")}><X/></button>
        <header>
          <div className={styles.panelFolderIcon}><FolderOpen/></div>
          <div>
            <p>{className(selectedClass)} · NCTB 2026</p>
            <h2>{selectedBook?bookTitle(selectedBook):t(`${booksForClass.length}টি পাঠ্যবই`,`${booksForClass.length} textbooks`)}</h2>
          </div>
        </header>

        {!selectedBook?<div className={styles.subjectGrid}>
          {booksForClass.map(book=><button
            key={book.id}
            onClick={()=>selectedClass>=6&&selectedClass<=8?openBookPdf(book):setSelectedBook(book)}
            style={{"--accent":book.accent} as React.CSSProperties}
            aria-label={selectedClass>=6&&selectedClass<=8?`${bookTitle(book)} ${t("PDF খোলো","Open PDF")}`:`${t("খোলো","Open")} ${bookTitle(book)}`}
          >
            <span className={styles.subjectTab}/>
            <FileText/>
            <span>
              <strong>{bookTitle(book)}</strong>
              <small className={styles.subjectMeta}>{categoryName(book.category)} · NCTB 2026</small>
            </span>
            <ChevronRight/>
          </button>)}
        </div>:<>
          <button className={styles.backButton} onClick={()=>setSelectedBook(null)}><ChevronLeft/> {t("বই","Books")}</button>
          <div className={styles.subjectDetail}>
            <div className={styles.detailAccent} style={{background:selectedBook.accent}}/>
            <p>NCTB 2026 · {categoryName(selectedBook.category)}</p>
            <h3>{bookTitle(selectedBook)}</h3>
            <div className={styles.detailStats}>
              <span><b>{className(selectedClass)}</b></span>
              <span><b>{bookTitle(selectedBook)}</b></span>
              <span><b>NCTB 2026</b></span>
            </div>
            <div className={styles.choiceList}>
              <strong>{t("পাঠ্যবই PDF","Textbook PDF")}</strong>
              <div>{selectedBook.pdfPath.startsWith("https://drive.google.com/file/d/")||selectedClass===8&&selectedBook.id==="science"
                ? <a href={selectedBook.pdfPath} target="_blank" rel="noopener noreferrer">{t("সম্পূর্ণ পাঠ্যবই খোলো →","Open full textbook →")}</a>
                : <span>{t("PDF এখনো যুক্ত হয়নি","PDF not available yet")}</span>}</div>
              {selectedClass===8&&<div><a href="https://digitalcontent.gov.bd/portal/audios" target="_blank" rel="noopener noreferrer">{t("ফ্রি অডিও রিসোর্স →","Free audio resources →")}</a> · <a href="https://talkingbookbangla.com/" target="_blank" rel="noopener noreferrer">{t("টকিং বুক লাইব্রেরি →","Talking Book library →")}</a></div>}
            </div>
            {selectedClass===8&&selectedBook.id==="bangladesh-global-studies"&&<div className={styles.choiceList}>
              <strong>{t("১৩টি অধ্যায়ের পাঠ পরিকল্পনা","13 chapter lesson plans")}</strong>
              <div><a href="/bgs/class-8">{t("সব অধ্যায়ের লক্ষ্য, সময়, কার্যক্রম ও মূল্যায়ন →","All chapter goals, timings, activities and assessments →")}</a></div>
              {class8BgsPlans.map(chapter=><div key={chapter.number}>
                <a href={chapter.number===1?"/bgs/class-8/chapter-1":"/bgs/class-8/chapter-"+chapter.number}>
                  {language==="bn"?chapter.number.toLocaleString("bn-BD"):chapter.number}. {language==="bn"?chapter.title:chapter.englishTitle} →
                </a>
              </div>)}
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ৪ · বীজ ও অঙ্কুরোদ্গম","Chapter 4 · Seeds and Germination")}</strong>
              <div><a href="/science/class-8/chapter-4?topic=seed">{t("বীজ অঙ্কুরোদ্গমের ব্যবহারিক কাজ ও সিমুলেশন খোলো →","Open the seed germination activity and simulation →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ৫ · প্রতিবর্ত ক্রিয়া ও স্নায়ু সংকেত","Chapter 5 · Reflexes and Nerve Signals")}</strong>
              <div><a href="/science/class-8/chapter-5?topic=reflex">{t("স্নায়ু সংকেত সিমুলেটর খোলো →","Open the nerve signal simulator →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ২ · মিয়োসিস-I ও II","Chapter 2 · Meiosis I & II")}</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=5">{t("ইন্টারেক্টিভ ক্রোমোজোম ট্র্যাকার খোলো →","Open the interactive chromosome tracker →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ২ · কোষ → নিউক্লিয়াস → ক্রোমোজোম → DNA → জিন","Chapter 2 · Cell → Nucleus → Chromosome → DNA → Gene")}</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=7">{t("পাঠ ৭-এর ধারাবাহিক বংশগত তথ্য জুম খোলো →","Open Lesson 7's genetic information zoom →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ২ · বংশগতি ও জিন সঞ্চারণ","Chapter 2 · Heredity and Gene Transmission")}</strong>
              <div><a href="/dashboard/science/chapter-2?lesson=9">{t("পাঠ ৯-এর বংশগতি ও জিন সঞ্চারণ ল্যাব খোলো →","Open Lesson 9's heredity and gene transmission lab →")}</a></div>
            </div>}
            {selectedClass===8&&selectedBook.id==="science"&&<div className={styles.choiceList}>
              <strong>{t("অধ্যায় ১ · প্রাণিজগতের শ্রেণিবিন্যাস","Chapter 1 · Classification of Animals")}</strong>
              <div><a href="/science/class-8/chapter-1">{t("শ্রেণিবিন্যাস অনুসন্ধান ও শিক্ষক নির্দেশিকা খোলো →","Open classification exploration and teacher guide →")}</a></div>
              {[
                {number:3,title:"ব্যাপন, অভিস্রবণ ও প্রস্বেদন",englishTitle:"Diffusion, Osmosis and Transpiration"},
                {number:4,title:"উদ্ভিদের বংশ বৃদ্ধি",englishTitle:"Plant Reproduction"},
                {number:5,title:"সমন্বয় ও নিঃসরণ",englishTitle:"Coordination and Excretion"},
                {number:6,title:"পরমাণুর গঠন",englishTitle:"Atomic Structure"}
              ].map(chapter=><div key={chapter.number}><a href={`/science/class-8/chapter-${chapter.number}`}>{t("অধ্যায়","Chapter")} {chapter.number} · {language==="bn"?chapter.title:chapter.englishTitle} →</a></div>)}
              {[
                {number:7,title:"পৃথিবী ও মহাকর্ষ",englishTitle:"Earth and Gravitation"},
                {number:8,title:"রাসায়নিক বিক্রিয়া",englishTitle:"Chemical Reactions"},
                {number:9,title:"বর্তনী ও চলবিদ্যুৎ",englishTitle:"Circuits and Current Electricity"},
                {number:10,title:"অম্ল, ক্ষারক ও লবণ",englishTitle:"Acids, Bases and Salts"},
                {number:11,title:"আলো",englishTitle:"Light"},
                {number:12,title:"মহাকাশ ও উপগ্রহ",englishTitle:"Space and Satellites"},
                {number:13,title:"খাদ্য ও পুষ্টি",englishTitle:"Food and Nutrition"},
                {number:14,title:"পরিবেশ এবং বাস্তুতন্ত্র",englishTitle:"Environment and Ecosystems"}
              ].map(chapter=><div key={chapter.number}><a href={`/science/class-8/chapter-${chapter.number}`}>{t("অধ্যায়","Chapter")} {chapter.number} · {language==="bn"?chapter.title:chapter.englishTitle} →</a></div>)}
              <div><a href="/nctb/2026/class-8/science-chapter-1.pdf" target="_blank" rel="noopener noreferrer">{t("মূল পাঠ্যবইয়ের অধ্যায় ১ খোলো →","Open textbook Chapter 1 →")}</a></div>
            </div>}
            <button className={styles.keepSubject} onClick={()=>setFolderOpen(false)}>{t("এই বইটি ডেস্কে রাখো","Keep this book on the desk")}</button>
          </div>
        </>}
      </section>
    </div>}

    {noteOpen&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setNoteOpen(false)}}>
      <section className={styles.notePanel}>
        <button className={styles.closeButton} onClick={()=>setNoteOpen(false)} aria-label={t("বন্ধ করো","Close")}><X/></button>
        <p>{t("শিক্ষকের নোট","Teacher notes")}</p>
        <h2>{t("মনে রাখার মতো কিছু","Something to remember")}</h2>
        <textarea value={note} onChange={e=>saveNote(e.target.value)} placeholder={t("কোনো মনে রাখার কথা, ধারণা বা শ্রেণিকক্ষের নোট লিখুন…","Write a reminder, idea or classroom note…")} maxLength={500}/>
        <small>{note.length}/500 · {t("এই ডিভাইসে স্বয়ংক্রিয়ভাবে সংরক্ষিত","Saved automatically on this device")}</small>
      </section>
    </div>}
  </main>;
}
