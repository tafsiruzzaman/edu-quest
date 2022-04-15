import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../images/logo_edu1.png';
import './SignIn.css';

const SignIn = () => {
    const { setUser, setError, setUserName, registerNewUser, setIsLoading, processLogin } = useAuth();
    const [name, setName]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isSignin, setIsSignin] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    const handleIsSignin = () => {
        if(isSignin) {
            setIsSignin(false)
        }
        else if (!isSignin) {
            setIsSignin(true)
        };
    };

    const hanldeNameChange = e => {
        setName(e.target.value);
    };

    const handleEmailChange = e => {
        const inputValue = e.target.value;
        const validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(inputValue);
        if(validEmail) {
            setEmail(inputValue);
            setLoginError('');
        }
        else{
            setLoginError('Please input a vlaid email')
        };
    };
    const handlePasswordChange = e => {
        const inputValue = e.target.value;
        if(inputValue.length >= 6) {
            setPassword(inputValue);
            setLoginError('');
        }
        else{
            setLoginError('Password must be at least 6 characters');
        };
    };
    const handleConfirmPassword = e => {
        const inputValue = e.target.value;
        if(inputValue === password) {
            console.log('matched')
            setPasswordMatched(true)
            setLoginError('');
        }
        else{
            console.log('not matched')
            setPasswordMatched(false);
            setLoginError('Password not matched');
        };
    };
    const handleSubmission = e => {
        e.preventDefault();
        if(email && password) {
            if(isSignin) {
                goSignIn();
            }
            else if (!isSignin) {
                if(!passwordMatched) {
                    return;
                }
                else if (passwordMatched) {
                    console.log(passwordMatched)
                    goSignUp();
                };
            };
        };
    };
    const goSignIn = () => {
        processLogin(email, password)
        .then(result => {
            setUser(result.user);
            history.push(redirect_uri);
        })
        .catch(error => {
            const invalidUser = 'Firebase: Error (auth/user-not-found).';
            const invalidPassword = 'Firebase: Error (auth/wrong-password).';
            if(error.message === invalidUser) {
                setLoginError('Invalid user. Please sign up first')
            }
            else if(error.message === invalidPassword) {
                setLoginError('Wrong Password. Try again')
            };
        })
        .finally(() => setIsLoading(false));
    };
    const goSignUp = () => {
        registerNewUser(email, password)
        .then((result) => {
            setUser(result.user);
            history.push(redirect_uri);
            setUserName(name);
        })
        .catch((error) => {
            setError(error.message)
        })
        .finally(() => setIsLoading(false));
                setPasswordMatched(false);
    };
    return (
        <div className="root_container py-5 mb-5">
            <div className="container">
                <div className="box">
                    <div className="box-container">
                        <img src={logo} className="img-fluid w-25" alt="" />
                        <div className="bg-white p-3 mt-5">
                            <form onSubmit={handleSubmission}>
                                <h2 className="fw-bold text-title">{isSignin ? "Welcome Back!" : "Sign up for free!"}</h2>
                                <h6 className="light-text">
                                    {isSignin ? "Don't have an account? " : "Already have an account? "} 
                                    <span className="text-primary" role="button" onClick={handleIsSignin}>
                                        {isSignin ? "Sign Up Free!" : "Sign In"}
                                    </span>
                                </h6>
                                <div className="w-75 mx-auto mt-3">
                                    {
                                        !isSignin && <input onBlur={hanldeNameChange} required type="text" className="form-control w-100" placeholder="Your name"/>
                                    }
                                    <input onBlur={handleEmailChange} required type="email" className="form-control w-100" placeholder="Email address"/>
                                    <input onBlur={handlePasswordChange} required type="password" className="form-control w-100" placeholder="Password"/>
                                    {
                                        !isSignin && <input onBlur={handleConfirmPassword} required type="password" className="form-control w-100" placeholder="Confirm Password"/>
                                    }
                                    {
                                        isSignin && <h6 className="text-start light-text mt-3"><Link to="/signup">Forgot password?</Link></h6>
                                    }
                                    <div className="btn-colour">
                                        <Button type="submit" variant="rounded-0 text-white px-5 mt-3">{isSignin ? "Sign In" : "Sign Up"}</Button>
                                    </div>
                                    <small className="text-danger mt-3">{loginError}</small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;