/** The same small, deterministic rules power the diagrams and the challenges. */
export function sequence(start:number, operation:"add"|"multiply", amount:number, length=6):number[]{
  return Array.from({length},(_,i)=>operation==="add"?start+amount*i:start*amount**i);
}
export function fibonacci(a:number,b:number,length=8):number[]{
  const values=[a,b];
  while(values.length<length)values.push(values[values.length-1]+values[values.length-2]);
  return values.slice(0,length);
}
export function isPrime(n:number):boolean{
  if(!Number.isInteger(n)||n<2)return false;
  for(let d=2;d*d<=n;d++)if(n%d===0)return false;
  return true;
}
export function multiples(base:number,limit=100):number[]{
  return Array.from({length:Math.max(0,Math.floor(limit/base)-1)},(_,i)=>base*(i+2));
}
export const MAGIC_LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export type MagicBoard=(number|null)[];
export function magicLineSums(board:MagicBoard):(number|null)[]{
  return MAGIC_LINES.map(line=>line.some(i=>board[i]==null)?null:line.reduce((sum,i)=>sum+board[i]!,0));
}
export function isMagicSquare(board:MagicBoard):boolean{
  return board.length===9&&new Set(board).size===9&&board.every(n=>n!==null&&Number.isInteger(n)&&n>=1&&n<=9)&&magicLineSums(board).every(n=>n===15);
}
export type Stick={x1:number;y1:number;x2:number;y2:number;fresh:boolean;shared:boolean};
export function matchsticks(n:number):Stick[]{
  const sticks:Stick[]=[];
  for(let x=0;x<=n;x++)sticks.push({x1:x,y1:0,x2:x,y2:1,fresh:n===1||x===n,shared:n>1&&x===n-1});
  for(let x=0;x<n;x++)for(const y of [0,1])sticks.push({x1:x,y1:y,x2:x+1,y2:y,fresh:n===1||x===n-1,shared:false});
  return sticks;
}
export function nthTerm(a:number,b:number,n:number):number{return a*n+b;}
export function positionOf(a:number,b:number,target:number):number|null{
  if(a===0)return null;
  const n=(target-b)/a;
  return Number.isInteger(n)&&n>=1?n:null;
}
/** Two complementary staircases occupy each cell of an n × (n+1) rectangle. */
export function sumDots(n:number):{row:number;col:number;copy:boolean}[]{
  return Array.from({length:n},(_,row)=>Array.from({length:n+1},(_,col)=>({row,col,copy:col>row}))).flat();
}
export function readNumber(value:string):number{
  return Number(value.trim().replace(/[০-৯]/g,d=>String("০১২৩৪৫৬৭৮৯".indexOf(d))));
}
export const bn=(n:number)=>n.toLocaleString("bn-BD",{useGrouping:false});
