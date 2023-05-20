import { useEffect, useState } from 'react';
import axios from 'axios';
import { setBrand } from '../../../feature/Brand.slice';
import { useDispatch, useSelector } from 'react-redux';

import "./BrandSelector.scss";

const BrandSelector = ({ selectedBrand, setSelectedBrand,id }) => {
    const [brandLoaded, setBrandLoaded] = useState(false);
    const brandData = useSelector((state) => state.brands.brand);
    const dispatch = useDispatch();

    useEffect(() => {
        const getBrands = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}brand`;
            axios.get(url)
                .then((res) => {
                    dispatch(setBrand(res.data))
                    setBrandLoaded(true);
                });
        }
        if (!brandData) {
            getBrands();
        }
        else
            setBrandLoaded(true);
    }, [])

    return (
        <select
            id={id}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className='brand-selector'
        >
            <option value="0">--</option>
            {brandLoaded
                ? brandData.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.name}</option>
                ))
                : null
            }
        </select>
    )
}

export default BrandSelector
