import axios from 'axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import { addBrand,setBrand,updateBrand,deleteBrand } from '../../../feature/Brand.slice';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';
import { ToastContainer, toast } from 'react-toastify';

import './BrandContainer.scss';

const BrandContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const brandsData = useSelector((state) => state.brands.brand);
    const url = `${import.meta.env.VITE_APP_API_URL}brand`;
    const axiosPrivate=useAxiosPrivate();

    const addAction=(newData)=>{
        if(window.confirm("Voulez vous ajouter l'élément ?")){
            axiosPrivate
                .post(url,newData)
                .then((resp)=>{
                    const newBrand=resp.data;
                    dispatch(addBrand(newBrand));
                })
                .catch((err)=>{
                    toast.error("Vous n'êtes pas autorisé à ajouter un élément.");
                })
        }
    }

    const getBrands = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setBrand(res.data))
                setIsLoaded(true);
            });
    }

     //Bundling datas for card
     const wrapper={
        deleteAction: deleteBrand,
        updateAction: updateBrand,
        kind: "la marque",
        url:url
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <section className="brand-component">
            <ToastContainer />
        <h2 className='brand-title'>Les marques</h2>
        <div className='brand-container'>
            {isLoaded ? brandsData.map(item => (
                <SimpleCardContainer
                    key={item.id}
                    item={item}
                    wrapper={wrapper}
                />
            ))
                : <AwaitLoad />
            }
        </div>
        <FormAddSimple
        action={addAction}
         />
    </section>
    )
}

export default BrandContainer
