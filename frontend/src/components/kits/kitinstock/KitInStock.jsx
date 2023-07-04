import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AwaitLoad } from "../../awaitload/AwaitLoad";
import { setStock, deleteStock } from "../../../feature/stockUser.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { FaRegTrashAlt } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from '@mui/material';
import { Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import noPicture from '../../../assets/pictures/noPicture.png';

import './KitInStock.scss';
import { Link } from "react-router-dom";

const KitInStock = ({ keySearch, title }) => {
    const [refresh, setRefresh] = useState(false);
    const [kits, setKits] = useState([]);
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [filteredKits, setFilteredKits] = useState([]);
    const StocksData = useSelector((state) => state.stockUsers.stockUser);
    const [isLoaded, setIsLoaded] = useState(false);
    const [idDelete, setIdDelete] = useState(0);
    const { auth } = useAuth();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const urlPicture = `${import.meta.env.VITE_APP_URL}`;
    let userId = auth?.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        const getModelsUser = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}models/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setKits(resp.data.filter(item => item.state === keySearch));
                    dispatch(setStock(resp.data))
                    setIsLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        if (!StocksData)
            getModelsUser();
        else {
            setIsLoaded(true);
            setKits(StocksData.filter(item => item.state === keySearch));
        }
    }, [keySearch, refresh]);

    useEffect(() => {
        setFilteredKits(kits.filter((kit) => kit.modelName.toLowerCase().includes(search.toLowerCase())))
    }, [search, kits])

    const handleClose = () => {
        setOpenModal(false);
    }

    const showModal = (id) => {
        setIdDelete(id);
        setOpenModal(true);
    }

    const deleteKit = () => {
        const urlStock = `${import.meta.env.VITE_APP_API_URL}users/model/${idDelete}`;
        axiosPrivate
            .delete(urlStock)
            .then(() => {
                dispatch(deleteStock(idDelete));
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err)
                toast.error('Une erreur est survenue');
            })
        setOpenModal(false);
    }

    return (
        <div className="kit-instock">
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText>
                        Voulez-vous supprimer ce kit ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleClose}>Non</IconButton>
                    <IconButton onClick={deleteKit}>Oui</IconButton>
                </DialogActions>
            </Dialog>
            <div className="count">
                Kits {title}: {kits.length}
            </div>

            <div className="filter">
                <label htmlFor="filter">
                    Recherche par nom : <Input type="text" id="filter" value={search} onChange={(e) => setSearch(e.target.value)} />
                </label>
            </div>
            {isLoaded
                ? (
                    <div className="table-kit-container">
                        <TableContainer>
                            <Table className="table-kit-stock">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><span className="inner-array-text">Nom</span></TableCell>
                                        <TableCell><span className="inner-array-text">Marque / Echelle</span></TableCell>
                                        <TableCell><span className="inner-array-text">Ref</span></TableCell>
                                        <TableCell><span className="inner-array-text">Photo</span></TableCell>
                                        <TableCell><span className="inner-array-text">Action</span></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredKits.map((kit) => (
                                        <TableRow key={kit.id}>
                                            <TableCell className="name-kit-stock-column"><Link to={`../detailskit/${kit.idModel}`}   state={kit} ><span className="inner-array-text">{kit.modelName} - {kit.builderName}</span></Link></TableCell>
                                            <TableCell className="brand-kit-stock-column">{kit.brandName} - {kit.scaleName}</TableCell>
                                            <TableCell className="ref-kit-stock-column">{kit.reference}</TableCell>
                                            <TableCell className="picture-kit-stock-column"><img src={kit.boxPicture ? `${urlPicture}${kit.boxPicture}` : noPicture} alt={kit.modelName} className="kit-stock-picture" /></TableCell>
                                            <TableCell className="action-kit-stock-column">
                                                <button className='btn-delete-kit' onClick={() => showModal(kit.id)}><FaRegTrashAlt className='icon-delete-kit' /></button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )
                : <AwaitLoad />}
        </div>
    )
}

export default KitInStock
