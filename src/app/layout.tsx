'use client';
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import NavbarDashboard from '../components/NavbarDashboard'
import { useEffect } from 'react';
import AOS from 'aos';
import { CartProvider } from '@/components/CartContext';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {isAdmin ? <NavbarDashboard /> : <Navbar />}
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
