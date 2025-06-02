import prismadb from '@/lib/prismadb'
import { CandidatesClient } from './components/client'

const CandidatesPage = async () => {
    const candidates = await prismadb.applicationVacancy.findMany()

    
    return (
        <div className="flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CandidatesClient data={candidates} />
            </div>
        </div>
    )
}

export default CandidatesPage
