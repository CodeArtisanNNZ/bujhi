import Link from "next/link";
import { ArrowLeft, MessageCircle, HeartHandshake } from "lucide-react";

export default function FriendCorner(){
 return <main style={{minHeight:"100vh",background:"#f6efe5",padding:"40px 20px",color:"#241c18"}}>
  <section style={{maxWidth:720,margin:"0 auto",background:"#fffdfa",padding:"38px",borderRadius:14,boxShadow:"0 20px 60px #4c261522"}}>
   <Link href="/student" style={{display:"inline-flex",gap:7,alignItems:"center",color:"#990000",fontWeight:700}}><ArrowLeft size={18}/>Back to my desk</Link>
   <HeartHandshake size={52} color="#990000" style={{marginTop:40}}/>
   <p style={{color:"#990000",fontWeight:800,letterSpacing:".13em",fontSize:12}}>TALK TO A FRIEND</p>
   <h1 style={{fontFamily:"Fraunces, serif",fontSize:"clamp(2.4rem,7vw,4.5rem)",lineHeight:.95,margin:"10px 0 18px"}}>You do not have to study every feeling away.</h1>
   <p style={{fontSize:18,lineHeight:1.7,color:"#6b5e57"}}>This is Bujhi's student wellbeing corner. The first version is a calm space to pause, write down what is on your mind, and find appropriate support. Peer conversation and school support features will be added only with clear safety and privacy rules.</p>
   <div style={{marginTop:30,padding:22,borderLeft:"5px solid #990000",background:"#f4e6da"}}><MessageCircle color="#990000"/><strong style={{display:"block",marginTop:8}}>Friend space is being prepared.</strong><span style={{color:"#6b5e57"}}>For now, return to your desk whenever you are ready.</span></div>
  </section>
 </main>
}
