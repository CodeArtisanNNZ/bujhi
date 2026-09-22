"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {useRouter} from "next/navigation";
import {
  FileText,LogOut,PenLine,Play,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";
import {
  studentBookCatalog,studentClassKey,studentClassLabels,type NctbBook
} from "../data/nctbBooks";

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
  const sceneRef=useRef<HTMLElement|null>(null);
  const[profile,setProfile]=useState<Profile>({class_level:"8"});
  const[profileReady,setProfileReady]=useState(false);
  const[selectedBookId,setSelectedBookId]=useState("");
  const[lightOn,setLightOn]=useState(true);
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
    }catch{}
  },[]);

  const classKey=studentClassKey(profile.class_level);
  const books=studentBookCatalog[classKey];
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

  if(!profileReady){
    return <main className={styles.page}><div className={styles.studentLoading}>Opening your study desk…</div></main>;
  }

  return <main className={`${styles.page} ${lightOn?"":styles.pageDim}`}>
    <section ref={sceneRef} className={styles.referenceDesk} aria-label={`Bujhi ${studentClassLabels[classKey]} study desk`}>
      <div className={styles.deskBrand}><a href="/">বুঝি</a><span>Student desk</span></div>

      <div className={styles.dynamicClass}>
        <div className={styles.classPill}>
          <strong>{studentClassLabels[classKey]}</strong>
          <span>NCTB 2026 · {books.length} books</span>
        </div>
      </div>

      <div className={styles.dynamicProfile}>
        <span><UsersRound/></span><strong>{firstName}</strong>
        <button type="button" onClick={logout} aria-label="Log out"><LogOut/></button>
      </div>

      <div className={styles.shelfMeta}>
        <strong>{studentClassLabels[classKey]} bookshelf</strong>
        <span>Scroll the shelf · choose any NCTB textbook</span>
      </div>

      <div className={styles.bookHotspots} aria-label={`${studentClassLabels[classKey]} NCTB textbooks`}>
        {books.map(book=><button
          type="button"
          key={book.id}
          className={selectedBook.id===book.id?styles.bookSelected:""}
          style={{backgroundColor:book.accent}}
          onClick={()=>openBook(book)}
          onMouseEnter={()=>setSelectedBookId(book.id)}
          aria-label={`Open ${book.title}`}
          title={book.englishTitle}
        >
          <span className={styles.bookGlyph}>{book.glyph}</span>
          <span className={styles.bookTitle}>{book.title}</span>
          <small>NCTB</small>
        </button>)}
      </div>

      <div className={styles.deskSurface} aria-hidden="true"/>
      <div className={styles.lamp} aria-hidden="true">
        <img className={styles.studentLampImage} src="/ef6af6f1-43c9-41fe-9c24-5f3873a95c33.png" alt="" draggable={false}/>
      </div>

      <button
        type="button"
        className={styles.roomLightSwitch}
        onClick={()=>setLightOn(value=>!value)}
        aria-pressed={lightOn}
        aria-label={lightOn?"Turn lamp off":"Turn lamp on"}
      >
        <span className={styles.roomLightDot} aria-hidden="true"/>
        <span>{lightOn?"Lamp on":"Lamp off"}</span>
      </button>

      <div className={styles.moneyPlant} role="img" aria-label="Money plant">
        <img src="/29e8b631-9c79-4996-b225-405227aa1153.png" alt="" draggable={false} loading="eager"/>
      </div>

      <div className={styles.studyNotebook}>
        <div className={styles.notebookBinding} aria-hidden="true"/>
        <p>{studentClassLabels[classKey]} · My study desk</p>
        <h1>{selectedBook.title}</h1>
        <span>{selectedBook.englishTitle} · Open the book page to read the PDF or learn the lesson.</span>
        <button type="button" onClick={()=>openBook(selectedBook)}><Play size={16}/> Open this book</button>
        <small>Every book has its own PDF + Learn Lesson page.</small>
      </div>

      <button type="button" className={styles.stickyHotspot} onClick={()=>setPanel("notes")} aria-label="Open sticky note">
        <StickyNote size={19}/><strong>A thought to keep</strong><span>{note||"Write something you want to remember…"}</span>
      </button>

      <nav className={styles.actionHotspots} aria-label="Study tools">
        <button type="button" onClick={()=>openBook(selectedBook)}><FileText size={18}/>Selected book</button>
        <button type="button" onClick={()=>setPanel("practice")}><PenLine size={18}/>Practice</button>
        <button type="button" onClick={()=>setPanel("notes")}><StickyNote size={18}/>My notes</button>
      </nav>

      <aside className={styles.drinkArea}>
        <button type="button" className={styles.cupHotspot} onClick={()=>setDrinkOpen(value=>!value)} aria-expanded={drinkOpen} aria-label={`Change desk drink: ${activeDrink.label}`}>
          <span key={drink} className={styles.drinkImageFrame} aria-hidden="true">
            {(drink==="tea"||drink==="coffee")&&<span className={styles.steam}><i/><i/><i/></span>}
            <img className={styles.drinkImage} src={activeDrink.image} alt="" draggable={false}/>
          </span>
          <span className={styles.drinkLabel}>{activeDrink.label} · Change</span>
        </button>
        {drinkOpen&&<div className={styles.drinkMenu}>
          <div className={styles.drinkMenuTitle}>Choose a drink</div>
          {drinkOptions.map(item=><button type="button" key={item.id} className={drink===item.id?styles.drinkActive:""} onClick={()=>chooseDrink(item.id)} aria-pressed={drink===item.id}>
            <span className={styles.drinkThumb} aria-hidden="true"><img src={item.image} alt="" draggable={false}/></span><span>{item.label}</span>
          </button>)}
        </div>}
      </aside>
    </section>

    {panel&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setPanel(null)}}>
      <section className={styles.panel}>
        <button type="button" className={styles.closeButton} onClick={()=>setPanel(null)} aria-label="Close"><X/></button>
        {panel==="notes"&&<>
          <div className={styles.panelHeader}><span className={styles.noteHeaderIcon}><StickyNote/></span><div><p>Personal notes</p><h2>My sticky note</h2><small>Saved automatically on this device for now.</small></div></div>
          <textarea className={styles.noteEditor} value={note} onChange={event=>saveNote(event.target.value)} placeholder="Write something you want to remember..." maxLength={500}/>
          <div className={styles.noteMeta}><span>{note.length}/500</span><strong>Saved automatically</strong></div>
        </>}
        {panel==="practice"&&<>
          <div className={styles.panelHeader}><span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span><div><p>Practice</p><h2>{selectedBook.title}</h2><small>{studentClassLabels[classKey]}</small></div></div>
          <div className={styles.practiceCards}>
            <article><strong>Quick check</strong><p>Short questions will connect to this textbook's lesson content.</p><button disabled>Coming with lessons</button></article>
            <article><strong>Practice set</strong><p>Topic-wise exercises will appear after lesson content is added.</p><button disabled>Coming with lessons</button></article>
            <article><strong>Try again</strong><p>Revision will use the student's progress in this book.</p><button disabled>Coming with progress data</button></article>
          </div>
        </>}
      </section>
    </div>}
  </main>;
}
