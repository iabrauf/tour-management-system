import { Poppins } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

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
        <Footer />
      </body>
    </html>
  )
}
