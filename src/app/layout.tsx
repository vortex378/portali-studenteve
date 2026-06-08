import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portali i Studentëve — Akademia e Forcave të Armatosura",
  description:
    "Portali zyrtar i studentëve për Akademinë e Forcave të Armatosura. Menaxhoni profilin, të dhënat akademike dhe provimet tuaja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sq"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="gradient-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
