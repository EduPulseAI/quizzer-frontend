import './global.css';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { HomeLayout } from '../components/home-layout';
import Providers from './providers';
import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@feature/base";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <HomeLayout>
            {children}
          </HomeLayout>
        </Providers>
      </body>
    </html>
  );
}
