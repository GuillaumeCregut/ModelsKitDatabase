import  { useEffect, useRef, useState } from 'react';

import './ModifierCard.scss';
import close from '../../../assets/pictures/close.png';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export const ModifierCard = ({ id,name, url, action, hide }) => {
    const [newName, setNewName] = useState(name);
    const nameRef = useRef();
    const formRef = useRef();
    const dispatch=useDispatch();
    const axiosPrivate=useAxiosPrivate();


    const handleClose = () => {
        hide(false);
    }

    useEffect(()=>{
        nameRef.current.focus();
    },[])

    const handleUpdate=(e)=>{
        if(newName==='')
            return -1;
        e.preventDefault();
        if(window.confirm('Voulez vous modifier ?')){
        const newItem={name:newName};
        axiosPrivate
             .put(url,newItem)
             .then(()=>{
                    dispatch(action([newItem,id]))
             })
             .catch((err)=>{
                switch(err.response.status){
                    case 401 : toast.error("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 403 : toast.error("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 404 :  toast.warn("L'élément n'existe pas");
                        break;
                    case 422 : toast.warn("Veuillez vérifier les valeurs");
                        break;
                    case 500 : toast.error("Une erreur serveur est survenue.");
                        break;
                    default : toast.error(`action impossible : ${err.response.status}`);
                }
             })
        }
        formRef.current.reset();
        handleClose()
    }

    const btnStyle={
        backgroundImage:`url(${close})`
    }

    return (
        <div className='form-update-card-container'>
            <ToastContainer />
            <form className='form-update-card' onSubmit={handleUpdate} ref={formRef}>
                <label htmlFor="new-name">
                    Nouveau nom : <br />
                    <input
                        type="text"
                        id="new-name"
                        ref={nameRef}
                        value={newName}
                        className="input-name"
                        autoComplete='off'
                        onChange={(e)=>setNewName(e.target.value)}
                        />
                </label>
                <button>valider</button>
            </form>
            <button onClick={handleClose} className="close-btn" aria-label='Fermer' style={btnStyle}></button>
        </div>
    )
}
