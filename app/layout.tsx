import './globals.css'
import './cursor.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

const JapaneseGrid = dynamic(() => import('./components/JapaneseGrid'), {
  ssr: false
})

export const metadata = {
  title: 'Neokage Apes',
  description: 'Cyberpunk NFT Collection',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${inter.className} sword-cursor bg-neo-black min-h-screen text-white`}>
        <JapaneseGrid />
        {children}
      </body>
    </html>
  )
} 