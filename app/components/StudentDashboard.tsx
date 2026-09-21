"use client";

import Link from "next/link";
import {createElement,useEffect,useMemo,useRef,useState} from "react";
import {
  BookOpen,ChevronDown,ChevronRight,FileText,LogOut,
  NotebookPen,PenLine,Play,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "../dashboard/dashboard.module.css";

type Profile={full_name?:string;role?:string;class_level?:string};
type Drink="coffee"|"tea"|"water"|"lemonade";
type Panel="book"|"notes"|"practice"|"lesson"|null;
type Book={
  id:string;
  title:string;
  label:string;
  glyph:string;
  accent:string;
};

type ModelProps={
  src:string;
  alt:string;
  className?:string;
  orbit?:string;
  fieldOfView?:string;
  interactive?:boolean;
  eager?:boolean;
};

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

const drinkModels:{
  id:Drink;
  label:string;
  detail:string;
  src:string;
  accessory?:string;
}[]=[
  {
    id:"coffee",
    label:"Coffee",
    detail:"Stoneware coffee mug",
    src:"https://cdn.3dassets.dev/assets/33831/v1/model.glb"
  },
  {
    id:"tea",
    label:"Tea",
    detail:"Red enamel tea mug",
    src:"https://cdn.3dassets.dev/assets/26026/v1/model.glb"
  },
  {
    id:"water",
    label:"Water",
    detail:"Glass water carafe",
    src:"https://cdn.3dassets.dev/assets/16535/v1/model.glb"
  },
  {
    id:"lemonade",
    label:"Lemonade",
    detail:"Glass carafe with lemon",
    src:"https://cdn.3dassets.dev/assets/16535/v1/model.glb",
    accessory:"https://cdn.3dassets.dev/assets/26906/v1/model.glb"
  }
];

function Model({
  src,
  alt,
  className,
  orbit="30deg 72deg 2.5m",
  fieldOfView="30deg",
  interactive=false,
  eager=false
}:ModelProps){
  const props:Record<string,unknown>={
    src,
    alt,
    class:className,
    "camera-orbit":orbit,
    "field-of-view":fieldOfView,
    "interaction-prompt":"none",
    "shadow-intensity":"1.2",
    "shadow-softness":"0.85",
    exposure:"1.05",
    "tone-mapping":"neutral",
    loading:eager?"eager":"lazy",
    "disable-zoom":true,
    style:{width:"100%",height:"100%",background:"transparent"}
  };
  if(interactive)props["camera-controls"]=true;
  return createElement("model-viewer",props);
}

export default function StudentDashboard(){
  const sceneRef=useRef<HTMLElement|null>(null);
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
      if(savedDrink&&drinkModels.some(item=>item.id===savedDrink))setDrink(savedDrink);
    }catch{}
  },[]);

  useEffect(()=>{
    let cancelled=false;
    let timer:ReturnType<typeof setTimeout>|null=null;
    let context:{revert?:()=>void}|null=null;
    let attempts=0;

    const boot=()=>{
      if(cancelled)return;
      const gsap=(window as unknown as {gsap?:any}).gsap;
      if(!gsap){
        if(attempts++<50)timer=setTimeout(boot,100);
        return;
      }
      context=gsap.context(()=>{
        gsap.from("[data-reveal]",{
          opacity:0,
          y:18,
          duration:.72,
          ease:"power3.out",
          stagger:.055
        });
        gsap.to("[data-plant]",{
          rotation:1.7,
          x:3,
          duration:4.6,
          yoyo:true,
          repeat:-1,
          ease:"sine.inOut",
          transformOrigin:"50% 95%"
        });
        gsap.to("[data-float]",{
          y:-7,
          duration:3.4,
          yoyo:true,
          repeat:-1,
          ease:"sine.inOut"
        });
      },sceneRef.current);
    };

    boot();
    return ()=>{
      cancelled=true;
      if(timer)clearTimeout(timer);
      context?.revert?.();
    };
  },[]);

  useEffect(()=>{
    const gsap=(window as unknown as {gsap?:any}).gsap;
    if(!gsap)return;
    gsap.fromTo(
      '[data-active-subject="true"]',
      {y:7,scale:.98},
      {y:-4,scale:1,duration:.42,ease:"back.out(1.5)"}
    );
  },[selectedBook.id]);

  useEffect(()=>{
    const gsap=(window as unknown as {gsap?:any}).gsap;
    if(!gsap)return;
    gsap.fromTo(
      "[data-drink-model]",
      {opacity:.2,rotationY:-24,scale:.88},
      {opacity:1,rotationY:0,scale:1,duration:.58,ease:"back.out(1.4)"}
    );
  },[drink]);

  useEffect(()=>{
    const gsap=(window as unknown as {gsap?:any}).gsap;
    if(!gsap)return;
    gsap.to("[data-lamp-object]",{
      rotation:lightOn?-2:2.5,
      duration:.55,
      ease:"power2.out",
      transformOrigin:"50% 85%"
    });
  },[lightOn]);

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
  const chapters=useMemo(
    ()=>selectedBook.id==="science"
      ?scienceChapters
      :Array.from({length:6},(_,index)=>`Chapter ${index+1}`),
    [selectedBook.id]
  );
  const currentTitle=chapters[selectedChapter-1]||chapters[0];
  const activeDrink=drinkModels.find(item=>item.id===drink)||drinkModels[0];

  return <main className={styles.page}>
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

    <section
      ref={sceneRef}
      className={`${styles.scene} ${lightOn?styles.sceneLight:styles.sceneDim}`}
    >
      <section className={styles.subjectShelf} data-reveal>
        <div className={styles.shelfPlantLeft} data-plant>
          <Model src="/3d/pottedPlant.glb" alt="Decorative potted plant" className={styles.fullModel}/>
        </div>

        <div className={styles.shelfFurniture} aria-hidden="true">
          <Model
            src="/3d/bookcaseOpen.glb"
            alt=""
            className={styles.fullModel}
            orbit="-28deg 70deg 3.3m"
            fieldOfView="24deg"
            eager
          />
        </div>

        <div className={styles.subjectRail} aria-label="Books for this class">
          {books.map(book=><button
            key={book.id}
            data-active-subject={selectedBook.id===book.id?"true":"false"}
            className={`${styles.subjectBook} ${selectedBook.id===book.id?styles.subjectBookActive:""}`}
            onClick={()=>chooseBook(book)}
          >
            <span className={styles.subjectIcon} style={{background:book.accent}}>{book.glyph}</span>
            <strong>{book.label}</strong>
            <small>{book.title}</small>
          </button>)}
        </div>

        <div className={styles.shelfBooks3d} data-float aria-hidden="true">
          <Model src="/3d/books.glb" alt="" className={styles.fullModel} orbit="35deg 67deg 2m"/>
        </div>

        <div className={styles.shelfPlantRight} data-plant aria-hidden="true">
          <Model src="/3d/plantSmall2.glb" alt="" className={styles.fullModel} orbit="-25deg 72deg 2.2m"/>
        </div>
      </section>

      <section className={styles.workspace}>
        <div className={styles.wallWash} aria-hidden="true"/>

        <button
          className={styles.lampObject}
          data-lamp-object
          data-reveal
          onClick={()=>setLightOn(value=>!value)}
          aria-label={lightOn?"Turn lamp off":"Turn lamp on"}
        >
          <Model
            src="/3d/lampRoundTable.glb"
            alt="Desk lamp"
            className={styles.fullModel}
            orbit="-32deg 70deg 2m"
            fieldOfView="28deg"
            eager
          />
          <span className={`${styles.lampBeam} ${lightOn?styles.lampBeamOn:""}`}/>
          <span className={styles.lampToggle}>{lightOn?"Lamp on":"Lamp off"}</span>
        </button>

        <div className={styles.leftPlant} data-plant data-reveal aria-hidden="true">
          <Model src="/3d/plantSmall2.glb" alt="" className={styles.fullModel} orbit="26deg 72deg 2m"/>
        </div>

        <div className={styles.decorBooks} data-float data-reveal aria-hidden="true">
          <Model src="/3d/books.glb" alt="" className={styles.fullModel} orbit="-25deg 66deg 1.8m"/>
        </div>

        <section className={styles.notebook} data-reveal aria-label="Current subject notebook">
          <div className={styles.notebookLeft}>
            <div className={styles.notebookTitle}>
              <span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span>
              <div><small>Class {profile.class_level||"8"}</small><strong>{selectedBook.title}</strong></div>
            </div>

            <div className={styles.chapterList}>
              {chapters.map((chapterTitle,index)=><button
                key={chapterTitle}
                onClick={()=>setSelectedChapter(index+1)}
                className={selectedChapter===index+1?styles.chapterActive:""}
              >
                <span>{String(index+1).padStart(2,"0")}</span>
                <div><strong>Chapter {index+1}</strong><small>{chapterTitle}</small></div>
                <ChevronRight/>
              </button>)}
            </div>
          </div>

          <div className={styles.notebookBinding} aria-hidden="true">
            <i/><i/><i/><i/><i/><i/>
          </div>

          <div className={styles.notebookRight}>
            <span className={styles.chapterTag}>Chapter {selectedChapter}</span>
            <h1>{currentTitle}</h1>
            <p>Read the textbook, open the chapter lesson, practise the topic, or keep your own notes from the same desk.</p>

            <div className={styles.lessonPreview}>
              <BookOpen/>
              <div>
                <strong>{selectedBook.title}</strong>
                <span>Chapter {selectedChapter} learning space</span>
              </div>
            </div>

            <button className={styles.stickyButton} onClick={()=>setPanel("notes")}>
              <StickyNote/>
              <div>
                <strong>{note.trim()?"My sticky note":"Add a sticky note"}</strong>
                <span>{note.trim()?note.slice(0,54):"Keep a thought beside the lesson."}</span>
              </div>
            </button>
          </div>
        </section>

        <aside className={styles.mediaStation} data-reveal>
          <div className={styles.monitorModel} data-float>
            <Model
              src="/3d/computerScreen.glb"
              alt="Learning screen"
              className={styles.fullModel}
              orbit="-27deg 72deg 2.4m"
              fieldOfView="28deg"
            />
          </div>
          <div className={styles.mediaCard}>
            <span>{selectedBook.title}</span>
            <strong>Chapter {selectedChapter}</strong>
            <p>{currentTitle}</p>
            <div className={styles.mediaProgress}><i/></div>
            <button onClick={()=>setPanel("lesson")}><Play/>Continue</button>
          </div>
          <div className={styles.keyboardModel} aria-hidden="true">
            <Model src="/3d/computerKeyboard.glb" alt="" className={styles.fullModel} orbit="15deg 54deg 2m"/>
          </div>
          <div className={styles.mouseModel} aria-hidden="true">
            <Model src="/3d/computerMouse.glb" alt="" className={styles.fullModel} orbit="-30deg 58deg 1.6m"/>
          </div>
        </aside>

        <div className={styles.rightPlant} data-plant data-reveal aria-hidden="true">
          <Model src="/3d/pottedPlant.glb" alt="" className={styles.fullModel} orbit="-22deg 72deg 2m"/>
        </div>
      </section>

      <section className={styles.deskZone}>
        <div className={styles.deskModel} aria-hidden="true" data-reveal>
          <Model
            src="/3d/desk.glb"
            alt=""
            className={styles.fullModel}
            orbit="0deg 68deg 3.4m"
            fieldOfView="22deg"
            eager
          />
        </div>

        <div className={styles.actionDock} data-reveal>
          <button className={styles.continueButton} onClick={()=>setPanel("lesson")}>
            <span><Play/></span>
            <div><strong>Continue learning</strong><small>Chapter {selectedChapter} · {currentTitle}</small></div>
            <ChevronRight/>
          </button>
          <button onClick={()=>setPanel("lesson")}><NotebookPen/><span>Start lesson</span><ChevronRight/></button>
          <button onClick={()=>setPanel("practice")}><PenLine/><span>Practice</span><ChevronRight/></button>
          <button onClick={()=>setPanel("notes")}><BookOpen/><span>My notes</span><ChevronRight/></button>
        </div>

        <aside className={styles.drinkDock} data-reveal>
          <div className={styles.drinkStage} data-drink-model>
            <Model
              src={activeDrink.src}
              alt={activeDrink.detail}
              className={styles.fullModel}
              orbit="28deg 68deg 2m"
              fieldOfView="25deg"
              interactive
              eager
            />
            {activeDrink.accessory&&<div className={styles.lemonAccessory}>
              <Model src={activeDrink.accessory} alt="Lemon" className={styles.fullModel} orbit="-28deg 72deg 1.8m"/>
            </div>}
          </div>
          <div className={styles.drinkCaption}>
            <strong>{activeDrink.label}</strong>
            <span>{activeDrink.detail}</span>
          </div>
          <div className={styles.drinkPicker}>
            {drinkModels.map(item=><button
              key={item.id}
              className={drink===item.id?styles.drinkActive:""}
              onClick={()=>chooseDrink(item.id)}
            >{item.label}</button>)}
          </div>
        </aside>
      </section>
    </section>

    {panel&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setPanel(null)}}>
      <section className={styles.panel}>
        <button className={styles.closeButton} onClick={()=>setPanel(null)} aria-label="Close"><X/></button>

        {panel==="book"&&<>
          <div className={styles.panelHeader}>
            <span style={{background:selectedBook.accent}}>{selectedBook.glyph}</span>
            <div>
              <p>Class {profile.class_level||"8"} book</p>
              <h2>{selectedBook.title}</h2>
              <small>Textbook first, then chapter-wise lessons.</small>
            </div>
          </div>

          <div className={styles.tabs}>
            <button className={bookTab==="pdf"?styles.tabActive:""} onClick={()=>setBookTab("pdf")}><FileText/>Textbook PDF</button>
            <button className={bookTab==="chapters"?styles.tabActive:""} onClick={()=>setBookTab("chapters")}><BookOpen/>Chapter lessons</button>
          </div>

          {bookTab==="pdf"?<div className={styles.pdfPanel}>
            <FileText/>
            <h3>{selectedBook.title} textbook</h3>
            <p>The PDF viewer slot is ready for the official book file. The book can be connected here without changing the desk layout.</p>
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
            <p>The chapter-wise lesson content will be uploaded here later. The desk already keeps the selected subject, chapter, notes and practice flow connected.</p>
          </div>
        </>}
      </section>
    </div>}
  </main>;
}
