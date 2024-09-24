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
function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/student-info' element={<StudentDetails />} />
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<StudentRegistration />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/service' element={<Service />} />
          <Route
            exact
            path='/student/update/:stdId'
            element={<StudentUpdate />}
          />
          <Route exact path='/student/details' element={<StudentDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
