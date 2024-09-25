import { Link, useNavigate } from 'react-router-dom'
import bgImg from '../../images/Login-02.jpg'
import googleLogo from '../../images/google.jpg'
import facebookLogo from '../../images/facebook.jpg'
import { useState } from 'react'

export default function Login () {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  function store (e) {
    e.preventDefault()
    let form = document.getElementById('login')
    let formData = new FormData(form)
    fetch('http://localhost:8000/api/login', {
      method: 'post',
      headers: {},
      body: formData
    })
      .then(res => res.json())
      .then(d => {
        if (d.status) {
          localStorage.setItem('token', d.token)
          navigate('/')
        } else {
          if ('errors' in d) {
            setErrors({
              emailError: d.errors.filter(error => error.includes('email')),
              passwordError: d.errors.filter(error =>
                error.includes('password')
              )
            })
          } else {
            alert(d.message)
          }
        }
      })
  }
  return (
    <div className='container my-5 d-flex login-container shadow p-3'>
      <div className='login-page w-50 mx-1 p-3 rounded-lg'>
        <div className='heading text-center text-dark my-2'>
          <h2 className='heading my-3'>Login</h2>
        </div>
        <div className='form-container'>
          <form id='login' autoComplete='off'>
            <div className='form-element'>
              <label htmlFor='username' className='form-label'>
                User Name:
              </label>
              <input
                type='email'
                id='username'
                name='email'
                placeholder='Enter your username or email'
                className='form-control'
              />
              <small className='text-danger'>{errors.emailError}</small>
            </div>
            <div className='form-element'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                className='form-control'
              />
              <small className='text-danger'>{errors.passwordError}</small>
            </div>
            <div className='form-btn my-3'>
              <button
                className='btn w-100 btn-primary'
                id='submit'
                onClick={store}
              >
                Login
              </button>
            </div>
            <hr />
            <div className='sign-up my-2 text-center'>
              <span className='text-center'>
                You don't have account? <Link to={'/signup'}>Sign Up</Link>
              </span>
              <hr />
              <div className='authorization'>
                <div className='d-flex'>
                  <img
                    src={googleLogo}
                    height={'45px'}
                    width={'45px'}
                    className='img img-fluid mx-2'
                  />
                  <p className='my-auto mx-2'>
                    Sign in with Google
                    <a href='#' className='mx-4'>
                      click here
                    </a>
                  </p>
                </div>
                <div className='d-flex'>
                  <img
                    src={facebookLogo}
                    height={'45px'}
                    width={'45px'}
                    className='img img-fluid mx-2'
                  />
                  <p className='my-auto mx-2'>
                    Sign in with Facebook
                    <a href='#' className='mx-2'>
                      click here
                    </a>
                  </p>
                </div>
              </div>
              <hr />
            </div>
          </form>
        </div>
      </div>
      <div className='content mx-1 p-1 w-50'>
        <div className='heading'>
          <h2 className='heading mx-2 p-1 text-center text-dark'>
            Let's start With You!
          </h2>
        </div>
        <div className='site-info'>
          <img
            src={bgImg}
            className='img img-fluid'
            height={'500px'}
            width={'500px'}
          />
        </div>
      </div>
    </div>
  )
}
