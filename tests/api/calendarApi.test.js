import calendarApi from '../../src/api/calendarApi'

describe('Test CalendarApi', () => {
  test('Debe de tener la configuración por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })

  test('Debe de tener el x-token en el header de las peticiones', async () => {
    localStorage.setItem('token', 'ABC-123-XYZ')
    const res = await calendarApi
      .get('/auth')
      .then((res) => res)
      .catch((res) => res)
    expect(res.config.headers['x-token']).toBe('ABC-123-XYZ')
  })
})
