import React from 'react'
import useAuth from '../../../hooks/useAuth';
import ranks from '../../../feature/ranks';

import './UpDateRemoveBtn.scss';

const UpDateRemoveBtn = ({deleteAction,updateAction}) => {

    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if(!rankUser)
        rankUser=0;
    return (
       rankUser===ranks.admin && <div className="btn-container">
            <button onClick={updateAction}>Modifier</button>
            <button onClick={deleteAction}>Supprimer</button>
        </div>
        
    )
}

export default UpDateRemoveBtn
