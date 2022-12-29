import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice'
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates'

describe('Pruebas en calendarSlice', () => {
  test('Debe retornar el estado por defecto', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState)
  })

  test('onSetActiveEvent Debe de activar el evento', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    )
    expect(state.activeEvent).toEqual(events[0])
  })

  test('onAddNewEvent debe de agregar el evento', () => {
    const newEvent = {
      id: '3',
      title: 'Cumpleaños Valen',
      start: new Date('2022-11-10 10:00:00'),
      end: new Date('2022-11-10 22:00:00'),
      notes: 'Comprar el mejor regalo',
    }

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    )
    expect(state.events).toEqual([...events, newEvent])
  })

  test('onUpdateEvent debe de actualizar el evento', () => {
    const updatedEvent = {
      id: '1',
      title: 'Cumpleaños Valen',
      start: new Date('2022-11-10 10:00:00'),
      end: new Date('2022-11-10 22:00:00'),
      notes: 'Comprar el mejor regalo he ir a comer',
    }

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    )
    expect(state.events).toContain(updatedEvent)
  })

  test('onDeleteEvent Debe de borrar el evento activo', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    )
    expect(state.activeEvent).toBe(null)
    expect(state.events).not.toContain(events[0])
  })

  test('onLoadEvents Debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events))
    expect(state.isLoadingEvents).toBeFalsy()
    expect(state.events).toEqual(events)

    const newState = calendarSlice.reducer(initialState, onLoadEvents(events))
    expect(state.events.length).toBe(2)
  })

  test('onLogoutCalendar Debe de limpiar el estado', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    )
    expect(state).toEqual(initialState)
  })
})
