import {NextResponse} from "next/server";

export async function POST(){
 const result=NextResponse.json({ok:true});
 result.cookies.set("bujhi_access_token","",{httpOnly:true,path:"/",maxAge:0});
 result.cookies.set("bujhi_refresh_token","",{httpOnly:true,path:"/",maxAge:0});
 return result;
}
