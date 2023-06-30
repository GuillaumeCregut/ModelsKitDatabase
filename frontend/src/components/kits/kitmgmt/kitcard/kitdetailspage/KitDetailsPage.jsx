import { Link, useLocation, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import kitState from '../../../../../feature/kitState';
import { MdFlag, MdBuild, MdOutlineAccessTime, MdOutlineTimeToLeave, MdOutlineBrandingWatermark, MdScale } from "react-icons/md";
import { BsCurrencyEuro } from "react-icons/bs";

import './KitDetailsPage.scss';

const KitDetailsPage = (props) => {
    const location = useLocation();
    const [model, setModel] = useState();
    const [loaded, SetLoaded] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const params = useParams();
    const stockModel = location.state;
    console.log(stockModel);
    const url = `${import.meta.env.VITE_APP_URL}`;

    useEffect(() => {
        const getModel = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}model/${params.id}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setModel(resp.data);
                    SetLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getModel();
    }, [])
    return (
        <div className='kit-details-page'>
            <h2 className='kit-detail-page-title'>Détail du modèle : "{stockModel.modelName}"</h2>
            <div className="img-kit">
                {stockModel.boxPicture ? <img src={`${url}${stockModel.boxPicture}`} alt={stockModel.modelName} className='kit-detail-page-picture' /> : null}
            </div>
            {loaded
                ? (<List dense>
                    <ListItem >
                        <ListItemIcon >
                            <MdBuild />
                        </ListItemIcon>
                        <ListItemText>Constructeur : {stockModel.builderName}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MdFlag />
                        </ListItemIcon>
                        <ListItemText>Pays : {model.countryName}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MdOutlineAccessTime />
                        </ListItemIcon>
                        <ListItemText>Période : {model.periodName}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MdOutlineTimeToLeave />
                        </ListItemIcon>
                        <ListItemText>Catégorie : {model.categoryName}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MdOutlineBrandingWatermark />
                        </ListItemIcon>
                        <ListItemText>Marque : {model.brandName}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Référence : {model.reference}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MdScale />
                        </ListItemIcon>
                        <ListItemText>Echelle : {model.scaleName}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Statut : {stockModel.stateName}</ListItemText>
                    </ListItem>
                    {stockModel.providerName
                        ? (<ListItem>
                            <ListItemText>Fournisseur : {stockModel.providerName}</ListItemText>
                        </ListItem>)
                        : null}
                    {stockModel.price
                        ? (<ListItem>
                            <ListItemIcon>
                                <BsCurrencyEuro />
                            </ListItemIcon>
                            <ListItemText>Prix : {stockModel.price} euros</ListItemText>
                        </ListItem>)
                        : null}
                </List>)
                : null}
            {stockModel.state === kitState.finished
                ? (<div className="link-finish">
                    <Link to={`../finis/details/${stockModel.id}`}>Voir les photos</Link>
                </div>)
                : null}
        </div>
    )
}

export default KitDetailsPage
