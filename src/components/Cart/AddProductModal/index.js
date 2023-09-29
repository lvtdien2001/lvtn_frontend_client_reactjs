import { useState, useContext } from 'react';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext, AuthContext } from '../../../contexts';

const AddProductModal = ({ product, formatPrice, setMessage }) => {
    const [show, setShow] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [isInvalid, setIsInvalid] = useState(false);
    const { setNum } = useContext(CartContext);
    const { authState: { isAuthenticated } } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const resetData = () => {
        setQuantity(0);
        setIsInvalid(false);
    }

    const countOfCart = async () => {
        try {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/cart/count`);
            if (rsp.data.success) {
                setNum(rsp.data.numberOfProducts);
            }
        } catch (error) {

        }
    }

    const handleClick = () => isAuthenticated ? setShow(true) : navigate('/login');

    const handleSubmit = async e => {
        e?.preventDefault();

        if (quantity <= 0) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
            try {
                const data = { productId: product._id, quantity }
                const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/cart`, data);
                if (rsp.data.success) {
                    setMessage({
                        type: 'success',
                        content: rsp.data.msg || 'Thêm sản phẩm vào giỏ hàng thành công'
                    })
                    countOfCart();
                    resetData();
                }
                setShow(false);
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        }
    }

    return (
        <>
            <Button
                variant="outline-success"
                size='lg'
                onClick={handleClick}
                style={{ width: '100%' }}
                className='mb-3'
            >
                Thêm vào giỏ hàng
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm vào giỏ hàng</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h6 className='text-primary'>{product.name}</h6>
                    <Row>
                        <Col xs={7}><img src={product.image?.url} alt='' width='100%' /></Col>
                        <Col className='mt-3'>
                            <Form onSubmit={e => handleSubmit(e)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label><b>Số lượng</b></Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        isInvalid={isInvalid}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Số lượng phải lớn hơn 0
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                            <h6 className='text-danger'>Đơn giá: {formatPrice(product.price)}</h6>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="outline-success" onClick={handleSubmit}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddProductModal
