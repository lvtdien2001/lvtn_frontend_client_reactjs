import { useEffect, useContext } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../../contexts';

const CartButton = ({ isAuthenticated }) => {
    const { num, setNum } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/cart/count`);
                if (rsp.data.success) {
                    setNum(rsp.data.numberOfProducts);
                }
            } catch (error) {

            }
        }

        isAuthenticated && fetchApi();
    }, [isAuthenticated])

    return (
        <Button onClick={() => navigate('/cart')} className='ms-2' variant='outline-success'>
            <FaShoppingCart /> Giỏ hàng <Badge bg="danger">{num}</Badge>
        </Button>
    )
}

export default CartButton
