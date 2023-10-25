import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setProfile } from '../store/slices/profileSlice';

function useAutorise() {
    const navigate = useNavigate();

    const dispatch = useDispatch()            
    useEffect(() => {                
        const cookies = document.cookie.split(' ');
        const user = cookies.find(el => el.includes('user='));            
        const user_value = user?.split('=')[1];        
        if (user_value && user_value != ';') {            
            fetch('/api/account/profile/')
                .then(res => res.json())
                .then(res => {                    
                    dispatch(setProfile(res));
                })
                .catch(e => {
                    setTimeout(() => navigate('/login/'), 0)
                    console.log(e)
                });
        }else{
            setTimeout(()=>navigate('/login/'),0);
        }        
    }, [])
}

export default useAutorise
