'use client'

import axios from 'axios'
import { useState } from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertModal } from '@/components/modals/alert-modal'

import { CategoryColumn } from './columns'

interface CellActionProps {
    data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onConfirm = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/categories/${data.id}`)
            toast.success('Категория удалена.')
            router.refresh()
        } catch (error) {
            toast.error(
                'Убедитесь, что сначала Вы удалили все продукты, использующие данную категорию.'
            )
        } finally {
            setOpen(false)
            setLoading(false)
        }
    }

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('ID категории скопирован в буфер обмена.')
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Скрытое меню</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end"  className="bg-green-50 opacity-1">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" /> Копировать Id в буфер
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            router.push(
                                `/categories/${data.id}`
                            )
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" /> Изменить
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Удалить
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
