import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import Logo from '../assets/logo_final.png'

function Login () {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLoginButton = () => {
        navigate('/routing');
    };

    const handleLogin = async () => {
        const response = await fetch('http://localhost/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            console.log('Zalogowano! Token:', data.token);
            // przekieruj np. do dashboardu
            handleLoginButton();
        } else {
            setError(data.error || 'Błąd logowania');
        }
    };

    return (
        <div className="login-content">
            <div className="about-container">
                <div className="logo-login">
                    <img className='singly-logo-login' src={Logo}/> 
                </div>
                <div className="text-login">
                    Signly otwiera przed Tobą nowe 
                    <br />
                    możliwości, burzy bariery. 
                    <br />
                    Signly - łączymy ludzi
                </div>
            </div>
            <div>
                <div className="login-form">
                    <input
                        className='input-box'
                        type="email"
                        placeholder='Adres email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='input-box'
                        type="password"
                        placeholder='Hasło'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='login-button' onClick={() => handleLogin()}>Zaloguj się</button>
                    <a href='https://youtu.be/dQw4w9WgXcQ' className='login-link'>Nie pamiętasz hasła?</a>
                    <button className='register-button' onClick={() => handleRegister()}>Nowe konto</button>
                </div>
            </div>
        </div>
    )
}

export default Login;