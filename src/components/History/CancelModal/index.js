import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const CancelModal = ({ orderId, setMessage, setReload }) => {
    const [show, setShow] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let body = (
        <Form>
            <Form.Check
                type='radio'
                isValid
                label='Đổi địa chỉ nhận hàng'
                name='cancelReason'
                id='1'
                onChange={() => setCancelReason('Đổi địa chỉ nhận hàng')}
                checked={cancelReason === 'Đổi địa chỉ nhận hàng'}
            />
            <Form.Check
                type='radio'
                isValid
                label='Đổi sản phẩm khác'
                id='2'
                name='cancelReason'
                onChange={() => setCancelReason('Đổi sản phẩm khác')}
                checked={cancelReason === 'Đổi sản phẩm khác'}
            />
            <Form.Check
                type='radio'
                isValid
                label='Đổi phương thức thanh toán'
                id='3'
                name='cancelReason'
                onChange={() => setCancelReason('Đổi phương thức thanh toán')}
                checked={cancelReason === 'Đổi phương thức thanh toán'}
            />
            <Form.Group>
                <Form.Label>Lý do:</Form.Label>
                <Form.Control
                    as='textarea'
                    row={3}
                    placeholder='Nhập lý do hủy đơn hàng'
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    isInvalid={isInvalid}
                />
                <Form.Control.Feedback type='invalid'>
                    Hãy cho chúng tôi biết lý do bạn muốn hủy đơn hàng
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    )

    const handleSubmit = async e => {
        e?.preventDefault();
        if (cancelReason.length < 3) {
            setIsInvalid(true);
            return;
        }

        try {
            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/order/cancel/${orderId}`, { cancelReason });
            setMessage({
                type: 'success',
                content: rsp.data.msg
            });
            handleClose();
            setReload(prev => !prev);
            setCancelReason('');
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    return (
        <>
            <Button variant='danger' onClick={handleShow}>
                Hủy đơn hàng
            </Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Lý do hủy đơn hàng</Modal.Title>
                </Modal.Header>

                <Modal.Body>{body}</Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button onClick={handleSubmit} variant="danger">
                        Xác nhận hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CancelModal
