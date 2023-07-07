import { NavLink } from 'react-router-dom';

const ProfilMenu = () => {
    return (
        <nav className='left-menu'>
            <ul className="left-links-container">
                <li className="link-profil-item"><NavLink to='/profil/infos' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Mes informations</NavLink></li>
                <li className="link-profil-item"><NavLink to='fournisseurs' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Mes fournisseurs</NavLink></li>
                <li className="link-profil-item"><NavLink to='commandes' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Mes commandes</NavLink></li>
                <li className="link-profil-item"><NavLink to='statistiques' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Statistiques</NavLink></li>
                <li className="link-profil-item"><NavLink to='pdf' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Statistiques en pdf</NavLink></li>
                <li className="link-profil-item"><NavLink to='amis' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Réseau social</NavLink></li>
            </ul>
        </nav>
    )
}

export default ProfilMenu
