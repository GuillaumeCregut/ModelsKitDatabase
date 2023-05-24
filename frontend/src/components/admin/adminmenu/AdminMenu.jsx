import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <nav className='left-menu'>
            <ul className="left-links-container">
                <li className="link-param-item">
                    <NavLink to="logs" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Logs serveur</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="users" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Gestion des utilisateurs</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AdminMenu
