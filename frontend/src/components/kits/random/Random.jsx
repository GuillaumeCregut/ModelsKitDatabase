import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';
import { MdOutlineManageSearch } from "react-icons/md";
import { toast } from 'react-toastify';
import RandomKitInfo from './RandomKitInfo';

import './Random.scss';

const Random = () => {
    const axiosPrivate = useAxiosPrivate();
    const [model, setModel] = useState(null);

    const handleClick = () => {
        const url = `${import.meta.env.VITE_APP_API_URL}model/user/random`;
        axiosPrivate
            .get(url)
            .then((resp)=>{
                setModel(resp.data)
            })
            .catch((err)=>{
                toast.warn("Une erreur est survenue")
            })
    }
    return (
        <div className='random-kit-container'>
            <h2 className="random-title">Selection aléatoire</h2>
            <p className="random-desc">Vous ne savez pas quel kit de votre stock vous souahitez mettre sur l'établi ?<br />
                Laisser le hasard vous proposer un kit</p>
            <p className='random-btn'>
                <Button variant="contained" startIcon={<MdOutlineManageSearch />} onClick={handleClick}>
                    Rechercher
                </Button>
            </p>
            {model && <RandomKitInfo kit={model} />}
        </div>
    )
}

export default Random
