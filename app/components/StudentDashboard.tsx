"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {
  ChevronDown,ChevronRight,FileText,LogOut,
  PenLine,Play,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";
type Profile={full_name?:string;role?:string;class_level?:string};
type Drink="boba"|"tea"|"coffee"|"water"|"lemonade";
type Panel="notes"|"practice"|"lesson"|null;
type Book={id:string;title:string;label:string;glyph:string;accent:string;left:number;width:number};

const books:Book[]=[
  {id:"bangla",title:"Bangla",label:"বাংলা",glyph:"অ",accent:"#8d2d29",left:12.3,width:5.2},
  {id:"english",title:"English",label:"English",glyph:"Aa",accent:"#98453f",left:17.8,width:5.8},
  {id:"math",title:"Mathematics",label:"Mathematics",glyph:"△",accent:"#65523e",left:24.0,width:5.7},
  {id:"science",title:"Science",label:"Science",glyph:"❧",accent:"#49634d",left:30.0,width:6.6},
  {id:"ict",title:"ICT",label:"ICT",glyph:"▣",accent:"#48656b",left:36.8,width:5.8},
  {id:"bangladesh",title:"Bangladesh Studies",label:"Bangladesh Studies",glyph:"⌂",accent:"#52685a",left:42.8,width:6.2},
  {id:"religion",title:"Religion",label:"Religion",glyph:"◌",accent:"#735d49",left:49.3,width:5.7},
  {id:"agriculture",title:"Agriculture",label:"Agriculture",glyph:"☘",accent:"#596849",left:55.2,width:5.9},
  {id:"home-science",title:"Home Science",label:"Home Science",glyph:"⌂",accent:"#915449",left:61.3,width:5.9},
  {id:"arts",title:"Arts",label:"Arts",glyph:"◉",accent:"#a36e3f",left:67.5,width:5.6},
  {id:"physical",title:"Physical Education",label:"Physical Education",glyph:"↗",accent:"#526b72",left:73.3,width:6.0},
  {id:"work",title:"Work Education",label:"Work Education",glyph:"⚒",accent:"#765b48",left:79.6,width:6.3}
];

const scienceChapters=[
  "Living Things and Their Environment",
  "Cells and Their Functions",
  "Human Body Systems",
  "Food and Nutrition",
  "Matter and Energy",
  "Earth and Space"
];

const drinkOptions:{id:Drink;label:string;image:string}[]=[
  {id:"boba",label:"Boba tea",image:"/bobatea.png"},
  {id:"tea",label:"Tea",image:"/classictea.png"},
  {id:"coffee",label:"Coffee",image:"/classiccoffee.png"},
  {id:"water",label:"Water",image:"/glassofwater.png"},
  {id:"lemonade",label:"Lemonade",image:"/lemonade.png"}
];

export default function StudentDashboard(){
  const sceneRef=useRef<HTMLElement|null>(null);
  const[profile,setProfile]=useState<Profile>({class_level:"8"});
  const[selectedBook,setSelectedBook]=useState<Book>(books[3]);
  const[selectedChapter,setSelectedChapter]=useState(1);
  const[readerOpen,setReaderOpen]=useState(false);
  const[lightOn,setLightOn]=useState(true);
  const[drink,setDrink]=useState<Drink>("tea");
  const[drinkOpen,setDrinkOpen]=useState(false);
  const[panel,setPanel]=useState<Panel>(null);
  const[note,setNote]=useState("");
  const[classOpen,setClassOpen]=useState(false);

  useEffect(()=>{
    try{
      const saved=localStorage.getItem("bujhi-demo-user");
      if(saved){
        const data=JSON.parse(saved) as Profile;
        if(data.role==="student")setProfile(data);
      }
      const savedNote=localStorage.getItem("bujhi-student-sticky-note");
      if(savedNote)setNote(savedNote);
      const savedDrink=localStorage.getItem("bujhi-student-drink") as Drink|null;
      if(savedDrink&&drinkOptions.some(item=>item.id===savedDrink)){
        setDrink(savedDrink);
      }
    }catch{}
  },[]);

  function logout(){
    try{localStorage.removeItem("bujhi-demo-auth")}catch{}
    location.href="/";
  }

  const chapters=useMemo(
    ()=>selectedBook.id==="science"
      ?scienceChapters
      :Array.from({length:6},(_,index)=>`${selectedBook.title} — Chapter ${index+1}`),
    [selectedBook]
  );
  const currentTitle=chapters[selectedChapter-1]||chapters[0];
  const firstName=profile.full_name?.trim().split(" ")[0]||"Samiha";
  const activeDrink=drinkOptions.find(item=>item.id===drink)||drinkOptions[1];

  function openBook(book:Book){
    setSelectedBook(book);setSelectedChapter(1);setReaderOpen(true);
  }

  function chooseDrink(next:Drink){
    setDrink(next);setDrinkOpen(false);
    try{localStorage.setItem("bujhi-student-drink",next)}catch{}
  }

  function saveNote(value:string){
    setNote(value);
    try{localStorage.setItem("bujhi-student-sticky-note",value)}catch{}
  }

  return <main className={`${styles.page} ${lightOn?"":styles.pageDim}`}>
    <section ref={sceneRef} className={styles.referenceDesk} aria-label="Bujhi student study desk">
      <div className={styles.deskBrand}><a href="/">বুঝি</a><span>Student desk</span></div>
      <div className={styles.headerClassCover} aria-hidden="true"/>
      <div className={styles.dynamicClass}>
        <button type="button" onClick={()=>setClassOpen(v=>!v)}>Class {profile.class_level||"8"} <ChevronDown/></button>
        {classOpen&&<div className={styles.classMenu}>
          {[6,7,8,9,10].map(level=><button type="button" key={level} onClick={()=>{setProfile(current=>({...current,class_level:String(level)}));setClassOpen(false);}}>Class {level}</button>)}
        </div>}
      </div>

      <div className={styles.headerProfileCover} aria-hidden="true"/>
      <div className={styles.dynamicProfile}>
        <span><UsersRound/></span><strong>{firstName}</strong>
        <button type="button" onClick={logout} aria-label="Log out"><LogOut/></button>
      </div>


      <div className={styles.bookHotspots} aria-label="Subject books">
        {books.map(book=><button type="button" key={book.id} style={{backgroundColor:book.accent}} onClick={()=>openBook(book)} aria-label={`Open ${book.title}`} title={book.title}>
          <span className={styles.bookGlyph}>{book.glyph}</span><span className={styles.bookTitle}>{book.label}</span><small>বুঝি</small>
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
        aria-label={lightOn?"Dim the whole study room":"Brighten the whole study room"}
      >
        <span className={styles.roomLightDot} aria-hidden="true"/>
        <span>{lightOn?"Room light on":"Room light off"}</span>
      </button>

      <div className={styles.moneyPlant} role="img" aria-label="Money plant">
        <img src="/29e8b631-9c79-4996-b225-405227aa1153.png" alt="" draggable={false} loading="eager"/>
      </div>

      <div className={styles.studyNotebook}>
        <div className={styles.notebookBinding} aria-hidden="true"/>
        <p>My study desk</p><h1>A little learning,<br/>every day.</h1>
        <span>Pick a book from your shelf to begin.</span>
        <button type="button" onClick={()=>openBook(selectedBook)}><Play size={16}/> Open {selectedBook.title}<ChevronRight size={16}/></button>
        <small>Class {profile.class_level||"8"} · Your own space to understand</small>
      </div>
      <button type="button" className={styles.stickyHotspot} onClick={()=>setPanel("notes")} aria-label="Open sticky note"><StickyNote size={19}/><strong>A thought to keep</strong><span>{note||"Write something you want to remember…"}</span></button>
      <nav className={styles.actionHotspots} aria-label="Study tools">
        <button type="button" onClick={()=>openBook(selectedBook)}><FileText size={18}/>My books</button>
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
          {drinkOptions.map(item=><button type="button" key={item.id} className={drink===item.id?styles.drinkActive:""} onClick={()=>chooseDrink(item.id)} aria-pressed={drink===item.id}><span className={styles.drinkThumb} aria-hidden="true"><img src={item.image} alt="" draggable={false}/></span><span>{item.label}</span></button>)}
        </div>}
      </aside>
    </section>

    {readerOpen&&<div className={styles.readerBackdrop}>
      <section className={styles.openBook} aria-label={`${selectedBook.title} chapters`}>
        <button type="button" className={styles.readerClose} onClick={()=>setReaderOpen(false)} aria-label="Close book"><X/></button>
        <div className={styles.readerLeft}>
          <div className={styles.readerSubject}><span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span><div><small>Class {profile.class_level||"8"}</small><h2>{selectedBook.title}</h2></div></div>
          <div className={styles.pdfCard}><FileText/><div><strong>Textbook PDF</strong><span>Open the full official textbook.</span></div><button type="button" disabled title="The PDF file will be connected later">PDF coming soon</button></div>
          <p className={styles.readerTip}>Choose a chapter on the right. Chapter lessons can be uploaded later without changing this desk.</p>
        </div>
        <div className={styles.readerSpine} aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
        <div className={styles.readerRight}>
          <p className={styles.readerKicker}>Chapter lessons</p><h3>Choose a chapter</h3>
          <div className={styles.chapterList}>
            {chapters.map((title,index)=><button type="button" key={title} onClick={()=>{setSelectedChapter(index+1);setReaderOpen(false);setPanel("lesson");}}>
              <span>{String(index+1).padStart(2,"0")}</span><div><strong>Chapter {index+1}</strong><small>{title}</small></div><ChevronRight/>
            </button>)}
          </div>
        </div>
      </section>
    </div>}

    {panel&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setPanel(null)}}>
      <section className={styles.panel}>
        <button type="button" className={styles.closeButton} onClick={()=>setPanel(null)} aria-label="Close"><X/></button>
        {panel==="notes"&&<>
          <div className={styles.panelHeader}><span className={styles.noteHeaderIcon}><StickyNote/></span><div><p>Personal notes</p><h2>My sticky note</h2><small>Saved automatically on this device for now.</small></div></div>
          <textarea className={styles.noteEditor} value={note} onChange={event=>saveNote(event.target.value)} placeholder="Write something you want to remember..." maxLength={500}/>
          <div className={styles.noteMeta}><span>{note.length}/500</span><strong>Saved automatically</strong></div>
        </>}
        {panel==="practice"&&<>
          <div className={styles.panelHeader}><span className={styles.noteHeaderIcon}><PenLine/></span><div><p>Practice</p><h2>{selectedBook.title} · Chapter {selectedChapter}</h2><small>{currentTitle}</small></div></div>
          <div className={styles.practiceCards}>
            <article><strong>Quick check</strong><p>Short concept questions for this chapter.</p><button disabled>Coming with lesson content</button></article>
            <article><strong>Practice set</strong><p>Topic-wise exercises and revision activities.</p><button disabled>Coming with lesson content</button></article>
            <article><strong>Try again</strong><p>Questions based on topics that need another explanation.</p><button disabled>Coming with progress data</button></article>
          </div>
        </>}
        {panel==="lesson"&&<>
          <div className={styles.panelHeader}><span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span><div><p>Lesson</p><h2>{selectedBook.title} · Chapter {selectedChapter}</h2><small>{currentTitle}</small></div></div>
          <div className={styles.lessonPlaceholder}><Play/><h3>Chapter lesson space</h3><p>Chapter-wise lessons will be uploaded here later. The selected book and chapter are already connected to this flow.</p></div>
        </>}
      </section>
    </div>}
  </main>;
}
