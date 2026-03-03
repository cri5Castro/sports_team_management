import { getNames } from '../utils/db'

export default defineEventHandler(async () => {
    return await getNames()
})
