import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ranks from '../../feature/ranks';
import Login from '../../components/login/Login';

import './AdminPage.scss';
import AdminMenu from '../../components/admin/adminmenu/AdminMenu';

const AdminPage = () => {
    const { auth } = useAuth();
    const rankUser = auth?.rank;
   
    return (
        <div className='admin'>
            {rankUser === ranks.admin
                ? <AdminMenu />
                : null}
            {rankUser === ranks.admin
                ? <Outlet />
                : <Login />
            }
        </div>
    )
}

export default AdminPage
