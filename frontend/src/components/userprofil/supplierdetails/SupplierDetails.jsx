import {  useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from 'react-toastify';

import "./SupplierDetails.scss";

const SupplierDetails = ({supplier, setSuppliers,suppliers}) => {
    const [update,setUpdate]=useState(false);
    const [newName,setNewName]=useState(supplier.name);
    const axiosPrivate=useAxiosPrivate();

    const handleEdit=()=>{
        setUpdate(prev=>!prev)
    }

    const handleDelete=()=>{
        const id=supplier.id;
        if(window.confirm("Voulez-vous supprimer ce fournisseur ?")){
            const url = `${import.meta.env.VITE_APP_API_URL}supplier/${supplier.id}`;
            axiosPrivate
                .delete(url)
                .then((resp)=>{
                    setSuppliers(suppliers.filter((item)=>item.id!==id))
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
    }

    const handleUpdate=()=>{
        const id=supplier.id;
        if(window.confirm("Voulez vous modifier ce fournisseur ?")){
            const newSupplier={
                name:newName,
                owner: supplier.owner
            }
            const url = `${import.meta.env.VITE_APP_API_URL}supplier/${supplier.id}`;
            axiosPrivate
                .put(url,newSupplier)
                .then((resp)=>{
                    setSuppliers(
                        suppliers.map((item)=>{
                            if(item.id===id)
                                return {...item,name:newName}
                            else
                                return item;
                        })
                    )
                    handleEdit();
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
    }

    return (
        <li className="supplier-details-container">
            <ToastContainer />
           {update
           ? <p><input type="text" value={newName} onChange={(e)=>setNewName(e.target.value)}/> <button onClick={handleUpdate}>Valider</button> <button onClick={handleEdit}>Fermer</button></p>
           :<div><button onClick={handleDelete}>-</button>{supplier.name} <button  onClick={handleEdit}>Modifier</button></div>}
        </li>
    )
}

export default SupplierDetails
