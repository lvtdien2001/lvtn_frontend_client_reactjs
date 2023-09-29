import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';

const DeleteCartModal = ({ cartId, setMessage, setNum }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        try {
            const rsp = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${cartId}`);
            if (rsp.data.success) {
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                setNum(prev => prev - 1);
                setShow(false);
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
            <Button variant="outline-danger" onClick={handleShow}>
                <BsFillTrashFill />
            </Button>

            <Modal className='mt-3' show={show} onHide={handleClose}>
                <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</Modal.Body>
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

export default DeleteCartModal
