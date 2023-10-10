
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import SignUpPage from './Pages/SignUp/SignUpPage'
import Main from './Pages/Main/Main'

const AppRoutes = () => {
  return (
    <Routes>
       <Route path ="/" element={<Main />}/>
       <Route path ="/login" element={<Login />}/>
       <Route path ="/signup" element={<SignUpPage />}/>
    </Routes>
  )
}

export default AppRoutes