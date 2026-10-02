import type {NextConfig} from "next";
const config:NextConfig={async headers(){return [{source:"/fonts/:path*",headers:[{key:"Access-Control-Allow-Origin",value:"*"}]}]}};
export default config;
