import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState } from '../../fixtures/authStates'
import { testUserCredentials } from '../../fixtures/testUser'

describe('Pruebas on AuthSlice', () => {
  test('Debe retornar el estado inicial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('Debe realizar el login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    })
  })

  test('Debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    })
  })

  test('Debe de realizar el logout con credenciales', () => {
    const errorMessage = 'Credenciales no Validas'

    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage,
    })
  })

  test('Debe de realizar la limpieza de mensaje de error', () => {
    const errorMessage = 'Credenciales no Validas'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
    const newState = authSlice.reducer(state, clearErrorMessage)

    expect(newState.errorMessage).toBe(undefined)
  })
})
