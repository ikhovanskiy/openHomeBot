
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import SignUpPage from './Pages/SignUp/SignUpPage'
import Main from './Pages/Main/Main'
import ProfilePage from './Pages/Profile/ProfilePage'

const AppRoutes = () => {
  return (
    <Routes>
       <Route path ="/" element={<Main />}/>
       <Route path ="/login" element={<Login />}/>
       <Route path ="/signup" element={<SignUpPage />}/>
       <Route path ="/profile" element={<ProfilePage />}/>
    </Routes>
  )
}

export default AppRoutes