import prismadb from '@/lib/prismadb'
import { OrdersClient } from './components/client'

const OrdersPage = async () => {


    const orders = await prismadb.order.findMany({
        include: {
            user: true
        },
    })

    const formattedOrders = orders.map(
        ({
            id,
            user,
            items,
            totalAmount,
            address, 
            comment, 
            createdAt, 
            delivery_status, 
            email, 
            fullName, 
            paymentId, 
            phone, 
            status, 
        }) => ({
            id,
            user,
            items,
            totalAmount,
            address, 
            comment, 
            createdAt, 
            delivery_status, 
            email, 
            fullName, 
            paymentId, 
            phone, 
            status, 
        })
    )

    return (
        <div className="flex-col bg-green-100">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrdersClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default OrdersPage
