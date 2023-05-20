import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import ranks from "../../../feature/ranks";

import './FormAddSimple.scss';

/**
 * 
 * @param {action}  Action d'ajout à réaliser.
 * 
 * Prend en paramètre une fonction permettant l'ajout dans le store et dans la base de données
 * 
 * @returns 
 */

const FormAddSimple = ({action}) => {
    const [newName,setNewName]=useState('');
    const {auth}=useAuth();
    let rankUser=auth?.rank;
    if (!rankUser){
        rankUser=0;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(newName==='')
            return-1;
        const newData={name:newName}
        action(newData);
        setNewName('');
    }
    
    return (
        rankUser>=ranks.moderate&&<section className='form-add-simple-container'>
            <h3>Nouvel élément</h3>
            <form 
                className='form-add-simple'
                onSubmit={handleSubmit}
            >
            <label htmlFor="new-name">Nom du nouvel élément : 
                <input 
                    type="text" 
                    id="new-name" 
                    value={newName}
                    onChange={(e)=>setNewName(e.target.value)}
                    className="from-add-simple-input"
                />
            </label>
            <button className='form-add-simple-btn'>Ajouter</button>
            </form>
        </section>
    )
}

export default FormAddSimple
