import {useState} from 'react'
import { logIn } from './API/logIn'
import { useNavigate } from 'react-router-dom'
import useAutorise from '../../hooks/useAutorise'
import { Link } from 'react-router-dom'


import styles from './Login.module.css'

export default function Login() {

  const [data, setData] = useState({email: '', password: 'tester123'})
  const [btnText, setBtnText] = useState('Войти')
  const [errorMessage, setErrorMessage] = useState('')

  const nav = useNavigate()

  useAutorise()

  const handleClick = () => {
    
    setBtnText('Загрузка...')

    logIn(data)
    .then(()=>{
      setBtnText('Ok')
      nav('/')
    })
    .catch(()=>{
      setBtnText('Войти')
      setErrorMessage('Ошибка')
      setTimeout(()=>{setErrorMessage('')},2000)
    })
  }


  return (
      <div className={styles.container}>
          <input type="email" 
                  name="Email" 
                  placeholder="Email" 
                  onChange={(e)=>setData({...data, email: e.target.value})} 
                  defaultValue=''/>
          <input type="password" 
                  name="Password" 
                  placeholder="Password" 
                  onChange={(e)=>setData({...data, password: e.target.value})} 
                  defaultValue='tester123'/>
          <Link to='/signup'>Зарегистрироваться</Link>
          <div className={styles.wrapper}>
            <button onClick={handleClick}>
                {btnText}
            </button>
            <p>{errorMessage}</p>
          </div>
      </div>
  )
}
