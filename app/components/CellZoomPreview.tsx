"use client";

import {useEffect,useRef} from "react";

type Props={running:boolean;onFact?:(text:string)=>void};

const CONCORD_URL="https://lab.concord.org/embeddable.html#interactives/sam/DNA-to-proteins/1-dna-to-protein.json";

export default function CellZoomPreview({running,onFact}:Props){
  const frameRef=useRef<HTMLIFrameElement|null>(null);

  useEffect(()=>{
    if(running)return;
    onFact?.("The biology interactive is paused only when you stop interacting with it; use its own controls inside the frame.");
  },[running,onFact]);

  return <div className="concord-bio-preview" data-no-translate>
    <iframe
      ref={frameRef}
      src={CONCORD_URL}
      title="DNA to Protein interactive by Concord Consortium"
      loading="lazy"
      allow="fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
    />
    <div className="concord-bio-credit" aria-hidden="true">Concord Consortium · DNA to Protein</div>
  </div>;
}
