import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        // const { userId } = auth()
        const body = await req.json()
        const {
            delivery_status, status
        } = body
        // if (!userId) {
        //     return new NextResponse('Unauthenticated', { status: 403 })
        // }


        if (!params.orderId) {
            return new NextResponse('orderId id is required', { status: 400 })
        }
        // проверка на существование 
        const orderExisted = await prismadb.order.findUnique({
            where: {
                id: Number(params.orderId)
            }
        })
        if (!orderExisted)
            return new NextResponse('order did not find by id', { status: 400 })


        // обновляем статус заказа
        const order = await prismadb.order.update({
            where: {
                id: Number(params.orderId),
            },
            data: { delivery_status, status },
        })

        return NextResponse.json(order)
    } catch (error) {
        console.log('[order_PATCH]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
