'use client'
import '@/app/globals.css'

import { SignIn } from '@clerk/nextjs'
export default function Page() {
    return (
        <div className="h-full flex justify-center items-center ">
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: `
                          bg-green-100 text-black text-lg
                          hover:bg-amber-200
                          focus:bg-amber-200
                        `,
                        input: `
                          bg-green-50 text-lg
                          hover:bg-amber-200
                          focus:bg-amber-200
                        `,

                        formHeader: `bg-pink-400`,
                        formHeaderTitle: `bg-pink-400`,
                        formHeaderSubtitle: `bg-pink-400`,
                        headerTitle: `text-2xl`,
                        socialButtonsBlockButtonText: `text-sm`,
                        socialButtonsBlockButton: `
                        h-12
                        bg-green-50 text-lg 
                          hover:bg-amber-200
                          focus:bg-amber-200
                        `,
                    },
                }}
            />
        </div>
    )
}

