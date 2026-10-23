import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";

const source=readFileSync(new URL("../app/components/peekSchedule.ts",import.meta.url),"utf8");
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
const {createPeekSchedule}=await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

function setup(random=.5){
  let now=0,serial=0,canShow=true;
  const timers=new Map(),events=[];
  const schedule=createPeekSchedule(()=>events.push(["show",now]),()=>events.push(["hide",now]),{
    now:()=>now,random:()=>random,
    setTimer:(callback,delay)=>{timers.set(++serial,{at:now+delay,callback});return serial;},
    clearTimer:id=>timers.delete(id),canShow:()=>canShow
  });
  function advance(ms){
    const end=now+ms;
    while(true){
      const next=[...timers.entries()].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];
      if(!next)break;
      now=next[1].at;timers.delete(next[0]);next[1].callback();
    }
    now=end;
  }
  return {schedule,advance,events,timers,block:()=>{canShow=false;},unblock:()=>{canShow=true;}};
}

test("first and repeat peeks wait a random 2–3 minutes, stay for six seconds, then fully hide",()=>{
  for(const [random,wait] of [[0,120000],[.5,150000],[.999999,179999]]){
    const t=setup(random);t.schedule.resume();
    t.advance(wait-1);assert.deepEqual(t.events,[]);
    t.advance(1);assert.deepEqual(t.events,[["show",wait]]);
    t.advance(5999);assert.equal(t.events.length,1);
    t.advance(1);assert.deepEqual(t.events.at(-1),["hide",wait+6000]);
    t.advance(wait-1);assert.equal(t.events.length,2);
    t.advance(1);assert.deepEqual(t.events.at(-1),["show",wait*2+6000]);
  }
});

test("a hidden tab preserves its countdown and never accumulates missed peeks",()=>{
  const t=setup();t.schedule.resume();t.advance(60000);t.schedule.pause();
  t.advance(900000);assert.deepEqual(t.events,[]);assert.equal(t.timers.size,0);
  t.schedule.resume();t.advance(89999);assert.deepEqual(t.events,[]);
  t.advance(1);assert.equal(t.events[0][0],"show");
  t.schedule.pause();assert.equal(t.events.at(-1)[0],"hide");
  t.advance(900000);t.schedule.resume();t.advance(149999);assert.equal(t.events.length,2);
  t.advance(1);assert.equal(t.events.at(-1)[0],"show");
});

test("a focused form or open overlay defers the visit; cleanup cancels every pending callback",()=>{
  const t=setup(0);t.schedule.resume();t.block();t.advance(150000);assert.deepEqual(t.events,[]);
  t.unblock();t.advance(10000);assert.equal(t.events.at(-1)[0],"show");
  t.schedule.dispose();assert.equal(t.timers.size,0);assert.equal(t.events.at(-1)[0],"hide");
  t.schedule.resume();t.advance(1000000);assert.equal(t.events.length,2);
});
