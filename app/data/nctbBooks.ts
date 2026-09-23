export type StudentClassKey="6"|"7"|"8"|"9-10";

export type NctbBook={
  id:string;
  title:string;
  englishTitle:string;
  category:"core"|"choice"|"religion"|"group"|"language"|"arts";
  glyph:string;
  accent:string;
  pdfPath:string;
};

const palette=["#8d2d29","#98453f","#65523e","#49634d","#48656b","#52685a","#735d49","#596849","#915449","#a36e3f","#526b72","#765b48","#566b59","#4d6788","#8e332f","#a77534","#665574"];

function slugPath(classKey:StudentClassKey,id:string){
  return `/nctb/2026/class-${classKey}/${id}.pdf`;
}

function makeBooks(
  classKey:StudentClassKey,
  rows:Array<[string,string,string,NctbBook["category"]]>
):NctbBook[]{
  return rows.map(([id,title,englishTitle,category],index)=>({
    id,
    title,
    englishTitle,
    category,
    glyph:/^[A-Za-z]/.test(title)?title.slice(0,2):Array.from(title)[0]||"ব",
    accent:palette[index%palette.length],
    pdfPath:slugPath(classKey,id)
  }));
}

// Public, read-only PDFs in the Bujhi team share.
const class6PdfLinks:Record<string,string>={
  "charupath":"https://drive.google.com/file/d/144rmgBY3xu657D5yUTXkAArm7Yi91GXb/view?usp=drivesdk",
  "anandapath":"https://drive.google.com/file/d/1paAfrGovgrxEHWYK17-nk7NWMLPfFq92/view?usp=drivesdk",
  "bangla-grammar":"https://drive.google.com/file/d/1UM0fFLCYLPHbZRZ8pIniyqLpXuWb8rV5/view?usp=drivesdk",
  "english-for-today":"https://drive.google.com/file/d/1SJ_yZzoJckOFoHV5C7CDn1WAx7qResFZ/view?usp=drivesdk",
  "english-grammar":"https://drive.google.com/file/d/1g7pfZywDEbd5kpzV9Q_y-YP7DbQoTLm1/view?usp=drivesdk",
  "mathematics":"https://drive.google.com/file/d/1ae_2zPG-JyD6wmQnALD3d91Ic7ig24Fo/view?usp=drivesdk",
  "ict":"https://drive.google.com/file/d/1e0CM2eDN76QRXctG_sJ92NKDiWzgKhgT/view?usp=drivesdk",
  "bangladesh-global-studies":"https://drive.google.com/file/d/19sIvM9Q1p8w1EOdDORzxN8jbz-bHOkNC/view?usp=drivesdk",
  "science":"https://drive.google.com/file/d/18gqCrzC0GEHiq6wHBWJgwVG8vym8jPgt/view?usp=drivesdk",
  "physical-education-health":"https://drive.google.com/file/d/1-hpynKV8mFFJFrZlkONIgJxZsCvUuAXW/view?usp=drivesdk",
  "work-life-education":"https://drive.google.com/file/d/1ifXsYhEMLftjXzUrStAYeViFdEVrXyiH/view?usp=drivesdk",
  "agriculture-studies":"https://drive.google.com/file/d/1eTWQxRjcpEIrJbdm3DrUU-GrzgRSG4WA/view?usp=drivesdk",
  "home-science":"https://drive.google.com/file/d/1L6mnps1yknapDBMCwYnfuw9cxqA4wrEB/view?usp=drivesdk",
  "arts-crafts":"https://drive.google.com/file/d/1kr62LYBZ1FZ7ar-NWU_wcXgz5Jy3bHBq/view?usp=drivesdk",
  "islamic-studies":"https://drive.google.com/file/d/1DwhVg2M_RA98MWpgaI9sLLDYfFkmjtJo/view?usp=drivesdk",
  "hindu-religion":"https://drive.google.com/file/d/1Q72B-wc2OXrF0zvJccyg9Af2qTzYiXX1/view?usp=drivesdk",
  "christian-religion":"https://drive.google.com/file/d/1MfcBrerFaTN8Z0QLXjzzOq1jxcHe8nLH/view?usp=drivesdk",
  "buddhist-religion":"https://drive.google.com/file/d/1wERugrZyDORBn205A3pu9R91FzSVV9dU/view?usp=drivesdk",
  "arabic":"https://drive.google.com/file/d/1grmtL9twHlq7kNR3EcwTOHN-AiMLdk3N/view?usp=drivesdk",
  "sanskrit":"https://drive.google.com/file/d/1vWTPHX-ipDSfHfcOtbv7SZnD8hk6cl7I/view?usp=drivesdk",
  "pali":"https://drive.google.com/file/d/13SoN3pZobHQCr6FgYwmUEVvskX27I1Vg/view?usp=drivesdk",
  "music":"https://drive.google.com/file/d/1e3gFxZbMv3aSYhwq88A4eSjsDrw31x_z/view?usp=drivesdk"
};

const class6=makeBooks("6",[
  ["charupath","চারুপাঠ","Charupath","core"],
  ["anandapath","আনন্দপাঠ","Anandapath","core"],
  ["bangla-grammar","বাংলা ব্যাকরণ ও নির্মিতি","Bangla Grammar and Composition","core"],
  ["english-for-today","English for Today","English for Today","core"],
  ["english-grammar","English Grammar and Composition","English Grammar and Composition","core"],
  ["mathematics","গণিত","Mathematics","core"],
  ["ict","তথ্য ও যোগাযোগ প্রযুক্তি","Information and Communication Technology","core"],
  ["bangladesh-global-studies","বাংলাদেশ ও বিশ্বপরিচয়","Bangladesh and Global Studies","core"],
  ["science","বিজ্ঞান","Science","core"],
  ["physical-education-health","শারীরিক শিক্ষা ও স্বাস্থ্য","Physical Education and Health","core"],
  ["work-life-education","কর্ম ও জীবনমুখী শিক্ষা","Work and Life Oriented Education","choice"],
  ["agriculture-studies","কৃষিশিক্ষা","Agriculture Studies","choice"],
  ["home-science","গার্হস্থ্যবিজ্ঞান","Home Science","choice"],
  ["arts-crafts","চারু ও কারুকলা","Arts and Crafts","arts"],
  ["islamic-studies","ইসলাম শিক্ষা","Islamic Studies","religion"],
  ["hindu-religion","হিন্দুধর্ম শিক্ষা","Hindu Religion Education","religion"],
  ["christian-religion","খ্রীষ্টধর্ম শিক্ষা","Christian Religion Education","religion"],
  ["buddhist-religion","বৌদ্ধধর্ম শিক্ষা","Buddhist Religion Education","religion"],
  ["arabic","সচিত্র আরবি পাঠ","Illustrated Arabic","language"],
  ["sanskrit","সংস্কৃত","Sanskrit","language"],
  ["pali","পালি","Pali","language"],
  ["music","সংগীত","Music","arts"]
]).map(book=>({...book,pdfPath:class6PdfLinks[book.id]}));

const class7PdfLinks:Record<string,string>={
  "saptabarna":"https://drive.google.com/file/d/1-j4SQrkQjd11Yg79baZ95gyxzMwYOEzk/view?usp=drivesdk",
  "anandapath":"https://drive.google.com/file/d/1CRW3Vy42E7Wn6ar8A56w8g_HsJJEjje8/view?usp=drivesdk",
  "bangla-grammar":"https://drive.google.com/file/d/1rCJiblvCMUP5losLqxtiWGASVSCQd9u6/view?usp=drivesdk",
  "english-for-today":"https://drive.google.com/file/d/1jH37OHy015EsE5o6lHmKYb360Kj9ckl8/view?usp=drivesdk",
  "english-grammar":"https://drive.google.com/file/d/1tEGF-A9ccivx5ekjLIvrRcHDk-sosmhk/view?usp=drivesdk",
  "mathematics":"https://drive.google.com/file/d/1rKJpmV90uhu8m6sMX2iZc1pysW0BaUsx/view?usp=drivesdk",
  "ict":"https://drive.google.com/file/d/1_XsjHpkKA3Uu716In7ijXrJf8ggBrz-m/view?usp=drivesdk",
  "bangladesh-global-studies":"https://drive.google.com/file/d/1gp286ybEfxhLemQZPrlZMG_StDtPtcRK/view?usp=drivesdk",
  "science":"https://drive.google.com/file/d/1g6zRqT0xKHQmzY2cjYfkKBEdtxkH5oDY/view?usp=drivesdk",
  "physical-education-health":"https://drive.google.com/file/d/1QNx-_x3J4BLOcM6E4lLgmHQrChSp2AWR/view?usp=drivesdk",
  "work-life-education":"https://drive.google.com/file/d/1vvjy62uRD2sqhLl3j4svyPmsfDe_fn0r/view?usp=drivesdk",
  "agriculture-studies":"https://drive.google.com/file/d/1EFwTT1YVBUKQybkmHrrOuwsYZny_t6Cx/view?usp=drivesdk",
  "home-science":"https://drive.google.com/file/d/1PJfDoEHMPrQM5WSPDRrQ8MD3k_WMbq-g/view?usp=drivesdk",
  "arts-crafts":"https://drive.google.com/file/d/1z5k5ilLiuh9M0YIpf4eyYp1at_UR_Ln4/view?usp=drivesdk",
  "islamic-studies":"https://drive.google.com/file/d/1T-YBlZBUwAYVxXD6xyPCPyrBIPynYqv-/view?usp=drivesdk",
  "hindu-religion":"https://drive.google.com/file/d/16mpJi-cGjCX9MdK564GUyjTgNjh2kpo4/view?usp=drivesdk",
  "christian-religion":"https://drive.google.com/file/d/1fc5-SpbUYjt4oSF0hRAZwSAkRZdtod7Y/view?usp=drivesdk",
  "buddhist-religion":"https://drive.google.com/file/d/1u3kdQrp49o4RgRZZ_dgDC8PoeFoxL_V3/view?usp=drivesdk",
  "arabic":"https://drive.google.com/file/d/1JNem4aPdUCK-YUKetzdajF1rH1KjKWKg/view?usp=drivesdk",
  "sanskrit":"https://drive.google.com/file/d/1mI1-p5mgKUe9Tl6h1bR21zvZ7W3kwMdc/view?usp=drivesdk",
  "pali":"https://drive.google.com/file/d/1I5TKlf-J_jerIKx6NvIlU-ivaWoDF1ns/view?usp=drivesdk",
  "music":"https://drive.google.com/file/d/1JoSBjirNGE02YQ3jaNaOr4LykXTen1CK/view?usp=drivesdk"
};

const class7=makeBooks("7",[
  ["saptabarna","সপ্তবর্ণা","Saptabarna","core"],
  ["anandapath","আনন্দপাঠ","Anandapath","core"],
  ["bangla-grammar","বাংলা ব্যাকরণ ও নির্মিতি","Bangla Grammar and Composition","core"],
  ["english-for-today","English For Today","English For Today","core"],
  ["english-grammar","English Grammar and Composition","English Grammar and Composition","core"],
  ["mathematics","গণিত","Mathematics","core"],
  ["ict","তথ্য ও যোগাযোগ প্রযুক্তি","Information and Communication Technology","core"],
  ["bangladesh-global-studies","বাংলাদেশ ও বিশ্বপরিচয়","Bangladesh and Global Studies","core"],
  ["science","বিজ্ঞান","Science","core"],
  ["physical-education-health","শারীরিক শিক্ষা ও স্বাস্থ্য","Physical Education and Health","core"],
  ["work-life-education","কর্ম ও জীবনমুখী শিক্ষা","Work and Life Oriented Education","choice"],
  ["agriculture-studies","কৃষিশিক্ষা","Agriculture Studies","choice"],
  ["home-science","গার্হস্থ্যবিজ্ঞান","Home Science","choice"],
  ["arts-crafts","চারু ও কারুকলা","Arts and Crafts","arts"],
  ["islamic-studies","ইসলাম শিক্ষা","Islamic Studies","religion"],
  ["hindu-religion","হিন্দুধর্ম শিক্ষা","Hindu Religion Education","religion"],
  ["christian-religion","খ্রীষ্টধর্ম শিক্ষা","Christian Religion Education","religion"],
  ["buddhist-religion","বৌদ্ধধর্ম শিক্ষা","Buddhist Religion Education","religion"],
  ["arabic","সহজ আরবি পাঠ","Easy Arabic","language"],
  ["sanskrit","সংস্কৃত","Sanskrit","language"],
  ["pali","পালি","Pali","language"],
  ["music","সংগীত","Music","arts"],
  ["minority-language-culture","ক্ষুদ্র নৃগোষ্ঠীর ভাষা ও সংস্কৃতি","Minority Language and Culture","language"]
]).map(book=>({...book,pdfPath:class7PdfLinks[book.id]??book.pdfPath}));

const class8=makeBooks("8",[
  ["sahitya-kanika","সাহিত্য-কণিকা","Sahitya Kanika","core"],
  ["anandapath","আনন্দপাঠ","Anandapath","core"],
  ["bangla-grammar","বাংলা ব্যাকরণ ও নির্মিতি","Bangla Grammar and Composition","core"],
  ["english-for-today","English For Today","English For Today","core"],
  ["english-grammar","English Grammar and Composition","English Grammar and Composition","core"],
  ["mathematics","গণিত","Mathematics","core"],
  ["ict","তথ্য ও যোগাযোগ প্রযুক্তি","Information and Communication Technology","core"],
  ["bangladesh-global-studies","বাংলাদেশ ও বিশ্বপরিচয়","Bangladesh and Global Studies","core"],
  ["science","বিজ্ঞান","Science","core"],
  ["physical-education-health","শারীরিক শিক্ষা ও স্বাস্থ্য","Physical Education and Health","core"],
  ["work-life-education","কর্ম ও জীবনমুখী শিক্ষা","Work and Life Oriented Education","choice"],
  ["agriculture-studies","কৃষিশিক্ষা","Agriculture Studies","choice"],
  ["home-science","গার্হস্থ্যবিজ্ঞান","Home Science","choice"],
  ["arts-crafts","চারু ও কারুকলা","Arts and Crafts","arts"],
  ["islamic-studies","ইসলাম শিক্ষা","Islamic Studies","religion"],
  ["hindu-religion","হিন্দুধর্ম শিক্ষা","Hindu Religion Education","religion"],
  ["christian-religion","খ্রীষ্টধর্ম শিক্ষা","Christian Religion Education","religion"],
  ["buddhist-religion","বৌদ্ধধর্ম শিক্ষা","Buddhist Religion Education","religion"],
  ["arabic","সহজ আরবি পাঠ","Easy Arabic","language"],
  ["sanskrit","সংস্কৃত","Sanskrit","language"],
  ["pali","পালি","Pali","language"],
  ["music","সংগীত","Music","arts"]
]);

const class910=makeBooks("9-10",[
  ["bangla-literature","বাংলা সাহিত্য","Bangla Literature","core"],
  ["bangla-sahapath","বাংলা সহপাঠ","Bangla Sahapath","core"],
  ["bangla-language-grammar","বাংলা ভাষার ব্যাকরণ ও নির্মিতি","Bangla Language Grammar and Composition","core"],
  ["english-for-today","English For Today","English For Today","core"],
  ["english-grammar","English Grammar and Composition","English Grammar and Composition","core"],
  ["mathematics","গণিত","Mathematics","core"],
  ["ict","তথ্য ও যোগাযোগ প্রযুক্তি","Information and Communication Technology","core"],
  ["science","বিজ্ঞান","Science","group"],
  ["physics","পদার্থবিজ্ঞান","Physics","group"],
  ["chemistry","রসায়ন","Chemistry","group"],
  ["biology","জীববিজ্ঞান","Biology","group"],
  ["higher-mathematics","উচ্চতর গণিত","Higher Mathematics","group"],
  ["geography-environment","ভূগোল ও পরিবেশ","Geography and Environment","group"],
  ["economics","অর্থনীতি","Economics","group"],
  ["agriculture-studies","কৃষিশিক্ষা","Agriculture Studies","choice"],
  ["home-science","গার্হস্থ্যবিজ্ঞান","Home Science","choice"],
  ["civics-citizenship","পৌরনীতি ও নাগরিকতা","Civics and Citizenship","group"],
  ["accounting","হিসাববিজ্ঞান","Accounting","group"],
  ["finance-banking","ফিন্যান্স ও ব্যাংকিং","Finance and Banking","group"],
  ["business-entrepreneurship","ব্যবসায় উদ্যোগ","Business Entrepreneurship","group"],
  ["islamic-studies","ইসলাম শিক্ষা","Islamic Studies","religion"],
  ["hindu-religion","হিন্দুধর্ম শিক্ষা","Hindu Religion Education","religion"],
  ["buddhist-religion","বৌদ্ধধর্ম শিক্ষা","Buddhist Religion Education","religion"],
  ["christian-religion","খ্রীষ্টধর্ম শিক্ষা","Christian Religion Education","religion"],
  ["career-education","ক্যারিয়ার শিক্ষা","Career Education","core"],
  ["bangladesh-global-studies","বাংলাদেশ ও বিশ্বপরিচয়","Bangladesh and Global Studies","group"],
  ["arts-crafts","চারু ও কারুকলা","Arts and Crafts","arts"],
  ["history-bangladesh-world","বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা","History of Bangladesh and World Civilization","group"],
  ["physical-education-sports","শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা","Physical Education, Health Science and Sports","core"],
  ["arabic","আরবি","Arabic","language"],
  ["sanskrit","সংস্কৃত","Sanskrit","language"],
  ["pali","পালি","Pali","language"],
  ["music","সংগীত","Music","arts"]
]);

export const studentBookCatalog:Record<StudentClassKey,NctbBook[]>={
  "6":class6,
  "7":class7,
  "8":class8,
  "9-10":class910
};

export const studentClassLabels:Record<StudentClassKey,string>={
  "6":"Class 6",
  "7":"Class 7",
  "8":"Class 8",
  "9-10":"Class 9–10"
};

export function studentClassKey(level?:string|null):StudentClassKey{
  if(level==="6")return "6";
  if(level==="7")return "7";
  if(level==="9"||level==="10"||level==="9-10")return "9-10";
  return "8";
}

export function findNctbBook(classKey:StudentClassKey,bookId:string){
  return studentBookCatalog[classKey].find(book=>book.id===bookId);
}
