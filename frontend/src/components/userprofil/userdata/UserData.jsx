import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from '../../../hooks/useAuth';
import Login from '../../login/Login';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import UpdateData from './UpdateData';
import AvatarUser from '../social/avatar/AvatarUser';

import './UserData.scss';

const UserData = () => {
    const [user, setUser] = useState(null);
    const [isloaded, setIsLoaded] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [isReplied, setIsReplied] = useState(false);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const idUser = auth?.id;

    useEffect(() => {
        const url = `${import.meta.env.VITE_APP_API_URL}users/${idUser}`;
        if (idUser) {
            axiosPrivate
                .get(url)
                .then((resp) => {
                    if (resp?.data) {
                        console.log(resp.data)
                        setUser(resp.data);
                        setIsLoaded(true)
                    }
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
    }, [idUser, isReplied])

    const updateUser = (newUser) => {
        const url = `${import.meta.env.VITE_APP_API_URL}users/${idUser}`;
        axiosPrivate
            .put(url, newUser)
            .then((res) => {
                setIsReplied(!isReplied)
            })
            .catch((err) => {
                toast.error('Une erreur est survenue');
            })
        setIsModify(false);
    }

    return (
        idUser && isloaded
            ?
            isModify
                ? <UpdateData user={user} cancelAction={setIsModify} updateUser={updateUser} />
                : (<div className='user-data-container'>
                    <h3 className='user-data-title'>Mon profil</h3>
                    <div className="user-data-info">
                        <p>Nom : {user.lastname}</p>
                        <p>Prénom :{user.firstname}</p>
                        <p>Login : {user.login}</p>
                        <p>Email : {user.email}</p>
                        <div className='user-info-avatar-container'>Avatar : <AvatarUser user={user}/> </div>
                    </div>
                    <div className="user-infos-system">
                        <h3>Mes paramètres</h3>
                        <p>Visibilité : {user.isVisible?'oui':'non'}</p>
                        <p>Les commentaires  sont visibles par tout le monde : {user.allow?'oui':'non'}</p>
                    </div>
                    <Button onClick={() => setIsModify(!isModify)} variant='contained' className='user-modif-btn'>Modifier les valeurs</Button>
                </div>)
            : <Login />
    )
}

export default UserData
