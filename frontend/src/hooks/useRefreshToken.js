import useAuth from "./useAuth"
import axios from 'axios';
const useRefreshToken=()=>{
    const {setAuth}=useAuth();

    const refresh=async()=>{
        let newToken='';
        const url= `${import.meta.env.VITE_APP_API_URL}refresh/`;
        await axios
        .get(url,{withCredentials:true})
        .then((resp)=>{
            newToken=resp.data;
            setAuth(prev=>{
                return {...prev,token:newToken}
            })
        })
        .catch((err)=>{
            newToken='';
        })
        return newToken;
    }
    return refresh;
}

export default useRefreshToken;