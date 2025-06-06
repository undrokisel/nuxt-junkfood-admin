import { CreditCard, Package, RussianRuble } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { Overview } from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { getTotalRevenue } from '@/actions/get-total-revenue'
import { getSalesCount } from '@/actions/get-sales-count'
import { getGraphRevenue } from '@/actions/get-graph-revenue'
import { getStockCount } from '@/actions/get-stock-count'
import { formatter } from '@/lib/utils'

interface DashboardPageProps {
    params: {
        storeId: string
    }
}

const DashboardPage: React.FC<DashboardPageProps> = async () => {
    const totalRevenue = await getTotalRevenue()
    const graphRevenue = await getGraphRevenue()
    const salesCount = await getSalesCount()
    const stockCount = await getStockCount()


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading
                    title="Админ панель"
                    description="обзор показателей ресторана"
                />
                <Separator />
                <div className="grid gap-1 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                    <Card className=''>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Доход
                            </CardTitle>
                            <RussianRuble className=" h-4 w-4 min-h-4 min-w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="sm:text-2xl font-bold ">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Чеков всего
                            </CardTitle>
                            <CreditCard className=" h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="sm:text-2xl font-bold">
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Видов товаров
                            </CardTitle>
                            <Package className="  h-4 w-4 min-h-4 min-w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="sm:text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>График продаж</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphRevenue} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage
