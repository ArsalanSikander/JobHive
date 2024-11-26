import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./header";
import "./globals.css";

// this is used to give a font to the entire page
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobHive",
  description: "Where your job finds you.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body style={{margin:0}} className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
