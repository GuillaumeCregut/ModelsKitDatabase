import { useNavigate } from 'react-router-dom';
import {MdPhotoCamera} from "react-icons/md";

import './FriendModelCard.scss';

const FriendModelCard = ({model, friendId}) => {
    const url = `${import.meta.env.VITE_APP_URL}`;
    const navigate=useNavigate();

    const handleShowDetails=()=>{
        navigate('../friend-kit-details',{state:{modelId:model.id, friendId}});
    }

    return (
        <article className="friend-model-card" onClick={handleShowDetails}>
        <h4>{model.modelName} - {model.builderName}</h4>
        {model.boxPicture && <img src={`${url}${model.boxPicture}`} alt={model.modelName} className='friend-model-box' />}
        <p>{model.brandName} - {model.scaleName} </p>
        <p>Référence : {model.reference} </p>
        <div>{model.pictures&&<MdPhotoCamera className='icon-photo-finished'  />} </div>
    </article>
    )
}

export default FriendModelCard
