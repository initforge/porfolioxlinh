import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/globals.css'
import '../styles/animations.css'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { defaultMetadata } from './metadata'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  ...defaultMetadata,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="bg-gray-950">
        <ScrollProgress />
        <main>{children}</main>
      </body>
    </html>
  )
}

