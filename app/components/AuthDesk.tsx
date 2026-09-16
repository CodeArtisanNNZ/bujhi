"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect,useState} from "react";
import {ArrowLeft,Eye,EyeOff,Globe2,LampDesk,LockKeyhole,Mail,UserRound} from "lucide-react";

const worldFacts=["Earth's maps are flat models of a round world, so every map projection changes some shapes or distances.","The earliest surviving terrestrial globe was made in 1492, but it did not include the Americas.","About 71% of Earth's surface is covered by water.","Bangladesh sits on the world's largest river delta."];
const bookFacts={
 "History of Bangladesh":["The Language Movement of 1952 helped establish Bangla as a state language and shaped Bangladesh's national identity.","Bangladesh became independent in 1971 after a nine-month Liberation War."],
 "People & Culture":["Pohela Boishakh welcomes the Bengali New Year with music, art, food and colourful processions.","Nakshi kantha turns layers of old cloth into embroidered stories of everyday life."],
 "Bangladesh Tomorrow":["Bangladesh launched Bangabandhu Satellite-1 in 2018.","Young Bangladeshis are building solutions in climate resilience, health, education and technology."]
};
const drinks=["Water","Coffee","Tea","Lemonade"];

export default function AuthDesk({kind}:{kind:"login"|"signup"}){
 const router=useRouter();
 const[light,setLight]=useState(true),[show,setShow]=useState(false),[drink,setDrink]=useState("Tea"),[chooser,setChooser]=useState(false),[note,setNote]=useState(""),[role,setRole]=useState("student");
 const[fullName,setFullName]=useState(""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[classLevel,setClassLevel]=useState("8"),[subject,setSubject]=useState("");
 const[loading,setLoading]=useState(false),[error,setError]=useState(""),[message,setMessage]=useState("");
 useEffect(()=>{const q=new URLSearchParams(location.search);setRole(q.get("role")==="teacher"?"teacher":"student")},[]);
 function tell(text:string){setNote(text)}
 async function submit(e:React.FormEvent){
  e.preventDefault();setLoading(true);setError("");setMessage("");
  try{
   const endpoint=kind==="login"?"/api/auth/login":"/api/auth/signup";
   const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password,fullName,role,classLevel,subject})});
   const data=await response.json();
   if(!response.ok){setError(data.error||"Something went wrong.");return}
   if(kind==="signup"&&data.needsConfirmation){setMessage("Account created. Check your email to confirm it, then log in.");return}
   router.push(role==="student"?"/dashboard":"/");router.refresh();
  }catch{setError("Could not connect. Please try again.")}finally{setLoading(false)}
 }
 return <main className={`auth-page ${light?"lamp-on":"lamp-off"}`}>
  <header className="auth-header"><Link className="brand" href="/"><img src="/bujhi-icon.png" alt=""/>Bujhi</Link><Link href="/"><ArrowLeft/>Home</Link></header>
  <section className="desk-scene">
   <img className="desk-art" src="/auth-desk-clean.png" alt="A study desk with a lamp, globe and books"/>
   <div className="lamp-glow" aria-hidden="true"/>
   <button className="object-hotspot lamp-spot" onClick={()=>setLight(!light)} aria-label="Turn lamp on or off"><LampDesk/><span>{light?"Turn off":"Turn on"}</span></button>
   <button className="object-hotspot globe-spot" onClick={()=>tell(worldFacts[Math.floor(Math.random()*worldFacts.length)])} aria-label="Discover a world fact"><Globe2/><span>World fact</span></button>
   <div className="book-spots">{Object.entries(bookFacts).map(([title,facts])=><button key={title} onClick={()=>tell(facts[Math.floor(Math.random()*facts.length)])}><span>{title}</span></button>)}</div>
   <button className={`mug-spot drink-${drink.toLowerCase()}`} onClick={()=>setChooser(!chooser)} aria-label={`Current beverage: ${drink}. Choose another beverage`}><span className="cup"><span className="cup-liquid"/>{drink==="Lemonade"&&<span className="lemon-slice"/>}</span><span className="cup-name">{drink}</span></button>
   {chooser&&<div className="drink-menu">{drinks.map(item=><button key={item} onClick={()=>{setDrink(item);setChooser(false);tell(`${item} selected. A good study drink is the one that helps you feel comfortable and focused.`)}}>{item}</button>)}</div>}
   {note&&<aside className="desk-note"><button onClick={()=>setNote("")}>×</button><p>{note}</p></aside>}
   <article className="auth-notebook">
    <div className="auth-rings">{Array.from({length:7}).map((_,i)=><i key={i}/>)}</div>
    <p className="eyebrow">{kind==="login"?"Welcome back":"Begin your Bujhi journey"}</p><h1>{kind==="login"?"Log in to your desk":"Create your account"}</h1>
    <div className="role-switch"><button type="button" className={role==="student"?"active":""} onClick={()=>setRole("student")}>Student</button><button type="button" className={role==="teacher"?"active":""} onClick={()=>setRole("teacher")}>Teacher</button></div>
    <form onSubmit={submit}>
     {kind==="signup"&&<label><span>Full name</span><div><UserRound/><input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name"/></div></label>}
     <label><span>Email address</span><div><Mail/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div></label>
     <label><span>Password</span><div><LockKeyhole/><input required type={show?"text":"password"} minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)} aria-label="Show password">{show?<EyeOff/>:<Eye/>}</button></div></label>
     {kind==="signup"&&role==="student"&&<label><span>Class</span><select className="plain-input" value={classLevel} onChange={e=>setClassLevel(e.target.value)}>{[6,7,8,9,10].map(c=><option key={c} value={c}>Class {c}</option>)}</select></label>}
     {kind==="signup"&&role==="teacher"&&<label><span>Subject (optional)</span><input className="plain-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="For example: Science"/></label>}
     {error&&<p className="auth-error">{error}</p>}{message&&<p className="auth-message">{message}</p>}
     <button className="submit-auth" disabled={loading}>{loading?"Please wait…":kind==="login"?"Log in":"Create account"}</button>
    </form>
    <p className="auth-swap">{kind==="login"?"New to Bujhi? ":"Already have an account? "}<Link href={kind==="login"?`/register?role=${role}`:`/login?role=${role}`}>{kind==="login"?"Choose your place":"Log in"}</Link></p>
   </article>
  </section>
 </main>
}
