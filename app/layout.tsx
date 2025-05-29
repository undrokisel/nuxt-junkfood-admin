import type { Metadata } from 'next'
import '@/app/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ruRU } from '@clerk/localizations'
import { Nunito } from 'next/font/google'

export const metadata: Metadata = {
    title: 'Админ панель Твоя шаурма',
    description: 'для администрирования ресторана твоя шаурма',
}

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            localization={ruRU}
            appearance={{
                elements: {
                    avatarBox: 'h-10 w-10 bg-green-300',
                },
            }}
        >
            <html lang="en" className={nunito.className}>
                <body className="d-flex flex-col h-[100vh]">
                    {/* <ThemeProvider attribute='class' defaultTheme='system' enableSystem> */}
                    <ToastProvider />
                    {children}
                    {/* </ThemeProvider> */}
                </body>
            </html>
        </ClerkProvider>
    )
}
