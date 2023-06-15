import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import {  toast } from 'react-toastify';

const SupplierLine = ({ supplier, suppliers, setSuppliers }) => {
    const [update, setUpdate] = useState(false);
    const [newName, setNewName] = useState(supplier.name);
    const axiosPrivate = useAxiosPrivate();

    const handleEdit = () => {
        setUpdate(prev => !prev)
    }

    /* */
    const handleDelete = () => {
        const id = supplier.id;
        if (window.confirm("Voulez-vous supprimer ce fournisseur ?")) {
            const url = `${import.meta.env.VITE_APP_API_URL}supplier/${supplier.id}`;
            axiosPrivate
                .delete(url)
                .then((resp)=>{
                    setSuppliers(suppliers.filter((item)=>item.id!==id))
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
    }

    const handleUpdate = () => {
        const id = supplier.id;
        if (window.confirm("Voulez vous modifier ce fournisseur ?")) {
            const newSupplier = {
                name: newName,
                owner: supplier.owner
            }
            const url = `${import.meta.env.VITE_APP_API_URL}supplier/${supplier.id}`;
            axiosPrivate
                .put(url,newSupplier)
                .then((resp)=>{
                    setSuppliers(
                        suppliers.map((item)=>{
                            if(item.id===id)
                                return {...item,name:newName}
                            else
                                return item;
                        })
                    )
                    handleEdit();
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
    }
    /* */
    return (
        <TableRow>
            <TableCell className='cell-supplier'>
                <button onClick={handleDelete}>-</button>
            </TableCell>
            <TableCell  className='cell-supplier'>
                {update
                    ? <p><input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /> <button onClick={handleUpdate}>Valider</button> <button onClick={handleEdit}>Fermer</button></p>
                    : <p>{supplier.name} </p>}
            </TableCell>
            <TableCell  className='cell-supplier'>
                <button onClick={handleEdit}>Modifier</button>
            </TableCell>
        </TableRow>
    )
}

export default SupplierLine
