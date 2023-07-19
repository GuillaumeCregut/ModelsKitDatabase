import Button from '@mui/material/Button';
import { BsFillClipboard2PlusFill } from "react-icons/bs";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import kitState from "../../../feature/kitState";
import useAuth from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import {updateStock} from '../../../feature/stockUser.slice';

import './Random.scss';

const RandomKitInfo = ({ kit }) => {
    const axiosPrivate = useAxiosPrivate();
    const StocksData = useSelector((state) => state.stockUsers.stockUser);
    const dispatcher=useDispatch();
    const { auth } = useAuth();
    let userId = auth.id;
    if (!userId)
        userId = 0;

    const handleClick = () => {
        const data={
            id:kit.id,
            owner:userId,
            newState: kitState.wip
        }
        const url = `${import.meta.env.VITE_APP_API_URL}models/stock/`;
        axiosPrivate
            .put(url, data)
            .then(() => {
                if(StocksData?.length>0)
                     dispatcher(updateStock([data.newState,data.id]));
            })
            .catch((err) => {
                    toast.error('Une erreur est survenue');
            })
    }

    return (
        <div>
            <p>Vous pouvez monter ce kit : </p>
            <div className="random-model-container">
                <p>{kit.brandName} - {kit.builderName} {kit.modelName}</p>
                <img src={`${import.meta.env.VITE_APP_URL}${kit.boxPicture}`} alt={kit.modelName} className='random-picture' />
                <p>{kit.scaleName} - ref : {kit.reference}</p>
                <p className='btn-add-wip'>
                    <Button variant="contained" startIcon={<BsFillClipboard2PlusFill />} onClick={handleClick}>
                        Mettre sur l'établi
                    </Button>
                </p>
            </div>

        </div>
    )
}

export default RandomKitInfo
