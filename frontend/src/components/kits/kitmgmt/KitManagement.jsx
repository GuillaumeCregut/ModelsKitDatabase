import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AwaitLoad } from "../../awaitload/AwaitLoad";
import InnerMgmt from "./innermgmt/InnerMgmt";
import { setStock } from "../../../feature/stockUser.slice";
import { useDispatch, useSelector } from "react-redux";
import kitState from "../../../feature/kitState";
import { ToastContainer, toast } from 'react-toastify';

import './KitManagement.scss';

const KitManagement = () => {
    const [kits, setKits] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayPicture, setDisplayPicture]=useState(false);
    const { auth } = useAuth();
    const dispatch = useDispatch();
    const StocksData = useSelector((state) => state.stockUsers.stockUser);
    const axiosPrivate = useAxiosPrivate();
    let userId = auth?.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        const getModelsUSer = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}model/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setKits(resp.data);
                    dispatch(setStock(resp.data));
                    setIsLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        if (!StocksData)
            getModelsUSer();
        else{
            setKits(StocksData);
            setIsLoaded(true);
        }
            
    }, []);

    return (
        <section className='kits-management-page'>
            <ToastContainer />
            <h2>Gestion de mes kits</h2>
            <label htmlFor="display">
                <input type="checkbox" id="display" checked={displayPicture}  onChange={(e)=>setDisplayPicture(!displayPicture)} className="display-image"/>
                Afficher les images</label>
            {isLoaded
                ? <InnerMgmt
                    orderedModels={kits.filter(item => item.state === kitState.ordered)}
                    likedModels={kits.filter(item => item.state === kitState.wish)}
                    workbenchModels={kits.filter(item => item.state === kitState.wip)}
                    finishedModels={kits.filter(item => item.state === kitState.finished)}
                    stockModels={kits.filter(item => item.state === kitState.stock)}
                    displayImage={displayPicture}
                />
                : <AwaitLoad />}
        </section>
    )
}

export default KitManagement
