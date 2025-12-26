import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

import ScrollProgressBar from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "RW. 16 | Kebon Melati",
  description:
    "Profil resmi RW 16 Kebon Melati, Jakarta Pusat. Informasi layanan publik, jadwal kegiatan, dan struktur organisasi warga.",
  keywords: [
    "RW 16 Kebon Melati",
    "Jakarta Pusat",
    "Layanan Surat",
    "Jadwal Ronda",
    "Kegiatan Warga",
  ],
  authors: [{ name: "Pengurus RW 16" }],
  themeColor: "#0A1F44",
  openGraph: {
    type: "website",
    url: "https://rw16-kebonmelati.id/",
    title: "RW 16 Kebon Melati - Guyub, Rukun, Sejahtera",
    description:
      "Pusat informasi dan layanan digital warga RW 16 Kebon Melati.",
    images: [{ url: "/assets/images/hero-bg.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RW 16 Kebon Melati",
    description:
      "Pusat informasi dan layanan digital warga RW 16 Kebon Melati.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563EB'><path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'/><path d='M12 3.19L5 6.3V11c0 4.52 2.98 8.69 7 9.93 4.02-1.24 7-5.41 7-9.93V6.3l-7-3.11z' fill='%23FFFFFF'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} antialiased bg-neutral-bg text-neutral-text-main font-sans`}
      >
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
