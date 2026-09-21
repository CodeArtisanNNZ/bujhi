"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {
  BookOpen,ChevronRight,CircleCheck,ClipboardCheck,LogOut,
  Monitor,NotebookPen,UsersRound,X
} from "lucide-react";
import styles from "./teacher.module.css";

type Profile={full_name?:string;subject?:string;role?:string};
type Panel="lesson"|"assignments"|"progress"|"resources"|"activity"|"calendar"|"tasks"|"class"|null;

const classFolders=[6,7,8,9,10] as const;

const assignments:Array<[string,string,string]>=[
  ["Living & non-living worksheet","Due today","18 / 24 submitted"],
  ["Cells and their functions","Tomorrow","11 / 24 submitted"],
  ["Human body systems","Friday","Draft"]
];

const progressItems:Array<{label:string;value:number}>=[
  {label:"Living & non-living things",value:82},
  {label:"Cells and their functions",value:74},
  {label:"Human body systems",value:61},
  {label:"Food and nutrition",value:56}
];

const activityItems:Array<{emoji:string;label:string;living:boolean}>=[
  {emoji:"🌳",label:"Tree",living:true},
  {emoji:"🪨",label:"Stone",living:false},
  {emoji:"🐦",label:"Bird",living:true},
  {emoji:"🚲",label:"Bicycle",living:false}
];

const resources:Array<[string,string]>=[
  ["Lesson slides","Presentation"],
  ["Chapter images","Visuals"],
  ["Quick questions","Assessment"],
  ["Worksheets","Printable"]
];

const panelCopy={
  lesson:{eyebrow:"Lesson plan",title:"Science · Chapter 1",subtitle:"Living and non-living things"},
  assignments:{eyebrow:"Assignments",title:"Class 8A assignments",subtitle:"Review work before your next lesson"},
  progress:{eyebrow:"Student progress",title:"Understanding overview",subtitle:"A quick view of the class"},
  resources:{eyebrow:"My resources",title:"Teaching resources",subtitle:"Keep classroom materials close to the lesson"},
  activity:{eyebrow:"Interactive activity",title:"Living or non-living?",subtitle:"Classify each item before you use it with students"},
  calendar:{eyebrow:"Calendar",title:"December 2024",subtitle:"Your teaching dates and reminders"},
  tasks:{eyebrow:"Today",title:"Teaching checklist",subtitle:"Small things to finish before class"},
  class:{eyebrow:"Class folder",title:"Class overview",subtitle:"Open a class folder from the shelf"}
} as const;

export default function TeacherDashboard(){
  const[profile,setProfile]=useState<Profile>({});
  const[selectedClass,setSelectedClass]=useState(8);
  const[selectedSection]=useState("A");
  const[panel,setPanel]=useState<Panel>(null);

  useEffect(()=>{
    try{
      const saved=localStorage.getItem("bujhi-demo-user");
      if(saved)setProfile(JSON.parse(saved) as Profile);
    }catch{}
  },[]);

  function logout(){
    try{localStorage.removeItem("bujhi-demo-auth")}catch{}
    location.href="/";
  }

  const teacherName=useMemo(()=>{
    const name=profile.full_name?.trim();
    return name||"Teacher";
  },[profile.full_name]);

  const copy=panel?panelCopy[panel]:null;

  function openClass(value:number){
    setSelectedClass(value);
    setPanel("class");
  }

  return <main className={styles.page}>
    <section className={styles.deskShell} aria-label="Bujhi teacher desk">
      <img className={styles.deskImage} src="/classroom-teacher-view.png" alt="" draggable={false}/>

      <div className={styles.liveNav} aria-label="Current teaching context">
        <Link href="/">Bujhi</Link><i/>
        <button onClick={()=>setPanel("lesson")}>Teacher desk</button><i/>
        <button onClick={()=>setPanel("class")}>Class {selectedClass}</button><i/>
        <span>Section {selectedSection}</span>
      </div>

      <button className={styles.profileSpot} onClick={()=>setPanel("class")} aria-label="Open teacher profile">
        <UsersRound/>
      </button>

      <div className={styles.folderSpots} aria-label="Class folders">
        {classFolders.map(value=><button
          key={value}
          onClick={()=>openClass(value)}
          className={selectedClass===value?styles.currentFolder:""}
          aria-label={`Open Class ${value} folder`}
        ><span>Class {value}</span></button>)}
      </div>

      <button className={`${styles.hotspot} ${styles.calendarSpot}`} onClick={()=>setPanel("calendar")} aria-label="Open calendar"><span>Calendar</span></button>
      <button className={`${styles.hotspot} ${styles.tasksSpot}`} onClick={()=>setPanel("tasks")} aria-label="Open today's checklist"><span>Today</span></button>

      <div className={styles.bookSpots} aria-label="Teacher tools">
        <button onClick={()=>setPanel("lesson")}><NotebookPen/><span>Lesson plan</span></button>
        <button onClick={()=>setPanel("assignments")}><ClipboardCheck/><span>Assignments</span></button>
        <button onClick={()=>setPanel("progress")}><UsersRound/><span>Student progress</span></button>
        <button onClick={()=>setPanel("resources")}><BookOpen/><span>My resources</span></button>
      </div>

      <button className={`${styles.hotspot} ${styles.notebookSpot}`} onClick={()=>setPanel("lesson")} aria-label="Open the lesson notebook"><span>Open lesson plan</span></button>
      <button className={`${styles.hotspot} ${styles.tabletSpot}`} onClick={()=>setPanel("activity")} aria-label="Open interactive classroom activity"><span>Open activity</span></button>

      <div className={styles.desktopHint}>Click the folders, books, notebook or tablet</div>
    </section>

    <section className={styles.mobileTray} aria-label="Teacher desk shortcuts">
      <div>
        <span>Teacher desk</span>
        <strong>Class {selectedClass} · Section {selectedSection}</strong>
      </div>
      <div className={styles.mobileClasses}>
        {classFolders.map(value=><button key={value} onClick={()=>openClass(value)} className={selectedClass===value?styles.mobileCurrent:""}>{value}</button>)}
      </div>
      <div className={styles.mobileTools}>
        <button onClick={()=>setPanel("lesson")}><NotebookPen/>Lesson plan</button>
        <button onClick={()=>setPanel("assignments")}><ClipboardCheck/>Assignments</button>
        <button onClick={()=>setPanel("progress")}><UsersRound/>Progress</button>
        <button onClick={()=>setPanel("activity")}><Monitor/>Activity</button>
      </div>
    </section>

    {panel&&copy&&<div className={styles.overlay} onMouseDown={event=>{if(event.currentTarget===event.target)setPanel(null)}}>
      <aside className={styles.drawer}>
        <div className={styles.drawerTop}>
          <div>
            <p>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <span>{copy.subtitle}</span>
          </div>
          <button onClick={()=>setPanel(null)} aria-label="Close panel"><X/></button>
        </div>

        {panel==="lesson"&&<div className={styles.lessonPanel}>
          <section className={styles.paperBlock}>
            <div className={styles.paperHeading}><BookOpen/><div><span>Science · Chapter 1</span><strong>Living and non-living things</strong></div></div>
            <h3>Learning goal</h3>
            <p>Students will be able to identify the characteristics of living and non-living things and explain the difference using familiar examples.</p>
          </section>
          <div className={styles.lessonSteps}>
            <article><span>01</span><div><strong>Warm-up</strong><p>Show pictures and ask: Which are alive? Why?</p></div></article>
            <article><span>02</span><div><strong>Explore</strong><p>Discuss examples, observe real objects and note their characteristics.</p></div></article>
            <article><span>03</span><div><strong>Check understanding</strong><p>Quick oral or written questions, then revisit common misconceptions.</p></div></article>
          </div>
          <section className={styles.teacherNote}><strong>Teacher notes</strong><p>Use local examples such as mango trees, rivers, birds and fish. Give students time to participate.</p></section>
        </div>}

        {panel==="assignments"&&<div className={styles.listPanel}>
          {assignments.map(([title,date,status])=><article key={title}><ClipboardCheck/><div><strong>{title}</strong><span>{date} · {status}</span></div><ChevronRight/></article>)}
          <button className={styles.primaryButton}>Create assignment <ChevronRight/></button>
        </div>}

        {panel==="progress"&&<div className={styles.progressPanel}>
          {progressItems.map(item=><article key={item.label}>
            <div><strong>{item.label}</strong><span>{item.value}%</span></div>
            <i><b style={{width:`${item.value}%`}}/></i>
          </article>)}
          <section className={styles.summaryCard}><UsersRound/><div><strong>Class {selectedClass}{selectedSection}</strong><span>24 students · 7 may need another explanation</span></div></section>
        </div>}

        {panel==="resources"&&<div className={styles.resourceGrid}>
          {resources.map(([title,type])=><button key={title}><BookOpen/><strong>{title}</strong><span>{type}</span></button>)}
        </div>}

        {panel==="activity"&&<div className={styles.activityPanel}>
          <p>Tap the label you would use in class.</p>
          <div className={styles.activityGrid}>
            {activityItems.map(item=><article key={item.label}>
              <span className={styles.emoji}>{item.emoji}</span>
              <strong>{item.label}</strong>
              <div><button className={item.living?styles.answerOn:""}>Living</button><button className={!item.living?styles.answerOn:""}>Non-living</button></div>
            </article>)}
          </div>
          <section className={styles.activityTip}><CircleCheck/><span>Use this as a quick understanding check after the explanation.</span></section>
        </div>}

        {panel==="calendar"&&<div className={styles.calendarPanel}>
          <div className={styles.calendarHeader}><BookOpen/><strong>December 2024</strong></div>
          <div className={styles.weekRow}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=><span key={day}>{day}</span>)}</div>
          <div className={styles.dateGrid}>{Array.from({length:31},(_,index)=>index+1).map(day=><button key={day} className={day===10?styles.todayDate:""}>{day}</button>)}</div>
        </div>}

        {panel==="tasks"&&<div className={styles.checklist}>
          {["Lesson plan","Class 8A · Science","Check assignments","Review progress","Prepare next class"].map((item,index)=><label key={item}><input type="checkbox" defaultChecked={index<2}/><span>{item}</span></label>)}
        </div>}

        {panel==="class"&&<div className={styles.classPanel}>
          <section className={styles.classHero}><div><span>Current folder</span><strong>Class {selectedClass}</strong><p>Section {selectedSection} · {profile.subject||"Science"}</p></div><UsersRound/></section>
          <div className={styles.classActions}>
            <button onClick={()=>setPanel("lesson")}><NotebookPen/><div><strong>Plan a lesson</strong><span>Open the teaching notebook</span></div><ChevronRight/></button>
            <button onClick={()=>setPanel("assignments")}><ClipboardCheck/><div><strong>Assignments</strong><span>Review and create class work</span></div><ChevronRight/></button>
            <button onClick={()=>setPanel("progress")}><UsersRound/><div><strong>Student progress</strong><span>See understanding at a glance</span></div><ChevronRight/></button>
          </div>
          <div className={styles.teacherIdentity}><UsersRound/><div><span>Signed in as</span><strong>{teacherName}</strong></div><button onClick={logout}><LogOut/>Log out</button></div>
        </div>}
      </aside>
    </div>}
  </main>;
}
