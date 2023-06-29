import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { addBuilder, setBuilder } from '../../../feature/Builder.slice';
import useAuth from '../../../hooks/useAuth';
import ranks from '../../../feature/ranks';
import CountrySelector from '../../selectors/countryselector/CountrySelector';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { MdFormatListBulletedAdd } from "react-icons/md";

import './BuilderContainer.scss';
import BuilderTable from './BuilderTable';
import { Input } from '@mui/material';

const BuilderContainer = () => {
    const url = `${import.meta.env.VITE_APP_API_URL}builder`;
    const [isLoaded, setIsLoaded] = useState(false);
    const [findElement, setFindElement] = useState('');
    const [filteredBuiler, setFilteredBuilder] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [newBuilder, setNewBuilder] = useState('');
    const buildersData = useSelector((state) => state.builders.builder);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;

    useEffect(() => {
        const getBuilders = () => {
            axios
                .get(url)
                .then((res) => {
                    dispatch(setBuilder(res.data));
                    setIsLoaded(true);
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        if (!buildersData)
            getBuilders();
        else
            setIsLoaded(true);
    }, []);

    useEffect(() => {
        let tempBuilder = [];
        if (isLoaded) {
            tempBuilder = buildersData.filter((item) => item.name.toLowerCase().includes(findElement.toLowerCase()))
        }
        setFilteredBuilder([...tempBuilder]);
    }, [findElement, isLoaded, buildersData])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newBuilder !== '' && selectedCountry!==0) {
            const addNewBuilder = {
                name: newBuilder,
                country: selectedCountry
            }
            axiosPrivate
                .post(url, addNewBuilder)
                .then((resp) => {
                    const newBuilderDb = resp.data;
                    dispatch(addBuilder(newBuilderDb));
                    setNewBuilder('');
                    setSelectedCountry(0);
                })
                .catch((err) => {
                    toast.error("Vous n'êtes pas autorisé à ajouter un élément.")
                })
        }
        else {
            toast.warn("Veuillez remplir tous les champs");
        }
    }

    return (
        <section className=' right-page builders-container-page'>
            <h2 className='builders-container-title'>Constructeurs</h2>
            <label htmlFor="find-builder" className='builder-search-label'>Rechercher un constructeur :
                <Input

                    id="find-builder"
                    value={findElement}
                    onChange={(e) => setFindElement(e.target.value)}
                    className='find-builder-input'
                />
            </label>
            <div className="builder-container">
                {isLoaded ?
                    <BuilderTable
                        builder={filteredBuiler}
                    />
                    : <AwaitLoad />
                }
            </div>
            {rankUser >= ranks.user
                ?
                <section className='add-builder-container'>
                    <h2 className='add-builder-title'>Ajouter un constructeur</h2>
                    <form className="builder-add-form" onSubmit={handleSubmit}>
                        <label htmlFor="builder-name" className='builder-add-label'>Nom du constructeur :
                            <Input
                                placeholder='Nom'
                                id="builder-name"
                                value={newBuilder}
                                onChange={(e) => setNewBuilder(e.target.value)}
                                required
                                autoComplete='off'
                                className='builder-add-name'
                            />
                        </label>
                        <label htmlFor="country-select" className='builder-add-label'>Pays :
                            <CountrySelector
                                id="country-select"
                                setSelectedCountry={setSelectedCountry}
                                selectedCountry={selectedCountry}
                            />
                        </label>
                        <Button className='builder-add-btn' variant="contained" onClick={handleSubmit}><MdFormatListBulletedAdd className='icon-add-builder-button' />Ajouter</Button>
                    </form>
                </section>
                : null
            }
        </section>
    )
}

export default BuilderContainer
