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
      <script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.3.1/model-viewer.min.js"
      />
    </head>
    <body>{children}</body>
  </html>
}
