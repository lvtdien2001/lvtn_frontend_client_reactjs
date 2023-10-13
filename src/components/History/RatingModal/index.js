import { useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RatingModal = ({ products }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let body = (
        <ListGroup>
            {products?.map(product => {
                return (
                    <ListGroup.Item key={product._id} className='text-center mb-1'>
                        <p><b className='text-primary'>{product.name}</b></p>
                        <img alt='' src={product.imageUrl} width='70px' height='70px' /><br />
                        <Button className='mt-2' variant='success' onClick={() => navigate(`/product/${product.product._id}`)}>Đánh giá</Button>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )

    return (
        <>
            <Button variant='success' onClick={handleShow}>
                Đánh giá sản phẩm
            </Button>

            <Modal scrollable className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn sản phẩm muốn đánh giá</Modal.Title>
                </Modal.Header>

                <Modal.Body>{body}</Modal.Body>
            </Modal>
        </>
    );
}

export default RatingModal
