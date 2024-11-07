"use client"

import "./globals.css";
import { ViewTransitions } from 'next-view-transitions';
import Navbar from "@/components/ui/layout/navbar";
import { usePathname } from 'next/navigation';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = !['/signup', '/login'].includes(pathname);

  return (
    <html lang="en">
      <body className="antialiased">
        {showNavbar && <Navbar />}
        <ViewTransitions>
          {children}
        </ViewTransitions>
      </body>
    </html>
  );
}