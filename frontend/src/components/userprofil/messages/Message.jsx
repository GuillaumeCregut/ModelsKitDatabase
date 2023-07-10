import useAuth from '../../../hooks/useAuth';

import './Messages.scss';

const Message = ({message}) => {
    const {auth}=useAuth();
    const idUser=auth?.id;
    console.log(message);
    //Conversion de la date, attention au décalage horaire... A vérifier
    const displayClass=message.exp===idUser?'moi':'lui';
    const formatMessage=()=>{
        const formatted=message.message.replace(/(\r\n|\r|\n)/g, '<br>').split('<br>');
        return(
            formatted.map((part,id)=>(
                <p key={id}>{part}</p>
            ))
        )
    }
    return (
        <div className={`${displayClass} message`}>
            <p>le : {message.date_m}</p>
            <p>{displayClass}</p>
            <p>{formatMessage()}</p>
        </div>
    )
}

export default Message
