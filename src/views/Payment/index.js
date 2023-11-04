import { useEffect, useState } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import axios from 'axios';
import moment from 'moment';
import classNames from 'classnames/bind';
import { Header, Footer, LoadingAnimation } from '../../components';
import styles from './Payment.module.scss';
import { Nav, NavBreadCrumb, NavLink } from '../../components/Nav';

const cx = classNames.bind(styles);

const Payment = () => {
    const [message, setMessage] = useState('');
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

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
        const checksum = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/payment/vnp_ipn?${searchParams}`);
                setMessage(rsp.data.msg);
            } catch (error) {
                setMessage(error.response?.data.msg || error.message);
            }
        }

        const getOrder = async () => {
            setLoading(true);
            try {
                const orderId = searchParams.get('vnp_TxnRef');
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/order/${orderId}`);
                setOrder(rsp.data.order);
                setLoading(false);
            } catch (error) { }
        }

        checksum();
        getOrder();
    }, [searchParams])

    useEffect(() => {
        document.title = 'Thanh toán'
    }, [])

    let status = (
        <>
            <Row className={`text-center ${cx('status')}`}>
                <Col className={Number(order.status?.code) >= 1 ? 'text-success' : 'text-secondary'}>
                    Chờ xác nhận
                </Col>
                <Col className={Number(order.status?.code) >= 2 ? 'text-success' : 'text-secondary'}>
                    Chờ lấy hàng
                </Col>
                <Col className={Number(order.status?.code) >= 3 ? 'text-success' : 'text-secondary'}>
                    Đang vận chuyển
                </Col>
                <Col className={Number(order.status?.code) >= 4 ? 'text-success' : 'text-secondary'}>
                    Đã nhận
                </Col>
            </Row>

            <Row className={`text-center mb-3 ${cx('status')}`}>
                <Col className={Number(order.status?.code) >= 1 ? 'text-success' : 'text-secondary'}>
                    <p>
                        {Number(order.status?.code) >= 1 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                        <div className={`${Number(order.status?.code) >= 1 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                    </p>
                </Col>
                <Col className={Number(order.status?.code) >= 2 ? 'text-success' : 'text-secondary'}>
                    <p>
                        {Number(order.status?.code) >= 2 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                        <div className={`${Number(order.status?.code) >= 2 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                    </p>
                </Col>
                <Col className={Number(order.status?.code) >= 3 ? 'text-success' : 'text-secondary'}>
                    <p>
                        {Number(order.status?.code) >= 3 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                        <div className={`${Number(order.status?.code) >= 3 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                    </p>
                </Col>
                <Col className={Number(order.status?.code) >= 4 ? 'text-success' : 'text-secondary'}>
                    <p>
                        {Number(order.status?.code) >= 4 ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                        <div className={`${Number(order.status?.code) >= 4 ? 'bg-success' : 'bg-secondary'} ${cx('progress-bar')}`}></div>
                    </p>
                </Col>
            </Row>
        </>
    )

    let body = (
        <>
            <p>
                <b>Tên khách hàng: </b>
                <>{order.address?.fullName}</>
            </p>
            <p>
                <b>Địa chỉ nhận hàng: </b>
                <>{order.address?.description}, {order.address?.ward}, {order.address?.district}, {order.address?.province}</>
            </p>
            <p>
                <b>Thời gian đặt hàng: </b>
                <>{moment(order.createdAt).format('llll')}</>
            </p>

            <Table hover responsive size='sm'>
                <thead>
                    <tr>
                        <th className='text-center'>STT</th>
                        <th style={{ minWidth: '130px' }} className='text-center'>Tên sản phẩm</th>
                        <th className='text-center'>Hình ảnh</th>
                        <th style={{ minWidth: '130px' }} className='text-center'>Đơn giá</th>
                        <th style={{ minWidth: '80px' }} className='text-center'>Số lượng</th>
                        <th style={{ minWidth: '130px' }} className='text-center'>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products?.map((product, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td>{product.name}</td>
                                <td className='text-center'>
                                    <img alt='' src={product.imageUrl} width='70px' height='70px' />
                                </td>
                                <td className='text-center'>{formatPrice(product.price)}</td>
                                <td className='text-center'>{product.quantity}</td>
                                <td className='text-center'><b>{formatPrice(product.price * product.quantity)}</b></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <p className='text-end text-danger me-2'><b>Tổng thanh toán: {formatPrice(order.totalAmount)}</b></p>
            <p className='text-end me-2'><b>Phương thức thanh toán: {order.paymentMethod?.name}</b></p>
        </>
    )

    return (
        <>
            <Header />
            <Container className={`mb-3 mt-3 ${cx('wrapper')}`}>
                <Nav>
                    <NavLink to='/'>TRANG CHỦ</NavLink>
                    <NavBreadCrumb />
                    <NavLink to='/history'>LỊCH SỬ MUA HÀNG</NavLink>
                    <NavBreadCrumb />
                    <NavLink to='#'>ĐƠN HÀNG</NavLink>
                </Nav>

                <div onClick={() => navigate('/product')} style={{ cursor: 'pointer' }} className='ms-2 text-primary'>
                    <h5>&#8617; Tiếp tục mua hàng</h5>
                </div>
                <h3 className='text-center mt-3 mb-3'>THÔNG TIN ĐƠN HÀNG</h3>
                <h5 className='text-center mb-3 text-danger'>{message}</h5>
                {!loading && status}
                {loading ? <LoadingAnimation /> : body}
            </Container>
            <Footer />
        </>
    )
}

export default Payment
