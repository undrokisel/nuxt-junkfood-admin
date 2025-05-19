'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ApiAlert } from '@/components/ui/api-alert'

import { columns, CategoryColumn } from './columns'
import { ApiList } from '@/components/ui/api-list'

interface CategoriesClientProps {
    data: CategoryColumn[]
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Категории (${data.length})`}
                    description="Администрирование категорий ресторана"
                />
                <Button
                    onClick={() =>
                        router.push(`/categories/new`)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Создать новую категорию
                </Button>
            </div>

            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            
            <Heading title="API" description="эндпоинты для Категорий" />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    )
}
