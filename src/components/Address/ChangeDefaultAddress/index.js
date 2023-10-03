import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ChangeDefaultAddress = ({ id, setMessage, setReload }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        try {
            const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/address/change-default/${id}`);
            if (rsp.data.success) {
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                handleClose();
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
            <Button size='sm' variant='outline-danger' onClick={handleShow}>Thiết lập mặc định</Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Body>Bạn có chắc chắn muốn đặt địa chỉ này làm mặc định?</Modal.Body>
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

export default ChangeDefaultAddress
