import Image from 'next/image'
import React from 'react'

export const LogoBlock = () => {
    return (
        <div className="flex justify-start items-center gap-4 my-4">
            <picture>
                <Image
                    src="/images/шаурма.webp"
                    width="50"
                    height="50"
                    alt="Логотип"
                    className="rounded-full min-w-[50px]"
                />
            </picture>
            <div className="flex flex-col">
                <h1 className="uppercase text-2xl font-black">Твоя шаурма</h1>
                <p className="text-black-400 leading-3 text-sm">
                    Панель Администратора
                </p>
            </div>
        </div>
    )
}
