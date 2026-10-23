"use client";
import Link from "next/link";
import {useCallback,useEffect,useState} from "react";
import {ArrowLeft,ArrowRight,Armchair,BookOpen,GraduationCap,MoveHorizontal,School} from "lucide-react";
import {useTheme} from "../components/SiteShell";
import ClassroomCanvas from "./ClassroomCanvas";
import {CLASSROOM_SEATS} from "./classroomScene";
import styles from "./classroom.module.css";

export default function Register(){
  const {theme}=useTheme();
  const [angle,setAngle]=useState(0),[selected,setSelected]=useState<number|null>(null),[hovered,setHovered]=useState<number|null>(null);
  const [bangla,setBangla]=useState(false),[turning,setTurning]=useState(false);
  const teacher=Math.abs(Math.round(angle/Math.PI))%2===1,seat=CLASSROOM_SEATS.find(item=>item.id===selected);
  const onTurning=useCallback((value:boolean)=>setTurning(value),[]);
  useEffect(()=>{
    if(new URLSearchParams(location.search).get("role")==="teacher")setAngle(Math.PI);
    const sync=()=>setBangla(document.documentElement.lang==="bn");
    sync();window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);
  function turn(direction:number){setAngle(current=>current+direction*Math.PI);}
  function view(asTeacher:boolean){if(asTeacher!==teacher)turn(1);}
  const number=(n:number)=>bangla?n.toLocaleString("bn-BD"):String(n).padStart(2,"0");
  return <main className={styles.page} lang={bangla?"bn":"en"} data-no-translate>
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}>{bangla?"বুঝির শ্রেণিকক্ষে স্বাগতম":"A LITTLE ROOM. A LOT TO DISCOVER."}</p>
        <h1>{bangla?"তোমার জায়গা এখানেই।":"There’s a place for you here."}</h1>
        <p>{bangla?"শ্রেণিকক্ষটা ঘুরে দেখো। তারপর তোমার শেখার যাত্রা শুরু করো।":"Take a look around. Then make yourself at home."}</p>
      </div>
      <Link className={styles.existing} href={teacher?"/login?role=teacher":"/login?role=student"}>{bangla?"আগেই অ্যাকাউন্ট আছে?":"Already a member?"}<span>{bangla?"লগইন":"Log in"}<ArrowRight size={15}/></span></Link>
    </header>
    <div className={styles.experience}>
      <section className={styles.room} aria-label={bangla?"শ্রেণিকক্ষ ঘুরে দেখো":"Explore the classroom"}>
        <div className={styles.roomHeader}>
          <div className={styles.roomName}><span className={styles.liveDot}/>{bangla?"বুঝির শ্রেণিকক্ষ":"The Bujhi classroom"}</div>
          <div className={styles.views} aria-label={bangla?"শ্রেণিকক্ষের দিক":"Classroom perspective"}>
            <button type="button" aria-pressed={!teacher} onClick={()=>view(false)} disabled={turning}><School size={16}/><span>{bangla?"শিক্ষার্থীর দিক":"Students’ side"}</span></button>
            <button type="button" aria-pressed={teacher} onClick={()=>view(true)} disabled={turning}><GraduationCap size={17}/><span>{bangla?"শিক্ষকের দিক":"Teacher’s side"}</span></button>
          </div>
        </div>
        <ClassroomCanvas angle={angle} dark={theme==="dark"} bangla={bangla} selected={selected} hovered={hovered} teacher={teacher} onSelect={setSelected} onHover={setHovered} onTurning={onTurning}/>
        <div className={styles.roomFooter}>
          <p aria-live="polite"><MoveHorizontal size={17}/>{turning?(bangla?"শ্রেণিকক্ষ ঘুরছে…":"Turning the classroom…"):(bangla?"অন্য দিক থেকে দেখো":"A different point of view")}</p>
          <div className={styles.turnControls}>
            <button type="button" onClick={()=>turn(-1)} disabled={turning} aria-label={bangla?"শ্রেণিকক্ষ বামে ঘোরাও":"Turn classroom left"}><ArrowLeft size={19}/></button>
            <button type="button" onClick={()=>turn(1)} disabled={turning} aria-label={bangla?"শ্রেণিকক্ষ ডানে ঘোরাও":"Turn classroom right"}><ArrowRight size={19}/></button>
          </div>
        </div>
      </section>
      <section className={styles.join} aria-labelledby="classroom-join-title">
        <div className={styles.joinIcon}>{teacher?<GraduationCap size={26}/>:<Armchair size={25}/>}</div>
        <p className={styles.step}>{teacher?(bangla?"শিক্ষক হিসেবে যোগ দাও":"FOR THE MINDS THAT INSPIRE"):(bangla?"প্রথমে তোমার আসন বেছে নাও":"FIRST, FIND YOUR SEAT")}</p>
        <h2 id="classroom-join-title">{teacher?(bangla?"এখান থেকে অনুপ্রেরণা ছড়াক।":"Make room for discovery."):(bangla?"যেকোনো আসনই তোমার হতে পারে।":"Every seat is a fresh start.")}</h2>
        <p className={styles.description}>{teacher?(bangla?"তোমার শিক্ষক অ্যাকাউন্ট তৈরি করে পাঠ আর ক্লাসের জন্য নিজের ডেস্কে যাও।":"Create a teacher account for your lessons, classes, and teaching desk."):(bangla?"শ্রেণিকক্ষে বা নিচের তালিকায় একটি আসনে চাপ দাও।":"Choose a student in the room, or pick a seat below.")}</p>
        {teacher?<div className={styles.teacherNote}><BookOpen size={22}/><p>{bangla?"শিক্ষার্থীদের বোঝার নিজস্ব পথ খুঁজে পেতে সাহায্য করো।":"Help your students find their own way to understand."}</p></div>:<>
          <fieldset className={styles.seatPicker}><legend>{bangla?"তোমার আসন":"Your seat"}</legend>
            <div className={styles.seatGroups}>{[0,1].map(row=><div key={row}>
              <p>{row===0?(bangla?"সামনের সারি":"FRONT ROW"):(bangla?"পেছনের সারি":"BACK ROW")}</p>
              <div className={styles.seatRow}>{CLASSROOM_SEATS.slice(row*6,row*6+6).map(item=><button key={item.id} type="button"
                aria-pressed={selected===item.id} aria-label={(bangla?"আসন ":"Seat ")+item.id+" · "+(bangla?item.bn:item.en)}
                title={bangla?item.bn:item.en} onClick={()=>setSelected(item.id)} onMouseEnter={()=>setHovered(item.id)} onMouseLeave={()=>setHovered(null)}
              >{number(item.id)}</button>)}</div>
            </div>)}</div>
          </fieldset>
          <p className={styles.selection} aria-live="polite">{seat?<><Armchair size={16}/><span>{(bangla?"আসন ":"Seat ")+number(seat.id)}<small>{bangla?seat.bn:seat.en}</small></span></>:<span>{bangla?"একটি আসন বেছে নিলেই শুরু করা যাবে।":"Pick a seat to begin."}</span>}</p>
        </>}
        {teacher||seat?<Link className={styles.signup} href={teacher?"/signup?role=teacher":"/signup?role=student&seat="+seat!.id}>{teacher?(bangla?"শিক্ষক হিসেবে সাইন আপ":"Sign up as a Teacher"):(bangla?"শিক্ষার্থী হিসেবে সাইন আপ":"Sign up as a Student")}<ArrowRight size={18}/></Link>:<button className={styles.signup} disabled>{bangla?"সাইন আপ করতে আসন বেছে নাও":"Choose a seat to sign up"}<ArrowRight size={18}/></button>}
        <p className={styles.joinHint}>{teacher?(bangla?"আগেই যোগ দিয়েছ? নিচে লগইন করো।":"Already joined? Your teaching desk is waiting."):(bangla?"পরের ধাপে তোমার অ্যাকাউন্ট তৈরি হবে।":"Next, you’ll create your Bujhi account.")}</p>
        <Link className={styles.login} href={teacher?"/login?role=teacher":"/login?role=student"}>{teacher?(bangla?"শিক্ষক হিসেবে লগইন":"Log in as a Teacher"):(bangla?"শিক্ষার্থী হিসেবে লগইন":"Log in as a Student")}<ArrowRight size={15}/></Link>
      </section>
    </div>
    <p className={styles.closing}>{bangla?"একই শ্রেণিকক্ষ। বোঝার অনেক পথ।":"One classroom. Many ways to understand."}</p>
  </main>;
}
