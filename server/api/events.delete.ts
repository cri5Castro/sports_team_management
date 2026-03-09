import { deleteEvent, deletePastEvents, isAdmin } from '../utils/db'

export default defineEventHandler(async (event) => {
    const session = event.context.session
    if (!session?.user?.email) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const authorized = await isAdmin(session.user.email)
    if (!authorized) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden'
        })
    }

    const query = getQuery(event)

    if (query.allPast === 'true') {
        return await deletePastEvents()
    }

    if (query.id) {
        return await deleteEvent(query.id as string)
    }

    throw createError({
        statusCode: 400,
        statusMessage: 'Missing id or allPast query parameter'
    })
})
