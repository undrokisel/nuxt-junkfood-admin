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
    const router = useRouter()

    return (
        <>
            <div className="flex items-start justify-between gap-2 flex-wrap">
                <Heading
                    title={`Категории (${data.length})`}
                    description="Администрирование категорий ресторана"
                />
                <Button
                    className='bg-green-100
                        transition-all duration-300
                        hover:bg-amber-100 focus:bg-amber-100
                        hover:translate-y-1 focus:translate-y-1 h-full
                    
                    '
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
