"use client";
import {useEffect,useRef} from "react";
import {CLASSROOM_SEATS,hitClassroomSeat,paintClassroom} from "./classroomScene";
import styles from "./classroom.module.css";
type Props={angle:number;dark:boolean;bangla:boolean;selected:number|null;hovered:number|null;teacher:boolean;onSelect:(id:number)=>void;onHover:(id:number|null)=>void;onTurning:(turning:boolean)=>void};

export default function ClassroomCanvas(props:Props){
  const canvas=useRef<HTMLCanvasElement>(null),viewport=useRef<HTMLDivElement>(null);
  const markers=useRef<(HTMLButtonElement|null)[]>([]),latest=useRef(props),control=useRef<{update:()=>void;pick:(x:number,y:number)=>number|null}|null>(null);
  useEffect(()=>{latest.current=props;control.current?.update();},[props]);
  useEffect(()=>{
    const node=canvas.current,container=viewport.current;if(!node||!container)return;
    const ctx=node.getContext("2d");if(!ctx)return;
    const motion=matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0,width=1,height=1,angle=latest.current.angle,from=angle,target=angle,started=0,lastDraw=-Infinity,turning=false,disposed=false;
    function paint(time:number){
      frame=0;if(disposed||document.hidden)return;
      const progress=motion.matches?1:Math.min(1,(time-started)/1050);
      if(turning)angle=from+(target-from)*(progress*progress*(3-2*progress));
      if(turning||time-lastDraw>=40||motion.matches){
        const state=latest.current;
        const seats=paintClassroom(ctx!,width,height,{angle,dark:state.dark,bangla:state.bangla,selected:state.selected,hovered:state.hovered,time:motion.matches?0:time});
        seats.forEach((seat,i)=>{const marker=markers.current[i];if(marker){marker.style.left=seat.x+"px";marker.style.top=seat.y+"px";marker.style.opacity=turning&&progress<1?"0":"1";}});
        lastDraw=time;
      }
      if(turning&&progress===1){turning=false;latest.current.onTurning(false);lastDraw=-Infinity;}
      if(!motion.matches)frame=requestAnimationFrame(paint);
    }
    function requestPaint(){if(!frame&&!disposed&&!document.hidden)frame=requestAnimationFrame(paint);}
    function update(){
      if(latest.current.angle!==target){from=angle;target=latest.current.angle;started=performance.now();turning=true;latest.current.onTurning(!motion.matches);}
      lastDraw=-Infinity;requestPaint();
    }
    function resize(){
      const size=container!.getBoundingClientRect();width=size.width;height=size.height;
      const ratio=Math.min(2,window.devicePixelRatio||1);node!.width=Math.round(width*ratio);node!.height=Math.round(height*ratio);ctx!.setTransform(ratio,0,0,ratio,0,0);
      lastDraw=-Infinity;requestPaint();
    }
    function sync(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{lastDraw=-Infinity;requestPaint();}}
    control.current={update,pick:(x,y)=>turning||latest.current.teacher?null:hitClassroomSeat(angle,width,height,x,y)};
    const observer=new ResizeObserver(resize);observer.observe(container);
    document.addEventListener("visibilitychange",sync);motion.addEventListener("change",update);resize();
    return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();control.current=null;document.removeEventListener("visibilitychange",sync);motion.removeEventListener("change",update);};
  },[]);
  return <div ref={viewport} className={styles.viewport} data-role={props.teacher?"teacher":"student"} aria-label={props.bangla?"ইন্টারঅ্যাকটিভ শ্রেণিকক্ষ":"Interactive classroom"}>
    <canvas ref={canvas} className={styles.canvas} aria-hidden="true" onClick={event=>{
      const bounds=event.currentTarget.getBoundingClientRect(),id=control.current?.pick(event.clientX-bounds.left,event.clientY-bounds.top);
      if(id)props.onSelect(id);
    }}/>
    <div className={styles.markers} aria-label={props.bangla?"শ্রেণিকক্ষের আসন":"Classroom seats"}>
      {CLASSROOM_SEATS.map((seat,i)=><button key={seat.id} ref={element=>{markers.current[i]=element;}} type="button"
        className={styles.marker} aria-label={(props.bangla?"আসন ":"Choose seat ")+seat.id+" · "+(props.bangla?seat.bn:seat.en)}
        aria-pressed={props.selected===seat.id} disabled={props.teacher}
        onClick={()=>props.onSelect(seat.id)} onMouseEnter={()=>props.onHover(seat.id)} onMouseLeave={()=>props.onHover(null)}
      >{props.bangla?seat.id.toLocaleString("bn-BD"):seat.id}</button>)}
    </div>
  </div>;
}
