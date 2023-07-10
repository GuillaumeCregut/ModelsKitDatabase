import React, { useState, useRef, useEffect } from 'react';
import {FaCheck, FaTimes, FaInfoCircle} from 'react-icons/fa';
import axios from "axios";
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import {MdVisibilityOff,MdVisibility} from "react-icons/md";

import './SignUp.scss';

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [validLogin, setValidLogin] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [pwd1Focus, setPwd1Focus] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);
    const [showPassword,setShowPassword]=useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = PWD_REGEX.test(password1);
        setValidPwd(result);
        const match = password1 === password2;
        setValidMatch(match);
    }, [password1, password2])


    useEffect(() => {
        const result = USER_REGEX.test(login);
        setValidLogin(result);
    }, [login])

    useEffect(() => {
        setErrMsg('');
    }, [login, password1, password2])


    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

    const handleSubmit =  (e) => {
        e.preventDefault();
        if ((firstname !== '') && (lastname !== '') && (email !== '') && (login !== '') && (password1 !== '') && (password2 !== '')) {
            //Controle des mots de passe
            const u1 = USER_REGEX.test(login);
            const p1 = PWD_REGEX.test(password1) && (password1 === password2);
            if (!u1 || !p1) {
                setErrMsg('Le formulaire est invalide')
            }
            //axios
            else {
                //create  data
                const newUser={
                    firstname:firstname,
                    lastname:lastname,
                    login:login,
                    password:password1,
                    email:email
                }
                const url = `${import.meta.env.VITE_APP_API_URL}users/`;
                axios
                .post(url,newUser)
                .then ((res)=>{
                    setSuccess(true);
                })
                .catch((err)=>{
                    if(!err.response){
                       setErrMsg(err.message)
                    }
                    if (err.response?.status){
                        //Afficher le message d'erreur
                        let errorMsg=err.response?.data;
                        if(!errorMsg)
                            errorMsg="Une erreur serveur est survenue."
                        switch(err.response.status){
                            case 409 : setErrMsg("cet utilisateur existe déjà");
                                break;
                            case 422 : setErrMsg(errorMsg);
                                break;
                            case 500 : setErrMsg("Une erreur serveur est survenue.");
                                break;
                            default : setErrMsg('Une erreur inattendue est survenue');
                        }
                        errRef.current.focus();
                    }
                })
            }
        } else {
            setErrMsg('Le formulaire est invalide. Veuillez remplir tous les champs')
        }
    }

    return (
        <>
            {success ? (
                <section>
                    Votre compte à bien été créé, vous pouvez dorénavant vous connecter.
                </section>
            ) : (
                <section className='signup-container'>
                    <h2 className="signup-title">Enregistrez vous</h2>
                    <p ref={errRef} className={errMsg ? 'signup-err' : 'signup-err-off'} aria-live="assertive">{errMsg}</p>
                    <form className='form-signup' onSubmit={handleSubmit}>
                        <label htmlFor="firstname" className='form-signup-label'>Prénom :
                            <input
                                type="text"
                                className='form-signup-input'
                                id="firstname"
                                value={firstname}
                                onChange={(e) => { setFirstname(e.target.value) }}
                                autoComplete='off'
                                ref={userRef}
                                placeholder="prénom"
                                required />
                        </label>
                        <label htmlFor="lastname" className='form-signup-label'>Nom :
                            <input
                                type="text"
                                className='form-signup-input'
                                id="lastanme"
                                value={lastname}
                                onChange={(e) => { setLastname(e.target.value) }}
                                autoComplete='off'
                                placeholder="nom"
                                required />
                        </label>
                        <label htmlFor="email" className='form-signup-label'>Adresse mail :
                            <input
                                type="text"
                                className='form-signup-input'
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                autoComplete='off'
                                placeholder="email"
                                required />
                        </label>
                        <label htmlFor="login" className='form-signup-label'><span>Login :
                            <FaCheck className={validLogin ? "signup-valid" : "signup-hide"}/>
                            <FaTimes className={validLogin || !login ? "signup-hide" : "signup-invalid"} /></span>
                            <input
                                type="text"
                                className='form-signup-input'
                                id="login"
                                value={login}
                                onChange={(e) => { setLogin(e.target.value) }}
                                autoComplete='off'
                                placeholder="login"
                                aria-invalid={validLogin ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setLoginFocus(true)}
                                onBlur={() => setLoginFocus(false)}
                                required />
                        </label>
                        <p id="uidnote" className={loginFocus && login && !validLogin ? "signup-instruction" : "signup-err-off"}>
                        <FaInfoCircle/> Doit être de 4 à 24 caractères, doit commencer par une lettre.<br />
                            Lettres, nombres underscore et tirets sont autorisés.
                        </p>
                        <label htmlFor="password1" className='form-signup-label'><span>Mot de passe
                            <FaCheck className={validPwd ? "signup-valid" : "signup-hide"} />
                            <FaTimes className={validPwd || !password1 ? "signup-hide" : "signup-invalid"} /></span>
                            <input
                                type={showPassword?"text":"password"}
                                className='form-signup-input'
                                placeholder='Mot de passe'
                                value={password1}
                                onChange={(e) => { setPassword1(e.target.value) }}
                                id="password1"
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwd1Focus(true)}
                                onBlur={() => setPwd1Focus(false)}
                                required />
                                <IconButton onClick={()=>setShowPassword(!showPassword)}>{!showPassword?<MdVisibility />:<MdVisibilityOff />}</IconButton>
                        </label>
                        <p id="pwdnote" className={pwd1Focus && password1 && !validPwd ? "signup-instruction" : "signup-err-off"}>
                            Doit être de 8 à 24 caractères, Doit inclure une majuscule, un chiffre et un caractère spécial.<br />
                            Sont autorisés : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="password2" className='form-signup-label'><span>Mot de passe (vérification) :
                            <FaCheck className={validMatch && password2 && validPwd ? "signup-valid" : "signup-hide"} />
                            <FaTimes className={validMatch || !password2 ? "signup-hide" : "signup-invalid"} /></span>
                            <input
                                type="password"
                                className='form-signup-input'
                                placeholder='Vérification'
                                value={password2}
                                onChange={(e) => { setPassword2(e.target.value) }}
                                id="password2"
                                aria-invalid={validMatch ? "false" : "true"}
                                required />
                        </label>
                        <button
                            className={validLogin && validPwd && validMatch && firstname !== '' && lastname !== '' && email !== '' ? 'form-signup-btn form-signup-btn-valid':"form-signup-btn"}
                            disabled={!validLogin || !validPwd || !validMatch || firstname === '' || lastname === '' || email === '' ? true : false}
                        >Valider</button>
                    </form>
                    <p className='signup-info'>Vous avez déjà un compte ? <Link to='/login'>Connectez vous !</Link></p>
                </section>
            )}
        </>
    )
}

export default SignUp