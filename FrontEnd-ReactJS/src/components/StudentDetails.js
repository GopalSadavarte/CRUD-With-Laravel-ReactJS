import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Aside from './Aside'
export default function StudentDetails () {
  const [studentInfo, setStudentInfo] = useState([])
  function getAllStudent () {
    fetch('http://localhost:8000/api/student-info')
      .then(res => res.json())
      .then(d => {
        setStudentInfo(d.data)
      })
  }
  useEffect(() => {
    getAllStudent()
  }, [])

  function removeStudent (id) {
    fetch(`http://localhost:8000/api/student/delete/${id}`)
      .then(res => res.json())
      .then(d => {
        if (d.status) {
          getAllStudent()
        } else {
          alert(d.message)
        }
      })
  }
  return (
    <div className='d-flex'>
      <Aside />
      <div className='container mx-2 bg-light'>
        <h3 className='heading text-center text-dark my-2'>Student Details</h3>
        <div className='container-fluid'>
          <div className='student-info'>
            <table className='table table-striped table-bordered'>
              <tr className='table-row'>
                <th>ID</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact No.</th>
                <th>Birth Date</th>
                <th colSpan={2}>operations</th>
              </tr>
              {studentInfo.map(element => {
                return (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.student_name}</td>
                    <td>{element.email}</td>
                    <td>{element.address}</td>
                    <td>{element.phone_number}</td>
                    <td>{element.birth_date}</td>
                    <td>
                      <button className='btn'>
                        <Link
                          className='btn btn-primary'
                          to={`/student/update/${element.id}`}
                        >
                          Update
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button className='btn'>
                        <button
                          className='btn btn-danger'
                          onClick={() => {
                            removeStudent(element.id)
                          }}
                        >
                          Delete
                        </button>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
