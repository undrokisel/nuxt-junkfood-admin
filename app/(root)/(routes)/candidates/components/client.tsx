'use client'


import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ApiList } from '@/components/ui/api-list'

import { columns, CandidatesColumn } from './columns'

interface CandidatesClientProps {
    data: CandidatesColumn[]
}

export const CandidatesClient: React.FC<CandidatesClientProps> = ({ data }) => {

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Кандидаты (${data.length})`}
                    description="Администрирование соискателей работы по вакансиям"
                />
            </div>

            <Separator />
            <DataTable searchKey="fio" columns={columns} data={data} />
            
            {/* <Heading title="API" description="Эндпоинты для пользователей" /> */}
            {/* <Separator /> */}
            {/* <ApiList entityName="users" entityIdName="userId" /> */}
        </>
    )
}
