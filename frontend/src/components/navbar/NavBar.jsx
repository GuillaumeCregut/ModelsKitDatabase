import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ranks from '../../feature/ranks';
import './NavBar.scss';
import Welcome from '../welcome/Welcome';

export const NavBar = () => {
    const {auth}=useAuth();
    return (
        <nav className="navbar-container">
            <div className="navlink-container">
                <input type="checkbox" className="toggle-btn"></input>
                <div className="burger-menu"></div>
                <ul className="menu">
                    <li><NavLink to='accueil'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Accueil</NavLink></li>
                    <li><NavLink to='params'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Paramètres</NavLink></li>
                    <li><NavLink to='profil'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Mon profil</NavLink></li>
                    <li><NavLink to='kits'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Mes kits</NavLink></li>
                    {auth?.rank===ranks.admin?<li><NavLink to='admin'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Admin</NavLink></li>:null}
                </ul>
            </div>
            <Welcome />
        </nav>
    )
}
