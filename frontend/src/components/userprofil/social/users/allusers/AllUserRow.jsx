import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import { AiFillHeart } from "react-icons/ai";
import friendStatus from '../../../../../feature/friendState';
import TableCell from '@mui/material/TableCell';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import AvatarUser from '../../avatar/AvatarUser';

const AllUserRow = ({user}) => {
    const [userState,setUserState]=useState(user.is_ok);
    const axiosPrivate=useAxiosPrivate();

    const setUserStatus=()=>{
        let className='';
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
        console.log('coucou')
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
