"use client";

import Link from "next/link";
import {ArrowRight,BookOpen,Camera,Image as ImageIcon,Lightbulb,MessageSquareQuote,Search,School} from "lucide-react";

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
     <p>Field visits, teacher conversations, classroom observations and the work behind each research decision will live here.</p>
    </div>
    <Camera aria-hidden="true"/>
   </div>

   <div className="research-gallery-grid">
    {[
      {label:"Teacher interview",note:"Conversation and classroom insight",size:"wide"},
      {label:"School visit",note:"Learning from the environment",size:"tall"},
      {label:"Field notes",note:"What we noticed and wrote down",size:"small"},
      {label:"Classroom observation",note:"Seeing how students respond",size:"small"},
      {label:"Research team",note:"The people documenting the process",size:"wide"},
      {label:"Behind the lesson",note:"Turning findings into a Bujhi feature",size:"small"}
    ].map((item,index)=><article className={`research-gallery-card ${item.size}`} key={item.label}>
      <div className="research-gallery-placeholder">
       <ImageIcon aria-hidden="true"/>
       <span>Photo {String(index+1).padStart(2,"0")}</span>
      </div>
      <div className="research-gallery-caption">
       <strong>{item.label}</strong>
       <span>{item.note}</span>
      </div>
    </article>)}
   </div>

   <p className="research-gallery-note">Real Bujhi research photos will replace these frames as the fieldwork archive grows.</p>
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

  <footer className="site-footer"><Link className="brand" href="/"><img src="/optimized/bujhi-icon-96.webp" width="38" height="38" alt=""/>Bujhi</Link><p>Built for understanding.</p><span>© 2026 Bujhi</span></footer>
 </main>
}
