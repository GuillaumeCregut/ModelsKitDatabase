import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import { TextareaAutosize } from '@mui/base';
import Message from './Message';
import AvatarUser from '../social/avatar/AvatarUser';

import './Messages.scss';
import { Button } from '@mui/material';

const Messages = () => {
    const params = useParams();
    const textRef=useRef();

    const friendId = params.id;
    const axiosPrivate = useAxiosPrivate();
    const [allInfos, setAllInfos] = useState();
    const [loaded, setLoaded] = useState(false);
    const [refresh, setRefresh]=useState(false);

    useEffect(() => {
        const getDatas = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}messages/private/${friendId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setAllInfos(resp.data);
                    setLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getDatas();
    }, [friendId, refresh]);

    const handleClick=()=>{
        const url = `${import.meta.env.VITE_APP_API_URL}messages/private/${friendId}`;
        axiosPrivate
            .post(url,{dest:friendId, message:textRef.current.value})
            .then((resp)=>{
                textRef.current.value='';
                setRefresh(!refresh);
            })
            .catch((err)=>{
                toast.error('Une erreur est survenue');
            })
    }

    return (
        loaded
            ? (
                <div className="messageContainer">
                    <div className="header-messenger">
                        <p>
                            Mes communications avec :
                        </p>
                        <div className="identity-friend">
                            <AvatarUser user={{ id: allInfos.id, avatar: allInfos.avatar, firstname: allInfos.firstname, lastname: allInfos.lastname }} />
                            <p>{allInfos.firstname} {allInfos.lastname}</p>
                        </div>
                    </div>
                    <div className="write-private-message">
                        <p>Nouveau message :</p>
                        <TextareaAutosize ref={textRef} className='new-message-text' minRows={3} placeholder='Saisissez votre message'/>
                        <Button onClick={handleClick} variant='contained' className='send-message-button'>Envoyer</Button>
                    </div>
                    <div className="all-messages">
                        {allInfos.messages.length > 0
                            ? allInfos.messages.map((message) => (
                                <Message key={message.id} message={message} user={{ id: allInfos.id, avatar: allInfos.avatar, firstname: allInfos.firstname, lastname: allInfos.lastname }} />
                            ))
                            : <p>Il n'y a pas encore de messages</p>
                        }
                    </div>
                </div>
            )
            : <AwaitLoad />
    )
}

export default Messages
