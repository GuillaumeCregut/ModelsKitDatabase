import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import jwt_decode from "jwt-decode";

const TestSendRefresh = (props) => {
    const {auth,setAuth}=useAuth();
    const localStorageUser=JSON.parse(localStorage.getItem('ModelsKitUser'));
    useEffect(()=>{
        if(!auth?.firstname){
            handleClick();
        }
    },[]);

    const handleClick=()=>{
        const url = `${import.meta.env.VITE_APP_API_URL}auth/reload`;
        axios
            .post(url,localStorageUser,{withCredentials:true})
            .then((resp)=>{
                const token = resp.data?.accessToken;
                if(token){
                    var decoded = jwt_decode(token);
                    const user = {
                        firstname: decoded.firstname,
                        lastname: decoded.lastname,
                        rank: decoded.rank,
                        token: token
                    }
                    setAuth(user);
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return (
        <div>
            test
            <button onClick={handleClick}>Clic moi</button>
        </div>
    )
}

export default TestSendRefresh
