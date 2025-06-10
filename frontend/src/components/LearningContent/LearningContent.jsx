import styles from './LearningContent.module.css'
import Card from '../Card/Card';

import a from '../../assets/a.jpg'
import b from '../../assets/b.jpg'
import c from '../../assets/c.jpg'
import e from '../../assets/e.jpg'
import i from '../../assets/i.jpg'
import l from '../../assets/l.jpg'

function LearningContent() {
    return (
        <div className={styles.learningContent}>
            <div className={styles.section}>
                Głoski Statyczne
                <div className={styles.row}>
                    <Card name='Lekcja A' image={a} borderColor='#EAC435'/>
                    <Card name='Lekcja B' image={b} borderColor='#00ADB5'/>
                    <Card name='Lekcja C' image={c} borderColor='#00ADB5'/>
                </div>
                <div className={styles.row}>
                    <Card name='Lekcja E' image={e} borderColor='#00ADB5'/>
                    <Card name='Lekcja I' image={i} borderColor='#00ADB5'/>
                    <Card name='Lekcja L' image={l} borderColor='#00ADB5'/>
                </div>
            </div>
        </div>
    )
}
export default LearningContent;