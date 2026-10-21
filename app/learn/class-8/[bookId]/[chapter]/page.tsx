import {notFound} from "next/navigation";
import {studyBooks,findStudyBook,studyBookOptions} from "../../../../data/class8StudyBooks";
import {class8IctChapters} from "../../../../data/class8Ict";
import IctChapterReader from "../../../../ict/class-8/IctChapterReader";
import StudyBookReader from "../../StudyBookReader";
type Props={params:Promise<{bookId:string;chapter:string}>};
export function generateStaticParams(){return studyBooks.flatMap(b=>b.entries.map(e=>({bookId:b.id,chapter:`chapter-${e.number}`})));}
export async function generateMetadata({params}:Props){const {bookId,chapter}=await params;const book=findStudyBook(bookId);const entry=book?.entries.find(e=>chapter===`chapter-${e.number}`);return {title:entry?`${entry.title} · ${book?.title} · Bujhi`:"পাঠ পাওয়া যায়নি · Bujhi"};}
export default async function ChapterPage({params}:Props){
 const {bookId,chapter}=await params;const book=findStudyBook(bookId);const entry=book?.entries.find(e=>chapter===`chapter-${e.number}`);if(!book||!entry)notFound();
 if(book.id==="ict"){const original=class8IctChapters.find(c=>c.number===entry.number);if(!original)notFound();return <IctChapterReader key={chapter} chapter={original} chapters={class8IctChapters.map(({number,title})=>({number,title}))}/>;}
 return <StudyBookReader key={book.id+chapter} book={book} bookOptions={studyBookOptions} initialChapter={entry.number}/>;
}
