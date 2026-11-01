export type PeekSide="left"|"right"|"top"|"bottom";
const SIDES:readonly PeekSide[]=["left","right","top","bottom"];

// Pick any edge on the first visit, then one of the other three edges for variety.
export function nextPeekSide(previous:PeekSide|null,random:()=>number):PeekSide{
  const choices=SIDES.filter(side=>side!==previous);
  const index=Math.min(choices.length-1,Math.floor(random()*choices.length));
  return choices[Math.max(0,index)];
}

// Pick a safe center along the selected edge, accounting for the mascot's
// rotated dimensions and keeping it inside short/narrow viewports.
export function peekEdgeOffset(side:PeekSide,viewportWidth:number,viewportHeight:number,random:()=>number){
  const vertical=side==="left"||side==="right";
  const viewport=vertical?viewportHeight:viewportWidth;
  const width=vertical
    ?Math.min(110,Math.max(70,viewportWidth*.08))
    :Math.min(290,Math.max(180,viewportWidth*.24));
  const extent=vertical?width*780/300:width;
  const margin=Math.min(viewport/2,extent/2+12);
  const offset=margin+random()*Math.max(0,viewport-2*margin);
  return Math.round(offset);
}
