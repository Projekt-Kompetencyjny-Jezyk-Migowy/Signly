import styles from './Header.module.css'
import SmallButton from '../SmallButton/SmallButton';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate(); 
    
    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return ( 
        <div className={styles.header}>
            <div className={styles.buttonContainer}>
                <div className={styles.buttonWrapper}>
                    <SmallButton 
                        backgroundColor='#222831' 
                        color='#00ADB5' 
                        borderColor='#00ADB5' 
                        text='Zarejestruj się' 
                        onClick={() => handleRegisterClick()}
                    />
                </div>
                <div className={styles.buttonWrapper}>
                    <SmallButton 
                        backgroundColor='#222831' 
                        color='#EAC435' 
                        borderColor='#EAC435' 
                        text='Zaloguj się' 
                        onClick={() => handleLoginClick()}
                    />
                </div>
            </div>
        </div>
    )   
}

export default Header;