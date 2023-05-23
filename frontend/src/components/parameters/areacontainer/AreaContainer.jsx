import axios from 'axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import { addPeriod, setPeriod, updatePeriod, deletePeriod } from '../../../feature/Period.slice';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';
import { ToastContainer, toast } from 'react-toastify';


const AreaContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const periodsData = useSelector((state) => state.periods.period);
    const url = `${import.meta.env.VITE_APP_API_URL}period`;
    const axiosPrivate = useAxiosPrivate();

    const addAction = (newData) => {
        if (window.confirm("Voulez vous ajouter l'élément ?")) {
            axiosPrivate
                .post(url, newData)
                .then((resp) => {
                    const newPeriod = resp.data;
                    dispatch(addPeriod(newPeriod));
                })
                .catch((err) => {
                    toast.error("Vous n'êtes pas autorisé à ajouter un élément.")
                })
        }
    }

    const getPeriods = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setPeriod(res.data))
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        getPeriods();
    }, []);

    //Bundling datas for card
    const wrapper = {
        deleteAction: deletePeriod,
        updateAction: updatePeriod,
        kind: "la période",
        url: url
    }


    return (
        <section className="right-page">
            <ToastContainer />
            <h2 className='solo-title'>Les périodes</h2>
            <div className='solo-container'>
                {isLoaded ? periodsData.map(item => (
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

export default AreaContainer
