import {useEffect,useState} from 'react';
import logsType from '../../../../feature/logsInfos';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import {  toast } from 'react-toastify';

import './LogsItem.scss';

const LogsItem = ({logType}) => {
    const [log, setLog]=useState('');
    const logTypeId=logsType;
    const axiosPrivate=useAxiosPrivate();
    useEffect(()=>{
        const getLogs=()=>{
            axiosPrivate
                .get(`${import.meta.env.VITE_APP_API_URL}admin/logs/${logType}`)
                .then((resp)=>{
                    setLog(resp.data);
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
        getLogs();
    },[]);
    let title='';
    switch(logType){
        case logTypeId.info:
            title='Informations';
            break;
        case logTypeId.warnings:
            title = "Warnings";
            break;
        case logTypeId.error:
            title='Erreurs';
            break;
        default: 
            title='unknown';
    }
    return (
        <div className='log-item-container'>
            <h2>Logs : {title} </h2>
            <div className="log-item-value">
                <ul>
                {log.split("\n").reverse().map((item,index)=>
                <li key={index}>{item}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default LogsItem
