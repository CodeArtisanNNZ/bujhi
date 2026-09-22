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

type AuthDrink="boba"|"tea"|"coffee"|"water"|"lemonade";
const drinks:{id:AuthDrink;label:string;image:string}[]=[
 {id:"boba",label:"Boba tea",image:"/bobatea.png"},
 {id:"tea",label:"Tea",image:"/classictea.png"},
 {id:"coffee",label:"Coffee",image:"/classiccoffee.png"},
 {id:"water",label:"Water",image:"/glassofwater.png"},
 {id:"lemonade",label:"Lemonade",image:"/lemonade.png"}
];

export default function AuthDesk({kind}:{kind:"login"|"signup"}){
 const[light,setLight]=useState(true);
 const[show,setShow]=useState(false);
 const[drink,setDrink]=useState<AuthDrink>("tea");
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
 const activeDrink=drinks.find(item=>item.id===drink)||drinks[1];

 useEffect(()=>{
  const q=new URLSearchParams(window.location.search);
  setRole(q.get("role")==="teacher"?"teacher":"student");
 },[]);

 function tell(text:string){setNote(text)}

 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  setError("");

  const cleanEmail=email.trim();
  if(!cleanEmail){setError("Enter an email address.");return}
  if(password.length<6){setError("Use at least 6 characters for your password.");return}
  if(kind==="signup"&&!fullName.trim()){setError("Enter your full name.");return}

  setLoading(true);
  try{
   const endpoint=kind==="signup"?"/api/auth/signup":"/api/auth/login";
   const payload=kind==="signup"
    ?{email:cleanEmail,password,fullName:fullName.trim(),role,classLevel,subject:subject.trim()}
    :{email:cleanEmail,password};

   const response=await fetch(endpoint,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(payload)
   });
   const data=await response.json().catch(()=>({})) as {error?:string;needsConfirmation?:boolean};

   if(!response.ok){
    setError(data.error||"Could not sign in. Please check your details and try again.");
    return;
   }

   if(kind==="signup"&&data.needsConfirmation){
    setError("Account created, but email confirmation is still enabled in Supabase. Disable Confirm email to let new users enter immediately.");
    return;
   }

   const meResponse=await fetch("/api/me",{cache:"no-store"});
   const me=await meResponse.json().catch(()=>({})) as {error?:string;profile?:{role?:string}};
   if(!meResponse.ok){
    setError(me.error||"Signed in, but Bujhi could not load your profile.");
    return;
   }

   const actualRole=me.profile?.role==="teacher"?"teacher":"student";
   window.location.assign(actualRole==="teacher"?"/teacher-dashboard":"/dashboard");
  }catch{
   setError("Could not reach Bujhi's account service. Please try again.");
  }finally{
   setLoading(false);
  }
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

   <button type="button" className="mug-spot auth-drink-button" onClick={()=>setChooser(!chooser)} aria-label={`Current beverage: ${activeDrink.label}. Choose another beverage`}>
    <span className="auth-drink-frame" aria-hidden="true">
     {(drink==="tea"||drink==="coffee")&&<span className="auth-drink-steam"><i/><i/><i/></span>}
     <img src={activeDrink.image} alt="" draggable={false}/>
    </span>
    <span className="cup-name">{activeDrink.label}</span>
   </button>

   {chooser&&<div className="drink-menu auth-drink-menu">
    {drinks.map(item=><button type="button" key={item.id} className={drink===item.id?"active":""} onClick={()=>{setDrink(item.id);setChooser(false);tell(`${item.label} selected. Choose whatever helps your study desk feel comfortable.`)}}>
     <span className="auth-drink-thumb" aria-hidden="true"><img src={item.image} alt="" draggable={false}/></span>
     <span>{item.label}</span>
    </button>)}
   </div>}
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

     {kind==="signup"&&role==="student"&&<label><span>Class</span><select className="plain-input" value={classLevel} onChange={e=>setClassLevel(e.target.value)}><option value="6">Class 6</option><option value="7">Class 7</option><option value="8">Class 8</option><option value="9">Class 9 · uses Class 9–10 books</option><option value="10">Class 10 · uses Class 9–10 books</option></select></label>}
     {kind==="signup"&&role==="teacher"&&<label><span>Subject</span><input className="plain-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="For example: Science"/></label>}

     {error&&<p className="auth-error">{error}</p>}
     <p className="auth-preview-note">Your Bujhi account is used to open the correct student or teacher desk.</p>
     <button type="submit" className="submit-auth" disabled={loading}>{loading?"Opening your desk…":kind==="login"?"Log in":"Create account"}</button>
    </form>

    <p className="auth-swap">{kind==="login"?"New to Bujhi? ":"Already have an account? "}<Link href={kind==="login"?`/register?role=${role}`:`/login?role=${role}`}>{kind==="login"?"Choose your place":"Log in"}</Link></p>
   </article>
  </section>
 </main>
}
