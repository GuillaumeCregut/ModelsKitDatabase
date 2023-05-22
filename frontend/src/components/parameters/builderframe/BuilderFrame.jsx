import { useState } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch } from 'react-redux';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';
import BuilderModifier from './BuilderModifier';
import { updateBuilder, deleteBuilder } from '../../../feature/Builder.slice';
import { ToastContainer, toast } from 'react-toastify';

import './BuilderFrame.scss';


const BuilderFrame = ({ builder }) => {
    const [displayModifier, setDisplayModifier] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const url = `${import.meta.env.VITE_APP_API_URL}builder/${builder.id}`;

    const handleDelete = () => {
        axiosPrivate
            .delete(url)
            .then((resp) => {
                dispatch(deleteBuilder(builder.id));
            })
            .catch((err) => {
                toast.error("Vous n'êtes pas autorisé à ajouter un élément.");
            })
    }

    const handleUpdateShow = () => {
        setDisplayModifier(!displayModifier)
    }

    const handleUpdate = (item) => {
        //Update store and BDD
        const addNewBuilder = {
            name: item.name,
            country: item.countryId
        }
        axiosPrivate
        .put(url,addNewBuilder)
        .then((resp) => {
            dispatch(updateBuilder([item,builder.id]));
        })
        .catch((err) => {
            if(err.response.status===422){
                toast.error(`Erreur : ${err.response.data}`)
            }
            else
                toast.error("Vous n'êtes pas autorisé à ajouter un élément.")
        })
        //Close modif zone
        setDisplayModifier(false);
    }
    return (
        <div className='builderElement'>
            <ToastContainer />
            <h3> {builder.name}</h3>
            <p className='builder-country'>{builder.countryName}</p>
            {displayModifier
                ? <BuilderModifier
                    id={builder.id}
                    name={builder.name}
                    country={builder.countryId}
                    action={handleUpdate}
                    hide={setDisplayModifier}
                />
                : null
            }
            <UpDateRemoveBtn
                updateAction={handleUpdateShow}
                deleteAction={handleDelete}
            />
        </div>
    )
}

export default BuilderFrame
