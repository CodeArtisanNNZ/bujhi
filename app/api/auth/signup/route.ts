import {NextResponse} from "next/server";

const url=process.env.SUPABASE_URL;
const key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY;

export async function POST(request:Request){
 if(!url||!key)return NextResponse.json({error:"Database is not configured yet."},{status:503});
 const body=await request.json();
 const email=String(body.email||"").trim();
 const password=String(body.password||"");
 const fullName=String(body.fullName||"").trim();
 const role=body.role==="teacher"?"teacher":"student";
 const classLevel=role==="student"?String(body.classLevel||"8"):null;
 const subject=role==="teacher"?String(body.subject||"").trim():null;
 if(!email||password.length<6||!fullName)return NextResponse.json({error:"Please complete all required fields."},{status:400});
 const response=await fetch(`${url}/auth/v1/signup`,{
  method:"POST",
  headers:{"Content-Type":"application/json",apikey:key},
  body:JSON.stringify({email,password,data:{full_name:fullName,role,class_level:classLevel,subject}})
 });
 const data=await response.json();
 if(!response.ok)return NextResponse.json({error:data.msg||data.error_description||data.message||"Could not create account."},{status:response.status});
 const result=NextResponse.json({ok:true,needsConfirmation:!data.access_token});
 if(data.access_token)result.cookies.set("bujhi_access_token",data.access_token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:data.expires_in||3600});
 if(data.refresh_token)result.cookies.set("bujhi_refresh_token",data.refresh_token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*24*30});
 return result;
}
