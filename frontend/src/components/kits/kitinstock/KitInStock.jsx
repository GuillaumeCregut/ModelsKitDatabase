import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AwaitLoad } from "../../awaitload/AwaitLoad";
import { setStock } from "../../../feature/stockUser.slice";
import KitCard from "../kitmgmt/kitcard/KitCard";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'react-toastify';

import './KitInStock.scss';

const KitInStock = ({keySearch,title}) => {
    const [refresh, setRefresh]=useState(false);
    const [kits, setKits] = useState([]);
    const [search, setSearch]=useState('');
    const [filteredKits,setFilteredKits]=useState([]);
    const StocksData = useSelector((state) => state.stockUsers.stockUser);
    const [isLoaded, setIsLoaded] = useState(false);
    const { auth } = useAuth();
    const dispatch=useDispatch();
    const axiosPrivate = useAxiosPrivate();
    let userId = auth?.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        const getModelsUser = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}model/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setKits(resp.data.filter(item => item.state === keySearch));
                    dispatch(setStock(resp.data))
                    setIsLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        if(! StocksData)
            getModelsUser();
        else{
            setIsLoaded(true);
            setKits(StocksData.filter(item => item.state === keySearch));
        }
    }, [keySearch,refresh]);

    useEffect(()=>{
        setFilteredKits(kits.filter((kit)=>kit.modelName.toLowerCase().includes(search.toLowerCase())))
    },[search,kits])

    return (
        <div className="kit-instock">
             Kits {title}: {kits.length}
            <div className="filter">
                <label htmlFor="filter">
                   Recherche par nom : <input type="text" id="filter"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </label>
            </div>
          
           <ul className="list-kit-in-stock">
            { isLoaded
                ? filteredKits.map((kit)=>(
                    <li key={kit.id}>
                        <KitCard kitDetails={kit} displayImage={true} refresh={refresh} setRefresh={setRefresh}/>
                    </li>
                ))
                : <AwaitLoad />
            }
           </ul>
        </div>
    )
}

export default KitInStock
