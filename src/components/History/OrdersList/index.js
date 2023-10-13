import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CancelModal, GoodsReceived, RatingModal } from '..';

const OrdersList = ({ orders, formatPrice, setMessage, setReload }) => {

    let body = (
        <>
            {orders.map(order => {
                return (
                    <div className='mb-1' key={order._id}>
                        <ListGroup>
                            <ListGroup.Item className='text-end text-primary'>
                                <b>{order.status.name.toUpperCase()}</b>
                            </ListGroup.Item>

                            {order.products?.map(product => {
                                return (
                                    <ListGroup.Item as={Link} to={`/order/${order._id}`} key={product._id}>
                                        <Row>
                                            <Col className='text-end' lg={1}>
                                                <img alt='' src={product.imageUrl} width='60px' height='60px' />
                                            </Col>
                                            <Col>
                                                <span>{product.name}</span> <br />
                                                <span className='text-secondary'>x {product.quantity}</span>
                                            </Col>
                                            <Col className='text-end text-danger'>
                                                {formatPrice(product.price)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })}

                            <ListGroup.Item className='text-end text-danger fs-5'>
                                <b>Tổng thanh toán: {formatPrice(order.totalAmount)}</b>
                            </ListGroup.Item>

                            <ListGroup.Item className='text-end'>
                                {Number(order.status?.code) === 1 && <CancelModal orderId={order._id} setMessage={setMessage} setReload={setReload} />}
                                {Number(order.status?.code) === 3 && <GoodsReceived orderId={order._id} setMessage={setMessage} setReload={setReload} />}
                                {Number(order.status?.code) === 4 && <RatingModal products={order.products} />}
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )
            })}
        </>
    )

    return (
        <div style={{ minHeight: '404px' }}>
            {body}
        </div>
    )
}

export default OrdersList
