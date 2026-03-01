import { absences } from '../../utils/db'

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')

    const index = absences.findIndex(a => a.id === id)
    if (index !== -1) {
        absences.splice(index, 1)
    }

    return { success: true }
})
