import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import { StoreProvider } from "@/lib/store-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison & Oak — Crafting Beautiful Spaces",
  description:
    "Premium furniture for living room, bedroom, dining, office, outdoor and kids — solid wood, natural stone, and honest materials built to last.",
  openGraph: {
    title: "Maison & Oak — Crafting Beautiful Spaces",
    description:
      "Premium furniture for every room, crafted from solid wood and natural materials.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <StoreProvider>
          <Header />
          <main className="pt-[76px]">{children}</main>
          <Footer />
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
