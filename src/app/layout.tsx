import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fecamds Rosary Challange",
  description: "From Fecamds 0'26 class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:title" content="Fecamds Rosary Challenge" />
        <meta
          property="og:description"
          content="Join us in saying the Rpsary throughout the month of may"
        />
        <meta property="og:image" content="/logo.jpg" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:url"
          content="https://fecamds-rosary-challenge.onrender.com/"
        />
        <meta property="og:type" content="website" />
      </head>
      <body className={cn(" bg-amber-950 h-screen ", inter.className)}>
        <UserProvider>
          <div className=" bg-[url('/largeRosary.jpg')]  overflow-x-hidden bg-yellow-950 bg-center sm:bg-cover w-screen  bg-opacity-20 pb-0  bg-scrl bg-fxed bg-cover bg-no-repeat">
            {children}
          </div>
          <Toaster duration={3000} position="top-right" richColors />
        </UserProvider>
      </body>
    </html>
  );
}
