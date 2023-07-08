import { useState } from 'react';
import AvatarUser from '../../avatar/AvatarUser';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './FriendDemand.scss';
import { Button } from '@mui/material';

const FriendDemand = ({ user1, setReload }) => {
    const user = {
        firstname: 'toto',
        lastname: 'toto',
        avatar: null
    }
    const [choice, setChoice] = useState('0');

    const handleClick = () => {
        const theChoice = parseInt(choice, 10);
        if (theChoice)
            console.log("c'est bon")
        else
            console.log("C'est pas bon")
        setReload((prev) => !prev);
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
