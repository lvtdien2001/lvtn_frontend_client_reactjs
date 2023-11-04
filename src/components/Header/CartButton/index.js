import { useEffect, useContext } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CartButton.module.scss';
import { CartContext } from '../../../contexts';

const cx = classNames.bind(styles);

export const CartButtonDesktop = ({ isAuthenticated }) => {
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
    }, [isAuthenticated, setNum])

    return (
        <>
            <Button
                as='div'
                onClick={() => navigate('/cart')}
                className={`${cx('cart-btn', 'desktop')} ms-2`}
                variant='outline-success'
            >
                <FaShoppingCart className={cx('cart-icon')} />
                &nbsp;Giỏ hàng&nbsp;
                <Badge bg="danger">
                    {num}
                </Badge>
            </Button>

            {/* <Button
             className={cx('mobile')}
             variant='outline-success'
             size='sm'
             >
                <FaShoppingCart />&nbsp;
                <Badge bg="danger">
                    {num}
                </Badge>
            </Button> */}
        </>
    )
}

export const CartButtonMobile = ({ isAuthenticated }) => {
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
    }, [isAuthenticated, setNum])

    return (
        <>
            <Button
                as='div'
                onClick={() => navigate('/cart')}
                className={`ms-2`}
                variant='outline-success'
                size='sm'
            >
                <FaShoppingCart className={cx('cart-icon')} />
                &nbsp;
                <Badge bg="danger">
                    {num}
                </Badge>
            </Button>
        </>
    )
}
