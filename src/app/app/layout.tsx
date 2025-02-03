

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NewsLetter from "@/components/newsletter";
import Footer from "@/components/footer";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'



const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
          
          <Navbar />
          {children}
          <NewsLetter />
          <Footer />
         
      </body>
    </html>
    </ClerkProvider>
  );
}
