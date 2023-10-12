import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrdersList = ({ orders, formatPrice }) => {

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
                                {Number(order.status?.code) === 1 &&
                                    <Button variant='danger'>
                                        Hủy đơn hàng
                                    </Button>
                                }
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )
            })}
        </>
    )

    return (
        <>
            {body}
        </>
    )
}

export default OrdersList
