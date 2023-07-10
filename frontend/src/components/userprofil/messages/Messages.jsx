import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AwaitLoad } from '../../awaitload/AwaitLoad';


import './Messages.scss';
import Message from './Message';
import AvatarUser from '../social/avatar/AvatarUser';

const Messages = () => {
    const params = useParams();
    
   
    const friendId = params.id;
    const axiosPrivate = useAxiosPrivate();
    const [allInfos, setAllInfos] = useState();
    const [loaded, setLoaded]=useState(false);

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
                    console.log(err);
                })
        }
        getDatas();
    }, [friendId]);

    return (
        loaded
           ?(
            <div className="messageContainer">
                <div className="identity-friend">
                    <AvatarUser user={{id:allInfos.id,avatar:allInfos.avatar,firstname:allInfos.firstname,lastname:allInfos.lastname}} />
                    {allInfos.firstname} {allInfos.lastname}
                </div>
                <div className="all-messages">
                    {allInfos.messages.map((message)=>(
                        <Message key={message.id} message={message}/>
                    ))}
                </div>
            </div>
           )
           : <AwaitLoad />
    )
}

export default Messages
