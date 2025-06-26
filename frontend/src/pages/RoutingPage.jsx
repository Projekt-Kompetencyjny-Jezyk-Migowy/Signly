import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/aaa';
import LearningContent1 from '../components/LearningContent/LearningContent';
import LearningContent2 from '../components/LearningContent2/LearningContent';
import styles from './routingPage.module.css'

function RoutingPage() {    
    const [colorblindMode, setColorblindMode] = useState(() => {
        const saved = localStorage.getItem('colorblindMode');
        return saved === 'true'; // 'true' (string) => true (boolean)
    });

     useEffect(() => {
        localStorage.setItem('colorblindMode', colorblindMode);
    }, [colorblindMode]);

    return (
        <div className={styles.routingContent}>
            <Sidebar 
                colorblindMode={colorblindMode}
                setColorblindMode={() => setColorblindMode(prev => !prev)} 
            />
            <div className={styles.lessonsList}>
                <LearningContent1 colorblindMode={colorblindMode} />
                <LearningContent2 colorblindMode={colorblindMode} />
                <div className={styles.footer} />
            </div>
        </div>
    )
}

export default RoutingPage;