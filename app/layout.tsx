import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bujhi — Less memorizing. More understanding.",
  description:
    "Bujhi gives students multiple ways to understand and teachers multiple ways to explain.",
  icons: {
    icon: "/bujhi-icon.png",
    shortcut: "/bujhi-icon.png",
    apple: "/bujhi-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}