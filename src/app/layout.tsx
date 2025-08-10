import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cybersecurity Chatbot",
  description: "An AI-powered chatbot for cybersecurity information and assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
