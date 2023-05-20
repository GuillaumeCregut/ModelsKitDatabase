import React from 'react'
import useAuth from '../../hooks/useAuth';
import {HiLockClosed, HiLockOpen} from 'react-icons/hi';
import './Welcome.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
    const {auth,setAuth}=useAuth();
    const {firstname,lastname}=auth;
    const navigate=useNavigate();
    const handleClick=()=>{
        
        if(auth?.token){
            const url = `${import.meta.env.VITE_APP_API_URL}logout/`;
            axios
            .get(url,{withCredentials:true})
            .then((resp)=>{
                if(resp.status===204){
                    setAuth('');
                    navigate('/');
                }
            })
            .catch((err)=>{
                setAuth('');
            })

        }
        else{
            navigate('/login');
        }
    }

    return (
        <div className='welcome' onClick={handleClick}>
            {
                auth.firstname
                ?(<p><span className="welcome-name">{firstname} {lastname}</span> 
                    <HiLockOpen className='welcome-unlock'/> </p>)
                :<HiLockClosed className='welcome-lock'/>

            }
           
        </div>
    )
}

export default Welcome
