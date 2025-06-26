import { useNavigate, useParams } from 'react-router-dom';
import signDescriptions from './signDescriptions';
import styles from './Description.module.css'

function Description() {
    const { letter } = useParams();
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/lesson/${letter}/video`);
    };

    const description = signDescriptions[letter.toUpperCase()] || "Brak opisu dla tego znaku.";

    return (
        <div className={styles.descriptionContent}>
            <div className={styles.descritpionWrapper}>
                <div className={styles.header}>
                    Opis znaku {letter.toUpperCase()}
                </div>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <button onClick={handleNext} className={styles.button}>Dalej</button>
            </div>
        </div>
    );
}

export default Description;
