import { ClerkProvider } from "@clerk/nextjs"

// import { ModalProvider } from "@/providers/modal-provider"
import { ToastProvider } from "@/providers/toast-provider"

import '@/app/globals.css'
import { ThemeProvider } from "@/providers/theme-provider"

export const metadata = {
  title: "Админ панель",
  description: "Админ панель",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <ClerkProvider>
      <html lang='en'>
        <body>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToastProvider />
            {/* <ModalProvider /> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    // </ClerkProvider>
  )
}
