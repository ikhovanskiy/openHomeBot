import { useState } from 'react'
import { signUp } from './API/signUp'
import { useNavigate } from 'react-router-dom'

import styles from './SignUpPage.module.css'



export default function SignUpPage() {
    const [data, setData] = useState({  "email": "",
                                        "password": "",
                                        "login": "",
                                        "first_name": "",
                                        "second_name": "",
                                        "patronymic": ""
                                        })
    const [errorMessage, setErrorMessage] = useState('')
    const [btnText, setBtnText] = useState('Зарегистрироваться')

    const nav = useNavigate()

    const handleClick = () => {

        setBtnText('Loading ...')

        signUp(data)
        .then(()=>{
            setBtnText('Ok')
        })
        .then(()=>nav('/'))
        .catch(()=>{
            setBtnText('Зарегистрироваться')
            setErrorMessage('Ошибка')
            setTimeout(()=>{setErrorMessage('')},2000)
        })
    }

  return (
    <div className={styles.container}>
        <h3 className={styles.title}>Регистрация</h3>
        <input type="email" 
            name="Email" 
            placeholder="E-mail" 
            onChange={(e)=>setData({...data, email:e.target.value})}/>

        <input type="password" 
            name="Password" 
            placeholder="Пароль" 
            onChange={(e)=>setData({...data, password:e.target.value})}/>

        <input type="text" 
            name="login" 
            placeholder="Логин" 
            onChange={(e)=>setData({...data, login:e.target.value})} />

        <input type="text" 
            name="first_name" 
            placeholder="Имя" 
            onChange={(e)=>setData({...data, first_name:e.target.value})} 
            defaultValue=''/>

        <input type="text" 
            name="second_name" 
            placeholder="Фамилия" 
            onChange={(e)=>setData({...data, second_name:e.target.value})} 
            defaultValue=''/>

        <input type="text" 
            name="patronymic" 
            placeholder="Отчество" 
            onChange={(e)=>setData({...data, patronymic:e.target.value })} 
            defaultValue=''/>

        <div className={styles.wrapper}>
            
            <button onClick={()=> nav('/login')} className={styles.btnBack}>
                Назад
            </button>

            <button onClick={handleClick}>
                {btnText}
            </button>

            <p>{errorMessage}</p>
        </div>
        
    </div>
  )
}
