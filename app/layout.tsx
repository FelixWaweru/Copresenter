import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Copresenter',
  description: 'A virtual co-host that makes presentations a breeze by using AI to read out your slides, freeing you from prep hassles and letting you focus on delivery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Copresenter</title>
        <meta name="description" content="A virtual co-host that makes presentations a breeze by using AI to read out your slides, freeing you from prep hassles and letting you focus on delivery." />

        <meta property="og:url" content="https://copresenter-git-cleanup-felixwaweru.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Copresenter" />
        <meta property="og:description" content="A virtual co-host that makes presentations a breeze by using AI to read out your slides, freeing you from prep hassles and letting you focus on delivery." />
        <meta property="og:image" content="https://copresenter.vercel.app/index.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="copresenter-git-cleanup-felixwaweru.vercel.app" />
        <meta property="twitter:url" content="https://copresenter-git-cleanup-felixwaweru.vercel.app/" />
        <meta name="twitter:title" content="Copresenter" />
        <meta name="twitter:description" content="A virtual co-host that makes presentations a breeze by using AI to read out your slides, freeing you from prep hassles and letting you focus on delivery." />
        <meta name="twitter:image" content="https://copresenter.vercel.app/index.webp" />
      </Head>

      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
