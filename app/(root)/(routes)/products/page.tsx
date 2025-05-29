import prismadb from '@/lib/prismadb'
import { ProductsClient } from './components/client'

const ProductPage = async () => {
    const products = await prismadb.product.findMany({
        include: {
            category: true,
            variants: true,
        },
    })


    const formattedCategories = products.map(
        ({
            id,
            description,
            name,
            createdAt,
            imageUrl,
            category,
            categoryId,
            variants,
            deletedAt
        }) => ({
            id,
            name,
            description,
            createdAt,
            imageUrl,
            categoryId,
            deletedAt,
            category: category.name,
            price: variants[0].price,
        })
    )

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default ProductPage
