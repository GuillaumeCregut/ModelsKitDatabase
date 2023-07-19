import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import { toast } from 'react-toastify';
import { MdPhotoCamera, MdMessage } from "react-icons/md";
import { Badge, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import './FinishedModel.scss';

const FinishedModel = () => {
    const [listModel, setListModel] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    let userId = auth.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        const getModelsUSer = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}models/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setListModel(resp.data);
                    setIsLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getModelsUSer();
    }, []);


    return (
        <div className='finished-models'>
            <div className="finished-top-page">
                <h2>Modèles finis</h2>
                <div className="list-finished-model-container">
                    {isLoaded
                        ? (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom</TableCell>
                                            <TableCell>Marque</TableCell>
                                            <TableCell>Echelle</TableCell>
                                            <TableCell>Photos</TableCell>
                                            <TableCell>Messages</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            listModel.filter(item => item.state === 3).map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell><Link to={`details/${item.id}`}><span className="finished-item-name">{item.builderName} {item.modelName}</span></Link></TableCell>
                                                    <TableCell>{item.brandName}</TableCell>
                                                    <TableCell>{item.scaleName}</TableCell>
                                                    <TableCell>{item.pictures ? <MdPhotoCamera className='icon-photo-finished' /> : ''}</TableCell>
                                                    <TableCell>
                                                        {item.nbMessages > 0 && (
                                                            <Badge badgeContent={item.nbMessages} color="primary">
                                                                <MdMessage className='message-in-build'/>
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                </TableRow>

                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                        : <AwaitLoad />}
                </div>
            </div>
        </div>
    )
}

export default FinishedModel
