import {useId} from "react";

export default function IctChapterVisual({chapter}:{chapter:number}){
 const titleId=useId();
 const titles:Record<number,string>={1:"তথ্য থেকে যোগাযোগ ও সেবা",2:"যন্ত্রগুলো যুক্ত করে একটি নেটওয়ার্ক",3:"ডিজিটাল তথ্য ও পরিচয়ের সুরক্ষা",4:"সেলের মান থেকে সূত্রে হিসাব",5:"ইন্টারনেটে শিক্ষা, তথ্য ও ইমেইল"};
 return <svg viewBox="0 0 420 240" role="img" aria-labelledby={titleId}>
  <title id={titleId}>{titles[chapter]}</title>
  <rect width="420" height="240" rx="18" fill="#efe2cf"/>
  <circle cx="370" cy="35" r="85" fill="#e4cfad" opacity=".5"/>
  <path d="M0 207H420" stroke="#c7ad88" strokeWidth="2"/>
  {chapter===1&&<>
   <path d="M92 87Q210 5 328 87M92 87V145M210 45V108M328 87V145" fill="none" stroke="#b28365" strokeWidth="3" strokeDasharray="6 7"/>
   {[92,210,328].map((x,i)=><g key={x}><circle cx={x} cy={i===1?45:87} r="24" fill={i===1?"#8b201d":"#fffaf1"}/><text x={x} y={i===1?52:94} textAnchor="middle" fill={i===1?"#fffaf1":"#8b201d"} fontSize="19">{["তথ্য","সেবা","শেখা"][i]}</text></g>)}
   <rect x="130" y="112" width="160" height="92" rx="9" fill="#62483d"/>
   <rect x="140" y="122" width="140" height="71" rx="3" fill="#fffaf1"/>
   <rect x="153" y="136" width="34" height="42" rx="4" fill="#e9c5b8"/>
   <path d="M200 140H263M200 154H254M200 168H245" stroke="#b3896c" strokeWidth="5" strokeLinecap="round"/>
   <path d="M112 204H308L296 216H124Z" fill="#987765"/>
  </>}
  {chapter===2&&<>
   <path d="M210 119L84 65M210 119L336 65M210 119L84 179M210 119L336 179" stroke="#ae8c72" strokeWidth="4"/>
   {[{x:52,y:35},{x:304,y:35},{x:52,y:149},{x:304,y:149}].map(({x,y})=><g key={`${x}-${y}`}><rect x={x} y={y} width="64" height="44" rx="5" fill="#fffaf1" stroke="#755a4a" strokeWidth="3"/><path d={`M${x+32} ${y+44}v9m-16 0h32`} stroke="#755a4a" strokeWidth="3"/></g>)}
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
   <circle cx="107" cy="101" r="5" fill="#b68c68"/><circle cx="107" cy="124" r="5" fill="#b68c68"/><path d="M122 101h30m-30 23h30" stroke="#d9c2a5" strokeWidth="5" strokeLinecap="round"/>
  </>}
  {chapter===4&&<>
   <rect x="52" y="30" width="316" height="180" rx="10" fill="#fffaf1" stroke="#c8ae8e" strokeWidth="2"/>
   <rect x="52" y="30" width="316" height="35" rx="10" fill="#657467"/>
   <text x="72" y="53" fill="#fffaf1" fontSize="15">=SUM(B2:B3)</text>
   <path d="M52 95h316m-316 35h316m-316 35h316M104 65v145m132-145v145" stroke="#d5c1a5" strokeWidth="2"/>
   <g fontSize="16" fill="#6d5a4a" textAnchor="middle"><text x="78" y="87">1</text><text x="78" y="120">2</text><text x="78" y="155">3</text><text x="78" y="190">4</text><text x="170" y="87">A</text><text x="302" y="87">B</text><text x="170" y="120">খাতা</text><text x="302" y="120">5</text><text x="170" y="155">কলম</text><text x="302" y="155">10</text><text x="170" y="190">মোট</text></g>
   <rect x="237" y="166" width="130" height="43" fill="#f4dfd3" stroke="#8b201d" strokeWidth="2"/>
   <text x="302" y="194" textAnchor="middle" fill="#8b201d" fontSize="22" fontWeight="700">15</text>
  </>}
  {chapter===5&&<>
   <rect x="58" y="32" width="304" height="174" rx="12" fill="#fffaf1" stroke="#c8ae8e" strokeWidth="2"/>
   <path d="M58 67H362" stroke="#d8c4a8" strokeWidth="2"/>
   {[77,91,105].map(x=><circle key={x} cx={x} cy="49" r="3" fill="#b88c71"/>)}
   <rect x="125" y="43" width="218" height="14" rx="7" fill="#e9dfcf"/>
   <circle cx="156" cy="125" r="35" fill="#e7d3bb"/>
   <path d="M121 125h70m-35-35c-24 18-24 52 0 70m0-70c24 18 24 52 0 70" stroke="#8e644e" strokeWidth="2" fill="none"/>
   <rect x="220" y="97" width="103" height="63" rx="6" fill="#8b201d"/>
   <path d="M224 102l48 32 47-32" stroke="#fff1dc" strokeWidth="3" fill="none"/>
   <path d="M111 184h198" stroke="#d9c4a9" strokeWidth="5" strokeLinecap="round"/>
  </>}
 </svg>;
}
