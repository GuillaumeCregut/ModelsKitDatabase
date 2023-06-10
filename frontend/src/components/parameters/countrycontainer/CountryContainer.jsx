import axios from 'axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry, deleteCountry, addCountry, updateCountry } from '../../../feature/Country.slice';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';
import { ToastContainer, toast } from 'react-toastify';
import SimpleArray from '../simplecardcontainer/SimpleArray';


const CountryContainer = () => {
    const dispatch = useDispatch();
    const countriesData = useSelector((state) => state.countries.country);
    const [isLoaded, setIsLoaded] = useState(false);
    const url = `${import.meta.env.VITE_APP_API_URL}country`;
    const axiosPrivate = useAxiosPrivate();

    const addAction = (newData) => {
        if (window.confirm("Voulez vous ajouter l'élément ?")) {
            axiosPrivate
                .post(url, newData)
                .then((resp) => {
                    const newCountry = resp.data;
                    dispatch(addCountry(newCountry));
                })
                .catch((err) => {
                    toast.error("Vous n'êtes pas autorisé à ajouter un élément.");
                })
        }
    }


    const getCountries = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setCountry(res.data))
                setIsLoaded(true);
            });
    }



    useEffect(() => {
        getCountries();
    }, []);

    //Bundling datas for card
    const wrapper = {
        deleteAction: deleteCountry,
        updateAction: updateCountry,
        kind: "le pays",
        url: url
    }

    return (
        <section className="right-page">
            <ToastContainer />
            <h2 className='solo-title'>Les pays</h2>
            <div className='solo-container'>
                {isLoaded
                    ? <SimpleArray item={countriesData}
                        wrapper={wrapper} />
                    : <AwaitLoad />
                }
            </div>
            <FormAddSimple
                action={addAction}
            />
        </section>
    )
}

export default CountryContainer