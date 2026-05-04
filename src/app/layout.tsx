import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Best Soccer Matchmaker",
  description:
    "Generate fair and balanced teams for your soccer matches based on player skills and positions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
