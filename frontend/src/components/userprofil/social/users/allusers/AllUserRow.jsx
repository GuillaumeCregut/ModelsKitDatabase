import { useEffect, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import { AiFillHeart } from "react-icons/ai";
import friendStatus from '../../../../../feature/friendState';
import TableCell from '@mui/material/TableCell';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import AvatarUser from '../../avatar/AvatarUser';
import { toast } from 'react-toastify';

const AllUserRow = ({user}) => {
    const [userState,setUserState]=useState(user.is_ok);
    const axiosPrivate=useAxiosPrivate();
    const url = `${import.meta.env.VITE_APP_API_URL}friends/demands`;

    useEffect(()=>{
        setUserState(user.is_ok);
    },[user.is_ok])

    const setUserStatus=()=>{
        let className='';
        console.log(user.firstname,userState, user.is_ok);
        switch (userState){
            case friendStatus.unknonwn: className='action-user action-user-unknown';
                    break;
            case friendStatus.waiting: className='action-user action-user-waiting';
                break;
            case friendStatus.friend: className='action-user action-user-friend';
                break;
            case friendStatus.refused: className='action-user action-user-refused';
                break;
            default: className='action-user';
        }
        return className;
    }

    const handleClickLike=()=>{
        if(userState!==friendStatus.unknonwn )
            return
        axiosPrivate
            .post(url,{friendId:user.id})
            .then((resp)=>{
                setUserState(friendStatus.waiting);
            })
            .catch((err)=>{
                const error=err?.response?.status ||0;
                switch(error){
                    case 404 : toast.warning("Le correspondant n'existe pas.");
                        break;
                    case 409: toast.warning("La demande a déjà été envoyée.");
                        break;
                    case 422 : toast.error('Une erreur est survenue');
                        break;
                    default : toast.error('Une erreur est survenue');
                }
            })
    }

    return (
        <TableRow key={user.id}>
        <TableCell>
            <AvatarUser user={user} />
        </TableCell>
        <TableCell>{user.firstname} {user.lastname}</TableCell>
        <TableCell>
            <AiFillHeart className={setUserStatus()} onClick={handleClickLike} />
        </TableCell>
    </TableRow>
    )
}

export default AllUserRow
