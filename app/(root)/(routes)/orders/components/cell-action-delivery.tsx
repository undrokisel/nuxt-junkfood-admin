'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertModal } from '@/components/modals/alert-modal'
import { DeliveryStatus } from '@prisma/client'

interface CellActionProps {
    data: {
        id: Number
        delivery_status: DeliveryStatus
    }
}

export const CellActionDelivery: React.FC<CellActionProps> = ({
    data,
}: CellActionProps) => {
    const router = useRouter()
    const [openFullfuledModal, setOpenFullfuledModal] = useState(false)
    const [openCancelModal, setOpenCancelModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const onConfirm = async (status: 'FULLFILED' | 'CANCELLED') => {
        try {
            setLoading(true)
            const res = await axios.patch(`/api/orders/${data.id}`, {
                delivery_status: status,
            })
            if (res.status !== 200)
                throw new Error('Ошибка при изменении статус доставки заказа')
            toast.success('Статус доставки изменен.')
            router.refresh()
        } catch (error) {
            toast.error('Ошибка при изменении статуса доставки')
        } finally {
            setOpenFullfuledModal(false)
            setOpenCancelModal(false)
            setLoading(false)
        }
    }

    return (
        <>
            {data.delivery_status === 'PENDING' && (
                <>
                    <AlertModal
                        isOpen={openFullfuledModal}
                        onClose={() => setOpenFullfuledModal(false)}
                        onConfirm={() => onConfirm('FULLFILED')}
                        loading={loading}
                    />
                    <AlertModal
                        isOpen={openCancelModal}
                        onClose={() => setOpenCancelModal(false)}
                        onConfirm={() => onConfirm('CANCELLED')}
                        loading={loading}
                    />
                    <Button
                        variant="destructive"
                        className="bg-amber-200 py-6  transition-all duration-300 
                hover:bg-amber-300 focus:bg-amber-300
                "
                        onClick={() => setOpenFullfuledModal(true)}
                    >
                        Подтвердить вручение
                    </Button>
                    <Button
                        variant="destructive"
                        className="bg-red-200 py-6  transition-all duration-300 
                hover:bg-red-400 focus:bg-red-400
                "
                        onClick={() => setOpenCancelModal(true)}
                    >
                        Отменить заказ
                    </Button>
                </>
            )}
        </>
    )
}
