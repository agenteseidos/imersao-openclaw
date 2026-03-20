import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Imersão OpenClaw: Agentes em Ação',
  description:
    'Construa seu time de IA — e deixe eles trabalharem enquanto você dorme. 28 de março · Ao vivo · 4 horas.',
  openGraph: {
    title: 'Imersão OpenClaw: Agentes em Ação',
    description: 'Construa seu time de IA — e deixe eles trabalharem enquanto você dorme.',
    url: 'https://imersao.agenciaeidos.com.br',
    siteName: 'Agência Eidos',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://imersao.agenciaeidos.com.br/hero.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imersão OpenClaw: Agentes em Ação',
    description: 'Construa seu time de IA — e deixe eles trabalharem enquanto você dorme.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <noscript>
          <style>{`.transition-all { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
