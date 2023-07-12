import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {AwaitLoad} from '../../../awaitload/AwaitLoad';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import FriendModelCard from './friendmodelcard/FriendModelCard';

import './FriendBuildContainer.scss';

const FriendBuildContainer = () => {
    const [models, setModels]=useState([]);
    const [loaded, setLoaded]=useState(false);
    const params=useParams();
    const friendId = params.id;
    const axiosPrivate=useAxiosPrivate();

    useEffect(()=>{
        const getModels=()=>{
            const url= `${import.meta.env.VITE_APP_API_URL}friends/${friendId}/models`;
            axiosPrivate
                .get(url)
                .then((resp)=>{
                    setModels(resp.data);
                    setLoaded(true);
                })
                .catch((err)=>{
                    console.log(err);
                    toast.error('Une erreur est survenue.')
                })
        }
        getModels();
    },[]);

    return (
        <div className='friend-models-page'>
            <h2>Kits terminés</h2>
            <p>Vous trouverez ci dessous les kits terminé par votre ami.</p>
            <div className="friend-models-container">
                {
                    loaded
                        ?(models.length>0
                            ?models.map((model)=>(
                            <FriendModelCard key={model.id} model={model} friendId={friendId} />
                        ))
                        :<p>Il n'y a pas de modèles</p>
                         )
                        :<AwaitLoad />
                }
            </div>
        </div>
    )
}

export default FriendBuildContainer
