import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AwaitLoad } from '../../../../awaitload/AwaitLoad';
import Zoom from 'react-medium-image-zoom';

import './FriendModelDetails.scss';

const FriendModelDetails = () => {
    const [loaded, setLoaded] = useState(false);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(false);
    const { state } = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const urlDetail = `${import.meta.env.VITE_APP_URL}`;

    useEffect(() => {
        const getModelDetails = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}friends/${state.friendId}/models/${state.modelId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setDetails(resp.data);
                    setLoaded(true);
                    setError(false);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                    setLoaded(true);
                    if (err.response.status === 404)
                        setError(true);
                })
        }
        getModelDetails();
    }, []);
    
    return (
        loaded
            ? (
                !error
                    ? (<div className='friend-model-details-container'>
                        <h2 className='title-friend-kit-detail'>Détails du montage</h2>
                        <div className="details-friend-kit">
                            <img src={`${urlDetail}${details.boxPicture}`} alt={details.modelName} className='img-box-detail' />
                            <p>{details.builderName} {details.modelName}</p>
                            <p>{details.brandName} {details.reference} {details.scaleName}</p>
                        </div>
                        <p className='title-friend-pictures'>Photos du montage</p>
                        <div >
                            <ul className="picture-model-container">
                                {details.fileArray.map((file) => (
                                    <li key={file}>
                                        <Zoom>
                                            <img src={`${urlDetail}${details.pictures}/${file}`} className='img-built-model' />
                                        </Zoom>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>)
                    : <p>Le modèle n'existe pas</p>
            )
            : <AwaitLoad />
    )
}

export default FriendModelDetails
