import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export const dynamic="force-dynamic";

const COOKIE_NAME="bujhi_visitor";
const SAFE_ID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const COUNTER_BASE="https://countapi.mileshilliard.com/api/v1";
const OPENS_KEY="bujhi_page_opens_9f4d2026";
const UNIQUE_KEY="bujhi_unique_browsers_9f4d2026";

async function counter(key:string,increment:boolean){
 const operation=increment?"hit":"get";
 const response=await fetch(`${COUNTER_BASE}/${operation}/${encodeURIComponent(key)}`,{
  cache:"no-store",
  headers:{accept:"application/json"}
 });
 if(!response.ok){
  if(!increment&&response.status===404)return 0;
  throw new Error(`Counter API returned ${response.status}`);
 }
 const data=await response.json();
 const value=Number(data?.value);
 if(!Number.isSafeInteger(value)||value<0)throw new Error("Invalid counter value");
 return value;
}

export async function GET(){
 try{
  const [opens,uniqueBrowsers]=await Promise.all([counter(OPENS_KEY,false),counter(UNIQUE_KEY,false)]);
  return NextResponse.json({opens,uniqueBrowsers},{headers:{"cache-control":"no-store"}});
 }catch{
  return NextResponse.json({error:"Visitor counter unavailable"},{status:503,headers:{"cache-control":"no-store"}});
 }
}

export async function POST(request:Request){
 const url=new URL(request.url);
 const origin=request.headers.get("origin");
 if(origin&&origin!==url.origin)return NextResponse.json({error:"Cross-origin counting is not allowed"},{status:403});
 try{
  const store=await cookies();
  let visitor=store.get(COOKIE_NAME)?.value||"";
  const fresh=!SAFE_ID.test(visitor);
  if(fresh)visitor=crypto.randomUUID();

  const opensPromise=counter(OPENS_KEY,true);
  const uniquePromise=counter(UNIQUE_KEY,fresh);
  const [opens,uniqueBrowsers]=await Promise.all([opensPromise,uniquePromise]);

  const response=NextResponse.json({opens,uniqueBrowsers},{headers:{"cache-control":"no-store"}});
  if(fresh)response.cookies.set(COOKIE_NAME,visitor,{
   httpOnly:true,
   sameSite:"lax",
   secure:process.env.NODE_ENV==="production",
   path:"/",
   maxAge:60*60*24*365
  });
  return response;
 }catch{
  return NextResponse.json({error:"Visitor counter unavailable"},{status:503,headers:{"cache-control":"no-store"}});
 }
}
