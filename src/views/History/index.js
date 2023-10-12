import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Header, Footer, LoadingAnimation } from '../../components';
import { OrdersList, FilterOrder } from '../../components/History';
import styles from './History.module.scss';

const cx = classNames.bind(styles);

const History = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const formatPrice = input => {
        const price = String(input);
        if (price.length <= 3) {
            return price + ' đ';
        }
        let priceFormat = [];
        for (let i = price.length; i > 0; i -= 3) {
            priceFormat.push(price.substring(i - 3, i));
        }
        return priceFormat.reverse().join('.') + ' đ';
    }

    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/order/by-user?statusCode=${filter}`);
                setOrders(rsp.data.orders);
                setLoading(false);
            } catch (error) { }
        }

        getOrders();
    }, [filter])

    return (
        <>
            <Header />
            <Container className={cx('wrapper')}>
                {!loading && <FilterOrder filter={filter} setFilter={setFilter} />}
                {loading ? <LoadingAnimation /> : <OrdersList orders={orders} formatPrice={formatPrice} />}
            </Container>
            <Footer />
        </>
    )
}

export default History
