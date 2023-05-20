import React from 'react'
import './Footer.scss';
import logo from '../../assets/pictures/logo-mini.gif';
export const Footer = () => {
  return (
    <footer className="footer-page">
       <img src={logo} alt="Logo" /> <span className='copyright'>(c) 2023 Editiel 98</span>
    </footer>
  )
}
