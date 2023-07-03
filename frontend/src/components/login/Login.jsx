import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import { MdVisibilityOff, MdVisibility, MdLogin } from "react-icons/md";

import './Login.scss';

const Login = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const { setAuth } = useAuth();
    const loginRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        loginRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [login, pass])

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_APP_API_URL}auth/`;
        if (login === '' || pass === '') {
            toast.info('Veuillez remplir tous les champs');
        }
        else {
            const data = {
                login: login,
                password: pass
            }
            axios.post(url, data, { withCredentials: true })
                .then((resp) => {
                    if (resp?.data) {
                        const token = resp.data?.accessToken;
                        var decoded = jwt_decode(token);
                        const user = {
                            firstname: decoded.firstname,
                            lastname: decoded.lastname,
                            id: decoded.user_id,
                            rank: decoded.rank,
                            token: { accessToken: token }
                        }
                        setAuth(user);
                        const userToStorage = {
                            firstname: decoded.firstname,
                            lastname: decoded.lastname
                        }
                        localStorage.setItem('ModelsKitUser', JSON.stringify(userToStorage))
                        navigate('/');
                    }
                })
                .catch((err) => {
                    let errorMessage = '';
                    switch (err?.response?.status) {
                        case 401: errorMessage = "Login ou mot de passe invalide";
                            break;
                        case 404: errorMessage = "Utilisateur inexistant";
                            break;
                        case 422: errorMessage = "Erreur dans les données fournies";
                    }
                    setErrMsg(errorMessage);
                    errRef.current.focus();
                })
        }
    }

    return (
        <section className='login-container'>
            <h2 className="login-title">Connexion</h2>
            <p className={errMsg ? "login-error-msg" : "login-hide"} aria-live="assertive" ref={errRef}>{errMsg} </p>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="login" className="login-label">
                    <input
                        type="text"
                        className="input-login-form"
                        placeholder='login'
                        id="login"
                        required
                        autoComplete='off'
                        ref={loginRef}
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="login-label">
                    <span className="login-pwd">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-login-form"
                            placeholder='Mot de passe'
                            id="password"
                            required
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <IconButton onClick={() => { setShowPassword(!showPassword) }} > {!showPassword ? <MdVisibility /> : <MdVisibilityOff />} </IconButton>
                    </span>
                </label>
            </form>
            <div className="login-btn-container">
                <IconButton onClick={handleSubmit}><MdLogin className='login-btn' /></IconButton>
            </div>
            <p className="login-footer">
                Pas encore de compte ? <Link to='/signup'>Inscrivez-vous</Link>
            </p>
        </section>
    )
}

export default Login
