import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {setBuilder} from '../../../feature/Builder.slice';
import { ToastContainer, toast } from 'react-toastify';

import './BuilderSelector.scss';

const BuilderSelector = ({id,selectedBuilder, setSelectedBuilder}) => {
    const [builderLoaded, setBuilderLoaded]=useState(false);
    const dispatch=useDispatch();
    const builderData=useSelector((state)=>state.builders.builder);

    useEffect(()=>{
        const getBuilders=async()=>{
            const url = `${import.meta.env.VITE_APP_API_URL}builder`;
            axios
                .get(url)
                .then((resp)=>{
                    dispatch(setBuilder(resp.data));
                    setBuilderLoaded(true);
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
        if(!builderData)
            getBuilders();
        else
            setBuilderLoaded(true);
    },[]);

    return (
        <>
        <ToastContainer />
        <select
            id={id}
            value={selectedBuilder}
            onChange={(e) => setSelectedBuilder(e.target.value)}
            className='builder-selector'
        >
            <option value="0">--</option>
         {builderLoaded
         ?builderData.map((item)=>(
            <option 
                key={item.id}
                value={item.id}>{item.name} ({item.countryName})</option>
         ))
        :null
        }   
        </select>
        </>
    )
}

export default BuilderSelector
