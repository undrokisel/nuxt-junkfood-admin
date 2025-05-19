import prismadb from '@/lib/prismadb'
import { UsersClient } from './components/client'

const UserPage = async () => {
    const users = await prismadb.user.findMany()

    const formattedUsers = users.map(
        ({ id, fullName, email, role, verified, provider, createdAt }) => ({
            id,
            fullName,
            email,
            role,
            verified,
            provider,
            createdAt,
        })
    )
    return (
        <div className="flex-col bg-green-100">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <UsersClient data={formattedUsers} />
            </div>
        </div>
    )
}

export default UserPage
