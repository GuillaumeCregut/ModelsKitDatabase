import React from 'react'
import './Header.scss';
import logo from '../../assets/pictures/logo2.png';


export const Header = () => {
  return (
    <header className="header-page">
      <img src={logo} alt="logo models kit database" className='header-logo' />
       <div className="header-title">Models Kit Database</div>
      
    </header>
  )
}
