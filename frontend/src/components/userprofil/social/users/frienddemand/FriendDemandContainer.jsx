import { useState, useEffect } from 'react';
import FriendDemand from './FriendDemand';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { AwaitLoad } from '../../../../awaitload/AwaitLoad';

import './FriendDemandContainer.scss';

const FriendDemandContainer = ({ setReload, reload }) => {
    const axiosPrivate = useAxiosPrivate();
    const [demandList, setDemandList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getDemands = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}friends/demands`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setDemandList(resp.data);
                    setLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getDemands();
    }, [reload]);

    return (
        <div className='friend-demand-container'>
            <h3 className='demand-title'>Demandes d'amis reçues</h3>
            <div className="friend-demand-card-container">
                {
                    loaded
                        ? (demandList.map((demand) => (
                            <FriendDemand setReload={setReload} key={demand.id} user={demand} />
                        ))
                        )
                        : <AwaitLoad />
                }

            </div>
        </div>
    )
}

export default FriendDemandContainer
