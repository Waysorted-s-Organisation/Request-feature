import { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RequestProvider } from "@/context/RequestContext";
import { ChatProvider } from "@/context/ChatContext";
import { MyRequestProvider } from "@/context/MyRequestContext";
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waysorted | Your Feature Request Hub",
  description: "A modern platform for managing feature requests and connecting with your development team.",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RequestProvider>
          <ChatProvider>
            <MyRequestProvider>
              {children}
            </MyRequestProvider>
          </ChatProvider>
        </RequestProvider>
      </body>
    </html>
  );
}
