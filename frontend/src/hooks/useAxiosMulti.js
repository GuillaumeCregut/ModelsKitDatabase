import { axiosPrivateMultiPart } from "../feature/axios";
import {useEffect} from 'react';
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivateMulti=()=>{
    const refresh=useRefreshToken ();
    const {auth}=useAuth();

    useEffect(()=>{
        const requestIntercept=axiosPrivateMultiPart.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization']=`Bearer ${auth?.token?.accessToken}`;
                }
                return config;
            },(error)=>Promise.reject(error)
        )
        const responseIntercept=axiosPrivateMultiPart.interceptors.response.use(
            response=>response,
            async (error)=>{
                const prevRequest=error?.config;
                if(error?.response?.status===403 && !prevRequest?.sent){
                    prevRequest.sent=true;
                    const newAccessToken=await refresh();
                    prevRequest.headers['Authorization']=`Bearer ${newAccessToken}`;
                    return axiosPrivateMultiPart(prevRequest);
                }
                return Promise.reject(error)
            }
        );

        return ()=>{
            axiosPrivateMultiPart.interceptors.request.eject(requestIntercept);
            axiosPrivateMultiPart.interceptors.response.eject(responseIntercept);
        }

    },[auth, refresh])

    return axiosPrivateMultiPart;
}
export default useAxiosPrivateMulti;