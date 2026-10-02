"use client";

export type OpenThoughtFact={en:string;bn:string};

const coreFacts:OpenThoughtFact[]=[
  {
    "en": "Astronomy · The Sun is a star.",
    "bn": "জ্যোতির্বিজ্ঞান · সূর্য একটি নক্ষত্র।"
  },
  {
    "en": "Astronomy · Earth is the third planet from the Sun.",
    "bn": "জ্যোতির্বিজ্ঞান · পৃথিবী সূর্য থেকে তৃতীয় গ্রহ।"
  },
  {
    "en": "Astronomy · The Solar System has eight recognized planets.",
    "bn": "জ্যোতির্বিজ্ঞান · সৌরজগতে স্বীকৃত আটটি গ্রহ আছে।"
  },
  {
    "en": "Astronomy · The Moon is Earth's only natural satellite.",
    "bn": "জ্যোতির্বিজ্ঞান · চাঁদ পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ।"
  },
  {
    "en": "Astronomy · Mercury is the closest planet to the Sun.",
    "bn": "জ্যোতির্বিজ্ঞান · বুধ সূর্যের সবচেয়ে কাছের গ্রহ।"
  },
  {
    "en": "Astronomy · Venus is the hottest planet in the Solar System.",
    "bn": "জ্যোতির্বিজ্ঞান · শুক্র সৌরজগতের সবচেয়ে উষ্ণ গ্রহ।"
  },
  {
    "en": "Astronomy · Mars looks reddish because iron minerals on its surface have oxidized.",
    "bn": "জ্যোতির্বিজ্ঞান · মঙ্গলের পৃষ্ঠের লৌহ খনিজ জারিত হওয়ায় গ্রহটি লালচে দেখায়।"
  },
  {
    "en": "Astronomy · Jupiter is the largest planet in the Solar System.",
    "bn": "জ্যোতির্বিজ্ঞান · বৃহস্পতি সৌরজগতের সবচেয়ে বড় গ্রহ।"
  },
  {
    "en": "Astronomy · Saturn's rings are made mostly of ice particles with some rock and dust.",
    "bn": "জ্যোতির্বিজ্ঞান · শনির বলয় মূলত বরফের কণা, সঙ্গে কিছু শিলা ও ধূলিকণা দিয়ে তৈরি।"
  },
  {
    "en": "Astronomy · Uranus rotates with an extreme axial tilt, so it appears to roll around the Sun.",
    "bn": "জ্যোতির্বিজ্ঞান · ইউরেনাসের অক্ষ অত্যন্ত হেলানো, তাই সূর্যকে প্রদক্ষিণের সময় তাকে গড়িয়ে চলার মতো মনে হয়।"
  },
  {
    "en": "Astronomy · Neptune is the farthest recognized planet from the Sun.",
    "bn": "জ্যোতির্বিজ্ঞান · নেপচুন সূর্য থেকে সবচেয়ে দূরের স্বীকৃত গ্রহ।"
  },
  {
    "en": "Astronomy · Sunlight takes about 8 minutes and 20 seconds to reach Earth.",
    "bn": "জ্যোতির্বিজ্ঞান · সূর্যের আলো পৃথিবীতে পৌঁছাতে প্রায় ৮ মিনিট ২০ সেকেন্ড লাগে।"
  },
  {
    "en": "Astronomy · The Milky Way is the galaxy that contains our Solar System.",
    "bn": "জ্যোতির্বিজ্ঞান · আমাদের সৌরজগৎ আকাশগঙ্গা ছায়াপথে অবস্থিত।"
  },
  {
    "en": "Astronomy · A light-year is a unit of distance, not time.",
    "bn": "জ্যোতির্বিজ্ঞান · আলোকবর্ষ সময়ের নয়, দূরত্বের একক।"
  },
  {
    "en": "Astronomy · Comets are made largely of ice, dust, and rocky material.",
    "bn": "জ্যোতির্বিজ্ঞান · ধূমকেতু মূলত বরফ, ধূলিকণা ও শিলাময় পদার্থ দিয়ে গঠিত।"
  },
  {
    "en": "Astronomy · The main asteroid belt lies between Mars and Jupiter.",
    "bn": "জ্যোতির্বিজ্ঞান · প্রধান গ্রহাণুপুঞ্জ মঙ্গল ও বৃহস্পতির মাঝখানে অবস্থিত।"
  },
  {
    "en": "Astronomy · A solar eclipse occurs when the Moon passes between Earth and the Sun.",
    "bn": "জ্যোতির্বিজ্ঞান · চাঁদ পৃথিবী ও সূর্যের মাঝখানে এলে সূর্যগ্রহণ ঘটে।"
  },
  {
    "en": "Astronomy · A lunar eclipse occurs when the Moon moves through Earth's shadow.",
    "bn": "জ্যোতির্বিজ্ঞান · চাঁদ পৃথিবীর ছায়ার মধ্য দিয়ে গেলে চন্দ্রগ্রহণ ঘটে।"
  },
  {
    "en": "Astronomy · Earth's seasons are caused mainly by the tilt of Earth's axis.",
    "bn": "জ্যোতির্বিজ্ঞান · পৃথিবীর ঋতু পরিবর্তনের প্রধান কারণ পৃথিবীর অক্ষের হেলানো অবস্থা।"
  },
  {
    "en": "Astronomy · Gravity keeps planets in orbit around the Sun.",
    "bn": "জ্যোতির্বিজ্ঞান · মহাকর্ষ গ্রহগুলোকে সূর্যের চারদিকে কক্ষপথে ধরে রাখে।"
  },
  {
    "en": "Biology · DNA stores hereditary information in living organisms.",
    "bn": "জীববিজ্ঞান · DNA জীবের বংশগত তথ্য সংরক্ষণ করে।"
  },
  {
    "en": "Biology · The cell is the basic structural and functional unit of life.",
    "bn": "জীববিজ্ঞান · কোষ জীবনের মৌলিক গঠনগত ও কার্যগত একক।"
  },
  {
    "en": "Biology · Plant cells contain chloroplasts for photosynthesis.",
    "bn": "জীববিজ্ঞান · উদ্ভিদকোষে সালোকসংশ্লেষণের জন্য ক্লোরোপ্লাস্ট থাকে।"
  },
  {
    "en": "Biology · Photosynthesis uses light energy to make sugars from carbon dioxide and water.",
    "bn": "জীববিজ্ঞান · সালোকসংশ্লেষণে আলোর শক্তি ব্যবহার করে কার্বন ডাই-অক্সাইড ও পানি থেকে শর্করা তৈরি হয়।"
  },
  {
    "en": "Biology · Chlorophyll absorbs light used in photosynthesis.",
    "bn": "জীববিজ্ঞান · ক্লোরোফিল সালোকসংশ্লেষণে ব্যবহৃত আলো শোষণ করে।"
  },
  {
    "en": "Biology · Mitochondria help cells release usable energy from food molecules.",
    "bn": "জীববিজ্ঞান · মাইটোকন্ড্রিয়া খাদ্য অণু থেকে কোষের ব্যবহারযোগ্য শক্তি মুক্ত করতে সাহায্য করে।"
  },
  {
    "en": "Biology · The human heart has four chambers.",
    "bn": "জীববিজ্ঞান · মানুষের হৃদপিণ্ডে চারটি প্রকোষ্ঠ আছে।"
  },
  {
    "en": "Biology · An adult human skeleton usually has 206 bones.",
    "bn": "জীববিজ্ঞান · একজন প্রাপ্তবয়স্ক মানুষের কঙ্কালে সাধারণত ২০৬টি হাড় থাকে।"
  },
  {
    "en": "Biology · Skin is the largest organ of the human body.",
    "bn": "জীববিজ্ঞান · ত্বক মানবদেহের বৃহত্তম অঙ্গ।"
  },
  {
    "en": "Biology · Hemoglobin in red blood cells carries oxygen.",
    "bn": "জীববিজ্ঞান · লোহিত রক্তকণিকার হিমোগ্লোবিন অক্সিজেন বহন করে।"
  },
  {
    "en": "Biology · Neurons communicate using electrical and chemical signals.",
    "bn": "জীববিজ্ঞান · নিউরন বৈদ্যুতিক ও রাসায়নিক সংকেতের মাধ্যমে যোগাযোগ করে।"
  },
  {
    "en": "Biology · Mature human red blood cells do not contain a nucleus.",
    "bn": "জীববিজ্ঞান · পরিণত মানব লোহিত রক্তকণিকায় নিউক্লিয়াস থাকে না।"
  },
  {
    "en": "Biology · Bacteria are prokaryotes, so they do not have a membrane-bound nucleus.",
    "bn": "জীববিজ্ঞান · ব্যাকটেরিয়া প্রোক্যারিওট, তাই তাদের ঝিল্লিবেষ্টিত নিউক্লিয়াস নেই।"
  },
  {
    "en": "Biology · Fungi form their own kingdom and are not plants.",
    "bn": "জীববিজ্ঞান · ছত্রাক নিজস্ব একটি জগতের অন্তর্ভুক্ত; তারা উদ্ভিদ নয়।"
  },
  {
    "en": "Biology · Whales are mammals and breathe air with lungs.",
    "bn": "জীববিজ্ঞান · তিমি স্তন্যপায়ী এবং ফুসফুস দিয়ে বাতাস গ্রহণ করে।"
  },
  {
    "en": "Biology · Birds are endothermic, meaning they regulate their internal body temperature.",
    "bn": "জীববিজ্ঞান · পাখি অন্তঃউষ্ণ প্রাণী, অর্থাৎ তারা নিজের দেহের অভ্যন্তরীণ তাপমাত্রা নিয়ন্ত্রণ করে।"
  },
  {
    "en": "Biology · Amphibians commonly begin life in water and later develop for life on land.",
    "bn": "জীববিজ্ঞান · উভচর প্রাণীর জীবন সাধারণত পানিতে শুরু হয় এবং পরে স্থলে বসবাসের উপযোগী হয়ে ওঠে।"
  },
  {
    "en": "Biology · Pollination is the transfer of pollen that enables fertilization in flowering plants.",
    "bn": "জীববিজ্ঞান · পরাগায়ন হলো পরাগরেণুর স্থানান্তর, যা সপুষ্পক উদ্ভিদের নিষেকে সহায়তা করে।"
  },
  {
    "en": "Biology · Genes are segments of DNA that can influence inherited traits.",
    "bn": "জীববিজ্ঞান · জিন হলো DNA-এর অংশ, যা বংশগত বৈশিষ্ট্যে প্রভাব ফেলতে পারে।"
  },
  {
    "en": "Biology · Meiosis produces cells with half the chromosome number of the parent cell.",
    "bn": "জীববিজ্ঞান · মিয়োসিসে মাতৃকোষের অর্ধেক ক্রোমোজোমসংখ্যাযুক্ত কোষ তৈরি হয়।"
  },
  {
    "en": "Earth science · About 71 percent of Earth's surface is covered by water.",
    "bn": "পৃথিবীবিজ্ঞান · পৃথিবীর পৃষ্ঠের প্রায় ৭১ শতাংশ পানি দিয়ে আচ্ছাদিত।"
  },
  {
    "en": "Earth science · The Pacific Ocean is Earth's largest ocean.",
    "bn": "পৃথিবীবিজ্ঞান · প্রশান্ত মহাসাগর পৃথিবীর বৃহত্তম মহাসাগর।"
  },
  {
    "en": "Earth science · Earth has a solid inner core and a liquid outer core.",
    "bn": "পৃথিবীবিজ্ঞান · পৃথিবীর ভেতরের কেন্দ্র কঠিন এবং বাইরের কেন্দ্র তরল।"
  },
  {
    "en": "Earth science · Earth's crust is broken into moving tectonic plates.",
    "bn": "পৃথিবীবিজ্ঞান · পৃথিবীর ভূত্বক চলমান টেকটোনিক প্লেটে বিভক্ত।"
  },
  {
    "en": "Earth science · Most earthquakes occur near tectonic plate boundaries.",
    "bn": "পৃথিবীবিজ্ঞান · অধিকাংশ ভূমিকম্প টেকটোনিক প্লেটের সীমানার কাছে ঘটে।"
  },
  {
    "en": "Earth science · Volcanoes can form where tectonic plates separate, collide, or above hotspots.",
    "bn": "পৃথিবীবিজ্ঞান · প্লেট আলাদা হওয়া, সংঘর্ষ বা হটস্পটের ওপর আগ্নেয়গিরি তৈরি হতে পারে।"
  },
  {
    "en": "Earth science · The equator divides Earth into Northern and Southern Hemispheres.",
    "bn": "পৃথিবীবিজ্ঞান · বিষুবরেখা পৃথিবীকে উত্তর ও দক্ষিণ গোলার্ধে ভাগ করে।"
  },
  {
    "en": "Earth science · Lines of latitude run east-west and measure position north or south of the equator.",
    "bn": "পৃথিবীবিজ্ঞান · অক্ষাংশরেখা পূর্ব-পশ্চিমে বিস্তৃত এবং বিষুবরেখা থেকে উত্তর বা দক্ষিণের অবস্থান নির্দেশ করে।"
  },
  {
    "en": "Earth science · Lines of longitude run from pole to pole and measure position east or west.",
    "bn": "পৃথিবীবিজ্ঞান · দ্রাঘিমারেখা মেরু থেকে মেরু পর্যন্ত যায় এবং পূর্ব বা পশ্চিমের অবস্থান নির্দেশ করে।"
  },
  {
    "en": "Earth science · Weather describes short-term atmospheric conditions.",
    "bn": "পৃথিবীবিজ্ঞান · আবহাওয়া স্বল্পমেয়াদি বায়ুমণ্ডলীয় অবস্থা বোঝায়।"
  },
  {
    "en": "Earth science · Climate describes long-term patterns of weather.",
    "bn": "পৃথিবীবিজ্ঞান · জলবায়ু দীর্ঘমেয়াদি আবহাওয়ার ধরণ বোঝায়।"
  },
  {
    "en": "Earth science · Clouds form when water vapor condenses into tiny droplets or ice crystals.",
    "bn": "পৃথিবীবিজ্ঞান · জলীয়বাষ্প ঘনীভূত হয়ে ক্ষুদ্র পানিকণা বা বরফকণায় পরিণত হলে মেঘ তৈরি হয়।"
  },
  {
    "en": "Earth science · The water cycle includes evaporation, condensation, precipitation, and collection.",
    "bn": "পৃথিবীবিজ্ঞান · জলচক্রে বাষ্পীভবন, ঘনীভবন, বৃষ্টিপাত ও পানি সঞ্চয় অন্তর্ভুক্ত।"
  },
  {
    "en": "Earth science · Glaciers store a large share of Earth's fresh water.",
    "bn": "পৃথিবীবিজ্ঞান · হিমবাহে পৃথিবীর স্বাদু পানির বড় একটি অংশ সঞ্চিত থাকে।"
  },
  {
    "en": "Earth science · Soil forms from weathered rock mixed with organic matter, water, and air.",
    "bn": "পৃথিবীবিজ্ঞান · আবহবিকার হওয়া শিলা, জৈব পদার্থ, পানি ও বায়ুর মিশ্রণে মাটি গঠিত হয়।"
  },
  {
    "en": "Earth science · The atmosphere is mostly nitrogen and oxygen.",
    "bn": "পৃথিবীবিজ্ঞান · বায়ুমণ্ডল প্রধানত নাইট্রোজেন ও অক্সিজেন দিয়ে গঠিত।"
  },
  {
    "en": "Earth science · The ozone layer absorbs much of the Sun's harmful ultraviolet radiation.",
    "bn": "পৃথিবীবিজ্ঞান · ওজোন স্তর সূর্যের ক্ষতিকর অতিবেগুনি রশ্মির বড় অংশ শোষণ করে।"
  },
  {
    "en": "Earth science · Fossils provide evidence about organisms that lived in the past.",
    "bn": "পৃথিবীবিজ্ঞান · জীবাশ্ম অতীতে বসবাসকারী জীব সম্পর্কে প্রমাণ দেয়।"
  },
  {
    "en": "Earth science · Sedimentary rock commonly forms from deposited sediments that become compacted and cemented.",
    "bn": "পৃথিবীবিজ্ঞান · জমা পলল চাপা ও সংযোজিত হয়ে সাধারণত পাললিক শিলা তৈরি করে।"
  },
  {
    "en": "Earth science · Metamorphic rock forms when existing rock is changed by heat, pressure, or chemically active fluids.",
    "bn": "পৃথিবীবিজ্ঞান · তাপ, চাপ বা রাসায়নিকভাবে সক্রিয় তরলের প্রভাবে পুরোনো শিলা বদলে রূপান্তরিত শিলা তৈরি হয়।"
  },
  {
    "en": "Computing · A bit can store one binary value: 0 or 1.",
    "bn": "কম্পিউটিং · একটি বিট একটি বাইনারি মান সংরক্ষণ করতে পারে: ০ বা ১।"
  },
  {
    "en": "Computing · Eight bits make one byte in modern computing.",
    "bn": "কম্পিউটিং · আধুনিক কম্পিউটিংয়ে ৮ বিটে ১ বাইট হয়।"
  },
  {
    "en": "Computing · Binary numbers use base 2.",
    "bn": "কম্পিউটিং · বাইনারি সংখ্যা পদ্ধতির ভিত্তি ২।"
  },
  {
    "en": "Computing · HTML describes the structure of a web page.",
    "bn": "কম্পিউটিং · HTML একটি ওয়েবপেজের কাঠামো বর্ণনা করে।"
  },
  {
    "en": "Computing · CSS controls the presentation and layout of web content.",
    "bn": "কম্পিউটিং · CSS ওয়েব কনটেন্টের উপস্থাপন ও বিন্যাস নিয়ন্ত্রণ করে।"
  },
  {
    "en": "Computing · JavaScript can add behavior and interactivity to web pages.",
    "bn": "কম্পিউটিং · JavaScript ওয়েবপেজে আচরণ ও ইন্টারঅ্যাকশন যোগ করতে পারে।"
  },
  {
    "en": "Computing · HTTP status code 404 means a requested resource was not found.",
    "bn": "কম্পিউটিং · HTTP status code 404 মানে চাওয়া resource পাওয়া যায়নি।"
  },
  {
    "en": "Computing · HTTPS protects data in transit by using TLS encryption.",
    "bn": "কম্পিউটিং · HTTPS চলমান ডেটাকে TLS encryption ব্যবহার করে সুরক্ষিত রাখে।"
  },
  {
    "en": "Computing · URL stands for Uniform Resource Locator.",
    "bn": "কম্পিউটিং · URL-এর পূর্ণরূপ Uniform Resource Locator।"
  },
  {
    "en": "Computing · DNS maps human-readable domain names to network addresses.",
    "bn": "কম্পিউটিং · DNS মানুষের পড়ার উপযোগী domain name-কে network address-এর সঙ্গে মিলিয়ে দেয়।"
  },
  {
    "en": "Computing · IPv4 addresses are 32 bits long.",
    "bn": "কম্পিউটিং · IPv4 address-এর দৈর্ঘ্য ৩২ বিট।"
  },
  {
    "en": "Computing · IPv6 addresses are 128 bits long.",
    "bn": "কম্পিউটিং · IPv6 address-এর দৈর্ঘ্য ১২৮ বিট।"
  },
  {
    "en": "Computing · Git records the history of changes to files.",
    "bn": "কম্পিউটিং · Git ফাইলের পরিবর্তনের ইতিহাস সংরক্ষণ করে।"
  },
  {
    "en": "Computing · A Git commit is a saved snapshot of a project's tracked state.",
    "bn": "কম্পিউটিং · Git commit হলো project-এর tracked অবস্থার একটি সংরক্ষিত snapshot।"
  },
  {
    "en": "Computing · A Git branch lets development continue on a separate line of work.",
    "bn": "কম্পিউটিং · Git branch আলাদা ধারায় development চালাতে দেয়।"
  },
  {
    "en": "Computing · A repository stores project files together with version history.",
    "bn": "কম্পিউটিং · repository project file ও version history একসঙ্গে সংরক্ষণ করে।"
  },
  {
    "en": "Computing · JSON represents data using objects, arrays, strings, numbers, booleans, and null.",
    "bn": "কম্পিউটিং · JSON object, array, string, number, boolean ও null ব্যবহার করে data প্রকাশ করে।"
  },
  {
    "en": "Computing · A primary key uniquely identifies a row in a relational database table.",
    "bn": "কম্পিউটিং · relational database table-এ primary key প্রতিটি row-কে আলাদাভাবে শনাক্ত করে।"
  },
  {
    "en": "Computing · RAM is volatile memory, so its contents are normally lost when power is removed.",
    "bn": "কম্পিউটিং · RAM হলো volatile memory, তাই বিদ্যুৎ বন্ধ হলে সাধারণত এর তথ্য হারিয়ে যায়।"
  },
  {
    "en": "Computing · An SSD stores data without the spinning disks used in traditional hard drives.",
    "bn": "কম্পিউটিং · SSD প্রচলিত hard drive-এর মতো ঘূর্ণায়মান disk ছাড়াই data সংরক্ষণ করে।"
  },
  {
    "en": "Language · A noun names a person, place, thing, or idea.",
    "bn": "ভাষা · বিশেষ্য ব্যক্তি, স্থান, বস্তু বা ধারণার নাম বোঝায়।"
  },
  {
    "en": "Language · A verb can express an action, occurrence, or state.",
    "bn": "ভাষা · ক্রিয়া কাজ, ঘটনা বা অবস্থা প্রকাশ করতে পারে।"
  },
  {
    "en": "Language · An adjective modifies a noun or pronoun.",
    "bn": "ভাষা · adjective একটি noun বা pronoun-কে বর্ণনা করে।"
  },
  {
    "en": "Language · An adverb can modify a verb, adjective, another adverb, or an entire clause.",
    "bn": "ভাষা · adverb একটি verb, adjective, অন্য adverb বা পুরো clause-কে পরিবর্তিত বা বর্ণিত করতে পারে।"
  },
  {
    "en": "Language · A prefix is added before a root or base word.",
    "bn": "ভাষা · prefix মূল শব্দের আগে যুক্ত হয়।"
  },
  {
    "en": "Language · A suffix is added after a root or base word.",
    "bn": "ভাষা · suffix মূল শব্দের পরে যুক্ত হয়।"
  },
  {
    "en": "Language · Synonyms are words with the same or similar meanings.",
    "bn": "ভাষা · synonym হলো একই বা কাছাকাছি অর্থের শব্দ।"
  },
  {
    "en": "Language · Antonyms are words with opposite meanings.",
    "bn": "ভাষা · antonym হলো বিপরীত অর্থের শব্দ।"
  },
  {
    "en": "Language · Homophones sound alike but can have different spellings and meanings.",
    "bn": "ভাষা · homophone একই রকম শোনালেও বানান ও অর্থ ভিন্ন হতে পারে।"
  },
  {
    "en": "Language · A palindrome reads the same forward and backward when spacing and punctuation are ignored.",
    "bn": "ভাষা · spacing ও punctuation বাদ দিলে palindrome সামনে ও পেছন থেকে একইভাবে পড়া যায়।"
  },
  {
    "en": "Language · A simile compares things using words such as 'like' or 'as'.",
    "bn": "ভাষা · simile ‘like’ বা ‘as’-এর মতো শব্দ ব্যবহার করে তুলনা করে।"
  },
  {
    "en": "Language · A metaphor makes a comparison without using 'like' or 'as'.",
    "bn": "ভাষা · metaphor ‘like’ বা ‘as’ ছাড়াই তুলনা করে।"
  },
  {
    "en": "Language · In active voice, the grammatical subject performs the action.",
    "bn": "ভাষা · active voice-এ grammatical subject কাজটি সম্পাদন করে।"
  },
  {
    "en": "Language · In passive voice, the grammatical subject receives the action.",
    "bn": "ভাষা · passive voice-এ grammatical subject কাজটির প্রভাব গ্রহণ করে।"
  },
  {
    "en": "Language · English has 26 letters in its modern alphabet.",
    "bn": "ভাষা · আধুনিক ইংরেজি বর্ণমালায় ২৬টি অক্ষর আছে।"
  },
  {
    "en": "Learning · Retrieval practice strengthens memory by making you recall information.",
    "bn": "শেখা · মনে করে উত্তর দেওয়ার অনুশীলন স্মৃতিকে শক্তিশালী করে।"
  },
  {
    "en": "Learning · Spacing study sessions over time usually supports longer-lasting memory than cramming.",
    "bn": "শেখা · একসঙ্গে গাদাগাদি করে পড়ার চেয়ে সময় ভাগ করে পড়া সাধারণত দীর্ঘস্থায়ী স্মৃতিতে বেশি সহায়ক।"
  },
  {
    "en": "Learning · Explaining an idea in your own words can reveal what you do and do not understand.",
    "bn": "শেখা · নিজের ভাষায় ধারণা ব্যাখ্যা করলে কোন অংশ বুঝেছ আর কোন অংশ বুঝনি তা ধরা যায়।"
  },
  {
    "en": "Learning · Sleep supports memory consolidation after learning.",
    "bn": "শেখা · শেখার পর ঘুম স্মৃতি দৃঢ় হতে সাহায্য করে।"
  },
  {
    "en": "Learning · Mixing worked examples with practice can help learners connect procedures to concepts.",
    "bn": "শেখা · solved example-এর সঙ্গে practice মিশিয়ে করলে পদ্ধতি ও ধারণার সম্পর্ক বুঝতে সাহায্য করে।"
  }
];

const toBnNumber=(value:string|number)=>String(value).replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[Number(d)]);

const squareFacts:OpenThoughtFact[]=Array.from({length:120},(_,i)=>{
  const n=i+1,answer=n*n;
  return {en:`Math · ${n} squared is ${answer}.`,bn:`গণিত · ${toBnNumber(n)}-এর বর্গ ${toBnNumber(answer)}।`};
});

const cubeFacts:OpenThoughtFact[]=Array.from({length:80},(_,i)=>{
  const n=i+1,answer=n*n*n;
  return {en:`Math · ${n} cubed is ${answer}.`,bn:`গণিত · ${toBnNumber(n)}-এর ঘন ${toBnNumber(answer)}।`};
});

const multiplicationFacts:OpenThoughtFact[]=Array.from({length:20},(_,a)=>
  Array.from({length:5},(_,b)=>{
    const x=a+2,y=b+7,answer=x*y;
    return {en:`Math · ${x} × ${y} = ${answer}.`,bn:`গণিত · ${toBnNumber(x)} × ${toBnNumber(y)} = ${toBnNumber(answer)}।`};
  })
).flat();

const percentageFacts:OpenThoughtFact[]=Array.from({length:100},(_,i)=>{
  const n=i+1;
  return {en:`Math · ${n}% means ${n} out of every 100.`,bn:`গণিত · ${toBnNumber(n)}% মানে প্রতি ${toBnNumber(100)}-এ ${toBnNumber(n)}।`};
});

const powerOfTwoFacts:OpenThoughtFact[]=Array.from({length:64},(_,i)=>{
  const answer=2**i;
  return {en:`Computing · 2 to the power of ${i} equals ${answer}.`,bn:`কম্পিউটিং · ২-এর ${toBnNumber(i)} ঘাত = ${toBnNumber(answer)}।`};
});

const binaryFacts:OpenThoughtFact[]=Array.from({length:128},(_,i)=>({
  en:`Computing · Decimal ${i} is ${i.toString(2)} in binary.`,
  bn:`কম্পিউটিং · দশমিক ${toBnNumber(i)}-এর বাইনারি রূপ ${toBnNumber(i.toString(2))}।`
}));

function firstPrimes(count:number){
  const primes:number[]=[];
  let candidate=2;
  while(primes.length<count){
    let prime=true;
    for(let d=2;d*d<=candidate;d++){
      if(candidate%d===0){prime=false;break}
    }
    if(prime)primes.push(candidate);
    candidate++;
  }
  return primes;
}

const primeFacts:OpenThoughtFact[]=firstPrimes(208).map((prime,i)=>({
  en:`Number theory · ${prime} is prime number #${i+1} in ascending order.`,
  bn:`সংখ্যাতত্ত্ব · ঊর্ধ্বক্রমে ${toBnNumber(prime)} হলো ${toBnNumber(i+1)} নম্বর মৌলিক সংখ্যা।`
}));

const enElements=["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminium","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Caesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium"];
const bnElements=["হাইড্রোজেন","হিলিয়াম","লিথিয়াম","বেরিলিয়াম","বোরন","কার্বন","নাইট্রোজেন","অক্সিজেন","ফ্লোরিন","নিয়ন","সোডিয়াম","ম্যাগনেসিয়াম","অ্যালুমিনিয়াম","সিলিকন","ফসফরাস","সালফার","ক্লোরিন","আর্গন","পটাসিয়াম","ক্যালসিয়াম","স্ক্যান্ডিয়াম","টাইটানিয়াম","ভ্যানাডিয়াম","ক্রোমিয়াম","ম্যাঙ্গানিজ","আয়রন","কোবাল্ট","নিকেল","কপার","জিঙ্ক","গ্যালিয়াম","জার্মেনিয়াম","আর্সেনিক","সেলেনিয়াম","ব্রোমিন","ক্রিপ্টন","রুবিডিয়াম","স্ট্রনশিয়াম","ইট্রিয়াম","জিরকোনিয়াম","নাইওবিয়াম","মলিবডেনাম","টেকনেশিয়াম","রুথেনিয়াম","রোডিয়াম","প্যালাডিয়াম","সিলভার","ক্যাডমিয়াম","ইন্ডিয়াম","টিন","অ্যান্টিমনি","টেলুরিয়াম","আয়োডিন","জেনন","সিজিয়াম","বেরিয়াম","ল্যান্থানাম","সেরিয়াম","প্রাসিওডিমিয়াম","নিওডিমিয়াম","প্রোমেথিয়াম","সামারিয়াম","ইউরোপিয়াম","গ্যাডোলিনিয়াম","টার্বিয়াম","ডিসপ্রোসিয়াম","হলমিয়াম","আর্বিয়াম","থুলিয়াম","ইটারবিয়াম","লুটেশিয়াম","হাফনিয়াম","ট্যান্টালাম","টাংস্টেন","রেনিয়াম","অসমিয়াম","ইরিডিয়াম","প্লাটিনাম","গোল্ড","মারকারি","থ্যালিয়াম","লেড","বিসমাথ","পোলোনিয়াম","অ্যাস্টাটিন","রেডন","ফ্রান্সিয়াম","রেডিয়াম","অ্যাকটিনিয়াম","থোরিয়াম","প্রোট্যাকটিনিয়াম","ইউরেনিয়াম","নেপচুনিয়াম","প্লুটোনিয়াম","আমেরিসিয়াম","কিউরিয়াম","বার্কেলিয়াম","ক্যালিফোর্নিয়াম","আইনস্টাইনিয়াম","ফার্মিয়াম"];
const elementFacts:OpenThoughtFact[]=enElements.map((name,i)=>({
  en:`Chemistry · ${name} has atomic number ${i+1}.`,
  bn:`রসায়ন · ${bnElements[i]}-এর পারমাণবিক সংখ্যা ${toBnNumber(i+1)}।`
}));

const generatedFacts=[
  ...coreFacts,
  ...squareFacts,
  ...cubeFacts,
  ...multiplicationFacts,
  ...percentageFacts,
  ...powerOfTwoFacts,
  ...binaryFacts,
  ...primeFacts,
  ...elementFacts
];

export const openThoughtFacts=generatedFacts.slice(0,1000);

if(openThoughtFacts.length!==1000){
  throw new Error(`Expected 1000 open-thought facts, got ${openThoughtFacts.length}`);
}
