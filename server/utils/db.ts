export const absences = [
    { id: '1', name: 'Castro Maya Cristopher', date: '2026-03-01', timeSlot: '11:00 am - 12:00 pm', location: 'Tlatelolco', reason: 'Viaje', sport: 'swimming', createdAt: '2026-03-01T20:00:00.000Z' },
]

export const getNames = () => {
    const defaultNames = ['Hernandez Pilar Yasmine', 'Castro Maya Cristopher']
    const names = new Set([...defaultNames, ...absences.map(a => a.name)])
    return Array.from(names).sort()
}

export const discounts = [
    {
        id: '1',
        title: 'Descuento Fundacional 20%',
        businessName: 'Sharkes Store',
        location: 'Tlatelolco y Cuauhtémoc',
        description: '20% de descuento en la primer compra de equipo oficial deportivo. Válido unicamente el primer mes.',
        image: null, // base64 string
        startDate: '2026-03-01',
        endDate: '2026-03-31',
        isIndefinite: false
    },
    {
        id: '2',
        title: 'Bebidas Gratis',
        businessName: 'Cafetería del Centro',
        location: 'CDMX',
        description: 'Al mostrar tu credencial de Sharkes recibe una bebida gratis en la compra de cualquier alimento.',
        image: null, // base64 string
        startDate: '',
        endDate: '',
        isIndefinite: true
    }
]
