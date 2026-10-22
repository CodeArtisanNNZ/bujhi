import {class8BookContents} from "./class8BookContents";
import {studentBookCatalog} from "./nctbBooks";

type WriterProfile={id:string;name:string;englishName:string;role:string;intro:string};
export type WriterCredit="লেখা"|"অনুবাদ"|"রূপান্তর";
export type WriterReading={bookId:string;bookTitle:string;chapter:number;title:string;part?:string;pages:[number,number];href:string;credit:WriterCredit;attribution:string};
export type Class8Writer=WriterProfile&{readings:WriterReading[]};

// Names and individual credits follow the two NCTB literature books.
// Short introductions are original reading support, not textbook quotations.
const profileRows:[id:string,name:string,englishName:string,role:string,intro:string][]=[
 ["sarat-chandra-chattopadhyay","শরৎচন্দ্র চট্টোপাধ্যায়","Sarat Chandra Chattopadhyay Chatterjee","কথাসাহিত্যিক","উপন্যাস ও ছোটগল্পে মানুষের জীবন, সম্পর্ক ও মমতার কথা লিখেছেন। ‘অতিথির স্মৃতি’তে মানুষ ও প্রাণীর মধ্যে গড়ে ওঠা স্নেহের সম্পর্ককে কাছে থেকে দেখবে।"],
 ["bibhutibhushan-bandyopadhyay","বিভূতিভূষণ বন্দ্যোপাধ্যায়","Bibhutibhushan Bandyopadhyay Banerjee","কথাসাহিত্যিক","তাঁর গল্প-উপন্যাসে প্রকৃতি, গ্রামীণ জীবন ও সাধারণ মানুষের অনুভূতি বিশেষ জায়গা পেয়েছে। ‘পড়ে পাওয়া’ পড়তে গিয়ে কিশোরদের সততা ও দায়িত্ববোধ খেয়াল করো।"],
 ["kazi-nazrul-islam","কাজী নজরুল ইসলাম","Kazi Nazrul Islam","কবি, প্রাবন্ধিক ও গীতিকার","বাংলাদেশের জাতীয় কবি। মানুষের মর্যাদা, সাম্য ও অন্যায়ের বিরুদ্ধে প্রতিবাদ তাঁর লেখার গুরুত্বপূর্ণ বিষয়। এই বইয়ে তাঁর গদ্য ‘ভাব ও কাজ’ এবং কবিতা ‘নারী’ দুটিই আছে।"],
 ["motaher-hossain-chowdhury","মোতাহের হোসেন চৌধুরী","Motaher Hossain Chowdhury Hussain","প্রাবন্ধিক ও শিক্ষাবিদ","পড়া, চিন্তা ও সংস্কৃতিচর্চার গুরুত্ব নিয়ে লিখেছেন। ‘লাইব্রেরি’ প্রবন্ধে বই ও পাঠাগার কীভাবে মানুষের চিন্তার জগৎ বড় করে, তা বোঝার সুযোগ পাবে।"],
 ["manik-bandyopadhyay","মানিক বন্দ্যোপাধ্যায়","Manik Bandyopadhyay Banerjee","কথাসাহিত্যিক","মানুষের মন, জীবনসংগ্রাম ও সমাজ তাঁর গল্প-উপন্যাসের বিষয়। ‘তৈলচিত্রের ভূত’ গল্পে ভয় ও কুসংস্কারের সঙ্গে যুক্তি এবং অনুসন্ধানের পার্থক্য খুঁজে দেখো।"],
 ["mamtazuddin-ahmed","মমতাজউদ্দীন আহমদ","Mamtazuddin Ahmed Momtazuddin","নাট্যকার","নাটকের সংলাপ ও চরিত্রের মাধ্যমে সমাজ ও মানুষের আচরণ তুলে ধরেছেন। ‘সুখী মানুষ’ নাটিকায় ধনসম্পদ আর প্রকৃত সুখের সম্পর্ক নিয়ে ভাবার জায়গা আছে।"],
 ["mustafa-monwar","মুস্তাফা মনোয়ার","Mustafa Monwar Manowar","শিল্পী ও লেখক","চিত্রকলা ও পুতুলনাট্যের সঙ্গে যুক্ত শিল্পী। ‘শিল্পকলার নানা দিক’ রচনায় ছবি, নকশা ও অন্য শিল্পমাধ্যমের বৈচিত্র্যের সঙ্গে পরিচয় করিয়ে দিয়েছেন।"],
 ["bipradash-barua","বিপ্রদাশ বড়ুয়া","Bipradash Barua Barua","কথাসাহিত্যিক ও ভ্রমণলেখক","গল্প এবং ভ্রমণভিত্তিক লেখায় মানুষ, প্রকৃতি ও জীবনের নানা দিক তুলে ধরেছেন। ‘মঙডুর পথে’ পড়ার সময় ভিন্ন জনপদের জীবন ও পরিবেশের বর্ণনায় নজর দাও।"],
 ["shamsuzzaman-khan","শামসুজ্জামান খান","Shamsuzzaman Khan","লোকসংস্কৃতি গবেষক ও প্রাবন্ধিক","বাংলার লোকজ ঐতিহ্য ও সংস্কৃতি নিয়ে গবেষণা ও লেখালেখি করেছেন। ‘বাংলা নববর্ষ’ রচনায় নববর্ষের ইতিহাস ও বাঙালির সাংস্কৃতিক জীবনের যোগসূত্র খুঁজে পাবে।"],
 ["humayun-azad","হুমায়ুন আজাদ","Humayun Azad","ভাষাবিজ্ঞানী ও সাহিত্যিক","ভাষা নিয়ে গবেষণার পাশাপাশি কবিতা, প্রবন্ধ ও কথাসাহিত্য লিখেছেন। ‘বাংলা ভাষার জন্মকথা’ রচনায় বাংলা ভাষার বিকাশের পথ সহজভাবে চিনতে শেখাবে।"],
 ["lalon-shah","লালন শাহ","Lalon Shah Fakir Lalon","মরমি কবি ও গীতিকার","গানের মাধ্যমে মানুষ, মানবতা ও ভেদাভেদহীন জীবনের কথা বলেছেন। ‘মানবধর্ম’ পড়তে গিয়ে মানুষের পরিচয়কে কেবল বাহ্যিক চিহ্ন দিয়ে বিচার করার প্রশ্নটি ভাবো।"],
 ["michael-madhusudan-dutt","মাইকেল মধুসূদন দত্ত","Michael Madhusudan Dutt Datta","কবি ও নাট্যকার","বাংলা কবিতা ও নাটকে নতুন রীতি নিয়ে কাজ করেছেন। ‘বঙ্গভূমির প্রতি’ কবিতায় জন্মভূমির প্রতি ভালোবাসা ও দূরে থাকার বেদনার প্রকাশ দেখবে।"],
 ["kaykobad","কায়কোবাদ","Kaykobad Kaikobad","কবি","মহাকাব্য ও কবিতা রচনার জন্য পরিচিত। ‘প্রার্থনা’ কবিতায় স্রষ্টার কাছে মানুষের বিনয়, কৃতজ্ঞতা ও মঙ্গলের আকাঙ্ক্ষা প্রকাশ পেয়েছে।"],
 ["rabindranath-tagore","রবীন্দ্রনাথ ঠাকুর","Rabindranath Tagore Thakur","কবি, কথাসাহিত্যিক ও গীতিকার","কবিতা, গান, গল্প ও নাটকসহ সাহিত্যের নানা শাখায় লিখেছেন। ‘দুই বিঘা জমি’তে উপেনের অভিজ্ঞতার মধ্য দিয়ে ক্ষমতা, অবিচার ও ভিটেমাটির টান বুঝবে।"],
 ["kamini-roy","কামিনী রায়","Kamini Roy Ray","কবি","মানবিক অনুভূতি ও আত্মবিশ্বাস তাঁর কবিতার গুরুত্বপূর্ণ বিষয়। ‘পাছে লোকে কিছু বলে’ কবিতায় অযথা লোকলজ্জা বা সমালোচনার ভয়ে ভালো কাজ থামিয়ে না দেওয়ার কথা আছে।"],
 ["kalidas-roy","কালিদাস রায়","Kalidas Roy Ray","কবি","ইতিহাস ও মানবিক মূল্যবোধকে কবিতার কাহিনিতে রূপ দিয়েছেন। ‘বাবুরের মহত্ত্ব’ পড়ার সময় সাহসের পাশাপাশি সহমর্মিতা কীভাবে প্রকাশ পায়, তা খেয়াল করো।"],
 ["jibanananda-das","জীবনানন্দ দাশ","Jibanananda Das","কবি","বাংলার প্রকৃতি, স্মৃতি ও ফিরে আসার আকাঙ্ক্ষা তাঁর কবিতায় বারবার এসেছে। ‘আবার আসিব ফিরে’তে পাখি, নদী ও গ্রামীণ দৃশ্যের সঙ্গে কবির সম্পর্ক বোঝার চেষ্টা করো।"],
 ["jasimuddin","জসীমউদ্দীন","Jasimuddin Jasim Uddin","কবি","পল্লিকবি হিসেবে পরিচিত। গ্রামের মানুষ, লোকজ জীবন ও অনুভূতি তাঁর কবিতার বিষয়। ‘রুপাই’ পড়তে গিয়ে গ্রামীণ চরিত্রের বর্ণনা ও ভাষার সৌন্দর্য লক্ষ করো।"],
 ["buddhadeb-basu","বুদ্ধদেব বসু","Buddhadeb Basu Bose","কবি, কথাসাহিত্যিক ও প্রাবন্ধিক","কবিতার পাশাপাশি উপন্যাস, প্রবন্ধ ও সাহিত্যসমালোচনা লিখেছেন। ‘নদীর স্বপ্ন’ কবিতায় নদী ও কল্পনার জগতকে কীভাবে মিলিয়েছেন, তা খুঁজে দেখো।"],
 ["sufia-kamal","সুফিয়া কামাল","Sufia Kamal","কবি ও সমাজকর্মী","কবিতা ও সামাজিক কাজের সঙ্গে যুক্ত ছিলেন। ‘জাগো তবে অরণ্য কন্যারা’ কবিতায় জাগরণ, আত্মমর্যাদা ও নিজের শক্তিকে চিনে নেওয়ার আহ্বান শুনবে।"],
 ["sukanta-bhattacharya","সুকান্ত ভট্টাচার্য","Sukanta Bhattacharya Bhattacharyya","কবি","সাধারণ মানুষের সংগ্রাম, অধিকার ও সমতার আকাঙ্ক্ষা তাঁর কবিতার বিষয়। ‘প্রার্থী’ পড়ার সময় প্রয়োজন, বঞ্চনা ও মানুষের মর্যাদার প্রশ্নগুলো নিয়ে ভাবো।"],
 ["abdul-gaffar-chowdhury","আবদুল গাফ্‌ফার চৌধুরী","Abdul Gaffar Chowdhury","লেখক, সাংবাদিক ও গীতিকার","লেখালেখি ও সাংবাদিকতার পাশাপাশি গান লিখেছেন। ভাষা আন্দোলনের স্মৃতি বহন করা ‘একুশের গান’ তাঁর রচনা; পাঠে এর ইতিহাস ও অনুভূতি একসঙ্গে পড়বে।"],
 ["satyajit-ray","সত্যজিৎ রায়","Satyajit Ray Roy","কথাসাহিত্যিক ও চলচ্চিত্রনির্মাতা","চলচ্চিত্র নির্মাণের পাশাপাশি কিশোরদের জন্য গল্প লিখেছেন। ‘কাকতাড়ুয়া’য় পরিচিত পরিবেশের মধ্যে অচেনা ও রহস্যময় অনুভূতি কীভাবে তৈরি হয়, তা লক্ষ করো।"],
 ["zahir-raihan","জহির রায়হান","Zahir Raihan Jahir Raihan","কথাসাহিত্যিক ও চলচ্চিত্রনির্মাতা","গল্প, উপন্যাস ও চলচ্চিত্রে মানুষের জীবন এবং সামাজিক বাস্তবতা তুলে ধরেছেন। আনন্দপাঠে তাঁর ‘নয়া পত্তন’ গল্পটি পড়বে।"],
 ["hasan-azizul-haque","হাসান আজিজুল হক","Hasan Azizul Haque Huq","কথাসাহিত্যিক","মানুষের জীবন, অভিজ্ঞতা ও সামাজিক সংকট নিয়ে গল্প লিখেছেন। ‘হেমাপ্যাথি, গ্যালাপ্যাথি’তে চরিত্রের কথা ও আচরণের মধ্যে হাস্যরস এবং চিন্তার বিষয় খুঁজে দেখো।"],
 ["charles-dickens","চার্লস ডিকেন্স","Charles Dickens","ইংরেজ কথাসাহিত্যিক","ইংরেজি সাহিত্যের ঔপন্যাসিক। আনন্দপাঠের ‘ডেভিড কপারফিল্ড’ তাঁর উপন্যাস অবলম্বনে রচিত; বইয়ে আখতারুজ্জামান ইলিয়াসের বাংলা রূপান্তর পড়বে।"],
 ["akhtaruzzaman-elias","আখতারুজ্জামান ইলিয়াস","Akhtaruzzaman Elias Ilias","কথাসাহিত্যিক ও রূপান্তরকার","বাংলা উপন্যাস ও ছোটগল্প লিখেছেন। আনন্দপাঠে চার্লস ডিকেন্সের ‘ডেভিড কপারফিল্ড’ রচনাটির বাংলা রূপান্তর তাঁর নামে দেওয়া আছে।"],
 ["alex-haley","অ্যালেক্স হ্যালি","Alex Haley","মার্কিন লেখক","মানুষের ইতিহাস, পরিচয় ও স্বাধীনতার অভিজ্ঞতা নিয়ে লিখেছেন। আনন্দপাঠে তাঁর ‘মুক্তি’ রচনাটি গীতি সেনের বাংলা অনুবাদে পড়বে।"],
 ["giti-sen","গীতি সেন","Giti Sen Geeti Sen","অনুবাদক","আনন্দপাঠে অ্যালেক্স হ্যালির ‘মুক্তি’ রচনাটির বাংলা অনুবাদ তাঁর নামে দেওয়া আছে। মূল লেখক ও অনুবাদকের কাজ আলাদা করে চিনতে এই পাঠটি সাহায্য করবে।"],
 ["ghassan-kanafani","ঘাসান কানাফানি","Ghassan Kanafani Gassan","ফিলিস্তিনি কথাসাহিত্যিক","নিজ দেশ, বাস্তুচ্যুত মানুষের জীবন ও তাদের অভিজ্ঞতা নিয়ে লিখেছেন। ‘ফিলিস্তিনের চিঠি’ আনন্দপাঠে মানবেন্দ্র বন্দ্যোপাধ্যায়ের বাংলা অনুবাদে আছে।"],
 ["manabendra-bandyopadhyay","মানবেন্দ্র বন্দ্যোপাধ্যায়","Manabendra Bandyopadhyay Banerjee","অনুবাদক ও সাহিত্যিক","অনুবাদের মাধ্যমে ভিন্ন ভাষার সাহিত্য বাংলা পাঠকের কাছে এনেছেন। আনন্দপাঠে ঘাসান কানাফানির ‘ফিলিস্তিনের চিঠি’ রচনাটির বাংলা অনুবাদ তাঁর।"],
 ["jogindranath-sarkar","যোগীন্দ্রনাথ সরকার","Jogindranath Sarkar Yogindranath","শিশুসাহিত্যিক","শিশুদের জন্য ছড়া ও গল্প লিখেছেন। আনন্দপাঠে তাঁর ‘তিরন্দাজ’ গল্পটি পড়বে; কাহিনির ঘটনা ও চরিত্রের সিদ্ধান্ত অনুসরণ করে পড়ো।"],
 ["ibrahim-khan","ইব্রাহীম খাঁ","Ibrahim Khan Principal Ibrahim Khan","নাট্যকার ও প্রাবন্ধিক","নাটক ও প্রবন্ধসহ সাহিত্যের বিভিন্ন শাখায় লিখেছেন। ‘মানসিংহ ও ঈসা খাঁ’ নাটকে ইতিহাসের চরিত্রকে সংলাপের মাধ্যমে কীভাবে তুলে ধরা হয়, তা দেখবে।"],
 ["syed-mujtaba-ali","সৈয়দ মুজতবা আলী","Syed Mujtaba Ali","ভ্রমণলেখক ও কথাসাহিত্যিক","ভ্রমণের অভিজ্ঞতা, মানুষ ও সংস্কৃতি নিয়ে লিখেছেন। ‘কাবুলের শেষ প্রহরে’ পড়ার সময় আফগানিস্তানের পরিবেশ ও মানুষের অভিজ্ঞতার বর্ণনায় নজর দাও।"]
];

export const class8LiteratureBooks=studentBookCatalog["8"].filter(book=>book.id==="sahitya-kanika"||book.id==="anandapath").map(({id,title,pdfPath})=>({id,title,pdfPath}));
export const class8LiteratureReadings=class8LiteratureBooks.flatMap(book=>(class8BookContents[book.id]||[]).map((entry,index)=>({...entry,bookId:book.id,bookTitle:book.title,chapter:index+1,href:`/learn/class-8/${book.id}/chapter-${index+1}`})));

function contributors(author:string):{name:string;credit:WriterCredit}[]{
 if(author==="সংকলিত")return [];
 const [original,...others]=author.split(" · ");
 return [{name:original,credit:"লেখা"},...others.map(value=>{const [credit,name]=value.split(": ");return {name,credit:credit as WriterCredit};})];
}

export const class8Contributors:Class8Writer[]=profileRows.map(([id,name,englishName,role,intro])=>({id,name,englishName,role,intro,readings:class8LiteratureReadings.flatMap(reading=>contributors(reading.author||"সংকলিত").filter(person=>person.name===name).map(({credit})=>({bookId:reading.bookId,bookTitle:reading.bookTitle,chapter:reading.chapter,title:reading.title,part:reading.part,pages:reading.pages,href:reading.href,credit,attribution:reading.author||""})))}));
export const class8Writers=class8Contributors.filter(writer=>writer.readings.some(reading=>reading.credit==="লেখা"));
export const class8CompiledReadings=class8LiteratureReadings.filter(reading=>reading.author==="সংকলিত");
export const class8WritersForReading=(bookId:string,chapter:number)=>class8Writers.filter(writer=>writer.readings.some(reading=>reading.bookId===bookId&&reading.chapter===chapter));
export const class8ContributorsForReading=(bookId:string,chapter:number)=>class8Contributors.filter(writer=>writer.readings.some(reading=>reading.bookId===bookId&&reading.chapter===chapter));
export const class8WritersForBook=(bookId:string)=>class8Writers.filter(writer=>writer.readings.some(reading=>reading.bookId===bookId));
