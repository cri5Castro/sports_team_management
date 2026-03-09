import { addEvent, isAdmin } from '../utils/db'

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

    const body = await readBody(event)
    return await addEvent(body)
})
