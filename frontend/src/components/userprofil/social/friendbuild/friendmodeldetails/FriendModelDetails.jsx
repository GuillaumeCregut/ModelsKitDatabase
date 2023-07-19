import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AwaitLoad } from '../../../../awaitload/AwaitLoad';
import Zoom from 'react-medium-image-zoom';
import FriendBuildMessage from '../../../../friendbuildmessage/FriendBuildMessage';
import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';

import './FriendModelDetails.scss';

const FriendModelDetails = () => {
    const [loaded, setLoaded] = useState(false);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(false);
    const { state } = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const textRef = useRef();
    const [reload, setReload]=useState(false);

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
                    setError(true);
                })
        }
        getModelDetails();
    }, [reload]);

    const handleClick = () => {
        const message = textRef.current.value;
        if (message === '') {
            toast.warning('Veuillez saisir votre message');
            return
        }
        const payload={
            message,
            idModel:details.id
        }
        axiosPrivate
            .post(`${import.meta.env.VITE_APP_API_URL}messages/models/${state.friendId}`,payload)
            .then((resp)=>{
                textRef.current.value='';
                setReload(!reload);
            })
            .catch((err)=>{
                toast.error('Une erreur est survenue');
            })
    }

    return (
        <div className='friend-model-details-container'>
            <p className='history-back'><Link to={`../amis/montages-amis/${state.friendId}`}>Retour</Link></p>
            {loaded
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
        </div>)
}

export default FriendModelDetails
