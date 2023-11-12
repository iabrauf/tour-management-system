import { Poppins } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'

const poppins = Poppins({
  weight: ['100', '400', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Tour Management System',
  description: 'tour management application',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
