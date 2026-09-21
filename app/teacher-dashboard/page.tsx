"use client";

import Link from "next/link";
import Script from "next/script";
import {useEffect,useMemo,useRef,useState} from "react";
import type {ChangeEvent,CSSProperties} from "react";
import {
  BarChart3,BookOpen,CalendarDays,ChevronLeft,ChevronRight,CircleCheck,
  Coffee,Droplets,FolderOpen,LampDesk,LogOut,NotebookPen,PencilLine,
  Plus,StickyNote,Trash2,Upload,UserRound,X
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
type QuickPanel="assignments"|"progress"|"resources"|null;
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
  {id:"bangla",name:"Bangla",short:"বাংলা",accent:"#7a3038",chapters:["সাহিত্য পরিচয়","গদ্য পাঠ","কবিতা","ব্যাকরণ","রচনা","ভাষা ও প্রয়োগ"]},
  {id:"english",name:"English",short:"English",accent:"#375576",chapters:["People and places","Nature and life","Stories we tell","Language practice","Writing","Communication"]},
  {id:"math",name:"Mathematics",short:"গণিত",accent:"#4e6a51",chapters:["Patterns","Numbers","Algebra","Geometry","Measurement","Data and probability"]},
  {id:"science",name:"Science",short:"বিজ্ঞান",accent:"#972820",chapters:["Living and non-living things","Cells and their functions","Human body systems","Food and nutrition","Matter and materials","Energy","Environment","Earth and space"]},
  {id:"social",name:"History & Social Science",short:"ইতিহাস",accent:"#a16b2d",chapters:["Our society","Bangladesh and identity","History and change","Citizenship","Economy and work","Environment and people"]},
  {id:"digital",name:"Digital Technology",short:"ডিজিটাল",accent:"#3f4e68",chapters:["Digital citizenship","Information","Devices","Networks","Creative computing","Safety and ethics"]},
  {id:"health",name:"Health Protection",short:"স্বাস্থ্য",accent:"#9b5262",chapters:["Healthy habits","Nutrition","Physical wellbeing","Mental wellbeing","Safety","Community health"]},
  {id:"life",name:"Life & Livelihood",short:"জীবন",accent:"#6a6d3f",chapters:["Knowing myself","Working together","Everyday skills","Future skills","Community","Projects"]},
  {id:"arts",name:"Arts & Culture",short:"শিল্প",accent:"#a6702b",chapters:["Visual art","Music","Performance","Craft","Culture","Creative project"]},
  {id:"religion",name:"Religion / Ethics",short:"নৈতিকতা",accent:"#58654f",chapters:["Values","Character","Community","Responsibility","Practice","Reflection"]}
];

const defaultRoutine:RoutineItem[]=[
  {id:"r1",time:"08:00",label:"Period 1 · Class 8A Science"},
  {id:"r2",time:"09:00",label:"Period 2 · Class 7 Mathematics"},
  {id:"r3",time:"10:00",label:"Break"},
  {id:"r4",time:"10:30",label:"Period 4 · Class 9 English"}
];

const drinkMeta:Record<Drink,{color:string,label:string}>={
  Coffee:{color:"#4b1f13",label:"Coffee"},
  Tea:{color:"#8b4b1d",label:"Tea"},
  Water:{color:"#a8d6df",label:"Water"},
  Lemonade:{color:"#e5c857",label:"Lemonade"}
};

function uid(){
  return Math.random().toString(36).slice(2,9);
}

function getLesson(subject:Subject,chapterIndex:number):Lesson{
  const chapter=subject.chapters[chapterIndex]||subject.chapters[0];
  if(subject.id==="science"&&chapterIndex===0){
    return {
      title:"Living and non-living things",
      goal:"Students will be able to identify the characteristics of living and non-living things and give examples from their surroundings.",
      keyPoints:["Characteristics of living things","Characteristics of non-living things","Examples from daily life in Bangladesh","How to tell the difference"],
      materials:["Pictures or real objects","Board / chart paper","Worksheet"],
      steps:[
        {title:"Warm-up",time:"10 minutes",body:"Show pictures of a tree, stone, bird and chair. Ask which are alive and why."},
        {title:"Explore",time:"25 minutes",body:"Discuss examples, observe real objects or pictures and note their characteristics."},
        {title:"Check understanding",time:"10 minutes",body:"Use quick oral or written questions and address common misconceptions."}
      ],
      notes:["Use local examples such as mango trees, rivers and fish.","Encourage all students to participate before giving the answer."]
    };
  }
  return {
    title:chapter,
    goal:`Students will understand the core ideas in ${chapter} and explain them in their own words using familiar examples.`,
    keyPoints:["Activate prior knowledge",`Explain the main idea of ${chapter}`,"Connect the idea to everyday life","Check understanding before moving on"],
    materials:["Textbook","Board or notebook","One visual or real-life example"],
    steps:[
      {title:"Warm-up",time:"8 minutes",body:"Begin with one familiar question or example to uncover prior knowledge."},
      {title:"Teach & explore",time:"25 minutes",body:"Explain the idea in short steps, invite examples and let students discuss."},
      {title:"Check",time:"12 minutes",body:"Ask students to explain the concept back, then revisit anything unclear."}
    ],
    notes:["Keep explanations short and concrete.","Use examples students already know before introducing new terminology."]
  };
}

function DecorativePlant({className=""}:{className?:string}){
  return <div className={`${styles.plant} ${className}`} aria-hidden="true">
    <div className={styles.plantLeaves}>
      {Array.from({length:14},(_,index)=><i key={index}/>)}
    </div>
    <div className={styles.plantPot}/>
  </div>;
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
  const[quickPanel,setQuickPanel]=useState<QuickPanel>(null);
  const[now,setNow]=useState<Date|null>(null);
  const[animeReady,setAnimeReady]=useState(false);
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

  function anime(target:string|Element,params:Record<string,unknown>){
    try{window.anime?.animate(target,params)}catch{}
  }

  const lesson=useMemo(()=>{
    if(!selectedSubject||selectedChapter===null)return null;
    return getLesson(selectedSubject,selectedChapter);
  },[selectedSubject,selectedChapter]);

  const calendar=useMemo(()=>{
    if(!now)return {label:"",days:[] as Array<number|null>,today:0};
    const year=now.getFullYear();
    const month=now.getMonth();
    const start=new Date(year,month,1).getDay();
    const count=new Date(year,month+1,0).getDate();
    const days:Array<number|null>=[];
    for(let i=0;i<start;i++)days.push(null);
    for(let d=1;d<=count;d++)days.push(d);
    while(days.length%7!==0)days.push(null);
    return {label:now.toLocaleDateString(undefined,{month:"long",year:"numeric"}),days,today:now.getDate()};
  },[now]);

  function openClass(value:number){
    setSelectedClass(value);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setFolderOpen(true);
    setQuickPanel(null);
    requestAnimationFrame(()=>{
      anime(`#teacher-folder-${value}`,{y:[0,-16,0],scale:[1,1.04,1],rotateY:[0,-6,0],duration:620});
      anime(`.${styles.fileDeck}`,{opacity:[0,1],y:[-26,0],scale:[.95,1],duration:520});
    });
  }

  function chooseSubject(subject:Subject){
    setSelectedSubject(subject);
    setSelectedChapter(null);
    requestAnimationFrame(()=>anime(`#subject-file-${subject.id}`,{x:[0,12,0],rotate:[0,1.5,0],duration:430}));
  }

  function chooseChapter(index:number){
    setSelectedChapter(index);
    setFolderOpen(false);
    requestAnimationFrame(()=>{
      anime(`.${styles.notebook}`,{opacity:[0,1],scale:[.9,1],rotateX:[16,0],duration:760});
      anime(`.${styles.tablet}`,{opacity:[1,0],x:[0,65],scale:[1,.92],duration:560});
    });
  }

  function toggleLamp(){
    setLampOn(value=>{
      const next=!value;
      try{localStorage.setItem("bujhi-teacher-lamp",next?"on":"off")}catch{}
      requestAnimationFrame(()=>anime(`.${styles.lampGlow}`,{opacity:next?[0,.9]:[.9,0],scale:next?[.8,1.04]:[1.04,.85],duration:620}));
      return next;
    });
  }

  function chooseDrink(value:Drink){
    setDrink(value);
    setDrinkMenu(false);
    try{localStorage.setItem("bujhi-teacher-drink",value)}catch{}
    requestAnimationFrame(()=>anime(`.${styles.liquid}`,{scale:[.82,1.12,.96,1],opacity:[.45,.95,.72,.9],duration:560}));
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
            const fallback=[row.class,row.subject].filter(Boolean).join(" ");
            return {id:uid(),time:String(row.time??""),label:String(row.label??(fallback||`Routine ${index+1}`))};
          });
        }
      }else{
        next=text.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).map(line=>{
          const [first,...rest]=line.split(",");
          return rest.length
            ?{id:uid(),time:first.trim(),label:rest.join(",").trim()}
            :{id:uid(),time:"",label:line};
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

    <section className={styles.scene} aria-label="Bujhi interactive teacher desk">
      <div className={styles.wall}/>
      <div className={styles.window}>
        <div className={styles.sky}/>
        <div className={styles.cloudOne}/>
        <div className={styles.cloudTwo}/>
        <div className={styles.outsideTree}/>
        <div className={styles.schoolShape}/>
      </div>

      <div className={styles.topRail}>
        <Link href="/" className={styles.brand}>Bujhi</Link><i/>
        <span>Teacher desk</span><i/>
        <button onClick={()=>openClass(selectedClass)}>Class {selectedClass}</button><i/>
        <span>Section A</span>
        <button className={styles.profileButton} title={teacherName}><UserRound/></button>
      </div>

      <DecorativePlant className={styles.plantTopLeft}/>
      <DecorativePlant className={styles.plantRight}/>

      <div className={styles.shelf}>
        <div className={styles.folderRow}>
          {classFolders.map((value,index)=><button
            id={`teacher-folder-${value}`}
            key={value}
            className={`${styles.folder} ${styles[`folderTone${index+1}`]} ${selectedClass===value?styles.folderActive:""}`}
            onClick={()=>openClass(value)}
            aria-label={`Open Class ${value} folder`}
          >
            <span className={styles.folderSpine}><b/></span>
            <span className={styles.folderPapers}><i/><i/><i/></span>
            <strong>Class {value}</strong>
          </button>)}
        </div>
      </div>

      <div className={styles.pin} aria-hidden="true"/>
      <button className={styles.calendarSheet} onClick={()=>setCalendarOpen(true)}>
        <strong>{calendar.label||"Calendar"}</strong>
        <div className={styles.calendarWeek}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=><span key={day}>{day}</span>)}</div>
        <div className={styles.calendarDays}>{calendar.days.map((day,index)=><span key={index} className={day===calendar.today?styles.today:""}>{day||""}</span>)}</div>
      </button>

      <button className={styles.routineSheet} onClick={()=>setRoutineOpen(true)}>
        <strong>Today</strong>
        {routine.slice(0,5).map((item,index)=><span key={item.id}><i className={index<2?styles.checked:""}/><b>{item.time||"—"}</b>{item.label}</span>)}
        <em>Edit / upload routine</em>
      </button>

      <DecorativePlant className={styles.plantCenter}/>

      <div className={styles.penCup} aria-hidden="true">
        <i/><i/><i/><i/><i/>
        <span>Good<br/>Teaching<br/>Brighter<br/>Bangladesh</span>
      </div>

      <div className={styles.stickyNote}>
        <StickyNote/>
        <textarea aria-label="Temporary teacher note" value={note} maxLength={120} onChange={event=>saveNote(event.target.value)}/>
        <small>temporary note</small>
      </div>

      <div className={styles.decorBooksRight} aria-hidden="true">
        <i/><i/><i/>
        <span>Better Lessons<br/>Brighter Futures</span>
      </div>

      <div className={styles.lamp}>
        <div className={styles.lampArm}/>
        <div className={styles.lampShade}/>
        <div className={styles.lampBulb}/>
        <div className={styles.lampGlow}/>
        <div className={styles.lampBase}/>
        <button className={styles.lampToggle} onClick={toggleLamp} aria-pressed={lampOn}>
          <LampDesk/><span>{lampOn?"ON":"OFF"}</span><i className={lampOn?styles.toggleOn:""}/>
        </button>
      </div>

      <div className={styles.desk}>
        <div className={styles.deskGrain}/>
        <div className={styles.deskEdge}/>
      </div>

      <div className={styles.leftBooks}>
        <button onClick={()=>{if(lesson){anime(`.${styles.notebook}`,{scale:[.985,1.018,1],duration:420});}else openClass(selectedClass)}} className={styles.redBook}><NotebookPen/><span>Lesson plan</span></button>
        <button onClick={()=>setQuickPanel("assignments")} className={styles.creamBook}><CircleCheck/><span>Assignments</span></button>
        <button onClick={()=>setQuickPanel("progress")} className={styles.greenBook}><BarChart3/><span>Student progress</span></button>
        <button onClick={()=>setQuickPanel("resources")} className={styles.ochreBook}><FolderOpen/><span>My resources</span></button>
      </div>

      <div className={styles.assessmentPaper} aria-hidden="true">
        <strong>Assessment checklist</strong>
        {["Living and non-living things","Cells and their functions","Human body systems","Food and nutrition","Safety in the laboratory"].map((item,index)=><span key={item}><b>{item}</b><i className={index<2?styles.assessmentDone:""}/></span>)}
      </div>

      <div className={styles.pen} aria-hidden="true"/>

      {!lesson&&<button className={styles.notebookBlank} onClick={()=>openClass(selectedClass)}>
        <div className={styles.blankLeft}>
          <span>Teacher lesson notebook</span>
          <strong>{selectedSubject?selectedSubject.name:"Open a class folder"}</strong>
          <p>{selectedSubject?"Now choose a chapter from the file drawer.":"Class → subject → chapter → lesson"}</p>
        </div>
        <div className={styles.blankRings}>{Array.from({length:8},(_,i)=><i key={i}/>)}</div>
        <div className={styles.blankRight}>
          <BookOpen/>
          <span>Choose a lesson to begin</span>
        </div>
      </button>}

      {lesson&&selectedSubject&&selectedChapter!==null&&<section className={styles.notebook}>
        <div className={styles.notebookLeft}>
          <div className={styles.notebookCrumb}>{selectedSubject.name} · Chapter {selectedChapter+1}</div>
          <h2>{lesson.title}</h2>
          <section className={styles.goalBox}><CircleCheck/><div><strong>Learning goal</strong><p>{lesson.goal}</p></div></section>
          <h3>Key points</h3>
          <ol>{lesson.keyPoints.map(point=><li key={point}>{point}</li>)}</ol>
          <h3>Materials</h3>
          <ul>{lesson.materials.map(item=><li key={item}>{item}</li>)}</ul>
        </div>
        <div className={styles.notebookBinding}>{Array.from({length:9},(_,i)=><i key={i}/>)}</div>
        <div className={styles.notebookRight}>
          <div className={styles.notebookDate}>{now?now.toLocaleDateString(undefined,{day:"numeric",month:"long",year:"numeric"}):""} · Class {selectedClass}A</div>
          <div className={styles.lessonSteps}>
            {lesson.steps.map((step,index)=><article key={step.title}>
              <span>{index+1}</span>
              <div><strong>{step.title}</strong><small>{step.time}</small><p>{step.body}</p></div>
            </article>)}
          </div>
          <section className={styles.teacherNotes}><PencilLine/><div><strong>Teacher notes</strong>{lesson.notes.map(item=><p key={item}>• {item}</p>)}</div></section>
          <div className={styles.notebookButtons}>
            <button onClick={()=>{setSelectedChapter(null);setFolderOpen(true)}}><ChevronLeft/> Chapters</button>
            <button onClick={()=>{setSelectedSubject(null);setSelectedChapter(null);setFolderOpen(true)}}>Change subject</button>
          </div>
        </div>
      </section>}

      {!lesson&&<div className={styles.tablet}>
        <div className={styles.tabletBezel}>
          <div className={styles.tabletTopbar}><span>✧</span><strong>{selectedSubject?selectedSubject.name:"Science · Chapter 1"}</strong><i/></div>
          <div className={styles.tabletTabs}><b>Content</b><span>Activities</span><span>Resources</span></div>
          <div className={styles.tabletContent}>
            <strong>Interactive activity</strong>
            <small>Classify each item as living or non-living</small>
            <div className={styles.activityCards}>
              {["🌳","🪨","🐦","🚲"].map((emoji,index)=><div key={index}><span>{emoji}</span><b>{["Tree","Stone","Bird","Bicycle"][index]}</b><i>{index%2===0?"Living":"Non-living"}</i></div>)}
            </div>
          </div>
        </div>
      </div>}

      <div className={styles.cupArea}>
        <button className={styles.cup} onClick={()=>setDrinkMenu(value=>!value)} aria-label={`Current drink: ${drink}. Change drink`}>
          <span className={styles.liquid} style={{background:drinkMeta[drink].color}}/>
          <i className={styles.cupHandle}/>
          <b className={styles.cupFlower}>✿</b>
          <small>{drink}</small>
        </button>
        {drinkMenu&&<div className={styles.drinkMenu}>
          {(Object.keys(drinkMeta) as Drink[]).map(value=><button key={value} onClick={()=>chooseDrink(value)} className={drink===value?styles.drinkActive:""}>
            {value==="Water"?<Droplets/>:<Coffee/>}<span>{value}</span>
          </button>)}
        </div>}
      </div>

      <div className={styles.smallSticky} aria-hidden="true">
        <span>☑ Plan</span><span>☑ Teach</span><span>☐ Reflect</span><span>☐ Improve</span>
      </div>

      {folderOpen&&<section className={styles.fileDeck}>
        <div className={styles.fileDeckTop}>
          <div>
            <span>Class {selectedClass} folder</span>
            <strong>{selectedSubject?"Choose a chapter":"Choose a subject file"}</strong>
          </div>
          <button onClick={()=>setFolderOpen(false)}><X/></button>
        </div>
        {!selectedSubject?<div className={styles.subjectFiles}>
          {subjects.map(subject=><button
            id={`subject-file-${subject.id}`}
            key={subject.id}
            onClick={()=>chooseSubject(subject)}
            style={{"--accent":subject.accent} as CSSProperties}
          >
            <span className={styles.fileTab}/>
            <div><strong>{subject.name}</strong><small>{subject.short}</small></div>
            <ChevronRight/>
          </button>)}
        </div>:<div className={styles.chapterView}>
          <button className={styles.backButton} onClick={()=>setSelectedSubject(null)}><ChevronLeft/> Subjects</button>
          <div className={styles.chapterFiles}>
            {selectedSubject.chapters.map((chapter,index)=><button key={chapter} onClick={()=>chooseChapter(index)}>
              <span>Chapter {index+1}</span><strong>{chapter}</strong><ChevronRight/>
            </button>)}
          </div>
        </div>}
      </section>}

      {routineOpen&&<div className={styles.modalBackdrop} onMouseDown={event=>{if(event.currentTarget===event.target)setRoutineOpen(false)}}>
        <section className={styles.modalPanel}>
          <header>
            <div><span>Teacher routine</span><h2>School schedule</h2><p>Add periods manually or upload TXT, CSV or JSON.</p></div>
            <button onClick={()=>setRoutineOpen(false)}><X/></button>
          </header>
          <div className={styles.routineEditor}>
            {routine.map(item=><div key={item.id}>
              <input value={item.time} placeholder="08:00" aria-label="Routine time" onChange={event=>changeRoutine(item.id,"time",event.target.value)}/>
              <input value={item.label} aria-label="Routine item" onChange={event=>changeRoutine(item.id,"label",event.target.value)}/>
              <button onClick={()=>removeRoutine(item.id)} aria-label="Delete routine item"><Trash2/></button>
            </div>)}
          </div>
          <footer>
            <button onClick={addRoutine}><Plus/>Add item</button>
            <button onClick={()=>fileRef.current?.click()}><Upload/>Upload routine</button>
            <input ref={fileRef} type="file" hidden accept=".txt,.csv,.json,text/plain,text/csv,application/json" onChange={uploadRoutine}/>
          </footer>
        </section>
      </div>}

      {calendarOpen&&<div className={styles.modalBackdrop} onMouseDown={event=>{if(event.currentTarget===event.target)setCalendarOpen(false)}}>
        <section className={styles.modalPanel}>
          <header><div><span>Calendar</span><h2>{calendar.label}</h2></div><button onClick={()=>setCalendarOpen(false)}><X/></button></header>
          <div className={styles.bigCalendarWeek}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=><span key={day}>{day}</span>)}</div>
          <div className={styles.bigCalendarDays}>{calendar.days.map((day,index)=><button key={index} disabled={!day} className={day===calendar.today?styles.bigToday:""}>{day||""}</button>)}</div>
        </section>
      </div>}

      {quickPanel&&<div className={styles.modalBackdrop} onMouseDown={event=>{if(event.currentTarget===event.target)setQuickPanel(null)}}>
        <section className={styles.modalPanel}>
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

      <button className={styles.logoutButton} onClick={logout}><LogOut/><span>Log out</span></button>
      <span className={styles.animationCredit} aria-hidden="true">{animeReady?"":" "}</span>
    </section>
  </main>;
}
