import {useState,useEffect} from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import UserLine from './UserLine';
import { ToastContainer, toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import './UserMgmt.scss';

const UserMgmt = () => {
    const [users,setUsers]=useState([]);
    const axiosPrivate=useAxiosPrivate();

    useEffect(()=>{
        const getUsers=()=>{
            axiosPrivate
                .get(`${import.meta.env.VITE_APP_API_URL}users`)
                .then((resp)=>{
                    setUsers(resp.data);
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
        getUsers();
    },[]);

    return (
        <section className='admin-user'>
            <ToastContainer />
           <h1 className='admin-user-title'>Gestion des utilisateurs</h1> 
           <TableContainer >
            <Table  aria-label="simple table" className='table-user'>
                <TableHead>
                    <TableRow>
                        <TableCell className='userArray-head column'> Prénom</TableCell>
                        <TableCell className='userArray-head column'>Nom</TableCell>
                        <TableCell className='userArray-head column'>Rang</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {users.length>0&&
                    users.map((user)=>(
                        <UserLine key={user.id} user={user}/>
                    ))
                }
                </TableBody>
            </Table>
            </TableContainer>
        </section>
    )
}

export default UserMgmt
