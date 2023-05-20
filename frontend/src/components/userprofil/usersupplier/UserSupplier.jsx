import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SupplierDetails from "../supplierdetails/SupplierDetails";
import { ToastContainer, toast } from 'react-toastify';

import './UserSupplier.scss';

const UserSupplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();
    const nameRef=useRef();
    let idUser = auth?.id;
    if (!idUser)
        idUser = 0;

    useEffect(() => {
        const getSuppliers = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}supplier/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setSuppliers(resp.data)
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getSuppliers();
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(nameRef.current.value!==''){
            if(window.confirm("Voulez vous ajouter ce fournisseur ?")){
                const newSupplier={
                    name:nameRef.current.value,
                    owner: idUser
                }
                const url = `${import.meta.env.VITE_APP_API_URL}supplier/`;
                axiosPrivate
                    .post(url,newSupplier)
                    .then((resp)=>{
                        setSuppliers((prev)=>[...prev,resp.data]);
                        nameRef.current.value='';
                    })
                    .catch((err)=>{
                        toast.error('Une erreur est survenue');
                    })
            }
        }
       
    }

    return (
        <div className="supplier-page">
            <ToastContainer />
            <h2 className="supplier-title">Fournisseurs</h2>
            <ul className="supplier-container">
                {suppliers.map((item) => (
                    <SupplierDetails
                        key={item.id}
                        supplier={item}
                        suppliers={suppliers}
                        setSuppliers={setSuppliers}
                    />
                ))}

            </ul>
            <div className="form-add-supplier-container">
                <form onSubmit={handleSubmit} className="form-add-supplier">
                    <label htmlFor="name-supplier">Nom du fournisseur : <input type="text" id="name-supplier" ref={nameRef}/></label>
                    <button className="form-add-supplier-btn">Ajouter</button>
                </form>
            </div>
        </div>
    )
}

export default UserSupplier
