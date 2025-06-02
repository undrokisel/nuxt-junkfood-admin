"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string
  name: string
//   billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
//   {
//     accessorKey: "billboard",
//     header: "Billboard",
//     cell: ({ row }) => row.original.billboardLabel,
//   },
  {
    accessorKey: "createdAt",
    header: "Дата создания",
    cell: ({ row }) => {
      const dateString: string = row.getValue('createdAt');
      const date = new Date(dateString); // Преобразуем строку в Date
      
      return (
        <div>
          {date.toLocaleDateString()}; <br />
          {date.toLocaleTimeString()}
        </div>
      )
    }





  },
  {
    header: "Действия",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
