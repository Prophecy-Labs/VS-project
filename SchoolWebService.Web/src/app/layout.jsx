import { Inter } from 'next/font/google'
import './globals.css';
import { SignalRProvider } from "@/app/SignalRContext";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prophecy Labs',
  description: '',
}

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <SignalRProvider> 
                    {children}
                </SignalRProvider>
            </body>
        </html>
            )
}
