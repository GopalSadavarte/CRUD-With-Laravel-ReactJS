import { useState } from 'react'
import Aside from './Aside'

export default function StudentRegistration () {
  const token = localStorage.getItem('token')
  const [emailError, setEmailError] = useState()
  const [phoneError, setPhoneError] = useState()
  const [dateError, setDateError] = useState()
  const [nameError, setNameError] = useState()
  const [addrError, setAddrError] = useState()

  function submitForm (e) {
    e.preventDefault()
    let form = document.getElementById('myForm')
    let formData = new FormData(form)

    fetch('http://localhost:8000/api/register', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
      .then(r => r.json())
      .then(d => {
        if ('errors' in d) {
          d.errors.forEach(error => {
            if (error.includes('email')) setEmailError(error)
            if (error.includes('phone')) setPhoneError(error)
            if (error.includes('name')) setNameError(error)
            if (error.includes('Age')) setDateError(error)
            if (error.includes('addr')) setAddrError(error)
          })
        } else {
          alert(d.message)

          form.reset()
          setAddrError('')
          setDateError('')
          setEmailError('')
          setNameError('')
          setPhoneError('')
        }
      })
  }

  function resetForm (e) {
    e.preventDefault()
    document.getElementById('myForm').reset()
    setAddrError('')
    setDateError('')
    setEmailError('')
    setNameError('')
    setPhoneError('')
  }
  return (
    <div className='d-flex'>
      <Aside />
      <div className='container my-1 mx-2 bg-light p-4 rounded'>
        {/* <Alert style={success} /> */}
        <div className='heading'>
          <h3 className='heading text-dark text-center'>
            Student Registration
          </h3>
        </div>
        <div className='container-fluid'>
          <form id='myForm'>
            <div className='form-element'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='form-control'
                placeholder='Enter your name..'
              />
              <small className='text-danger my-2'>{nameError}</small>
            </div>
            <div className='form-element'>
              <label htmlFor='addr' className='form-label'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='addr'
                name='addr'
                placeholder='Enter your address...'
              />
              <small className='text-danger my-2'>{addrError}</small>
            </div>
            <div className='form-element'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                name='email'
                id='email'
                placeholder='Enter your email address...'
              />
              <small className='text-danger my-2'>{emailError}</small>
            </div>
            <div className='form-element'>
              <label htmlFor='birthDate' className='form-label'>
                Birth Date
              </label>
              <input
                type='date'
                name='birthDate'
                className='form-control'
                id='birthDate'
              />
              <small className='text-danger my-2'>{dateError}</small>
            </div>
            <div className='form-element'>
              <label htmlFor='phone' className='form-label'>
                Phone No.
              </label>
              <input
                type='number'
                name='phone'
                className='form-control'
                id='phone'
                placeholder='Enter phone no..'
              />
              <small className='text-danger my-2'>{phoneError}</small>
            </div>
            <div className='form-btn my-2 '>
              <button className='btn btn-primary' onClick={submitForm}>
                Submit
              </button>
              <button className='btn btn-warning mx-2' onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
