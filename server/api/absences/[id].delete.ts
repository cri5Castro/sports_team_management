import { deleteAbsence } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({ statusCode: 400, message: 'Missing ID' })
    }

    return await deleteAbsence(id)
})
