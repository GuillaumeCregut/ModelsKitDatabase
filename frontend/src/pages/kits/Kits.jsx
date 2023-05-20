import { Outlet } from 'react-router-dom';
import KitMenu from '../../components/kits/kitmenu/KitMenu';
import Login from '../../components/login/Login';
import useAuth from '../../hooks/useAuth';

import './Kits.scss';

export const Kits = () => {
  const {auth}=useAuth();
  const idUser=auth?.id;

  return (
    <div className='kits'>
      <KitMenu />
      {idUser 
        ?<Outlet />
        :<Login />
      }
    </div>
  )
}
