import {notFound} from "next/navigation";
import {studyBooks,findStudyBook} from "../../../data/class8StudyBooks";
import StudyBookOverview from "../StudyBookOverview";
type Props={params:Promise<{bookId:string}>};
export function generateStaticParams(){return studyBooks.map(b=>({bookId:b.id}));}
export async function generateMetadata({params}:Props){const book=findStudyBook((await params).bookId);return {title:book?`${book.title} · অষ্টম শ্রেণি · Bujhi`:"বই পাওয়া যায়নি · Bujhi"};}
export default async function BookOverview({params}:Props){const book=findStudyBook((await params).bookId);if(!book)notFound();return <StudyBookOverview book={book}/>;}
