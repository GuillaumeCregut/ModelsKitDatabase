import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ChartPie from './chartspie/ChartPie';
import { ToastContainer, toast } from 'react-toastify';

import './Statistics.scss';

const Statistics = () => {
    const [allStats, setAllStats] = useState({});
    const [loaded,setLoaded]=useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    let userId = auth?.id;
    if (!userId)
        userId = 0;
    useEffect(() => {
        const getStats = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}model/info/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setAllStats(resp.data);
                    setLoaded(true)
                })
                .catch((err) =>  toast.error('Une erreur est survenue'))
        }
        getStats();
    }, [])


    return (

        <div className='stat-container'>
            <ToastContainer />
            <h2 className='stat-title'>Statistiques</h2>
            <div className='pies-container'>
                {loaded && <ChartPie data={allStats.state} title='Etat' color="#82ca9d"/>}
                {loaded && <ChartPie data={allStats.brand} title='Marques' color="#82ca9d"/>}
                {loaded && <ChartPie data={allStats.period} title='Périodes' color="#82ca9d" />}
                {loaded && <ChartPie data={allStats.category} title='Catégories' color="#82ca9d"/>}
                {loaded && <ChartPie data={allStats.provider} title='Fournisseur' color="#82ca9d"/>}
                {loaded && <ChartPie data={allStats.scale} title='Echelle' color="#82ca9d"/>}
            </div>
{loaded.price&&<p>Prix total de la collection* : {allStats.price} euros</p>}
<p className="nota">(*) Selon les prix fournis dans le logiciel</p>
        </div>
    )
}

export default Statistics
