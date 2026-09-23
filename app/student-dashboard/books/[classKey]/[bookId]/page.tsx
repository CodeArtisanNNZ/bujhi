"use client";

import Link from "next/link";
import {useParams,useRouter} from "next/navigation";
import {useEffect,useMemo,useState} from "react";
import {ArrowLeft,BookOpen,FileText,GraduationCap} from "lucide-react";
import styles from "../../book.module.css";
import {
  findNctbBook,studentClassKey,studentClassLabels,type StudentClassKey
} from "../../../../data/nctbBooks";

const validClasses:StudentClassKey[]=["6","7","8","9-10"];

export default function StudentBookPage(){
  const params=useParams();
  const router=useRouter();
  const classKeyRaw=Array.isArray(params.classKey)?params.classKey[0]:String(params.classKey||"");
  const bookId=Array.isArray(params.bookId)?params.bookId[0]:String(params.bookId||"");
  const classKey=validClasses.includes(classKeyRaw as StudentClassKey)?classKeyRaw as StudentClassKey:null;
  const book=useMemo(()=>classKey?findNctbBook(classKey,bookId):undefined,[classKey,bookId]);
  const[ready,setReady]=useState(false);
  const[pdfStatus,setPdfStatus]=useState("");
  const[checkingPdf,setCheckingPdf]=useState(false);

  useEffect(()=>{
    void (async()=>{
      try{
        const response=await fetch("/api/me",{cache:"no-store"});
        if(!response.ok){router.replace("/login?role=student");return}
        const data=await response.json() as {profile?:{role?:string;class_level?:string}};
        if(data.profile?.role==="teacher"){router.replace("/teacher-dashboard");return}
        const ownClass=studentClassKey(data.profile?.class_level);
        if(classKey&&ownClass!==classKey){router.replace("/student-dashboard");return}
        setReady(true);
      }catch{
        router.replace("/login?role=student");
      }
    })();
  },[classKey,router]);

  async function openPdf(){
    if(!book)return;
    if(book.pdfPath.startsWith("https://drive.google.com/file/d/")){
      window.open(book.pdfPath,"_blank","noopener,noreferrer");
      return;
    }
    setCheckingPdf(true);
    setPdfStatus("");
    const target=window.open("about:blank","_blank");
    try{
      const response=await fetch(book.pdfPath,{method:"HEAD",cache:"no-store"});
      if(response.ok){
        if(target)target.location.href=book.pdfPath;
        else window.location.href=book.pdfPath;
      }else{
        target?.close();
        setPdfStatus("This PDF has not been uploaded yet. The slot is ready for your textbook file.");
      }
    }catch{
      target?.close();
      setPdfStatus("The PDF could not be opened right now.");
    }finally{
      setCheckingPdf(false);
    }
  }

  if(!classKey||!book){
    return <main className={styles.page}><section className={styles.error}><h1>Book not found</h1><p>This textbook is not in this class shelf.</p><Link href="/student-dashboard">Back to my desk</Link></section></main>;
  }

  if(!ready)return <main className={styles.page}><div className={styles.loading}>Opening your book…</div></main>;

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link className={styles.brand} href="/">বুঝি</Link>
      <Link className={styles.back} href="/student-dashboard"><ArrowLeft/>Back to {studentClassLabels[classKey]} desk</Link>
    </header>

    <section className={styles.bookDesk}>
      <article className={styles.bookCover} style={{"--accent":book.accent} as React.CSSProperties}>
        <div className={styles.glyph}>{book.glyph}</div>
        <small>{studentClassLabels[classKey]} · NCTB textbook</small>
        <h1>{book.title}</h1>
        <p>{book.englishTitle}</p>
      </article>

      <article className={styles.notebook}>
        <p className={styles.eyebrow}>My textbook</p>
        <h2>{book.title}</h2>
        <p className={styles.english}>{book.englishTitle}</p>
        <p className={styles.note}>Choose how you want to use this book. The PDF button checks for the actual uploaded textbook file. Learn Lesson opens Bujhi's lesson space for this exact book.</p>

        <div className={styles.actions}>
          <button type="button" className={styles.action} onClick={openPdf} disabled={checkingPdf}>
            <FileText/>
            <span><strong>{checkingPdf?"Checking PDF…":"Open PDF"}</strong><span>Read the full NCTB textbook.</span></span>
          </button>

          <Link className={`${styles.action} ${styles.actionPrimary}`} href={`/student-dashboard/books/${classKey}/${book.id}/learn`}>
            <GraduationCap/>
            <span><strong>Learn Lesson</strong><span>Open the lesson workspace for this book.</span></span>
          </Link>
        </div>

        <div className={styles.status}>{pdfStatus}</div>
        <div className={styles.filePath}>
          {book.pdfPath.startsWith("https://")?"PDF source":"PDF upload slot"}
          <code>{book.pdfPath}</code>
        </div>
      </article>
    </section>
  </main>;
}
