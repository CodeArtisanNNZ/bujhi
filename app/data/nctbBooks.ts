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
  "charupath":"https://drive.google.com/file/d/1QHalMQVTGi9x9g-j-ontLZcA_Q8RNtZP/view?usp=drivesdk",
  "anandapath":"https://drive.google.com/file/d/10z1mdBAXoYNBk9jzlZDMq6RGbFlrR_ff/view?usp=drivesdk",
  "bangla-grammar":"https://drive.google.com/file/d/1hHdVLQkTzL-mdKyYpUMfV7reDTm5FE7Z/view?usp=drivesdk",
  "english-for-today":"https://drive.google.com/file/d/1vET-YHVCln_lhGtbXB07pHDjHBNJPLyF/view?usp=drivesdk",
  "english-grammar":"https://drive.google.com/file/d/11ZAFpVjJ6gOzG9F8UPi0tbP4Vce59-3F/view?usp=drivesdk",
  "mathematics":"https://drive.google.com/file/d/19eUXZAjZBVfsTjd31-VPqyEZGeMHGXxg/view?usp=drivesdk",
  "ict":"https://drive.google.com/file/d/1MQqY_5kz_smw-aX7cMR1X4mZ2WvyAssT/view?usp=drivesdk",
  "bangladesh-global-studies":"https://drive.google.com/file/d/1p8j0eRYu8mFhoP1n4zuEuj-Izm0Nk6r4/view?usp=drivesdk",
  "science":"https://drive.google.com/file/d/1ZkHUFjwQ2NAL4ycZYUz_COStTUwtQwq6/view?usp=drivesdk",
  "physical-education-health":"https://drive.google.com/file/d/1etYCNo8CL7r1OQbaP2B5DAk7xv9HprLi/view?usp=drivesdk",
  "work-life-education":"https://drive.google.com/file/d/1L1PeltI0jwhNrUA3kMj-5nAhMOjG6wDt/view?usp=drivesdk",
  "agriculture-studies":"https://drive.google.com/file/d/1_Ol15Z7HZXtZrcX7udL580NkvCcx_x4S/view?usp=drivesdk",
  "home-science":"https://drive.google.com/file/d/1EIiSSHD6RRPG_S1Nl6yb_8AcKC0qzFb7/view?usp=drivesdk",
  "arts-crafts":"https://drive.google.com/file/d/1vXs_neXj65OshZuU5V67G_cB743rcA97/view?usp=drivesdk",
  "islamic-studies":"https://drive.google.com/file/d/1zIBN09f9aTgXAvQJVwjAHuK4pq0Qz7Hg/view?usp=drivesdk",
  "hindu-religion":"https://drive.google.com/file/d/1lyULgBb2smFdWuEr21ZSzMv9eHBPUJn0/view?usp=drivesdk",
  "christian-religion":"https://drive.google.com/file/d/1ZhWbC06FJ1kIYdOXFHl4Sbtev3db-mVf/view?usp=drivesdk",
  "buddhist-religion":"https://drive.google.com/file/d/18et0xv6XKyEuDh5RC4vdhNHv7esC5t1A/view?usp=drivesdk",
  "arabic":"https://drive.google.com/file/d/1-Zc0_s92XQSRx5-x6WN8E6f8Y-_nWBpd/view?usp=drivesdk",
  "sanskrit":"https://drive.google.com/file/d/1j6CAK0DLAW19GiNPMvHRfpcE1NIvmk22/view?usp=drivesdk",
  "pali":"https://drive.google.com/file/d/1TJ8Jif0hb3bajYnbqclepj4ZRf8M0Psv/view?usp=drivesdk",
  "music":"https://drive.google.com/file/d/1LHJl9gU3kuMnJ5uOiBGgXnkN_n6Tc6qB/view?usp=drivesdk"
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
  "saptabarna":"https://drive.google.com/file/d/17ChQu5Tvj6hD6KWsggx4pjUoR_KX9Vl_/view?usp=drivesdk",
  "anandapath":"https://drive.google.com/file/d/1Y-nfCjt8Q0YN0mJBVu2UI1C5K3CUori2/view?usp=drivesdk",
  "bangla-grammar":"https://drive.google.com/file/d/1cpqqrre5YrLHJre2vvYVSK9bfu7D8v1v/view?usp=drivesdk",
  "english-for-today":"https://drive.google.com/file/d/1OgV9VX7DXWa8g-k6MA0iIf57HX-x3fQz/view?usp=drivesdk",
  "english-grammar":"https://drive.google.com/file/d/1yKe2NwNZxwy3IZNR4JoRHReN7PzQ9OT1/view?usp=drivesdk",
  "mathematics":"https://drive.google.com/file/d/1CcqKeQ7p9E8G-hf5RTQ25pjm7a-bo9Fw/view?usp=drivesdk",
  "ict":"https://drive.google.com/file/d/1MxdDVWyXCmD7dIpwbgtY4ObnJODtuqm7/view?usp=drivesdk",
  "bangladesh-global-studies":"https://drive.google.com/file/d/1sKF41wo7zY3DSKsr4SAPxfiD-PKI_87n/view?usp=drivesdk",
  "science":"https://drive.google.com/file/d/1eLkWY9KMTzS2PVqvMU2N0uNZqQethiLH/view?usp=drivesdk",
  "physical-education-health":"https://drive.google.com/file/d/1_zex9LTKsbfHEqve95aSd67EXDmG2YY4/view?usp=drivesdk",
  "work-life-education":"https://drive.google.com/file/d/1N-WMPmtzvwl9vNoupSyH71I1cpxzAz6C/view?usp=drivesdk",
  "agriculture-studies":"https://drive.google.com/file/d/1vsMo_yA-sz7t1e8zcys-W3n38kti2dP0/view?usp=drivesdk",
  "home-science":"https://drive.google.com/file/d/1NO7tYD0vcSkTs1nINmG9E9vadbrsczAj/view?usp=drivesdk",
  "arts-crafts":"https://drive.google.com/file/d/1ejLWqBYVuaSJT06_EoBD9S9k-tDfYF7j/view?usp=drivesdk",
  "islamic-studies":"https://drive.google.com/file/d/1WvuEiCP7eu4-6gcsTHfQ4FUfmpTYMC7W/view?usp=drivesdk",
  "hindu-religion":"https://drive.google.com/file/d/1bWA53iVMNW82QKC-3_Dw9sel0i36uxKF/view?usp=drivesdk",
  "christian-religion":"https://drive.google.com/file/d/1hZL_C9JXDLAH3NIzcEnj25I82CESvXpX/view?usp=drivesdk",
  "buddhist-religion":"https://drive.google.com/file/d/1UGkhRDJkTXBa16klFWI2dW0_Qbol4Bfd/view?usp=drivesdk",
  "arabic":"https://drive.google.com/file/d/1a5q9UBXInpQe1Ez69di_0j0emrDU64Qn/view?usp=drivesdk",
  "sanskrit":"https://drive.google.com/file/d/1DDjOMT7xNH5vR-qb31jzw9TwwlBnGHHH/view?usp=drivesdk",
  "pali":"https://drive.google.com/file/d/1-BZBI2AzlFNvoQvuzDR47Kp9DRcvno3c/view?usp=drivesdk",
  "music":"https://drive.google.com/file/d/1zexsyGHNd8qit-tUS19-D8lL2ud2FNsD/view?usp=drivesdk"
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
  ["music","সংগীত","Music","arts"]
]).map(book=>({...book,pdfPath:class7PdfLinks[book.id]??book.pdfPath}));

const class8PdfLinks:Record<string,string>={
  "sahitya-kanika":"https://drive.google.com/file/d/10cMlVaGjf1SIv0wXK8Nw_6NHArQY_iDJ/view?usp=drivesdk",
  "anandapath":"https://drive.google.com/file/d/1P4I27E3qVXr4AEqoRzbY0OH6gAI0kHDi/view?usp=drivesdk",
  "bangla-grammar":"https://drive.google.com/file/d/1v9VMzZdYgLqidgBpFDx0vlKi0ItloGBl/view?usp=drivesdk",
  "english-for-today":"https://drive.google.com/file/d/1y6gIj2TqyaEVNUcfV6l--4aV11a1EbXZ/view?usp=drivesdk",
  "english-grammar":"https://drive.google.com/file/d/1bk6AB7T-eb8_lViIrhWznpJ5iIL_rlUn/view?usp=drivesdk",
  "mathematics":"https://drive.google.com/file/d/1Gd3eWnUsnTey63B4mjTyLfb5iYLD1J-p/view?usp=drivesdk",
  "ict":"https://drive.google.com/file/d/1KJUNAQkUGMid28Oq0gJMg1WrTeMEynkm/view?usp=drivesdk",
  "bangladesh-global-studies":"https://drive.google.com/file/d/11SB-hocEJenGpRg6XdWtEnl5APRtBnvq/view?usp=drivesdk",
  "science":"https://drive.google.com/file/d/1reVBhE4rns7mJmAOgWJRZSKUI0dIClKD/view?usp=drivesdk",
  "physical-education-health":"https://drive.google.com/file/d/1jiOVMnGttu4g1WZR9ode7gxzOYdROiej/view?usp=drivesdk",
  "work-life-education":"https://drive.google.com/file/d/1dE4iW0jzfkC-_nEdnnYmDFwhidiya04j/view?usp=drivesdk",
  "agriculture-studies":"https://drive.google.com/file/d/1T3LHwI1kvvp1v2eCxDkRjNQarUHM8-Si/view?usp=drivesdk",
  "home-science":"https://drive.google.com/file/d/1Srh0RLKbxmvvyZkFGvwurRj7e8NLPRDh/view?usp=drivesdk",
  "arts-crafts":"https://drive.google.com/file/d/1V-Y77Ul358zwF4fhWuGza4a2_TCb449H/view?usp=drivesdk",
  "islamic-studies":"https://drive.google.com/file/d/1-KIBYnlpslWbFvkTL0pAriSFW4AzQHtt/view?usp=drivesdk",
  "hindu-religion":"https://drive.google.com/file/d/1LIek1DaDUHVVxRzj-k-hIl2DJIufAdKr/view?usp=drivesdk",
  "christian-religion":"https://drive.google.com/file/d/15qLkbZiJLrdJTfkaAajngKW7vEDaIzK8/view?usp=drivesdk",
  "buddhist-religion":"https://drive.google.com/file/d/1ruh-XaLxWu6AyANbWyIii5l7bQz9-ADC/view?usp=drivesdk",
  "arabic":"https://drive.google.com/file/d/1hftVJQ7q4E2s61AvxQhq2MMlS3wIVg19/view?usp=drivesdk",
  "sanskrit":"https://drive.google.com/file/d/1OICKMfstp_8Bz-Ygz0rFGB3bPQr120aT/view?usp=drivesdk",
  "pali":"https://drive.google.com/file/d/1NCNW-vQM--QJTbgGySaLHsnl5jKTVE_U/view?usp=drivesdk",
  "music":"https://drive.google.com/file/d/1PvgBRQPqLnP1WVZx4KGjykbF8q0fsBRi/view?usp=drivesdk"
};

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
]).map(book=>({...book,pdfPath:class8PdfLinks[book.id]??book.pdfPath}));

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
  "6":"Class 6 new",
  "7":"Class 7 new",
  "8":"Class 8 new",
  "9-10":"Class 9&10"
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
