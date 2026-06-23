import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "365 Constellations of Us ❤️",
  description: "A cinematic anniversary story written across distance, memories and time. One year of love, captured in the stars.",
  keywords: ["anniversary", "love story", "365 days", "constellations", "long distance love"],
  openGraph: {
    title: "365 Constellations of Us ❤️",
    description: "A cinematic anniversary story written across distance, memories and time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
