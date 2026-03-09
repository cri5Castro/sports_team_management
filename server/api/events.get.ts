import { getEvents } from '../utils/db'

export default defineEventHandler(async () => {
    return await getEvents()
})
