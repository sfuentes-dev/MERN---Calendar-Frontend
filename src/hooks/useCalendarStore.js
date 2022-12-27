import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import calendarApi from '../api/calendarApi'

import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
} from '../store'
import { convertElementsToDateEvents } from './convertElementsToDateEvents'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state) => state.calendar)
  const { user } = useSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }
      //Creando
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
    } catch (error) {
      console.log(error)
      Swal.fire('Saving Error', error.response.data.msg, 'error')
    }
  }

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      console.log(error)
      Swal.fire('Deleting Error', error.response.data.msg, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertElementsToDateEvents(data.eventos)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log('Error cargando eventos')
    }
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
    startLoadingEvents,
  }
}
