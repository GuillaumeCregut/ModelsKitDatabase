
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { deleteStock } from "../../../../feature/stockUser.slice";

import './KitCard.scss';

const KitCard = ({ kitDetails, refresh=false, setRefresh=null, displayImage = false, inMgmt = false }) => {
    const url = `${import.meta.env.VITE_APP_URL}`;
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const deleteKit = () => {
        if (window.confirm('Voulez-vous supprimer ce kit ?')) {
            const urlStock = `${import.meta.env.VITE_APP_API_URL}users/model/${kitDetails.id}`;
            axiosPrivate
                .delete(urlStock)
                .then(() => {
                    dispatch(deleteStock(kitDetails.id));
                    setRefresh(!refresh);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Une erreur est survenue');
                })

        }
    }

    return (
        <div className='kit-card'>
            <h4>{kitDetails.modelName} - {kitDetails.builderName}</h4>
            {displayImage && <img src={`${url}${kitDetails.boxPicture}`} alt={kitDetails.modelName} />}
            <p>{kitDetails.brandName} - {kitDetails.scaleName} </p>
            <p>Référence : {kitDetails.reference} </p>
            <div className="delete-btn-container">
                {inMgmt
                    ? null
                    : <button className='btn' onClick={deleteKit}><FaRegTrashAlt className='icon' /></button>
                }
            </div>
        </div>
    )
}

export default KitCard
