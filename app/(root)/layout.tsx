import '@/app/globals.css'
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import Navbar from "@/components/navbar"

export const metadata = {
  title: "Админ панель",
  description: "Админ панель",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className=''>
      <Navbar />
      {children}
    </div>
  )
}
