import React from 'react'
import AvatarUser from '../../avatar/AvatarUser'

const FriendBuildMessage = ({message}) => {
    const author={
        id:message.userId,
        firstname: message.firstname,
        lastname:message.lastname,
        avatar:message.avatar
    }
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
        <div>
            <AvatarUser user={author} />
            <p>{author.firstname} {author.lastname}</p>
            <p>{displayDate}</p>
            <article>{formatMessage()}</article>
        </div>
    )
}

export default FriendBuildMessage
