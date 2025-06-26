import { useNavigate } from 'react-router-dom';
import Button from '../components/SmallButton/SmallButton';
import Sidebar from '../components/Sidebar/aaa';
import LearningContent1 from '../components/LearningContent/LearningContent';
import LearningContent2 from '../components/LearningContent2/LearningContent';
import styles from './routingPage.module.css'

function RoutingPage() {    
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/camera')
    }
    
    return (
        <div className={styles.routingContent}>
            <Sidebar />
            <div className={styles.lessonsList}>
                <LearningContent1 />
                <LearningContent2 />
                <div className={styles.footer} />
            </div>

            {/* <div className={styles.buttonWrapper}>
                <Button 
                    text='Do kamery' 
                    backgroundColor='#222831'
                    borderColor='#00AD85'
                    color='#EEEEEE'
                    onClick={() => onClickHandler()}
                />
            </div> */}
        </div>
    )
}

export default RoutingPage;