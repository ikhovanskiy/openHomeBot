import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";		
								
function useAutorise() {
    const navigate = useNavigate();
    const location = useLocation()
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
