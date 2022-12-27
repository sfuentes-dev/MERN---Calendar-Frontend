import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuthStore, useForm } from '../../hooks'
import './LoginPage.css'

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}
const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
}

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore()

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields)

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields)

  const loginSubmit = (e) => {
    e.preventDefault()
    startLogin({ email: loginEmail, password: loginPassword })
  }

  const registerSubmit = (e) => {
    e.preventDefault()

    if (registerPassword !== registerConfirmPassword) {
      Swal.fire('Register Error', 'Passwords are not the same', 'error')
      return
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    })
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Authentication Error', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Login</h3>
          <form onSubmit={loginSubmit}>
            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                autoComplete='off'
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Register</h3>
          <form onSubmit={registerSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Name'
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                autoComplete='off'
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Confirm your Password'
                autoComplete='off'
                name='registerConfirmPassword'
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='d-grid gap-2'>
              <input
                type='submit'
                className='btnSubmit'
                value='Crete Account'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
