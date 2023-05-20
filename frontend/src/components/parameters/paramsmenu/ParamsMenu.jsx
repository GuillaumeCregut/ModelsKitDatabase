import { NavLink } from 'react-router-dom';
import './ParamsMenu.scss';
const ParamsMenu = () => {
    return (
        <div className="params-menu">
            <ul className="params-links-container">
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
