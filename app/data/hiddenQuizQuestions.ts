"use client";

export type HiddenQuizQuestion={
  categoryEn:string;
  categoryBn:string;
  questionEn:string;
  questionBn:string;
  optionsEn:[string,string,string];
  optionsBn:[string,string,string];
  correct:number;
  explanationEn:string;
  explanationBn:string;
};

const toBn=(value:string|number)=>String(value).replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[Number(d)]);

function makeQuiz(
  categoryEn:string,categoryBn:string,
  questionEn:string,questionBn:string,
  answerEn:string,answerBn:string,
  wrong1En:string,wrong1Bn:string,
  wrong2En:string,wrong2Bn:string,
  explanationEn:string,explanationBn:string,
  seed:number
):HiddenQuizQuestion{
  const en=[answerEn,wrong1En,wrong2En] as const;
  const bn=[answerBn,wrong1Bn,wrong2Bn] as const;
  const shift=seed%3;
  const order=[0,1,2].map(i=>(i+shift)%3);
  return{
    categoryEn,categoryBn,questionEn,questionBn,
    optionsEn:order.map(i=>en[i]) as [string,string,string],
    optionsBn:order.map(i=>bn[i]) as [string,string,string],
    correct:order.indexOf(0),
    explanationEn,explanationBn
  };
}

const coreRaw=[
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "Why do we experience seasons?",
    "ঋতু পরিবর্তন কেন হয়?",
    "Earth’s axis is tilted",
    "পৃথিবীর অক্ষ হেলানো",
    "Earth moves much closer to the Sun",
    "পৃথিবী সূর্যের অনেক কাছে চলে যায়",
    "The Sun becomes colder",
    "সূর্য ঠান্ডা হয়ে যায়",
    "Earth’s axial tilt changes the angle and duration of sunlight received by each hemisphere.",
    "পৃথিবীর অক্ষের হেলানো অবস্থার কারণে দুই গোলার্ধে সূর্যালোকের কোণ ও সময়কাল বদলে যায়।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "Which planet is the hottest in the Solar System?",
    "সৌরজগতের সবচেয়ে উষ্ণ গ্রহ কোনটি?",
    "Venus",
    "শুক্র",
    "Mercury",
    "বুধ",
    "Mars",
    "মঙ্গল",
    "Venus is hottest because its dense atmosphere traps heat through a strong greenhouse effect.",
    "ঘন বায়ুমণ্ডলের শক্তিশালী greenhouse effect-এর কারণে শুক্র সবচেয়ে উষ্ণ গ্রহ।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "Which is the largest planet in the Solar System?",
    "সৌরজগতের সবচেয়ে বড় গ্রহ কোনটি?",
    "Jupiter",
    "বৃহস্পতি",
    "Saturn",
    "শনি",
    "Neptune",
    "নেপচুন",
    "Jupiter is the largest planet in our Solar System.",
    "বৃহস্পতি আমাদের সৌরজগতের সবচেয়ে বড় গ্রহ।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "About how long does sunlight take to reach Earth?",
    "সূর্যের আলো পৃথিবীতে পৌঁছাতে প্রায় কত সময় লাগে?",
    "8 minutes 20 seconds",
    "৮ মিনিট ২০ সেকেন্ড",
    "8 seconds",
    "৮ সেকেন্ড",
    "20 minutes",
    "২০ মিনিট",
    "Sunlight takes about 8 minutes and 20 seconds to travel from the Sun to Earth.",
    "সূর্য থেকে পৃথিবীতে আলো পৌঁছাতে প্রায় ৮ মিনিট ২০ সেকেন্ড লাগে।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "What is Earth’s natural satellite?",
    "পৃথিবীর প্রাকৃতিক উপগ্রহ কোনটি?",
    "The Moon",
    "চাঁদ",
    "Mars",
    "মঙ্গল",
    "Venus",
    "শুক্র",
    "The Moon is Earth’s only natural satellite.",
    "চাঁদ পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "A light-year measures what?",
    "আলোকবর্ষ কী পরিমাপ করে?",
    "Distance",
    "দূরত্ব",
    "Time",
    "সময়",
    "Brightness",
    "উজ্জ্বলতা",
    "A light-year is the distance light travels in one year.",
    "আলোকবর্ষ হলো এক বছরে আলো যে দূরত্ব অতিক্রম করে।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "What happens during a solar eclipse?",
    "সূর্যগ্রহণের সময় কী ঘটে?",
    "The Moon passes between Earth and the Sun",
    "চাঁদ পৃথিবী ও সূর্যের মাঝখানে আসে",
    "Earth passes between the Moon and the Sun",
    "পৃথিবী চাঁদ ও সূর্যের মাঝখানে আসে",
    "The Sun stops producing light",
    "সূর্য আলো তৈরি বন্ধ করে",
    "A solar eclipse occurs when the Moon blocks some or all of the Sun from Earth’s view.",
    "চাঁদ পৃথিবী থেকে সূর্যের আলো আংশিক বা সম্পূর্ণ ঢেকে দিলে সূর্যগ্রহণ হয়।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "Where is the main asteroid belt?",
    "প্রধান গ্রহাণুপুঞ্জ কোথায় অবস্থিত?",
    "Between Mars and Jupiter",
    "মঙ্গল ও বৃহস্পতির মাঝখানে",
    "Between Earth and Mars",
    "পৃথিবী ও মঙ্গলের মাঝখানে",
    "Beyond Neptune only",
    "শুধু নেপচুনের বাইরে",
    "The main asteroid belt lies between the orbits of Mars and Jupiter.",
    "প্রধান গ্রহাণুপুঞ্জ মঙ্গল ও বৃহস্পতির কক্ষপথের মাঝখানে অবস্থিত।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "What causes a lunar eclipse?",
    "চন্দ্রগ্রহণ কেন হয়?",
    "The Moon moves through Earth’s shadow",
    "চাঁদ পৃথিবীর ছায়ার মধ্যে যায়",
    "The Moon passes between Earth and the Sun",
    "চাঁদ পৃথিবী ও সূর্যের মাঝখানে আসে",
    "Mars blocks the Moon",
    "মঙ্গল চাঁদকে ঢেকে দেয়",
    "A lunar eclipse occurs when Earth’s shadow falls on the Moon.",
    "পৃথিবীর ছায়া চাঁদের ওপর পড়লে চন্দ্রগ্রহণ ঘটে।"
  ],
  [
    "Astronomy",
    "জ্যোতির্বিজ্ঞান",
    "Which galaxy contains our Solar System?",
    "আমাদের সৌরজগৎ কোন ছায়াপথে অবস্থিত?",
    "The Milky Way",
    "আকাশগঙ্গা",
    "Andromeda",
    "অ্যান্ড্রোমিডা",
    "Sombrero Galaxy",
    "সোমব্রেরো ছায়াপথ",
    "Our Solar System is inside the Milky Way galaxy.",
    "আমাদের সৌরজগৎ আকাশগঙ্গা ছায়াপথের ভেতরে অবস্থিত।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "What is the basic structural and functional unit of life?",
    "জীবনের মৌলিক গঠনগত ও কার্যগত একক কী?",
    "The cell",
    "কোষ",
    "The organ",
    "অঙ্গ",
    "The tissue only",
    "শুধু টিস্যু",
    "All living organisms are made of one or more cells, the basic units of life.",
    "সব জীব এক বা একাধিক কোষ দিয়ে গঠিত; কোষই জীবনের মৌলিক একক।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "Which organelle carries out photosynthesis in plant cells?",
    "উদ্ভিদকোষে কোন অঙ্গাণু সালোকসংশ্লেষণ করে?",
    "Chloroplast",
    "ক্লোরোপ্লাস্ট",
    "Mitochondrion",
    "মাইটোকন্ড্রিয়া",
    "Nucleus",
    "নিউক্লিয়াস",
    "Chloroplasts contain chlorophyll and carry out photosynthesis.",
    "ক্লোরোপ্লাস্টে ক্লোরোফিল থাকে এবং সেখানে সালোকসংশ্লেষণ ঘটে।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "How many chambers does the human heart have?",
    "মানুষের হৃদপিণ্ডে কয়টি প্রকোষ্ঠ আছে?",
    "4",
    "৪",
    "2",
    "২",
    "6",
    "৬",
    "The human heart has two atria and two ventricles, for a total of four chambers.",
    "মানুষের হৃদপিণ্ডে দুটি atrium ও দুটি ventricle—মোট চারটি প্রকোষ্ঠ থাকে।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "What does hemoglobin mainly carry?",
    "হিমোগ্লোবিন প্রধানত কী বহন করে?",
    "Oxygen",
    "অক্সিজেন",
    "Starch",
    "শ্বেতসার",
    "DNA",
    "DNA",
    "Hemoglobin in red blood cells binds and transports oxygen.",
    "লোহিত রক্তকণিকার হিমোগ্লোবিন অক্সিজেনের সঙ্গে যুক্ত হয়ে তা বহন করে।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "Genes are segments of what molecule?",
    "জিন কোন অণুর অংশ?",
    "DNA",
    "DNA",
    "Glucose",
    "গ্লুকোজ",
    "Water",
    "পানি",
    "Genes are sections of DNA that can influence inherited traits.",
    "জিন হলো DNA-এর অংশ, যা বংশগত বৈশিষ্ট্যে প্রভাব ফেলতে পারে।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "What happens to chromosome number in meiosis?",
    "মিয়োসিসে ক্রোমোজোম সংখ্যা কী হয়?",
    "It is reduced by half",
    "অর্ধেক হয়ে যায়",
    "It doubles permanently",
    "স্থায়ীভাবে দ্বিগুণ হয়",
    "It always becomes zero",
    "সবসময় শূন্য হয়ে যায়",
    "Meiosis produces cells with half the chromosome number of the original cell.",
    "মিয়োসিসে মূল কোষের অর্ধেক ক্রোমোজোমসংখ্যাযুক্ত কোষ তৈরি হয়।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "Whales belong to which animal group?",
    "তিমি কোন প্রাণীগোষ্ঠীর অন্তর্ভুক্ত?",
    "Mammals",
    "স্তন্যপায়ী",
    "Fish",
    "মাছ",
    "Reptiles",
    "সরীসৃপ",
    "Whales breathe air with lungs and nurse their young, so they are mammals.",
    "তিমি ফুসফুস দিয়ে শ্বাস নেয় এবং বাচ্চাকে দুধ খাওয়ায়, তাই তারা স্তন্যপায়ী।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "What is the largest organ of the human body?",
    "মানবদেহের বৃহত্তম অঙ্গ কোনটি?",
    "Skin",
    "ত্বক",
    "Heart",
    "হৃদপিণ্ড",
    "Liver",
    "যকৃত",
    "Skin is the body’s largest organ by surface area.",
    "পৃষ্ঠতলের হিসেবে ত্বক মানবদেহের বৃহত্তম অঙ্গ।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "Which cells transmit electrical and chemical signals in the nervous system?",
    "স্নায়ুতন্ত্রে কোন কোষ বৈদ্যুতিক ও রাসায়নিক সংকেত বহন করে?",
    "Neurons",
    "নিউরন",
    "Red blood cells",
    "লোহিত রক্তকণিকা",
    "Bone cells only",
    "শুধু অস্থিকোষ",
    "Neurons are specialized for transmitting information through the nervous system.",
    "নিউরন স্নায়ুতন্ত্রে তথ্য ও সংকেত পরিবহনের জন্য বিশেষায়িত কোষ।"
  ],
  [
    "Biology",
    "জীববিজ্ঞান",
    "What pigment absorbs light for photosynthesis?",
    "সালোকসংশ্লেষণের জন্য কোন রঞ্জক আলো শোষণ করে?",
    "Chlorophyll",
    "ক্লোরোফিল",
    "Hemoglobin",
    "হিমোগ্লোবিন",
    "Melanin",
    "মেলানিন",
    "Chlorophyll absorbs light energy used during photosynthesis.",
    "ক্লোরোফিল সালোকসংশ্লেষণে ব্যবহৃত আলোকশক্তি শোষণ করে।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "About what percentage of Earth’s surface is covered by water?",
    "পৃথিবীর পৃষ্ঠের প্রায় কত শতাংশ পানি দিয়ে আচ্ছাদিত?",
    "71%",
    "৭১%",
    "29%",
    "২৯%",
    "95%",
    "৯৫%",
    "About 71 percent of Earth’s surface is covered by water.",
    "পৃথিবীর পৃষ্ঠের প্রায় ৭১ শতাংশ পানি দিয়ে আচ্ছাদিত।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "Which gas makes up most of Earth’s atmosphere?",
    "পৃথিবীর বায়ুমণ্ডলে সবচেয়ে বেশি কোন গ্যাস আছে?",
    "Nitrogen",
    "নাইট্রোজেন",
    "Oxygen",
    "অক্সিজেন",
    "Carbon dioxide",
    "কার্বন ডাই-অক্সাইড",
    "Nitrogen makes up about 78 percent of Earth’s atmosphere.",
    "পৃথিবীর বায়ুমণ্ডলের প্রায় ৭৮ শতাংশ নাইট্রোজেন।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "What does climate describe?",
    "জলবায়ু কী বোঝায়?",
    "Long-term weather patterns",
    "দীর্ঘমেয়াদি আবহাওয়ার ধরণ",
    "Only today’s temperature",
    "শুধু আজকের তাপমাত্রা",
    "A single storm",
    "একটি মাত্র ঝড়",
    "Climate describes long-term patterns and averages of weather.",
    "জলবায়ু দীর্ঘমেয়াদি আবহাওয়ার ধরণ ও গড় অবস্থা বোঝায়।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "What does the equator divide Earth into?",
    "বিষুবরেখা পৃথিবীকে কীভাবে ভাগ করে?",
    "Northern and Southern Hemispheres",
    "উত্তর ও দক্ষিণ গোলার্ধে",
    "Eastern and Western continents",
    "পূর্ব ও পশ্চিম মহাদেশে",
    "Land and ocean halves",
    "স্থল ও জলভাগে",
    "The equator divides Earth into Northern and Southern Hemispheres.",
    "বিষুবরেখা পৃথিবীকে উত্তর ও দক্ষিণ গোলার্ধে ভাগ করে।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "Where do most earthquakes occur?",
    "অধিকাংশ ভূমিকম্প কোথায় ঘটে?",
    "Near tectonic plate boundaries",
    "টেকটোনিক প্লেটের সীমানার কাছে",
    "Only at the equator",
    "শুধু বিষুবরেখায়",
    "Only in deserts",
    "শুধু মরুভূমিতে",
    "Most earthquakes are associated with movement along tectonic plate boundaries.",
    "অধিকাংশ ভূমিকম্প টেকটোনিক প্লেটের সীমানায় চলাচলের সঙ্গে সম্পর্কিত।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "Clouds commonly form when water vapor does what?",
    "জলীয়বাষ্প কী করলে সাধারণত মেঘ তৈরি হয়?",
    "Condenses",
    "ঘনীভূত হয়",
    "Burns",
    "পুড়ে যায়",
    "Turns directly into rock",
    "সরাসরি শিলায় পরিণত হয়",
    "Water vapor condenses into tiny droplets or ice crystals to form clouds.",
    "জলীয়বাষ্প ঘনীভূত হয়ে ক্ষুদ্র পানিকণা বা বরফকণায় পরিণত হলে মেঘ তৈরি হয়।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "What does the ozone layer absorb much of?",
    "ওজোন স্তর কোন রশ্মির বড় অংশ শোষণ করে?",
    "Harmful ultraviolet radiation",
    "ক্ষতিকর অতিবেগুনি রশ্মি",
    "Visible red light only",
    "শুধু দৃশ্যমান লাল আলো",
    "Radio waves from Earth",
    "পৃথিবীর রেডিও তরঙ্গ",
    "The ozone layer absorbs much of the Sun’s harmful ultraviolet radiation.",
    "ওজোন স্তর সূর্যের ক্ষতিকর অতিবেগুনি রশ্মির বড় অংশ শোষণ করে।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "Which process changes liquid water into water vapor?",
    "কোন প্রক্রিয়ায় তরল পানি জলীয়বাষ্পে পরিণত হয়?",
    "Evaporation",
    "বাষ্পীভবন",
    "Condensation",
    "ঘনীভবন",
    "Freezing",
    "জমাট বাঁধা",
    "Evaporation changes liquid water into water vapor.",
    "বাষ্পীভবনে তরল পানি জলীয়বাষ্পে পরিণত হয়।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "Which is Earth’s largest ocean?",
    "পৃথিবীর বৃহত্তম মহাসাগর কোনটি?",
    "Pacific Ocean",
    "প্রশান্ত মহাসাগর",
    "Atlantic Ocean",
    "আটলান্টিক মহাসাগর",
    "Indian Ocean",
    "ভারত মহাসাগর",
    "The Pacific Ocean is the largest ocean on Earth.",
    "প্রশান্ত মহাসাগর পৃথিবীর বৃহত্তম মহাসাগর।"
  ],
  [
    "Earth science",
    "পৃথিবীবিজ্ঞান",
    "What can fossils tell us about?",
    "জীবাশ্ম আমাদের কী সম্পর্কে তথ্য দেয়?",
    "Organisms that lived in the past",
    "অতীতে বসবাসকারী জীব",
    "Only future weather",
    "শুধু ভবিষ্যতের আবহাওয়া",
    "Only modern machines",
    "শুধু আধুনিক যন্ত্র",
    "Fossils provide evidence about organisms and environments from the past.",
    "জীবাশ্ম অতীতের জীব ও পরিবেশ সম্পর্কে প্রমাণ দেয়।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "What values can one bit store?",
    "একটি বিট কোন মান সংরক্ষণ করতে পারে?",
    "0 or 1",
    "০ বা ১",
    "0 through 9",
    "০ থেকে ৯",
    "Any whole sentence",
    "যেকোনো পুরো বাক্য",
    "A bit stores one binary value: 0 or 1.",
    "একটি বিট একটি বাইনারি মান সংরক্ষণ করে: ০ বা ১।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "How many bits are in one byte?",
    "এক বাইটে কয়টি বিট থাকে?",
    "8",
    "৮",
    "2",
    "২",
    "16",
    "১৬",
    "A standard byte contains 8 bits.",
    "একটি standard byte-এ ৮ বিট থাকে।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "What is HTML mainly used for?",
    "HTML প্রধানত কী কাজে ব্যবহৃত হয়?",
    "Structuring web content",
    "ওয়েব কনটেন্টের কাঠামো তৈরি করতে",
    "Styling colors only",
    "শুধু রং সাজাতে",
    "Storing electricity",
    "বিদ্যুৎ সংরক্ষণ করতে",
    "HTML describes the structure and meaning of content on a web page.",
    "HTML ওয়েবপেজের কনটেন্টের কাঠামো ও অর্থ বর্ণনা করে।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "What is CSS mainly used for?",
    "CSS প্রধানত কী কাজে ব্যবহৃত হয়?",
    "Styling and layout",
    "স্টাইল ও লেআউট নিয়ন্ত্রণে",
    "Creating database rows only",
    "শুধু database row তৈরি করতে",
    "Replacing the internet",
    "ইন্টারনেটকে প্রতিস্থাপন করতে",
    "CSS controls the presentation and layout of web content.",
    "CSS ওয়েব কনটেন্টের উপস্থাপন ও বিন্যাস নিয়ন্ত্রণ করে।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "What can JavaScript add to a web page?",
    "JavaScript ওয়েবপেজে কী যোগ করতে পারে?",
    "Interactivity and behavior",
    "ইন্টারঅ্যাকশন ও আচরণ",
    "Only printed paper",
    "শুধু মুদ্রিত কাগজ",
    "A physical keyboard",
    "একটি শারীরিক কিবোর্ড",
    "JavaScript is commonly used to add behavior and interactivity to websites.",
    "JavaScript সাধারণত website-এ behavior ও interactivity যোগ করতে ব্যবহৃত হয়।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "What does DNS help translate?",
    "DNS কী অনুবাদ বা মিলিয়ে দিতে সাহায্য করে?",
    "Domain names to network addresses",
    "domain name-কে network address-এর সঙ্গে",
    "Images into paper",
    "ছবিকে কাগজে",
    "Passwords into usernames",
    "password-কে username-এ",
    "DNS maps human-readable domain names to network addresses.",
    "DNS মানুষের পড়ার উপযোগী domain name-কে network address-এর সঙ্গে মিলিয়ে দেয়।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "How long is an IPv4 address in bits?",
    "IPv4 address-এর দৈর্ঘ্য কত বিট?",
    "32 bits",
    "৩২ বিট",
    "8 bits",
    "৮ বিট",
    "128 bits",
    "১২৮ বিট",
    "IPv4 addresses contain 32 bits.",
    "IPv4 address-এ ৩২ বিট থাকে।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "What is a Git commit?",
    "Git commit কী?",
    "A saved snapshot of tracked changes",
    "tracked পরিবর্তনের সংরক্ষিত snapshot",
    "A type of monitor",
    "এক ধরনের monitor",
    "A Wi-Fi password",
    "একটি Wi-Fi password",
    "A commit records a snapshot of a project’s tracked state in Git history.",
    "Git history-তে commit project-এর tracked অবস্থার একটি snapshot সংরক্ষণ করে।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "What does a primary key do in a relational database?",
    "relational database-এ primary key কী করে?",
    "Uniquely identifies a row",
    "একটি row-কে আলাদাভাবে শনাক্ত করে",
    "Changes screen brightness",
    "screen brightness বদলায়",
    "Deletes every table",
    "সব table মুছে দেয়",
    "A primary key uniquely identifies each row in a table.",
    "Primary key একটি table-এর প্রতিটি row-কে আলাদাভাবে শনাক্ত করে।"
  ],
  [
    "Computing",
    "কম্পিউটিং",
    "Why is RAM called volatile memory?",
    "RAM-কে volatile memory বলা হয় কেন?",
    "Its data is normally lost when power is removed",
    "বিদ্যুৎ বন্ধ হলে সাধারণত এর data হারিয়ে যায়",
    "It can never be changed",
    "এটি কখনো পরিবর্তন করা যায় না",
    "It stores data forever without power",
    "বিদ্যুৎ ছাড়াই চিরদিন data রাখে",
    "RAM normally loses its contents when power is removed.",
    "বিদ্যুৎ বন্ধ হলে RAM সাধারণত তার সংরক্ষিত data হারায়।"
  ]
];

const coreQuizzes:HiddenQuizQuestion[]=coreRaw.map((row,i)=>makeQuiz(
  row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],i
));

const multiplicationQuizzes:HiddenQuizQuestion[]=Array.from({length:200},(_,i)=>{
  const a=i%40+2;
  const b=Math.floor(i/40)+3;
  const answer=a*b;
  return makeQuiz(
    "Math","গণিত",
    `What is ${a} × ${b}?`,`${toBn(a)} × ${toBn(b)} কত?`,
    String(answer),toBn(answer),
    String(answer+a),toBn(answer+a),
    String(answer+a+b+1),toBn(answer+a+b+1),
    `${a} multiplied by ${b} equals ${answer}.`,`${toBn(a)}-কে ${toBn(b)} দিয়ে গুণ করলে ${toBn(answer)} হয়।`,i
  );
});

const squareQuizzes:HiddenQuizQuestion[]=Array.from({length:150},(_,i)=>{
  const n=i+1,answer=n*n;
  return makeQuiz(
    "Math","গণিত",
    `What is ${n}²?`,`${toBn(n)}² কত?`,
    String(answer),toBn(answer),
    String(answer+n),toBn(answer+n),
    String(Math.max(0,answer-n)),toBn(Math.max(0,answer-n)),
    `${n}² means ${n} × ${n}, which equals ${answer}.`,`${toBn(n)}² মানে ${toBn(n)} × ${toBn(n)}, যার ফল ${toBn(answer)}।`,i+200
  );
});

const divisionQuizzes:HiddenQuizQuestion[]=Array.from({length:150},(_,i)=>{
  const divisor=i%15+2;
  const quotient=Math.floor(i/15)+2;
  const dividend=divisor*quotient;
  return makeQuiz(
    "Math","গণিত",
    `What is ${dividend} ÷ ${divisor}?`,`${toBn(dividend)} ÷ ${toBn(divisor)} কত?`,
    String(quotient),toBn(quotient),
    String(quotient+divisor),toBn(quotient+divisor),
    String(quotient+divisor+1),toBn(quotient+divisor+1),
    `${dividend} divided by ${divisor} equals ${quotient}.`,`${toBn(dividend)}-কে ${toBn(divisor)} দিয়ে ভাগ করলে ${toBn(quotient)} হয়।`,i+350
  );
});

const percentageQuizzes:HiddenQuizQuestion[]=Array.from({length:100},(_,i)=>{
  const n=i+1;
  return makeQuiz(
    "Math","গণিত",
    `What does ${n}% mean?`,`${toBn(n)}% মানে কী?`,
    `${n} out of every 100`,`প্রতি ১০০-এ ${toBn(n)}`,
    `${n} out of every 10`,`প্রতি ১০-এ ${toBn(n)}`,
    `${n} out of every 1,000`,`প্রতি ১,০০০-এ ${toBn(n)}`,
    `Percent literally means “per hundred,” so ${n}% means ${n} out of 100.`,`Percent অর্থ প্রতি একশো, তাই ${toBn(n)}% মানে প্রতি ১০০-এ ${toBn(n)}।`,i+500
  );
});

const binaryQuizzes:HiddenQuizQuestion[]=Array.from({length:100},(_,i)=>{
  const correct=i.toString(2);
  return makeQuiz(
    "Computing","কম্পিউটিং",
    `What is decimal ${i} in binary?`,`দশমিক ${toBn(i)}-এর বাইনারি রূপ কোনটি?`,
    correct,toBn(correct),
    (i+1).toString(2),toBn((i+1).toString(2)),
    (i+2).toString(2),toBn((i+2).toString(2)),
    `Decimal ${i} is written as ${correct} in base 2.`,`দশমিক ${toBn(i)}-কে base 2-তে ${toBn(correct)} লেখা হয়।`,i+600
  );
});

const elementSymbols=["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
const elementQuizzes:HiddenQuizQuestion[]=elementSymbols.map((symbol,i)=>{
  const atomic=i+1;
  return makeQuiz(
    "Chemistry","রসায়ন",
    `What is the atomic number of ${symbol}?`,`${symbol}-এর পারমাণবিক সংখ্যা কত?`,
    String(atomic),toBn(atomic),
    String(atomic+1),toBn(atomic+1),
    String(atomic+2),toBn(atomic+2),
    `${symbol} has atomic number ${atomic} in the periodic table.`,`পর্যায় সারণিতে ${symbol}-এর পারমাণবিক সংখ্যা ${toBn(atomic)}।`,i+700
  );
});

const sequenceQuizzes:HiddenQuizQuestion[]=Array.from({length:110},(_,i)=>{
  const start=i%10+1;
  const step=Math.floor(i/10)+2;
  const a=start,b=start+step,c=start+step*2,answer=start+step*3;
  return makeQuiz(
    "Patterns","ধারা",
    `What comes next: ${a}, ${b}, ${c}, …?`,`পরের সংখ্যা কোনটি: ${toBn(a)}, ${toBn(b)}, ${toBn(c)}, …?`,
    String(answer),toBn(answer),
    String(answer+1),toBn(answer+1),
    String(answer+step),toBn(answer+step),
    `The pattern adds ${step} each time, so the next number is ${answer}.`,`প্রতিবার ${toBn(step)} করে যোগ হচ্ছে, তাই পরের সংখ্যা ${toBn(answer)}।`,i+818
  );
});

const powerQuizzes:HiddenQuizQuestion[]=Array.from({length:32},(_,i)=>{
  const answer=2**i;
  return makeQuiz(
    "Computing","কম্পিউটিং",
    `What is 2^${i}?`,`২^${toBn(i)} কত?`,
    String(answer),toBn(answer),
    String(answer*2),toBn(answer*2),
    String(answer+3),toBn(answer+3),
    `2^${i} equals ${answer}.`,`২^${toBn(i)} = ${toBn(answer)}।`,i+928
  );
});

export const hiddenQuizQuestions=[
  ...coreQuizzes,
  ...multiplicationQuizzes,
  ...squareQuizzes,
  ...divisionQuizzes,
  ...percentageQuizzes,
  ...binaryQuizzes,
  ...elementQuizzes,
  ...sequenceQuizzes,
  ...powerQuizzes
];

if(hiddenQuizQuestions.length!==1000){
  throw new Error(`Expected 1000 hidden quizzes, got ${hiddenQuizQuestions.length}`);
}
