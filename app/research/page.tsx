"use client";

import Link from "next/link";
import styles from "./photos.module.css";
import {ArrowRight,BookOpen,Camera,Lightbulb,MessageSquareQuote,Search,School} from "lucide-react";

const researchSteps=[
  {number:"01",title:"Listen first",copy:"We begin with the people already inside the learning environment: teachers and students."},
  {number:"02",title:"Look for patterns",copy:"We compare repeated classroom difficulties instead of building features from assumptions."},
  {number:"03",title:"Turn insight into design",copy:"A research finding matters only when it changes how a lesson, activity or tool is designed."},
];

const voiceSlots=[
  {subject:"Science",focus:"Concepts students can repeat but still struggle to visualise."},
  {subject:"ICT",focus:"Where digital examples can make abstract processes easier to follow."},
  {subject:"Bangladesh & Global Studies",focus:"How stories, timelines and context can make dense chapters easier to understand."},
];

export default function ResearchPage(){
 return <main className="research-page">
  <section className="research-hero">
   <div>
    <p className="eyebrow">Research Behind Bujhi</p>
    <h1>We do not want to guess what a classroom needs.</h1>
    <p>Bujhi is being shaped through conversations, observations and repeated testing. This page documents the research that influences what we build and why we build it.</p>
   </div>
   <a href="#teacher-voices">Start with Teacher Voices <ArrowRight/></a>
  </section>

  <nav className="research-subnav" aria-label="Research page sections">
   <a href="#research-overview">Overview</a>
   <a href="#teacher-voices">Teacher Voices</a>
   <a href="#photo-gallery">Photo Gallery</a>
  </nav>

  <section className="research-intro" id="research-overview">
   <div className="research-intro-title">
    <span>FIELD NOTES</span>
    <h2>From a classroom problem to a Bujhi decision.</h2>
   </div>
   <div className="research-steps">
    {researchSteps.map(step=><article key={step.number}>
      <b>{step.number}</b>
      <h3>{step.title}</h3>
      <p>{step.copy}</p>
    </article>)}
   </div>
  </section>

  <section className="teacher-voices-section" id="teacher-voices">
   <div className="teacher-voices-heading">
    <div>
     <p className="eyebrow">Teacher Voices</p>
     <h2>The people who teach the lesson should help shape how we redesign it.</h2>
    </div>
    <MessageSquareQuote aria-hidden="true"/>
   </div>

   <div className={styles.teacherPhotos}>
    <figure><img src="/research/listening-to-teachers-1200.webp" srcSet="/research/listening-to-teachers-480.webp 480w, /research/listening-to-teachers-1200.webp 1200w" sizes="(max-width:650px) 90vw, 45vw" width="1200" height="900" alt="A Bujhi team member listening during a teacher interview, with research notes on the table" loading="lazy" decoding="async"/><figcaption>Listening to teachers · September 2026</figcaption></figure>
    <figure><img src="/research/teacher-discussion-1200.webp" srcSet="/research/teacher-discussion-480.webp 480w, /research/teacher-discussion-1200.webp 1200w" sizes="(max-width:650px) 90vw, 45vw" width="1200" height="900" alt="A Bujhi team member talking with a teacher in a school room" loading="lazy" decoding="async"/><figcaption>Conversations at school · October 2026</figcaption></figure>
   </div>

   <div className="teacher-voices-grid">
    {voiceSlots.map((item,index)=><article key={item.subject}>
      <div className="teacher-voice-top">
       <span>{String(index+1).padStart(2,"0")}</span>
       <School aria-hidden="true"/>
      </div>
      <p className="teacher-voice-subject">{item.subject} teacher</p>
      <h3>{item.focus}</h3>
      <p className="teacher-voice-note">Interview insight will be added here after the conversation, with the teacher's permission.</p>
      <span className="teacher-voice-status">Interview record</span>
    </article>)}
   </div>

   <div className="teacher-voices-method">
    <Search aria-hidden="true"/>
    <div>
     <strong>What we are looking for</strong>
     <p>Repeated difficulties, moments where students lose the idea, explanations teachers already use successfully, and places where a digital lesson could genuinely help.</p>
    </div>
   </div>
  </section>

  
  <section className="research-gallery" id="photo-gallery">
   <div className="research-gallery-heading">
    <div>
     <p className="eyebrow">Photo Gallery</p>
     <h2>Research is not only notes. It is the places, people and moments that shape Bujhi.</h2>
     <p>Moments from Bujhi’s fieldwork: teacher conversations, school visits and classroom activities.</p>
    </div>
    <Camera aria-hidden="true"/>
   </div>

   <div className={`research-gallery-grid ${styles.gallery}`}>
    {[
      {src:"teacher-interview",label:"Teacher interview",note:"Listening and documenting classroom experiences · September 2026",alt:"A teacher and a Bujhi team member in conversation across a desk"},
      {src:"school-environment",label:"School environment",note:"Looking beyond the lesson to its setting · October 2026",alt:"A school courtyard and surrounding classroom buildings"},
      {src:"school-conversations",label:"School conversations",note:"Discussion around the table · October 2026",alt:"Bujhi team members speaking with school staff at a desk"},
      {src:"classroom-observation",label:"Inside the classroom",note:"Learning from a room full of learners · October 2026",alt:"Students seated in a classroom during a Bujhi field visit"},
      {src:"fieldwork-team",label:"The team on the road",note:"Travelling together for fieldwork · October 2026",alt:"Bujhi team members travelling together on a bus"},
      {src:"student-participation",label:"Student participation",note:"Making room for students to take part · October 2026",alt:"A student standing and participating during a classroom discussion"}
    ].map(item=><article className={`research-gallery-card ${styles.card}`} key={item.src}>
      <a className={styles.photoLink} href={`/research/${item.src}-1200.webp`} target="_blank" rel="noopener noreferrer" aria-label={`View full photo: ${item.label}`}>
       <img src={`/research/${item.src}-1200.webp`} srcSet={`/research/${item.src}-480.webp 480w, /research/${item.src}-1200.webp 1200w`} sizes="(max-width:650px) 90vw, (max-width:900px) 45vw, 30vw" width="1200" height="900" alt={item.alt} loading="lazy" decoding="async"/>
       <div className="research-gallery-caption"><strong>{item.label}</strong><span>{item.note}</span></div>
      </a>
    </article>)}
   </div>
   <p className="research-gallery-note">From the Bujhi team’s fieldwork archive. Select a photo to view it in full.</p>
  </section>

  <section className="research-evidence">
   <div>
    <p className="eyebrow">How findings become features</p>
    <h2>Research is useful only when it changes the product.</h2>
   </div>
   <div className="research-evidence-flow">
    <article><MessageSquareQuote/><span>01</span><h3>Voice</h3><p>A teacher or student describes a real learning difficulty.</p></article>
    <i aria-hidden="true">→</i>
    <article><Search/><span>02</span><h3>Pattern</h3><p>We compare it with other interviews, observations and lesson behaviour.</p></article>
    <i aria-hidden="true">→</i>
    <article><Lightbulb/><span>03</span><h3>Decision</h3><p>The insight becomes a visual, interaction, explanation or change in lesson structure.</p></article>
    <i aria-hidden="true">→</i>
    <article><BookOpen/><span>04</span><h3>Test</h3><p>We put the new approach back in front of learners and see whether it actually helps.</p></article>
   </div>
  </section>

  <section className="research-note">
   <p className="eyebrow">Research record</p>
   <h2>This page will grow with the project.</h2>
   <p>Teacher interviews are only one part of the research. Classroom observations, student feedback, lesson testing and field visits can be added here as Bujhi develops.</p>
   <Link href="/about">Read the Bujhi story <ArrowRight/></Link>
  </section>

  <footer className="site-footer"><Link className="brand" href="/"><img src="/optimized/bujhi-icon-96.webp" width="38" height="38" alt=""/>Bujhi</Link><p>Built for understanding.</p><nav className="site-socials" aria-label="Bujhi social media"><a href="https://www.facebook.com/profile.php?id=61595613561444" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.instagram.com/projectbujhi/" target="_blank" rel="noopener noreferrer">Instagram</a></nav><span>© 2026 Bujhi</span></footer>
 </main>
}
