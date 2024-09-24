import './App.css'
import './bootstrap.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Service from './components/Service'
import About from './components/About'
import Contact from './components/Contact'
import StudentDetails from './components/StudentDetails'
import StudentUpdate from './components/StudentUpdate'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentRegistration from './components/StudentRegistration'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import ProtectedRoute from './components/middleware/ProtectedRoute'

function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route
            exact
            path='/student-info'
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <StudentRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/about'
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/contact'
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/service'
            element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/student/update/:stdId'
            element={
              <ProtectedRoute>
                <StudentUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/student/details'
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
