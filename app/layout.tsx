import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR, Fira_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const notoSerifKR = Noto_Serif_KR({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const firaMono = Fira_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fira-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '이수민 — 기술과 사람 사이의 연결',
  description: '기술과 사람 사이, 그 경계에서 가장 편한 사람. 디자인, 콘텐츠, 도구를 통해 연결을 만듭니다.',
  authors: [{ name: '이수민' }],
  openGraph: {
    title: '이수민 — 기술과 사람 사이의 연결',
    description: '기술과 사람 사이, 그 경계에서 가장 편한 사람.',
    type: 'website',
    siteName: 'Soomin Lee',
    url: 'https://www.soominlee.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: '이수민 — 기술과 사람 사이의 연결',
    description: '기술과 사람 사이, 그 경계에서 가장 편한 사람.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${notoSerifKR.variable} ${firaMono.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
