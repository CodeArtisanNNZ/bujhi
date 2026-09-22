"use client";

// Production teacher desk route

import {useEffect,useMemo,useState} from "react";
import {
  BookOpen,ChevronLeft,ChevronRight,FileText,FolderOpen,
  LogOut,NotebookPen,StickyNote,UsersRound,X
} from "lucide-react";
import styles from "./teacher.module.css";

type Profile={full_name?:string;role?:string;subject?:string};
type Drink="boba"|"tea"|"coffee"|"water"|"lemonade";
type Group="science"|"humanities"|"business";
type Subject={
  id:string;
  name:string;
  accent:string;
  marks:string;
  periods:string;
  category:string;
  options?:string[];
};

const classFolders=[
  {value:6,accent:"#566b59",count:"10 subjects"},
  {value:7,accent:"#4d6788",count:"10 subjects"},
  {value:8,accent:"#8e332f",count:"10 subjects"},
  {value:9,accent:"#a77534",count:"14 subjects"},
  {value:10,accent:"#665574",count:"14 subjects"}
];

const juniorSubjects:Subject[]=[
  {id:"bangla-1",name:"Bangla 1st Paper",accent:"#8d2d29",marks:"100",periods:"3",category:"Compulsory"},
  {id:"bangla-2",name:"Bangla 2nd Paper",accent:"#9c4a43",marks:"50",periods:"2",category:"Compulsory"},
  {id:"english-1",name:"English 1st Paper",accent:"#4d6788",marks:"100",periods:"4",category:"Compulsory"},
  {id:"english-2",name:"English 2nd Paper",accent:"#657b9a",marks:"50",periods:"2",category:"Compulsory"},
  {id:"math",name:"Mathematics",accent:"#65523e",marks:"100",periods:"5",category:"Compulsory"},
  {id:"science",name:"Science",accent:"#49634d",marks:"100",periods:"5",category:"Compulsory"},
  {id:"bgs",name:"Bangladesh & Global Studies",accent:"#52685a",marks:"100",periods:"3",category:"Compulsory"},
  {id:"ict",name:"Information & Communication Technology",accent:"#48656b",marks:"50",periods:"2",category:"Compulsory"},
  {id:"religion",name:"Religion Education",accent:"#735d49",marks:"100",periods:"3",category:"Choose one",options:["Islam Education","Hindu Religion Education","Christian Religion Education","Buddhist Religion Education"]},
  {id:"junior-elective",name:"Elective Subject",accent:"#a36e3f",marks:"50",periods:"1",category:"Choose one",options:["Arabic","Sanskrit","Pali","Physical Education & Health","Work & Life-Oriented Education","Agriculture Studies","Home Science","Arts & Crafts","Music"]}
];

const seniorCommon:Subject[]=[
  {id:"bangla-1",name:"Bangla 1st Paper",accent:"#8d2d29",marks:"100",periods:"3",category:"Common compulsory"},
  {id:"bangla-2",name:"Bangla 2nd Paper",accent:"#9c4a43",marks:"100",periods:"2",category:"Common compulsory"},
  {id:"english-1",name:"English 1st Paper",accent:"#4d6788",marks:"100",periods:"4",category:"Common compulsory"},
  {id:"english-2",name:"English 2nd Paper",accent:"#657b9a",marks:"100",periods:"2",category:"Common compulsory"},
  {id:"math",name:"Mathematics",accent:"#65523e",marks:"100",periods:"5",category:"Common compulsory"},
  {id:"religion",name:"Religion Education",accent:"#735d49",marks:"100",periods:"2",category:"Choose one",options:["Islam Education","Hindu Religion Education","Christian Religion Education","Buddhist Religion Education"]},
  {id:"ict",name:"Information & Communication Technology",accent:"#48656b",marks:"50",periods:"1",category:"Common compulsory"},
  {id:"career",name:"Career Education",accent:"#8e6d49",marks:"50",periods:"1",category:"Common compulsory"},
  {id:"physical",name:"Physical Education, Health Science & Sports",accent:"#6a775d",marks:"50",periods:"—",category:"Common compulsory"}
];

const seniorGroups:Record<Group,Subject[]>={
  science:[
    {id:"physics",name:"Physics",accent:"#536f8d",marks:"100",periods:"3",category:"Science group"},
    {id:"chemistry",name:"Chemistry",accent:"#6b5b91",marks:"100",periods:"3",category:"Science group"},
    {id:"bio-hmath",name:"Biology / Higher Mathematics",accent:"#55735a",marks:"100",periods:"3",category:"Choose one"},
    {id:"bgs",name:"Bangladesh & Global Studies",accent:"#8b7049",marks:"100",periods:"3",category:"Science group"}
  ],
  humanities:[
    {id:"history",name:"History of Bangladesh & World Civilization",accent:"#8e5c47",marks:"100",periods:"3",category:"Humanities group"},
    {id:"geography",name:"Geography & Environment",accent:"#55735a",marks:"100",periods:"3",category:"Humanities group"},
    {id:"econ-civics",name:"Economics / Civics & Citizenship",accent:"#8b7049",marks:"100",periods:"3",category:"Choose one"},
    {id:"science",name:"Science",accent:"#49634d",marks:"100",periods:"3",category:"Humanities group"}
  ],
  business:[
    {id:"entrepreneurship",name:"Business Entrepreneurship",accent:"#8d6340",marks:"100",periods:"3",category:"Business Studies group"},
    {id:"accounting",name:"Accounting",accent:"#566b59",marks:"100",periods:"3",category:"Business Studies group"},
    {id:"finance",name:"Finance & Banking",accent:"#4d6788",marks:"100",periods:"3",category:"Business Studies group"},
    {id:"science",name:"Science",accent:"#49634d",marks:"100",periods:"3",category:"Business Studies group"}
  ]
};

const seniorOptional:Subject={
  id:"fourth-subject",
  name:"Fourth / Optional Subject",
  accent:"#a36e3f",
  marks:"100",
  periods:"3",
  category:"Choose one outside group compulsory subjects",
  options:["Biology","Higher Mathematics","Geography & Environment","Agriculture Studies","Home Science","Basic Trade","Physical Education & Sports","Arabic","Sanskrit","Pali","Bangladesh & Global Studies","Economics","Civics & Citizenship","Arts & Crafts","Music"]
};

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
  const[selectedGroup,setSelectedGroup]=useState<Group>("science");
  const[folderOpen,setFolderOpen]=useState(false);
  const[lightOn,setLightOn]=useState(true);
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
    }catch{}
  },[]);

  const teacherName=profile.full_name?.trim().split(" ")[0]||"Teacher";
  const activeDrink=drinkOptions.find(item=>item.id===drink)||drinkOptions[2];
  const subjectsForClass=useMemo(()=>{
    if(selectedClass<=8)return juniorSubjects;
    return [...seniorCommon,...seniorGroups[selectedGroup],seniorOptional];
  },[selectedClass,selectedGroup]);

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
    setSelectedGroup("science");
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
      <div className={styles.deskBrand}><a href="/" aria-label="Bujhi home"><img src="/bujhi-icon.png" alt=""/><strong>Bujhi</strong></a><span>Teacher desk</span></div>

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
          <small>{folder.count} · NCTB</small>
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
        <h1>{selectedSubject?selectedSubject.name:"Plan. Teach. Help them understand."}</h1>
        <span>
          {selectedSubject
            ?`Class ${selectedClass} · ${selectedSubject.category} · ${selectedSubject.marks} marks`
            :"Open a class folder to see the current NCTB subject structure."}
        </span>
        <button type="button" onClick={()=>openClass(selectedClass)}>
          <FolderOpen size={17}/>
          {selectedSubject?"Open class folder":`Open Class ${selectedClass}`}
          <ChevronRight size={16}/>
        </button>
        <small>Class → NCTB subject structure → subject details</small>
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
          <div>
            <p>Class {selectedClass} · NCTB structure effective from 2025</p>
            <h2>{selectedSubject?selectedSubject.name:`${selectedClass<=8?"10":"14"} subject slots`}</h2>
          </div>
        </header>

        {selectedClass>=9&&!selectedSubject&&<div className={styles.groupTabs}>
          <button className={selectedGroup==="science"?styles.groupActive:""} onClick={()=>setSelectedGroup("science")}>Science</button>
          <button className={selectedGroup==="humanities"?styles.groupActive:""} onClick={()=>setSelectedGroup("humanities")}>Humanities</button>
          <button className={selectedGroup==="business"?styles.groupActive:""} onClick={()=>setSelectedGroup("business")}>Business Studies</button>
        </div>}

        {!selectedSubject?<div className={styles.subjectGrid}>
          {subjectsForClass.map(subject=><button key={subject.id} onClick={()=>setSelectedSubject(subject)} style={{"--accent":subject.accent} as React.CSSProperties}>
            <span className={styles.subjectTab}/>
            <FileText/>
            <span>
              <strong>{subject.name}</strong>
              <small className={styles.subjectMeta}>{subject.category} · {subject.marks} marks · {subject.periods} period{subject.periods==="1"?"":"s"}/week</small>
            </span>
            <ChevronRight/>
          </button>)}
        </div>:<>
          <button className={styles.backButton} onClick={()=>setSelectedSubject(null)}><ChevronLeft/> Subjects</button>
          <div className={styles.subjectDetail}>
            <div className={styles.detailAccent} style={{background:selectedSubject.accent}}/>
            <p>{selectedSubject.category}</p>
            <h3>{selectedSubject.name}</h3>
            <div className={styles.detailStats}>
              <span><b>{selectedSubject.marks}</b> marks</span>
              <span><b>{selectedSubject.periods}</b> weekly periods</span>
              <span><b>Class {selectedClass}</b></span>
            </div>
            {selectedSubject.options&&<div className={styles.choiceList}>
              <strong>NCTB choices</strong>
              <div>{selectedSubject.options.map(option=><span key={option}>{option}</span>)}</div>
            </div>}
            <button className={styles.keepSubject} onClick={()=>setFolderOpen(false)}>Keep this subject on my desk</button>
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
