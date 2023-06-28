
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { deleteStock } from "../../../../feature/stockUser.slice";
import { Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from '@mui/material';

import './KitCard.scss';

const KitCard = ({ kitDetails, refresh = false, setRefresh = null, displayImage = false, inMgmt = false }) => {
    const [openModal, setOpenModal] = useState(false);
    const url = `${import.meta.env.VITE_APP_URL}`;
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpenModal(false);
    }

    const deleteKit = () => {
        const urlStock = `${import.meta.env.VITE_APP_API_URL}users/model/${kitDetails.id}`;
        axiosPrivate
            .delete(urlStock)
            .then(() => {
                dispatch(deleteStock(kitDetails.id));
                setRefresh(!refresh); 
            })
            .catch((err) => {
                toast.error('Une erreur est survenue');
            })
        setOpenModal(false);
    }

    return (
        <div className='kit-card'>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText>
                        Voulez-vous supprimer ce kit ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleClose}>Non</IconButton>
                    <IconButton onClick={deleteKit}>Oui</IconButton>
                </DialogActions>
            </Dialog>
            <h4>{kitDetails.modelName} - {kitDetails.builderName}</h4>
            {displayImage && <img src={`${url}${kitDetails.boxPicture}`} alt={kitDetails.modelName} />}
            <p>{kitDetails.brandName} - {kitDetails.scaleName} </p>
            <p>Référence : {kitDetails.reference} </p>
            <div className="delete-btn-container">
                {inMgmt
                    ? null
                    : <button className='btn' onClick={() => setOpenModal(true)}><FaRegTrashAlt className='icon' /></button>
                }
            </div>
        </div>
    )
}

export default KitCard
