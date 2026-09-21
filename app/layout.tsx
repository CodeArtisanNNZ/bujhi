import type {Metadata} from "next";
import "./globals.css";

export const metadata:Metadata={
  title:"Bujhi — Less memorizing. More understanding.",
  description:"Multiple ways to understand and explain every subject.",
  icons:{icon:"/bujhi-icon.png"}
};

export default function Layout({children}:{children:React.ReactNode}){
  return <html lang="en">
    <head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
    </head>
    <body>{children}</body>
  </html>
}
