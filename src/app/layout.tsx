import "./globals.css";
import RootProviders from "@/@providers";
import type { Metadata } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../@assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../@assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Study Todos App",
    default: "Study Todos App",
  },
  description: "Next.js 14 스터디를 위한 투두 앱 입니다.",
};

export default function RootLayout({
  children,
  modal, // next slot
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RootProviders>
          {children}
          {modal}
        </RootProviders>
      </body>
    </html>
  );
}
