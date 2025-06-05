import { useState } from 'react';
import Logo from '../assets/logo_final.png'
import '../css/Register.css'

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      first_name: e.target.fname.value,
      last_name: e.target.lname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password2: e.target.passwordRepeat.value,
      date_of_birth: e.target.date_of_birth.value,
      sex: e.target.sex.value,
    };

    const response = await fetch('http://localhost/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Registration successful!');
    } else {
      alert('Error: ' + JSON.stringify(result));
    }
  };

  return (
    <div className='register-page-content'>
      <div className='register-logo-wrapper'>
        <img src={Logo} alt="Signly" className='register-logo'/>
      </div>
      <form className='register-form' onSubmit={handleSubmit}>
        <div className='register-double-wrapper'>
          <div className='register-small-container'>
            <input type="text" name="fname" placeholder='Imię' className='register-text-input' required />
          </div>
          <div className='register-small-container'>
            <input type="text" name="lname" placeholder='Nazwisko' className='register-text-input' required />
          </div>
        </div>
        <div className='register-detail-wrapper'>
          <div className='register-small-container'>
            <div className='register-text'>Data urodzenia</div>
            <input type="date" name="date_of_birth" className='register-date-input' required />
          </div>
          <div className='register-small-container'>
            <div className='register-text'>Płeć</div>
            <select id="sex" name="sex" className='register-date-input' required>
              <option value="" disabled selected>Wybierz płeć</option>
              <option value="Female">Kobieta</option>
              <option value="Male">Mężczyzna</option>
              <option value="Other">Inne</option>
              <option value="Unknown">Wolę nie podawać</option>
            </select>
          </div>
        </div>
        <div className='register-account-data-container'>
          <input type="email" name="email" className='register-big-container' placeholder='Adres email' required />
          <input type="password" name="password" className='register-big-container' placeholder='Hasło' required />
          <input type="password" name="passwordRepeat" className='register-big-container' placeholder='Powtórz hasło' required />
        </div>
        <div className='register-accept-button-wrapper'>
          <button type="submit" className='register-accept-button'>Zarejestruj się</button>
        </div>
        <div className='register-login-wrapper'>
          <a href='https://youtu.be/qQvIAs-nPSo' className='register-login-link'>Masz już konto?</a>
        </div>
      </form>
    </div>
  )
}

export default Register;
