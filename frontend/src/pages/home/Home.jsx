import React from 'react'
import screenSignup from '../../assets/pictures/screens/signup.png';
import screenLogin from '../../assets/pictures/screens/login.png';
import screenBuilder from '../../assets/pictures/screens/constructeurs.png';
import scrennModel from '../../assets/pictures/screens/modeles.png';
import screenProfil from '../../assets/pictures/screens/profil.png';
import screenProvider from '../../assets/pictures/screens/fournisseurs.png';
import screenOrder from '../../assets/pictures/screens/commande.png';
import screenGenerator from '../../assets/pictures/screens/generateur.png';
import screenManagement from '../../assets/pictures/screens/gestion.png';
import screenPdf from '../../assets/pictures/screens/pdf.png';
import screenStats from '../../assets/pictures/screens/statistiques.png';
import screenStock from '../../assets/pictures/screens/stock.png';
import screenFinished from '../../assets/pictures/screens/termines.png';
import heroImage from '../../assets/pictures/home-hero.png';
import './Home.scss';

export const Home = () => {
  return (
    <div className='home-container'>
      <main className='home-section'>
        <h1 className="home-title">Models Kit Database</h1>
        <section className='hero-section'>
          <img src={heroImage} alt="toto" className='hero-picture'/>
          <p className="hero-text">
            Notre solution simple et intuitive vous facilitera la gestion de votre stock de maquettes.<br />
            Laissez votre création s'envoler, Models kit database vous permettra de connaitre à tout moment l'état de votre stock, planifier vos achats et vous garderez une trace de vos investissements.<br />
            Vous pourrez stocker les photos de vos montages terminés afin de les partager au sein de la communauté.<br />
            Rejoignez nous dès maintenant pour profiter de l'expérience.
          </p>
        </section>
      </main>
      <section className="screen-container">
          <article className="sreen-app">
            {/* <section className="step-item">
              <div className="text-item">
              </div>
              <div className="picture-item">
                <img src={} alt="" className="screen-picture" />
              </div>
            </section> */}
            <section className="step-item">
              <div className="text-item">
                Notre système vous propose de gérer une liste de kits partagée, à partir de laquelle vous pouvez gérer votre propre stock.<br />
                Sur la page paramètre, vous pouvez visualiser et gérer les différents éléments nécessaire à la création d'un kit, par exemple les constructeurs
              </div>
              <div className="picture-item">
                <img src={screenBuilder} alt="paramètres" className="screen-picture" />
              </div>
            </section> 
            <section className="step-item">
              <div className="text-item">
                La liste des modèles proposés est créée par les utilistateurs. Un kit est manquant ? Rajouter le simplement !
              </div>
              <div className="picture-item">
                <img src={scrennModel} alt="modèles" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Bien évidemment, vous pouvez modifier vos informations personnelles à tout moment. Sur la page mon profil, vous pouvez visualiser ces informations et les modifier à tout moment.
              </div>
              <div className="picture-item">
                <img src={screenProfil} alt="" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Vous pouvez gérer vos fournisseurs habituels, simplement. Ces informations vous permettrons de pouvoir génrer un suivi d'achat.
              </div>
              <div className="picture-item">
                <img src={screenProvider} alt="fournisseurs" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Vous achetez un nouveau kit, voir une liste de kits ? Saisissez la commande dans le logiciel, vous garderez une trace de l'achat.
              </div>
              <div className="picture-item">
                <img src={screenOrder} alt="commandes" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Vous pouvez consulter vos statistiques.
              </div>
              <div className="picture-item">
                <img src={screenStats} alt="statistiques" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Ces statistiques et d'autres, comme l'état de votre stock, peuvent être regroupées dans un livet pdf généré automatiquement et en direct.
              </div>
              <div className="picture-item">
                <img src={screenPdf} alt="pdf" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Enfin, sur la page de gestion de kit, vous pouvez gérer votre stock, simplement en faisant glisser vos kits dans la case qui correspond.
              </div>
              <div className="picture-item">
                <img src={screenManagement} alt="gestion stock" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Lorsqu'un kit est terminé, vous pouvez rajouter jusqu'à 4 photos du kit fini.
              </div>
              <div className="picture-item">
                <img src={screenFinished} alt="modèles terminés" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Si vous manquez d'inspiration pour commencer un nouveau kit, laisserz l'application vous proposer un kit au hasard dans votre stock.<br />
                Si le kit vous convient, un simple clic vous le mets en mode établi.
              </div>
              <div className="picture-item">
                <img src={screenGenerator} alt="générateur aléatoire" className="screen-picture" />
              </div>
            </section>

            <section className="step-item">
              <div className="text-item">Vous souhaitez nous rejoindre ?<br />D'abord, enregistrez vous. Aucune information personnelle n'est utilisée à des fins extérieures</div>
              <div className="picture-item">
                <img src={screenSignup} alt="sign up" className="screen-picture" />
              </div>
            </section>
            <section className="step-item">
              <div className="text-item">
                Ensuite, sur la page login, vous pouvez vous connecter.
              </div>
              <div className="picture-item">
                <img src={screenLogin} alt="login" className="screen-picture" />
              </div>
            </section>
          </article>
        </section>
    </div>

  )
}
