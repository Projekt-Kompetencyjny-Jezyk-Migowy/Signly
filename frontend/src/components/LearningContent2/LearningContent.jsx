import styles from './LearningContent.module.css'
import Card from '../Card/Card';

import m from '../../assets/m.jpg'
import n from '../../assets/n.jpg'
import o from '../../assets/o.jpg'
import p from '../../assets/p.jpg'
import r from '../../assets/r.jpg'
import s from '../../assets/s.jpg'

function LearningContent( {colorblindMode} ) {
    return (
        <div className={styles.learningContent}>
            <div className={styles.section}>
                Skomplikowane Głoski Statyczne
                <div className={styles.row}>
                    <Card name='Lekcja M' image={m} borderColor={colorblindMode ? '#EAC435' : '#FFFFFF'} />
                    <Card name='Lekcja N' image={n} borderColor={colorblindMode ? '#EAC435' : '#FFFFFF'} />
                    <Card name='Lekcja O' image={o} borderColor={colorblindMode ? '#EAC435' : '#FFFFFF'} />
                </div>
                <div className={styles.row}>
                    <Card name='Lekcja P' image={p} borderColor={colorblindMode ? '#EAC435' : '#FFFFFF'} />
                    <Card name='Lekcja R' image={r} borderColor={colorblindMode ? '#EAC435' : '#FFFFFF'} />
                    <Card name='Lekcja S' image={s} borderColor={colorblindMode ? '#EAC435' : '#FFFFFF'} />
                </div>
            </div>
        </div>
    )
}
export default LearningContent;