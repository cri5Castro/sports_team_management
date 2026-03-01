import { getNames } from '../utils/db'

export default defineEventHandler(() => {
    return getNames()
})
