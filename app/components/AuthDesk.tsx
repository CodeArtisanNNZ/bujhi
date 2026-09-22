"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowLeft,Eye,EyeOff,Globe2,LampDesk,LockKeyhole,Mail,UserRound} from "lucide-react";

const worldFacts=[
 "Earth's maps are flat models of a round world, so every map projection changes some shapes or distances.",
 "The earliest surviving terrestrial globe was made in 1492, but it did not include the Americas.",
 "About 71% of Earth's surface is covered by water.",
 "Bangladesh sits on the world's largest river delta."
];

const bookFacts={
 "History of Bangladesh":["The Language Movement of 1952 helped establish Bangla as a state language and shaped Bangladesh's national identity.","Bangladesh became independent in 1971 after a nine-month Liberation War."],
 "People & Culture":["Pohela Boishakh welcomes the Bengali New Year with music, art, food and colourful processions.","Nakshi kantha turns layers of old cloth into embroidered stories of everyday life."],
 "Bangladesh Tomorrow":["Bangladesh launched Bangabandhu Satellite-1 in 2018.","Young Bangladeshis are building solutions in climate resilience, health, education and technology."]
};

const drinks=["Water","Coffee","Tea","Lemonade"];
const DEMO_USER_KEY="bujhi-demo-user";

type DemoProfile={
 full_name:string;
 email:string;
 role:"student"|"teacher";
 class_level?:string;
 subject?:string;
};

export default function AuthDesk({kind}:{kind:"login"|"signup"}){
 const[light,setLight]=useState(true);
 const[show,setShow]=useState(false);
 const[drink,setDrink]=useState("Tea");
 const[chooser,setChooser]=useState(false);
 const[note,setNote]=useState("");
 const[role,setRole]=useState<"student"|"teacher">("student");
 const[fullName,setFullName]=useState("");
 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");
 const[classLevel,setClassLevel]=useState("8");
 const[subject,setSubject]=useState("");
 const[loading,setLoading]=useState(false);
 const[error,setError]=useState("");

 useEffect(()=>{
  const q=new URLSearchParams(window.location.search);
  const queryRole=q.get("role")==="teacher"?"teacher":"student";
  setRole(queryRole);

  try{
   const saved=localStorage.getItem(DEMO_USER_KEY);
   if(saved&&kind==="login"){
    const profile=JSON.parse(saved) as DemoProfile;
    setEmail(profile.email||"");
    setRole(profile.role||queryRole);
   }
  }catch{}
 },[kind]);

 function tell(text:string){setNote(text)}

 function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  setError("");

  const cleanEmail=email.trim();
  if(!cleanEmail){setError("Enter an email address.");return}
  if(password.length<6){setError("Use at least 6 characters for the prototype password.");return}
  if(kind==="signup"&&!fullName.trim()){setError("Enter your full name.");return}

  setLoading(true);

  let existing:DemoProfile|null=null;
  try{
   const saved=localStorage.getItem(DEMO_USER_KEY);
   existing=saved?JSON.parse(saved) as DemoProfile:null;
  }catch{}

  const fallbackName=cleanEmail.split("@")[0].replace(/[._-]+/g," ").replace(/\b\w/g,c=>c.toUpperCase())||"Bujhi Student";
  const profile:DemoProfile={
   full_name:kind==="signup"?fullName.trim():(existing?.full_name||fallbackName),
   email:cleanEmail,
   role,
   class_level:role==="student"?(kind==="signup"?classLevel:(existing?.class_level||"8")):undefined,
   subject:role==="teacher"?(kind==="signup"?subject.trim():(existing?.subject||"")):undefined
  };

  try{
   localStorage.setItem(DEMO_USER_KEY,JSON.stringify(profile));
   localStorage.setItem("bujhi-demo-auth","true");
  }catch{}

  const destination=role==="student"?"/student-dashboard":"/teacher-dashboard";
  window.location.assign(destination);
 }

 return <main className={`auth-page ${light?"lamp-on":"lamp-off"}`}>
  <header className="auth-header">
   <Link className="brand" href="/"><img src="/bujhi-icon.png" alt=""/>Bujhi</Link>
   <Link href="/"><ArrowLeft/>Home</Link>
  </header>

  <section className="desk-scene">
   <picture>
    <source media="(max-width:650px)" srcSet="/auth-desk-clean.png"/>
    <img className="desk-art" src="/auth-desk-clean.png" alt="A study desk with a lamp, globe and books"/>
   </picture>
   <div className="lamp-glow" aria-hidden="true"/>

   <button type="button" className="object-hotspot lamp-spot" onClick={()=>setLight(!light)} aria-label="Turn lamp on or off"><LampDesk/><span>{light?"Turn off":"Turn on"}</span></button>
   <button type="button" className="object-hotspot globe-spot" onClick={()=>tell(worldFacts[Math.floor(Math.random()*worldFacts.length)])} aria-label="Discover a world fact"><Globe2/><span>World fact</span></button>

   <div className="book-spots">
    {Object.entries(bookFacts).map(([title,facts])=><button type="button" key={title} onClick={()=>tell(facts[Math.floor(Math.random()*facts.length)])}><span>{title}</span></button>)}
   </div>

   <button type="button" className={`mug-spot drink-${drink.toLowerCase()}`} onClick={()=>setChooser(!chooser)} aria-label={`Current beverage: ${drink}. Choose another beverage`}>
    <span className="cup"><span className="cup-liquid"/>{drink==="Lemonade"&&<span className="lemon-slice"/>}</span>
    <span className="cup-name">{drink}</span>
   </button>

   {chooser&&<div className="drink-menu">{drinks.map(item=><button type="button" key={item} onClick={()=>{setDrink(item);setChooser(false);tell(`${item} selected. Choose whatever helps your study desk feel comfortable.`)}}>{item}</button>)}</div>}
   {note&&<aside className="desk-note"><button type="button" onClick={()=>setNote("")}>×</button><p>{note}</p></aside>}

   <article className="auth-notebook">
    <div className="auth-rings">{Array.from({length:7}).map((_,i)=><i key={i}/>)}</div>
    <p className="eyebrow">{kind==="login"?"Welcome back":"Begin your Bujhi journey"}</p>
    <h1>{kind==="login"?"Log in to your desk":"Create your account"}</h1>

    <div className="role-switch">
     <button type="button" className={role==="student"?"active":""} onClick={()=>setRole("student")}>Student</button>
     <button type="button" className={role==="teacher"?"active":""} onClick={()=>setRole("teacher")}>Teacher</button>
    </div>

    <form onSubmit={submit}>
     {kind==="signup"&&<label><span>Full name</span><div><UserRound/><input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name"/></div></label>}

     <label><span>Email address</span><div><Mail/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div></label>

     <label><span>Password</span><div><LockKeyhole/><input required type={show?"text":"password"} minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)} aria-label="Show password">{show?<EyeOff/>:<Eye/>}</button></div></label>

     {kind==="signup"&&role==="student"&&<label><span>Class</span><select className="plain-input" value={classLevel} onChange={e=>setClassLevel(e.target.value)}><option value="8">Class 8</option></select></label>}
     {kind==="signup"&&role==="teacher"&&<label><span>Subject</span><input className="plain-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="For example: Science"/></label>}

     {error&&<p className="auth-error">{error}</p>}
     <p className="auth-preview-note">Frontend prototype: any email and any password with 6+ characters will open the dashboard. No database is connected yet.</p>
     <button type="submit" className="submit-auth" disabled={loading}>{loading?"Opening your desk…":kind==="login"?"Log in":"Create account"}</button>
    </form>

    <p className="auth-swap">{kind==="login"?"New to Bujhi? ":"Already have an account? "}<Link href={kind==="login"?`/register?role=${role}`:`/login?role=${role}`}>{kind==="login"?"Choose your place":"Log in"}</Link></p>
   </article>
  </section>
 </main>
}
