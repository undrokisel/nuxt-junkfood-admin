import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import prismadb from '@/lib/prismadb'

export async function GET(
    _: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        if (!params.categoryId) {
            return new NextResponse('Category id is required', { status: 400 })
        }
        const category = await prismadb.category.findUnique({
            where: {
                id: Number(params.categoryId),
            },
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_GET]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    _: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        // const { userId } = auth()
        // if (!userId) {
        //     return new NextResponse('Unauthenticated', { status: 403 })
        // }
        if (!params.categoryId) {
            return new NextResponse('Category id is required', { status: 400 })
        }
        const category = await prismadb.category.delete({
            where: {
                id: Number(params.categoryId),
            },
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        // const { userId } = auth()
        const body = await req.json()
        const { name } = body
        // if (!userId) {
        //     return new NextResponse('Unauthenticated', { status: 403 })
        // }
        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }
        if (!params.categoryId) {
            return new NextResponse('Category id is required', { status: 400 })
        }

        const category = await prismadb.category.update({
            where: {
                id: Number(params.categoryId),
            },
            data: { name },
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_PATCH]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
