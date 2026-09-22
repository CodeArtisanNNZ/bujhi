import {NextResponse} from "next/server";

const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL||"https://enaaebxrrqnyfnwigwkz.supabase.co";
const key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY||"sb_publishable_Z91RkfoBLf5CGuThT5tljQ_kcsneXK0";

export async function POST(request:Request){
 if(!url||!key)return NextResponse.json({error:"Database is not configured yet."},{status:503});
 const {email,password}=await request.json();
 const response=await fetch(`${url}/auth/v1/token?grant_type=password`,{
  method:"POST",
  headers:{"Content-Type":"application/json",apikey:key},
  body:JSON.stringify({email:String(email||"").trim(),password:String(password||"")})
 });
 const data=await response.json();
 if(!response.ok)return NextResponse.json({error:data.error_description||data.msg||data.message||"Email or password is incorrect."},{status:response.status});
 const result=NextResponse.json({ok:true});
 result.cookies.set("bujhi_access_token",data.access_token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:data.expires_in||3600});
 if(data.refresh_token)result.cookies.set("bujhi_refresh_token",data.refresh_token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*24*30});
 return result;
}
