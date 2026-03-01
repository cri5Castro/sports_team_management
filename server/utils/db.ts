export const absences = [
    { id: '1', name: 'Alex Rios', date: '2026-03-01', timeSlot: '11:00 am - 12:00 pm', location: 'Tlatelolco', reason: 'Viaje', sport: 'swimming' },
]

export const getNames = () => {
    const defaultNames = ['Beto', 'Carlos', 'Dani', 'Erick', 'Fernando']
    const names = new Set([...defaultNames, ...absences.map(a => a.name)])
    return Array.from(names).sort()
}
