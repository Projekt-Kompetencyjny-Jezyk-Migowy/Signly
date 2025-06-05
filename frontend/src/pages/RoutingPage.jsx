import { useNavigate } from 'react-router-dom';

function RoutingPage() {    
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('./camera')
    }
    
    return (
        <div>
            <Button onClick={() => onClickHandler()} />
        </div>
    )
}

export default RoutingPage;