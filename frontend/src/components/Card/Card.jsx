import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

function Card(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Optional: Do other logic here (analytics, state updates, etc.)
        navigate(`/camera`);
    };

    return (
        <div
            className={styles.card}
            style={{ borderColor: props.borderColor }}
            onClick={handleClick}
        >
            <div className={styles.contentContainer}>
                <div className={styles.imageWrapper}>
                    <img src={props.image} className={styles.image} alt={props.name} />
                    <div className={styles.nameWrapper}>
                        {props.name}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
