import { Link } from 'react-router-dom'
function Navbar () {
  return (
    <nav className='navbar bg-light mx-2 my-2'>
      <div className='heading mx-2 my-1'>
        <h3 className='heading text-center text-dark mx-3'>
          Information System
        </h3>
      </div>
      <div className='nav-items mx-3'>
        <ul className='d-flex'>
          <li className='mx-2'>
            <Link to={'/'}>Home</Link>
          </li>
          <li className='mx-2'>
            <Link to={'/service'}>Services</Link>
          </li>
          <li className='mx-2'>
            <Link to={'/about'}>About</Link>
          </li>
          <li className='mx-2'>
            <Link to={'/contact'}>Contact</Link>
          </li>
          <li className='mx-2'>
            <Link to={'/register'}>Student Enrollment</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
