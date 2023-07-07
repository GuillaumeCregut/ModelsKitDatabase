import { AiFillHeart, AiOutlineStop } from "react-icons/ai";
import { Badge, Tooltip } from '@mui/material';
import { MdOutlineEmail } from "react-icons/md";
import { FcBinoculars } from "react-icons/fc";
import { Link } from 'react-router-dom';
import AvatarUser from '../../avatar/AvatarUser';
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

import './FriendCard.scss';
    
const FriendCard = ({ setReload }) => {
    const user = {
        avatar: null,
        firstname: 'test',
        lastname: 'test lastname',
        id: 1
    };
    const axiosPrivate=useAxiosPrivate();

    const handleClick = () => {
        const apiUrl= `${import.meta.env.VITE_APP_API_URL}friends/unlink/${user.id}`;
        axiosPrivate
            .delete(apiUrl)
            .then((resp)=>{
                setReload((prev)=>!prev);
            })
            .catch((err)=>{

            });
    }
    return (
        <div className='friend-card'>
            <div className="friend-avatar-container">
                <AvatarUser user={user} />
            </div>
            <div className="friend-name-container">
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
            </div>
            <div className="friend-social-container">
                <Tooltip title='Ne plus suivre'>
                    <button className='heart-container' onClick={handleClick}>
                        <AiFillHeart className='friend-icon is-ok' />
                        <AiOutlineStop className='friend-icon stop' />
                    </button>
                </Tooltip>
                <Tooltip title='Voir les montages'>
                    <p>
                        <Link to={`montages-amis/${user.id}`}>
                            <FcBinoculars className='friend-icon' />
                        </Link>
                    </p>
                </Tooltip>
                <Tooltip title='Voir les messages'>
                    <Link to={`messages/${user.id}`}>
                        <Badge badgeContent={4} color='primary'>
                            <MdOutlineEmail className='friend-icon' />
                        </Badge>
                    </Link>
                </Tooltip>
            </div>
        </div>
    )
}

export default FriendCard
