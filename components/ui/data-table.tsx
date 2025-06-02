'use client'

import { useState } from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string
}

// export function DataTable<TData, TValue>({
//     columns,
//     data,
//     searchKey,
// }: DataTableProps<TData, TValue>) {
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onColumnFiltersChange: setColumnFilters,
//         getFilteredRowModel: getFilteredRowModel(),
//         state: {
//             columnFilters,
//         },
//     })

//     return (
//         <div className="">
//             {/* search */}
//             <div className="flex items-center py-4 ">
//                 <Input
//                     placeholder={`Поиск по полю ${searchKey}`}
//                     value={
//                         (table
//                             .getColumn(searchKey)
//                             ?.getFilterValue() as string) ?? ''
//                     }
//                     onChange={(event) =>
//                         table
//                             .getColumn(searchKey)
//                             ?.setFilterValue(event.target.value)
//                     }
//                     className={`\
//                         max-w-sm 
//                         bg-green-100 
//                         transition-all duration-300
//                         hover:bg-amber-100 focus:bg-amber-100
//                         `}
//                 />
//             </div>
//             <div className="rounded-md border bg-white border-1 border-green-800 overflow-hidden">
                
//                 <Table className='min-w-full'>
//                     <TableHeader>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <TableRow key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => {
//                                     return (
//                                         <TableHead key={header.id}>
//                                             {header.isPlaceholder
//                                                 ? null
//                                                 : flexRender(
//                                                       header.column.columnDef
//                                                           .header,
//                                                       header.getContext()
//                                                   )}
//                                         </TableHead>
//                                     )
//                                 })}
//                             </TableRow>
//                         ))}
//                     </TableHeader>
//                     <TableBody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     data-state={
//                                         row.getIsSelected() && 'selected'
//                                     }
//                                     // className={ row.getAllCells ? "bg-red-100": ''}
//                                 >
//                                     {row.getVisibleCells().map((cell) => (
//                                         <TableCell key={cell.id}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext()
//                                             )}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell
//                                     colSpan={columns.length}
//                                     className="h-24 text-center"
//                                 >
//                                     Результаты не найдены.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//             <div className="flex items-center justify-end space-x-2 py-4">
//                 <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => table.previousPage()}
//                     disabled={!table.getCanPreviousPage()}
//                     className={`
//                            bg-green-100 transition-all duration-300
//                             hover:bg-amber-100
//                             hover:translate-y-1
//                         `}
//                 >
//                     Предыдущая
//                 </Button>
//                 <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => table.nextPage()}
//                     disabled={!table.getCanNextPage()}
//                     className={`
//                         bg-green-100 transition-all duration-300
//                          hover:bg-amber-100
//                          hover:translate-y-1
//                      `}
//                 >
//                     Следующая
//                 </Button>
//             </div>
//         </div>
//     )
// }
// export function DataTable<TData, TValue>({
//     columns,
//     data,
//     searchKey,
//   }: DataTableProps<TData, TValue>) {
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//     const table = useReactTable({
//       data,
//       columns,
//       getCoreRowModel: getCoreRowModel(),
//       getPaginationRowModel: getPaginationRowModel(),
//       onColumnFiltersChange: setColumnFilters,
//       getFilteredRowModel: getFilteredRowModel(),
//       state: { columnFilters },
//     })
  
//     return (
//       <div className="space-y-4">
//         {/* Поиск */}
//         <div className="flex items-center py-4">
//           <Input
//             placeholder={`Поиск по ${searchKey}`}
//             value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
//             onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
//             className="max-w-sm bg-green-100 hover:bg-amber-100 focus:bg-amber-100 transition-all duration-300"
//           />
//         </div>
  
//         {/* Контейнер таблицы с горизонтальной прокруткой */}
//         <div className="border rounded-md border-green-800 overflow-hidden">
//           <div className="overflow-x-auto">
//             <Table className="min-w-full table-fixed">
//               <TableHeader>
//                 {table.getHeaderGroups().map(headerGroup => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map(header => (
//                       <TableHead key={header.id} className="whitespace-nowrap px-4 py-2">
//                         {header.isPlaceholder ? null : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableHeader>
//               <TableBody>
//                 {table.getRowModel().rows?.length ? (
//                   table.getRowModel().rows.map((row) => (
//                     <TableRow
//                       key={row.id}
//                       data-state={row.getIsSelected() && 'selected'}
//                     >
//                       {row.getVisibleCells().map(cell => (
//                         <TableCell key={cell.id} className="break-words max-w-xs px-4 py-2">
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} className="h-24 text-center">
//                       Результаты не найдены.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
  
//         {/* Пагинация */}
//         <div className="flex items-center justify-end space-x-2 py-4">
//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="bg-green-100 hover:bg-amber-100 transition-all duration-300 hover:translate-y-1"
//           >
//             Предыдущая
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="bg-green-100 hover:bg-amber-100 transition-all duration-300 hover:translate-y-1"
//           >
//             Следующая
//           </Button>
//         </div>
//       </div>
//     )
//   }

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center py-4">
                <Input
                    placeholder={`Поиск по полю ${searchKey}`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
                    className="max-w-sm bg-green-100 transition-all duration-300 hover:bg-amber-100 focus:bg-amber-100"
                />
            </div>

            {/* Table container with constrained width */}
            <div className="relative rounded-md border _border-green-800 bg-white">
                <div className="overflow-x-auto rounded-md border border-primary  rounded-2xl">
                    <Table className="min-w-full">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead 
                                            key={header.id}
                                            className="whitespace-nowrap text-primary text-lg _text-center bg-amber-50"
                                            // Prevent header text wrapping
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell 
                                                key={cell.id}
                                                className="whitespace-nowrap _align-top _text-center bg-green-50" // Prevent cell content wrapping
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Результаты не найдены.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="bg-green-100 transition-all duration-300 hover:bg-amber-100 hover:translate-y-1"
                >
                    Предыдущая
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="bg-green-100 transition-all duration-300 hover:bg-amber-100 hover:translate-y-1"
                >
                    Следующая
                </Button>
            </div>
        </div>
    )
}