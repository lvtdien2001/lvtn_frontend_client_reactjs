import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './PaymentModal.module.scss';

const cx = classNames.bind(styles);

const PaymentModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {

    }

    return (
        <>
            <span onClick={handleShow} className={cx('text-blur')}>Chọn phương thức thanh toán &#8594; </span>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Check>
                        <Form.Check.Input isValid name='payment' type='radio' id='online' />
                        <Form.Check.Label htmlFor='online'>Thanh toán trực tuyến qua ví VNPAY</Form.Check.Label>
                    </Form.Check>

                    <Form.Check>
                        <Form.Check.Input isValid name='payment' type='radio' id='offline' />
                        <Form.Check.Label htmlFor='offline'>Thanh toán khi nhận hàng</Form.Check.Label>
                    </Form.Check>
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handleDelete}>
                        OK
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PaymentModal
