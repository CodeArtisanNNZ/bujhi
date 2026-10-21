import Link from "next/link";
import {ArrowLeft,BookOpen,Clock3} from "lucide-react";
import {studentBookCatalog} from "../../data/nctbBooks";
import styles from "../../student-dashboard/books/book.module.css";

const chapters=[
  {number:1,title:"তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব",detail:"শিক্ষা, স্বাস্থ্য, ব্যবসা, কর্মসংস্থান ও দৈনন্দিন জীবনে ICT কীভাবে পরিবর্তন আনে তা বুঝো।"},
  {number:2,title:"কম্পিউটার নেটওয়ার্ক",detail:"নেটওয়ার্ক কী, কেন দরকার, তথ্য ভাগাভাগি এবং সংযুক্ত কম্পিউটারের কাজ বোঝো।"},
  {number:3,title:"তথ্য ও যোগাযোগ প্রযুক্তির নিরাপদ ও নৈতিক ব্যবহার",detail:"পাসওয়ার্ড, ভাইরাস, অনলাইন নিরাপত্তা, গোপনীয়তা ও দায়িত্বশীল ডিজিটাল আচরণ শিখো।"},
  {number:4,title:"স্প্রেডশিটের ব্যবহার",detail:"সারি, কলাম, সেল, সূত্র ও হিসাবের মাধ্যমে তথ্য সাজানো এবং বিশ্লেষণ করা শিখো।"},
  {number:5,title:"শিক্ষা ও দৈনন্দিন জীবনে ইন্টারনেটের ব্যবহার",detail:"তথ্য খোঁজা, ই-মেইল, অনলাইন শিক্ষা ও দৈনন্দিন ডিজিটাল সেবার ব্যবহার বোঝো।"}
];

export default function IctClassEight(){
  const book=studentBookCatalog["8"].find(item=>item.id==="ict");
  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link className={styles.back} href="/student-dashboard/books/8/ict"><ArrowLeft/>ICT বইয়ে ফিরি</Link>
    </header>

    <section className={styles.lessonPage}>
      <div className={styles.lessonHero} style={{"--accent":book?.accent||"#48656b"} as React.CSSProperties}>
        <p>অষ্টম শ্রেণি · তথ্য ও যোগাযোগ প্রযুক্তি · NCTB ২০২৬</p>
        <h1>তথ্য ও যোগাযোগ প্রযুক্তি</h1>
        <span>একটি অধ্যায় বেছে নাও। “পাঠ শিখি” অংশে PDF নয়—Bujhi lesson content খুলবে।</span>
      </div>

      <div className={styles.ictWorkspace} aria-label="অষ্টম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তির ৫টি অধ্যায়">
        {chapters.map(chapter=>chapter.number===1?<Link
          className={styles.ictCard}
          key={chapter.number}
          href="/ict/class-8/chapter-1"
        >
          <span className={styles.chapterBadge}>অধ্যায় {chapter.number.toLocaleString("bn-BD")}</span>
          <BookOpen/>
          <strong>{chapter.title}</strong>
          <p>{chapter.detail}</p>
          <small>৭টি পাঠে ভাগ করে পড়ো →</small>
        </Link>:<article className={styles.ictCard} key={chapter.number}>
          <span className={styles.chapterBadge}>অধ্যায় {chapter.number.toLocaleString("bn-BD")}</span>
          <Clock3/>
          <strong>{chapter.title}</strong>
          <p>{chapter.detail}</p>
          <small>পাঠ তৈরি হচ্ছে</small>
        </article>)}
      </div>
    </section>
  </main>;
}
