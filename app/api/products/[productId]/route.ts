import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { ProductVariant } from '@prisma/client';

export async function PATCH(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        // const { userId } = auth()
        console.log(params.productId)
        const body = await req.json()
        const {
            name,
            description,
            price,
            imageUrl,
            categoryId,
            deletedAt
        } = body
        // if (!userId) {
        //     return new NextResponse('Unauthenticated', { status: 403 })
        // }


        if (!params.productId) {
            return new NextResponse('productId id is required', { status: 400 })
        }
        // проверка на существование продукта
        const productExisted = await prismadb.product.findUnique({
            where: {
                id: Number(params.productId)
            }
        })
        if (!productExisted)
            return new NextResponse('productId did not find', { status: 400 })


        // проверка что id категории соответствует существующим
        if (categoryId) {
            const categoryExisted = await prismadb.category.findUnique({
                where: { id: categoryId }
            })
            if (!categoryExisted)
                return new NextResponse('Category did not find', { status: 400 })
        }


        // обновляем продукт
        const product = await prismadb.product.update({
            where: {
                id: Number(params.productId),
            },
            data: {
                name,
                description,
                imageUrl,
                categoryId,
                deletedAt,
            },
        })

        // проверка существования варианта продукта
        const productVariantExisted = await prismadb.productVariant.findFirst({
            where: {
                productId: Number(params.productId)
            }
        })
        if (!productVariantExisted)
            return new NextResponse('ProductVariant did not find', { status: 400 })
        // обновляем цену у варианта продукта
        await prismadb.productVariant.update({
            where: {
                id: productVariantExisted.id
            },
            data: {
                price
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_PATCH]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}




export async function DELETE(
    _: Request,
    { params }: { params: { productId: string } }
) {
    try {
        // const { userId } = auth()
        // if (!userId) {
        //     return new NextResponse('Unauthenticated', { status: 403 })
        // }
        if (!params.productId) {
            return new NextResponse('productId id is required', { status: 400 })
        }

        const productVariantExisted = await prismadb.productVariant.findFirst({
            where: {
                productId: Number(params.productId),
            }
        })
        if (!productVariantExisted) return new NextResponse('productVariant did not found to soft delete', { status: 400 })

        const productExisted = await prismadb.product.findFirst({
            where: {
                id: Number(params.productId),
            }
        })
        if (!productExisted) return new NextResponse('product did not found to soft delete', { status: 400 })

        // переносим в архив вариант продукта
        await prismadb.productVariant.update({
            where: {
                id: productVariantExisted.id,
            },
            data: {
                deletedAt: new Date()
            }
        })

        // переносим в архив продукт
        const productDeleted = await prismadb.product.update({
            where: {
                id: Number(params.productId),
            },
            data: {
                deletedAt: new Date()
            }
        })

        return NextResponse.json(productDeleted)
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}