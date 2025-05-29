import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { LogoBlock } from './logo-block'

const Navbar = async () => {
    // const { userId } = auth()

    // if (!userId) {
    //   redirect("/sign-in")
    // }

    return (
        <div className="border-b">
            <div className="flex h-16 flex-wrap justify-between items-center px-4 my-3">
                <LogoBlock />
                <div className="ml-auto flex items-center space-x-4">
                    {/* <ThemeToggle /> */}
                    <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarImage: {
                              backgroundColor: 'green',
                            },
                          },
                        }}
                        afterSignOutUrl="/"
                        
                    />
                </div>
            </div>
            <MainNav
                className={`
                sticky top-0 bg-white 
                shadow-lg shadow-black/5 z-10 
                _py-5 
                bg-transparent backdrop-blur-md 
                backdrop-brightness-75
              `}
            />
        </div>
    )
}

export default Navbar
