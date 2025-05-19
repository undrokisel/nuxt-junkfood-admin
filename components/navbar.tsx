import { UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { auth } from "@clerk/nextjs/server"

const Navbar = async () => {
  // const { userId } = auth()

  // if (!userId) {
  //   redirect("/sign-in")
  // }


  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default Navbar
