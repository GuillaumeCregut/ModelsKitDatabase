import React, { useRef, useState,useEffect } from 'react';
import axios from 'axios';
import { setCountry } from '../../../feature/Country.slice';
import { useDispatch, useSelector } from 'react-redux';
import close from '../../../assets/pictures/close.png';

import './BuilderModifier.scss';

const BuilderModifier = ({ name, country,action, hide }) => {
    const nameRef = useRef();
    const formRef = useRef();
    const [newName, setNewName] = useState(name);
    const [countryLoaded,setCountryLoaded]=useState(false);
    const [selectedCountry, setSelectedCountry] = useState(country);
    const countryData = useSelector((state) => state.countries.country);
    const dispatch = useDispatch();
    const selectRef=useRef();

    useEffect(()=>{
        const getCountries = () => {
            const urlCountry = `${import.meta.env.VITE_APP_API_URL}country`;
            axios.get(urlCountry)
                .then((res) => {
                    dispatch(setCountry(res.data))
                    setCountryLoaded(true);
                });
        }    
        if(!countryData){
            getCountries();
        }
        else
            setCountryLoaded(true);
    },[])

    const handleClose = () => {
        hide(false);
    }

    const btnStyle={
        backgroundImage:`url(${close})`
    }

    const handleUpdate=(e)=>{
        e.preventDefault();
        const selectedOption=selectRef.current.selectedIndex;
        const countryName=selectRef.current.options[selectedOption].text;
        const newBuilder={
            countryId:selectedCountry,
            name:newName,
            countryName
        }
        action(newBuilder);
    }

    return (
        <div className='form-update-card-container'>
             <form className='form-update-card' onSubmit={handleUpdate} ref={formRef}>
                <label htmlFor="new-name">
                    Nouveau nom : <br />
                    <input
                        type="text"
                        id="new-name"
                        ref={nameRef}
                        value={newName}
                        className="input-name"
                        autoComplete='off'
                        onChange={(e)=>setNewName(e.target.value)}
                        />
                </label>
                <label htmlFor="country-select" className='builder-add-label'>Pays :
                        <select 
                            id="country-select" 
                            ref={selectRef}
                            value={selectedCountry} 
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className='builder-add-select'
                            >
                            {countryLoaded
                                ? countryData.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}>{item.name}</option>
                                ))
                                : null
                            }
                        </select>
                    </label>
                <button>valider</button>
            </form>
            <button onClick={handleClose} className="close-btn" aria-label='Fermer' style={btnStyle}></button>
        </div>
    )
}

export default BuilderModifier
