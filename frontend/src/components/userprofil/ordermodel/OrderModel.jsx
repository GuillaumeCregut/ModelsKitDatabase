import { RxCrossCircled } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { setModel } from '../../../feature/Model.slice';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from "../../../hooks/useAuth";
import { AwaitLoad } from "../../awaitload/AwaitLoad";
import IconButton from '@mui/material/IconButton';
import {MdFormatListBulletedAdd} from "react-icons/md";

import './OrderModel.scss';

const OrderModel = ({ addModel,setCloseModel }) => {
    const [price, setPrice] = useState(0.0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFavoriteLoaded, setIsFavoriteLoaded] = useState(false);
    const [favoriteModels, setFavoriteModels] = useState([]);
    const [isPriceOk, setIsPriceOk] = useState(false);
    const [selectedModel, setSelectedModel] = useState(0);
    const [filteredModel, setFilteredModel] = useState([]);
    const [filter, setFilter] = useState('');
    const qttyRef = useRef();
    const modelData = useSelector((state) => state.models.model)
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser) {
        idUser = 0;
    }

    useEffect(()=>{
        setCloseModel(true);
    },[])

    useEffect(() => {
        if (isLoaded) {
            if (filter === '') {
                setFilteredModel([...modelData]);
            }
            else {
                const newArray = modelData.filter((item) => {
                    const name = item.name.toLowerCase();
                    const search = filter.toLowerCase();
                    return name.includes(search)
                });
                setFilteredModel([...newArray])
            }
        }
    }, [filter, isLoaded])

    useEffect(() => {
        const getFavorites = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}model/favorite/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setFavoriteModels(resp.data)
                    setIsFavoriteLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getFavorites();
    }, []);

    useEffect(() => {

        const getModels = async () => {
            const url = `${import.meta.env.VITE_APP_API_URL}model`;
            await axiosPrivate
                .get(url)
                .then((resp) => {
                    dispatch(setModel(resp.data));
                    setIsLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        if (!modelData) {
            getModels();
        }
        else
            setIsLoaded(true);
    }, []);

    useEffect(() => {
        setIsPriceOk(!isNaN(price))
    }, [price]);

    const handleClik = () => {
        if (isPriceOk && qttyRef.current.value !== 0) {
            const selectedModelItem = modelData.find((item) => item.id === selectedModel);
            const item = {
                qtty: qttyRef.current.value,
                idModel: selectedModel,
                price: price,
                name: selectedModelItem.name,
                brand: selectedModelItem.brandName,
                scale: selectedModelItem.scaleName,
                builder: selectedModelItem.builderName
            }
            addModel(item);
            setCloseModel(false);
        }
    }

    const changeModel = (e) => {
        setSelectedModel(parseInt(e.target.value));
    }

    return (
        <div className="order-model-container">
            <ToastContainer />
            <div className="order-model-list-container">
                <div className="order-model-all-models-container">
                    <h3>Liste des modèles favoris</h3>
                    <div className="order-model-list-all-models">
                        {isFavoriteLoaded
                            ? favoriteModels.map((item) => (
                                <p key={item.id}> <input
                                    type="radio"
                                    name="model"
                                    value={item.modelId}
                                    checked={selectedModel === item.modelId}
                                    onChange={changeModel} 
                                    className='radio-model-item'/>
                                    {item.modelName}</p>
                            ))
                            : <AwaitLoad />}
                    </div>
                </div>
                <div className="order-model-all-models-container">
                    <h3>Liste des modèles</h3>
                    <p>Filtre : <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} /></p>
                    <div className="order-model-list-all-models all-models-list">
                        {isLoaded
                            ? filteredModel.map((model) => (
                                <p key={model.id}><input
                                    type="radio"
                                    name="model"
                                    value={model.id}
                                    checked={selectedModel === model.id}
                                    onChange={changeModel}
                                    className='radio-model-item'
                                />{model.brandName}-{model.builderName}-{model.name} - {model.scaleName}</p>
                            ))
                            : null}
                    </div>
                </div>
            </div>
            <div className="order-model-inputs-container">
            <label htmlFor="price">Prix :
                <input 
                    type="text" 
                    className="order-model-inputs"
                    id="price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} />
                </label>
            <label htmlFor="qtty">Quantité :
                <input 
                    type="number" 
                    className="order-model-inputs"
                    id="qtty" 
                    ref={qttyRef} 
                    min="1" />
                </label>
            <IconButton onClick={handleClik} ><MdFormatListBulletedAdd className="add-model-order-icon"/></IconButton>
            </div>
            <RxCrossCircled onClick={()=>setCloseModel(false)} className="close-model-add"/>
        </div>
    )
}

export default OrderModel
