import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Aside from './Aside'
export default function StudentDetails () {
  const { stdId } = useParams()
  const token = localStorage.getItem('token')
  const [studentInfo, setStudentInfo] = useState({})
  const [errors, setErrors] = useState([])
  useEffect(() => {
    fetch(`http://localhost:8000/api/student/edit/${stdId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(d => {
        if (d.status) {
          setStudentInfo(d.data)
        }
      })
  }, [stdId])

  function updateStudent (e) {
    e.preventDefault()
    let formData = new FormData()
    Object.keys(studentInfo).forEach(key => {
      formData.append(key, studentInfo[key])
    })

    fetch(`http://localhost:8000/api/student/update/${stdId}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(d => {
        if (d.status) {
          alert(d.message)
          setErrors([])
        } else {
          setErrors(d.errors)
        }
      })
  }

  return (
    <div className='d-flex'>
      <Aside />
      <div className='container my-1 mx-2 bg-light p-4 rounded'>
        {/* <Alert style={success} /> */}
        <div className='heading'>
          <h3 className='heading text-dark text-center'>
            Update Student Information
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
                onChange={e => {
                  setStudentInfo({
                    ...studentInfo,
                    student_name: e.target.value
                  })
                }}
                value={studentInfo.student_name}
                className='form-control'
                placeholder='Enter your name..'
              />
              <small className='text-danger my-2'>
                {errors.map(error => {
                  if (error.includes('student name')) {
                    return error
                  }
                })}
              </small>
            </div>
            <div className='form-element'>
              <label htmlFor='addr' className='form-label'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='addr'
                onChange={e => {
                  setStudentInfo({
                    ...studentInfo,
                    address: e.target.value
                  })
                }}
                value={studentInfo.address}
                name='addr'
                placeholder='Enter your address...'
              />
              <small className='text-danger my-2'>
                {errors.map(error => {
                  if (error.split(' ')[1] === 'address') {
                    return error
                  }
                })}
              </small>
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
                onChange={e => {
                  setStudentInfo({
                    ...studentInfo,
                    email: e.target.value
                  })
                }}
                value={studentInfo.email}
                placeholder='Enter your email address...'
              />
              <small className='text-danger my-2'>
                {errors.map(error => {
                  if (error.includes('email')) {
                    return error
                  }
                })}
              </small>
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
                onChange={e => {
                  setStudentInfo({
                    ...studentInfo,
                    birth_date: e.target.value
                  })
                }}
                value={studentInfo.birth_date}
              />
              <small className='text-danger my-2'>
                {errors.map(error => {
                  if (error.includes('Age')) {
                    return error
                  }
                })}
              </small>
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
                onChange={e => {
                  setStudentInfo({
                    ...studentInfo,
                    phone_number: e.target.value
                  })
                }}
                value={studentInfo.phone_number}
                placeholder='Enter phone no..'
              />
              <small className='text-danger my-2'>
                {errors.map(error => {
                  if (error.includes('phone number')) {
                    return error
                  }
                })}
              </small>
            </div>
            <div className='form-btn my-2 '>
              <button
                className='btn btn-primary'
                disabled={Object.keys(studentInfo).length === 0}
                onClick={updateStudent}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
