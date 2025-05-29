'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, OrdersColumn } from './columns'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

interface OrdersClientProps {
    data: OrdersColumn[]
}

export const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Заказы (${data.length})`}
                    description="Администрирование заказов"
                />
            </div>

            <Separator />
            {/* <DataTable searchKey="email" columns={columns} data={data} /> */}
            <div className="rounded-md border border-primary  rounded-2xl overflow-hidden">
                <Table>
                    <TableHeader className="">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-primary text-lg text-center bg-amber-50"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="align-top text-center bg-green-50"
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
                                    Данных нет
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
