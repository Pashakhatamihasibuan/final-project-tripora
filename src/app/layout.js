import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TravelKuy - Jelajahi Dunia, Temukan Dirimu",
  description:
    "Platform booking travel untuk petualangan tak terlupakan. Temukan promo dan aktivitas menarik di seluruh dunia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
