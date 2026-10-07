"use client";
import ResponsiveImage from "./ResponsiveImage";
import Link from "next/link";
import {useTheme} from "./SiteShell";
import {useEffect,useState} from "react";
import {ArrowLeft,Eye,EyeOff,LockKeyhole,Mail,UserRound} from "lucide-react";

const worldFacts=[
 "Earth's maps are flat models of a round world, so every map projection changes some shapes or distances.",
 "The earliest surviving terrestrial globe was made in 1492, but it did not include the Americas.",
 "About 71% of Earth's surface is covered by water.",
 "Bangladesh sits on the world's largest river delta."
];

type AuthDrink="boba"|"tea"|"coffee"|"water"|"lemonade";
const drinks:{id:AuthDrink;label:string;image:string}[]=[
 {id:"boba",label:"Boba tea",image:"/bobatea.png"},
 {id:"tea",label:"Tea",image:"/classictea.png"},
 {id:"coffee",label:"Coffee",image:"/classiccoffee.png"},
 {id:"water",label:"Water",image:"/glassofwater.png"},
 {id:"lemonade",label:"Lemonade",image:"/lemonade.png"}
];

export default function AuthDesk({kind}:{kind:"login"|"signup"}){
 const {theme}=useTheme();
 const light=theme==="light";
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
    const message=data.error||"Could not sign in. Please check your details and try again.";
    if(kind==="login"&&/invalid login credentials|email or password is incorrect/i.test(message)){
      setError(role==="teacher"
        ?"No teacher account matches this email and password. If this is a new teacher, create a teacher account first."
        :"No account matches this email and password. Check the details or create an account first.");
    }else{
      setError(message);
    }
    return;
   }

   if(kind==="signup"&&data.needsConfirmation){
    setError("Account created. Check your email and confirm the account first, then come back and log in.");
    return;
   }

   const meResponse=await fetch("/api/me",{cache:"no-store"});
   const me=await meResponse.json().catch(()=>({})) as {error?:string;profile?:{role?:string}};
   if(!meResponse.ok){
    setError(me.error||"Signed in, but Bujhi? could not load your profile.");
    return;
   }

   const actualRole=me.profile?.role==="teacher"
    ?"teacher"
    :me.profile?.role==="student"
      ?"student"
      :role;
   window.location.assign(actualRole==="teacher"?"/teacher-dashboard":"/dashboard");
  }catch{
   setError("Could not reach the Bujhi? account service. Please try again.");
  }finally{
   setLoading(false);
  }
 }

 if(kind==="login")return <main className="auth-page login-study-page login-notebook-only-page">
  <section className="login-study-desk login-notebook-only" aria-label="Bujhi login">
   <article className="login-desk-notebook">
    <div className="login-notebook-binding" aria-hidden="true"/>
    <p className="eyebrow">Welcome back</p>
    <h1>Open your desk</h1>

    <div className="role-switch">
     <button type="button" className={role==="student"?"active":""} onClick={()=>setRole("student")}>Student</button>
     <button type="button" className={role==="teacher"?"active":""} onClick={()=>setRole("teacher")}>Teacher</button>
    </div>

    <form onSubmit={submit}>
     <label><span>Email</span><div><Mail/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div></label>
     <label><span>Password</span><div><LockKeyhole/><input required type={show?"text":"password"} minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)} aria-label="Show password">{show?<EyeOff/>:<Eye/>}</button></div></label>
     {error&&<p className="auth-error">{error}</p>}
     <button type="submit" className="submit-auth" disabled={loading}>{loading?"Opening…":"Log in"}</button>
    </form>

    <p className="auth-swap">New here? <Link href={`/signup?role=${role}`}>{role==="teacher"?"Create teacher account":"Create student account"}</Link></p>
   </article>
  </section>
 </main>;

 return <main className={`auth-page ${light?"lamp-on":"lamp-off"}`}>


  <section className="desk-scene">
   <ResponsiveImage loading="eager" fetchPriority="high" sizes="100vw" className="desk-art" src="/auth-desk-clean.png" alt="A study desk with a lamp, globe and books"/>


   {note&&<aside className="desk-note"><button type="button" onClick={()=>setNote("")}>×</button><p>{note}</p></aside>}

   <article className="auth-notebook">
    <div className="auth-rings">{Array.from({length:7}).map((_,i)=><i key={i}/>)}</div>
    <p className="eyebrow">Begin your Bujhi? journey</p>
    <h1>Create your account</h1>

    <div className="role-switch">
     <button type="button" className={role==="student"?"active":""} onClick={()=>setRole("student")}>Student</button>
     <button type="button" className={role==="teacher"?"active":""} onClick={()=>setRole("teacher")}>Teacher</button>
    </div>

    <form onSubmit={submit}>
     <label><span>Full name</span><div><UserRound/><input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name"/></div></label>

     <label><span>Email address</span><div><Mail/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div></label>

     <label><span>Password</span><div><LockKeyhole/><input required type={show?"text":"password"} minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)} aria-label="Show password">{show?<EyeOff/>:<Eye/>}</button></div></label>

     {role==="student"&&<label><span>Class</span><select className="plain-input" value={classLevel} onChange={e=>setClassLevel(e.target.value)}><option value="6">Class 6</option><option value="7">Class 7</option><option value="8">Class 8</option><option value="9">Class 9 · uses Class 9 to 10 books</option><option value="10">Class 10 · uses Class 9 to 10 books</option></select></label>}
     {role==="teacher"&&<label><span>Subject</span><input className="plain-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="For example: Science"/></label>}

     {error&&<p className="auth-error">{error}</p>}
     <p className="auth-preview-note">Your Bujhi? account is used to open the correct student or teacher desk.</p>
     <button type="submit" className="submit-auth" disabled={loading}>{loading?"Creating account…":"Create account"}</button>
    </form>

    <p className="auth-swap">Already have an account? <Link href={`/login?role=${role}`}>Log in</Link></p>
   </article>
  </section>
 </main>
}
