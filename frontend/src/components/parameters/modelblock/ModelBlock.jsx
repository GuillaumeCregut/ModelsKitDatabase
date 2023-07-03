import React, { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip';
import useAuth from '../../../hooks/useAuth';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';
import ranks from '../../../feature/ranks';
import { deleteModel, updateModel } from '../../../feature/Model.slice';
import { addStock, setStock } from '../../../feature/stockUser.slice';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAxiosPrivateMulti from '../../../hooks/useAxiosMulti';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { FileDrop } from 'react-file-drop';
import BrandSelector from '../../selectors/brandselector/BrandSelector';
import BuilderSelector from '../../selectors/builderselector/BuilderSelector';
import CategorySelector from '../../selectors/categoryselector/CategorySelector';
import ScaleSelector from '../../selectors/scaleselector/ScaleSelector';
import PeriodSelector from '../../selectors/periodSelector/PeriodSelector';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import { RxUpdate } from "react-icons/rx";
import { BsDoorClosed } from "react-icons/bs";
import { Dialog, DialogActions, DialogContent, DialogContentText, Input } from '@mui/material';

import './ModelBlock.scss';


const ModelBlock = ({ model, setReload }) => {
    const url = `${import.meta.env.VITE_APP_URL}`;
    const [displayBack, setDisplayBack] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(model.brand);
    const [selectedCategory, setSelectedCategory] = useState(model.category);
    const [selectedPeriod, setSelectedPeriod] = useState(model.period);
    const [selectedScale, setSelectedScale] = useState(model.scale);
    const [selectedBuilder, setSelectedBuilder] = useState(model.builder);
    const [fileUpload, setFileUpload] = useState(null);
    const [urlImage, setUrlImage] = useState(model.picture ? `${url}${model.picture}` : '');
    const [newName, setNewName] = useState(model.name);
    const [newRef, setNewRef] = useState(model.reference);
    const [newLink, setNewLink] = useState(model.link ? model.link : '');
    const [isLiked, setIsLiked] = useState(model.isLiked);

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const axiosMulti = useAxiosPrivateMulti();
    const dispatch = useDispatch();
    const StocksData = useSelector((state) => state.stockUsers.stockUser);
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;
    let idUser = auth.id;
    if (!idUser)
        idUser = 0;

    const getModelsUser = (id) => {
        const url = `${import.meta.env.VITE_APP_API_URL}model/user/${id}`;
        axiosPrivate
            .get(url)
            .then((resp) => {
                dispatch(setStock(resp.data));
            })
            .catch((err) => {
                toast.error('Une erreur est survenue');
            })
    }

    useEffect(() => {
        if (fileUpload) {
            const img = URL.createObjectURL(fileUpload)
            setUrlImage(img)
        }

        if (idUser !== 0 && !StocksData) {
            getModelsUser(idUser);
        }

    }, [fileUpload])

    const turnCard = () => {
        setDisplayBack(!displayBack);
    }

    const handleModalUpdate = () => {
        setShowModal(true);
    }

    useEffect(() => {
        setIsLiked(model.isLiked);
    }, [model.isLiked])

    const closeModal = () => {
        setShowModal(false);
        setFileUpload(false);
        setUrlImage(model.picture ? `${url}${model.picture}` : '')
    }

    const handleUpdate = () => {
        const formData = new FormData();
        if (fileUpload)
            formData.append('file', fileUpload);
        formData.append('name', newName);
        formData.append('reference', newRef);
        formData.append('brand', selectedBrand);
        formData.append('builder', selectedBuilder);
        formData.append('scale', selectedScale);
        formData.append('category', selectedCategory);
        formData.append('period', selectedPeriod);
        if (newLink !== '')
            formData.append('scalemates', newLink);
        const urlApi = `${import.meta.env.VITE_APP_API_URL}model/${model.id}`;
        axiosMulti
            .put(urlApi, formData)
            .then((resp) => {
                if (resp?.data) {
                    dispatch(updateModel([resp.data, model.id]))
                    setReload(prev => !prev);
                }
            })
            .catch((err) => {
                toast.error('Une erreur est survenue');
            })
        closeModal();
    }

    const handleDelete = () => {
        const urlApi = `${import.meta.env.VITE_APP_API_URL}model/${model.id}`
        axiosPrivate
            .delete(urlApi)
            .then(() => {
                dispatch(deleteModel(model.id));
                setReload(prev => !prev);
            })
            .catch((err) => {
                if(err?.response?.status===423)
                    toast.warn('La suppression de ce modèle est impossible');
                else
                toast.error('Une erreur est survenue');
            })
        setOpenModal(false);
    }

    Modal.setAppElement('#root');

    const handleClick = () => {
        const data = {
            modelId: model.id,
            owner: idUser,
            like: !isLiked
        }
        const url = `${import.meta.env.VITE_APP_API_URL}model/favorite/`;
        axiosPrivate
            .post(url, data)
            .then((resp) => {
                setIsLiked((prev) => !prev)
            })
            .catch((err) => {
                toast.error('Une erreur est survenue');
            })
    }

    const handleCart = () => {
        const url = `${import.meta.env.VITE_APP_API_URL}users/model/`;
        axiosPrivate
            .post(url, { user: idUser, model: model.id })
            .then((resp) => {
                dispatch(addStock(resp.data));
                toast.info("Le modèle a bien été ajouté. Pour modifier, veuillez vous rendre dans votre stock.")
            })
            .catch((err) => {
                toast.error("Une erreur est survenue, le modèle n'a put être ajouté au stock");
            })
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleOpenConfirm = () => {
        setOpenModal(true);
    }
    return (
        <article className='model-block'>
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
                    <IconButton onClick={handleDelete}>Oui</IconButton>
                </DialogActions>
            </Dialog>
            <div className="model-card-container" onClick={turnCard} >
                <ReactCardFlip isFlipped={displayBack} flipDirection="horizontal" containerClassName="card-settings">
                    <div className='flip-card-front'>
                        {model.picture
                            ? <img src={`${url}${model.picture}`} alt={model.name} className='model-picture' />
                            : null}
                    </div>
                    <div className='flip-card-back'>
                        Constructeur :{model.builderName} <br />
                        Pays : {model.countryName}<br />
                        Catégorie : {model.categoryName}<br />
                        Période : {model.periodName}
                        {model.link
                            ? <p> <a href={model.link} target="_blank" rel='noreferrer'>Lien Scalemates </a></p>
                            : null}
                    </div>
                </ReactCardFlip>
            </div>
            <h3 className='model-card-title'> {model.brandName}<br />
                {model.name}</h3>
            <p className='model-reference'>{model.reference} - {model.scaleName}</p>
            {idUser !== 0
                ? <div className='user-buttons'>
                    <p onClick={handleClick}>{isLiked ? <AiFillHeart className='model-like model-like-true' /> : <AiOutlineHeart className='model-like' />}</p>
                    <MdOutlineAddShoppingCart className="add-cart-model" onClick={handleCart} />
                </div>
                : null}
            <div className={rankUser === ranks.admin ? "card-btn-container" : ''}><UpDateRemoveBtn
                deleteAction={handleOpenConfirm}
                updateAction={handleModalUpdate} /></div>
            <Modal
                isOpen={showModal}
                className="model-modal"
                onRequestClose={closeModal}>
                <div className="modal-supra">
                    <div className="modal-container">
                        <label htmlFor='brand-mod'>Marque :
                            <BrandSelector
                                id='brand-mod'
                                selectedBrand={selectedBrand}
                                setSelectedBrand={setSelectedBrand} />
                        </label>
                        <label htmlFor='builder-mod'>Constructeur :
                            <BuilderSelector
                                id='builder-mod'
                                selectedBuilder={selectedBuilder}
                                setSelectedBuilder={setSelectedBuilder} />
                        </label>
                        <label htmlFor='cat-mod'>Catégorie :
                            <CategorySelector
                                id='cat-mod'
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory} />
                        </label>
                        <label htmlFor='scale-mod'>Echelle :
                            <ScaleSelector
                                id='scale-mod'
                                selectedScale={selectedScale}
                                setSelectedScale={setSelectedScale} />
                        </label>
                        <label htmlFor='period-mod'>période :
                            <PeriodSelector
                                id='period-mod'
                                selectedPeriod={selectedPeriod}
                                setSelectedPeriod={setSelectedPeriod} />
                        </label>
                        <label htmlFor="new-name">Nom :
                            <Input id="new-name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        </label>
                        <label htmlFor="new-ref">Référence :
                            <Input id="new-ref" value={newRef} onChange={(e) => setNewRef(e.target.value)} />
                        </label>
                        <label htmlFor="new-link">Lien scalmates :
                            <Input id="new-link" value={newLink} onChange={(e) => setNewLink(e.target.value)} />
                        </label>
                    </div>
                    <div className='modal-dropzone'>
                        <label htmlFor="new-picture">Photo</label>
                        <div className="modal-drop-zone-file">
                            <FileDrop
                                onDrop={(files, event) => {
                                    setFileUpload(files[0]);
                                }}

                            > {urlImage
                                ? <img src={urlImage} alt={model.name} className='form-add-model-img' />
                                : 'Glisser la photo'}</FileDrop>

                        </div>
                    </div>
                </div>
                <div className="modal-btn-container">
                    <IconButton onClick={handleUpdate}><RxUpdate className='valid-mod-btn' /></IconButton>
                    <IconButton onClick={closeModal}><BsDoorClosed className='valid-mod-btn' /></IconButton>
                </div>
            </Modal>
        </article>
    )
}

export default ModelBlock
