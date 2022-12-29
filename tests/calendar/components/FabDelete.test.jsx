import { fireEvent, render, screen } from '@testing-library/react'
import { FabDelete } from '../../../src/calendar/components/FabDelete'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore'

jest.mock('../../../src/hooks/useCalendarStore')

describe('Pruebas en <FabDelete />', () => {
  const mockStartDeleteEvent = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('Debe mostrar el componente correctamente', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelect: false,
    })

    render(<FabDelete />)

    const btn = screen.getByLabelText('btn-delete')
    expect(btn.classList).toContain('btn')
    expect(btn.classList).toContain('btn-danger')
    expect(btn.classList).toContain('fab-danger')
    expect(btn.style.display).toBe('none')
  })

  test('Debe mostrar el botón si hay un evento activo', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelect: true,
    })

    render(<FabDelete />)
    const btn = screen.getByLabelText('btn-delete')
    expect(btn.style.display).toBe('')
  })

  test('Debe de llamar starDeletingEvent si hay evento activo', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelect: true,
      startDeleteEvent: mockStartDeleteEvent,
    })

    render(<FabDelete />)
    const btn = screen.getByLabelText('btn-delete')
    fireEvent.click(btn)

    expect(mockStartDeleteEvent).toHaveBeenCalledWith()
  })
})
