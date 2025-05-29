'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, ProductColumn } from './columns'
import { ApiList } from '@/components/ui/api-list'

interface ProductsClientProps {
    data: ProductColumn[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Продукты (${data.length})`}
                    description="Администрирование продуктов"
                />
                <Button
                    className="bg-green-100
                    transition-all duration-300
                    hover:bg-amber-100 focus:bg-amber-100
                    hover:translate-y-1 focus:translate-y-1
                    "
                    onClick={() => router.push(`/products/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Создать новый продукт
                </Button>
            </div>

            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />

            <Heading title="API" description="эндпоинты для продуктов" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    )
}
