import React from 'react'

import {Navigate, Outlet,useLocation} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const RequireAuth = ({allowedRoles}) => {
    const {auth}=useAuth();
    const location=useLocation();
    return (
       
             auth?.rank===allowedRoles
            ?<Outlet />
            :<Navigate to='/login' state={{from:location}} replace /> 
       
    )
}

export default RequireAuth
