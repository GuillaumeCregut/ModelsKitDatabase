import axios from 'axios';

const url = `${import.meta.env.VITE_APP_API_URL}`;

export const axiosPrivate =axios.create({
    baseURL:url,
    headers:{'Content-Type': 'application/json'},
    withCredentials :true
})

export const axiosPrivateMultiPart=axios.create({
    baseURL:url,
    headers:{'Content-Type':'multipart/form-data'},
    withCredentials :true
})

export const axiosPdfBlob=axios.create({
    baseURL:url,
    withCredentials:true,
    responseType:'blob'
})