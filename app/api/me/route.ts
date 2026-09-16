import {cookies} from "next/headers";
import {NextResponse} from "next/server";

const url=process.env.SUPABASE_URL;
const key=process.env.SUPABASE_ANON_KEY;

export async function GET(){
 if(!url||!key)return NextResponse.json({error:"Database is not configured yet."},{status:503});
 const token=(await cookies()).get("bujhi_access_token")?.value;
 if(!token)return NextResponse.json({error:"Not signed in."},{status:401});
 const userRes=await fetch(`${url}/auth/v1/user`,{headers:{apikey:key,Authorization:`Bearer ${token}`},cache:"no-store"});
 if(!userRes.ok)return NextResponse.json({error:"Session expired."},{status:401});
 const user=await userRes.json();
 const profileRes=await fetch(`${url}/rest/v1/profiles?id=eq.${user.id}&select=*`,{headers:{apikey:key,Authorization:`Bearer ${token}`},cache:"no-store"});
 const profiles=profileRes.ok?await profileRes.json():[];
 return NextResponse.json({user:{id:user.id,email:user.email},profile:profiles?.[0]||null});
}
