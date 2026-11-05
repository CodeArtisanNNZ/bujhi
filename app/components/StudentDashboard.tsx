"use client";
import ResponsiveImage from "./ResponsiveImage";
import CupSteam from "./CupSteam";
import DeskCalendar from "./DeskCalendar";
import RotatingDeskGlobe from "./RotatingDeskGlobe";

import {useEffect,useMemo,useRef,useState} from "react";
import {useRouter} from "next/navigation";
import {
  FileText,LogOut,PenLine,Play,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";
import {
  studentBookCatalog,studentClassKey,type NctbBook
} from "../data/nctbBooks";
import {localizedBookTitle,localizedClassName,useBujhiLanguage} from "../lib/i18n";

type Profile={full_name?:string;role?:string;class_level?:string};
type Drink="boba"|"tea"|"coffee"|"water"|"lemonade";
type Panel="notes"|"practice"|null;

const drinkOptions:{id:Drink;label:string;image:string}[]=[
  {id:"boba",label:"Boba tea",image:"/bobatea.png"},
  {id:"tea",label:"Tea",image:"/classictea.png"},
  {id:"coffee",label:"Coffee",image:"/classiccoffee.png"},
  {id:"water",label:"Water",image:"/glassofwater.png"},
  {id:"lemonade",label:"Lemonade",image:"/lemonade.png"}
];

export default function StudentDashboard(){
  const router=useRouter();
  const language=useBujhiLanguage();
  const t=(en:string,bn:string)=>language==="bn"?bn:en;
  const title=(book:NctbBook)=>localizedBookTitle(book,language);
  const drinkName=(drink:Drink)=>({
    boba:t("Boba tea","বাবল টি"),tea:t("Tea","চা"),
    coffee:t("Coffee","কফি"),water:t("Water","পানি"),lemonade:t("Lemonade","লেবুর শরবত")
  })[drink];
  const sceneRef=useRef<HTMLElement|null>(null);
  const[profile,setProfile]=useState<Profile>({class_level:"8"});
  const[profileReady,setProfileReady]=useState(false);
  const[selectedBookId,setSelectedBookId]=useState("");
  const[deskLightOn,setDeskLightOn]=useState(true);
  const[drink,setDrink]=useState<Drink>("tea");
  const[drinkOpen,setDrinkOpen]=useState(false);
  const[panel,setPanel]=useState<Panel>(null);
  const[note,setNote]=useState("");

  useEffect(()=>{
    void (async()=>{
      try{
        const response=await fetch("/api/me",{cache:"no-store"});
        if(!response.ok){
          location.replace("/login?role=student");
          return;
        }
        const data=await response.json() as {profile?:Profile};
        if(data.profile?.role==="teacher"){
          location.replace("/teacher-dashboard");
          return;
        }
        if(data.profile)setProfile(data.profile);
      }catch{
        location.replace("/login?role=student");
        return;
      }finally{
        setProfileReady(true);
      }
    })();

    try{
      const savedNote=localStorage.getItem("bujhi-student-sticky-note");
      if(savedNote)setNote(savedNote);
      const savedDrink=localStorage.getItem("bujhi-student-drink") as Drink|null;
      if(savedDrink&&drinkOptions.some(item=>item.id===savedDrink))setDrink(savedDrink);
      const savedLamp=localStorage.getItem("bujhi-student-desk-lamp");
      if(savedLamp==="off")setDeskLightOn(false);
    }catch{}
  },[]);

  const classKey=studentClassKey(profile.class_level);
  const books=studentBookCatalog[classKey];
  const className=localizedClassName(classKey,language);
  const selectedBook=useMemo<NctbBook>(()=>books.find(book=>book.id===selectedBookId)||books[0],[books,selectedBookId]);
  const firstName=profile.full_name?.trim().split(" ")[0]||"Student";
  const activeDrink=drinkOptions.find(item=>item.id===drink)||drinkOptions[1];

  useEffect(()=>{
    setSelectedBookId(current=>books.some(book=>book.id===current)?current:books[0]?.id||"");
  },[books]);

  async function logout(){
    try{await fetch("/api/auth/logout",{method:"POST"})}catch{}
    try{
      localStorage.removeItem("bujhi-demo-auth");
      localStorage.removeItem("bujhi-demo-user");
    }catch{}
    location.href="/login?role=student";
  }

  function openBook(book:NctbBook){
    setSelectedBookId(book.id);
    router.push(`/student-dashboard/books/${classKey}/${book.id}`);
  }

  function chooseDrink(next:Drink){
    setDrink(next);
    setDrinkOpen(false);
    try{localStorage.setItem("bujhi-student-drink",next)}catch{}
  }

  function saveNote(value:string){
    setNote(value);
    try{localStorage.setItem("bujhi-student-sticky-note",value)}catch{}
  }

  function toggleDeskLamp(){
    setDeskLightOn(current=>{
      const next=!current;
      try{localStorage.setItem("bujhi-student-desk-lamp",next?"on":"off")}catch{}
      return next;
    });
  }

  if(!profileReady){
    return <main className={styles.page}><div className={styles.studentLoading}>{t("Opening your study desk…","তোমার পড়ার ডেস্ক খোলা হচ্ছে…")}</div></main>;
  }

  return <main className={`${styles.page} ${deskLightOn?"":styles.pageDim}`} lang={language} data-no-translate>
    <section ref={sceneRef} className={styles.referenceDesk} aria-label={t(`Bujhi ${className} study desk`,`বুঝি ${className} পড়ার ডেস্ক`)}>
      <div className={styles.dynamicClass}>
        <div className={styles.classPill}>
          <strong>{className}</strong>
          <span>NCTB 2026 · {books.length} {t("books","টি বই")}</span>
        </div>
      </div>

      <div className={styles.dynamicProfile}>
        <span><UsersRound/></span><strong>{firstName}</strong>
        <button type="button" onClick={logout} aria-label={t("Log out","লগ আউট")}><LogOut/></button>
      </div>

      <div className={styles.shelfMeta}>
        <strong>{className} {t("bookshelf","বইয়ের তাক")}</strong>
        <span>{t("Scroll the shelf · choose any NCTB textbook","তাকটি সরিয়ে যেকোনো NCTB পাঠ্যবই বেছে নাও")}</span>
      </div>

      <div className={styles.bookHotspots} aria-label={t(`${className} NCTB textbooks`,`${className} NCTB পাঠ্যবই`)}>
        {books.map(book=><button
          type="button"
          key={book.id}
          className={selectedBook.id===book.id?styles.bookSelected:""}
          style={{backgroundColor:book.accent}}
          onClick={()=>openBook(book)}
          onMouseEnter={()=>setSelectedBookId(book.id)}
          aria-label={t(`Open ${title(book)}`,`${title(book)} খোলো`)}
          title={title(book)}
        >
          <span className={styles.bookGlyph}>{book.glyph}</span>
          <span className={styles.bookTitle}>{title(book)}</span>
          <small>NCTB</small>
        </button>)}
      </div>

      <div className={styles.studyNotebook}>
        <div className={styles.notebookBinding} aria-hidden="true"/>
        <p>{className} · {t("My study desk","আমার পড়ার ডেস্ক")}</p>
        <h1>{title(selectedBook)}</h1>
        <span>{t("Open the book page to read the PDF or learn the lesson.","PDF পড়তে বা পাঠ শিখতে বইয়ের পাতা খোলো।")}</span>
        <button type="button" onClick={()=>openBook(selectedBook)}><Play size={16}/> {t("Open this book","এই বই খোলো")}</button>
        <small>{t("Every book has its own PDF + Learn Lesson page.","প্রতিটি বইয়ের নিজস্ব PDF ও পাঠ শেখার পাতা আছে।")}</small>
      </div>

      <nav className={styles.actionHotspots} aria-label={t("Study tools","পড়ার সরঞ্জাম")}>
        <button type="button" onClick={()=>openBook(selectedBook)}><FileText size={18}/>{t("Selected book","নির্বাচিত বই")}</button>
        <button type="button" onClick={()=>setPanel("practice")}><PenLine size={18}/>{t("Practice","অনুশীলন")}</button>
        <button type="button" onClick={()=>setPanel("notes")}><StickyNote size={18}/>{t("My notes","আমার নোট")}</button>
      </nav>

      <div className={styles.deskSurface} aria-hidden="true"/>
      <div className={styles.deskScene}>
        <div className={styles.lamp} aria-hidden="true">
          <ResponsiveImage className={styles.studentLampImage} sizes="360px" src="/ef6af6f1-43c9-41fe-9c24-5f3873a95c33.png" alt="" draggable={false}/>
        </div>

        <button
          type="button"
          className={`${styles.roomLightSwitch} ${deskLightOn?styles.lightOn:styles.lightOff}`}
          onClick={toggleDeskLamp}
          aria-pressed={deskLightOn}
          aria-label={deskLightOn?t("Dim the desk","ডেস্কের আলো কমাও"):t("Brighten the desk","ডেস্কের আলো বাড়াও")}
        >
          <span className={styles.roomLightTrack} aria-hidden="true">
            <span className={`${styles.roomLightState} ${styles.roomLightOff}`}>{t("OFF","বন্ধ")}</span>
            <span className={`${styles.roomLightState} ${styles.roomLightOn}`}>{t("ON","চালু")}</span>
            <span className={styles.roomLightThumb}><i/></span>
          </span>
        </button>

        <div className={styles.moneyPlant} role="img" aria-label={t("Money plant","মানিপ্ল্যান্ট")}>
          <ResponsiveImage sizes="360px" src="/29e8b631-9c79-4996-b225-405227aa1153.png" alt="" draggable={false} loading="eager"/>
        </div>

        <RotatingDeskGlobe className={styles.studentGlobe} showFact={false}/>

        <aside className={styles.drinkArea}>
          <button type="button" className={styles.cupHotspot} onClick={()=>setDrinkOpen(value=>!value)} aria-expanded={drinkOpen} aria-label={t(`Change desk drink: ${drinkName(activeDrink.id)}`,`ডেস্কের পানীয় বদলাও: ${drinkName(activeDrink.id)}`)}>
            <span key={drink} className={styles.drinkImageFrame} aria-hidden="true">
              {(drink==="tea"||drink==="coffee")&&<CupSteam drink={drink}/>}
              <ResponsiveImage className={styles.drinkImage} sizes="180px" src={activeDrink.image} alt="" draggable={false}/>
            </span>
            <span className={styles.drinkLabel}>{drinkName(activeDrink.id)} · {t("Change","বদলাও")}</span>
          </button>
          {drinkOpen&&<div className={styles.drinkMenu}>
            <div className={styles.drinkMenuTitle}>{t("Choose a drink","পানীয় বেছে নাও")}</div>
            {drinkOptions.map(item=><button type="button" key={item.id} className={drink===item.id?styles.drinkActive:""} onClick={()=>chooseDrink(item.id)} aria-pressed={drink===item.id}>
              <span className={styles.drinkThumb} aria-hidden="true"><ResponsiveImage sizes="80px" src={item.image} alt="" draggable={false}/></span><span>{drinkName(item.id)}</span>
            </button>)}
          </div>}
        </aside>
      </div>
      <div className={styles.deskFooter}>
        <DeskCalendar className={styles.liveCalendar}/>
        <button type="button" className={styles.stickyHotspot} onClick={()=>setPanel("notes")} aria-label={t("Open sticky note","স্টিকি নোট খোলো")}>
          <StickyNote size={19}/><strong>{t("A thought to keep","মনে রাখার একটি কথা")}</strong><span>{note||t("Write something you want to remember…","মনে রাখতে চাও এমন কিছু লেখো…")}</span>
        </button>
      </div>
    </section>

    {panel&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setPanel(null)}}>
      <section className={styles.panel}>
        <button type="button" className={styles.closeButton} onClick={()=>setPanel(null)} aria-label={t("Close","বন্ধ করো")}><X/></button>
        {panel==="notes"&&<>
          <div className={styles.panelHeader}><span className={styles.noteHeaderIcon}><StickyNote/></span><div><p>{t("Personal notes","ব্যক্তিগত নোট")}</p><h2>{t("My sticky note","আমার স্টিকি নোট")}</h2><small>{t("Saved automatically on this device for now.","এখন এই ডিভাইসে স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে।")}</small></div></div>
          <textarea className={styles.noteEditor} value={note} onChange={event=>saveNote(event.target.value)} placeholder={t("Write something you want to remember...","মনে রাখতে চাও এমন কিছু লেখো…")} maxLength={500}/>
          <div className={styles.noteMeta}><span>{note.length}/500</span><strong>{t("Saved automatically","স্বয়ংক্রিয়ভাবে সংরক্ষিত")}</strong></div>
        </>}
        {panel==="practice"&&<>
          <div className={styles.panelHeader}><span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span><div><p>{t("Practice","অনুশীলন")}</p><h2>{title(selectedBook)}</h2><small>{className}</small></div></div>
          <div className={styles.practiceCards}>
            <article><strong>{t("Quick check","দ্রুত যাচাই")}</strong><p>{t("Short questions will connect to this textbook's lesson content.","ছোট প্রশ্নগুলো এই বইয়ের পাঠের সঙ্গে যুক্ত থাকবে।")}</p><button disabled>{t("Coming with lessons","পাঠের সঙ্গে আসছে")}</button></article>
            <article><strong>{t("Practice set","অনুশীলন সেট")}</strong><p>{t("Topic-wise exercises will appear after lesson content is added.","পাঠের বিষয়বস্তু যুক্ত হলে বিষয়ভিত্তিক অনুশীলন দেখা যাবে।")}</p><button disabled>{t("Coming with lessons","পাঠের সঙ্গে আসছে")}</button></article>
            <article><strong>{t("Try again","আবার চেষ্টা করো")}</strong><p>{t("Revision will use the student's progress in this book.","পুনরাবৃত্তি এই বইয়ে শিক্ষার্থীর অগ্রগতির ওপর ভিত্তি করবে।")}</p><button disabled>{t("Coming with progress data","অগ্রগতির তথ্যের সঙ্গে আসছে")}</button></article>
          </div>
        </>}
      </section>
    </div>}
  </main>;
}
