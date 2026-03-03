import { addAbsence } from '../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Basic validation
    if (!body.name || !body.date || !body.timeSlot || !body.location) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Faltan campos requeridos',
        })
    }

    const newAbsence = await addAbsence(body)
    return newAbsence
})
