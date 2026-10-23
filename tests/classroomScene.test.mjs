import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";
const source=readFileSync(new URL("../app/register/classroomScene.ts",import.meta.url),"utf8");
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
const {CLASSROOM_SEATS:seats,classroomCamera,hitClassroomSeat}=await import("data:text/javascript;base64,"+Buffer.from(js).toString("base64"));

test("all twelve signup seats have distinct world positions and bilingual row labels",()=>{
  assert.deepEqual(seats.map(s=>s.id),Array.from({length:12},(_,i)=>i+1));
  assert.equal(new Set(seats.map(s=>s.position.join(","))).size,12);
  assert.equal(seats.filter(s=>s.en.startsWith("Front row")).length,6);
  assert.equal(seats.filter(s=>s.en.startsWith("Back row")).length,6);
  for(const seat of seats){assert.ok(seat.bn.length>10);assert.ok(Math.abs(seat.position[0])>=1.4);}
});

test("the entire room and every seat stay inside the canvas through a full camera turn at phone and desktop sizes",()=>{
  for(const [width,height] of [[280,187],[390,260],[720,500],[1000,650]]){
    for(let step=0;step<=72;step++){
      const {project}=classroomCamera(step*Math.PI/36,width,height);
      const points=[...seats.map(s=>[s.position[0],2.16,s.position[2]]),...[-5.2,5.2].flatMap(x=>[0,4.25].flatMap(y=>[-4.6,4.6].map(z=>[x,y,z])))];
      for(const point of points){
        const p=project(point);
        assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.depth>0&&p.scale>0);
        assert.ok(p.x>=0&&p.x<=width&&p.y>=0&&p.y<=height,JSON.stringify({point,p,width,height,step}));
      }
    }
  }
});

test("turning to the teacher reverses the viewing order without changing any seat identity",()=>{
  const student=classroomCamera(0,900,600),teacher=classroomCamera(Math.PI,900,600);
  assert.ok(student.project(seats[0].position).x<student.project(seats[5].position).x);
  assert.ok(teacher.project(seats[0].position).x>teacher.project(seats[5].position).x);
  assert.ok(student.project(seats[6].position).scale>student.project(seats[0].position).scale);
  assert.ok(teacher.project(seats[6].position).scale<teacher.project(seats[0].position).scale);
});

test("tapping a student's projected position selects that seat on phone and desktop; empty space selects nothing",()=>{
  for(const [width,height] of [[281,170],[836,503]]){
    const camera=classroomCamera(0,width,height);
    for(const seat of seats){
      const p=camera.project([seat.position[0],1.55,seat.position[2]]);
      assert.equal(hitClassroomSeat(0,width,height,p.x,p.y),seat.id);
    }
    assert.equal(hitClassroomSeat(0,width,height,0,0),null);
  }
});
