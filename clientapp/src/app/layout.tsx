import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter, Montserrat } from 'next/font/google';
//
import ThemeProvider from '@/@core/theme/themeContext';
import Layout from '@/components/layout';
import StoreProvider from './StoreProvider';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const font = Montserrat({ subsets: ['latin'] });
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultColor="rose" defaultTheme="light">
          <StoreProvider>
            <Layout>{children}</Layout>
          </StoreProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}