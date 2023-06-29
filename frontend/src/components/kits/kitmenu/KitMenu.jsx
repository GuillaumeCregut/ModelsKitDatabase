import { NavLink } from 'react-router-dom';

const KitMenu = () => {
    return (
        <div className='left-menu'>
            <ul className="left-links-container">
                <li className="link-param-item">
                    <NavLink to="gestion" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Gestion du stock</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="ordered" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits commandés</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="inStock" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits en stock</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="wip" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits en cours</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="random" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Choisir un kit</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="finis" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits terminés</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default KitMenu
