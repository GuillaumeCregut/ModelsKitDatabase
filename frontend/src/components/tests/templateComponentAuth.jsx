import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState,useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";

const templateComponentAuth = (props) => {
    const [X,setX]=useState([]);
    const refresh=useRefreshToken();
    const axiosPrivate=useAxiosPrivate();
    let isMounted=true;

    const getX = async(controller)=>{
        
        const url = `${import.meta.env.VITE_APP_API_URL}x/`;
        axiosPrivate.get(url,{signal:controller.signal})
        .then((res)=>{
            console.log(res.data)
            isMounted&&setX(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        
        const controller=new AbortController();
        getX(controller);
        return ()=>{
            isMounted=false;
            controller.abort();
        }
    },[])


    return (
        <div>
            
        </div>
    )
}

export default templateComponentAuth
