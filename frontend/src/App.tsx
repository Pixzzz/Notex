import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignUp from './Pages/SignUp/SignUp'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path='/' element={<SignUp/>}/>
          <Route path='Login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
