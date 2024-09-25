import { Link, useNavigate } from 'react-router-dom'
export default function Aside () {
  const navigate = useNavigate()
  const logout = () => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:8000/api/logout', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(d => {
          if (d.status) {
            localStorage.removeItem('token')
            navigate('/login')
          } else {
            alert(d.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  return (
    <aside className='mx-2 rounded'>
      <div className='container-fluid my-1 bg-light mx-2 py-3'>
        <div className='heading'>
          <h3 className='heading text-center text-dark p-2'>Dashboard</h3>
        </div>
        <div className='container-fluid'>
          <div className='dash-element'>
            <ul>
              <li className='fs-5 my-2'>
                <Link to={'/register'} className='text-dark'>
                  Registration
                </Link>
              </li>
              <li className='fs-5 my-2'>
                <Link to={`/student/update/0`} className='text-dark'>
                  Update Info
                </Link>
              </li>
              <li className='fs-5 my-2'>
                <Link to={'/student/details'} className='text-dark'>
                  show Details
                </Link>
              </li>
              <li className='fs-5 my-2'>
                <a
                  className='text-danger'
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}
