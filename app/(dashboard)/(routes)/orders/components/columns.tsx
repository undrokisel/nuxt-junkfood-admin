'use client'

import { JsonValue } from '@prisma/client/runtime/library'
import { ColumnDef } from '@tanstack/react-table'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

export type ProductVariantWithRelations = ProductVariant & {
    product: Product
}
export type OrderWithRelations = {
    productVariant: ProductVariantWithRelations
    quantity: number
    ingredients: Ingredient[]
}
export const mapDoughType = {
    1: 'Традиционое',
    2: 'Сырное',
    3: 'Томатное',
} as const

export type OrdersColumn = Omit<Order, 'updatedAt' | 'token' | 'userId'>

import { Ingredient, Product, ProductVariant } from '@prisma/client'

import { CellActionDelivery } from './cell-action-delivery'
import { CellActionPayment } from './cell-action-payment'

export type Order = {
    status: 'PAYD' | 'PENDING' | 'CANCELLED'
    email: string
    id: number
    items: JsonValue
    totalAmount: number
    fullName: string
    address: string
    phone: string
    comment: string | null
    createdAt: Date
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'id',
        // header: '№ заказа',
        header: () => <div className="text-primary"># заказа</div>,
    },
    {
        accessorKey: 'status',
        header: 'оплата',
        cell: ({ row }) => (
            <div className="flex flex-col gap-4">
                <div>
                    {/* eslint-disable-next-line */}
                    {row.getValue('status') === 'PAYD'
                        ? 'ОПЛАЧЕНО'
                        : // eslint-disable-next-line
                        row.getValue('status') === 'PENDING'
                        ? 'ОЖИДАЕТ ОПЛАТЫ'
                        : row.getValue('status') === 'CANCELLED'
                        ? 'ОПЛАТА ОТМЕНЕНА'
                        : 'СТАТУС ТРЕБУЕТ УТОЧНЕНИЯ'}
                </div>
                <CellActionPayment
                    data={{
                        id: row.getValue('id'),
                        payment_status: row.getValue('status'),
                        delivery_status: row.getValue('delivery_status'),
                    }}
                />
            </div>
        ),
    },
    {
        accessorKey: 'paymentId',
        // header: '№ заказа',
        header: () => (
            <div className="text-primary">ID оплаты (в случае возврата)</div>
        ),
    },
    {
        accessorKey: 'delivery_status',
        header: 'статус выполнения заказа',
        cell: ({ row }) => (
            <div className="flex flex-col gap-4">
                <div>
                    {/* eslint-disable-next-line */}
                    {row.getValue('delivery_status') === 'PENDING'
                        ? 'В ОЖИДАНИИ ДОСТАВКИ'
                        : // eslint-disable-next-line
                        row.getValue('delivery_status') === 'FULLFILED'
                        ? 'ВЫПОЛНЕН'
                        : row.getValue('delivery_status') === 'CANCELLED'
                        ? 'ДОСТАВКА ОТМЕНЕНА'
                        : 'СТАТУС ТРЕБУЕТ УТОЧНЕНИЯ'}
                </div>
                <CellActionDelivery
                    data={{
                        id: row.getValue('id'),
                        delivery_status: row.getValue('delivery_status'),
                    }}
                />
            </div>
        ),
    },
    {
        accessorKey: 'items',
        header: 'состав заказа',
        cell: ({ row }) => {
            return (
                <div
                    className="flex flex-wrap gap-1 max-w-[200px] 
        sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px]"
                >
                    {JSON.parse(row.getValue('items')).map(
                        (item: OrderWithRelations, index: number) => {
                            return (
                                <div className="" key={index}>
                                    <Collapsible>
                                        <CollapsibleTrigger className="p-2 bg-green-100 my-1 rounded-xl">
                                            {/* название */}
                                            <span>
                                                {
                                                    item.productVariant.product
                                                        .name
                                                }{' '}
                                            </span>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {/* тип теста (для шаурмы) */}
                                            {item?.productVariant
                                                ?.doughType && (
                                                <span>
                                                    <b>тесто:</b>{' '}
                                                    {mapDoughType[
                                                        item?.productVariant
                                                            ?.doughType as keyof typeof mapDoughType
                                                    ]?.toLowerCase()}
                                                    ,<br />
                                                </span>
                                            )}
                                            {/* цена за ед., количество штук, итоговая цена */}
                                            <span>
                                                <b> цена за ед:</b>{' '}
                                                {item?.productVariant?.price}{' '}
                                                р.,
                                                <br />
                                                <b> кол-во:</b> {item?.quantity}{' '}
                                                шт.,
                                                <br />
                                                {/* ингредиенты */}
                                                {item?.ingredients.length ? (
                                                    <div>
                                                        <b>
                                                            {' '}
                                                            доп. ингредиенты:
                                                        </b>{' '}
                                                        {Object.values(
                                                            item?.ingredients
                                                        ).map(
                                                            (ingredient, i) => (
                                                                <span key={i}>
                                                                    {ingredient.name.toLowerCase()}
                                                                    (
                                                                    {
                                                                        ingredient.price
                                                                    }
                                                                    р.),{' '}
                                                                </span>
                                                            )
                                                        )}
                                                        <br />
                                                        <span>
                                                            <b>
                                                                общ.цена
                                                                ингредиентов:
                                                            </b>{' '}
                                                            {item?.ingredients.reduce(
                                                                (
                                                                    acc,
                                                                    ingredient
                                                                ) =>
                                                                    acc +
                                                                    ingredient.price,
                                                                0
                                                            )}{' '}
                                                            р.
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                                <span>
                                                    <b> итог:</b>{' '}
                                                    {Number(item?.quantity) *
                                                        Number(
                                                            item?.productVariant
                                                                ?.price
                                                        ) +
                                                        Number(
                                                            item?.ingredients.reduce(
                                                                (
                                                                    acc,
                                                                    ingredient
                                                                ) =>
                                                                    acc +
                                                                    ingredient.price,
                                                                0
                                                            )
                                                        )}
                                                    {'р. '}
                                                </span>
                                            </span>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            )
                        }
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'totalAmount',
        header: 'итого (руб.)',
    },
    {
        accessorKey: 'fullName',
        header: 'получатель',
    },
    {
        accessorKey: 'address',
        header: 'адрес',
    },
    {
        accessorKey: 'phone',
        header: 'тел.',
    },
    {
        accessorKey: 'comment',
        header: 'коммент.',
    },
    {
        accessorKey: 'createdAt',
        header: 'дата создания',
        cell: ({ row }) => {
            const date: Date = row.getValue('createdAt')
            return (
                <div>
                    {date.toLocaleDateString()}; <br />
                    {date.toTimeString()}
                </div>
            )
        },
    },
    // {
    //   accessorKey: 'comment',
    //   header: 'коммент.',
    //   cell: ({ row }) => {
    //     const payment = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant='ghost' className='h-8 w-8 p-0'>
    //             <span className='sr-only'>Открыть меню</span>
    //             <MoreHorizontal className='h-4 w-4' />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align='end'>
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText('lkjh')}
    //           >
    //             Копировать ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
]
