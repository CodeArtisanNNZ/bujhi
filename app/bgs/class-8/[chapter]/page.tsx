import Link from "next/link";
import {notFound} from "next/navigation";
import {class8BgsPlans,findBgsPlan} from "../../../data/class8BgsPlans";
import styles from "../bgs.module.css";
import BgsLessonTracker from "./BgsLessonTracker";

export function generateStaticParams() {
  return class8BgsPlans.filter(c => c.number !== 1).map(c => ({chapter:"chapter-"+c.number}));
}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}) {
  const {chapter} = await params;
  const match = /^chapter-(\d+)$/.exec(chapter);
  const plan = match ? findBgsPlan(Number(match[1])) : undefined;
  return {title:plan ? plan.title + " · অষ্টম শ্রেণি | Bujhi" : "অধ্যায় পাওয়া যায়নি"};
}
export default async function BgsChapterPlan({params}:{params:Promise<{chapter:string}>}) {
  const {chapter} = await params;
  const match = /^chapter-(\d+)$/.exec(chapter);
  const plan = match ? findBgsPlan(Number(match[1])) : undefined;
  if (!plan || plan.number===1) notFound();
  const totalMinutes = plan.lessons.reduce((sum, item) => sum + item.minutes, 0);
  const previous = plan.number===2?"/bgs/class-8/chapter-1":"/bgs/class-8/chapter-"+(plan.number-1);
  const next = plan.number===13?"/bgs/class-8":"/bgs/class-8/chapter-"+(plan.number+1);
  return <main className={styles.page}><div className={styles.shell}>
    <Link href="/bgs/class-8" className={styles.back}>← সব অধ্যায়</Link>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>BUJHI · অষ্টম শ্রেণি · অধ্যায় {plan.number.toLocaleString("bn-BD")}</p>
      <h1>{plan.title}</h1>
      <p>{plan.question}</p>
      <div className={styles.stats}><span>{plan.englishTitle}</span><span>মোট {totalMinutes.toLocaleString("bn-BD")} মিনিট</span><span>৩টি শিখনধাপ</span></div>
    </header>
    <section className={styles.panel}>
      <h2>শিখন শেষে তুমি পারবে</h2>
      <ul>{plan.outcomes.map(outcome=><li key={outcome}>{outcome}</li>)}</ul>
    </section>
    <h2 className={styles.heading}>চলো, ধাপে ধাপে শিখি</h2>
    <section className={styles.lessonGrid} aria-label="শেখার তিন ধাপ">
      {plan.lessons.map((lesson,index)=><article className={styles.lesson} key={lesson.title}>
        <header><h3>{(index+1).toLocaleString("bn-BD")}. {lesson.title}</h3><span>{lesson.minutes.toLocaleString("bn-BD")} মিনিট</span></header>
        <dl>
          <dt>সহজ ব্যাখ্যা</dt><dd>{lesson.explain}</dd>
          <dt>নিজে করে দেখো</dt><dd>{lesson.task}</dd>
        </dl>
        <details className={styles.check}><summary>আমি বুঝেছি কি? — প্রশ্ন দেখো</summary><p>{lesson.check}</p></details>
      </article>)}
    </section>
    <BgsLessonTracker chapter={plan.number} lessonNames={plan.lessons.map(lesson=>lesson.title)}/>
    <section className={styles.panel}>
      <h2>শেষের যাচাই</h2>
      <ol>{plan.assessment.map(item=><li key={item}>{item}</li>)}</ol>
      <p><strong>বাসার কাজ:</strong> {plan.followUp}</p>
    </section>
    <section className={styles.panel+" "+styles.tip}>
      <h2>শিক্ষকের নোট</h2>
      <p><strong>প্রস্তুতি:</strong> {plan.materials.join(" · ")}</p>
      <p><strong>ভুল ধারণা খেয়াল করুন:</strong> {plan.commonMistake}</p>
      <p>শিক্ষার্থীরা প্রশ্নের উত্তর নিজেদের ভাষায় বলবে। দলগত কাজ শেষে প্রত্যেক শিক্ষার্থীর বোঝাপড়া আলাদাভাবে যাচাই করুন। স্থানীয় উদাহরণ ও মূল পাঠ্যবইয়ের তথ্য মিলিয়ে নিন।</p>
    </section>
    <nav className={styles.path} aria-label="অধ্যায় পরিবর্তন">
      <Link className={styles.bookLink} href={previous}>← আগের অধ্যায়</Link>
      <Link className={styles.bookLink} href={next}>{plan.number===13?"সব অধ্যায়":"পরের অধ্যায় →"}</Link>
    </nav>
  </div></main>;
}
