'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertModal } from '@/components/modals/alert-modal'
import { DeliveryStatus, OrderStatus } from '@prisma/client'

interface CellActionProps {
    data: {
        id: Number
        payment_status: OrderStatus
        delivery_status: DeliveryStatus
    }
}

export const CellActionPayment: React.FC<CellActionProps> = ({
    data,
}: CellActionProps) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onConfirm = async (status: 'CANCELLED') => {
        try {
            setLoading(true)
            const res = await axios.patch(`/api/orders/${data.id}`, {
                status,
            })
            if (res.status !== 200)
                throw new Error('Ошибка при изменении статуса оплаты заказа')
            toast.success('Статус оплаты изменен.')
            router.refresh()
        } catch (error) {
            toast.error('Ошибка при изменении статуса оплаты')
        } finally {
            setOpen(false)
            setLoading(false)
        }
    }

    return (
        <>
            {data.payment_status === 'PAYD' &&
                data.delivery_status !== 'FULLFILED' && (
                    <>
                        <AlertModal
                            isOpen={open}
                            onClose={() => setOpen(false)}
                            onConfirm={() => onConfirm('CANCELLED')}
                            loading={loading}
                        />
                        <Button
                            variant="destructive"
                            className="bg-red-200 py-6  transition-all duration-300 
                        hover:bg-red-400 focus:bg-red-400
                        "
                            onClick={() => setOpen(true)}
                        >
                            Оформить возврат
                        </Button>
                    </>
                )}
        </>
    )
}
