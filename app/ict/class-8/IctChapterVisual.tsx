import {useId} from "react";

export default function IctChapterVisual({chapter,lesson}:{chapter:number;lesson?:number}){
 const titleId=useId();
 const titles:Record<number,string>={1:"তথ্য থেকে যোগাযোগ ও সেবা",2:"যন্ত্রগুলো যুক্ত করে একটি নেটওয়ার্ক",3:"ডিজিটাল তথ্য ও পরিচয়ের সুরক্ষা",4:"সেলের মান থেকে সূত্রে হিসাব",5:"ইন্টারনেটে শিক্ষা, তথ্য ও ইমেইল"};
 const chapterOneTitles:Record<number,string>={
  1:"দৈনন্দিন জীবনে ICT",
  2:"ICT-ভিত্তিক কর্মসংস্থান",
  3:"ডিজিটাল যোগাযোগ",
  4:"ব্যবসায় ICT",
  5:"ডিজিটাল সরকারি সেবা",
  6:"চিকিৎসায় ICT",
  7:"গবেষণায় ICT"
 };
 const activeLesson=lesson||1;

 return <svg viewBox="0 0 420 240" role="img" aria-labelledby={titleId}>
  <title id={titleId}>{chapter===1?chapterOneTitles[activeLesson]:titles[chapter]}</title>
  <defs>
   <linearGradient id="screenGlow" x1="0" x2="1"><stop stopColor="#fffaf1"/><stop offset="1" stopColor="#f3ddc4"/></linearGradient>
   <linearGradient id="greenGlow" x1="0" x2="1"><stop stopColor="#194c39"/><stop offset="1" stopColor="#2e7658"/></linearGradient>
   <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="420" height="240" rx="18" fill="#efe2cf"/>
  <circle cx="370" cy="35" r="85" fill="#e4cfad" opacity=".5"/>
  <path d="M0 207H420" stroke="#c7ad88" strokeWidth="2"/>

  {chapter===1&&activeLesson===1&&<>
   <rect x="112" y="75" width="196" height="116" rx="10" fill="#5c463b"/>
   <rect x="124" y="87" width="172" height="89" rx="5" fill="url(#screenGlow)"/>
   <rect x="139" y="102" width="48" height="58" rx="8" fill="#8b201d"/>
   <circle cx="163" cy="117" r="6" fill="#fff3e1"/>
   <path d="M150 136h26M150 146h19" stroke="#f7d8c5" strokeWidth="4" strokeLinecap="round"/>
   <path d="M211 107h61M211 121h48M211 135h55M211 149h37" stroke="#b88d70" strokeWidth="5" strokeLinecap="round"/>
   <path d="M92 191H328L312 207H108Z" fill="#9d7a67"/>
   <g fill="#fffaf1" stroke="#8b201d" strokeWidth="2">
    <circle cx="57" cy="63" r="22"/><circle cx="363" cy="71" r="22"/><circle cx="70" cy="151" r="22"/>
   </g>
   <text x="57" y="69" textAnchor="middle" fontSize="20">☁</text>
   <text x="363" y="77" textAnchor="middle" fontSize="18">⌖</text>
   <text x="70" y="157" textAnchor="middle" fontSize="18">৳</text>
   <path d="M78 69Q117 83 139 106M342 76Q310 91 277 111M92 148Q119 147 139 142" fill="none" stroke="#b28365" strokeWidth="2" strokeDasharray="5 5"/>
   <circle r="5" fill="#d62828" filter="url(#softGlow)">
    <animateMotion dur="3.2s" repeatCount="indefinite" path="M78 69 Q117 83 139 106"/>
   </circle>
   <circle r="4" fill="#1d6b50">
    <animateMotion dur="3.8s" repeatCount="indefinite" path="M342 76 Q310 91 277 111"/>
   </circle>
  </>}

  {chapter===1&&activeLesson===2&&<>
   <rect x="150" y="92" width="120" height="78" rx="9" fill="#60483d"/>
   <rect x="160" y="102" width="100" height="55" rx="3" fill="#fffaf1"/>
   <path d="M177 119h66M177 131h50M177 143h58" stroke="#b58d72" strokeWidth="5" strokeLinecap="round"/>
   <path d="M136 171h148l-12 13H148Z" fill="#97735e"/>
   {[["কোড",64,61],["ডিজাইন",346,63],["মার্কেটিং",67,168],["নেটওয়ার্ক",344,170]].map(([label,x,y],index)=><g key={String(label)}>
    <circle cx={Number(x)} cy={Number(y)} r="28" fill={index%2?"#fffaf1":"#8b201d"} stroke="#8b201d" strokeWidth="2"/>
    <text x={Number(x)} y={Number(y)+5} textAnchor="middle" fontSize="11" fill={index%2?"#8b201d":"#fffaf1"}>{label}</text>
   </g>)}
   <path d="M90 69L151 111M319 70L268 111M91 160L151 148M316 161L269 148" stroke="#ad876e" strokeWidth="2" strokeDasharray="5 6"/>
   <circle cx="210" cy="130" r="8" fill="#1c6a4e">
    <animate attributeName="r" values="7;11;7" dur="1.8s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values=".7;1;.7" dur="1.8s" repeatCount="indefinite"/>
   </circle>
  </>}

  {chapter===1&&activeLesson===3&&<>
   <rect x="40" y="75" width="74" height="112" rx="12" fill="#5b443a"/>
   <rect x="49" y="86" width="56" height="84" rx="5" fill="#fffaf1"/>
   <circle cx="77" cy="178" r="4" fill="#c8ac8c"/>
   <rect x="306" y="75" width="74" height="112" rx="12" fill="#5b443a"/>
   <rect x="315" y="86" width="56" height="84" rx="5" fill="#fffaf1"/>
   <circle cx="343" cy="178" r="4" fill="#c8ac8c"/>
   <path d="M119 129H301" stroke="#b98c70" strokeWidth="3" strokeDasharray="8 7"/>
   <rect x="157" y="105" width="106" height="48" rx="24" fill="#8b201d"/>
   <text x="210" y="134" textAnchor="middle" fill="#fff8ef" fontSize="13">কাল ক্লাস ১০টায়</text>
   <g fill="#1d6b50">
    <circle cx="141" cy="129" r="5"><animate attributeName="cx" values="130;288;130" dur="3.4s" repeatCount="indefinite"/></circle>
   </g>
   <path d="M63 107h28M63 119h21M329 108h27M329 121h20" stroke="#c4a789" strokeWidth="4" strokeLinecap="round"/>
   <path d="M180 81q30-24 60 0M191 91q19-14 38 0" fill="none" stroke="#1d6b50" strokeWidth="3" strokeLinecap="round">
    <animate attributeName="opacity" values=".2;1;.2" dur="1.6s" repeatCount="indefinite"/>
   </path>
  </>}

  {chapter===1&&activeLesson===4&&<>
   <rect x="40" y="54" width="150" height="129" rx="10" fill="#fffaf1" stroke="#bea184" strokeWidth="2"/>
   <rect x="57" y="72" width="72" height="52" rx="6" fill="#657467"/>
   <text x="93" y="102" textAnchor="middle" fill="#fffaf1" fontSize="18">৳৫০</text>
   <g fill="#2d211c">{[140,146,151,159,166,172].map((x,i)=><rect key={x} x={x} y="72" width={i%2?3:5} height="54"/>)}</g>
   <rect x="66" y="144" width="98" height="24" rx="5" fill="#ead7bd"/>
   <text x="115" y="160" textAnchor="middle" fill="#6d4f3e" fontSize="11">স্টক: ৮</text>
   <g transform="translate(250 45)">
    <path d="M0 50h118v100H0Z" fill="#d5b894"/>
    <path d="M-8 50l20-30h94l20 30Z" fill="#8b201d"/>
    <path d="M14 20v30M38 20v30M62 20v30M86 20v30M110 20v30" stroke="#fff2df" strokeWidth="7"/>
    <rect x="18" y="83" width="34" height="67" fill="#fffaf1"/>
    <rect x="69" y="79" width="34" height="28" fill="#fffaf1"/>
   </g>
   <rect x="134" y="62" width="4" height="72" fill="#d62828" opacity=".7">
    <animate attributeName="x" values="134;177;134" dur="1.7s" repeatCount="indefinite"/>
   </rect>
   <circle cx="209" cy="176" r="10" fill="#1d6b50"><animate attributeName="r" values="7;11;7" dur="1.5s" repeatCount="indefinite"/></circle>
  </>}

  {chapter===1&&activeLesson===5&&<>
   <g transform="translate(45 58)">
    <path d="M0 52L72 10l72 42Z" fill="#8b201d"/>
    <rect y="52" width="144" height="88" rx="3" fill="#fffaf1"/>
    {[18,53,88,123].map(x=><rect key={x} x={x} y="69" width="16" height="55" fill="#d8c3a5"/>)}
    <path d="M-8 140H152" stroke="#7a5a48" strokeWidth="6"/>
   </g>
   <g transform="translate(236 52)">
    <rect width="132" height="144" rx="12" fill="#60483d"/>
    <rect x="12" y="14" width="108" height="112" rx="4" fill="#fffaf1"/>
    <path d="M27 40h75M27 58h60M27 76h70M27 94h42" stroke="#b68e73" strokeWidth="5" strokeLinecap="round"/>
    <circle cx="101" cy="105" r="13" fill="#1d6b50"/>
    <path d="M95 105l5 5 9-12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
   </g>
   <path d="M178 126H232" stroke="#b58c70" strokeWidth="3" strokeDasharray="6 5"/>
   <circle cy="126" r="5" fill="#d62828">
    <animate attributeName="cx" values="179;229;179" dur="2.2s" repeatCount="indefinite"/>
   </circle>
  </>}

  {chapter===1&&activeLesson===6&&<>
   <rect x="38" y="72" width="130" height="105" rx="10" fill="#fffaf1" stroke="#bea184" strokeWidth="2"/>
   <circle cx="103" cy="104" r="18" fill="#e5c7b7"/>
   <path d="M72 153q31-35 62 0" fill="#1d6b50"/>
   <rect x="252" y="72" width="130" height="105" rx="10" fill="#fffaf1" stroke="#bea184" strokeWidth="2"/>
   <circle cx="317" cy="104" r="18" fill="#e5c7b7"/>
   <path d="M286 153q31-35 62 0" fill="#8b201d"/>
   <path d="M168 122H252" stroke="#b58c70" strokeWidth="3" strokeDasharray="6 5"/>
   <circle cy="122" r="5" fill="#d62828">
    <animate attributeName="cx" values="176;244;176" dur="2.3s" repeatCount="indefinite"/>
   </circle>
   <path d="M185 49h18l8 15 9-31 10 28h22" fill="none" stroke="#d62828" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <animate attributeName="opacity" values=".3;1;.3" dur="1.1s" repeatCount="indefinite"/>
   </path>
   <rect x="157" y="188" width="106" height="22" rx="11" fill="#edf5f0"/>
   <text x="210" y="203" textAnchor="middle" fill="#245f47" fontSize="11">ডিজিটাল স্বাস্থ্যরেকর্ড</text>
  </>}

  {chapter===1&&activeLesson===7&&<>
   <rect x="47" y="45" width="326" height="151" rx="12" fill="#fffaf1" stroke="#bea184" strokeWidth="2"/>
   <path d="M78 166H343M78 166V78" stroke="#8d715d" strokeWidth="2"/>
   {[0,1,2,3,4].map((n)=><g key={n}>
    <rect x={103+n*48} y={166-(n===2?86:n===1?58:n===3?66:n===4?42:34)} width="26" height={n===2?86:n===1?58:n===3?66:n===4?42:34} rx="5" fill={n===2?"#8b201d":"#cf8e77"}>
     <animate attributeName="height" from="4" to={String(n===2?86:n===1?58:n===3?66:n===4?42:34)} dur=".8s" begin={String(n*.15)+"s"} fill="freeze"/>
     <animate attributeName="y" from="162" to={String(166-(n===2?86:n===1?58:n===3?66:n===4?42:34))} dur=".8s" begin={String(n*.15)+"s"} fill="freeze"/>
    </rect>
    <text x={116+n*48} y="184" textAnchor="middle" fontSize="10" fill="#6f5848">{n+1}h</text>
   </g>)}
   <circle cx="307" cy="87" r="28" fill="none" stroke="#1d6b50" strokeWidth="5">
    <animate attributeName="r" values="24;30;24" dur="2s" repeatCount="indefinite"/>
   </circle>
   <path d="M327 107l28 28" stroke="#1d6b50" strokeWidth="6" strokeLinecap="round"/>
  </>}

  {chapter===2&&<>
   <path d="M210 119L84 65M210 119L336 65M210 119L84 179M210 119L336 179" stroke="#ae8c72" strokeWidth="4"/>
   {[{x:52,y:35},{x:304,y:35},{x:52,y:149},{x:304,y:149}].map(({x,y})=><g key={String(x)+"-"+String(y)}><rect x={x} y={y} width="64" height="44" rx="5" fill="#fffaf1" stroke="#755a4a" strokeWidth="3"/><path d={"M"+String(x+32)+" "+String(y+44)+"v9m-16 0h32"} stroke="#755a4a" strokeWidth="3"/></g>)}
   <rect x="167" y="95" width="86" height="48" rx="11" fill="#8b201d"/>
   {[182,195,208,221,234].map(x=><rect key={x} x={x} y="115" width="7" height="12" rx="1" fill="#f4dfc6"/>)}
   <text x="210" y="170" textAnchor="middle" fill="#6e4b37" fontSize="14">কেন্দ্রীয় সুইচ</text>
  </>}
  {chapter===3&&<>
   <rect x="65" y="50" width="290" height="146" rx="12" fill="#6c5145"/>
   <rect x="76" y="62" width="268" height="122" rx="5" fill="#fffaf1"/>
   <path d="M210 81l47 19v37c0 25-30 42-47 49-17-7-47-24-47-49v-37Z" fill="#8b201d"/>
   <path d="M190 132l14 14 28-32" fill="none" stroke="#fff4de" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
   <path d="M48 198H372L355 213H65Z" fill="#a18470"/>
  </>}
  {chapter===4&&<>
   <rect x="52" y="30" width="316" height="180" rx="10" fill="#fffaf1" stroke="#c8ae8e" strokeWidth="2"/>
   <rect x="52" y="30" width="316" height="35" rx="10" fill="#657467"/>
   <text x="72" y="53" fill="#fffaf1" fontSize="15">=SUM(B2:B3)</text>
   <path d="M52 95h316m-316 35h316m-316 35h316M104 65v145m132-145v145" stroke="#d5c1a5" strokeWidth="2"/>
   <rect x="237" y="166" width="130" height="43" fill="#f4dfd3" stroke="#8b201d" strokeWidth="2"/>
   <text x="302" y="194" textAnchor="middle" fill="#8b201d" fontSize="22" fontWeight="700">15</text>
  </>}
  {chapter===5&&<>
   <rect x="58" y="32" width="304" height="174" rx="12" fill="#fffaf1" stroke="#c8ae8e" strokeWidth="2"/>
   <path d="M58 67H362" stroke="#d8c4a8" strokeWidth="2"/>
   {[77,91,105].map(x=><circle key={x} cx={x} cy="49" r="3" fill="#b88c71"/>)}
   <rect x="125" y="43" width="218" height="14" rx="7" fill="#e9dfcf"/>
   <circle cx="156" cy="125" r="35" fill="#e7d3bb"/>
   <rect x="220" y="97" width="103" height="63" rx="6" fill="#8b201d"/>
   <path d="M224 102l48 32 47-32" stroke="#fff1dc" strokeWidth="3" fill="none"/>
  </>}
 </svg>;
}
