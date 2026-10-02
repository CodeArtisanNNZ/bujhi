"use client";

import {useEffect,useMemo,useState,type CSSProperties} from "react";
import {ArrowLeft,BookOpen,Globe2,Landmark,MapPin,Palette} from "lucide-react";
import divisionData from "../data/bangladesh-divisions.json";
import districtData from "../data/bangladesh-districts.json";

type Region={
  id:string;
  name:string;
  bn:string;
  level:number;
  parent:string|null;
  polygons:number[][][];
};

type FactKind="history"|"geography"|"culture";
type FactSet=Record<FactKind,{en:string;bn:string}>;

const divisions=divisionData as Region[];
const districts=districtData as Region[];

const facts:Record<string,FactSet>={
  dhaka:{
    history:{en:"Dhaka became an important Mughal administrative centre in the early 17th century, when the city was known as Jahangirnagar.",bn:"১৭শ শতকের শুরুতে ঢাকা মোগল বাংলার একটি গুরুত্বপূর্ণ প্রশাসনিক কেন্দ্র হয়ে ওঠে; তখন শহরটি জাহাঙ্গীরনগর নামেও পরিচিত ছিল।"},
    geography:{en:"Dhaka Division sits in central Bangladesh within a landscape shaped by the Padma, Jamuna and Meghna river systems.",bn:"ঢাকা বিভাগ বাংলাদেশের মধ্যভাগে অবস্থিত; পদ্মা, যমুনা ও মেঘনা নদী ব্যবস্থার প্রভাবে এ অঞ্চলের ভূপ্রকৃতি গড়ে উঠেছে।"},
    culture:{en:"Jamdani weaving around the Dhaka–Narayanganj area is one of the region’s best-known textile traditions.",bn:"ঢাকা–নারায়ণগঞ্জ অঞ্চলের জামদানি বয়ন এই এলাকার সবচেয়ে পরিচিত ঐতিহ্যবাহী বস্ত্রশিল্পগুলোর একটি।"}
  },
  chattagram:{
    history:{en:"Chattogram has long connected Bengal with maritime trade across the Bay of Bengal.",bn:"চট্টগ্রাম দীর্ঘদিন ধরে বঙ্গোপসাগরকেন্দ্রিক সমুদ্রবাণিজ্যের মাধ্যমে বাংলাকে বাইরের বিশ্বের সঙ্গে যুক্ত করেছে।"},
    geography:{en:"Southeastern Bangladesh combines a long coastline, river valleys and the hills of the Chittagong Hill Tracts.",bn:"বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলে দীর্ঘ উপকূলরেখা, নদী উপত্যকা এবং পার্বত্য চট্টগ্রামের পাহাড় একসঙ্গে দেখা যায়।"},
    culture:{en:"Mezban, a communal beef feast, is a well-known food tradition associated with Chattogram.",bn:"মেজবান চট্টগ্রামের সঙ্গে গভীরভাবে যুক্ত একটি পরিচিত সামাজিক ও খাদ্যসংস্কৃতির ঐতিহ্য।"}
  },
  sylhet:{
    history:{en:"Sylhet grew as an important regional centre shaped by trade, migration and long-standing Sufi traditions.",bn:"বাণিজ্য, অভিবাসন এবং দীর্ঘদিনের সুফি ঐতিহ্যের প্রভাবে সিলেট একটি গুরুত্বপূর্ণ আঞ্চলিক কেন্দ্র হিসেবে গড়ে ওঠে।"},
    geography:{en:"The Surma–Kushiyara river system, haor wetlands and tea-growing hills define much of Sylhet’s landscape.",bn:"সুরমা–কুশিয়ারা নদী ব্যবস্থা, হাওর এবং চা-বাগানের টিলা সিলেটের ভূদৃশ্যের বড় বৈশিষ্ট্য।"},
    culture:{en:"Tea gardens, regional cuisine and a distinctive local language are central parts of Sylhet’s cultural identity.",bn:"চা-বাগান, আঞ্চলিক খাবার এবং স্বতন্ত্র স্থানীয় ভাষা সিলেটের সাংস্কৃতিক পরিচয়ের গুরুত্বপূর্ণ অংশ।"}
  },
  rajshahi:{
    history:{en:"The greater Rajshahi region overlaps with historic Varendra, an important cultural region of Bengal.",bn:"বৃহত্তর রাজশাহী অঞ্চল ঐতিহাসিক বরেন্দ্র অঞ্চলের সঙ্গে যুক্ত, যা বাংলার একটি গুরুত্বপূর্ণ সাংস্কৃতিক অঞ্চল।"},
    geography:{en:"Rajshahi Division stretches across northwestern Bangladesh and meets the Padma along its southern edge.",bn:"রাজশাহী বিভাগ বাংলাদেশের উত্তর-পশ্চিমে বিস্তৃত এবং এর দক্ষিণাংশে পদ্মা নদীর প্রভাব স্পষ্ট।"},
    culture:{en:"Rajshahi is especially famous for mangoes and its long silk-producing tradition.",bn:"রাজশাহী বিশেষভাবে আম এবং দীর্ঘদিনের রেশমশিল্পের ঐতিহ্যের জন্য পরিচিত।"}
  },
  khulna:{
    history:{en:"The historic mosque city of Bagerhat preserves major examples of 15th-century architecture in the region.",bn:"বাগেরহাটের ঐতিহাসিক মসজিদের শহর এই অঞ্চলের ১৫শ শতকের গুরুত্বপূর্ণ স্থাপত্য ঐতিহ্য সংরক্ষণ করে।"},
    geography:{en:"Southwestern Bangladesh reaches the Sundarbans, the vast mangrove forest at the edge of the Bay of Bengal.",bn:"বাংলাদেশের দক্ষিণ-পশ্চিমাঞ্চল সুন্দরবনের সঙ্গে মিলেছে, যা বঙ্গোপসাগরের কিনারায় বিস্তৃত বিশাল ম্যানগ্রোভ বন।"},
    culture:{en:"Rivers, fisheries and the mangrove landscape strongly influence everyday life and food culture across the southwest.",bn:"নদী, মৎস্যসম্পদ ও ম্যানগ্রোভ পরিবেশ দক্ষিণ-পশ্চিমাঞ্চলের দৈনন্দিন জীবন ও খাদ্যসংস্কৃতিতে বড় প্রভাব ফেলে।"}
  },
  barishal:{
    history:{en:"Barishal developed as a river-connected administrative and trading centre in southern Bengal.",bn:"দক্ষিণ বাংলায় নদীপথনির্ভর প্রশাসনিক ও বাণিজ্যিক কেন্দ্র হিসেবে বরিশাল গড়ে ওঠে।"},
    geography:{en:"Barishal Division is crossed by a dense network of rivers and channels flowing toward the Bay of Bengal.",bn:"বরিশাল বিভাগে অসংখ্য নদী ও খাল ছড়িয়ে আছে, যেগুলো দক্ষিণে বঙ্গোপসাগরের দিকে প্রবাহিত হয়।"},
    culture:{en:"Boat travel, river markets and life around waterways remain visible features of the region’s cultural landscape.",bn:"নৌযাত্রা, নদীকেন্দ্রিক হাট-বাজার এবং জলপথঘেরা জীবন এ অঞ্চলের সাংস্কৃতিক দৃশ্যের পরিচিত অংশ।"}
  },
  rangpur:{
    history:{en:"Rangpur has long served as an agricultural and administrative centre in northern Bengal.",bn:"উত্তর বাংলায় রংপুর দীর্ঘদিন ধরে কৃষি ও প্রশাসনিক কেন্দ্র হিসেবে গুরুত্বপূর্ণ।"},
    geography:{en:"The Teesta and other northern rivers shape the floodplains and farming landscapes of the Rangpur region.",bn:"তিস্তা ও উত্তরাঞ্চলের অন্যান্য নদী রংপুর অঞ্চলের বন্যাপ্রবণ সমভূমি ও কৃষিভূমি গড়ে তুলেছে।"},
    culture:{en:"Bhawaiya folk music is strongly associated with northern Bangladesh, including the Rangpur region.",bn:"ভাওয়াইয়া লোকগান উত্তর বাংলাদেশের, বিশেষ করে রংপুর অঞ্চলের সঙ্গে গভীরভাবে যুক্ত।"}
  },
  mymensingh:{
    history:{en:"Mymensingh has a long history as a regional centre in the Brahmaputra valley.",bn:"ব্রহ্মপুত্র উপত্যকায় ময়মনসিংহের একটি দীর্ঘ আঞ্চলিক কেন্দ্রের ইতিহাস রয়েছে।"},
    geography:{en:"The Old Brahmaputra is one of the defining rivers of the Mymensingh landscape.",bn:"পুরাতন ব্রহ্মপুত্র ময়মনসিংহের ভূদৃশ্য গড়ে তোলা অন্যতম প্রধান নদী।"},
    culture:{en:"The Mymensingh Gitika preserves some of Bengal’s best-known folk ballads and narrative traditions.",bn:"ময়মনসিংহ গীতিকা বাংলার বহুল পরিচিত লোকগাথা ও আখ্যানধারার গুরুত্বপূর্ণ সংগ্রহ।"}
  }
};

const divisionColors=["#934548","#b65f45","#7b5a79","#9f714a","#6d596f","#9b5d68","#7d6b50","#805067"];
const districtColors=["#8c4548","#a55d4c","#80526c","#a47757","#6f5f75","#95656d","#786557","#87607c"];

function ringPath(ring:number[]){
  if(ring.length<4)return "";
  let path=`M ${ring[0]} ${ring[1]}`;
  for(let index=2;index<ring.length-1;index+=2)path+=` L ${ring[index]} ${ring[index+1]}`;
  return path+" Z";
}

function regionPath(region:Region){
  return region.polygons.map(polygon=>polygon.map(ring=>ringPath(ring)).join(" ")).join(" ");
}

function labelPoint(region:Region){
  const rings=region.polygons.flat();
  const ring=rings.reduce<number[]>((best,current)=>current.length>best.length?current:best,[]);
  if(ring.length<4)return{x:.5,y:.5};
  let x=0,y=0,count=0;
  for(let index=0;index<ring.length-1;index+=2){x+=ring[index];y+=ring[index+1];count++}
  return{x:x/count,y:y/count};
}

function boundsFor(region:Region|null){
  if(!region)return "0 0 1 1";
  const values=region.polygons.flat(2);
  const xs:number[]=[];const ys:number[]=[];
  for(let index=0;index<values.length-1;index+=2){xs.push(values[index]);ys.push(values[index+1])}
  if(!xs.length)return "0 0 1 1";
  const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  const width=Math.max(.08,maxX-minX),height=Math.max(.08,maxY-minY);
  const pad=Math.max(width,height)*.12;
  return `${minX-pad} ${minY-pad} ${width+pad*2} ${height+pad*2}`;
}

export default function BangladeshMapPreview({compact=false}:{compact?:boolean}){
  const[selectedDivisionId,setSelectedDivisionId]=useState<string|null>(null);
  const[selectedDistrictId,setSelectedDistrictId]=useState<string|null>(null);
  const[factKind,setFactKind]=useState<FactKind>("geography");
  const[lang,setLang]=useState<"en"|"bn">("en");

  useEffect(()=>{
    const sync=()=>setLang(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);

  const selectedDivision=divisions.find(item=>item.id===selectedDivisionId)??null;
  const visibleDistricts=useMemo(
    ()=>selectedDivisionId?districts.filter(item=>item.parent===selectedDivisionId):[],
    [selectedDivisionId]
  );
  const selectedDistrict=visibleDistricts.find(item=>item.id===selectedDistrictId)??null;
  const currentFacts=selectedDivision?facts[selectedDivision.id]:null;
  const activeRegions=selectedDivision?visibleDistricts:divisions;
  const viewBox=boundsFor(selectedDivision);

  function selectDivision(id:string){
    setSelectedDivisionId(id);
    setSelectedDistrictId(null);
    setFactKind("geography");
  }

  function resetCountry(){
    setSelectedDivisionId(null);
    setSelectedDistrictId(null);
  }

  const selectedName=selectedDistrict
    ?(lang==="bn"?selectedDistrict.bn:selectedDistrict.name)
    :selectedDivision
      ?(lang==="bn"?selectedDivision.bn:selectedDivision.name)
      :(lang==="bn"?"বাংলাদেশ":"Bangladesh");

  return <section className={compact?"bd-explorer bd-explorer-compact":"bd-explorer"} data-no-translate>
    <div className="bd-map-panel">
      <div className="bd-map-toolbar">
        {selectedDivision
          ?<button type="button" className="bd-map-back" onClick={resetCountry}><ArrowLeft/>{lang==="bn"?"সব বিভাগ":"All divisions"}</button>
          :<span className="bd-map-kicker"><MapPin/>{lang==="bn"?"ইন্টারঅ্যাকটিভ মানচিত্র":"Interactive map"}</span>}
        <span className="bd-map-level">{selectedDivision?(lang==="bn"?"জেলা":"Districts"):(lang==="bn"?"বিভাগ":"Divisions")}</span>
      </div>

      <div className="bd-map-stage">
        <svg
          className="bd-map-svg"
          viewBox={viewBox}
          role="img"
          aria-label={lang==="bn"?"বাংলাদেশের ইন্টারঅ্যাকটিভ প্রশাসনিক মানচিত্র":"Interactive administrative map of Bangladesh"}
          preserveAspectRatio="xMidYMid meet"
        >
          {activeRegions.map((region,index)=>{
            const active=selectedDistrictId===region.id;
            const color=selectedDivision?districtColors[index%districtColors.length]:divisionColors[index%divisionColors.length];
            const point=labelPoint(region);
            return <g key={region.id}>
              <path
                d={regionPath(region)}
                className={active?"bd-map-region is-active":"bd-map-region"}
                style={{"--bd-region-fill":color} as CSSProperties}
                role="button"
                tabIndex={0}
                aria-label={lang==="bn"?region.bn:region.name}
                onClick={()=>selectedDivision?setSelectedDistrictId(region.id):selectDivision(region.id)}
                onKeyDown={event=>{
                  if(event.key==="Enter"||event.key===" "){
                    event.preventDefault();
                    selectedDivision?setSelectedDistrictId(region.id):selectDivision(region.id);
                  }
                }}
              />
              {!selectedDivision&&<text className="bd-map-svg-label" x={point.x} y={point.y}>{lang==="bn"?region.bn:region.name}</text>}
              {selectedDivision&&active&&<text className="bd-map-svg-label is-district" x={point.x} y={point.y}>{lang==="bn"?region.bn:region.name}</text>}
            </g>
          })}
        </svg>
        <div className="bd-map-watermark">BD</div>
      </div>
    </div>

    <aside className="bd-map-info" key={selectedDistrict?.id||selectedDivision?.id||"country"}>
      <span className="bd-map-count">{selectedDivision?String(visibleDistricts.length).padStart(2,"0"):"08"} {selectedDivision?(lang==="bn"?"জেলা":"districts"):(lang==="bn"?"বিভাগ":"divisions")}</span>
      <h3>{selectedName}</h3>
      {selectedDistrict&&selectedDivision&&<p className="bd-map-parent">{lang==="bn"?selectedDivision.bn:selectedDivision.name} · {lang==="bn"?"জেলা":"District"}</p>}

      {!selectedDivision
        ?<div className="bd-map-intro">
          <Globe2/>
          <p>{lang==="bn"?"একটি বিভাগে চাপ দিন। এরপর সেই বিভাগের জেলাগুলো খুলবে এবং ইতিহাস, ভূগোল ও সংস্কৃতির ছোট তথ্য দেখা যাবে।":"Tap a division. Its districts will open next, together with small history, geography and culture facts."}</p>
        </div>
        :<>
          <div className="bd-fact-tabs" role="group" aria-label={lang==="bn"?"তথ্যের ধরন":"Fact category"}>
            {(["history","geography","culture"] as FactKind[]).map(kind=>{
              const Icon=kind==="history"?Landmark:kind==="geography"?Globe2:Palette;
              const label=lang==="bn"?(kind==="history"?"ইতিহাস":kind==="geography"?"ভূগোল":"সংস্কৃতি"):(kind[0].toUpperCase()+kind.slice(1));
              return <button type="button" key={kind} className={factKind===kind?"active":""} onClick={()=>setFactKind(kind)}><Icon/>{label}</button>
            })}
          </div>
          <div className="bd-fact-card">
            <BookOpen/>
            <p>{currentFacts?(lang==="bn"?currentFacts[factKind].bn:currentFacts[factKind].en):""}</p>
          </div>
          {selectedDistrict&&<p className="bd-district-note">{lang==="bn"
            ?`${selectedDistrict.bn} হলো ${selectedDivision.bn} বিভাগের ${visibleDistricts.length}টি জেলার একটি। মানচিত্রে অন্য জেলায় চাপ দিয়ে অবস্থান তুলনা করুন।`
            :`${selectedDistrict.name} is one of ${visibleDistricts.length} districts in ${selectedDivision.name} Division. Tap another district to compare its position.`}</p>}
        </>
      }

      {!compact&&selectedDivision&&<div className="bd-district-grid">
        {visibleDistricts.map(region=><button type="button" key={region.id} className={selectedDistrictId===region.id?"active":""} onClick={()=>setSelectedDistrictId(region.id)}>{lang==="bn"?region.bn:region.name}</button>)}
      </div>}

      {!compact&&<p className="bd-map-credit">Geometry adapted from <a href="https://github.com/farhansadikgalib/bd-map" target="_blank" rel="noreferrer">bd-map</a> (MIT); source geometry: geoBoundaries, CC BY 4.0.</p>}
    </aside>
  </section>;
}
