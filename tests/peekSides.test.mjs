import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";

const source=readFileSync(new URL("../app/components/peekSides.ts",import.meta.url),"utf8");
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
const {nextPeekSide,peekEdgeOffset}=await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

test("first random visit can come from any edge",()=>{
  assert.deepEqual([0,.25,.5,.75].map(r=>nextPeekSide(null,()=>r)),["left","right","top","bottom"]);
});

test("consecutive peeks use different edges and always stay in the available set",()=>{
  for(const side of ["left","right","top","bottom"]){
    for(const r of [0,.25,.5,.9]){
      const picked=nextPeekSide(side,()=>r);
      assert.notEqual(picked,side);
      assert.ok(["left","right","top","bottom"].includes(picked));
    }
  }
});

test("all four edge positions fit small and large viewports",()=>{
  for(const [width,height] of [[320,568],[375,667],[1440,900]]){
    for(const side of ["left","right","top","bottom"]){
      for(const rand of [0,.5,.999]){
        const offset=peekEdgeOffset(side,width,height,()=>rand);
        const vertical=side==="left"||side==="right";
        const span=vertical?height:width;
        const size=vertical
          ?Math.min(110,Math.max(70,width*.08))*780/300
          :Math.min(290,Math.max(180,width*.24));
        assert.ok(offset>=size/2, `${side} starts on-screen`);
        assert.ok(offset<=span-size/2, `${side} ends on-screen`);
      }
    }
  }
});
