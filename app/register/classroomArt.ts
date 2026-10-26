type Pixel={x:number;y:number};
export type ClassroomArt={teacherFrames:HTMLCanvasElement[];windowFrames:HTMLCanvasElement[];wood:HTMLCanvasElement;pupils:HTMLImageElement[]};

function triangle(ctx:CanvasRenderingContext2D,image:CanvasImageSource,a:Pixel,b:Pixel,c:Pixel,A:Pixel,B:Pixel,C:Pixel){
  const det=a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y);
  if(Math.abs(det)<.00001)return;
  const coefficient=(v0:number,v1:number,v2:number)=>[
    (v0*(b.y-c.y)+v1*(c.y-a.y)+v2*(a.y-b.y))/det,
    (v0*(c.x-b.x)+v1*(a.x-c.x)+v2*(b.x-a.x))/det,
    (v0*(b.x*c.y-c.x*b.y)+v1*(c.x*a.y-a.x*c.y)+v2*(a.x*b.y-b.x*a.y))/det
  ];
  const [m11,m21,dx]=coefficient(A.x,B.x,C.x),[m12,m22,dy]=coefficient(A.y,B.y,C.y);
  ctx.save();ctx.beginPath();
  const center={x:(A.x+B.x+C.x)/3,y:(A.y+B.y+C.y)/3};
  [A,B,C].forEach((p,i)=>{const x=p.x+(p.x-center.x)*.004,y=p.y+(p.y-center.y)*.004;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});
  ctx.closePath();ctx.clip();ctx.transform(m11,m12,m21,m22,dx,dy);ctx.drawImage(image,0,0);ctx.restore();
}

export function paintTexture(ctx:CanvasRenderingContext2D,image:HTMLImageElement|HTMLCanvasElement,project:(u:number,v:number)=>Pixel,divisions=5){
  const w=image.width,h=image.height;
  for(let row=0;row<divisions;row++)for(let col=0;col<divisions;col++){
    const u=col/divisions,v=row/divisions,U=(col+1)/divisions,V=(row+1)/divisions;
    const a={x:u*w,y:v*h},b={x:U*w,y:v*h},c={x:U*w,y:V*h},d={x:u*w,y:V*h};
    const A=project(u,v),B=project(U,v),C=project(U,V),D=project(u,V);
    triangle(ctx,image,a,b,c,A,B,C);triangle(ctx,image,a,c,d,A,C,D);
  }
}

function loadImage(src:string){return new Promise<HTMLImageElement>((resolve,reject)=>{
  const image=new Image();image.decoding="async";image.onload=()=>resolve(image);image.onerror=()=>reject(new Error("Classroom illustration unavailable"));image.src=src;
});}
function frame(width:number,height:number){const node=document.createElement("canvas");node.width=width;node.height=height;return node;}
function teacherLoop(image:HTMLImageElement){
  const width=Math.round(512*image.width/image.height),source=frame(width,512),sourceCtx=source.getContext("2d")!;
  sourceCtx.drawImage(image,0,0,width,512);
  return Array.from({length:12},(_,index)=>{
    const phase=index/12*Math.PI*2,node=frame(width+32,544),ctx=node.getContext("2d")!;
    paintTexture(ctx,source,(u,v)=>{
      const arm=Math.max(0,(u-.52)/.48),band=v>.1&&v<.53?Math.sin((v-.1)/.43*Math.PI):0;
      return{x:16+u*width,y:16+v*512+Math.sin(phase)*arm*band*8+Math.sin(phase)*.8*(1-v)};
    },12);return node;
  });
}
function windowLoop(image:HTMLImageElement){
  const source=frame(360,540);source.getContext("2d")!.drawImage(image,0,0,360,540);
  return Array.from({length:8},(_,index)=>{
    const phase=index/8*Math.PI*2,node=frame(360,540),ctx=node.getContext("2d")!;
    paintTexture(ctx,source,(u,v)=>{
      const interior=Math.max(0,1-Math.abs(u-.5)/.21)*(v>.23&&v<.91?Math.sin((v-.23)/.68*Math.PI):0);
      return{x:u*360+Math.sin(phase)*interior*2.4,y:v*540+Math.cos(phase)*interior*.8};
    },10);return node;
  });
}
let prepared:Promise<ClassroomArt>|undefined;
export function loadClassroomArt(){
  if(!prepared)prepared=Promise.all([
    loadImage("/classroom/teacher.webp"),loadImage("/classroom/window.webp"),
    ...[0,1,2].map(i=>loadImage("/classroom/pupil-"+i+"-front.webp")),
    ...[0,1,2].map(i=>loadImage("/classroom/pupil-"+i+"-back.webp"))
  ]).then(([teacher,window,...pupils])=>{
    const wood=frame(512,96);
    wood.getContext("2d")!.drawImage(window,window.width*.1,window.height*.025,window.width*.8,window.height*.035,0,0,512,96);
    return{teacherFrames:teacherLoop(teacher),windowFrames:windowLoop(window),wood,pupils};
  }).catch(error=>{prepared=undefined;throw error;});
  return prepared;
}
