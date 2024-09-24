import { Link } from 'react-router-dom'
export default function Aside () {
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
                <Link to={'#'} className='text-danger'>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}
