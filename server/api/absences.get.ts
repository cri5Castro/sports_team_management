import { getAbsences } from '../utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const absences = await getAbsences()

    let result = [...absences]

    if (query.name) {
        const searchName = String(query.name).toLowerCase()
        result = result.filter(a => a.name.toLowerCase() === searchName)
    }

    // Sort by date closest first (already sorted in db but verifying)
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return result
})
