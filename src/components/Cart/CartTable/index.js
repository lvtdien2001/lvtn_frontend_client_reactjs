import { useState, useContext, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CartTable.module.scss';
import { LoadingAnimation } from '../..';
import { DeleteCartModal, PaymentModal, ChangeAddressModal } from '..';
import { CartContext } from '../../../contexts';
import cartIcon from '../../../assets/images/order.jpg';

const cx = classNames.bind(styles);

const CartTable = ({ formatPrice, setMessage }) => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [call, setCall] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [reload, setReload] = useState(false);
    const { setNum, num } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/cart`);
                if (rsp.data.success) {
                    const carts = rsp.data.carts;
                    setCarts(carts);
                    setLoading(false);
                    setTotalAmount(carts.reduce((total, cart) => {
                        return total + (cart.quantity * cart.product?.price)
                    }, 0))
                }
            } catch (error) {

            }
        }

        fetchApi();
    }, [num, call])

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/address`);
                if (rsp.data.success) {
                    setAddresses(rsp.data.addresses);
                    if (!address.fullName) {
                        for (let i in rsp.data.addresses) {
                            rsp.data.addresses[i]?.isDefault && setAddress(rsp.data.addresses[i]);
                        }
                    }
                    setLoading(false);
                };
            } catch (error) { }
        }
        fetchApi();
    }, [reload, address])

    const handleUpdateQuantity = async (type, quantity, cartId, productId) => {
        if (type === '-' && Number(quantity) === 1) {
            setMessage({
                type: 'danger',
                content: 'Số lượng thấp nhất là 1'
            });
            return;
        }
        try {
            const data = {
                quantity: type === '-' ? (quantity - 1) : (quantity + 1),
                productId
            }
            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/cart/${cartId}`, data);
            if (rsp.data.success) {
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                setCall(prev => !prev);
            }
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    const handleSubmit = async () => {
        if (paymentMethod === '') {
            setMessage({
                type: 'danger',
                content: 'Bạn chưa chọn phương thức thanh toán'
            });
            return;
        }
        if (!address.fullName) {
            setMessage({
                type: 'danger',
                content: 'Bạn chưa chọn địa chỉ giao hàng'
            });
            return;
        }
        try {
            // products list
            const products = [];
            for (let i in carts) {
                products.push({
                    product: carts[i].product?._id,
                    quantity: carts[i].quantity,
                    price: carts[i].product?.price,
                    name: carts[i].product?.name,
                    imageUrl: carts[i].product?.image?.url
                })
            }

            // submit data
            const data = {
                paymentMethod,
                totalAmount,
                address: {
                    fullName: address.fullName,
                    phoneNumber: address.phoneNumber,
                    province: address.province?.name,
                    district: address.district?.name,
                    ward: address.ward?.name,
                    description: address.description
                },
                products
            }

            // create order
            const rspOrder = await axios.post(`${process.env.REACT_APP_API_URL}/order`, data);
            let orderId;
            if (rspOrder.data.success) {
                orderId = rspOrder.data.newOrder._id;
                await axios.delete(`${process.env.REACT_APP_API_URL}/cart`);
                setNum(0);

                if (paymentMethod === '01') {
                    try {
                        const rspPayment = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-vnp-url`, { amount: totalAmount, orderId });
                        if (rspPayment.data.success) {
                            window.location.assign(rspPayment.data.vnpUrl);
                        }
                    } catch (error) { }
                } else if (paymentMethod === '02') {
                    navigate(`/order/${rspOrder.data.newOrder?._id}`);
                }
            }
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    let body = (
        <>
            <thead>
                <tr className='text-center'>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th style={{ minWidth: '110px' }}>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {carts.map((cart, index) => {
                    const amount = Number(cart.product?.price) * Number(cart.quantity);

                    return (
                        <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td
                                className='text-primary'
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/product/${cart.product?._id}`)}
                            >
                                <b>{(cart.product?.name)}</b>
                            </td>

                            <td className='text-center'>
                                <img src={cart.product?.image?.url} alt='' width='100px' height='100px' />
                            </td>

                            <td className='text-center'>
                                <Button
                                    onClick={() => handleUpdateQuantity('-', cart.quantity, cart._id, cart.product?._id)}
                                    size='sm'
                                    variant='outline-success'
                                >
                                    &nbsp;-&nbsp;
                                </Button>
                                <Button size='sm' variant='light' disabled>{cart.quantity}</Button>
                                <Button
                                    onClick={() => handleUpdateQuantity('+', cart.quantity, cart._id, cart.product?._id)}
                                    size='sm'
                                    variant='outline-success'
                                >
                                    &nbsp;+&nbsp;
                                </Button>
                            </td>

                            <td className='text-center'>{formatPrice(cart.product?.price)}</td>
                            <td className='text-center'><b>{formatPrice(amount)}</b></td>

                            <td className='text-center'>
                                <DeleteCartModal
                                    setNum={setNum}
                                    setMessage={setMessage}
                                    cartId={cart._id}
                                    setCarts={setCarts}
                                    index={index}
                                />
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td
                        style={{ fontSize: '18px' }}
                        colSpan={7}
                    >
                        <div className='d-flex justify-content-between'>
                            <div>
                                <b>Địa chỉ nhận hàng: </b>
                                {address?.fullName && <span className='me-2'>
                                    {address.fullName}, {address.description}, {address.ward.name}, {address.district.name}, {address.province.name}
                                </span>}
                                {address?.isDefault &&
                                    <Button
                                        className='me-2'
                                        size='sm'
                                        disabled
                                        variant='outline-danger'
                                    >
                                        Mặc định
                                    </Button>
                                }
                            </div>
                            <div className=''>
                                <ChangeAddressModal
                                    setAddress={setAddress}
                                    checkedAddress={address}
                                    addresses={addresses}
                                    setReload={setReload}
                                />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='text-end' style={{ fontSize: '18px' }} colSpan={7}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <b>Voucher của bạn: </b>
                            </div>
                            <div>
                                <span className={cx('text-blur')}>
                                    Chọn hoặc nhập mã &#8594;
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='text-end' style={{ fontSize: '18px' }} colSpan={7}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <b>Phương thức thanh toán: </b>
                                <span className='me-3'>
                                    {paymentMethod === '01' && 'Thanh toán trực tuyến qua ví VNPAY'}
                                    {paymentMethod === '02' && 'Thanh toán khi nhận hàng'}
                                </span>
                            </div>
                            <div>
                                <PaymentModal setPaymentMethod={setPaymentMethod} />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='text-end' colSpan={7}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <b className='fs-5'>
                                    Tổng thanh toán: <span className='text-danger'>{formatPrice(totalAmount)}</span>
                                </b>
                            </div>
                            <div>
                                <Button onClick={handleSubmit} className='ms-3' size='lg' variant="outline-success">
                                    Mua hàng
                                </Button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </>
    )

    return (
        <>
            {loading ? <LoadingAnimation /> : <Table
                size='sm'
                responsive
                borderless
                hover
            >
                {carts?.length === 0 ?
                    <tbody>
                        <tr>
                            <td>
                                <div className={`${cx('empty')}`}>
                                    <div className='text-center'>
                                        <img src={cartIcon} alt='' width='70px' />
                                        <p className='fs-5 text-secondary'>Chưa có sản phẩm nào</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    : body}
            </Table>}
        </>
    )
}

export default CartTable
