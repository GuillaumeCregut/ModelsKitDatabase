import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import { toast } from 'react-toastify';

import './FinishedModel.scss';

const FinishedModel = () => {
    const [listModel, setListModel] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    let userId = auth.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        const getModelsUSer = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}models/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setListModel(resp.data);
                    setIsLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getModelsUSer();
    }, []);


    return (
        <div className='finished-models'>
            <div className="finished-top-page">
                <h2>Modèles finis</h2>
                <div className="list-finished-model-container">
                    <ul className='list-finished-model'>
                        {isLoaded
                        ?listModel.filter(item => item.state === 3).map((item) => (
                            <Link to={`details/${item.id}`} key={item.id}> <li className='list-finished-item'>{item.modelName}</li></Link>
                        ))
                        :<AwaitLoad />}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FinishedModel
