import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './ProviderSelector.scss';

const ProviderSelector = ({id, provider, setProvider}) => {
    const [providers,setProviders]=useState([]);
    const axiosPrivate=useAxiosPrivate();
    const {auth}=useAuth();
    let idUser=auth?.id;
    if(!idUser){
        idUser=0;
    }
    useEffect(()=>{
        const getProviders=()=>{
            const url = `${import.meta.env.VITE_APP_API_URL}suppliers/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp)=>{
                   setProviders(resp.data)
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
        getProviders();
    },[]);

    return (
        <Select
        id={id}
        className='provider-selector'
        value={provider}
        onChange={(e)=>setProvider(e.target.value)}>
            <MenuItem value="0">--</MenuItem>
             {providers.length>0
            ?providers.map((providerItem)=>(
                <MenuItem value={providerItem.id} key={providerItem.id}>{providerItem.name}</MenuItem>
            ))
            :null
            }
        </Select>
    )
}

export default ProviderSelector
