'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()

    const routes = [
        {
            href: `/`,
            label: 'Статистика',
            active: pathname === `/`,
        },
        {
            href: `/categories`,
            label: 'Категории',
            active: pathname === `/categories`,
        },
        {
            href: `/products`,
            label: 'Товары',
            active: pathname === `/products`,
        },
        {
            href: `/orders`,
            label: 'Заказы',
            active: pathname === `/orders`,
        },
        {
            href: `/users`,
            label: 'Пользователи',
            active: pathname === `/users`,
        },
        {
            href: `/candidates`,
            label: 'Кандидаты',
            active: pathname === `/candidates`,
        },
    ]

    return (
        <nav
            className={cn(
                `flex justify-center  items-center flex-wrap gap-2
                _space-x-4 lg:space-x-6 bg-gray-50 bg-transparent 
                sm:min-h-11 py-1 sm:py-4
                `,
                className
            )}
            {...props}
        >
            {routes.map((route, index) => (
                <motion.div
                    key={index + route.href}
                    initial={{ y: -20, opacity:0 }}
                    // animate={{ opacity: 1 }}
                    whileInView={{ y: 0, opacity:1 }}
                    transition={{ duration: 0.4 + index / 5 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ y: 2 }}
                    whileTap={{ y: 2 }}
                    tabIndex={-1}
                >
                    <Link
                        href={route.href}
                        className={cn(
                            `flex items-center font-bold sm:h-11 rounded-xl 
                        transition-colors duration-300 px-1 sm:px-5
                        hover:text-amber-200 
                        focus:text-amber-200 
                        focus:border-none
                        focus:outline-none`,
                            route.active &&
                                `shadow-md shadow-gray-400 
                                text-green-600
                                bg-amber-200
                                hover:text-green-800
                                focus:text-green-800
                                `
                        )}
                    >
                        {route.label}
                    </Link>
                </motion.div>
            ))}
        </nav>
    )
}
