import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { BsCheck2Square } from "react-icons/bs";
import { BsDoorClosed } from "react-icons/bs";


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
        const url = `${import.meta.env.VITE_APP_API_URL}supplier/${supplier.id}`;
        axiosPrivate
            .delete(url)
            .then((resp) => {
                setSuppliers(suppliers.filter((item) => item.id !== id))
            })
            .catch((err) => {
                if (err?.response?.status === 423)
                    toast.warn('La suppression de ce fournisseur est impossible.');
                else
                    toast.error('Une erreur est survenue');
            })
    }

    const handleUpdate = () => {
        const id = supplier.id;
        const newSupplier = {
            name: newName,
            owner: supplier.owner
        }
        const url = `${import.meta.env.VITE_APP_API_URL}supplier/${supplier.id}`;
        axiosPrivate
            .put(url, newSupplier)
            .then((resp) => {
                setSuppliers(
                    suppliers.map((item) => {
                        if (item.id === id)
                            return { ...item, name: newName }
                        else
                            return item;
                    })
                )
                handleEdit();
            })
            .catch((err) => {
                toast.error('Une erreur est survenue');
            })
    }

    return (
        <TableRow>
            <TableCell className='cell-supplier'>
                <IconButton onClick={handleDelete}>< FaTrash className='delete-supplier' /></IconButton>
            </TableCell>
            <TableCell className='cell-supplier'>
                {update
                    ? <p>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className='user-supplier-field-name' />
                        <IconButton onClick={handleUpdate} className='supplier-line-btn'><BsCheck2Square className='close-supplier-btn' /></IconButton>
                        <IconButton onClick={handleEdit} className='supplier-line-btn'><BsDoorClosed className='close-supplier-btn' /></IconButton></p>
                    : <p>{supplier.name} </p>}
            </TableCell>
            <TableCell className='cell-supplier'>
                <IconButton onClick={handleEdit}><RxUpdate /></IconButton>
            </TableCell>
        </TableRow>
    )
}

export default SupplierLine
