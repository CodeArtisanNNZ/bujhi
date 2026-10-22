"use client";

import Link from "next/link";
import {useEffect,useRef,useState,type CSSProperties} from "react";
import {ArrowLeft,ArrowRight,BookOpen,Bookmark,BookmarkCheck,ChevronLeft,ChevronRight,Target,Lightbulb,HelpCircle,KeyRound,ListChecks,FileText,Headphones} from "lucide-react";
import type {StudyBook} from "../../data/class8StudyBooks";
import {class8ContributorsForReading} from "../../data/class8Writers";
import StudyVisual from "./StudyVisual";
import AtithirSmritiStory,{atithirSceneContents} from "./AtithirSmritiStory";
import ScienceInteractiveLabs from "./ScienceInteractiveLabs";
import styles from "./study.module.css";

export default function StudyBookReader({book,bookOptions,initialChapter}:{book:StudyBook;bookOptions:{id:string;title:string}[];initialChapter:number}){
 const [selected,setSelected]=useState(initialChapter-1);
 const [saved,setSaved]=useState<number|null>(null);
 const [pickerOpen,setPickerOpen]=useState(false);
 const [activeSection,setActiveSection]=useState("summary");
 const rail=useRef<HTMLDivElement>(null);
 const nodes=useRef<(HTMLButtonElement|null)[]>([]);
 const panel=useRef<HTMLElement>(null);
 const en=book.id.startsWith("english");
 const ui=(bn:string,english:string)=>en?english:bn;
 const num=(n:number)=>n.toLocaleString(en?"en":"bn-BD",{useGrouping:false});
 const entry=book.entries[selected];
 const isAtithirSmriti=book.id==="sahitya-kanika"&&entry.number===1;
 const entryWriters=class8ContributorsForReading(book.id,entry.number);
 const g=entry.guide;
 const storageKey=`bujhi-class8-${book.id}-bookmark`;
 const label=entry.sourceNumber===0?"•":num(entry.sourceNumber??entry.number);
 const sections=isAtithirSmriti?atithirSceneContents.map(scene=>({id:scene.id,label:scene.title,Icon:FileText})):[{id:"summary",label:ui("পাঠের সারাংশ","Overview"),Icon:FileText},{id:"concepts",label:ui("মূল ধারণা","Key ideas"),Icon:KeyRound},{id:"remember",label:ui("মনে রাখো","Remember"),Icon:Lightbulb},{id:"questions",label:ui("নিজেকে জিজ্ঞেস করো","Check yourself"),Icon:HelpCircle},{id:"application",label:ui("নিজে করি","Try it"),Icon:Target}];

 useEffect(()=>{try{const value=localStorage.getItem(storageKey);const n=Number(value);if(value!==null&&book.entries.some(e=>e.number===n))setSaved(n);}catch{}},[storageKey,book.entries]);
 useEffect(()=>{const n=nodes.current[selected];const r=rail.current;if(n&&r)r.scrollTo({left:Math.max(0,n.offsetLeft-(r.clientWidth-n.offsetWidth)/2),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});},[selected]);
 function select(index:number,scroll=false){
  const next=Math.max(0,Math.min(book.entries.length-1,index));setSelected(next);setActiveSection("summary");setPickerOpen(false);
  window.history.replaceState(null,"",`/learn/class-8/${book.id}/chapter-${next+1}`);
  document.title=`${book.entries[next].title} · ${book.title} · Bujhi`;
  if(scroll)panel.current?.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 }
 function bookmark(){const next=saved===entry.number?null:entry.number;setSaved(next);try{if(next===null)localStorage.removeItem(storageKey);else localStorage.setItem(storageKey,String(next));}catch{}}
 const progress=book.entries.length>1?selected/(book.entries.length-1)*100:0;
 const explore=book.id==="bangladesh-global-studies"?`/bgs/class-8/chapter-${entry.number}`:book.id==="science"?(entry.number===2?"/dashboard/science/chapter-2":`/science/class-8/chapter-${entry.number}`):null;
 return <main className={styles.page} style={{"--book-accent":book.accent} as CSSProperties} lang={en?"en":"bn"} data-no-translate><div className={styles.container}>
  <header className={styles.topbar}><nav className={styles.breadcrumb} aria-label={ui("পাঠের অবস্থান","Breadcrumb")}><Link href="/learn/class-8"><ArrowLeft size={18}/><span>{ui("অষ্টম শ্রেণির বই","Class 8 books")}</span></Link><ChevronRight size={14}/><Link href={`/learn/class-8/${book.id}`}>{book.title}</Link></nav><button type="button" className={styles.bookmark} onClick={bookmark} aria-pressed={saved===entry.number}>{saved===entry.number?<BookmarkCheck size={19}/>:<Bookmark size={19}/>}<span>{saved===entry.number?ui("সংরক্ষিত","Saved"):ui("পরে পড়ব","Save")}</span></button></header>
  <section className={styles.hero}><div><p><span className={styles.subjectBadge}>{book.title}</span> · {ui("অষ্টম শ্রেণি","Class 8")}{entry.part&&` · ${entry.part}`}</p><h1>{entry.title}</h1><span className={styles.writerByline}>{entryWriters.length?entryWriters.map((writer,index)=>{const credit=writer.readings.find(reading=>reading.bookId===book.id&&reading.chapter===entry.number)?.credit;return <span key={writer.id}>{index>0&&" · "}{credit==="লেখা"?"লেখক":credit}: {credit==="লেখা"?<Link href={`/learn/class-8/writers#${writer.id}`} title="লেখক পরিচিতি পড়ি">{writer.name}</Link>:writer.name}</span>;}):entry.author||g.terms.map(t=>t[0]).join(" · ")}</span></div><div className={styles.chapterStamp}><small>{book.sectionLabel}</small><b>{label}</b></div></section>
  {!isAtithirSmriti&&<><nav className={styles.lessonNavigator} aria-label={ui("পাঠ নির্বাচন","Choose a section")} onKeyDown={e=>{if(e.target instanceof HTMLInputElement)return;if(e.key==="ArrowRight"){e.preventDefault();select(selected+1);}if(e.key==="ArrowLeft"){e.preventDefault();select(selected-1);}}}>
   <button type="button" className={styles.arrowButton} disabled={selected===0} onClick={()=>select(selected-1)} aria-label={ui("আগের পাঠ","Previous section")}><ChevronLeft/></button>
   <div className={styles.railViewport} ref={rail}><div className={styles.railCanvas} style={{"--steps":book.entries.length,"--progress":`${progress}%`} as CSSProperties}>
    <input className={styles.lessonRange} type="range" min={0} max={book.entries.length-1} step={1} value={selected} onChange={e=>select(Number(e.target.value))} aria-label={ui("পাঠ বদলাতে স্লাইড করুন","Slide to change section")} aria-valuetext={entry.title}/>
    <ol className={styles.lessonNodes}>{book.entries.map((item,i)=><li key={item.number}><button type="button" ref={node=>{nodes.current[i]=node;}} className={`${styles.lessonNode} ${selected===i?styles.currentNode:""}`} onClick={()=>select(i)} aria-current={selected===i?"step":undefined} aria-label={item.title}><span className={styles.nodeNumber}>{item.sourceNumber===0?"•":num(item.sourceNumber??item.number)}</span><span className={styles.nodeTitle}>{item.title}</span></button></li>)}</ol>
   </div></div><button type="button" className={styles.arrowButton} disabled={selected===book.entries.length-1} onClick={()=>select(selected+1)} aria-label={ui("পরের পাঠ","Next section")}><ChevronRight/></button>
  </nav><p className={styles.railHint} aria-live="polite">{ui("নম্বর বেছে বা সক্রিয় বৃত্তটি টেনে পাঠ বদলাও","Choose a number or drag the active circle")}<span>{num(selected+1)} / {num(book.entries.length)}</span></p></>}
  <section className={`${styles.workspace} ${isAtithirSmriti?styles.storyWorkspace:""}`} ref={panel}>
   <article className={styles.lessonContent} key={entry.number}>
    {isAtithirSmriti?<AtithirSmritiStory/>:<section id="study-summary" className={styles.lessonIntro}><div><p className={styles.eyebrow}>{entry.part||book.sectionLabel} {label}<span> · {ui("বইয়ের পৃষ্ঠা","Textbook pages")} {num(entry.pages[0])}–{num(entry.pages[1])}</span></p><h2>{entry.title}</h2><p className={styles.summary}>{g.summary}</p></div><figure className={styles.lessonVisual}><StudyVisual bookId={book.id} chapter={entry.number}/><figcaption>{entry.title}</figcaption></figure></section>}
    {book.id==="science"&&<ScienceInteractiveLabs chapter={entry.number}/>}
    <div className={styles.learningGrid}>
     <section className={styles.learningCard}><h3><Target/>{ui("এই পাঠ কী শেখাবে","What you’ll learn")}</h3><ul>{g.outcomes.map(item=><li key={item}>{item}</li>)}</ul></section>
     <section id="study-remember" className={styles.learningCard}><h3><Lightbulb/>{ui("মনে রাখো","Remember")}</h3><p>{g.remember}</p></section>
     <section id="study-questions" className={styles.learningCard}><h3><HelpCircle/>{ui("নিজেকে জিজ্ঞেস করো","Check yourself")}</h3><ol className={styles.questions}><li><span>{num(1)}</span><details><summary>{g.question}</summary><p>{g.answer}</p></details></li></ol></section>
    </div>
    <section id="study-concepts" className={styles.concepts}><h3><KeyRound/>{ui("মূল ধারণা","Key ideas")}</h3><dl>{g.terms.map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl></section>
    <section id="study-application" className={styles.example}><h3><Target/>{ui("নিজে করি","Try it")}</h3><p>{g.activity}</p>{explore&&<Link className={styles.exploreLink} href={explore}>{ui("ইন্টারেক্টিভ পাঠে আরও শিখি","Explore the interactive lesson")} <ArrowRight size={17}/></Link>}</section>
    <footer className={styles.lessonFooter}><div className={styles.lessonSources}><a href={book.pdfPath} target="_blank" rel="noopener noreferrer"><BookOpen size={16}/>{ui("মূল NCTB পাঠ্যবই","NCTB textbook")}</a><a href="https://digitalcontent.gov.bd/portal/audios" target="_blank" rel="noopener noreferrer"><Headphones size={16}/>{ui("ফ্রি অডিও","Free audio")}</a><a href="https://talkingbookbangla.com/" target="_blank" rel="noopener noreferrer"><Headphones size={16}/>{ui("টকিং বুক","Talking book")}</a></div><div><button type="button" disabled={selected===0} onClick={()=>select(selected-1,true)}><ChevronLeft size={17}/>{ui("আগের পাঠ","Previous")}</button><button type="button" disabled={selected===book.entries.length-1} onClick={()=>select(selected+1,true)}>{ui("পরের পাঠ","Next")}<ChevronRight size={17}/></button></div></footer>
   </article>
   <aside className={styles.chapterAside}><h2><BookOpen size={21}/>{ui("এই পাঠে","In this section")}</h2><nav aria-label={ui("পাঠের অংশগুলো","Section navigation")}>{sections.map(({id,label,Icon})=><a key={id} href={`#study-${id}`} className={activeSection===id?styles.activeSection:""} onClick={()=>setActiveSection(id)}><Icon size={18}/>{label}</a>)}</nav>
    <button type="button" className={styles.pickerToggle} aria-expanded={pickerOpen} aria-controls="study-pickers" onClick={()=>setPickerOpen(!pickerOpen)}>{ui("অধ্যায় ও বই বদলাই","Choose chapter or book")}</button>
    <div id="study-pickers" className={`${styles.pickerFields} ${pickerOpen?styles.pickerOpen:""}`}><div className={styles.chapterPicker}><label htmlFor="study-chapter">{ui("অন্য পাঠ পড়ি","Choose a section")}</label><select id="study-chapter" value={selected} onChange={e=>select(Number(e.target.value))}>{book.entries.map((item,i)=><option key={item.number} value={i}>{item.title}</option>)}</select></div><div className={styles.chapterPicker}><label htmlFor="study-book">{ui("অন্য বই পড়ি","Choose a book")}</label><select id="study-book" value={book.id} onChange={e=>{window.location.href=`/learn/class-8/${e.target.value}`;}}>{bookOptions.map(b=><option key={b.id} value={b.id}>{b.title}</option>)}</select></div></div>
    {saved!==null&&saved!==entry.number&&<button type="button" className={styles.resumeBookmark} onClick={()=>select(saved-1,true)}><Bookmark size={15}/>{ui("সংরক্ষিত পাঠে ফিরি","Resume saved section")}</button>}
   </aside>
  </section>
  <details className={styles.contents}><summary><ListChecks size={19}/>{ui("এই বইয়ের সব পাঠ","All sections in this book")}</summary><nav>{book.entries.map((item,i)=><Link key={item.number} href={`/learn/class-8/${book.id}/chapter-${i+1}`}>{item.sourceNumber===0?"•":num(item.sourceNumber??item.number)}. {item.title}</Link>)}</nav></details>
  <p className={styles.sourceNote}>{isAtithirSmriti?"‘অতিথির স্মৃতি’ অংশে গল্পের মূল পাঠ্য সাহিত্য-কণিকা অনুসারে দেওয়া হয়েছে; দৃশ্যায়ন ও শিক্ষার্থী-সহায়ক হাইলাইট Bujhi-এর নিজস্ব।":ui("অধ্যায়ের নাম ও পৃষ্ঠা মূল পাঠ্যবই অনুসারে। সংক্ষিপ্ত শেখার নোট Bujhi-এর নিজস্ব; পূর্ণ পাঠ, ছবি ও অনুশীলনের জন্য মূল বই পড়ো।","Titles and page references follow the textbook. Bujhi’s original study notes support reading; use the source book for complete passages, illustrations and exercises.")}</p>
 </div></main>;
}
