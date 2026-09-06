import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bujhi — Less memorizing. More understanding.",
  description: "Multiple ways to understand and teach every subject.",
  icons: {
    icon: "/bujhi-icon.png",
    shortcut: "/bujhi-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
