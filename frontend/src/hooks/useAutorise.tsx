import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";		
import { setProfile } from '../store/slices/profileSlice';
								
function useAutorise() {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch()

    fetch('/api/account/profile/')
            .then(res => res.json())
            .then(res=>{
              dispatch(setProfile(res))
              
            })
            .catch(e=> console.log(e))


    useEffect(()=>{
        if (document.cookie === '' || document.cookie === 'user='){
            setTimeout(()=>navigate('/login'),0)
            return}
        if (location.pathname === '/login') {
            setTimeout(()=>navigate('/'),0)
            return
        }
    },[])
} 																							

export default useAutorise
