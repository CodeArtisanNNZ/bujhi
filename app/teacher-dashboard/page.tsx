"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {BookOpen,ChevronRight,ClipboardCheck,LogOut,NotebookPen,UsersRound} from "lucide-react";
import styles from "./teacher.module.css";

type Profile={full_name?:string;subject?:string};

export default function TeacherDashboard(){
 const[profile,setProfile]=useState<Profile>({});
 useEffect(()=>{try{const saved=localStorage.getItem("bujhi-demo-user");if(saved)setProfile(JSON.parse(saved))}catch{}},[]);
 function logout(){try{localStorage.removeItem("bujhi-demo-auth")}catch{}location.href="/"}
 const first=profile.full_name?.split(" ")[0]||"Teacher";
 return <main className={styles.page}>
  <header className={styles.header}><Link className={styles.brand} href="/"><img src="/bujhi-icon.png" alt=""/>Bujhi</Link><div><span>Teacher space</span><button onClick={logout}><LogOut/>Log out</button></div></header>
  <section className={styles.hero}><p>Teacher dashboard · frontend preview</p><h1>Welcome, {first}.</h1><span>This space will eventually help you prepare a lesson, check student understanding and adapt before moving on.</span></section>
  <section className={styles.grid}>
   <article><UsersRound/><span>My classes</span><h2>Class 8</h2><p>Open a class to see curriculum, lessons and understanding checks.</p><button>Open class <ChevronRight/></button></article>
   <article><BookOpen/><span>Curriculum</span><h2>{profile.subject||"Choose a subject"}</h2><p>Work from the NCTB curriculum and build the lesson around a specific concept.</p><button>Browse curriculum <ChevronRight/></button></article>
   <article><NotebookPen/><span>Prepare</span><h2>Lesson builder</h2><p>Objective, prior knowledge, misconceptions, explanation, activity and questions.</p><button>Start a lesson <ChevronRight/></button></article>
   <article><ClipboardCheck/><span>Check</span><h2>Understanding</h2><p>Quick checks will later show who understood, who needs another explanation and what to revisit.</p><button>Preview checks <ChevronRight/></button></article>
  </section>
  <section className={styles.note}><strong>Current scope</strong><p>The Class 8 student desk is the active prototype. Teacher workflows are intentionally a lightweight frontend shell for now.</p></section>
 </main>
}
