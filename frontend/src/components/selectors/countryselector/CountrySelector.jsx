import { useEffect, useState } from 'react';
import axios from 'axios';
import { setCountry } from '../../../feature/Country.slice';
import { useDispatch, useSelector } from 'react-redux';

import './CountrySelector.scss';

const CountrySelector = ({ selectedCountry, setSelectedCountry, id }) => {
    const [countryLoaded, setCountryLoaded] = useState(false);
    const countryData = useSelector((state) => state.countries.country);
    const dispatch = useDispatch();

    useEffect(() => {
        //Loading countries if null
        const getCountries = () => {
            const urlCountry = `${import.meta.env.VITE_APP_API_URL}country`;
            axios.get(urlCountry)
                .then((res) => {
                    dispatch(setCountry(res.data))
                    setCountryLoaded(true);
                });
        }
        if (!countryData) {
            getCountries();
        }
        else
            setCountryLoaded(true);
    }, [])

    return (
        <select
            id={id}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className='country-selector'
        >
            <option value="0">--</option>
            {countryLoaded
                ? countryData.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.name}</option>
                ))
                : null
            }
        </select>
    )
}

export default CountrySelector
