import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Header, Footer, LoadingAnimation, Message } from '../../components';
import { OrdersList, FilterOrder, Empty } from '../../components/History';
import styles from './History.module.scss';
import { Nav, NavBreadCrumb, NavLink } from '../../components/Nav';

const cx = classNames.bind(styles);

const History = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [reload, setReload] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

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
    }, [filter, reload])

    useEffect(() => {
        document.title = 'Lịch sử mua hàng'
    }, [])

    return (
        <>
            <Header />
            <Container className={cx('wrapper')}>
                <Nav>
                    <NavLink to='/'>TRANG CHỦ</NavLink>
                    <NavBreadCrumb />
                    <NavLink to='#'>LỊCH SỬ MUA HÀNG</NavLink>
                </Nav>

                {!loading && <FilterOrder filter={filter} setFilter={setFilter} />}
                {loading ?
                    <LoadingAnimation /> :
                    (orders.length > 0 ?
                        <OrdersList
                            orders={orders}
                            formatPrice={formatPrice}
                            setMessage={setMessage}
                            setReload={setReload}
                        /> : <Empty />
                    )
                }
            </Container>
            <Footer />
            {message.content &&
                <Message
                    message={message.content}
                    type={message.type}
                    setMessage={setMessage}
                />
            }
        </>
    )
}

export default History
