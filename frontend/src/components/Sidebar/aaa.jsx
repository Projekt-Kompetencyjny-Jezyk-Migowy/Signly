import styles from './Sidebar.module.css'
import Button from '../SmallButton/SmallButton'
import Logo from '../../assets/logo_final.png'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoWrapper}>
                <img src={Logo} alt="signly logo" className={styles.logo}/>
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Nauka'
                    backgroundColor='#EAC435'
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Statystyki'
                    backgroundColor='#00ADB5'
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Ustawienia'
                    backgroundColor='#00ADB5'
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Wyloguj'
                    backgroundColor='#00ADB5'
                />
            </div>
        </div>
    )
}

export default Sidebar;