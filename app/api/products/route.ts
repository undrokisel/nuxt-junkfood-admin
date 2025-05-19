import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {// const { userId } = auth()
        const { name, imageUrl, categoryId, price, description } = await req.json();
        // if (!userId) {
        //     return new NextResponse("Unauthenticated", { status: 403 })
        // }
        if (!name) return new NextResponse("name is required", { status: 400 })

        if (!description) return new NextResponse("description is required", { status: 400 })

        if (!imageUrl) return new NextResponse("imageUrl is required", { status: 400 })

        if (!categoryId) return new NextResponse("categoryId is required", { status: 400 })

        if (!price) return new NextResponse("price is required", { status: 400 })

        const existedCategory = await prisma?.category.findUnique({
            where: { id: categoryId }
        })
        if (!existedCategory) {
            return new NextResponse("categoryId is wrong", { status: 400 })
        }
        const product = await prismadb.product.create({
            data: {
                name, imageUrl, categoryId, description
            }
        })
        const productVariant = await prismadb.productVariant.create({
            data: {
                price,
                productId: product.id,
            }
        })
        return NextResponse.json({ product, productVariant })


    } catch (error) {
        console.log("[PRODUCTS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }

}