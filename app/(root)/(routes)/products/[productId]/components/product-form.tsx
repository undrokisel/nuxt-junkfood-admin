'use client'

import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { ArchiveRestore, Trash } from 'lucide-react'
import { Category, Product, ProductVariant } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Textarea,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { AlertModal } from '@/components/modals/alert-modal'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import ImageUpload from '@/components/ui/image-upload'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
    name: z.string().min(1, 'минимум один символ'),
    // images: z.object({ url: z.string() }).array(),
    price: z.coerce
        .number()
        .min(1, 'минимум один символ')
        .max(1000, 'максимум 1000 руб.'),
    categoryId: z.string().min(1, 'минимум один символ'),
    imageUrl: z.string().min(1, 'минимум один символ'),
    description: z
        .string()
        .min(10, 'минимум 10 символов')
        .max(400, 'максимум 400 символов'),
})

type ProductFormValues = z.infer<typeof formSchema>
type ProductWithProductVariant = Product & {
    variants: ProductVariant[]
}

interface ProductFormProps {
    initialData: ProductWithProductVariant | null
    categories: Category[]
}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
}) => {
    const params = useParams()
    const router = useRouter()

    const [openRestoreModal, setOpenRestoreModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? 'Редактирование продукта' : 'Создание продукта'
    const description =
        'Форма ' +
        (initialData ? 'редактирования продукта.' : 'создания нового продукта')
    const toastMessage = initialData ? 'Продукт изменен.' : 'Продукт создан.'
    const action = initialData ? 'Сохранить изменения' : 'Создать'

    const defaultValues = initialData
        ? {
              ...initialData,
              categoryId: String(initialData.categoryId),
              price: parseFloat(String(initialData?.variants[0]?.price)),
              description: initialData?.description || '',
          }
        : {
              name: '',
              //   images: [],
              price: 0,
              categoryId: undefined,
              imageUrl: '',
          }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/products/${params.productId}`, {
                    ...data,
                    categoryId: Number(data.categoryId),
                })
            } else {
                await axios.post(`/api/products`, {
                    ...data,
                    categoryId: Number(data.categoryId),
                })
            }
            router.refresh()
            router.push(`/products`)
            toast.success(toastMessage)
        } catch (error: any) {
            toast.error('Что-то пошло не так.')
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/products/${params.productId}`)
            router.refresh()
            router.push(`/products`)
            toast.success('Продукт удален.')
        } catch (error: any) {
            toast.error('Что-то пошло не так.')
        } finally {
            setLoading(false)
            setOpenDeleteModal(false)
        }
    }
    const onRestore = async () => {
        try {
            setLoading(true)
            await axios.patch(`/api/products/${params.productId}`, {
                deletedAt: null,
            })
            router.refresh()
            router.push(`/products`)
            toast.success('Продукт восстановлен из архива.')
        } catch (error: any) {
            toast.error('Что-то пошло не так.')
        } finally {
            setLoading(false)
            setOpenRestoreModal(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <AlertModal
                isOpen={openRestoreModal}
                onClose={() => setOpenRestoreModal(false)}
                onConfirm={onRestore}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && !initialData.deletedAt && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpenDeleteModal(true)}
                        className="flex gap-4
                        bg-green-100
                        transition-all duration-300
                        hover:bg-amber-100 focus:bg-amber-100
                        hover:translate-y-1 focus:translate-y-1
                        "
                    >
                        <span>Удалить товар</span>
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
                {initialData && initialData.deletedAt && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpenRestoreModal(true)}
                        className="flex gap-4"
                    >
                        <span>Восстановить из архива</span>
                        <ArchiveRestore className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            {initialData?.deletedAt && (
                <div className="bg-pink-300 p-4 rounded-xl">
                    Продукт находится в архиве
                </div>
            )}
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="md:grid md:grid-cols-3 gap-8">
                        {/* Название продукта */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Название продукта"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* imageUrl */}
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Путь к изображению</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Путь к изображению"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Цена */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="max-w-[100px]">
                                    <FormLabel>Цена (руб.)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="100"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Выбор категории */}
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Категория</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={String(field.value)}
                                        defaultValue={String(field.value)}
                                    >
                                        <FormControl
                                            className={`
                                            opacity-1 bg-green-100              
                                            bg-green-100
                                            transition-all duration-300
                                            hover:bg-amber-100
                                            focus:bg-amber-100
                                            `}
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Выберите категорию"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="opacity-1 bg-green-50">
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={String(category.id)}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Описание</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className={`
                                                opacity-1 bg-green-100
                                                bg-green-100
                                                transition-all duration-300
                                                hover:bg-amber-100
                                                focus:bg-amber-100
                                                `}
                                            disabled={loading}
                                            placeholder="Описание"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        type="submit"
                        className={`
                            bg-green-600 text-white
                            transition-all duration-300
                            hover:bg-green-500
                            focus:bg-green-500
                            hover:translate-y-1
                            hover:shadow-lg
                            focus:translate-y-1
                            focus:shadow-lg
                            `}
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}
