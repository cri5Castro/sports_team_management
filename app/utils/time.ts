import { parse, isBefore, startOfDay, parseISO, set } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

const TIMEZONE = 'America/Mexico_City'

/**
 * Parses a time slot string like "12:00 pm - 1:00 pm" and returns the start time 
 * as a Date object on the given dateStr ("yyyy-MM-dd").
 */
export const getSessionStartTime = (dateStr: string, timeSlot: string): Date => {
    // Extract the first part: "12:00 pm"
    const parts = timeSlot.split('-')
    const startTimeStr = (parts[0] || '').trim().toLowerCase()

    // Create a base date from dateStr
    const baseDate = parseISO(dateStr)

    // Parse the time part
    // Format is "h:mm a" (e.g., "12:00 pm", "3:00 pm")
    const parsedTime = parse(startTimeStr, 'h:mm a', new Date())

    // Combine date and time
    return set(baseDate, {
        hours: parsedTime.getHours(),
        minutes: parsedTime.getMinutes(),
        seconds: 0,
        milliseconds: 0
    })
}

/**
 * Returns true if the session (date + time) has already passed relative to current CDMX time.
 */
export const isSessionPast = (dateStr: string, timeSlot: string): boolean => {
    if (!dateStr || !timeSlot) return true

    const now = toZonedTime(new Date(), TIMEZONE)
    const sessionStart = getSessionStartTime(dateStr, timeSlot)

    // The session is "past" if the current time is after the session start time
    return isBefore(sessionStart, now)
}
