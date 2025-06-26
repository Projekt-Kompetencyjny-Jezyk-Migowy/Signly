import styles from './LearningContent.module.css'
import Card from '../Card/Card';

import m from '../../assets/m.jpg'
import n from '../../assets/n.jpg'
import o from '../../assets/o.jpg'
import p from '../../assets/p.jpg'
import r from '../../assets/r.jpg'
import s from '../../assets/s.jpg'

function LearningContent() {
    return (
        <div className={styles.learningContent}>
            <div className={styles.section}>
                Skomplikowane Głoski Statyczne
                <div className={styles.row}>
                    <Card name='Lekcja M' image={m} borderColor='#EEEEEE'/>
                    <Card name='Lekcja N' image={n} borderColor='#EEEEEE'/>
                    <Card name='Lekcja O' image={o} borderColor='#EEEEEE'/>
                </div>
                <div className={styles.row}>
                    <Card name='Lekcja P' image={p} borderColor='#EEEEEE'/>
                    <Card name='Lekcja R' image={r} borderColor='#EEEEEE'/>
                    <Card name='Lekcja S' image={s} borderColor='#EEEEEE'/>
                </div>
            </div>
        </div>
    )
}
export default LearningContent;