'use client';
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import AOS from 'aos';

// Metadata (for reference only, cannot export in client component)
// export const metadata = {
//   title: 'Shoe Mart.pk',
//   description: 'Dynamic Ecommerce Website',
// }

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    AOS.init({ once: true, duration: 900, offset: 60 });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
