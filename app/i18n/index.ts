import {generatedPairs} from "./generatedPairs";
import {chapterPairs} from "./chapterPairs";
import {guidePairs} from "./guidePairs";
import {extraPairs} from "./extraPairs";
import {studentBookCatalog,type NctbBook} from "../data/nctbBooks";
export type Language="en"|"bn";
const banglaBooks=new Set(["charupath","saptabarna","sahitya-kanika","anandapath","bangla-grammar","bangla-literature","bangla-sahapath","bangla-language-grammar"]);
export function fixedBookLanguage(id:string):Language|null{return id.startsWith("english")?"en":banglaBooks.has(id)?"bn":null;}
export function bookLanguage(id:string,language:Language):Language{return fixedBookLanguage(id)||language;}
export function bookTitle(book:Pick<NctbBook,"id"|"title"|"englishTitle">,language:Language){return fixedBookLanguage(book.id)?book.title:language==="en"?book.englishTitle:book.title;}
const pairs=[...generatedPairs,...extraPairs,...chapterPairs,...guidePairs];
for(const books of Object.values(studentBookCatalog))for(const book of books)if(!fixedBookLanguage(book.id))pairs.push([book.englishTitle,book.title]);
const en=new Map<string,string>(),bn=new Map<string,string>();
export const normalize=(text:string)=>text.trim().replace(/\s+/g," ").normalize("NFC").replace(/\u09af\u09bc/g,"\u09df").replace(/\u09a1\u09bc/g,"\u09dc").replace(/\u09a2\u09bc/g,"\u09dd");
for(const [english,bangla] of pairs){en.set(normalize(bangla),english);bn.set(normalize(english).toLowerCase(),bangla);}
export function translate(text:string,language:Language):string{
 const leading=text.match(/^\s*/)?.[0]||"",trailing=text.match(/\s*$/)?.[0]||"";
 const original=normalize(text);if(!original)return text;
 const direct=(s:string)=>language==="en"?en.get(normalize(s)):bn.get(normalize(s).toLowerCase());
 const exact=direct(original);if(exact)return leading+exact+trailing;
 let value=original;
 if(language==="en"){
  value=value.replace(/[০-৯]/g,c=>String(c.charCodeAt(0)-0x09e6)).replace(/\bClass ([\d&–-]+) new\b/g,"Class $1");
  const exactDigits=direct(value);if(exactDigits)return leading+exactDigits+trailing;
  value=value.replace(/^(\d+)টি (পাঠ্যবই|বই|পাঠ-অংশ|অধ্যায়|নামযুক্ত পাঠ-অংশ)$/,(_,n,kind)=>`${n} ${kind==="বই"?"books":kind==="পাঠ্যবই"?"textbooks":kind==="অধ্যায়"?"chapters":"sections"}`)
   .replace(/^টি পাঠ-অংশ$/," sections")
   .replace(/^টি বই$/," books")
   .replace(/^শ্রেণি ([\d–&-]+)(?: new)?$/,"Class $1")
   .replace(/^অধ্যা[য়য়] (\d+)$/,"Chapter $1")
   .replace(/^পাঠ (\d+)$/,"Lesson $1")
   .replace(/^(.+?) (PDF )?খোলো$/,(_,name,pdf)=>`Open ${direct(name)||name}${pdf?" PDF":""}`)
   .replace(/^Class ([\d&–-]+)(?: new)? folder খোলো$/,"Open Class $1 folder")
   .replace(/^Class ([\d&–-]+) new$/,"Class $1")
   .replace(/^(.+) বোঝা$/,(_,concept)=>`Understand ${direct(concept)||concept}`)
   .replace(/^এই পাঠে “(.+)” বলতে কী বোঝায়\?$/,(_,concept)=>`What does “${direct(concept)||concept}” mean in this lesson?`)
   .replace(/^(.+)টি পাঠ-অংশ · পড়া শুরু করি →$/,(_,n)=>`${n} sections · Start learning →`)
   .replace(/^বইয়ের পৃষ্ঠা /,"Textbook pages ")
   .replace(/^পৃষ্ঠা /,"Pages ")
   .replace(/^বইয়ের পাঠ /,"Textbook lessons ")
   .replace(/^পাঠ (\d+)–(\d+)$/,"Lessons $1–$2")
   .replace(/^\/500 · এই ডিভাইসে স্বয়ংক্রিয়ভাবে সংরক্ষিত$/,"/500 · Saved automatically on this device");
 }else{
  value=value.replace(/^(\d+) books$/,"$1টি বই").replace(/^Class ([\d&–-]+)(?: new)? bookshelf$/,"শ্রেণি $1-এর বইয়ের তাক").replace(/^Bujhi Class ([\d&–-]+)(?: new)? study desk$/,"বুঝি শ্রেণি $1 পড়ার ডেস্ক").replace(/^Class ([\d&–-]+)(?: new)?$/,"শ্রেণি $1").replace(/^Class ([\d&–-]+) folder$/,"শ্রেণি $1 ফোল্ডার")
   .replace(/^Open Class ([\d&–-]+)$/,"শ্রেণি $1 খোলো").replace(/^Chapter (\d+)$/,"অধ্যায় $1")
   .replace(/^Back to Class ([\d&–-]+) desk$/,"শ্রেণি $1 ডেস্কে ফিরি")
   .replace(/^Open (.+)$/,(_,name)=>`${direct(name)||name} খোলো`);
 }
 // Translate composed labels without replacing individual words inside prose.
 if(/[·|→]/.test(value))value=value.split(/(\s*[·|→]\s*)/).map(part=>/^[\s·|→]+$/.test(part)?part:translate(part,language)).join("");
 return leading+(direct(value)||value)+trailing;
}
const identifiers=new Set(["id","bookId","href","url","pdfPath","pdfUrl","catalogUrl","src","image","accent","category","englishTitle","glyph","key","type","kind","mode","value","storageKey"]);
export function localizeDeep<T>(value:T,language:Language):T{
 if(typeof value==="string")return translate(value,language) as T;
 if(Array.isArray(value))return value.map(item=>localizeDeep(item,language)) as T;
 if(value&&typeof value==="object")return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,identifiers.has(key)?item:localizeDeep(item,language)])) as T;
 return value;
}
export function localizeBook<T extends NctbBook>(book:T,language:Language):T{
 if(fixedBookLanguage(book.id))return book;
 return {...localizeDeep(book,language),title:bookTitle(book,language)};
}
