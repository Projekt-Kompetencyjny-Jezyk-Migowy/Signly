import { useNavigate } from 'react-router-dom';
import Button from '../components/SmallButton/SmallButton';
import styles from './routingPage.module.css'

function RoutingPage() {    
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/camera')
    }
    
    return (
        <div className={styles.routingContent}>
            <div className={styles.buttonWrapper}>
                <Button 
                    text='Do kamery' 
                    backgroundColor='#222831'
                    borderColor='#00AD85'
                    color='#EEEEEE'
                    onClick={() => onClickHandler()}
                />
            </div>
        </div>
    )
}

export default RoutingPage;