import Link from "next/link";
import {class8BgsPlans} from "../../data/class8BgsPlans";
import styles from "./bgs.module.css";

export const metadata = {
  title: "অষ্টম শ্রেণি · বাংলাদেশ ও বিশ্বপরিচয় | Bujhi",
  description: "২০২৬ শিক্ষাবর্ষের অষ্টম শ্রেণির বাংলাদেশ ও বিশ্বপরিচয়: ১৩ অধ্যায়ের শিখনফল, পাঠ পরিকল্পনা, অনুশীলন ও মূল্যায়ন।"
};

export default function BgsClassEightIndex() {
  return <main className={styles.page}><div className={styles.shell}>
    <Link href="/student-dashboard/books/8/bangladesh-global-studies/learn" className={styles.back}>← বইয়ের ডেস্কে ফিরে যাও</Link>
    <section className={styles.hero}>
      <p className={styles.eyebrow}>BUJHI · NCTB ২০২৬ · CLASS ৮</p>
      <h1>বাংলাদেশ ও বিশ্বপরিচয়</h1>
      <p>১৩টি অধ্যায়। প্রতিটি অধ্যায়ে কী শিখবে, কীভাবে বুঝবে এবং নিজে কী করে দেখবে—সব এক জায়গায়। প্রথম অধ্যায়ের সমৃদ্ধ ইন্টারেক্টিভ পাঠ আগের মতোই আছে।</p>
      <div className={styles.stats}><span>১৩ অধ্যায়</span><span>ছোট ছোট পাঠ</span><span>শিক্ষক ও শিক্ষার্থীর কাজ</span><span>নিজে যাচাই</span></div>
    </section>
    <h2 className={styles.heading}>অধ্যায় বেছে নাও</h2>
    <section className={styles.chapterGrid} aria-label="অধ্যায় তালিকা">
      {class8BgsPlans.map(chapter => <Link key={chapter.number}
        className={styles.chapterCard}
        href={chapter.number === 1 ? "/bgs/class-8/chapter-1" : "/bgs/class-8/chapter-" + chapter.number}>
        <b>অধ্যায় {chapter.number.toLocaleString("bn-BD")}</b>
        <strong>{chapter.title}</strong>
        <span>{chapter.question}</span>
        <em>{chapter.number===1?"ইন্টারেক্টিভ পাঠ খোলো":"পাঠ পরিকল্পনা খোলো"} →</em>
      </Link>)}
    </section>
    <section className={styles.panel}>
      <h2>শিক্ষক কীভাবে ব্যবহার করবেন?</h2>
      <p>প্রতিটি অধ্যায়ের লক্ষ্য থেকে শুরু করুন। এরপর নির্ধারিত সময় অনুযায়ী ব্যাখ্যা, হাতে-কলমে কাজ, প্রশ্ন এবং শেষের মূল্যায়ন করান। এই পরিকল্পনাগুলো মূল NCTB পাঠ্যবইয়ের সহায়ক, বিকল্প নয়।</p>
    </section>
  </div></main>;
}
