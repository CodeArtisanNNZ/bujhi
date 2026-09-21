"use client";

import Link from "next/link";
import Script from "next/script";
import {useEffect,useMemo,useRef,useState} from "react";
import type {ChangeEvent,CSSProperties} from "react";
import {
  BookOpen,ChevronLeft,ChevronRight,CircleCheck,Coffee,
  Droplets,FolderOpen,LampDesk,LogOut,NotebookPen,PencilLine,Plus,
  Power,StickyNote,Trash2,Upload,UserRound,X
} from "lucide-react";
import styles from "./teacher.module.css";

declare global {
  interface Window {
    anime?: {
      animate:(targets:string|Element|Element[],params:Record<string,unknown>)=>unknown;
    };
  }
}

type Profile={full_name?:string;subject?:string;role?:string};
type Drink="Coffee"|"Tea"|"Water"|"Lemonade";
type RoutineItem={id:string;time:string;label:string};
type Subject={
  id:string;
  name:string;
  short:string;
  accent:string;
  chapters:string[];
};
type Lesson={
  title:string;
  goal:string;
  keyPoints:string[];
  materials:string[];
  steps:{title:string;time:string;body:string}[];
  notes:string[];
};

const classFolders=[6,7,8,9,10] as const;

const subjects:Subject[]=[
  {id:"bangla",name:"Bangla",short:"বাংলা",accent:"#7b2530",chapters:["সাহিত্য পরিচয়","গদ্য পাঠ","কবিতা","ব্যাকরণ","রচনা","ভাষা ও প্রয়োগ"]},
  {id:"english",name:"English",short:"English",accent:"#31506f",chapters:["People and places","Nature and life","Stories we tell","Language practice","Writing","Communication"]},
  {id:"math",name:"Mathematics",short:"গণিত",accent:"#49664e",chapters:["Patterns","Numbers","Algebra","Geometry","Measurement","Data and probability"]},
  {id:"science",name:"Science",short:"বিজ্ঞান",accent:"#8c211b",chapters:["Living and non-living things","Cells and their functions","Human body systems","Food and nutrition","Matter and materials","Energy","Environment","Earth and space"]},
  {id:"social",name:"History & Social Science",short:"ইতিহাস",accent:"#a06a2e",chapters:["Our society","Bangladesh and identity","History and change","Citizenship","Economy and work","Environment and people"]},
  {id:"digital",name:"Digital Technology",short:"ডিজিটাল",accent:"#33445d",chapters:["Digital citizenship","Information","Devices","Networks","Creative computing","Safety and ethics"]},
  {id:"health",name:"Health Protection",short:"স্বাস্থ্য",accent:"#a04b5f",chapters:["Healthy habits","Nutrition","Physical wellbeing","Mental wellbeing","Safety","Community health"]},
  {id:"life",name:"Life & Livelihood",short:"জীবন",accent:"#6a6a39",chapters:["Knowing myself","Working together","Everyday skills","Future skills","Community","Projects"]},
  {id:"arts",name:"Arts & Culture",short:"শিল্প",accent:"#a66d22",chapters:["Visual art","Music","Performance","Craft","Culture","Creative project"]},
  {id:"religion",name:"Religion / Ethics",short:"নৈতিকতা",accent:"#4d604d",chapters:["Values","Character","Community","Responsibility","Practice","Reflection"]}
];

const defaultRoutine:RoutineItem[]=[
  {id:"r1",time:"08:00",label:"Period 1 · Class 8A Science"},
  {id:"r2",time:"09:00",label:"Period 2 · Class 7 Mathematics"},
  {id:"r3",time:"10:00",label:"Break"},
  {id:"r4",time:"10:30",label:"Period 4 · Class 9 English"}
];

const drinkMeta:Record<Drink,{color:string,label:string}>={
  Coffee:{color:"#5a2413",label:"Coffee"},
  Tea:{color:"#8f4d19",label:"Tea"},
  Water:{color:"#9bcbd7",label:"Water"},
  Lemonade:{color:"#e6c85a",label:"Lemonade"}
};

function getLesson(subject:Subject,chapterIndex:number):Lesson{
  const chapter=subject.chapters[chapterIndex]||subject.chapters[0];
  if(subject.id==="science"&&chapterIndex===0){
    return {
      title:"Living and non-living things",
      goal:"Students will identify characteristics of living and non-living things and explain the difference using familiar examples.",
      keyPoints:["Characteristics of living things","Characteristics of non-living things","Examples from daily life in Bangladesh","How to explain the difference"],
      materials:["Pictures or real objects","Board / chart paper","Worksheet"],
      steps:[
        {title:"Warm-up",time:"10 min",body:"Show a tree, stone, bird and chair. Ask: Which are alive? Why?"},
        {title:"Explore",time:"25 min",body:"Discuss examples, observe real objects or pictures, then record their characteristics."},
        {title:"Check understanding",time:"10 min",body:"Use quick oral or written questions and address common misconceptions."}
      ],
      notes:["Use local examples such as mango trees, rivers and fish.","Encourage all students to participate before giving the answer."]
    };
  }
  return {
    title:chapter,
    goal:`Students will understand the core ideas in ${chapter} and explain them in their own words using examples.`,
    keyPoints:["Activate prior knowledge",`Explain the main idea of ${chapter}`,"Connect the idea to everyday life","Check understanding before moving on"],
    materials:["Textbook","Board / notebook","One visual or real-life example"],
    steps:[
      {title:"Warm-up",time:"8 min",body:"Begin with one familiar question or example to uncover prior knowledge."},
      {title:"Teach & explore",time:"25 min",body:"Explain the idea in short steps, invite examples and let students discuss."},
      {title:"Check",time:"12 min",body:"Ask students to explain the concept back, then revisit anything unclear."}
    ],
    notes:["Keep explanations short and concrete.","Use examples students already know before introducing new terminology."]
  };
}

function uid(){
  return Math.random().toString(36).slice(2,9);
}

export default function TeacherDashboard(){
  const[profile,setProfile]=useState<Profile>({});
  const[selectedClass,setSelectedClass]=useState<number>(8);
  const[selectedSubject,setSelectedSubject]=useState<Subject|null>(null);
  const[selectedChapter,setSelectedChapter]=useState<number|null>(null);
  const[folderOpen,setFolderOpen]=useState(false);
  const[lampOn,setLampOn]=useState(true);
  const[drink,setDrink]=useState<Drink>("Coffee");
  const[drinkMenu,setDrinkMenu]=useState(false);
  const[note,setNote]=useState("Same curious minds\nA brighter tomorrow");
  const[routine,setRoutine]=useState<RoutineItem[]>(defaultRoutine);
  const[routineOpen,setRoutineOpen]=useState(false);
  const[calendarOpen,setCalendarOpen]=useState(false);
  const[quickPanel,setQuickPanel]=useState<"assignments"|"progress"|"resources"|null>(null);
  const[animeReady,setAnimeReady]=useState(false);
  const[now,setNow]=useState<Date|null>(null);
  const fileRef=useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setNow(new Date());
    try{
      const saved=localStorage.getItem("bujhi-demo-user");
      if(saved)setProfile(JSON.parse(saved) as Profile);
      const savedRoutine=localStorage.getItem("bujhi-teacher-routine");
      if(savedRoutine)setRoutine(JSON.parse(savedRoutine) as RoutineItem[]);
      const savedNote=localStorage.getItem("bujhi-teacher-note");
      if(savedNote!==null)setNote(savedNote);
      const savedDrink=localStorage.getItem("bujhi-teacher-drink") as Drink|null;
      if(savedDrink&&drinkMeta[savedDrink])setDrink(savedDrink);
      const savedLamp=localStorage.getItem("bujhi-teacher-lamp");
      if(savedLamp!==null)setLampOn(savedLamp==="on");
    }catch{}
  },[]);

  function anime(selector:string,params:Record<string,unknown>){
    try{window.anime?.animate(selector,params)}catch{}
  }

  useEffect(()=>{
    if(!animeReady)return;
    anime(`.${styles.glassPanel}`,{opacity:[0,1],scale:[.96,1],duration:420});
  },[animeReady,folderOpen,routineOpen,calendarOpen,quickPanel]);

  useEffect(()=>{
    if(!animeReady)return;
    anime(`.${styles.cupRipple}`,{scale:[.82,1.15,.9,1],opacity:[.4,.9,.55,.85],duration:560});
  },[drink,animeReady]);

  const lesson=useMemo(()=>{
    if(!selectedSubject||selectedChapter===null)return null;
    return getLesson(selectedSubject,selectedChapter);
  },[selectedSubject,selectedChapter]);

  const calendar=useMemo(()=>{
    if(!now)return {label:"",days:[] as Array<number|null>,today:0};
    const year=now.getFullYear(),month=now.getMonth();
    const first=new Date(year,month,1).getDay();
    const total=new Date(year,month+1,0).getDate();
    const days:Array<number|null>=[];
    for(let i=0;i<first;i++)days.push(null);
    for(let d=1;d<=total;d++)days.push(d);
    while(days.length%7!==0)days.push(null);
    return {label:now.toLocaleDateString(undefined,{month:"long",year:"numeric"}),days,today:now.getDate()};
  },[now]);

  const currentChapter=selectedSubject&&selectedChapter!==null?selectedSubject.chapters[selectedChapter]:null;

  function openClass(value:number){
    setSelectedClass(value);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setFolderOpen(true);
    setQuickPanel(null);
    requestAnimationFrame(()=>anime(`#class-folder-${value}`,{y:[0,-14,0],scale:[1,1.035,1],duration:520}));
  }

  function chooseSubject(subject:Subject){
    setSelectedSubject(subject);
    setSelectedChapter(null);
    requestAnimationFrame(()=>anime(`#subject-${subject.id}`,{x:[0,8,0],rotate:[0,1.5,0],duration:420}));
  }

  function chooseChapter(index:number){
    setSelectedChapter(index);
    setFolderOpen(false);
    setQuickPanel(null);
    requestAnimationFrame(()=>{
      anime(`.${styles.notebookLive}`,{opacity:[0,1],scale:[.92,1],rotateX:[10,0],duration:720});
      anime(`.${styles.tabletArea}`,{opacity:[1,.12],scale:[1,.96],duration:540});
    });
  }

  function toggleLamp(){
    setLampOn(value=>{
      const next=!value;
      try{localStorage.setItem("bujhi-teacher-lamp",next?"on":"off")}catch{}
      requestAnimationFrame(()=>anime(`.${styles.lampGlow}`,{opacity:next?[0,.75]:[.75,0],scale:next?[.85,1.05]:[1.05,.88],duration:620}));
      return next;
    });
  }

  function chooseDrink(value:Drink){
    setDrink(value);
    setDrinkMenu(false);
    try{localStorage.setItem("bujhi-teacher-drink",value)}catch{}
  }

  function saveNote(value:string){
    setNote(value);
    try{localStorage.setItem("bujhi-teacher-note",value)}catch{}
  }

  function persistRoutine(next:RoutineItem[]){
    setRoutine(next);
    try{localStorage.setItem("bujhi-teacher-routine",JSON.stringify(next))}catch{}
  }

  function changeRoutine(id:string,key:"time"|"label",value:string){
    persistRoutine(routine.map(item=>item.id===id?{...item,[key]:value}:item));
  }

  function addRoutine(){
    persistRoutine([...routine,{id:uid(),time:"",label:"New class / task"}]);
  }

  function removeRoutine(id:string){
    persistRoutine(routine.filter(item=>item.id!==id));
  }

  async function uploadRoutine(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];
    if(!file)return;
    try{
      const text=await file.text();
      let next:RoutineItem[]=[];
      if(file.name.toLowerCase().endsWith(".json")){
        const parsed=JSON.parse(text) as unknown;
        if(Array.isArray(parsed)){
          next=parsed.map((item,index)=>{
            if(typeof item==="string")return {id:uid(),time:"",label:item};
            const row=item as {time?:unknown;label?:unknown;class?:unknown;subject?:unknown};
            const fallback=[row.class,row.subject].filter(Boolean).join(" ");\n            const label=String(row.label??(fallback||`Routine ${index+1}`));
            return {id:uid(),time:String(row.time??""),label};
          });
        }
      }else{
        next=text.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).map((line,index)=>{
          const [first,...rest]=line.split(",");
          if(rest.length)return {id:uid(),time:first.trim(),label:rest.join(",").trim()};
          return {id:uid(),time:"",label:line||`Routine ${index+1}`};
        });
      }
      if(next.length)persistRoutine(next);
    }catch{}
    event.target.value="";
  }

  function logout(){
    try{localStorage.removeItem("bujhi-demo-auth")}catch{}
    location.href="/";
  }

  const teacherName=profile.full_name?.trim()||"Teacher";

  return <main className={`${styles.page} ${lampOn?styles.lightOn:styles.lightOff}`}>
    <Script
      src="https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.umd.min.js"
      strategy="afterInteractive"
      onLoad={()=>setAnimeReady(true)}
    />

    <section className={styles.scene} aria-label="Interactive Bujhi teacher desk">
      <img className={styles.deskImage} src="/classroom-teacher-view.png" alt="Warm wooden teacher desk with class folders, notebook, calendar, tablet, lamp, plants and cup" draggable={false}/>
      <div className={styles.lightMood}/>
      <div className={styles.lampGlow}/>

      <nav className={styles.topNav}>
        <Link href="/">Bujhi</Link><i/>
        <span>Teacher desk</span><i/>
        <button onClick={()=>openClass(selectedClass)}>Class {selectedClass}</button><i/>
        <span>Section A</span>
        <button className={styles.profileButton} title={teacherName}><UserRound/></button>
      </nav>

      <div className={styles.folderLayer} aria-label="Class folders">
        {classFolders.map(value=><button
          id={`class-folder-${value}`}
          key={value}
          aria-label={`Open Class ${value}`}
          className={`${styles.classFolder} ${selectedClass===value?styles.folderSelected:""}`}
          onClick={()=>openClass(value)}
        ><span>Class {value}</span><b/></button>)}
      </div>

      <button className={styles.calendarPaper} onClick={()=>setCalendarOpen(true)} aria-label="Open calendar">
        <strong>{calendar.label||"Calendar"}</strong>
        <div className={styles.miniWeek}>{["S","M","T","W","T","F","S"].map((d,i)=><span key={i}>{d}</span>)}</div>
        <div className={styles.miniDates}>
          {calendar.days.slice(0,35).map((day,index)=><span key={index} className={day===calendar.today?styles.miniToday:""}>{day||""}</span>)}
        </div>
      </button>

      <button className={styles.routinePaper} onClick={()=>setRoutineOpen(true)} aria-label="Edit teacher routine">
        <small>Today · routine</small>
        {routine.slice(0,4).map(item=><span key={item.id}><b>{item.time||"—"}</b>{item.label}</span>)}
        <em>Edit / upload</em>
      </button>

      <div className={styles.stickyWrap}>
        <StickyNote/>
        <textarea
          aria-label="Temporary teacher note"
          value={note}
          maxLength={120}
          onChange={event=>saveNote(event.target.value)}
          spellCheck
        />
        <small>temporary note</small>
      </div>

      <button className={styles.lampSwitch} onClick={toggleLamp} aria-pressed={lampOn}>
        <span><LampDesk/></span>
        <b>{lampOn?"ON":"OFF"}</b>
        <i className={lampOn?styles.switchOn:""}/>
      </button>

      <div className={styles.bookShortcuts} aria-label="Desk book shortcuts">
        <button onClick={()=>{setQuickPanel(null);if(lesson)anime(`.${styles.notebookLive}`,{scale:[.98,1.015,1],duration:420});else openClass(selectedClass)}}><NotebookPen/><span>Lesson plan</span></button>
        <button onClick={()=>setQuickPanel("assignments")}><CircleCheck/><span>Assignments</span></button>
        <button onClick={()=>setQuickPanel("progress")}><UserRound/><span>Student progress</span></button>
        <button onClick={()=>setQuickPanel("resources")}><FolderOpen/><span>My resources</span></button>
      </div>

      {!lesson&&<button className={styles.notebookPrompt} onClick={()=>openClass(selectedClass)}>
        <BookOpen/>
        <span>{selectedSubject?"Choose a chapter from the folder":"Open a class folder to prepare a lesson"}</span>
      </button>}

      {lesson&&selectedSubject&&selectedChapter!==null&&<section className={styles.notebookLive} aria-label="Open lesson notebook">
        <div className={styles.pageLeft}>
          <div className={styles.notebookCrumb}>Class {selectedClass} · {selectedSubject.name}</div>
          <h2>{lesson.title}</h2>
          <p className={styles.chapterName}>Chapter {selectedChapter+1}</p>
          <section className={styles.goalBox}><CircleCheck/><div><strong>Learning goal</strong><p>{lesson.goal}</p></div></section>
          <h3>Key points</h3>
          <ol>{lesson.keyPoints.map(point=><li key={point}>{point}</li>)}</ol>
          <h3>Materials</h3>
          <ul>{lesson.materials.map(item=><li key={item}>{item}</li>)}</ul>
        </div>
        <div className={styles.rings} aria-hidden="true">{Array.from({length:9},(_,i)=><i key={i}/>)}</div>
        <div className={styles.pageRight}>
          <div className={styles.pageDate}>{now?now.toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"}):""} · Class {selectedClass}A</div>
          <div className={styles.lessonSteps}>
            {lesson.steps.map((step,index)=><article key={step.title}>
              <span>{index+1}</span><div><strong>{step.title}</strong><small>{step.time}</small><p>{step.body}</p></div>
            </article>)}
          </div>
          <section className={styles.teacherNotes}><PencilLine/><div><strong>Teacher notes</strong>{lesson.notes.map(item=><p key={item}>• {item}</p>)}</div></section>
          <div className={styles.notebookActions}>
            <button onClick={()=>{setSelectedChapter(null);setFolderOpen(true)}}><ChevronLeft/> Chapters</button>
            <button onClick={()=>{setSelectedSubject(null);setSelectedChapter(null);setFolderOpen(true)}}>Change subject</button>
          </div>
        </div>
      </section>}

      <div className={`${styles.tabletArea} ${lesson?styles.tabletHidden:""}`}>
        {!lesson&&<>
          <span className={styles.tabletTop}>Bujhi · lesson finder</span>
          <strong>{selectedSubject?selectedSubject.name:"Choose a class folder"}</strong>
          <p>{selectedSubject?"Pick a chapter and the notebook will become your teaching space.":"Class → subject → chapter → notebook"}</p>
          <button onClick={()=>openClass(selectedClass)}>Open Class {selectedClass} <ChevronRight/></button>
        </>}
        {lesson&&<span className={styles.tabletGone}>Notebook in focus</span>}
      </div>

      <div className={styles.cupControl}>
        <button className={styles.cupHit} onClick={()=>setDrinkMenu(value=>!value)} aria-label={`Current drink: ${drink}. Change drink`}>
          <span className={styles.cupRipple} style={{background:drinkMeta[drink].color}}/>
          <small>{drink}</small>
        </button>
        {drinkMenu&&<div className={`${styles.drinkMenu} ${styles.glassPanel}`}>
          {(Object.keys(drinkMeta) as Drink[]).map(value=><button key={value} onClick={()=>chooseDrink(value)} className={drink===value?styles.drinkActive:""}>
            {value==="Water"?<Droplets/>:<Coffee/>}<span>{value}</span>
          </button>)}
        </div>}
      </div>

      {folderOpen&&<section className={`${styles.subjectTray} ${styles.glassPanel}`}>
        <div className={styles.trayHeader}>
          <div><span>Class {selectedClass} folder</span><strong>{selectedSubject?"Choose a chapter":"Choose a subject file"}</strong></div>
          <button onClick={()=>setFolderOpen(false)}><X/></button>
        </div>
        {!selectedSubject?<div className={styles.subjectFiles}>
          {subjects.map(subject=><button id={`subject-${subject.id}`} key={subject.id} onClick={()=>chooseSubject(subject)} style={{"--accent":subject.accent} as CSSProperties}>
            <i/><div><strong>{subject.name}</strong><span>{subject.short}</span></div><ChevronRight/>
          </button>)}
        </div>:<div className={styles.chapterFiles}>
          <button className={styles.backSubject} onClick={()=>setSelectedSubject(null)}><ChevronLeft/> Subjects</button>
          <div className={styles.chapterGrid}>
            {selectedSubject.chapters.map((chapter,index)=><button key={chapter} onClick={()=>chooseChapter(index)}>
              <span>Chapter {index+1}</span><strong>{chapter}</strong><ChevronRight/>
            </button>)}
          </div>
        </div>}
      </section>}

      {routineOpen&&<div className={styles.centerOverlay} onMouseDown={event=>{if(event.currentTarget===event.target)setRoutineOpen(false)}}>
        <section className={`${styles.editorPanel} ${styles.glassPanel}`}>
          <header><div><span>Teacher routine</span><h2>School schedule</h2><p>Add periods manually or upload TXT, CSV or JSON.</p></div><button onClick={()=>setRoutineOpen(false)}><X/></button></header>
          <div className={styles.routineEditor}>
            {routine.map(item=><div key={item.id}>
              <input aria-label="Routine time" value={item.time} placeholder="08:00" onChange={event=>changeRoutine(item.id,"time",event.target.value)}/>
              <input aria-label="Routine item" value={item.label} onChange={event=>changeRoutine(item.id,"label",event.target.value)}/>
              <button onClick={()=>removeRoutine(item.id)} aria-label="Delete routine item"><Trash2/></button>
            </div>)}
          </div>
          <footer>
            <button onClick={addRoutine}><Plus/>Add item</button>
            <button onClick={()=>fileRef.current?.click()}><Upload/>Upload routine</button>
            <input ref={fileRef} type="file" accept=".txt,.csv,.json,text/plain,text/csv,application/json" onChange={uploadRoutine} hidden/>
          </footer>
        </section>
      </div>}

      {calendarOpen&&<div className={styles.centerOverlay} onMouseDown={event=>{if(event.currentTarget===event.target)setCalendarOpen(false)}}>
        <section className={`${styles.calendarModal} ${styles.glassPanel}`}>
          <header><div><span>Calendar</span><h2>{calendar.label}</h2></div><button onClick={()=>setCalendarOpen(false)}><X/></button></header>
          <div className={styles.fullWeek}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=><span key={day}>{day}</span>)}</div>
          <div className={styles.fullDates}>{calendar.days.map((day,index)=><button key={index} disabled={!day} className={day===calendar.today?styles.fullToday:""}>{day||""}</button>)}</div>
        </section>
      </div>}

      {quickPanel&&<div className={styles.centerOverlay} onMouseDown={event=>{if(event.currentTarget===event.target)setQuickPanel(null)}}>
        <section className={`${styles.quickPanel} ${styles.glassPanel}`}>
          <header><div><span>Desk book</span><h2>{quickPanel==="assignments"?"Assignments":quickPanel==="progress"?"Student progress":"My resources"}</h2></div><button onClick={()=>setQuickPanel(null)}><X/></button></header>
          {quickPanel==="assignments"&&<div className={styles.quickList}>
            {["Living & non-living worksheet · 18/24 submitted","Cells and their functions · due tomorrow","Human body systems · draft"].map(item=><button key={item}><CircleCheck/><span>{item}</span><ChevronRight/></button>)}
          </div>}
          {quickPanel==="progress"&&<div className={styles.progressList}>
            {[["Living & non-living things",82],["Cells and their functions",74],["Human body systems",61]].map(([label,value])=><div key={String(label)}><span><strong>{label}</strong><b>{value}%</b></span><i><em style={{width:`${value}%`}}/></i></div>)}
          </div>}
          {quickPanel==="resources"&&<div className={styles.resourceList}>
            {["Lesson slides","Chapter images","Quick questions","Worksheets"].map(item=><button key={item}><FolderOpen/><span>{item}</span></button>)}
          </div>}
        </section>
      </div>}

      <div className={styles.mobileDock}>
        <button onClick={toggleLamp}><Power/><span>{lampOn?"Lamp on":"Lamp off"}</span></button>
        <button onClick={()=>openClass(selectedClass)}><FolderOpen/><span>Classes</span></button>
        <button onClick={()=>setRoutineOpen(true)}><NotebookPen/><span>Routine</span></button>
        <button onClick={()=>setDrinkMenu(value=>!value)}><Coffee/><span>{drink}</span></button>
      </div>

      <button className={styles.logoutButton} onClick={logout}><LogOut/><span>Log out</span></button>
    </section>
  </main>;
}
