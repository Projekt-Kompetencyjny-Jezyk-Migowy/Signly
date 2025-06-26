import styles from './LearningContent.module.css'
import Card from '../Card/Card';

import a from '../../assets/a.jpg'
import b from '../../assets/b.jpg'
import c from '../../assets/c.jpg'
import e from '../../assets/e.jpg'
import i from '../../assets/i.jpg'
import l from '../../assets/l.jpg'

function LearningContent( {colorblindMode} ) {
    return (
        <div className={styles.learningContent}>
            <div className={styles.section}>
                Proste Głoski Statyczne
                <div className={styles.row}>
                    <Card name='Lekcja A' image={a} borderColor={colorblindMode ? '#EAC435' : '#FFFFFF'} />
                    <Card name='Lekcja B' image={b} borderColor={colorblindMode ? '#00ADB5' : '#FFFFFF'} />
                    <Card name='Lekcja C' image={c} borderColor={colorblindMode ? '#00ADB5' : '#FFFFFF'} />
                </div>
                <div className={styles.row}>
                    <Card name='Lekcja E' image={e} borderColor={colorblindMode ? '#00ADB5' : '#FFFFFF'} />
                    <Card name='Lekcja I' image={i} borderColor={colorblindMode ? '#00ADB5' : '#FFFFFF'} />
                    <Card name='Lekcja L' image={l} borderColor={colorblindMode ? '#00ADB5' : '#FFFFFF'} />
                </div>
            </div>
        </div>
    )
}
export default LearningContent;