import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const DeleteAddressModal = ({ setMessage, addressId, setReload }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        try {
            const rsp = await axios.delete(`${process.env.REACT_APP_API_URL}/address/${addressId}`);
            if (rsp.data.success) {
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                setShow(false);
                setReload(prev => !prev)
            }
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    return (
        <>
            <Button className='ms-2' size='sm' variant="danger" onClick={handleShow}>
                Xóa
            </Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Body>Bạn có chắc chắn muốn xóa địa chỉ này không?</Modal.Body>
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

export default DeleteAddressModal
