export const events = [
  {
    id: '1',
    title: 'Cumpleaños Valen',
    start: new Date('2022-11-10 10:00:00'),
    end: new Date('2022-11-10 22:00:00'),
    notes: 'Comprar el mejor regalo',
  },
  {
    id: '2',
    title: 'Cumpleaños Sebastian',
    start: new Date('2023-01-16 10:00:00'),
    end: new Date('2022-01-16 22:00:00'),
    notes: 'Comprar Sushi',
  },
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
}
