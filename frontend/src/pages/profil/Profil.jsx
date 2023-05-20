import React from 'react'
import { Outlet } from 'react-router-dom';
import Login from '../../components/login/Login';
import ProfilMenu from '../../components/userprofil/profilmenu/ProfilMenu';
import useAuth from '../../hooks/useAuth';

import './Profil.scss';

export const Profil = () => {
  const {auth}=useAuth();
  let idUser=auth?.id;
  if(!idUser){
    idUser=0;
  }
  return (
    <main className='profil-page'>
      <ProfilMenu />
      {idUser!==0
      ?<Outlet />
      :<Login />
    }
    </main>
  )
}
