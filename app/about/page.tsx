"use client";
import ResponsiveImage from "../components/ResponsiveImage";
import Link from "next/link";
import {ArrowLeft,ArrowRight,BookOpen,ChevronLeft,ChevronRight,GraduationCap,Lightbulb,MousePointer2} from "lucide-react";
import {useRef,useState,type CSSProperties} from "react";
const teamMembers=[
 {name:"Nusaiba Nusrat Zaman",role:"Founder · Bujhi",bio:"Building Bujhi around one belief: students should have more than one way to understand the same idea.",image:"/about-founder-nusaiba.webp"},
 {name:"Syed Mohammad Samiul Haque",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Mrittika Rahman",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Syed Muhtasim Abrar Sahosh",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Adriana Arif",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Akira Jannat Faiza",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Sidratul Muntaha",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Nowrin Tanhiad",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Azwad Akhlak",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null},
 {name:"Talukder Khaleed Bin Hasan",role:"Bujhi team",bio:"Team profile details and photo will be added here.",image:null}
] as const;

export default function About(){
 const[teamIndex,setTeamIndex]=useState(0);
 const touchStart=useRef<number|null>(null);
 const activeMember=teamMembers[teamIndex];
 const moveTeam=(dir:number)=>setTeamIndex(current=>(current+dir+teamMembers.length)%teamMembers.length);
 function finishSwipe(x:number){
   if(touchStart.current===null)return;
   const delta=x-touchStart.current;
   if(Math.abs(delta)>45)moveTeam(delta<0?1:-1);
   touchStart.current=null;
 }
 return <main className="about-page">
 <section className="about-hero"><div><p className="eyebrow">Our story</p><h1>Bujhi began with a frustration I knew personally.</h1><p>I learned how to prepare the expected answer. But preparing an answer and understanding an idea were not always the same thing.</p></div><button onClick={()=>document.getElementById("story")?.scrollIntoView({behavior:"smooth"})}><MousePointer2/>Follow the story</button></section>
 <section className="story-layout" id="story"><article><h2>Knowing the words is not the same as knowing the idea.</h2><p>During my school years, I often studied by memorizing the exact language expected in examinations. When a difficult topic was explained once in only one way, students who could not connect with that explanation were easily made to feel that they were the problem.</p><p>I kept thinking about how late practical learning arrived. For many students in Bangladesh, a real science experiment, a working model, or even the freedom to explore a question can remain out of reach for years. No student should have to wait until Class 11 to properly touch laboratory equipment and see what a textbook concept actually means.</p><blockquote>“Sometimes the student does not need easier content. They need another path into the same concept.”</blockquote><p className="signature">Nusaiba Nusrat Zaman<br/><span>Founder, Bujhi · Dhaka, Bangladesh</span></p></article></section>
  <section className="fellowship"><GraduationCap/><div><p className="eyebrow">Millennium Fellowship · SDG 4</p><h2>An idea gained a platform to become work.</h2><p>The Millennium Fellowship gave me the opportunity, structure and community to develop Bujhi as a social-impact project connected to Quality Education. It created space to research the problem, listen to students and teachers, test assumptions, and move from personal frustration toward a practical solution.</p></div></section>
  <section className="team-showcase">
   <div className="team-stage-copy">
    <p className="eyebrow">The people behind Bujhi</p>
    <div className="team-copy-transition" key={activeMember.name}>
     <span className="team-count">{String(teamIndex+1).padStart(2,"0")} / {String(teamMembers.length).padStart(2,"0")}</span>
     <h2>{activeMember.name}</h2>
     <strong>{activeMember.role}</strong>
     <p>{activeMember.bio}</p>
    </div>
    <div className="team-controls">
     <button type="button" onClick={()=>moveTeam(-1)} aria-label="Previous teammate"><ChevronLeft/></button>
     <div className="team-dots">{teamMembers.map((member,index)=><button type="button" key={member.name} className={index===teamIndex?"active":""} onClick={()=>setTeamIndex(index)} aria-label={`Show ${member.name}`}/>)}</div>
     <button type="button" onClick={()=>moveTeam(1)} aria-label="Next teammate"><ChevronRight/></button>
    </div>
   </div>
   <div
    className="team-card-stack"
    onTouchStart={event=>{touchStart.current=event.touches[0]?.clientX??null}}
    onTouchEnd={event=>finishSwipe(event.changedTouches[0]?.clientX??0)}
    aria-label="Bujhi team members"
   >
    {teamMembers.map((member,index)=>{
      const relative=(index-teamIndex+teamMembers.length)%teamMembers.length;
      const visible=relative<4;
      return <button
       type="button"
       key={member.name}
       className={`team-profile-card ${relative===0?"active":""}`}
       style={{
        "--team-offset":Math.min(relative,3),
        "--team-z":teamMembers.length-relative,
        opacity:visible?1:0,
        pointerEvents:visible?"auto":"none"
       } as CSSProperties}
       onClick={()=>setTeamIndex(index)}
       aria-label={`Show ${member.name}`}
      >
       {member.image
        ?<ResponsiveImage src={member.image} width={300} height={375} sizes="260px" alt={member.name}/>
        :<span className="team-placeholder"><b>{member.name.split(" ").map(part=>part[0]).slice(0,2).join("")}</b><small>Photo coming soon</small></span>}
       <span className="team-card-overlay"><small>{relative===0?"Current profile":"Bujhi team"}</small><strong>{member.name}</strong></span>
      </button>
    })}
   </div>
  </section>
 <section className="building"><p className="eyebrow">What we are trying to do</p><h2>One curriculum. More ways to understand and explain it.</h2><div><article><BookOpen/><h3>For students</h3><p>Read, watch, explore and practise the same topic until one approach finally makes sense.</p></article><article><Lightbulb/><h3>For teachers</h3><p>Find alternative explanations, classroom activities and practical ways to make difficult ideas visible.</p></article></div><Link href="/">Explore the homepage <ArrowRight/></Link></section>
 <footer className="site-footer"><Link className="brand" href="/"><ResponsiveImage sizes="38px" src="/optimized/bujhi-icon-96.webp" alt=""/>Bujhi</Link><p>Built for understanding.</p><span>© 2026 Bujhi</span></footer>
 </main>}
