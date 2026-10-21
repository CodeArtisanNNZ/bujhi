import {class8IctChapters} from "../../../data/class8Ict";
import IctChapterReader from "../IctChapterReader";
export const metadata={title:"তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব · অষ্টম শ্রেণি · Bujhi"};
export default function IctChapterOne(){
 return <IctChapterReader key="chapter-1" chapter={class8IctChapters[0]} chapters={class8IctChapters.map(({number,title})=>({number,title}))}/>;
}
