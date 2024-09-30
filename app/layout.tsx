import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { RootProviders } from "./_providers";

const geistSans = localFont({
  src: "./_fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./_fonts/GeistMonoVF.woff",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
