import axios from 'axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addScale, setScale, updateScale, deleteScale } from '../../../feature/Scale.slice';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';
import { toast } from 'react-toastify';
import SimpleArray from '../simplecardcontainer/SimpleArray';


const ScaleContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const scalesData = useSelector((state) => state.scales.scale);
    const url = `${import.meta.env.VITE_APP_API_URL}scales`;
    const axiosPrivate = useAxiosPrivate();

    const addAction = (newData) => {
            axiosPrivate
                .post(url, newData)
                .then((resp) => {
                    const newScale = resp.data;
                    dispatch(addScale(newScale));
                })
                .catch((err) => {
                    toast.error("Vous n'êtes pas autorisé à ajouter un élément.")
                })
    }

    const getScales = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setScale(res.data))
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        getScales();
    }, []);

    const wrapper = {
        deleteAction: deleteScale,
        updateAction: updateScale,
        kind: "l'échelle'",
        url: url
    }


    return (
        <section className="right-page">
            <h2 className='solo-title'>Les échelles</h2>
            <div className='solo-container'>
                {isLoaded
                    ? <SimpleArray item={scalesData} wrapper={wrapper} />
                    : <AwaitLoad />
                }
            </div>
            <FormAddSimple
                action={addAction}
            />
        </section>
    )
}

export default ScaleContainer
