import { NavLink } from 'react-router-dom';

const ParamsMenu = () => {
    return (
        <div className="left-menu">
            <ul className="left-links-container">
                <li className="link-param-item"><NavLink to="periodes" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Périodes</NavLink></li>
                <li className="link-param-item"><NavLink to="constructeurs" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Constructeurs</NavLink></li>
                <li className="link-param-item"><NavLink to="marques" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Marques</NavLink></li>
                <li className="link-param-item"><NavLink to="categorie" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Catégories</NavLink></li>
                <li className="link-param-item"><NavLink to="echelles" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Echelles</NavLink></li>
                <li className="link-param-item"><NavLink to="pays" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Pays</NavLink></li>
                <li className="link-param-item"><NavLink to="modeles" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Modèles</NavLink></li>
            </ul>
        </div>
    )
}

export default ParamsMenu
