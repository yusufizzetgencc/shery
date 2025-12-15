import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shery | Kadın Giyim & Moda",
  description: "Kadın modasında zarafet ve şıklığı bir araya getiriyoruz. Elbiseler, bluzlar, aksesuarlar ve daha fazlası için Shery'i keşfedin.",
  keywords: "kadın giyim, moda, elbise, bluz, aksesuar, şık giyim, kadın modası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
