"use client";

import {useEffect,useRef,useState} from "react";

declare global{
  interface Window{
    __bujhiMappoPromise?:Promise<void>;
  }
}

function loadMappo(){
  if(typeof window==="undefined")return Promise.resolve();
  if(customElements.get("mappo-world"))return Promise.resolve();
  if(window.__bujhiMappoPromise)return window.__bujhiMappoPromise;

  window.__bujhiMappoPromise=new Promise<void>((resolve,reject)=>{
    const existing=document.querySelector<HTMLScriptElement>('script[data-bujhi-mappo="true"]');
    if(existing){
      customElements.whenDefined("mappo-world").then(()=>resolve()).catch(reject);
      return;
    }
    const script=document.createElement("script");
    script.type="module";
    script.src="/vendor/mappo-all.js";
    script.dataset.bujhiMappo="true";
    script.onload=()=>customElements.whenDefined("mappo-world").then(()=>resolve()).catch(reject);
    script.onerror=()=>reject(new Error("Could not load desk globe"));
    document.head.appendChild(script);
  });
  return window.__bujhiMappoPromise;
}

export default function RotatingDeskGlobe({onFact}:{onFact:()=>void}){
  const mountRef=useRef<HTMLDivElement|null>(null);
  const[ready,setReady]=useState(false);

  useEffect(()=>{
    let cancelled=false;

    void loadMappo().then(()=>{
      if(cancelled||!mountRef.current)return;
      mountRef.current.replaceChildren();

      const globe=document.createElement("mappo-world");
      globe.setAttribute("mode","globe");
      globe.setAttribute("rotate-speed","4.5");
      globe.setAttribute("tilt","19");
      globe.setAttribute("focus","23.8,90.4");
      globe.setAttribute("cols","118");
      globe.setAttribute("figure","solid outline");
      globe.setAttribute("figure-source","vector");
      globe.setAttribute("background","#6f9299");
      globe.setAttribute("ground-color","#6f9299");
      globe.setAttribute("figure-color","#d9bc91");
      globe.setAttribute("figure-stroke","#6e4337");
      globe.setAttribute("figure-stroke-width","1");
      globe.setAttribute("graticule","");
      globe.setAttribute("meridians","12");
      globe.setAttribute("parallels","8");
      globe.setAttribute("graticule-color","#f5eadf");
      globe.setAttribute("graticule-opacity",".28");
      globe.setAttribute("globe-ring","");
      globe.setAttribute("interactive","");
      globe.setAttribute("places","Dhaka");
      globe.setAttribute("marker-color","#8b201d");
      globe.setAttribute("marker-scale",".85");
      globe.setAttribute("marker-pulse","");
      globe.setAttribute("aria-label","Rotating Earth globe with Dhaka marked");
      globe.style.display="block";
      globe.style.width="100%";
      globe.style.height="100%";

      mountRef.current.appendChild(globe);
      setReady(true);
    }).catch(()=>setReady(false));

    return()=>{cancelled=true};
  },[]);

  return <aside className="login-rotating-globe" aria-label="Rotating desk globe">
    <div className="login-globe-axis" aria-hidden={!ready}>
      <div ref={mountRef} className={ready?"login-globe-canvas is-ready":"login-globe-canvas"}/>
    </div>
    <span className="login-globe-neck" aria-hidden="true"/>
    <span className="login-globe-base" aria-hidden="true"/>
    <button type="button" className="login-globe-fact" onClick={onFact}>World fact</button>
    <a className="login-globe-credit" href="https://mappojs.com/" target="_blank" rel="noopener noreferrer">Globe by Mappo.js</a>
  </aside>;
}
