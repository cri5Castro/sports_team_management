import { absences } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.items || !Array.isArray(body.items)) {
        throw createError({ statusCode: 400, message: 'Invalid format' })
    }

    // Overwrite logic (as requested 'to overwrite or populate')
    // We'll replace all absences with the imported ones
    absences.splice(0, absences.length, ...body.items)

    return { success: true, count: absences.length }
})
