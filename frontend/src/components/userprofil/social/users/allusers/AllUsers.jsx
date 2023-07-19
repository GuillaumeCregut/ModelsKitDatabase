import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AwaitLoad } from '../../../../awaitload/AwaitLoad';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import AllUserRow from './AllUserRow';

import './AllUsers.scss';

const AllUsers = ({reload}) => {
    const [listUsers, setListUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getUsers = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}friends/visible`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setListUsers(resp.data);
                    setLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue')
                })
        }
        getUsers();
    }, [reload]);



    return (
        <div className="all-users-table-container">
            <h2 className='all-users-title'>Listes des utilisteurs inscrits</h2>
        {loaded
            ? (<TableContainer className='table-user-container'>
                <Table size="small">
                    <TableBody>
                        {listUsers.map((user) => (
                            <AllUserRow user={user} key={user.id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>)
            : (<AwaitLoad />)}
        </div>
    )
}

export default AllUsers
