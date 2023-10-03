import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './PaymentModal.module.scss';

const cx = classNames.bind(styles);

const PaymentModal = ({ setPaymentMethod }) => {
    const [show, setShow] = useState(false);
    const [payMethod, setPayMethod] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        setPaymentMethod(payMethod);
        handleClose();
    }

    return (
        <>
            <span onClick={handleShow} className={cx('text-blur')}>Chọn phương thức thanh toán &#8594; </span>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
                </Modal.Header>

                <Modal.Body className='fs-4'>
                    <Form.Check>
                        <Form.Check.Input
                            onChange={() => setPayMethod('01')}
                            isValid
                            name='payment'
                            type='radio'
                            id='online'
                            checked={payMethod === '01'}
                        />
                        <Form.Check.Label htmlFor='online'>Thanh toán trực tuyến qua ví VNPAY</Form.Check.Label>
                    </Form.Check>

                    <Form.Check>
                        <Form.Check.Input
                            onChange={() => setPayMethod('02')}
                            isValid
                            name='payment'
                            type='radio'
                            id='offline'
                            checked={payMethod === '02'}
                        />
                        <Form.Check.Label htmlFor='offline'>Thanh toán khi nhận hàng</Form.Check.Label>
                    </Form.Check>
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button variant="outline-success" onClick={handleSubmit}>
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
