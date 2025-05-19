'use client'

import axios from 'axios'
import { useState } from 'react'
import {
    Archive,
    ArchiveRestore,
    Copy,
    Edit,
    MoreHorizontal,
    Trash,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertModal } from '@/components/modals/alert-modal'

import { ProductColumn } from './columns'

interface CellActionProps {
    data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openRestoreModal, setOpenRestoreModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const onConfirmDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/products/${data.id}`)
            toast.success('Продукт удален.')
            router.refresh()
        } catch (error) {
            toast.error('Ошибка при помещении продукта в архив')
        } finally {
            setOpenDeleteModal(false)
            setLoading(false)
        }
    }

    const onConfirmRestore = async () => {
        try {
            setLoading(true)
            console.log(data.id)
            const res = await axios.patch(`/api/products/${data.id}`, {
                deletedAt: null
            })
            if (res.status === 200) {
                toast.success('Продукт восстановлен из архива.')
                router.refresh()
            }
        } catch (error) {
            toast.error('Ошибка при восстановлении продукта из архива')
        } finally {
            setOpenDeleteModal(false)
            setLoading(false)
        }
    }

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('ID продукта скопирован в буфер обмена')
    }

    return (
        <>
            <AlertModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={onConfirmDelete}
                loading={loading}
            />
            <AlertModal
                isOpen={openRestoreModal}
                onClose={() => setOpenRestoreModal(false)}
                onConfirm={onConfirmRestore}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Скрытое меню</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="bg-green-50 opacity-1"
                >
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(String(data.id))}>
                        <Copy className="mr-2 h-4 w-4" /> Копировать Id в буфер
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/products/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Изменить
                    </DropdownMenuItem>
                    {!data.deletedAt ? (
                        <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
                            <Trash className="mr-2 h-4 w-4" /> Удалить
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={() => setOpenRestoreModal(true)}>
                            <ArchiveRestore className="mr-2 h-4 w-4" />{' '}
                            Восстановить из архива
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
