import { addAbsence } from '../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Normalize keys from frontend (ensure time_slot vs timeSlot)
    const normalizedBody = {
        name: body.name,
        date: body.date,
        timeSlot: body.timeSlot || body.time_slot,
        location: body.location,
        reason: body.reason,
        sport: body.sport
    }

    // Basic validation
    if (!normalizedBody.name || !normalizedBody.date || !normalizedBody.timeSlot || !normalizedBody.location) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Faltan campos requeridos: ' + JSON.stringify({
                name: !!normalizedBody.name,
                date: !!normalizedBody.date,
                timeSlot: !!normalizedBody.timeSlot,
                location: !!normalizedBody.location
            }),
        })
    }

    const newAbsence = await addAbsence(normalizedBody)
    return newAbsence
})
