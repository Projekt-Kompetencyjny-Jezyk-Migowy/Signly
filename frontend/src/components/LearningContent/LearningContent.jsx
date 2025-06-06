import styles from './LearningContent.module.css'
import Card from '../Card/Card';
import Sign from '../../assets/sign.jpg'

function LearningContent() {
    return (
        <div className={styles.learningContent}>
            <div className={styles.section}>
                Głoski Statyczne
                <div className={styles.row}>
                    <Card name='Lekcja A' image={Sign} borderColor='#00ADB5'/>
                    <Card name='Lekcja B' image={Sign} borderColor='#00ADB5'/>
                    <Card name='Lekcja C' image={Sign} borderColor='#00ADB5'/>
                </div>
                <div className={styles.row}>
                    <Card name='Lekcja D' image={Sign} borderColor='#00ADB5'/>
                    <Card name='Lekcja E' image={Sign} borderColor='#EAC435'/>
                    <Card name='Lekcja F' image={Sign} borderColor='#EAC435'/>
                </div>
            </div>
        </div>
    )
}
export default LearningContent;