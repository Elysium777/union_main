import localFont from "next/font/local";
import { Yatra_One, Alegreya } from "next/font/google";

import "./globals.css";

import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "sonner";
import CapsuleClient from "@/provider/CapsuleClient";
import CapsuleProvider from "@/provider/CapsuleProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const yatraone = Yatra_One({
  variable: "--font-yatra-one",
  subsets: ["latin"],
  weight: "400",
});

const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["variable"],
});

export const metadata = {
  title: "Delegators Union",
  description:
    "Unite with other delegators to maximize your voting impact and influence decisions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${yatraone.variable} ${alegreya.variable} antialiased`}
      >
        <Toaster richColors position="bottom-center" />

        <ReduxProvider>
          <CapsuleProvider>
            <CapsuleClient />
            {children}
          </CapsuleProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
