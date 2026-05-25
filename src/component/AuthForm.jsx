
import '../App.css'
import { useState } from 'react';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ firstName: '', lastName: '', email: '', password: '', country: '', number: '' });
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateLogin = () => {
        const errs = {};
        if (!isValidEmail(loginData.email)) errs.email = 'Enter a valid email address.';
        if (loginData.password.length <= 8) errs.password = 'Password must be greater than 8 characters.';
        return errs;
    };

    const validateRegister = () => {
        const errs = {};
        if (!isValidEmail(registerData.email)) errs.email = 'Enter a valid email address.';
        if (registerData.password.length <= 8) errs.password = 'Password must be greater than 8 characters.';
        return errs;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const errs = validateLogin();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            console.log('Login submitted', loginData);
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const errs = validateRegister();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            console.log('Register submitted', registerData);
        }
    };

    const switchForm = (toLogin) => {
        setErrors({});
        setIsLogin(toLogin);
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <div className='form-toggle'>
                    <button className={isLogin ? 'active' : ''} onClick={() => switchForm(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => switchForm(false)}>Register</button>
                </div>

                {isLogin ? (
                    <form className='form' onSubmit={handleLoginSubmit} noValidate>
                        <h2>Login Form</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                        {errors.email && <span className='error'>{errors.email}</span>}
                        <input
                            type='password'
                            placeholder='Password'
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        {errors.password && <span className='error'>{errors.password}</span>}
                        <a href='#'>Forgot Password?</a>
                        <button type='submit'>Login</button>
                        <p>Not a Member? <a href='#' onClick={() => switchForm(false)}>Register</a></p>
                    </form>
                ) : (
                    <form className='form' onSubmit={handleRegisterSubmit} noValidate>
                        <h2>Register Form</h2>
                        <input type='text' placeholder='First Name' value={registerData.firstName} onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })} />
                        <input type='text' placeholder='Last Name' value={registerData.lastName} onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })} />
                        <input
                            type='email'
                            placeholder='Email'
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        />
                        {errors.email && <span className='error'>{errors.email}</span>}
                        <input
                            type='password'
                            placeholder='Password'
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        />
                        {errors.password && <span className='error'>{errors.password}</span>}
                        <input type='text' placeholder='Country' value={registerData.country} onChange={(e) => setRegisterData({ ...registerData, country: e.target.value })} />
                        <input type='number' placeholder='Phone Number' value={registerData.number} onChange={(e) => setRegisterData({ ...registerData, number: e.target.value })} />
                        <button type='submit'>Register</button>
                        <p>Already a Member? <a href='#' onClick={() => switchForm(true)}>Login</a></p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthForm
