import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";
import { CartProvider } from "@/components/cart-store";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GEN+ — Next Genetics. Enhanced.",
  description:
    "GEN+ delivers ultra-high purity synthetic research peptides engineered for the modern researcher. Browse the catalog, build research stacks, and dose precisely with our reconstitution calculator.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a1018",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
