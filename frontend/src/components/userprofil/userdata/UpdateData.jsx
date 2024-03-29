import { useState, useEffect, useRef } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './UpdateData.scss';
import UpdateAvatar from './UpdateAvatar';

const UpdateData = ({ user, cancelAction, updateUser }) => {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [login, setLogin] = useState(user.login);
    const [email, setEmail] = useState(user.email);
    const [isPwdChecked, setIsPwdChecked] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [validLogin, setValidLogin] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [pwd1Focus, setPwd1Focus] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [visible, setVisible] = useState(user.isVisible === 1);
    const [allow, setAllow] = useState(user.allow === 1);
    const errRef = useRef();

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

    useEffect(() => {
        const result = PWD_REGEX.test(pass1);
        setValidPwd(result);
        const match = pass1 === pass2;
        setValidMatch(match);
    }, [pass1, pass2]);

    useEffect(() => {
        const result = USER_REGEX.test(login);
        setValidLogin(result);
    }, [login])

    useEffect(() => {
        setErrMsg('');
    }, [login, pass1, pass2, isPwdChecked])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validLogin) {
            let shouldSend = true;
            const newUser = {
                login,
                firstname,
                lastname,
                email,
                isVisible: visible,
                allow
            }
            if (isPwdChecked) {
                if (pass1 === pass2 && validPwd && pass1 !== "") {
                    newUser.password = pass1;
                }
                else {
                    shouldSend = false;
                    setErrMsg("les mots de passes ne sont pas valides");
                }
            }
            if (shouldSend) {
                updateUser(newUser)
            }
        }
        else {
            setErrMsg("Le login n'est pas bon");
        }
    }

    return (
        <div className='update-user-info-container'>
            <h3 className='update-user-info-title'>Mon profil : Modifications</h3>
            <p ref={errRef} className={errMsg ? 'signup-err' : 'signup-err-off'} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit} className='update-user-info-form'>
                <label htmlFor='lastname'>Nom :
                    <Input
                        id='lastname'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        autoComplete='off'
                        className='input-user'
                    />
                </label>
                <label htmlFor='firstname'>Prénom :
                    <Input
                        id='firstname'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        autoComplete='off'
                        className='input-user'
                    />
                </label>
                <label htmlFor='login'><span>Login :
                    <FaCheck className={validLogin ? "signup-valid" : "signup-hide"} />
                    <FaTimes className={validLogin || !login ? "signup-hide" : "signup-invalid"} /></span>
                    <Input
                        id='login'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        onFocus={() => setLoginFocus(true)}
                        onBlur={() => setLoginFocus(false)}
                        autoComplete='off'
                        className='input-user'
                    />
                </label>
                <p id="uidnote" className={loginFocus && login && !validLogin ? "signup-instruction" : "signup-err-off"}>
                    <FaInfoCircle /> Doit être de 4 à 24 caractères, doit commencer par une lettre.<br />
                    Lettres, nombres underscore et tirets sont autorisés.
                </p>
                <label htmlFor='email'>Email :
                    <Input
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='off'
                        className='input-user'
                    />
                </label>
                <div className="user-options">
                    <FormControlLabel control={<Checkbox checked={visible} onChange={() => setVisible(!visible)} />} label="Les autres utilisateurs peuvent me contacter" />
                    <FormControlLabel control={<Checkbox checked={allow} onChange={() => setAllow(!allow)} />} label="Autoriser la visibilité des commentaires" />
                </div>
                <label htmlFor='change-password'>Modifier le mot de passe ? <input type="checkbox" id="change-password" checked={isPwdChecked} onChange={e => setIsPwdChecked(!isPwdChecked)} /> </label>
                {isPwdChecked
                    ? <><label htmlFor='pass1'><span>Nouveau Mot de passe :
                        <FaCheck className={validPwd ? "signup-valid" : "signup-hide"} />
                        <FaTimes className={validPwd || !pass1 ? "signup-hide" : "signup-invalid"} /></span>
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="pass1"
                            value={pass1}
                            onChange={(e) => setPass1(e.target.value)}
                            onFocus={() => setPwd1Focus(true)}
                            onBlur={() => setPwd1Focus(false)}
                            className='input-user'
                            endAdornment={<InputAdornment position="end">
                                <IconButton aria-label='toggle pawword visibility' onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        !showPassword ? <MdVisibility /> : <MdVisibilityOff />
                                    }
                                </IconButton>
                            </InputAdornment>}
                        />
                    </label>
                        <p id="pwdnote" className={pwd1Focus && pass1 && !validPwd ? "signup-instruction" : "signup-err-off"}>
                            Doit être de 8 à 24 caractères, Doit inclure une majuscule, un chiffre et un caractère spécial.<br />
                            Sont autorisés : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>
                        <label htmlFor='pass2'><span>Nouveau mot de passe (vérification) :
                            <FaCheck className={validMatch && pass2 && validPwd ? "signup-valid" : "signup-hide"} />
                            <FaTimes className={validMatch || !pass2 ? "signup-hide" : "signup-invalid"} /></span>
                            <Input
                                type="password"
                                id="pass2"
                                value={pass2}
                                onChange={(e) => setPass2(e.target.value)}
                                className='input-user'
                            />
                        </label>
                    </>
                    : null
                }
                <Button className='update-user-data user-btn' variant="contained" onClick={handleSubmit}>Valider</Button>
            </form>
            <div className="change-avatar">
                <h3>Changer mon avatar </h3>
                <UpdateAvatar user={user} />
            </div>
            <Button variant="contained" className='user-btn' onClick={() => cancelAction(false)}> Annuler</Button>
        </div>
    )
}

export default UpdateData
