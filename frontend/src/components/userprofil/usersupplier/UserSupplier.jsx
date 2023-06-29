import { useEffect,  useState } from "react";
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SupplierLine from "./SupplierLine";
import { MdFormatListBulletedAdd } from "react-icons/md";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import './UserSupplier.scss';
import { Input } from "@mui/material";

const UserSupplier2 = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [nameSupplier,setNameSupplier]=useState('');
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser)
        idUser = 0;

    useEffect(() => {
        const getSuppliers = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}supplier/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setSuppliers(resp.data)
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getSuppliers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nameSupplier !== '') {
            const newSupplier = {
                name: nameSupplier,
                owner: idUser
            }
            const url = `${import.meta.env.VITE_APP_API_URL}supplier/`;
            axiosPrivate
                .post(url, newSupplier)
                .then((resp) => {
                    setSuppliers((prev) => [...prev, resp.data]);
                    setNameSupplier('');
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        else{
            toast.error('Veuillez remplir le formulaire')
        }
    }

    return (
        <div className="supplier-page">
            <h2 className="supplier-title">Fournisseurs</h2>
            <TableContainer >
                <Table aria-label="simple table" className='table-supplier'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='supplierArray-button column'> </TableCell>
                            <TableCell className='supplierArray-head column'>Nom</TableCell>
                            <TableCell className='supplierArray-button column'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers.map((item) => (
                            <SupplierLine
                                key={item.id}
                                supplier={item}
                                suppliers={suppliers}
                                setSuppliers={setSuppliers}
                            />
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <div className="form-add-supplier-container">
                <form onSubmit={handleSubmit} className="form-add-supplier">
                    <label htmlFor="name-supplier">Nom du fournisseur : <Input placeholder="Nom" id="name-supplier" value={nameSupplier} onChange={(e)=>setNameSupplier(e.target.value)} /></label>
                    <Button className="form-add-supplier-btn" variant="contained" onClick={handleSubmit}><MdFormatListBulletedAdd className="add-supplier-icon" />Ajouter</Button>
                </form>
            </div>
        </div>
    )
}

export default UserSupplier2
