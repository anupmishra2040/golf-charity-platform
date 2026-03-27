import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Charity Platform",
  description: "Track scores, support charities, and manage monthly draws.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
