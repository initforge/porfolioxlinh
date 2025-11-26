import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: 'Portfolio - Freelance Web Developer',
  description: 'Portfolio chuyên nghiệp giới thiệu các dự án và dịch vụ phát triển web',
  keywords: ['web developer', 'freelance', 'portfolio', 'react', 'next.js', 'web development', 'phát triển web', 'freelancer'],
  authors: [{ name: 'Portfolio' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

