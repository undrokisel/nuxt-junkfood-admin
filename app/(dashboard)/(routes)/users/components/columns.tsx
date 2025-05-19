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
    },
    {
        accessorKey: 'provider',
        header: 'Провайдер авторизации',
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата создания',
    },
    {
        header: 'Действия',
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
