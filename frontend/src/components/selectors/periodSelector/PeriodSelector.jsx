import { useEffect, useState } from 'react';
import axios from 'axios';
import { setPeriod } from '../../../feature/Period.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

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
        <select
        id={id}
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        className='period-selector'
        >
            <option value="0">--</option>
            {periodLoaded
            ?periodData.map((item)=>(
                <option key={item.id}
                value={item.id}>{item.name}</option>
            )
            )
            :null}
        </select>
        </>
    )
}

export default PeriodSelector
