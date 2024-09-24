import { Link } from 'react-router-dom'
import bgImg from '../../images/Login-02.jpg'
import googleLogo from '../../images/google.jpg'
import facebookLogo from '../../images/facebook.jpg'
export default function Login () {
  return (
    <div className='container my-5 d-flex login-container shadow p-3'>
      <div className='login-page w-50 mx-1 p-3 rounded-lg'>
        <div className='heading text-center text-dark my-2'>
          <h2 className='heading my-3'>Login</h2>
        </div>
        <div className='form-container'>
          <form id='login'>
            <div className='form-element'>
              <label htmlFor='username' className='form-label'>
                User Name:
              </label>
              <input
                type='text'
                id='username'
                placeholder='Enter your username or email'
                className='form-control'
              />
            </div>
            <div className='form-element'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='Enter your password'
                className='form-control'
              />
            </div>
            <div className='form-btn my-3'>
              <button className='btn w-100 btn-primary' id='submit'>
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
