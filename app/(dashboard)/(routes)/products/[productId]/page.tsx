import prismadb from '@/lib/prismadb'

import { ProductForm } from './components/product-form'

const ProductPage = async ({
    params,
}: {
    params: { productId: string }
}) => {
    
    let product
    if (params.productId !== 'new') {
        product = await prismadb.product.findUnique({
            where: {
                id: Number(params.productId),
            },
            include: {
                variants: true
            }
        })
    } else product = null
    
    const categories = await prismadb.category.findMany()

    return (
        <div className="flex-col bg-green-100">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    categories={categories}
                    initialData={product}
                />
            </div>
        </div>
    )
}

export default ProductPage
