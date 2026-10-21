import {notFound} from "next/navigation";
import {class8IctChapters} from "../../../data/class8Ict";
import IctChapterReader from "../IctChapterReader";
type Props={params:Promise<{chapter:string}>};
const findChapter=(slug:string)=>class8IctChapters.find(item=>`chapter-${item.number}`===slug);
export function generateStaticParams(){return class8IctChapters.slice(1).map(item=>({chapter:`chapter-${item.number}`}));}
export async function generateMetadata({params}:Props){const chapter=findChapter((await params).chapter);return {title:chapter?`${chapter.title} · অষ্টম শ্রেণি · Bujhi`:"পাঠ পাওয়া যায়নি · Bujhi"};}
export default async function IctChapter({params}:Props){
 const chapter=findChapter((await params).chapter);
 if(!chapter)notFound();
 return <IctChapterReader key={`chapter-${chapter.number}`} chapter={chapter} chapters={class8IctChapters.map(({number,title})=>({number,title}))}/>;
}
