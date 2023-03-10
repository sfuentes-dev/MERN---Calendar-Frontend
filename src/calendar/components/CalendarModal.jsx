import { addHours, differenceInSeconds } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'

import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import es from 'date-fns/locale/es'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from '../../hooks'
import { getEnvVariables } from '../../helpers'

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

if (getEnvVariables().VITE_MODE !== 'test') {
  Modal.setAppElement('#root')
}

export const CalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { isDateModalOpen, closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const titleClass = useMemo(() => {
    if (formSubmitted) return ''

    return formValues.title.length > 0 ? '' : 'is-invalid'
  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas Incorrectas', 'Revisar las fechas Ingresadas', 'error')
      return
    }

    if (formValues.title.length <= 0) return

    console.log(formValues)
    await startSavingEvent(formValues)
    closeDateModal()
    setFormSubmitted(false)
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-background'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className='form-control'
            onChange={(event) => onDateChanged(event, 'start')}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className='form-control'
            onChange={(event) => onDateChanged(event, 'end')}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            placeholder='T??tulo del evento'
            className={`form-control ${titleClass}`}
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripci??n corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Informaci??n adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-success btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
