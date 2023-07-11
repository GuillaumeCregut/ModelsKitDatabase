import useAuth from '../../../hooks/useAuth';
import AvatarUser from '../social/avatar/AvatarUser';

import './Message.scss';

const Message = ({ message, user }) => {
    const { auth } = useAuth();
    const localUser = {
        firstname: auth.firstname,
        lastname: auth.lastname,
        id: auth.id,
        avatar: auth.avatar
    }
    const idUser = auth?.id;
    console.log(message);
    const dateMessage = new Date(message.date_m);
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(dateMessage);
    console.log(month)
    const displayDate = `${dateMessage.getUTCDate()} ${month} ${dateMessage.getFullYear()} à ${dateMessage.getUTCHours()}h${dateMessage.getUTCMinutes()}`;
    const displayClass = message.exp === idUser ? 'moi' : 'lui';
    const formatMessage = () => {
        const formatted = message.message.replace(/(\r\n|\r|\n)/g, '<br>').split('<br>');
        return (
            formatted.map((part, id) => (
                <p key={id}>{part}</p>
            ))
        )
    }
    return (
        <div className={`${displayClass} message`}>
            <div className="message-header">
                <AvatarUser user={message.exp === idUser ? localUser : user} />
                <p className='message-header-text'>le : {displayDate}</p>
            </div>

            <article className='message-text'>{formatMessage()}</article>
        </div>
    )
}

export default Message
