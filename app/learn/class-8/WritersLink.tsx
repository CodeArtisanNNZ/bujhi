"use client";
import {useLanguage} from "../../components/useLanguage";
import Link from "next/link";
import {ArrowRight,Feather} from "lucide-react";
import {class8Writers,class8WritersForBook} from "../../data/class8Writers";
import styles from "./study.module.css";

export default function WritersLink({bookId}:{bookId?:string}){
 const en=useLanguage()==="en";
 const count=bookId?class8WritersForBook(bookId).length:class8Writers.length;
 if(!count)return null;
 return <Link href="/learn/class-8/writers" className={styles.writersBanner} data-no-translate lang={en?"en":"bn"}><span className={styles.writersIcon}><Feather aria-hidden="true"/></span><span><strong>{en?"About the authors":"লেখক পরিচিতি"}</strong><small>{en?(bookId?`Meet the ${count} authors in this book.`:`Meet ${count} authors of Class 8 stories, poems and other works.`):bookId?`এই বইয়ের ${count.toLocaleString("bn-BD")} জন রচয়িতাকে চিনি।`:`অষ্টম শ্রেণির গল্প, কবিতা ও অন্য রচনার ${count.toLocaleString("bn-BD")} জন লেখককে চিনি।`}</small></span><ArrowRight aria-hidden="true"/></Link>;
}
