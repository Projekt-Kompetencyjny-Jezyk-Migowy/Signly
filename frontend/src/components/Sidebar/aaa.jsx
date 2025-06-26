import styles from './Sidebar.module.css'
import Button from '../SmallButton/SmallButton'
import Logo from '../../assets/logo_final.png'

function Sidebar( {setColorblindMode, colorblindMode} ) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoWrapper}>
                <img src={Logo} alt="signly logo" className={styles.logo}/>
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Nauka'
                    backgroundColor={colorblindMode ? '#EAC435' : '#FFFFFF'}
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Statystyki'
                    backgroundColor={colorblindMode ? '#00ADB5' : '#FFFFFF'}
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text={colorblindMode ? 'Tryb dla daltonistów' : 'Tryb normalny'}
                    backgroundColor={colorblindMode ? '#00ADB5' : '#FFFFFF'}
                    onClick={setColorblindMode}
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Wyloguj'
                    backgroundColor={colorblindMode ? '#00ADB5' : '#FFFFFF'}
                />
            </div>
        </div>
    )
}

export default Sidebar;