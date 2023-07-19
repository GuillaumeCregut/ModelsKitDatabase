import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import useAxiosPrivateMulti from '../../../hooks/useAxiosMulti';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import './UpdateAvatar.scss';

const UpdateAvatar = ({ user }) => {
    const [file, setFile] = useState(null);
    const [urlTemp,setUrlTemp]=useState(`${import.meta.env.VITE_APP_URL}assets/uploads/users/${user.id}/${user.avatar}`);
    const axiosPrivateMulti=useAxiosPrivateMulti();

    useEffect(() => {
        if (file) {
            setUrlTemp( URL.createObjectURL(file));
        }
        else {
            if (user.avatar) {
                setUrlTemp( `${import.meta.env.VITE_APP_URL}assets/uploads/users/${user.id}/${user.avatar}`);
            }

            else
                setUrlTemp('');
        }
    }, [file]);

    function stringToColor(string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    function stringAvatar() {
        const name = `${user.firstname} ${user.lastname}`;
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    const changeAvatar = () => {
        if(!file)
            return
        const formData=new FormData();
        formData.append('avatar',file);
        const url = `${import.meta.env.VITE_APP_API_URL}users/avatar/${user.id}`;
        axiosPrivateMulti
            .put(url,formData)
            .then((resp)=>{

            })
            .catch((err)=>{
                toast.error('Une erreur est survenue');
            })

    }
    return (
        <div className='avatar-update-container'>
            <div className="avatar-file-container">
                {urlTemp === ''
                    ? (<Avatar {...stringAvatar()}  className='avatar-update-display'/>)
                    : (<Avatar alt={`${user.firstname} ${user.lastname}`} src={urlTemp}  className='avatar-update-display' />)
                }
                
                <input
                    type='file'
                    title=" "
                    accept="image/png, image/jpeg"
                    className='file-upload-avatar'
                    onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <Button variant='contained' onClick={changeAvatar}>Modifier</Button>
        </div>
    )
}

export default UpdateAvatar
