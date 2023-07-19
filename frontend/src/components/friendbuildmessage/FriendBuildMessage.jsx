import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AvatarUser from '../userprofil/social/avatar/AvatarUser';

import './FriendBuildMessage.scss';

const FriendBuildMessage = ({ message,isOwner=false }) => {
    const author = {
        id: message.userId,
        firstname: message.firstname,
        lastname: message.lastname,
        avatar: message.avatar
    }
    const {auth}=useAuth();
    const axiosPrivate=useAxiosPrivate();
    let deleteMessage=false;
    if(isOwner||(auth.id===author.id))
        deleteMessage=true;
    const dateMessage = new Date(message.dateMessage);
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(dateMessage);
    const displayDate = `${dateMessage.getUTCDate()} ${month} ${dateMessage.getFullYear()}`;

    const formatMessage = () => {
        const formatted = message.message.replace(/(\r\n|\r|\n)/g, '<br>').split('<br>');
        return (
            formatted.map((part, id) => (
                <p key={id}>{part}</p>
            ))
        )
    }

    return (
        <div className='friend-bluid-message-container'>
            <div className="friend-identity-message-container">
                <AvatarUser user={author} />
                <div className="right-identity-message">
                    <p>{author.firstname} {author.lastname}</p>
                    <p>Le : {displayDate}</p>
                </div>
            </div>
            <article>{formatMessage()}</article>
        </div>
    )
}

export default FriendBuildMessage
