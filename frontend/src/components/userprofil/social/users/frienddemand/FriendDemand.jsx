import { useState } from 'react';
import AvatarUser from '../../avatar/AvatarUser';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import friendStatus from '../../../../../feature/friendState';
import { toast } from 'react-toastify';

import './FriendDemand.scss';

const FriendDemand = ({ user, setReload }) => {
   
    const [choice, setChoice] = useState('0');
    const axiosPrivate=useAxiosPrivate();

    const handleClick = () => {
        const theChoice = parseInt(choice, 10);
        const url = `${import.meta.env.VITE_APP_API_URL}friends/demands`;
        let newStatus=0;
        if (theChoice)
            newStatus=friendStatus.friend;
        else
           newStatus=friendStatus.refused;
        const newState={
            statusFriend:newStatus,
            friendId:user.id
        }
        axiosPrivate
            .put(url,newState)
            .then((resp)=>{
                setReload((prev) => !prev);
            })   
            .catch((err)=>{
                console.log(err);
                toast.error('Une erreur est survenue');
            })
    }

    const theme = createTheme({
        typography: {
            fontSize: 10,
        },
    });

    return (
        <div className='demand-container'>
            <div className="avatar-demand-container">
                <AvatarUser user={user} />
                <p className='name-user-demand'>{user.firstname} {user.lastname}</p>
            </div>
            <ThemeProvider theme={theme}>
                <div className="demand-choice">

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                    >
                        <FormControlLabel value='0' control={<Radio />} label="Refuser" />
                        <FormControlLabel value='1' control={<Radio />} label="Accepter" />
                    </RadioGroup>

                </div>
                <div className="button-demand-container">
                    <Button variant='contained' onClick={handleClick}>Valider</Button>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default FriendDemand
