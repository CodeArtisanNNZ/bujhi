import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";

const source=readFileSync(new URL("../app/learn/class-8/mathematics/patternMath.ts",import.meta.url),"utf8");
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
const math=await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

test("the pattern machines generate addition, multiplication, and custom Fibonacci sequences",()=>{
  assert.deepEqual(math.sequence(2,"add",3),[2,5,8,11,14,17]);
  assert.deepEqual(math.sequence(2,"multiply",3),[2,6,18,54,162,486]);
  assert.deepEqual(math.sequence(0,"multiply",5),[0,0,0,0,0,0]);
  assert.deepEqual(math.fibonacci(1,1),[1,1,2,3,5,8,13,21]);
  assert.deepEqual(math.fibonacci(2,5),[2,5,7,12,19,31,50,81]);
  assert.deepEqual(math.fibonacci(0,0),[0,0,0,0,0,0,0,0]);
});

test("the four sieve steps leave exactly the 25 primes from 1 to 100",()=>{
  const eliminated=new Set([2,3,5,7].flatMap(p=>math.multiples(p)));
  const remaining=Array.from({length:99},(_,i)=>i+2).filter(n=>!eliminated.has(n));
  assert.deepEqual(remaining,[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]);
  for(let n=1;n<=100;n++)assert.equal(math.isPrime(n),remaining.includes(n),`prime check for ${n}`);
  assert.equal(math.isPrime(1),false);assert.equal(math.isPrime(0),false);assert.equal(math.isPrime(2.5),false);
});

test("all eight Lo Shu orientations pass and incomplete, duplicate, or invalid squares fail",()=>{
  let board=[8,1,6,3,5,7,4,9,2];
  const rotate=b=>[b[6],b[3],b[0],b[7],b[4],b[1],b[8],b[5],b[2]];
  for(let i=0;i<4;i++){
    assert.equal(math.isMagicSquare(board),true);
    assert.equal(math.isMagicSquare([board[2],board[1],board[0],board[5],board[4],board[3],board[8],board[7],board[6]]),true);
    board=rotate(board);
  }
  assert.equal(math.isMagicSquare([5,5,5,5,5,5,5,5,5]),false);
  assert.equal(math.isMagicSquare([2,null,6,9,5,1,4,3,null]),false);
  assert.equal(math.isMagicSquare([1,2,3,4,5,6,7,8,9]),false);
  assert.equal(math.isMagicSquare([2,7,6,9,5,1,4,3,8,10]),false);
  assert.equal(math.isMagicSquare([2,7,6,9,5,1,4,3,8]),true);
});

test("the actual matchstick geometry has no duplicated sides and adds only three new sticks",()=>{
  for(let n=1;n<=20;n++){
    const sticks=math.matchsticks(n);
    const edges=sticks.map(v=>`${v.x1},${v.y1}-${v.x2},${v.y2}`);
    assert.equal(new Set(edges).size,sticks.length);
    assert.equal(sticks.length,3*n+1);
    assert.equal(sticks.filter(v=>v.fresh).length,n===1?4:3);
    assert.equal(sticks.filter(v=>v.shared).length,n===1?0:1);
    assert.equal(sticks.filter(v=>v.x1===v.x2).length,n+1);
  }
  assert.equal(math.matchsticks(20).length,61);
});

test("reverse algebra accepts only positive whole-number positions, including with a negative offset",()=>{
  assert.equal(math.nthTerm(3,1,20),61);
  assert.equal(math.nthTerm(7,2,10),72);
  assert.equal(math.positionOf(3,1,61),20);
  assert.equal(math.positionOf(3,1,60),null);
  assert.equal(math.positionOf(3,1,1),null);
  assert.equal(math.positionOf(3,1,-2),null);
  assert.equal(math.positionOf(3,-5,1),2);
});

test("the sum diagram consists of two equal staircases covering the rectangle once",()=>{
  for(let n=1;n<=12;n++){
    const dots=math.sumDots(n),first=dots.filter(d=>!d.copy),copy=dots.filter(d=>d.copy);
    assert.equal(new Set(dots.map(d=>`${d.row},${d.col}`)).size,n*(n+1));
    assert.equal(first.length,copy.length);
    assert.equal(first.length,Array.from({length:n},(_,i)=>i+1).reduce((a,b)=>a+b,0));
    for(let row=0;row<n;row++)assert.equal(first.filter(d=>d.row===row).length,row+1);
  }
});

test("Bangla and Latin answers are both understood",()=>{
  assert.equal(math.readNumber(" ৬১ "),61);assert.equal(math.readNumber("210"),210);
  assert.equal(Number.isNaN(math.readNumber("প্যাটার্ন")),true);
});
