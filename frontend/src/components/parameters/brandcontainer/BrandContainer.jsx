import axios from 'axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, setBrand, updateBrand, deleteBrand } from '../../../feature/Brand.slice';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';
import { toast } from 'react-toastify';
import SimpleArray from '../simplecardcontainer/SimpleArray';



const BrandContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const brandsData = useSelector((state) => state.brands.brand);
    const url = `${import.meta.env.VITE_APP_API_URL}brand`;
    const axiosPrivate = useAxiosPrivate();

    const addAction = (newData) => {
        axiosPrivate
            .post(url, newData)
            .then((resp) => {
                const newBrand = resp.data;
                dispatch(addBrand(newBrand));
            })
            .catch((err) => {
                toast.error("Vous n'êtes pas autorisé à ajouter un élément.");
            })
    }

    const getBrands = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setBrand(res.data))
                setIsLoaded(true);
            });
    }

    //Bundling datas for card
    const wrapper = {
        deleteAction: deleteBrand,
        updateAction: updateBrand,
        kind: "la marque",
        url: url
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <section className="right-page">
            <h2 className='solo-title'>Les marques</h2>
            <div className='solo-container'>
                {isLoaded
                    ? <SimpleArray item={brandsData} wrapper={wrapper} />
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
