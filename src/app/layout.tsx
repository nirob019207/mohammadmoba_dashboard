import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import logo from "@/assests/logo/titlelogo.png"
import ReduxProvider from "@/Redux/ReduxProvider";
import { Toaster } from "sonner";
// import ReduxProvider from "@/components/Redux/ReduxProvider";

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

export const metadata: Metadata = {
  title: "Mohammad ||        Dashboard",
  description: "Jags Dasboard - Compared to the Product",
  icons: {
    icon: logo.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {
            children
          }
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
