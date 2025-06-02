'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import { User } from '@prisma/client'

export type UserColumn = Omit<User, 'updatedAt' | 'password' | 'providerId'>
// {
//     id: number
//     fullName: string
//     email: string
//     role: 'ADMIN' | 'USER'
//     verified: Date | null
//     provider: string | null
//     createdAt: Date
// }

export const columns: ColumnDef<UserColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'fullName',
        header: 'Имя',
    },
    {
        accessorKey: 'email',
        header: 'Почта',
    },
    {
        accessorKey: 'role',
        header: 'Роль',
    },
    {
        accessorKey: 'verified',
        header: 'Дата подтверждения аккаунта',
        cell: ({ row }) => {
            const date: Date = row.getValue('createdAt')
            return (
                <div>
                    {date.toLocaleDateString()}; <br />
                    {date.toLocaleTimeString()}
                </div>
            )
        },
    },
    {
        accessorKey: 'provider',
        header: 'Провайдер авторизации',
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата создания',
        cell: ({ row }) => {
            const date: Date = row.getValue('createdAt')
            return (
                <div>
                    {date.toLocaleDateString()}; <br />
                    {date.toLocaleTimeString()}
                </div>
            )
        },
    },
    {
        header: 'Действия',
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
