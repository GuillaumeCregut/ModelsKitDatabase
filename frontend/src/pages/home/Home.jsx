import React from 'react'

import heroImage from '../../assets/pictures/home-hero.png';
import './Home.scss';

export const Home = () => {
  return (
    <div className='home-container'>
      <main className='home-section'>
        <h1 className="home-title">Models Kit Database</h1>
        <section className='hero-section'>
          <img src={heroImage} alt="toto" />
          <p className="hero-text">
            Notre solution simple et intuitive vous facilitera la gestion de votre stock de maquettes.<br />
            Laissez votre création s'envoler, Models kit database vous permettra de connaitre à tout moment l'état de votre stock, planifier vos achats et vous garderez une trace de vos investissements.<br />
            Vous pourrez stocker les photos de vos montages terminés afin de les partager au sein de la communauté.<br />
            Rejoignez nous dès maintenant pour profiter de l'expérience.
          </p>
        </section>
        <section className="screen-container">
          <article className="sreen-app">
          </article>
        </section>
      </main>
    </div>

  )
}
