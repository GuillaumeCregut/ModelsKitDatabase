import React from 'react'
import useAuth from '../../../hooks/useAuth';
import ranks from '../../../feature/ranks';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";

import './UpDateRemoveBtn.scss';

const UpDateRemoveBtn = ({deleteAction,updateAction}) => {

    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if(!rankUser)
        rankUser=0;
    return (
       rankUser===ranks.admin && <div className="btn-container">
            <IconButton onClick={updateAction}><RxUpdate className='update-rm-btn'/></IconButton>
            <IconButton onClick={deleteAction}><FaTrash className='update-rm-btn'/></IconButton>
        </div>
        
    )
}

export default UpDateRemoveBtn
