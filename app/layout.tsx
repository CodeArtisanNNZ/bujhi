import type {Metadata,Viewport} from "next";
import "./globals.css";
import SiteShell from "./components/SiteShell";
import "./site.css";

export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover"};

export const metadata:Metadata={
  title:"Bujhi — Less memorizing. More understanding.",
  description:"Multiple ways to understand and explain every subject.",
  icons:{icon:"/optimized/bujhi-icon-96.webp"}
};

export default function Layout({children}:{children:React.ReactNode}){
  return <html lang="en" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{__html:`try{var t=localStorage.getItem('bujhi-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`}} />
    </head>
    <body><SiteShell>{children}</SiteShell></body>
  </html>
}
