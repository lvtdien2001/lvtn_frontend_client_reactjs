import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container>
            <h3>404 Not Found</h3>
            <Link to='..'>Trở về</Link>
        </Container>
    )
}

export default NotFound
