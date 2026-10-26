import {paintTexture,type ClassroomArt} from "./classroomArt";
export type Point3=[number,number,number];
export type ClassroomSeat={id:number;position:Point3;en:string;bn:string;style:number};
const columns=[-3.7,-2.55,-1.4,1.4,2.55,3.7];
const locations=[["left window","বাম জানালার পাশে"],["left middle","বাম দিকের মাঝখানে"],["left aisle","বাম চলাচলপথের পাশে"],["right aisle","ডান চলাচলপথের পাশে"],["right middle","ডান দিকের মাঝখানে"],["right window","ডান জানালার পাশে"]];
export const CLASSROOM_SEATS:ClassroomSeat[]=Array.from({length:12},(_,i)=>({
  id:i+1,position:[columns[i%6],0,i<6?-.35:2.15],
  en:(i<6?"Front row · ":"Back row · ")+locations[i%6][0],
  bn:(i<6?"সামনের সারি · ":"পেছনের সারি · ")+locations[i%6][1],
  style:[0,1,2,3,0,2,3,0,2,0,1,2][i]
}));
const dot=(a:Point3,b:Point3)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const sub=(a:Point3,b:Point3):Point3=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const cross=(a:Point3,b:Point3):Point3=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=(v:Point3):Point3=>{const n=Math.hypot(...v);return[v[0]/n,v[1]/n,v[2]/n];};

export function classroomCamera(angle:number,width:number,height:number){
  const eye:Point3=[Math.sin(angle)*13.8,7.4,Math.cos(angle)*13.8];
  const forward=unit(sub([0,1.4,0],eye)),right=unit(cross(forward,[0,1,0])),up=cross(right,forward);
  const raw=(point:Point3)=>{const delta=sub(point,eye),depth=dot(delta,forward);return{x:dot(delta,right)/depth,y:-dot(delta,up)/depth,depth};};
  const bounds=[-5.2,5.2].flatMap(x=>[0,4.25].flatMap(y=>[-4.6,4.6].map(z=>raw([x,y,z]))));
  const minX=Math.min(...bounds.map(p=>p.x)),maxX=Math.max(...bounds.map(p=>p.x)),minY=Math.min(...bounds.map(p=>p.y)),maxY=Math.max(...bounds.map(p=>p.y));
  const padding=Math.max(14,Math.min(width,height)*.045);
  const focal=Math.min((width-padding*2)/(maxX-minX),(height-padding*2)/(maxY-minY));
  const originX=width/2-focal*(minX+maxX)/2,originY=height/2-focal*(minY+maxY)/2;
  return {eye,project:(point:Point3)=>{const p=raw(point);return{x:originX+p.x*focal,y:originY+p.y*focal,depth:p.depth,scale:focal/p.depth};}};
}

export function hitClassroomSeat(angle:number,width:number,height:number,x:number,y:number){
  const {project}=classroomCamera(angle,width,height);
  const hits=CLASSROOM_SEATS.map(seat=>{
    const p=project([seat.position[0],1.55,seat.position[2]]);
    return {id:seat.id,distance:Math.hypot(p.x-x,p.y-y),radius:Math.max(16,Math.min(28,p.scale*.5))};
  }).filter(hit=>hit.distance<=hit.radius).sort((a,b)=>a.distance-b.distance);
  return hits[0]?.id??null;
}

type SceneOptions={angle:number;dark:boolean;selected:number|null;hovered:number|null;bangla:boolean;time:number;art?:ClassroomArt};
export function paintClassroom(ctx:CanvasRenderingContext2D,width:number,height:number,options:SceneOptions){
  const {project,eye}=classroomCamera(options.angle,width,height);
  const items:{depth:number;draw:()=>void}[]=[];
  const groundItems:{depth:number;draw:()=>void}[]=[];
  const art=options.art;
  const wood=options.dark?["#a47548","#704b31","#503726"]:["#c3945e","#a67543","#80532e"];
  const wall=options.dark?"#4b4033":"#ecddbf",floor=options.dark?"#5a4736":"#dfc7a3",line=options.dark?"#291f19":"#866747";
  const polygon=(points:Point3[],fill:string,stroke?:string,bias=0)=>{
    const p=points.map(project);
    items.push({depth:p.reduce((n,a)=>n+a.depth,0)/p.length+bias,draw:()=>{
      ctx.beginPath();p.forEach((v,i)=>i?ctx.lineTo(v.x,v.y):ctx.moveTo(v.x,v.y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();
      if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.7;ctx.stroke();}
    }});
  };
  const line3=(a:Point3,b:Point3,color:string,strokeWidth=1)=>{
    const p=project(a),q=project(b);items.push({depth:(p.depth+q.depth)/2,draw:()=>{
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=color;ctx.lineWidth=strokeWidth;ctx.stroke();
    }});
  };
  const texture=(points:Point3[],image:HTMLImageElement|HTMLCanvasElement,alpha=1,divisions=5)=>{
    const corners=points.map(project);
    items.push({depth:corners.reduce((sum,p)=>sum+p.depth,0)/4-.018,draw:()=>{
      ctx.save();ctx.globalAlpha=alpha;
      paintTexture(ctx,image,(u,v)=>{
        const top=points[0].map((n,i)=>n+(points[1][i]-n)*u),bottom=points[3].map((n,i)=>n+(points[2][i]-n)*u);
        return project(top.map((n,i)=>n+(bottom[i]-n)*v) as Point3);
      },divisions);ctx.restore();
    }});
  };
  const box=(x:number,y:number,z:number,w:number,h:number,d:number,colors=wood)=>{
    const a=x-w/2,b=x+w/2,c=z-d/2,e=z+d/2,t=y+h;
    polygon([[a,t,c],[b,t,c],[b,t,e],[a,t,e]],colors[0],line);
    polygon(eye[2]>z?[[a,y,e],[b,y,e],[b,t,e],[a,t,e]]:[[b,y,c],[a,y,c],[a,t,c],[b,t,c]],colors[1],line);
    polygon(eye[0]>x?[[b,y,e],[b,y,c],[b,t,c],[b,t,e]]:[[a,y,c],[a,y,e],[a,t,e],[a,t,c]],colors[2],line);
    if(art&&colors===wood&&w>1){
      texture([[a,t,c],[b,t,c],[b,t,e],[a,t,e]],art.wood,.2,1);
      texture(eye[2]>z?[[a,t,e],[b,t,e],[b,y,e],[a,y,e]]:[[b,t,c],[a,t,c],[a,y,c],[b,y,c]],art.wood,.15,1);
    }
  };
  const disc=(x:number,y:number,z:number,rx:number,rz:number,fill:string)=>{
    polygon(Array.from({length:32},(_,i)=>{const a=i*Math.PI/16;return[x+Math.cos(a)*rx,y,z+Math.sin(a)*rz] as Point3;}),fill);
    if(y<.1)groundItems.push(items.pop()!);
  };
  const sprite=(point:Point3,draw:(scale:number)=>void,bias=0)=>{
    const p=project(point);items.push({depth:p.depth+bias,draw:()=>{ctx.save();ctx.translate(p.x,p.y);draw(p.scale);ctx.restore();}});
  };
  const wallText=(text:string,x:number,y:number,z:number)=>sprite([x,y,z],scale=>{
    ctx.fillStyle="#e8eee2";ctx.textAlign="center";ctx.font="500 "+Math.max(11,scale*.27)+'px "Bujhi Bangla", Georgia, serif';ctx.fillText(text,0,0,Math.max(30,scale*4.1));
  },-.12);

  // World positions are shared by the drawing and the accessible seat buttons.
  polygon([[-5.2,0,-4.6],[5.2,0,-4.6],[5.2,0,4.6],[-5.2,0,4.6]],floor);
  for(let x=-5;x<=5;x++)line3([x,.012,-4.6],[x,.012,4.6],options.dark?"#725a4344":"#b8976d55",.65);
  for(let z=-4;z<=4;z++)line3([-5.2,.012,z],[5.2,.012,z],options.dark?"#725a4344":"#b8976d55",.65);
  for(let z=-3.6;z<3;z+=2.2)polygon([[-5.1,.025,z],[-1.9,.025,z+.65],[-.8,.025,z+1.3],[-5.1,.025,z+.55]],options.dark?"#f0cb6920":"#fff6d27a");
  const floorItems=items.splice(0);

  function endWall(z:number){
    const front=z<0;if(!(front?eye[2]>z:eye[2]<z))return;
    const inset=front?.025:-.025;
    polygon([[-5.2,0,z],[5.2,0,z],[5.2,4.25,z],[-5.2,4.25,z]],wall);
    polygon([[-5.2,0,z+inset],[5.2,0,z+inset],[5.2,1.05,z+inset],[-5.2,1.05,z+inset]],options.dark?"#6e3730":"#a95441");
    line3([-5.2,1.08,z+inset],[5.2,1.08,z+inset],wood[0],3);
    box(0,1.7,z+inset*3,5.35,2.05,.12);
    const Z=z+inset*7;
    polygon([[-2.51,1.84,Z],[2.51,1.84,Z],[2.51,3.59,Z],[-2.51,3.59,Z]],options.dark?"#263b31":"#365744","#b29b6b");
    if(front){
      wallText(options.bangla?"চলো, একসঙ্গে বুঝি।":"Let’s figure it out together.",0,2.8,Z+inset);
      wallText(options.bangla?"তোমার জায়গা এখানেই।":"There’s a place for you here.",0,2.35,Z+inset);
      polygon([[-4.65,2.1,Z],[-3.05,2.1,Z],[-3.05,3.6,Z],[-4.65,3.6,Z]],"#f4e7c9",wood[1]);
      polygon([[-4.4,2.55,Z+.01],[-3.3,2.55,Z+.01],[-3.3,3.25,Z+.01],[-4.4,3.25,Z+.01]],"#37674d");
      polygon(Array.from({length:32},(_,i)=>{const a=i*Math.PI/16;return[-3.9+Math.cos(a)*.22,2.9+Math.sin(a)*.22,Z+.025] as Point3;}),"#ae302d");
    }else wallText(options.bangla?"সবার শেখার পথ আলাদা।":"Different minds. Shared discoveries.",0,2.75,Z+inset);
  }
  endWall(-4.6);endWall(4.6);
  function sideWall(x:number){
    const left=x<0;if(left?eye[0]<x:eye[0]>x)return;
    const inset=left?.025:-.025,X=x+inset;
    polygon([[x,0,-4.6],[x,0,4.6],[x,4.25,4.6],[x,4.25,-4.6]],wall);
    polygon([[X,0,-4.6],[X,0,4.6],[X,1.05,4.6],[X,1.05,-4.6]],options.dark?"#6e3730":"#a95441");
    for(const z of [-2.9,0,2.9]){
      if(art){
        const image=art.windowFrames[Math.floor(options.time/280)%art.windowFrames.length],xImage=X+inset*3;
        const near=z+1.06,far=z-1.06;
        texture([[xImage,3.85,left?near:far],[xImage,3.85,left?far:near],[xImage,1.45,left?far:near],[xImage,1.45,left?near:far]],image,options.dark?.82:1);
      }
    }
  }
  sideWall(-5.2);sideWall(5.2);
  function plant(x:number,z:number){
    box(x,0,z,.47,.5,.47,["#c69566","#a26b47","#7b4d34"]);
    for(let i=0;i<7;i++){
      const a=i*2.4,tip:Point3=[x+Math.cos(a)*.4,.75+(i%3)*.24,z+Math.sin(a)*.32];
      line3([x,.4,z],tip,"#42644a",1.6);
      polygon([[tip[0]-.13,tip[1]-.16,tip[2]],[tip[0],tip[1]+.18,tip[2]+.1],[tip[0]+.18,tip[1]-.04,tip[2]]],i%2?"#55774e":"#76955c");
    }
  }
  if(eye[2]<4.6){
    plant(4.35,3.9);box(0,0,4.08,2.6,1.5,.55);
    for(let row=0;row<2;row++){
      for(let n=0;n<13;n++)box(-1.08+n*.18,.12+row*.69,3.84,.13,.35+(n%4)*.07,.25,["#e2c89c",["#813d34","#a77a4b","#637357","#d5bb8d"][n%4],"#795d40"]);
      box(0,.12+row*.69,3.74,2.5,.06,.65);
    }
  }
  if(eye[2]>-4.6){
  plant(-4.3,-3.6);
  box(-3.9,0,-3.6,.85,1.05,.7);
  sprite([-3.9,1.43,-3.6],scale=>{
    ctx.scale(scale,scale);ctx.lineWidth=.045;ctx.strokeStyle="#ad905c";ctx.beginPath();ctx.arc(0,0,.34,-1.3,1.8);ctx.stroke();
    ctx.fillStyle="#91b2ad";ctx.beginPath();ctx.arc(0,0,.27,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#b7ab70";ctx.beginPath();ctx.ellipse(-.08,-.08,.09,.17,-.5,0,Math.PI*2);ctx.ellipse(.12,.1,.08,.12,.4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=wood[1];ctx.fillRect(-.17,.32,.34,.06);
  });
  box(3.25,0,-3.2,2.4,1.08,1.04);box(3.25,1.08,-3.2,2.65,.12,1.22);
  box(3.65,1.2,-3.25,.18,.32,.18,["#b96b48","#8b4733","#6e392b"]);
  for(let n=0;n<3;n++)line3([3.6+n*.05,1.5,-3.25],[3.57+n*.08,1.78,-3.25],"#48362a",1.5);
  }
  for(const row of [-1.08,1.42])for(const x of [-2.55,2.55]){
    disc(x,.035,row+.45,1.9,.85,"#3d29191a");
    for(const dx of [-1.5,1.5])for(const dz of [-.36,.36])box(x+dx,0,row+dz,.1,1.05,.1);
    box(x,.98,row,3.5,.14,1.04);box(x,.58,row+1,3.5,.11,.52);
    for(const dx of [-1.5,1.5])box(x+dx,0,row+1,.11,1.07,.11);
    box(x,.89,row+1.15,3.5,.3,.08);
    for(const dx of [-1.15,0,1.15]){
      const xx=x+dx;
      polygon([[xx-.36,1.128,row-.18],[xx,1.14,row-.11],[xx,1.14,row+.33],[xx-.36,1.128,row+.26]],"#f8f0dc","#c4ad85");
      polygon([[xx,1.14,row-.11],[xx+.36,1.128,row-.18],[xx+.36,1.128,row+.26],[xx,1.14,row+.33]],"#fff9e8","#c4ad85");
    }
  }
  CLASSROOM_SEATS.forEach(seat=>{
    const [x,,z]=seat.position,front=Math.cos(options.angle)<-.15;
    if(seat.id===options.selected||seat.id===options.hovered){disc(x,.05,z,.57,.45,seat.id===options.selected?"#b83e374d":"#f7dfa15c");disc(x,.055,z,.4,.3,"#f8e4b962");}
    if(!art)return;
    const variant=seat.style===0?0:seat.style===2?1:2,image=art.pupils[variant+(front?0:3)];
    sprite([x,front?1.02:.67,z],scale=>{
      const h=scale*(front?1.13:1.39),w=h*image.width/image.height;
      ctx.rotate(Math.sin(options.time*.00065+seat.id)*.003);
      if(options.dark)ctx.globalAlpha=.94;
      ctx.drawImage(image,-w/2,-h,w,h);
    });
  });
  if(art&&Math.cos(options.angle)>-.2)sprite([-1.05,.04,-3.15],scale=>{
    const image=art.teacherFrames[Math.floor(options.time/210)%art.teacherFrames.length];
    const h=scale*3.04,w=h*image.width/image.height;
    ctx.rotate(Math.sin(options.time*.0008)*.004);
    if(options.dark)ctx.globalAlpha=.94;
    ctx.drawImage(image,-w/2,-h,w,h);
  });
  line3([0,4.25,0],[0,3.78,0],wood[2],2);
  for(let i=0;i<3;i++){
    const a=options.time*.0008+i*Math.PI*2/3,point=(r:number,offset:number):Point3=>[Math.cos(a+offset)*r,3.75,Math.sin(a+offset)*r];
    polygon([point(.13,-.3),point(1.05,-.12),point(1.05,.12),point(.13,.3)],options.dark?"#a99b7d":"#e0d0ad","#84765d");
  }
  disc(0,3.77,0,.17,.17,"#7e6a4c");
  ctx.clearRect(0,0,width,height);
  floorItems.forEach(item=>item.draw());groundItems.forEach(item=>item.draw());
  items.sort((a,b)=>b.depth-a.depth).forEach(item=>item.draw());
  return CLASSROOM_SEATS.map(seat=>({id:seat.id,...project([seat.position[0],2.16,seat.position[2]])}));
}
