import { useNavigate, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <h3>404 Not Found</h3>
            <Link to='#' onClick={() => navigate(-1)}>Trở về</Link>
        </Container>
    )
}

export default NotFound
