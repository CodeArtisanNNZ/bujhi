"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {
  BookOpen,ChevronDown,ChevronRight,Coffee,FileText,LampDesk,LogOut,
  NotebookPen,PenLine,Play,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";

type Profile={full_name?:string;role?:string;class_level?:string};
type Book={
  id:string;
  title:string;
  label:string;
  glyph:string;
  spine:string;
  accent:string;
};
type Drink="coffee"|"tea"|"water"|"lemonade";
type Panel="book"|"notes"|"practice"|"lesson"|null;

const books:Book[]=[
  {id:"bangla",title:"Bangla",label:"বাংলা",glyph:"অ",spine:"paper",accent:"#8d2d29"},
  {id:"english",title:"English",label:"English",glyph:"Aa",spine:"rose",accent:"#8d3534"},
  {id:"math",title:"Mathematics",label:"Mathematics",glyph:"△",spine:"sand",accent:"#705441"},
  {id:"science",title:"Science",label:"Science",glyph:"❧",spine:"green",accent:"#425d48"},
  {id:"ict",title:"ICT",label:"ICT",glyph:"▣",spine:"blue",accent:"#3d5d62"},
  {id:"bangladesh",title:"Bangladesh Studies",label:"Bangladesh Studies",glyph:"⌂",spine:"sage",accent:"#486154"},
  {id:"religion",title:"Religion",label:"Religion",glyph:"◌",spine:"cream",accent:"#765c48"},
  {id:"agriculture",title:"Agriculture",label:"Agriculture",glyph:"☘",spine:"olive",accent:"#506044"},
  {id:"home-science",title:"Home Science",label:"Home Science",glyph:"⌂",spine:"clay",accent:"#8b473b"},
  {id:"arts",title:"Arts",label:"Arts",glyph:"◉",spine:"ochre",accent:"#a36537"},
  {id:"physical",title:"Physical Education",label:"Physical Education",glyph:"↗",spine:"slate",accent:"#46616a"},
  {id:"work",title:"Work Education",label:"Work Education",glyph:"⚒",spine:"tan",accent:"#745542"}
];

const drinks:{id:Drink;label:string;liquid:string;emoji:string;hot:boolean}[]=[
  {id:"coffee",label:"Coffee",liquid:"#4b2418",emoji:"☕",hot:true},
  {id:"tea",label:"Tea",liquid:"#8a5529",emoji:"🍵",hot:true},
  {id:"water",label:"Water",liquid:"#8fc4d3",emoji:"💧",hot:false},
  {id:"lemonade",label:"Lemonade",liquid:"#e4c85f",emoji:"🍋",hot:false}
];

const scienceChapters=[
  "Living Things and Their Environment",
  "Cells and Their Functions",
  "Human Body Systems",
  "Food and Nutrition",
  "Matter and Energy",
  "Earth and Space"
];

export default function StudentDashboard(){
  const[profile,setProfile]=useState<Profile>({class_level:"8"});
  const[selectedBook,setSelectedBook]=useState<Book>(books.find(book=>book.id==="science")||books[0]);
  const[selectedChapter,setSelectedChapter]=useState(1);
  const[lightOn,setLightOn]=useState(true);
  const[drink,setDrink]=useState<Drink>("tea");
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
      if(savedDrink&&["coffee","tea","water","lemonade"].includes(savedDrink))setDrink(savedDrink);
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
    try{localStorage.setItem("bujhi-student-drink",next)}catch{}
  }

  function saveNote(value:string){
    setNote(value);
    try{localStorage.setItem("bujhi-student-sticky-note",value)}catch{}
  }

  const firstName=profile.full_name?.trim().split(" ")[0]||"Samiha";
  const drinkData=drinks.find(item=>item.id===drink)||drinks[0];
  const chapters=useMemo(
    ()=>selectedBook.id==="science"
      ?scienceChapters
      :Array.from({length:6},(_,index)=>`Chapter ${index+1}`),
    [selectedBook.id]
  );

  const currentTitle=chapters[selectedChapter-1]||chapters[0];

  return <main className={`${styles.page} ${lightOn?styles.lightOn:styles.lightOff}`}>
    <header className={styles.topbar}>
      <Link href="/" className={styles.brand}>Bujhi<span>❧</span></Link>

      <div className={styles.classPicker}>
        <button onClick={()=>setClassOpen(value=>!value)}>
          Class {profile.class_level||"8"} <ChevronDown/>
        </button>
        {classOpen&&<div className={styles.classMenu}>
          {[6,7,8,9,10].map(level=><button
            key={level}
            onClick={()=>{
              setProfile(current=>({...current,class_level:String(level)}));
              setClassOpen(false);
            }}
          >Class {level}</button>)}
        </div>}
      </div>

      <div className={styles.profileBlock}>
        <span className={styles.avatar}><UsersRound/></span>
        <strong>{firstName}</strong>
        <button className={styles.logout} onClick={logout} aria-label="Log out"><LogOut/></button>
      </div>
    </header>

    <section className={styles.studyRoom}>
      <div className={styles.shelfFrame}>
        <div className={styles.vine vineLeft}><i/><i/><i/><i/><i/><i/></div>
        <div className={styles.bookshelf} aria-label="Class books">
          {books.map(book=><button
            key={book.id}
            className={`${styles.bookSpine} ${styles[book.spine]} ${selectedBook.id===book.id?styles.activeBook:""}`}
            onClick={()=>chooseBook(book)}
            title={book.title}
          >
            <span className={styles.bookGlyph}>{book.glyph}</span>
            <strong>{book.label}</strong>
            <small>{book.title}</small>
            <i/>
          </button>)}
        </div>
        <div className={styles.penCup}><span/><span/><span/></div>
        <div className={styles.globeDecor}>◎</div>
      </div>

      <div className={styles.wallArea}>
        <button
          className={`${styles.lamp} ${lightOn?styles.lampLit:""}`}
          onClick={()=>setLightOn(value=>!value)}
          aria-label={lightOn?"Turn lamp off":"Turn lamp on"}
        >
          <span className={styles.lampArm}/>
          <span className={styles.lampShade}><LampDesk/></span>
          <span className={styles.lampGlow}/>
          <span className={styles.lampSwitch}>{lightOn?"ON":"OFF"}</span>
        </button>

        <div className={styles.leftDecor}>
          <div className={styles.penJar}><span/><span/><span/><span/></div>
          <div className={styles.stackBooks}><i/><i/><i/></div>
        </div>

        <section className={styles.openNotebook} aria-label="Selected subject">
          <div className={styles.leftPage}>
            <div className={styles.subjectHeading}>
              <span>❧</span>
              <strong>{selectedBook.title}</strong>
            </div>
            <div className={styles.chapterList}>
              {chapters.map((chapterTitle,index)=><button
                key={chapterTitle}
                onClick={()=>setSelectedChapter(index+1)}
                className={selectedChapter===index+1?styles.chapterActive:""}
              >
                <span>{selectedChapter===index+1?"●":"○"}</span>
                <strong>Chapter {index+1}</strong>
                <ChevronRight/>
              </button>)}
            </div>
          </div>

          <div className={styles.bookRings}><i/><i/><i/><i/><i/><i/></div>

          <div className={styles.rightPage}>
            <span className={styles.pageKicker}>Chapter {selectedChapter}</span>
            <h1>{currentTitle}</h1>
            <div className={styles.lessonIllustration}>
              <i className={styles.leafOne}/>
              <i className={styles.leafTwo}/>
              <i className={styles.leafThree}/>
              <i className={styles.land}/>
              <i className={styles.sun}/>
            </div>
            <p>{selectedBook.id==="science"
              ?"Explore the chapter with explanations, examples, lessons and practice activities."
              :"Open this chapter to see its textbook pages and chapter-wise lessons."
            }</p>
          </div>

          <button className={styles.bookmark} onClick={()=>setPanel("notes")}>
            <StickyNote/>
            <span>{note.trim()?"My sticky note":"Add a sticky note"}</span>
          </button>
        </section>

        <aside className={styles.studyTablet}>
          <div className={styles.tabletScreen}>
            <span className={styles.tabletPlant}>❧</span>
            <strong>{selectedBook.title}</strong>
            <small>Chapter {selectedChapter}</small>
            <p>{currentTitle}</p>
            <div className={styles.progress}><i/></div>
            <div className={styles.player}>
              <button>◀</button>
              <button className={styles.play}><Play/></button>
              <button>▶</button>
            </div>
          </div>
        </aside>

        <div className={styles.plantDecor}><span/><span/><span/><span/><span/></div>
      </div>

      <div className={styles.deskSurface}>
        <div className={styles.deskMat}>
          <button className={styles.continueCard} onClick={()=>setPanel("lesson")}>
            <span><Play/></span>
            <div>
              <strong>Continue learning</strong>
              <small>Chapter {selectedChapter} · {currentTitle}</small>
            </div>
            <ChevronRight/>
          </button>

          <button className={styles.actionCard} onClick={()=>setPanel("lesson")}>
            <NotebookPen/>
            <span>Start lesson</span>
            <ChevronRight/>
          </button>

          <button className={styles.actionCard} onClick={()=>setPanel("practice")}>
            <PenLine/>
            <span>Practice</span>
            <ChevronRight/>
          </button>

          <button className={styles.actionCard} onClick={()=>setPanel("notes")}>
            <BookOpen/>
            <span>My notes</span>
            <ChevronRight/>
          </button>
        </div>

        <div className={styles.personalNotebook}>
          <strong>My Notes</strong>
          <span>❧</span>
        </div>

        <div className={styles.penDecor}/>

        <div className={styles.mugZone}>
          <button
            key={drink}
            className={`${styles.mug} animate__animated animate__pulse`}
            onClick={()=>chooseDrink(drinks[(drinks.findIndex(item=>item.id===drink)+1)%drinks.length].id)}
            aria-label="Change desk drink"
          >
            {drinkData.hot&&<span className={styles.steam}><i/><i/><i/></span>}
            <span className={styles.liquid} style={{background:drinkData.liquid}}/>
            <span className={styles.mugFace}>{drinkData.emoji}</span>
            <span className={styles.handle}/>
          </button>

          <div className={styles.drinkPicker}>
            {drinks.map(item=><button
              key={item.id}
              className={drink===item.id?styles.drinkActive:""}
              onClick={()=>chooseDrink(item.id)}
            >{item.label}</button>)}
          </div>
        </div>
      </div>
    </section>

    {panel&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setPanel(null)}}>
      <section className={styles.panel}>
        <button className={styles.closeButton} onClick={()=>setPanel(null)} aria-label="Close"><X/></button>

        {panel==="book"&&<>
          <div className={styles.panelHeader}>
            <span className={styles.panelBookIcon} style={{background:selectedBook.accent}}>{selectedBook.glyph}</span>
            <div>
              <p>Class {profile.class_level||"8"} book</p>
              <h2>{selectedBook.title}</h2>
              <span>Choose what you want to open.</span>
            </div>
          </div>

          <div className={styles.tabs}>
            <button className={bookTab==="pdf"?styles.tabActive:""} onClick={()=>setBookTab("pdf")}><FileText/>Textbook PDF</button>
            <button className={bookTab==="chapters"?styles.tabActive:""} onClick={()=>setBookTab("chapters")}><BookOpen/>Chapter lessons</button>
          </div>

          {bookTab==="pdf"?<div className={styles.pdfPanel}>
            <FileText/>
            <h3>{selectedBook.title} textbook</h3>
            <p>The PDF area is ready. Connect the uploaded NCTB textbook file here when the content library is added.</p>
            <button disabled>PDF will be added here</button>
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
            <span className={styles.noteIcon}><StickyNote/></span>
            <div><p>Personal notes</p><h2>My sticky note</h2><span>Saved on this device while the full database note system is being connected.</span></div>
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
            <span className={styles.noteIcon}><PenLine/></span>
            <div><p>Practice</p><h2>{selectedBook.title} · Chapter {selectedChapter}</h2><span>{currentTitle}</span></div>
          </div>
          <div className={styles.practiceCards}>
            <article><strong>Quick check</strong><p>Short concept questions for this chapter.</p><button disabled>Coming with lesson content</button></article>
            <article><strong>Practice set</strong><p>Topic-wise exercises and revision activities.</p><button disabled>Coming with lesson content</button></article>
            <article><strong>Try again</strong><p>Questions based on topics you struggled with earlier.</p><button disabled>Coming with progress data</button></article>
          </div>
        </>}

        {panel==="lesson"&&<>
          <div className={styles.panelHeader}>
            <span className={styles.panelBookIcon} style={{background:selectedBook.accent}}>{selectedBook.glyph}</span>
            <div><p>Lesson</p><h2>{selectedBook.title} · Chapter {selectedChapter}</h2><span>{currentTitle}</span></div>
          </div>
          <div className={styles.lessonPlaceholder}>
            <Play/>
            <h3>Lesson space ready</h3>
            <p>Chapter-wise lessons will be uploaded here. This UI already keeps the selected book, chapter, practice and notes connected.</p>
          </div>
        </>}
      </section>
    </div>}
  </main>;
}
