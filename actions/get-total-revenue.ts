import prismadb from "@/lib/prismadb"

export const getTotalRevenue = async () => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            status: 'PAYD',
        },
    })

    const totalRevenue = paidOrders.reduce((total, order) => {
        return total + order.totalAmount
    }, 0)

    return totalRevenue
}
