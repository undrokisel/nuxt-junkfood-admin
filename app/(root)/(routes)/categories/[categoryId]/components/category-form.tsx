'use client'

import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { Category } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { AlertModal } from '@/components/modals/alert-modal'

const formSchema = z.object({
    name: z.string().min(2, 'Минимум 2 символа'),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
    initialData: Category | null
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData
        ? 'Редактирование категории'
        : 'Создание категории'
    const description = initialData
        ? 'Редактирование существующей категории.'
        : 'Добавление новой категории'
    const toastMessage = initialData
        ? 'Категория изменена.'
        : 'Новая категория создана.'
    const action = initialData ? 'Созхранить изменения' : 'Создать'

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { name: '' },
    })

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/categories/${params.categoryId}`, data)
            } else {
                await axios.post(`/api/categories`, data)
            }
            router.refresh()
            router.push(`/categories`)
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
            await axios.delete(`/api/categories/${params.categoryId}`)
            router.refresh()
            router.push(`/categories`)
            toast.success('Категория удалена.')
        } catch (error: any) {
            toast.error(
                'Сначала убедитесь, что  удалены все продукты, относящиеся к данной категории.'
            )
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                        className="flex gap-2
                            bg-green-100
                            transition-all duration-300
                            hover:bg-amber-100 focus:bg-amber-100
                            hover:translate-y-1 focus:translate-y-1
                        "
                    >
                        <span>Удалить категорию</span>
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Название категории"
                                            className={`
                                                bg-green-100 
                                                transition-all duration-300
                                                hover:bg-amber-100 focus:bg-amber-100
                                                `}
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
                        className="bg-green-600 text-white
                        transition-all duration-300
                        hover:bg-green-500
                        focus:bg-green-500
                        hover:translate-y-1
                        hover:shadow-lg
                        focus:translate-y-1
                        focus:shadow-lg
                        "
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}
