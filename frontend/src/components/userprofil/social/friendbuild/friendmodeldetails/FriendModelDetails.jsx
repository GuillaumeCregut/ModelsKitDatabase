import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AwaitLoad } from '../../../../awaitload/AwaitLoad';
import Zoom from 'react-medium-image-zoom';
import FriendBuildMessage from './FriendBuildMessage';
import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';
import useAuth from '../../../../../hooks/useAuth';

import './FriendModelDetails.scss';

const FriendModelDetails = () => {
    const [loaded, setLoaded] = useState(false);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(false);
    const { state } = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const textRef = useRef();
    const {auth}=useAuth();

    const urlDetail = `${import.meta.env.VITE_APP_URL}`;
    console.log(state)
    useEffect(() => {
        const getModelDetails = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}friends/${state.friendId}/models/${state.modelId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setDetails(resp.data);
                    console.log(resp.data)
                    setLoaded(true);
                    setError(false);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                    setLoaded(true);
                    setError(true);
                })
        }
        getModelDetails();
    }, []);

    const handleClick = () => {

    }

    return (
        <div className='friend-model-details-container'>{loaded
            ? (
                !error
                    ? (<div>
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
                        {details.allow
                            ? <div className="message-zone-model">
                                <section className="new-model-message">
                                    <p>Laisser un message :</p>
                                    <TextareaAutosize ref={textRef} className='new-message-text' minRows={3} placeholder='Saisissez votre message' />
                                    <Button variant='contained' className='btn-send-model-message' onClick={handleClick}>Envoyer</Button>
                                </section>
                                messages :
                                <section className="message-model-container">
                                    {details.messages.map((message) => (
                                        <FriendBuildMessage key={message.id} message={message} />
                                    ))}
                                </section>

                            </div>
                            : null}
                    </div>)
                    : <p>Le modèle n'existe pas</p>
            )
            : <AwaitLoad />
        }
            <p><Link to={`../amis/montages-amis/${state.friendId}`}>Retour</Link></p>
        </div>)
}

export default FriendModelDetails
