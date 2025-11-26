import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: 'Portfolio - Freelance Web Developer',
  description: 'Professional portfolio showcasing web development projects and services',
  keywords: ['web developer', 'freelance', 'portfolio', 'react', 'next.js', 'web development'],
  authors: [{ name: 'Portfolio' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

