import Link from "next/link";
import {ArrowRight} from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import styles from "./bujhi-mascot.module.css";

export default function BujhiMascotWelcome({bangla}:{bangla:boolean}){
  return <section id="meet-bujhi" className={styles.welcome} aria-labelledby="meet-bujhi-title" lang={bangla?"bn":"en"} data-no-translate>
    <div className={styles.portrait}>
      <ResponsiveImage
        src="/mascot/bujhi-640.webp"
        srcSet="/mascot/bujhi-320.webp 320w, /mascot/bujhi-640.webp 640w"
        sizes="(max-width: 650px) 230px, 320px"
        width={640}
        height={640}
        alt={bangla?"বুঝি—বড় চশমা ও লাল জামা পরা আমাদের মাসকট, হাতে একটি নির্দেশক কাঠি।":"Bujhi, our mascot, wearing oversized glasses and a red shirt with a light bulb, holding a pointer."}
      />
    </div>
    <div className={styles.introduction}>
      <p className={styles.eyebrow}><span aria-hidden="true"/>{bangla?"আমাদের মাসকটের সঙ্গে পরিচয় হোক":"Meet our mascot"}</p>
      <h2 id="meet-bujhi-title">{bangla?"আমি বুঝি।":"Hi, I’m Bujhi."}</h2>
      <p className={styles.invitation}>{bangla?"চলো, একসঙ্গে বুঝি।":"Let’s figure it out together."}</p>
      <div className={styles.links}>
        <Link href="/learn/class-8">{bangla?"পাঠগুলো ঘুরে দেখি":"Explore the lessons"}<ArrowRight aria-hidden="true" size={18}/></Link>
        <Link href="/learn/class-8/mathematics/chapter-1">{bangla?"প্যাটার্ন ল্যাবে চলো":"Try the Pattern Lab"}<ArrowRight aria-hidden="true" size={16}/></Link>
      </div>
    </div>
  </section>;
}
