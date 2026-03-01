import { absences } from '../utils/db'

export default defineEventHandler((event) => {
    const query = getQuery(event)
    let result = [...absences]

    if (query.name) {
        const searchName = String(query.name).toLowerCase()
        result = result.filter(a => a.name.toLowerCase() === searchName)
    }

    // Sort by date closest first
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return result
})
