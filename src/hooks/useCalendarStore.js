import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../../api'
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state) => state.calendar)
  const { user } = useSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      //Creando
      const { data } = await calendarApi.post('/events', calendarEvent)
      console.log({ data })

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
    }
  }

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent())
  }

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelect: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
  }
}
