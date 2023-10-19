import { logOut } from './API/logOut'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { CiReceipt } from "react-icons/ci";

import styles from './Header.module.css'
import { setProfile } from '../../store/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';


export default function Header() {

  const profile = useSelector((state: RootState) => state.profile.value)

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
          <div>
            <button>
                <Link to='/profile'>
                  Мой профиль 
                </Link>
            </button>

            
            <button onClick={handleClick}>
                <Link>
                  Выйти
                </Link>
                
            </button>
          </div>
          
    </header>
  )
}
