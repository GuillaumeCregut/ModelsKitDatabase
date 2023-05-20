import { axiosPdfBlob } from "../feature/axios";
import {useEffect} from 'react';
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiospdfBlob=()=>{
    const refresh=useRefreshToken ();
    const {auth}=useAuth();

    useEffect(()=>{
        const requestIntercept=axiosPdfBlob.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization']=`Bearer ${auth?.token?.accessToken}`;
                }
                return config;
            },(error)=>Promise.reject(error)
        )
        const responseIntercept=axiosPdfBlob.interceptors.response.use(
            response=>response,
            async (error)=>{
                const prevRequest=error?.config;
                if(error?.response?.status===403 && !prevRequest?.sent){
                    prevRequest.sent=true;
                    const newAccessToken=await refresh();
                    prevRequest.headers['Authorization']=`Bearer ${newAccessToken}`;
                    return axiosPdfBlob(prevRequest);
                }
                return Promise.reject(error)
            }
        );

        return ()=>{
            axiosPdfBlob.interceptors.request.eject(requestIntercept);
            axiosPdfBlob.interceptors.response.eject(responseIntercept);
        }

    },[auth, refresh])

    return axiosPdfBlob;
}
export default useAxiospdfBlob;