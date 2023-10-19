import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import useAutorise from '../../hooks/useAutorise'
import Header from '../../Components/Header/Header'

import styles from './ProfilePage.module.css'

export default function ProfilePage() {

  const profile = useSelector((state: RootState) => state.profile.value)

  useAutorise()

  return (
    <>
        <Header />
        
        <div className={styles.container}>
        <h1>Твои данные</h1>
          <div>
          
            <p><b>Аккаунт создан:</b> {profile.created}</p>
            <p><b>Последний раз был онлаин: </b>{profile.last_auth}</p>
          </div>
          <div>
            <p><b>E-mail: </b>{profile.email}</p>
            <p><b>Login: </b>{profile.login}</p>
          </div>
           <div>
            <p><b>Фамилия: </b>{profile.first_name}</p>
            <p><b>Имя: </b>{profile.second_name}</p>
            <p><b>Отчество: </b>{profile.patronymic}</p>
           </div>
            
            <p><b>Телефон: </b>{!!profile.phone ? profile.phone : 'нет'}</p>
        </div>
    </>
  )
}
