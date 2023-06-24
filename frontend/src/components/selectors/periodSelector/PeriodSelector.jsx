import { useEffect, useState } from 'react';
import axios from 'axios';
import { setPeriod } from '../../../feature/Period.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './PeriodSelector.scss';

const PeriodSelector = ({selectedPeriod,setSelectedPeriod, id}) => {
    const [periodLoaded, setPeriodLoaded]=useState(false);
    const dispatch=useDispatch();
    const periodData=useSelector((state)=>state.periods.period);

    useEffect(()=>{
        const getPeriods=async()=>{
            const url = `${import.meta.env.VITE_APP_API_URL}period`;
            await axios
                .get(url)
                .then((resp)=>{
                    dispatch(setPeriod(resp.data));
                    setPeriodLoaded(true);
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
        if(!periodData)
            getPeriods();
        else    
            setPeriodLoaded(true);

    },[]);


    return (
        <>
        <ToastContainer />
        <Select
        id={id}
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        className='period-selector'
        >
            <MenuItem value="0">--</MenuItem>
            {periodLoaded
            ?periodData.map((item)=>(
                <MenuItem key={item.id}
                value={item.id}>{item.name}</MenuItem>
            )
            )
            :null}
        </Select>
        </>
    )
}

export default PeriodSelector
