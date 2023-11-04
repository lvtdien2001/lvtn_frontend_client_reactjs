import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ChangeAddressModal.module.scss';

const cx = classNames.bind(styles);

const ChangeAddressModal = ({ addresses, setReload, setAddress, checkedAddress }) => {
    const [show, setShow] = useState(false);
    const [demoAddress, setDemoAddress] = useState(checkedAddress);

    const handleClose = () => {
        setShow(false);
        setDemoAddress(checkedAddress);
    };
    const handleShow = () => setShow(true);

    const handleSave = () => {
        setAddress(demoAddress);
        setReload(prev => !prev);
        handleClose();
    }

    let body = (
        <Form>
            {addresses?.map(address => {
                return (
                    <Form.Check key={address._id} className='mb-3'>
                        <Form.Check.Input
                            isValid
                            name='address'
                            type='radio'
                            id={address._id}
                            checked={address?._id === demoAddress?._id}
                            onChange={() => setDemoAddress(address)}
                        />
                        <Form.Check.Label htmlFor={address._id}>
                            <b>{address.fullName}</b>, {address.description}, {address.ward.name}, {address.district.name}, {address.province.name}
                        </Form.Check.Label>
                    </Form.Check>
                )
            })}
        </Form>
    )

    let empty = (
        <div>
            Bạn chưa có địa chỉ nhận hàng <Link to='/address'>Thêm địa chỉ mới</Link>
        </div>
    )

    return (
        <>
            <span
                onClick={handleShow}
                className={cx('text-blur')}
            >
                Đổi địa chỉ &#8594;
            </span>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn địa chỉ nhận hàng</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {addresses?.length === 0 ? empty : body}
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button onClick={handleSave} variant="outline-success" >
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

export default ChangeAddressModal
