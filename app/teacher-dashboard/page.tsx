"use client";

import {useEffect,useMemo,useState} from "react";
import {
  BookOpen,ChevronLeft,ChevronRight,FileText,FolderOpen,
  LogOut,NotebookPen,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "./teacher.module.css";

type Profile={full_name?:string;role?:string;subject?:string};
type Drink="boba"|"tea"|"coffee"|"water"|"lemonade";
type Subject={id:string;name:string;accent:string;chapters:string[]};

const classFolders=[
  {value:6,accent:"#566b59"},
  {value:7,accent:"#4d6788"},
  {value:8,accent:"#8e332f"},
  {value:9,accent:"#a77534"},
  {value:10,accent:"#665574"}
];

const subjects:Subject[]=[
  {id:"bangla",name:"Bangla",accent:"#8d2d29",chapters:["Literature","Grammar","Writing","Language practice","Reading","Revision"]},
  {id:"english",name:"English",accent:"#98453f",chapters:["People and places","Nature and life","Stories we tell","Language practice","Writing","Communication"]},
  {id:"math",name:"Mathematics",accent:"#65523e",chapters:["Numbers","Algebra","Geometry","Measurement","Data","Probability"]},
  {id:"science",name:"Science",accent:"#49634d",chapters:["Living things","Cells","Human body systems","Food and nutrition","Matter and energy","Earth and space"]},
  {id:"social",name:"Bangladesh & Global Studies",accent:"#52685a",chapters:["Society","Bangladesh","History","Citizenship","Economy","Environment"]},
  {id:"ict",name:"ICT",accent:"#48656b",chapters:["Digital citizenship","Information","Devices","Networks","Creative computing","Safety"]},
  {id:"religion",name:"Religion / Ethics",accent:"#735d49",chapters:["Values","Character","Community","Responsibility","Practice","Reflection"]},
  {id:"arts",name:"Arts & Culture",accent:"#a36e3f",chapters:["Visual art","Music","Performance","Craft","Culture","Creative project"]}
];

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
  const[selectedSubject,setSelectedSubject]=useState<Subject|null>(null);
  const[selectedChapter,setSelectedChapter]=useState<number|null>(null);
  const[folderOpen,setFolderOpen]=useState(false);
  const[lightOn,setLightOn]=useState(true);
  const[drink,setDrink]=useState<Drink>("coffee");
  const[drinkOpen,setDrinkOpen]=useState(false);
  const[note,setNote]=useState("");
  const[noteOpen,setNoteOpen]=useState(false);

  useEffect(()=>{
    try{
      const saved=localStorage.getItem("bujhi-demo-user");
      if(saved){
        const data=JSON.parse(saved) as Profile;
        if(data.role==="teacher")setProfile(data);
      }
      const savedNote=localStorage.getItem("bujhi-teacher-note");
      if(savedNote)setNote(savedNote);
      const savedDrink=localStorage.getItem("bujhi-teacher-drink") as Drink|null;
      if(savedDrink&&drinkOptions.some(item=>item.id===savedDrink))setDrink(savedDrink);
    }catch{}
  },[]);

  const teacherName=profile.full_name?.trim().split(" ")[0]||"Teacher";
  const activeDrink=drinkOptions.find(item=>item.id===drink)||drinkOptions[2];
  const chapterTitle=useMemo(()=>{
    if(!selectedSubject||selectedChapter===null)return "";
    return selectedSubject.chapters[selectedChapter]||"";
  },[selectedSubject,selectedChapter]);

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
    setSelectedSubject(null);
    setSelectedChapter(null);
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
      <div className={styles.deskBrand}><a href="/">বুঝি</a><span>Teacher desk</span></div>

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
          <small>Teaching folder</small>
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
      >
        <span className={styles.roomLightDot}/>
        <span>{lightOn?"Room light on":"Room light off"}</span>
      </button>

      <div className={styles.moneyPlant} aria-hidden="true">
        <img src="/29e8b631-9c79-4996-b225-405227aa1153.png" alt="" draggable={false}/>
      </div>

      <div className={styles.teacherNotebook}>
        <div className={styles.notebookBinding}/>
        <p>Teacher lesson desk</p>
        <h1>{selectedSubject&&selectedChapter!==null?chapterTitle:"Plan. Teach. Help them understand."}</h1>
        <span>
          {selectedSubject&&selectedChapter!==null
            ?`Class ${selectedClass} · ${selectedSubject.name} · Chapter ${selectedChapter+1}`
            :"Open a class folder from the shelf to begin."}
        </span>
        <button type="button" onClick={()=>openClass(selectedClass)}>
          <FolderOpen size={17}/>
          {selectedSubject?"Open class folder":`Open Class ${selectedClass}`}
          <ChevronRight size={16}/>
        </button>
        <small>Class → subject → chapter → lesson</small>
      </div>

      <button type="button" className={styles.stickyHotspot} onClick={()=>setNoteOpen(true)}>
        <StickyNote size={18}/>
        <strong>Teacher note</strong>
        <span>{note||"Write a reminder for yourself…"}</span>
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
          <div><p>Class {selectedClass} folder</p><h2>{selectedSubject?"Choose a chapter":"Choose a subject"}</h2></div>
        </header>

        {!selectedSubject?<div className={styles.subjectGrid}>
          {subjects.map(subject=><button key={subject.id} onClick={()=>setSelectedSubject(subject)} style={{"--accent":subject.accent} as React.CSSProperties}>
            <span className={styles.subjectTab}/>
            <FileText/>
            <strong>{subject.name}</strong>
            <ChevronRight/>
          </button>)}
        </div>:<>
          <button className={styles.backButton} onClick={()=>{setSelectedSubject(null);setSelectedChapter(null)}}><ChevronLeft/> Subjects</button>
          <div className={styles.chapterGrid}>
            {selectedSubject.chapters.map((chapter,index)=><button key={chapter} onClick={()=>{setSelectedChapter(index);setFolderOpen(false)}}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <div><strong>Chapter {index+1}</strong><small>{chapter}</small></div>
              <ChevronRight/>
            </button>)}
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
