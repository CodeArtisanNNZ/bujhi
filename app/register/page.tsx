"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ArrowLeft,ArrowRight,GraduationCap,School,UsersRound} from "lucide-react";
import {useEffect,useState} from "react";

const seats=["Front left","Front centre","Front right","Middle left","Middle centre","Middle right","Back left","Back centre","Back right","Window seat","Aisle seat","Book-corner seat"];
export default function Register(){
 const router=useRouter();const[view,setView]=useState<"student"|"teacher">("student");const[ready,setReady]=useState(false);
 useEffect(()=>{const q=new URLSearchParams(location.search);if(q.get("role")==="teacher")setView("teacher");setReady(true)},[]);
 function turn(direction:"left"|"right"){setReady(false);setTimeout(()=>{setView(v=>v==="student"?"teacher":"student");setReady(true)},180)}
 return <main className="classroom-page"><header className="classroom-header"><Link className="brand" href="/"><img src="/bujhi-icon.png" alt=""/>Bujhi</Link><div><span>{view==="student"?"Student view":"Teacher view"}</span><Link href="/login">Already joined? Log in</Link></div></header>
  <section className="classroom-intro"><p className="eyebrow">Choose how you enter</p><h1>{view==="student"?"Find your place in the classroom.":"Teacher"}</h1><p>{view==="student"?"Tap any student to choose a seat and create a student account.":"Sign in to open your teacher desk."}</p></section>
  <section className={`classroom-stage ${ready?"ready":"turning"}`}>
   <img src={view==="student"?"/classroom-student-view.png":"/classroom-teacher-view.png"} alt={view==="student"?"Classroom seen from the students' side":"Classroom seen from the teacher's side"}/>
   {view==="student"?<div className="seat-grid">{seats.map((seat,i)=><button key={seat} onClick={()=>router.push(`/signup?role=student&seat=${i+1}`)} aria-label={`Choose ${seat}`}><span>{i+1}</span><em>{seat}</em></button>)}</div>:<div className="teacher-choice"><p><UsersRound/>Teacher</p><button onClick={()=>router.push("/login?role=teacher")}><i className="teacher-figure"/><strong>Sign in as Teacher</strong><span>Open your teacher desk</span></button></div>}
   <button className="turn-arrow left" onClick={()=>turn("left")} aria-label="Turn classroom left"><ArrowLeft/></button><button className="turn-arrow right" onClick={()=>turn("right")} aria-label="Turn classroom right"><ArrowRight/></button>
   <div className="perspective-pill">{view==="student"?<School/>:<GraduationCap/>}<span>{view==="student"?"Students' side":"Teacher's side"}</span><small>Use either arrow to turn</small></div>
  </section>
 </main>
}
