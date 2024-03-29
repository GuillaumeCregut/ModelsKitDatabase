import { useState, useEffect, useRef } from 'react'
import Popup from 'reactjs-popup';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ProviderSelector from '../../selectors/provideselector/ProviderSelector';
import OrderModel from '../ordermodel/OrderModel';
import ModelLine from './ModelLine';
import OrderDetails from './orderdetails/OrderDetails';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import './Orders.scss';



const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [listModel, setListModel] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [provider, setProvider] = useState(0);
    const [deployed, setDeployed] = useState(false);
    const [closeModel, setCloseModel] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const orderRefRef = useRef();
    const orderDate=useRef();
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser) {
        idUser = 0;
    }
    useEffect(() => {
        try {
            const ls = JSON.parse(window.localStorage.getItem("myOrder"));
            if (ls?.provider) {
                setProvider(ls.provider)
            }
            if (ls?.reference) {
                orderRefRef.current.value = ls.reference;
            }
            if (ls?.list)
                setListModel([...ls.list]);
            setIsRefresh(true);
        }
        catch (err) {
            toast.error('Une erreur est survenue');
        }
    }, []);

    useEffect(() => {
        const getOrders = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}orders/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setOrders(resp.data)
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getOrders();
    }, [refresh]);

    useEffect(() => {
        if (listModel.length > 0 || provider !== 0 || isRefresh) {
            const orderStore = {
                provider: parseInt(provider),
                reference: orderRefRef?.current.value,
                list: listModel
            }
            window.localStorage.setItem("myOrder", JSON.stringify(orderStore));
        }
    }, [listModel, provider]);

    const resetForm = () => {
        setProvider(0);
        setListModel([]);
        orderRefRef.current.value = '';
        orderDate.current.value='';
        window.localStorage.removeItem("myOrder")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderRefRef.current.value === '' || orderDate.current.value==='') {
            toast.warn('Veuillez remplir les champs')
        }
        else {
            if (parseInt(provider) !== 0) { //penser à tester si la liste est vide.
                const list = listModel.map((model) => {
                    return { idModel: model.idModel, qtty: model.qtty, price: model.price }
                })
                if(list.length===0){
                    toast.warn('La commande est vide');
                    return
                }
                const dataSend = {
                    owner: idUser,
                    supplier: parseInt(provider),
                    reference: orderRefRef.current.value,
                    dateOrder: orderDate.current.value,
                    list: list
                }
                const url = `${import.meta.env.VITE_APP_API_URL}orders/`;
                axiosPrivate
                    .post(url, dataSend)
                    .then((resp) => {
                        toast.info('Votre commande a bien été enregistrée');
                        resetForm();
                        setRefresh(!refresh)
                    })
                    .catch((err) => {
                        toast.error('Une erreur est survenue');
                    })
            }
            else
                toast.warn('Veuillez choisir un fournisseur')
        }
    }


    const addModel = (model) => {
        if (parseInt(model.qtty) < 1)
            return -1;
        let newList = [];
        const id = listModel.findIndex((item) => item.idModel === model.idModel);
        //Si on a  le modele dans la liste
        if (id !== -1) {
            const oldModel = listModel[id];
            const newQtty = parseInt(oldModel.qtty) + parseInt(model.qtty);
            if (newQtty < 0) {
                oldModel.qtty = 0; //remove from array
                newList = listModel.filter((item) => item.idModel !== model.idModel)
            }
            else {
                oldModel.qtty = newQtty;
                oldModel.price = parseFloat(oldModel.price);
                //Rajouter le modèle au tableau
                newList = listModel.map((item) => {
                    if (item.idModel === model.idModel)
                        return oldModel;
                    else return item;
                });
            }
            setListModel([...newList]);
        } //On a pas le modele dans la liste, on le rajoute
        else {
            setListModel([...listModel, { ...model, idModel: model.idModel, price: parseFloat(model.price), qtty: parseInt(model.qtty) }]);
        }

    }

    const setNewQtty = (id, newQtty) => {
        const modelMod = listModel.find((item => item.idModel === id));
        if (newQtty > 0) {
            modelMod.qtty = newQtty;
            setListModel(listModel.map((item) => {
                if (item.idModel === id)
                    return modelMod;
                else return item;
            }))
        }
        else {
            setListModel(listModel.filter((item) => item.idModel !== id))
        }
    }

    return (idUser !== 0
        ? (<section className='orders-container'>
            Mes commandes : <Button onClick={() => setDeployed(!deployed)} variant='contained'>{deployed ? 'cacher' : 'Afficher'}</Button>
            {orders.length > 0
                ? <TableContainer className={deployed ? "list-order list-order-deployed" : "list-order"}>
                    <Table aria-label="simple table"  >
                        <TableHead>
                            <TableRow>
                                <TableCell className='ref-column'>Référence</TableCell>
                                <TableCell className='supplier-column'>Fournisseur</TableCell>
                                <TableCell className='ref-column'>Date</TableCell>
                                <TableCell className='detail-column'>Détails</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.reference}>
                                    <TableCell>
                                        {order.reference}
                                    </TableCell>
                                    <TableCell>
                                        {order.providerName}
                                    </TableCell>
                                    <TableCell>
                                        {order.dateOrder?order.dateOrder:'-'}
                                    </TableCell>
                                    <TableCell>
                                        <Popup trigger={<Button variant='contained'> Détails</Button>} position="right center" modal className='popup'>
                                            <OrderDetails details={order} />
                                        </Popup>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                : <p>Vous n'avez pas de commandes enregistrées</p>
            }
            <div className="new-order-container">
                <h2 className='new-order-form-title'>Ajouter une nouvelle commande</h2>
                <form className='new-order-form' onSubmit={handleSubmit}>
                    <div className="form-header-inputs">
                        <label htmlFor="ref-order">Référence de la commande :
                            <input placeholder="Référence" id="ref-order" className="input-ref-order" ref={orderRefRef} />
                        </label>
                        <div className="order-details">
                            <label htmlFor="provider">Fournisseur :
                                <ProviderSelector
                                    id="provider"
                                    provider={provider}
                                    setProvider={setProvider} />
                            </label>
                            <label htmlFor="date_order">Date : 
                                <input type="date" id="date_order" className='order-date' ref={orderDate}/>
                            </label>
                        </div>
                    </div>
                    <Popup trigger={<Button type="button" variant='contained'>Ajouter un modèle à la commande</Button>} open={closeModel} position="center center" modal className='popupmodel'>
                        <OrderModel
                            addModel={addModel}
                            setCloseModel={setCloseModel} />
                    </Popup>
                    <div className="model-list-added">
                        <TableContainer >
                            <Table aria-label="simple table" className='order-model-table' >
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='order-head-cells'>nom du modèle</TableCell>
                                        <TableCell className='order-head-cells'>Marque</TableCell>
                                        <TableCell className='order-head-cells'>Echelle</TableCell>
                                        <TableCell className='order-head-cells  qtty-cell'>Quantité</TableCell>
                                        <TableCell className='order-head-cells'>Prix unitaire</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listModel.map((model) => (
                                        <ModelLine key={model.idModel} model={model} setNewQtty={setNewQtty} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Button variant='contained' onClick={handleSubmit}>Valider</Button>

                </form>

            </div>
        </section>)
        : <p>Vous n'êtes pas connecté</p>
    )
}

export default Orders
