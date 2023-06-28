import {useState} from 'react';
import ranks from '../../../feature/ranks';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const UserLine = ({user}) => {
    const idFirstUser=1;
    const [userRank, setUserRank]=useState(user.rank);
    const axiosPrivate=useAxiosPrivate();
    let userRole='';
    switch(user.rank){
        case ranks.user : userRole='utilisateur';
            break;
        case ranks.moderate: userRole='Modérateur';
            break;
        case ranks.admin : userRole='Administrateur';
            break;
        default : userRole='inconnu';
    }
    const handleChange=(e)=>{
        if(window.confirm('Voulez-vous changer le role ')){
            const newRank=parseInt(e.target.value,10);
            axiosPrivate
            .patch(`${import.meta.env.VITE_APP_API_URL}users/admin/${user.id}`,{rank:newRank})
            .then((resp)=>{
                setUserRank(newRank);
                })
            .catch((err)=>{
                toast.error('Une erreur est survenue');
            })
        }
    }
    return (
        <TableRow>   
            
            <TableCell className='row-user'>{user.firstname} </TableCell>
            <TableCell className='row-user'>{user.lastname}</TableCell>
            <TableCell className='row-user'>
                {user.id===idFirstUser
                ?'administrateur'
                :
 <FormControl >
                <InputLabel id="demo-select-small-label">Rang</InputLabel>
                <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userRank}
                label="Rang"
                onChange={handleChange}
                className='select-rank'>
                    {Object.keys(ranks).map((key)=> {
               return <MenuItem key={ranks[key]} value={ranks[key]}>{key}</MenuItem>
            })}
                </Select>
                </FormControl>}
               </TableCell>
        </TableRow>
    )
}

export default UserLine
