import {studentBookCatalog,type NctbBook} from "./nctbBooks";
import {class8IctChapters} from "./class8Ict";
import {class8BookContents} from "./class8BookContents";
import {studyGuide} from "./class8BookGuides";
import type {StudyEntry} from "./class8StudyTypes";
export type StudyBook=NctbBook&{sectionLabel:string;entries:StudyEntry[]};
const accents:Record<string,string>={"sahitya-kanika":"#8d2d29",anandapath:"#785337","bangla-grammar":"#846139","english-for-today":"#366354","english-grammar":"#42647a",mathematics:"#8b5a24",science:"#3c6b60","bangladesh-global-studies":"#896331","physical-education-health":"#32677a","work-life-education":"#77613b","agriculture-studies":"#4a683d","home-science":"#82555f","arts-crafts":"#875a82",music:"#705b8a",arabic:"#3a6c59",sanskrit:"#896139",pali:"#826427"};
export const studyBooks:StudyBook[]=studentBookCatalog["8"].map(book=>({
 ...book,accent:accents[book.id]||book.accent,
 sectionLabel:book.id.startsWith("english")?"UNIT":["sahitya-kanika","anandapath","sanskrit"].includes(book.id)?"পাঠ":"অধ্যায়",
 entries:book.id==="ict"?class8IctChapters.map(c=>({number:c.number,title:c.title,pages:c.pages,guide:{summary:c.intro,outcomes:c.lessons[0].outcomes,remember:c.lessons[0].remember,question:c.lessons[0].questions[0].prompt,answer:c.lessons[0].questions[0].answer,activity:c.lessons[0].activity,terms:c.lessons[0].terms.map(t=>[t.term,t.meaning])}})):(class8BookContents[book.id]||[]).map((entry,index)=>({...entry,number:index+1,guide:studyGuide(book.id,index)}))
}));
export const studyBookOptions=studyBooks.map(({id,title})=>({id,title}));
export const findStudyBook=(id:string)=>studyBooks.find(book=>book.id===id);
