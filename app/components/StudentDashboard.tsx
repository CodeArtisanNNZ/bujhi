"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {
  ChevronDown,ChevronRight,FileText,LogOut,
  PenLine,Play,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";
import deskBg0 from "./student-assets/deskBg0";
import deskBg1 from "./student-assets/deskBg1";
import drink0 from "./student-assets/drink0";
import drink1 from "./student-assets/drink1";
import drink2 from "./student-assets/drink2";

const DESK_SRC=`data:image/webp;base64,${deskBg0}${deskBg1}`;
const DRINK_SPRITE_SRC=`data:image/avif;base64,${drink0}${drink1}${drink2}`;

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

const drinkOptions:{id:Drink;label:string;spriteIndex:number}[]=[
  {id:"boba",label:"Boba tea",spriteIndex:0},
  {id:"tea",label:"Tea",spriteIndex:1},
  {id:"coffee",label:"Coffee",spriteIndex:2},
  {id:"water",label:"Water",spriteIndex:3},
  {id:"lemonade",label:"Lemonade",spriteIndex:4}
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

  return <main className={styles.page}>
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
      <div className={styles.lamp} data-on={lightOn} aria-hidden="true">
        <div className={styles.lampGlow}/><div className={styles.lampShade}/><div className={styles.lampStem}/><div className={styles.lampBase}/>
      </div>
      <button type="button" className={styles.lampSwitch} onClick={()=>setLightOn(value=>!value)} aria-pressed={lightOn} aria-label={lightOn?"Turn desk lamp off":"Turn desk lamp on"}>{lightOn?"Lamp on":"Lamp off"}</button>

      <div className={styles.moneyPlant} role="img" aria-label="Money plant in a terracotta pot">
        <svg viewBox="0 0 200 250" aria-hidden="true">
          <path d="M101 200 Q65 133 104 48 M100 176 Q151 124 147 81 M97 152 Q43 118 44 75 M101 189 Q166 191 176 143" fill="none" stroke="#4a653c" strokeWidth="4"/>
          {[[104,48,-20],[91,89,35],[78,125,-50],[147,81,30],[137,125,-25],[44,75,-45],[58,111,45],[176,143,25],[149,178,-30]].map(([x,y,r],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0 17 C-39 -1 -29 -33 -8 -23 Q0 -22 0 -13 Q12 -37 27 -23 C46 0 15 12 0 17Z" fill={i%2?"#63864b":"#3d623e"}/><path d="M0 15 L0 -14 M0 0 L-17 -12 M0 4 L19 -12" stroke="#bbca85" strokeWidth="1.3" fill="none"/></g>)}
          <ellipse cx="101" cy="241" rx="47" ry="7" fill="#38251a" opacity=".15"/>
          <path d="M62 187 L71 235 Q100 249 131 235 L140 187Z" fill="#b57752"/>
          <path d="M68 196 L76 232" stroke="#dca67a" strokeWidth="6" opacity=".65"/>
          <ellipse cx="101" cy="188" rx="40" ry="10" fill="#d0956b"/><ellipse cx="101" cy="187" rx="32" ry="6" fill="#564333"/>
        </svg>
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
          <span key={drink} className={styles.cupScene} data-drink={drink} aria-hidden="true">
            <span className={styles.steam}><i/><i/><i/></span>
            <span className={styles.saucer}/><span className={styles.cupHandle}/>
            <span className={styles.cupBody}><span className={styles.liquid}/>{drink==="boba"&&<span className={styles.pearls}>● ● ●<br/> ● ●</span>}<span className={styles.cupMark}>বুঝি</span></span>
          </span>
          <span className={styles.drinkLabel}>{activeDrink.label} · Change</span>
        </button>
        {drinkOpen&&<div className={styles.drinkMenu}>
          <div className={styles.drinkMenuTitle}>Choose a drink</div>
          {drinkOptions.map(item=><button type="button" key={item.id} className={drink===item.id?styles.drinkActive:""} onClick={()=>chooseDrink(item.id)} aria-pressed={drink===item.id}><span>{item.label}</span></button>)}
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
