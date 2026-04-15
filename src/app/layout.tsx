import type { Metadata } from "next";
import { Nanum_Myeongjo, Noto_Sans_KR } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/components/providers/CartProvider";
import { SiteProvider } from "@/components/providers/SiteProvider";

import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-body",
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "김포청년몰",
  description: "청년이 고른 산지 직송 과일을 만나는 김포청년몰",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${nanumMyeongjo.variable} ${notoSansKr.className}`}>
        <SiteProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
