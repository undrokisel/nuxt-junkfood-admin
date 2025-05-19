// "use client"

import prismadb from "@/lib/prismadb"
import { CategoriesClient } from "./components/client";

const Page = async () => {

  const categories =  await prismadb.category.findMany();
  
  const formattedCategories = categories.map((item) => ({
    id: String(item.id),
    name: item.name,
    createdAt: String(item.createdAt),
  }))

  return (
    <div className='flex-col bg-green-100'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  )
  
}

export default Page
