import { logOut } from './API/logOut'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { CiReceipt } from "react-icons/ci";

import styles from './Header.module.css'


export default function Header() {

  const nav = useNavigate()

  const handleClick = () => {
    logOut()
    .then(()=>{
        nav('/login')
    })
  }

  return (
    <header className={styles.header}>
          <div className={styles.iconWrapper}>
              <Link to='/'>
                < CiReceipt className={styles.icon}/>
                <h4>OpenHomeBot</h4>
              </Link>
          </div>
          
          <button onClick={handleClick}>
              Выйти
          </button>
    </header>
  )
}
