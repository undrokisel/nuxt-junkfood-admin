'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import { ApplicationVacancy, User } from '@prisma/client'

export type CandidatesColumn = ApplicationVacancy

export const columns: ColumnDef<CandidatesColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'phone',
        header: 'Телефон',
    },
    {
        accessorKey: 'fio',
        header: 'ФИО',
    },
    {
        accessorKey: 'comment',
        header: 'Комментарий',
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата создания заявки',
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
        accessorKey: 'status',
        header: 'Статус заявки',
    },
    {
        accessorKey: 'adminComment',
        header: 'Комментарий админа',
    },

    {
        accessorKey: 'adminCommentCreatedAt',
        header: 'Дата комментария админа',
        cell: ({ row }) => {
            const date: Date = row.getValue('adminCommentCreatedAt')
            if (!date) return null;
            return (
                <div>
                    {date.toLocaleDateString()}; <br />
                    {date.toLocaleTimeString()}
                </div>
            )
        },
    },
]
