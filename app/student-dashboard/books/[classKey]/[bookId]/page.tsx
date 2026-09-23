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
  const bookUsesEnglish=Boolean(book&&/^[A-Za-z]/.test(book.title));
  const ui=(bn:string,en:string)=>bookUsesEnglish?en:bn;
  const classLabelBn:Record<StudentClassKey,string>={"6":"ষষ্ঠ শ্রেণি","7":"সপ্তম শ্রেণি","8":"অষ্টম শ্রেণি","9-10":"নবম–দশম শ্রেণি"};
  const classLabel=classKey?(bookUsesEnglish?studentClassLabels[classKey]:classLabelBn[classKey]):"";
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
        setPdfStatus(ui("এই PDF এখনো আপলোড করা হয়নি। পাঠ্যবইয়ের ফাইলের জায়গা প্রস্তুত আছে।","This PDF has not been uploaded yet. The slot is ready for your textbook file."));
      }
    }catch{
      target?.close();
      setPdfStatus(ui("এই মুহূর্তে PDF খোলা যাচ্ছে না।","The PDF could not be opened right now."));
    }finally{
      setCheckingPdf(false);
    }
  }

  if(!classKey||!book){
    return <main className={styles.page}><section className={styles.error}><h1>বই পাওয়া যায়নি</h1><p>এই শ্রেণির তাকে বইটি নেই।</p><Link href="/student-dashboard">আমার ডেস্কে ফিরি</Link></section></main>;
  }

  if(!ready)return <main className={styles.page}><div className={styles.loading}>{ui("বই খোলা হচ্ছে…","Opening your book…")}</div></main>;

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link className={styles.brand} href="/">বুঝি</Link>
      <Link className={styles.back} href="/student-dashboard"><ArrowLeft/>{ui(`${classLabel} ডেস্কে ফিরি`,`Back to ${classLabel} desk`)}</Link>
    </header>

    <section className={styles.bookDesk}>
      <article className={styles.bookCover} style={{"--accent":book.accent} as React.CSSProperties}>
        <div className={styles.glyph}>{book.glyph}</div>
        <small>{classLabel} · {ui("NCTB পাঠ্যবই","NCTB textbook")}</small>
        <h1>{book.title}</h1>
        <p>{book.englishTitle}</p>
      </article>

      <article className={styles.notebook}>
        <p className={styles.eyebrow}>{ui("আমার পাঠ্যবই","My textbook")}</p>
        <h2>{book.title}</h2>
        <p className={styles.english}>{book.englishTitle}</p>
        <p className={styles.note}>{ui("এই বইটি কীভাবে ব্যবহার করবে বেছে নাও। PDF বোতাম মূল আপলোড করা পাঠ্যবই খুলবে, আর ‘পাঠ শিখি’ বুঝির এই বইয়ের পাঠের জায়গা খুলবে।","Choose how you want to use this book. The PDF button checks for the actual uploaded textbook file. Learn Lesson opens Bujhi's lesson space for this exact book.")}</p>

        <div className={styles.actions}>
          <button type="button" className={styles.action} onClick={openPdf} disabled={checkingPdf}>
            <FileText/>
            <span><strong>{checkingPdf?ui("PDF যাচাই হচ্ছে…","Checking PDF…"):ui("PDF খোলো","Open PDF")}</strong><span>{ui("সম্পূর্ণ NCTB পাঠ্যবই পড়ো।","Read the full NCTB textbook.")}</span></span>
          </button>

          <Link className={`${styles.action} ${styles.actionPrimary}`} href={`/student-dashboard/books/${classKey}/${book.id}/learn`}>
            <GraduationCap/>
            <span><strong>{ui("পাঠ শিখি","Learn Lesson")}</strong><span>{ui("এই বইয়ের পাঠের জায়গা খোলো।","Open the lesson workspace for this book.")}</span></span>
          </Link>
        </div>

        <div className={styles.status}>{pdfStatus}</div>
        <div className={styles.filePath}>
          {book.pdfPath.startsWith("https://")?ui("PDF উৎস","PDF source"):ui("PDF আপলোডের জায়গা","PDF upload slot")}
          <code>{book.pdfPath}</code>
        </div>
      </article>
    </section>
  </main>;
}
