import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions';
import Navbar from "@/components/ui/layout/navbar";

export const metadata: Metadata = {
  title: "DoorUI",
  description: "A bunch of custom-made components built on top of shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Navbar/>
        <ViewTransitions>
            {children}
        </ViewTransitions>
      </body>
    </html>
  );
}