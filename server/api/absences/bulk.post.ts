import { overwriteAbsences } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.items || !Array.isArray(body.items)) {
        throw createError({ statusCode: 400, message: 'Invalid format' })
    }

    return await overwriteAbsences(body.items)
})
