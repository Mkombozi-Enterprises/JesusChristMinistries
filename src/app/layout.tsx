import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jesus Christ Ministries",
    template: "%s | Jesus Christ Ministries",
  },
  description:
    "A Spirit-filled Pentecostal ministry across Kenya — seven regions, twenty-plus branches, one body in Christ.",
  keywords: [
    "Jesus Christ Ministries",
    "Pentecostal",
    "Kenya",
    "church",
    "Bishop Edward Musamusi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
