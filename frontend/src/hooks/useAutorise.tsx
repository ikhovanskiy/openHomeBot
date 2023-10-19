import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";		
import { setProfile } from '../store/slices/profileSlice';
								
function useAutorise() {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch()

  


    useEffect(()=>{
        if (document.cookie.split(' ').find(el=> el==='user=')){
            setTimeout(()=>navigate('/login'),0)
            return} else{
                fetch('/api/account/profile/')
                .then(res => res.json())
                .then(res=>{
                  dispatch(setProfile(res))                  
                })
                .catch(e=> {
                    setTimeout(()=>navigate('/login'),0)
                    console.log(e)})
            }
        if (location.pathname === '/login') {
            setTimeout(()=>navigate('/'),0)
            return
        }
    },[])
} 																							

export default useAutorise
