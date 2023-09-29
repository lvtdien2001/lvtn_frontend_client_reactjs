import { useState, useContext, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CartTable.module.scss';
import { LoadingAnimation } from '../..';
import { DeleteCartModal, PaymentModal } from '..';
import { CartContext } from '../../../contexts';

const cx = classNames.bind(styles);

const CartTable = ({ formatPrice, setMessage }) => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [call, setCall] = useState(true);
    const { setNum, num } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
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
                    <td className='text-end' style={{ fontSize: '18px' }} colSpan={7}>
                        <b>Địa chỉ nhận hàng: </b>
                        <span className={cx('text-blur')}>Đổi địa chỉ &#8594; </span>
                    </td>
                </tr>
                <tr>
                    <td className='text-end' style={{ fontSize: '18px' }} colSpan={7}>
                        <b>Voucher của bạn: </b>
                        <span className={cx('text-blur')}>Chọn hoặc nhập mã &#8594; </span>
                    </td>
                </tr>
                <tr>
                    <td className='text-end' style={{ fontSize: '18px' }} colSpan={7}>
                        <b>Phương thức thanh toán: </b>
                        <PaymentModal />
                    </td>
                </tr>
                <tr>
                    <td className='text-end' colSpan={7}>
                        <b className='fs-5'>
                            Tổng thanh toán: <span className='text-danger'>{formatPrice(totalAmount)}</span>
                        </b>
                        <Button className='ms-3' size='lg' variant="outline-success">
                            Mua hàng
                        </Button>
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
                {body}
            </Table>}
        </>
    )
}

export default CartTable
