export const dynamic= 'force-dynamic'

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { Weight } from "lucide-react";

const inter = Inter({ subsets: ['latin'], variable: '--forn-inter'});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "MBank",
  description: "MBank is a modern banking platform for everyone.",
  icons: {
    icon: '/icons/Mlogo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</body>
    </html>  
  );
}
