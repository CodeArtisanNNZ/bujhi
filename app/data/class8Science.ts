// Transcribed from the supplied NCTB Class 8 Science textbook (2026),
// Chapter 1, printed pages 1–12 (PDF pages 6–17).
export type Localized={bn:string;en:string};
export type Group={id:string;name:Localized;feature:Localized;example:Localized;branch:"invertebrate"|"vertebrate"};
export const chapterOne={number:1,title:{bn:"প্রাণিজগতের শ্রেণিবিন্যাস",en:"Classification of the Animal Kingdom"},startPage:6,endPage:17};
export const groups:Group[]=[
 {id:"porifera",branch:"invertebrate",name:{bn:"পরিফেরা",en:"Porifera"},feature:{bn:"দেহে অসংখ্য ছিদ্র; প্রকৃত কলা নেই",en:"Many body pores; no true tissues"},example:{bn:"স্পঞ্জিলা",en:"Spongilla"}},
 {id:"cnidaria",branch:"invertebrate",name:{bn:"নিডারিয়া",en:"Cnidaria"},feature:{bn:"নিডোসাইট বা দংশন কোষ থাকে",en:"Has stinging cells (cnidocytes)"},example:{bn:"হাইড্রা",en:"Hydra"}},
 {id:"platyhelminthes",branch:"invertebrate",name:{bn:"প্লাটিহেলমিনথেস",en:"Platyhelminthes"},feature:{bn:"দেহ চ্যাপ্টা",en:"Flattened body"},example:{bn:"যকৃৎ কৃমি",en:"Liver fluke"}},
 {id:"nematoda",branch:"invertebrate",name:{bn:"নেমাটোডা",en:"Nematoda"},feature:{bn:"দেহ গোলাকার ও অখণ্ডিত",en:"Round, unsegmented body"},example:{bn:"গোলকৃমি",en:"Roundworm"}},
 {id:"annelida",branch:"invertebrate",name:{bn:"অ্যানেলিডা",en:"Annelida"},feature:{bn:"দেহ খণ্ডিত",en:"Segmented body"},example:{bn:"কেঁচো",en:"Earthworm"}},
 {id:"arthropoda",branch:"invertebrate",name:{bn:"আর্থ্রোপোডা",en:"Arthropoda"},feature:{bn:"সন্ধিযুক্ত পা ও বহিঃকঙ্কাল",en:"Jointed legs and an exoskeleton"},example:{bn:"প্রজাপতি",en:"Butterfly"}},
 {id:"mollusca",branch:"invertebrate",name:{bn:"মলাস্কা",en:"Mollusca"},feature:{bn:"নরম দেহ, পেশিবহুল পা",en:"Soft body and muscular foot"},example:{bn:"শামুক",en:"Snail"}},
 {id:"echinodermata",branch:"invertebrate",name:{bn:"একাইনোডার্মাটা",en:"Echinodermata"},feature:{bn:"কাঁটাযুক্ত ত্বক, সামুদ্রিক",en:"Spiny skin; marine"},example:{bn:"তারামাছ",en:"Starfish"}},
 {id:"cyclostomata",branch:"vertebrate",name:{bn:"সাইক্লোস্টোমাটা",en:"Cyclostomata"},feature:{bn:"চোয়ালবিহীন মাছসদৃশ প্রাণী",en:"Jawless, fishlike animal"},example:{bn:"ল্যাম্প্রে",en:"Lamprey"}},
 {id:"chondrichthyes",branch:"vertebrate",name:{bn:"কনড্রিকথিস",en:"Chondrichthyes"},feature:{bn:"তরুণাস্থিময় কঙ্কাল",en:"Cartilaginous skeleton"},example:{bn:"হাঙ্গর",en:"Shark"}},
 {id:"osteichthyes",branch:"vertebrate",name:{bn:"অস্টিকথিস",en:"Osteichthyes"},feature:{bn:"অস্থিময় কঙ্কাল ও ফুলকা",en:"Bony skeleton and gills"},example:{bn:"রুই মাছ",en:"Rohu fish"}},
 {id:"amphibia",branch:"vertebrate",name:{bn:"উভচর",en:"Amphibia"},feature:{bn:"আর্দ্র ত্বক; জল ও স্থলে জীবনচক্র",en:"Moist skin; life cycle in water and on land"},example:{bn:"ব্যাঙ",en:"Frog"}},
 {id:"reptilia",branch:"vertebrate",name:{bn:"সরীসৃপ",en:"Reptilia"},feature:{bn:"শুষ্ক আঁশযুক্ত ত্বক",en:"Dry scaly skin"},example:{bn:"টিকটিকি",en:"Lizard"}},
 {id:"aves",branch:"vertebrate",name:{bn:"পক্ষীকুল",en:"Aves"},feature:{bn:"দেহে পালক",en:"Feathers cover the body"},example:{bn:"পায়রা",en:"Pigeon"}},
 {id:"mammalia",branch:"vertebrate",name:{bn:"স্তন্যপায়ী",en:"Mammalia"},feature:{bn:"শাবককে দুধ পান করায়",en:"Mothers feed young with milk"},example:{bn:"মানুষ",en:"Human"}}
];
