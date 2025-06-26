import { useNavigate, useParams } from 'react-router-dom';
import styles from './IntroductionVideo.module.css'

function IntroductionVideo() {
    const { letter } = useParams();
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/camera/${letter}`);
    };

    return (
        <div className={styles.descriptionContent}>
            <div className={styles.descritpionWrapper}>
                <img 
                    src={`/images/${letter}.jpg`} 
                    alt={`Znak migowy ${letter}`} 
                    width="100%"
                />
            </div>
            <div className={styles.buttonWrapper}>
                <button onClick={handleNext} className={styles.button}>Dalej</button>
            </div>
        </div>
    );
}

export default IntroductionVideo;
