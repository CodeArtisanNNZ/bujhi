"use client";

import Link from "next/link";
import {createElement,useEffect,useMemo,useState} from "react";
import {
  BookOpen,ChevronDown,ChevronRight,FileText,LogOut,
  NotebookPen,PenLine,Play,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";

type Profile={full_name?:string;role?:string;class_level?:string};
type Drink="coffee"|"tea"|"water"|"lemonade";
type Panel="book"|"notes"|"practice"|"lesson"|null;
type Book={id:string;title:string;label:string;glyph:string;accent:string};

const books:Book[]=[
  {id:"bangla",title:"Bangla",label:"বাংলা",glyph:"অ",accent:"#8d2d29"},
  {id:"english",title:"English",label:"English",glyph:"Aa",accent:"#98453f"},
  {id:"math",title:"Mathematics",label:"Mathematics",glyph:"△",accent:"#65523e"},
  {id:"science",title:"Science",label:"Science",glyph:"❧",accent:"#49634d"},
  {id:"ict",title:"ICT",label:"ICT",glyph:"▣",accent:"#48656b"},
  {id:"bangladesh",title:"Bangladesh Studies",label:"Bangladesh Studies",glyph:"⌂",accent:"#52685a"},
  {id:"religion",title:"Religion",label:"Religion",glyph:"◌",accent:"#735d49"},
  {id:"agriculture",title:"Agriculture",label:"Agriculture",glyph:"☘",accent:"#596849"},
  {id:"home-science",title:"Home Science",label:"Home Science",glyph:"⌂",accent:"#915449"},
  {id:"arts",title:"Arts",label:"Arts",glyph:"◉",accent:"#a36e3f"},
  {id:"physical",title:"Physical Education",label:"Physical Education",glyph:"↗",accent:"#526b72"},
  {id:"work",title:"Work Education",label:"Work Education",glyph:"⚒",accent:"#765b48"}
];

const scienceChapters=[
  "Living Things and Their Environment",
  "Cells and Their Functions",
  "Human Body Systems",
  "Food and Nutrition",
  "Matter and Energy",
  "Earth and Space"
];

const drinks:{id:Drink;label:string;detail:string;src:string;accessory?:string}[]=[
  {id:"coffee",label:"Coffee",detail:"Stoneware coffee mug",src:"https://cdn.3dassets.dev/assets/33831/v1/model.glb"},
  {id:"tea",label:"Tea",detail:"Red enamel tea mug",src:"https://cdn.3dassets.dev/assets/26026/v1/model.glb"},
  {id:"water",label:"Water",detail:"Glass water carafe",src:"https://cdn.3dassets.dev/assets/16535/v1/model.glb"},
  {id:"lemonade",label:"Lemonade",detail:"Glass carafe with lemon",src:"https://cdn.3dassets.dev/assets/16535/v1/model.glb",accessory:"https://cdn.3dassets.dev/assets/26906/v1/model.glb"}
];

const bookHotspots=[
  {left:10.3,width:5.4},
  {left:16.2,width:5.7},
  {left:22.2,width:6.1},
  {left:28.4,width:6.8},
  {left:35.4,width:5.8},
  {left:41.5,width:6.5},
  {left:48.1,width:5.4},
  {left:53.8,width:5.6},
  {left:59.6,width:6.0},
  {left:66.0,width:6.2},
  {left:72.6,width:6.5},
  {left:79.3,width:6.6}
];

function Model({src,alt}:{src:string;alt:string}){
  return createElement("model-viewer",{
    src,
    alt,
    class:styles.drinkModel,
    "camera-orbit":"25deg 68deg 2m",
    "field-of-view":"24deg",
    "interaction-prompt":"none",
    "shadow-intensity":"0.9",
    "shadow-softness":"1",
    "environment-image":"neutral",
    exposure:"0.96",
    "tone-mapping":"neutral",
    loading:"eager",
    "disable-zoom":true,
    style:{width:"100%",height:"100%",background:"transparent"}
  });
}

export default function StudentDashboard(){
  const[profile,setProfile]=useState<Profile>({class_level:"8"});
  const[selectedBook,setSelectedBook]=useState<Book>(books[3]);
  const[selectedChapter,setSelectedChapter]=useState(1);
  const[lightOn,setLightOn]=useState(true);
  const[drink,setDrink]=useState<Drink>("tea");
  const[drinkOpen,setDrinkOpen]=useState(false);
  const[panel,setPanel]=useState<Panel>(null);
  const[bookTab,setBookTab]=useState<"pdf"|"chapters">("chapters");
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
      if(savedDrink&&drinks.some(item=>item.id===savedDrink))setDrink(savedDrink);
    }catch{}
  },[]);

  function logout(){
    try{localStorage.removeItem("bujhi-demo-auth")}catch{}
    location.href="/";
  }

  function chooseBook(book:Book){
    setSelectedBook(book);
    setSelectedChapter(1);
    setBookTab("chapters");
    setPanel("book");
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

  const firstName=profile.full_name?.trim().split(" ")[0]||"Samiha";
  const chapters=useMemo(
    ()=>selectedBook.id==="science"?scienceChapters:Array.from({length:6},(_,i)=>`Chapter ${i+1}`),
    [selectedBook.id]
  );
  const currentTitle=chapters[selectedChapter-1]||chapters[0];
  const activeDrink=drinks.find(item=>item.id===drink)||drinks[0];

  return <main className={styles.page}>
    <section className={styles.referenceDesk} aria-label="Bujhi student study desk">
      <img
        src="/classroom-student-view.png"
        alt="Bujhi student desk with subject books, study notebook, lamp, learning screen, plants and desk accessories"
        className={styles.referenceImage}
        draggable={false}
      />

      <div className={styles.removeSlogan} aria-hidden="true"/>

      <div className={styles.dynamicClass}>
        <button onClick={()=>setClassOpen(v=>!v)}>
          Class {profile.class_level||"8"} <ChevronDown/>
        </button>
        {classOpen&&<div className={styles.classMenu}>
          {[6,7,8,9,10].map(level=><button key={level} onClick={()=>{
            setProfile(current=>({...current,class_level:String(level)}));
            setClassOpen(false);
          }}>Class {level}</button>)}
        </div>}
      </div>

      <div className={styles.dynamicProfile}>
        <span><UsersRound/></span>
        <strong>{firstName}</strong>
        <button onClick={logout} aria-label="Log out"><LogOut/></button>
      </div>

      <div className={styles.bookHotspots} aria-label="Subject books">
        {books.map((book,index)=><button
          key={book.id}
          style={{left:`${bookHotspots[index].left}%`,width:`${bookHotspots[index].width}%`}}
          onClick={()=>chooseBook(book)}
          aria-label={`Open ${book.title}`}
          title={book.title}
        />)}
      </div>

      <button
        className={styles.lampHotspot}
        onClick={()=>setLightOn(v=>!v)}
        aria-label={lightOn?"Turn lamp off":"Turn lamp on"}
      >
        <span>{lightOn?"ON":"OFF"}</span>
      </button>
      <div className={`${styles.lampOffMask} ${!lightOn?styles.lampOffMaskVisible:""}`} aria-hidden="true"/>

      <div className={styles.chapterHotspots} aria-label="Science chapter list">
        {scienceChapters.map((chapter,index)=><button
          key={chapter}
          onClick={()=>{
            setSelectedBook(books[3]);
            setSelectedChapter(index+1);
            setPanel("lesson");
          }}
          aria-label={`Open Chapter ${index+1}: ${chapter}`}
        />)}
      </div>

      <button className={styles.stickyHotspot} onClick={()=>setPanel("notes")} aria-label="Open sticky note"/>

      <button className={styles.tabletHotspot} onClick={()=>setPanel("lesson")} aria-label="Continue lesson on learning screen"/>

      <div className={styles.actionHotspots}>
        <button className={styles.continueHotspot} onClick={()=>setPanel("lesson")} aria-label="Continue learning"/>
        <button className={styles.lessonHotspot} onClick={()=>setPanel("lesson")} aria-label="Start lesson"/>
        <button className={styles.practiceHotspot} onClick={()=>setPanel("practice")} aria-label="Practice"/>
        <button className={styles.notesHotspot} onClick={()=>setPanel("notes")} aria-label="My notes"/>
      </div>

      <aside className={styles.mugOverlay}>
        <button className={styles.mugStage} onClick={()=>setDrinkOpen(v=>!v)} aria-label={`Current drink: ${activeDrink.label}. Change drink.`}>
          <Model src={activeDrink.src} alt={activeDrink.detail}/>
          {activeDrink.accessory&&<span className={styles.lemonModel}><Model src={activeDrink.accessory} alt="Lemon"/></span>}
        </button>
        {drinkOpen&&<div className={styles.drinkMenu}>
          {drinks.map(item=><button
            key={item.id}
            className={drink===item.id?styles.drinkActive:""}
            onClick={()=>chooseDrink(item.id)}
          >{item.label}</button>)}
        </div>}
      </aside>
    </section>

    <div className={styles.mobileHint}>Tap the subject books, lamp, notebook, learning screen, action buttons or mug.</div>

    {panel&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setPanel(null)}}>
      <section className={styles.panel}>
        <button className={styles.closeButton} onClick={()=>setPanel(null)} aria-label="Close"><X/></button>

        {panel==="book"&&<>
          <div className={styles.panelHeader}>
            <span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span>
            <div>
              <p>Class {profile.class_level||"8"} book</p>
              <h2>{selectedBook.title}</h2>
              <small>Open the textbook PDF or choose a chapter lesson.</small>
            </div>
          </div>
          <div className={styles.tabs}>
            <button className={bookTab==="pdf"?styles.tabActive:""} onClick={()=>setBookTab("pdf")}><FileText/>Textbook PDF</button>
            <button className={bookTab==="chapters"?styles.tabActive:""} onClick={()=>setBookTab("chapters")}><BookOpen/>Chapter lessons</button>
          </div>
          {bookTab==="pdf"?<div className={styles.pdfPanel}>
            <FileText/>
            <h3>{selectedBook.title} textbook</h3>
            <p>The PDF viewer slot is ready for the official textbook file.</p>
            <button disabled>PDF will be connected here</button>
          </div>:<div className={styles.chapterPanel}>
            {chapters.map((title,index)=><button key={title} onClick={()=>{setSelectedChapter(index+1);setPanel("lesson")}}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <div><strong>Chapter {index+1}</strong><small>{title}</small></div>
              <ChevronRight/>
            </button>)}
          </div>}
        </>}

        {panel==="notes"&&<>
          <div className={styles.panelHeader}>
            <span className={styles.noteHeaderIcon}><StickyNote/></span>
            <div><p>Personal notes</p><h2>My sticky note</h2><small>Saved automatically on this device for now.</small></div>
          </div>
          <textarea
            className={styles.noteEditor}
            value={note}
            onChange={event=>saveNote(event.target.value)}
            placeholder="Write something you want to remember..."
            maxLength={500}
          />
          <div className={styles.noteMeta}><span>{note.length}/500</span><strong>Saved automatically</strong></div>
        </>}

        {panel==="practice"&&<>
          <div className={styles.panelHeader}>
            <span className={styles.noteHeaderIcon}><PenLine/></span>
            <div><p>Practice</p><h2>{selectedBook.title} · Chapter {selectedChapter}</h2><small>{currentTitle}</small></div>
          </div>
          <div className={styles.practiceCards}>
            <article><strong>Quick check</strong><p>Short concept questions for this chapter.</p><button disabled>Coming with lesson content</button></article>
            <article><strong>Practice set</strong><p>Topic-wise exercises and revision activities.</p><button disabled>Coming with lesson content</button></article>
            <article><strong>Try again</strong><p>Questions based on topics that need another explanation.</p><button disabled>Coming with progress data</button></article>
          </div>
        </>}

        {panel==="lesson"&&<>
          <div className={styles.panelHeader}>
            <span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span>
            <div><p>Lesson</p><h2>{selectedBook.title} · Chapter {selectedChapter}</h2><small>{currentTitle}</small></div>
          </div>
          <div className={styles.lessonPlaceholder}>
            <Play/>
            <h3>Chapter lesson space</h3>
            <p>Chapter-wise lessons will be uploaded here later. The functional flow is ready without animating the decorative desk scene.</p>
          </div>
        </>}
      </section>
    </div>}
  </main>;
}
