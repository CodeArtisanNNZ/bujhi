"use client";

const coreFacts = [
  "Astronomy · The Sun is a star.",
  "Astronomy · Earth is the third planet from the Sun.",
  "Astronomy · The Solar System has eight recognized planets.",
  "Astronomy · The Moon is Earth's only natural satellite.",
  "Astronomy · Mercury is the closest planet to the Sun.",
  "Astronomy · Venus is the hottest planet in the Solar System.",
  "Astronomy · Mars looks reddish because iron minerals on its surface have oxidized.",
  "Astronomy · Jupiter is the largest planet in the Solar System.",
  "Astronomy · Saturn's rings are made mostly of ice particles with some rock and dust.",
  "Astronomy · Uranus rotates with an extreme axial tilt, so it appears to roll around the Sun.",
  "Astronomy · Neptune is the farthest recognized planet from the Sun.",
  "Astronomy · Sunlight takes about 8 minutes and 20 seconds to reach Earth.",
  "Astronomy · The Milky Way is the galaxy that contains our Solar System.",
  "Astronomy · A light-year is a unit of distance, not time.",
  "Astronomy · Comets are made largely of ice, dust, and rocky material.",
  "Astronomy · The main asteroid belt lies between Mars and Jupiter.",
  "Astronomy · A solar eclipse occurs when the Moon passes between Earth and the Sun.",
  "Astronomy · A lunar eclipse occurs when the Moon moves through Earth's shadow.",
  "Astronomy · Earth's seasons are caused mainly by the tilt of Earth's axis.",
  "Astronomy · Gravity keeps planets in orbit around the Sun.",
  "Biology · DNA stores hereditary information in living organisms.",
  "Biology · The cell is the basic structural and functional unit of life.",
  "Biology · Plant cells contain chloroplasts for photosynthesis.",
  "Biology · Photosynthesis uses light energy to make sugars from carbon dioxide and water.",
  "Biology · Chlorophyll absorbs light used in photosynthesis.",
  "Biology · Mitochondria help cells release usable energy from food molecules.",
  "Biology · The human heart has four chambers.",
  "Biology · An adult human skeleton usually has 206 bones.",
  "Biology · Skin is the largest organ of the human body.",
  "Biology · Hemoglobin in red blood cells carries oxygen.",
  "Biology · Neurons communicate using electrical and chemical signals.",
  "Biology · Mature human red blood cells do not contain a nucleus.",
  "Biology · Bacteria are prokaryotes, so they do not have a membrane-bound nucleus.",
  "Biology · Fungi form their own kingdom and are not plants.",
  "Biology · Whales are mammals and breathe air with lungs.",
  "Biology · Birds are endothermic, meaning they regulate their internal body temperature.",
  "Biology · Amphibians commonly begin life in water and later develop for life on land.",
  "Biology · Pollination is the transfer of pollen that enables fertilization in flowering plants.",
  "Biology · Genes are segments of DNA that can influence inherited traits.",
  "Biology · Meiosis produces cells with half the chromosome number of the parent cell.",
  "Earth science · About 71 percent of Earth's surface is covered by water.",
  "Earth science · The Pacific Ocean is Earth's largest ocean.",
  "Earth science · Earth has a solid inner core and a liquid outer core.",
  "Earth science · Earth's crust is broken into moving tectonic plates.",
  "Earth science · Most earthquakes occur near tectonic plate boundaries.",
  "Earth science · Volcanoes can form where tectonic plates separate, collide, or above hotspots.",
  "Earth science · The equator divides Earth into Northern and Southern Hemispheres.",
  "Earth science · Lines of latitude run east-west and measure position north or south of the equator.",
  "Earth science · Lines of longitude run from pole to pole and measure position east or west.",
  "Earth science · Weather describes short-term atmospheric conditions.",
  "Earth science · Climate describes long-term patterns of weather.",
  "Earth science · Clouds form when water vapor condenses into tiny droplets or ice crystals.",
  "Earth science · The water cycle includes evaporation, condensation, precipitation, and collection.",
  "Earth science · Glaciers store a large share of Earth's fresh water.",
  "Earth science · Soil forms from weathered rock mixed with organic matter, water, and air.",
  "Earth science · The atmosphere is mostly nitrogen and oxygen.",
  "Earth science · The ozone layer absorbs much of the Sun's harmful ultraviolet radiation.",
  "Earth science · Fossils provide evidence about organisms that lived in the past.",
  "Earth science · Sedimentary rock commonly forms from deposited sediments that become compacted and cemented.",
  "Earth science · Metamorphic rock forms when existing rock is changed by heat, pressure, or chemically active fluids.",
  "Computing · A bit can store one binary value: 0 or 1.",
  "Computing · Eight bits make one byte in modern computing.",
  "Computing · Binary numbers use base 2.",
  "Computing · HTML describes the structure of a web page.",
  "Computing · CSS controls the presentation and layout of web content.",
  "Computing · JavaScript can add behavior and interactivity to web pages.",
  "Computing · HTTP status code 404 means a requested resource was not found.",
  "Computing · HTTPS protects data in transit by using TLS encryption.",
  "Computing · URL stands for Uniform Resource Locator.",
  "Computing · DNS maps human-readable domain names to network addresses.",
  "Computing · IPv4 addresses are 32 bits long.",
  "Computing · IPv6 addresses are 128 bits long.",
  "Computing · Git records the history of changes to files.",
  "Computing · A Git commit is a saved snapshot of a project's tracked state.",
  "Computing · A Git branch lets development continue on a separate line of work.",
  "Computing · A repository stores project files together with version history.",
  "Computing · JSON represents data using objects, arrays, strings, numbers, booleans, and null.",
  "Computing · A primary key uniquely identifies a row in a relational database table.",
  "Computing · RAM is volatile memory, so its contents are normally lost when power is removed.",
  "Computing · An SSD stores data without the spinning disks used in traditional hard drives.",
  "Language · A noun names a person, place, thing, or idea.",
  "Language · A verb can express an action, occurrence, or state.",
  "Language · An adjective modifies a noun or pronoun.",
  "Language · An adverb can modify a verb, adjective, another adverb, or an entire clause.",
  "Language · A prefix is added before a root or base word.",
  "Language · A suffix is added after a root or base word.",
  "Language · Synonyms are words with the same or similar meanings.",
  "Language · Antonyms are words with opposite meanings.",
  "Language · Homophones sound alike but can have different spellings and meanings.",
  "Language · A palindrome reads the same forward and backward when spacing and punctuation are ignored.",
  "Language · A simile compares things using words such as 'like' or 'as'.",
  "Language · A metaphor makes a comparison without using 'like' or 'as'.",
  "Language · In active voice, the grammatical subject performs the action.",
  "Language · In passive voice, the grammatical subject receives the action.",
  "Language · English has 26 letters in its modern alphabet.",
  "Learning · Retrieval practice strengthens memory by making you recall information.",
  "Learning · Spacing study sessions over time usually supports longer-lasting memory than cramming.",
  "Learning · Explaining an idea in your own words can reveal what you do and do not understand.",
  "Learning · Sleep supports memory consolidation after learning.",
  "Learning · Mixing worked examples with practice can help learners connect procedures to concepts."
];

const squareFacts = Array.from({length:120},(_,i)=>{
  const n=i+1;
  return `Math · ${n} squared is ${n*n}.`;
});

const cubeFacts = Array.from({length:80},(_,i)=>{
  const n=i+1;
  return `Math · ${n} cubed is ${n*n*n}.`;
});

const multiplicationFacts = Array.from({length:20},(_,a)=>
  Array.from({length:5},(_,b)=>{
    const x=a+2;
    const y=b+7;
    return `Math · ${x} × ${y} = ${x*y}.`;
  })
).flat();

const percentageFacts = Array.from({length:100},(_,i)=>{
  const n=i+1;
  return `Math · ${n}% means ${n} out of every 100.`;
});

const powerOfTwoFacts = Array.from({length:64},(_,i)=>
  `Computing · 2 to the power of ${i} equals ${2 ** i}.`
);

const binaryFacts = Array.from({length:128},(_,i)=>
  `Computing · Decimal ${i} is ${i.toString(2)} in binary.`
);

function firstPrimes(count:number){
  const primes:number[]=[];
  let candidate=2;
  while(primes.length<count){
    let prime=true;
    for(let d=2;d*d<=candidate;d++){
      if(candidate%d===0){prime=false;break;}
    }
    if(prime)primes.push(candidate);
    candidate++;
  }
  return primes;
}

const primeFacts = firstPrimes(208).map((prime,i)=>
  `Number theory · ${prime} is prime number #${i+1} in ascending order.`
);

const elementNames = [
  "Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon",
  "Sodium","Magnesium","Aluminium","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium",
  "Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc",
  "Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium",
  "Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin",
  "Antimony","Tellurium","Iodine","Xenon","Caesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium",
  "Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium",
  "Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury",
  "Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium",
  "Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium"
];

const elementFacts = elementNames.map((name,i)=>
  `Chemistry · ${name} has atomic number ${i+1}.`
);

const generatedFacts = [
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

export const openThoughtFacts = generatedFacts.slice(0,1000);

if(openThoughtFacts.length!==1000){
  throw new Error(`Expected 1000 open-thought facts, got ${openThoughtFacts.length}`);
}
