'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import { Product } from '@prisma/client'

export type ProductColumn = Omit<Product, 'updatedAt'> & {
    price: number
}
// {
//   id: string
//   name: string
//   createdAt: string
// }

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Название',
    },
    {
        accessorKey: 'description',
        header: 'Описание',
    },
    {
        accessorKey: 'category',
        header: 'Категория',
    },
    {
        accessorKey: 'price',
        header: 'Цена (руб.)',
    },
    {
        accessorKey: 'imageUrl',
        header: 'Путь к изображению',
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата создания',
        cell: ({ row }) => (
            <div className="">
                {String(row.original.createdAt.toLocaleString())}
            </div>
        ),
    },
    {
        accessorKey: 'deletedAt',
        header: 'Дата помещения в архив',
        cell: ({ row }) => (
            <div className="bg-pink-300">
                {String(row?.original?.deletedAt?.toLocaleString() || '')}
            </div>
        ),
    },
    {
        header: 'Действия',
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
