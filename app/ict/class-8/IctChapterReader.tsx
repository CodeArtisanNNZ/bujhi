"use client";

import Link from "next/link";
import {useEffect,useRef,useState,type CSSProperties} from "react";
import {ArrowLeft,ArrowRight,Bookmark,BookmarkCheck,BookOpen,ChevronLeft,ChevronRight,FileText,HelpCircle,Image as ImageIcon,KeyRound,Lightbulb,ListChecks,Target} from "lucide-react";
import {ictTextbookSource,type IctChapter,type IctLesson} from "../../data/class8Ict";
import IctChapterVisual from "./IctChapterVisual";
import styles from "./reader.module.css";

const bn=(value:number)=>value.toLocaleString("bn-BD",{useGrouping:false});
const lessonLabel=(lesson:IctLesson)=>lesson.number===lesson.endNumber?bn(lesson.number):`${bn(lesson.number)}–${bn(lesson.endNumber)}`;
const sections=[
 {id:"summary",label:"পাঠের সারাংশ",Icon:FileText},
 {id:"concepts",label:"মূল ধারণা",Icon:KeyRound},
 {id:"examples",label:"উদাহরণ",Icon:BookOpen},
 {id:"remember",label:"মনে রাখো",Icon:Lightbulb},
 {id:"questions",label:"নিজেকে জিজ্ঞেস করো",Icon:HelpCircle},
 {id:"application",label:"চিত্র ও প্রয়োগ",Icon:ImageIcon}
];

type ChapterLink={number:number;title:string};
export default function IctChapterReader({chapter,chapters}:{chapter:IctChapter;chapters:ChapterLink[]}){
 const[selected,setSelected]=useState(0);
 const[bookmarked,setBookmarked]=useState<number|null>(null);
 const[section,setSection]=useState("summary");
 const railRef=useRef<HTMLDivElement>(null);
 const panelRef=useRef<HTMLElement>(null);
 const nodeRefs=useRef<(HTMLButtonElement|null)[]>([]);
 const active=chapter.lessons[selected];
 const storageKey=`bujhi-ict-8-chapter-${chapter.number}-bookmark`;
 const grouped=active.number!==active.endNumber;
 const progress=chapter.lessons.length>1?selected/(chapter.lessons.length-1)*100:0;

 useEffect(()=>{
  const requested=Number(new URLSearchParams(window.location.search).get("lesson"));
  const index=chapter.lessons.findIndex(lesson=>requested>=lesson.number&&requested<=lesson.endNumber);
  if(index>=0)setSelected(index);
  try{const saved=localStorage.getItem(storageKey);const number=Number(saved);if(saved!==null&&chapter.lessons.some(lesson=>lesson.number===number))setBookmarked(number);}catch{}
 },[chapter.lessons,storageKey]);

 useEffect(()=>{
  const rail=railRef.current;
  const node=nodeRefs.current[selected];
  if(!rail||!node)return;
  const behavior=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";
  rail.scrollTo({left:Math.max(0,node.offsetLeft-(rail.clientWidth-node.offsetWidth)/2),behavior});
 },[selected]);

 function selectLesson(index:number,scroll=false){
  const next=Math.max(0,Math.min(chapter.lessons.length-1,index));
  setSelected(next);setSection("summary");
  const url=new URL(window.location.href);
  url.searchParams.set("lesson",String(chapter.lessons[next].number));url.hash="";
  window.history.replaceState(null,"",url);
  if(scroll)panelRef.current?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
 }

 function toggleBookmark(){
  const next=bookmarked===active.number?null:active.number;
  setBookmarked(next);
  try{if(next===null)localStorage.removeItem(storageKey);else localStorage.setItem(storageKey,String(next));}catch{}
 }
 const saved=bookmarked===active.number;
 const previousChapter=chapters.find(item=>item.number===chapter.number-1);
 const nextChapter=chapters.find(item=>item.number===chapter.number+1);

 return <main className={styles.page} lang="bn" data-no-translate>
  <div className={styles.container}>
   <header className={styles.topbar}>
    <nav className={styles.breadcrumb} aria-label="পাঠের অবস্থান">
     <Link href="/student-dashboard/books/8/ict/learn"><ArrowLeft size={19}/><span>বইয়ের পাঠ শিখি</span></Link>
     <ChevronRight size={15}/><Link href="/ict/class-8">অষ্টম শ্রেণি · ICT</Link>
     <ChevronRight size={15}/><span aria-current="page">অধ্যায় {bn(chapter.number)}</span>
    </nav>
    <button type="button" className={`${styles.bookmark} ${saved?styles.saved:""}`} onClick={toggleBookmark} aria-pressed={saved}>
     {saved?<BookmarkCheck size={20}/>:<Bookmark size={20}/>}<span>{saved?"সংরক্ষিত":"পরে পড়ব"}</span>
    </button>
   </header>

   <section className={styles.hero} aria-labelledby="ict-chapter-title">
    <div><p>অষ্টম শ্রেণি · তথ্য ও যোগাযোগ প্রযুক্তি · অধ্যায় {bn(chapter.number)}</p>
     <h1 id="ict-chapter-title">{chapter.title}</h1>
     <span>{chapter.intro}</span>
    </div>
    <div className={styles.chapterStamp} aria-label={`অধ্যায় ${bn(chapter.number)}`}><small>CHAPTER</small><b>{String(chapter.number).padStart(2,"0").replace(/\d/g,digit=>bn(Number(digit)))}</b></div>
   </section>

   <nav className={styles.lessonNavigator} aria-label="পাঠ নির্বাচন" onKeyDown={event=>{
    if(event.target instanceof HTMLInputElement)return;
    if(event.key==="ArrowRight"){event.preventDefault();selectLesson(selected+1);}
    if(event.key==="ArrowLeft"){event.preventDefault();selectLesson(selected-1);}
   }}>
    <button type="button" className={styles.arrowButton} onClick={()=>selectLesson(selected-1)} disabled={selected===0} aria-label="আগের পাঠ"><ChevronLeft/></button>
    <div className={styles.railViewport} ref={railRef}>
     <div className={styles.railCanvas} style={{"--steps":chapter.lessons.length,"--progress":`${progress}%`} as CSSProperties}>
      <input className={styles.lessonRange} type="range" min={0} max={chapter.lessons.length-1} step={1} value={selected}
       onChange={event=>selectLesson(Number(event.target.value))} aria-label="পাঠ বদলাতে স্লাইড করুন" aria-valuetext={`পাঠ ${lessonLabel(active)}: ${active.title}`}/>
      <ol className={styles.lessonNodes}>
       {chapter.lessons.map((lesson,index)=><li key={lesson.number}>
        <button type="button" ref={node=>{nodeRefs.current[index]=node;}} className={`${styles.lessonNode} ${index===selected?styles.currentNode:""} ${index<selected?styles.passedNode:""}`}
         onClick={()=>selectLesson(index)} aria-current={index===selected?"step":undefined} aria-label={`পাঠ ${lessonLabel(lesson)}: ${lesson.title}`}>
         <span className={styles.nodeNumber}>{lessonLabel(lesson)}</span><span className={styles.nodeTitle}>{lesson.title}</span>
        </button>
       </li>)}
      </ol>
     </div>
    </div>
    <button type="button" className={styles.arrowButton} onClick={()=>selectLesson(selected+1)} disabled={selected===chapter.lessons.length-1} aria-label="পরের পাঠ"><ChevronRight/></button>
   </nav>
   <p className={styles.railHint} aria-live="polite" aria-atomic="true">নম্বর বেছে বা সক্রিয় বৃত্তটি টেনে পাঠ বদলাও <span>{bn(selected+1)} / {bn(chapter.lessons.length)} পাঠ-অংশ</span></p>

   <section ref={panelRef} className={styles.workspace} aria-label={`পাঠ ${lessonLabel(active)}: ${active.title}`}>
    <article className={styles.lessonContent} key={active.number}>
     <section id="ict-summary" className={styles.lessonIntro}>
      <div><p className={styles.eyebrow}>পাঠ {lessonLabel(active)} <span>· বইয়ের পৃষ্ঠা {bn(active.pages[0])}–{bn(active.pages[1])}</span></p>
       <h2>{active.title}</h2><p className={styles.summary}>{active.summary}</p>
      </div>
      <figure className={styles.lessonVisual}><IctChapterVisual chapter={chapter.number}/><figcaption>{chapter.title}</figcaption></figure>
     </section>
     {grouped&&<p className={styles.groupNote}><BookOpen size={17}/>মূল বইয়ে পাঠ {lessonLabel(active)} এই একটি শিরোনামের অধীনে একসঙ্গে দেওয়া আছে।</p>}

     <div className={styles.learningGrid}>
      <section className={styles.learningCard}><h3><Target/>এই পাঠ কী শেখাবে</h3><ul>{active.outcomes.map(item=><li key={item}>{item}</li>)}</ul></section>
      <section id="ict-remember" className={styles.learningCard}><h3><Lightbulb/>মনে রাখো</h3><p>{active.remember}</p></section>
      <section id="ict-questions" className={styles.learningCard}><h3><HelpCircle/>নিজেকে জিজ্ঞেস করো</h3>
       <ol className={styles.questions}>{active.questions.map((question,index)=><li key={question.prompt}><span>{bn(index+1)}</span><details><summary>{question.prompt}</summary><p>{question.answer}</p></details></li>)}</ol>
      </section>
     </div>

     <section id="ict-concepts" className={styles.concepts}><h3><KeyRound/>মূল ধারণা</h3><dl>{active.terms.map(item=><div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl></section>
     <section id="ict-examples" className={styles.example}><h3><BookOpen/>উদাহরণে বুঝি</h3><p>{active.example}</p></section>
     <section id="ict-application" className={styles.application}><BookOpen aria-hidden="true"/><h3>বাস্তব জীবনে প্রয়োগ</h3><p>{active.activity}</p></section>

     <footer className={styles.lessonFooter}>
      <a href={ictTextbookSource.pdfUrl} target="_blank" rel="noopener noreferrer"><BookOpen size={16}/>মূল NCTB পাঠ্যবই</a>
      <div><button type="button" onClick={()=>selectLesson(selected-1,true)} disabled={selected===0}><ChevronLeft size={18}/>আগের পাঠ</button>
       <button type="button" onClick={()=>selectLesson(selected+1,true)} disabled={selected===chapter.lessons.length-1}>পরের পাঠ<ChevronRight size={18}/></button></div>
     </footer>
    </article>
    <aside className={styles.chapterAside}>
     <h2><BookOpen size={21}/>এই পাঠে</h2>
     <nav aria-label="পাঠের অংশগুলো">{sections.map(({id,label,Icon})=><a key={id} href={`#ict-${id}`} className={section===id?styles.activeSection:""} onClick={()=>setSection(id)}><Icon size={19}/><span>{label}</span></a>)}</nav>
     <div className={styles.chapterPicker}><label htmlFor="ict-chapter">অন্য অধ্যায় পড়ি</label><select id="ict-chapter" value={chapter.number} onChange={event=>{window.location.href=`/ict/class-8/chapter-${event.target.value}`;}}>{chapters.map(item=><option key={item.number} value={item.number}>{bn(item.number)}. {item.title}</option>)}</select></div>
     {bookmarked!==null&&!saved&&<button type="button" className={styles.resumeBookmark} onClick={()=>{const index=chapter.lessons.findIndex(lesson=>lesson.number===bookmarked);if(index>=0)selectLesson(index);}}><Bookmark size={16}/>সংরক্ষিত পাঠ {bn(bookmarked)}</button>}
    </aside>
   </section>
   <nav className={styles.chapterNavigation} aria-label="অধ্যায় পরিবর্তন">
    {previousChapter?<Link href={`/ict/class-8/chapter-${previousChapter.number}`}><ArrowLeft size={18}/><span><small>আগের অধ্যায়</small>{previousChapter.title}</span></Link>:<Link href="/ict/class-8"><ListChecks size={18}/>সব অধ্যায়</Link>}
    {nextChapter&&<Link href={`/ict/class-8/chapter-${nextChapter.number}`}><span><small>পরের অধ্যায়</small>{nextChapter.title}</span><ArrowRight size={18}/></Link>}
   </nav>
  </div>
 </main>;
}
