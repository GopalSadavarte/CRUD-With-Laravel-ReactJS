import { Link, useNavigate } from 'react-router-dom'
import bgImg from '../../images/home-bg.png'
import { useState } from 'react'
export default function Signup () {
  const [errors, setErrors] = useState({})
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  function store (e) {
    e.preventDefault()
    let form = document.getElementById('signup')
    let formData = new FormData(form)
    fetch('http://localhost:8000/api/signup', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(d => {
        if (d.status) {
          alert(d.message)
          navigate('/login')
        } else {
          if ('errors' in d) {
            setErrors({
              nameError: d.errors.filter(error => error.includes('name')),
              emailError: d.errors.filter(error => error.includes('email')),
              passwordError: d.errors.filter(error =>
                error.includes('password')
              )
            })
          }
        }
      })
  }

  function checkCoPass (e) {
    if (e.target.value !== password) {
      setErrors({
        ...errors,
        coPassError: "Confirm password does'nt match with password!"
      })
    } else {
      setErrors({
        ...errors,
        coPassError: ''
      })
    }
  }
  return (
    <div className='container my-5 d-flex login-container shadow p-3'>
      <div className='content mx-1 my-2 p-1 w-50'>
        <div className='heading'>
          <h2 className='heading mx-2 my-3 p-2 text-center text-dark'>
            Welcome To Our Site!
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
      <div className='login-page w-50 mx-1 p-3 rounded-lg'>
        <div className='heading text-center text-dark my-2'>
          <h2 className='heading my-3'>Sign Up</h2>
        </div>
        <div className='form-container'>
          <form id='signup' autoComplete='off'>
            <div className='form-element'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='name'
                id='name'
                name='name'
                placeholder='Enter your name'
                className='form-control'
              />
              <small className='text-danger'>{errors.nameError}</small>
            </div>
            <div className='form-element'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
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
                onChange={e => {
                  setPassword(e.target.value)
                }}
                name='password'
                placeholder='Enter your password'
                className='form-control'
              />
              <small className='text-danger'>{errors.passwordError}</small>
            </div>
            <div className='form-element'>
              <label htmlFor='co-password' className='form-label'>
                Confirm Password
              </label>
              <input
                type='password'
                onChange={e => {
                  checkCoPass(e)
                }}
                id='co-password'
                placeholder='Repeat above password'
                className='form-control'
              />
              <small className='text-danger'>{errors.coPassError}</small>
            </div>
            <div className='form-btn my-3'>
              <button
                className='btn w-100 btn-primary'
                onClick={store}
                id='submit'
              >
                Sign Up
              </button>
            </div>
            <hr />
            <div className='sign-up my-2 text-center'>
              <span className='text-center'>
                You have an account? <Link to={'/login'}>login</Link>
              </span>
            </div>
            <hr />
          </form>
        </div>
      </div>
    </div>
  )
}
