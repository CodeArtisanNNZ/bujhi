import Link from "next/link";
import {ArrowRight,Feather} from "lucide-react";
import {class8Writers,class8WritersForBook} from "../../data/class8Writers";
import styles from "./study.module.css";

export default function WritersLink({bookId}:{bookId?:string}){
 const count=bookId?class8WritersForBook(bookId).length:class8Writers.length;
 if(!count)return null;
 return <Link href="/learn/class-8/writers" className={styles.writersBanner} data-no-translate lang="bn"><span className={styles.writersIcon}><Feather aria-hidden="true"/></span><span><strong>লেখক পরিচিতি</strong><small>{bookId?`এই বইয়ের ${count.toLocaleString("bn-BD")} জন রচয়িতাকে চিনি।`:`অষ্টম শ্রেণির গল্প, কবিতা ও অন্য রচনার ${count.toLocaleString("bn-BD")} জন লেখককে চিনি।`}</small></span><ArrowRight aria-hidden="true"/></Link>;
}
