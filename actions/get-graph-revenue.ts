import prismadb from "@/lib/prismadb"

interface GraphData {
    name: string
    total: number
}

export const getGraphRevenue = async (): Promise<GraphData[]> => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            status: 'PAYD',
        },
        include: {

            // : {
            //     include: {
            //         product: true,
            //     },
            // },
        },
    })

    const monthlyRevenue: { [key: number]: number } = {}

    // Группировка оплаченных заказов по месяцам
    for (const order of paidOrders) {
        const month = order.createdAt.getMonth() // 0 for Jan, 1 for Feb, ...
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.totalAmount
    }

    // формат для графика
    const graphData: GraphData[] = [
        { name: "Янв.", total: 0 },
        { name: "Февр.", total: 0 },
        { name: "Март", total: 0 },
        { name: "Апрель", total: 0 },
        { name: "Май", total: 0 },
        { name: "Июнь", total: 0 },
        { name: "Июль", total: 0 },
        { name: "Август", total: 0 },
        { name: "Сентябрь", total: 0 },
        { name: "Октябрь", total: 0 },
        { name: "Ноябрь", total: 0 },
        { name: "Декабрь", total: 0 },
    ]

    // Заполнение графика
    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }

    return graphData
}
