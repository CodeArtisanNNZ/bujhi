"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowLeft,Coffee,Eye,EyeOff,Globe2,LampDesk,LockKeyhole,Mail,UserRound} from "lucide-react";

const worldFacts=["Earth's maps are flat models of a round world, so every map projection changes some shapes or distances.","The earliest surviving terrestrial globe was made in 1492, but it did not include the Americas.","About 71% of Earth's surface is covered by water.","Bangladesh sits on the world's largest river delta."];
const bookFacts={
 "History of Bangladesh":["The Language Movement of 1952 helped establish Bangla as a state language and shaped Bangladesh's national identity.","Bangladesh became independent in 1971 after a nine-month Liberation War."],
 "People & Culture":["Pohela Boishakh welcomes the Bengali New Year with music, art, food and colourful processions.","Nakshi kantha turns layers of old cloth into embroidered stories of everyday life."],
 "Bangladesh Tomorrow":["Bangladesh launched Bangabandhu Satellite-1 in 2018.","Young Bangladeshis are building solutions in climate resilience, health, education and technology."]
};
const drinks=["Water","Coffee","Tea","Lemonade"];

export default function AuthDesk({kind}:{kind:"login"|"signup"}){
 const[light,setLight]=useState(true),[show,setShow]=useState(false),[drink,setDrink]=useState("Tea"),[chooser,setChooser]=useState(false),[note,setNote]=useState(""),[role,setRole]=useState("student"),[sent,setSent]=useState(false);
 useEffect(()=>{const q=new URLSearchParams(location.search);setRole(q.get("role")==="teacher"?"teacher":"student")},[]);
 function tell(message:string){setNote(message)}
 function submit(e:React.FormEvent){e.preventDefault();setSent(true)}
 return <main className={`auth-page ${light?"lamp-on":"lamp-off"}`}>
  <header className="auth-header"><Link className="brand" href="/"><img src="/bujhi-icon.png" alt=""/>Bujhi</Link><Link href="/"><ArrowLeft/>Home</Link></header>
  <section className="desk-scene">
   <img className="desk-art" src="/auth-desk.png" alt="A study desk with a lamp, globe, books and mug"/>
   <div className="lamp-glow" aria-hidden="true"/>
   <button className="object-hotspot lamp-spot" onClick={()=>setLight(!light)} aria-label="Turn lamp on or off"><LampDesk/><span>{light?"Turn off":"Turn on"}</span></button>
   <button className="object-hotspot globe-spot" onClick={()=>tell(worldFacts[Math.floor(Math.random()*worldFacts.length)])} aria-label="Discover a world fact"><Globe2/><span>World fact</span></button>
   <div className="book-spots">{Object.entries(bookFacts).map(([title,facts])=><button key={title} onClick={()=>tell(facts[Math.floor(Math.random()*facts.length)])}><span>{title}</span></button>)}</div>
   <button className={`object-hotspot mug-spot drink-${drink.toLowerCase()}`} onClick={()=>setChooser(!chooser)} aria-label="Choose a beverage"><Coffee/><span>{drink}</span></button>
   {chooser&&<div className="drink-menu">{drinks.map(item=><button key={item} onClick={()=>{setDrink(item);setChooser(false);tell(`${item} selected. A good study drink is the one that helps you feel comfortable and focused.`)}}>{item}</button>)}</div>}
   {note&&<aside className="desk-note"><button onClick={()=>setNote("")}>×</button><p>{note}</p></aside>}
   <article className="auth-notebook">
    <div className="auth-rings">{Array.from({length:7}).map((_,i)=><i key={i}/>)}</div>
    {sent?<div className="demo-success"><span>✓</span><h1>{kind==="login"?"Welcome back!":"Your desk is ready!"}</h1><p>This frontend demo is working. Secure accounts and dashboards will connect during the backend stage.</p><button onClick={()=>setSent(false)}>Return to form</button></div>:<>
     <p className="eyebrow">{kind==="login"?"Welcome back":"Begin your Bujhi journey"}</p><h1>{kind==="login"?"Log in to your desk":"Create your account"}</h1>
     <div className="role-switch"><button type="button" className={role==="student"?"active":""} onClick={()=>setRole("student")}>Student</button><button type="button" className={role==="teacher"?"active":""} onClick={()=>setRole("teacher")}>Teacher</button></div>
     <form onSubmit={submit}>{kind==="signup"&&<label><span>Full name</span><div><UserRound/><input required placeholder="Your name"/></div></label>}<label><span>Email address</span><div><Mail/><input required type="email" placeholder="you@example.com"/></div></label><label><span>Password</span><div><LockKeyhole/><input required type={show?"text":"password"} minLength={6} placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)} aria-label="Show password">{show?<EyeOff/>:<Eye/>}</button></div></label>{kind==="signup"&&<label><span>{role==="student"?"Class (optional)":"Subject (optional)"}</span><input className="plain-input" placeholder={role==="student"?"For example: Class 9":"For example: Science"}/></label>}<button className="submit-auth">{kind==="login"?"Log in":"Create account"}</button></form>
     <p className="auth-swap">{kind==="login"?"New to Bujhi? ":"Already have an account? "}<Link href={kind==="login"?`/register?role=${role}`:`/login?role=${role}`}>{kind==="login"?"Choose your place":"Log in"}</Link></p>
    </>}
   </article>
  </section>
 </main>
}
