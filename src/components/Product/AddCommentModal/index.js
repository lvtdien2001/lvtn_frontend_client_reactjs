import { useState, useContext } from 'react';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AddCommentModal.module.scss';
import { AuthContext } from '../../../contexts';

const cx = classNames.bind(styles);

const AddCommentModal = ({ product, setMessage, setReload }) => {
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState('');
    const [star, setStar] = useState(0);
    const { authState: { isAuthenticated } } = useContext(AuthContext);
    const navigate = useNavigate();
    const stars = [
        { id: 1, decs: 'Rất tệ' },
        { id: 2, decs: 'Tệ' },
        { id: 3, decs: 'Tạm ổn' },
        { id: 4, decs: 'Tốt' },
        { id: 5, decs: 'Rất tốt' },
    ]

    const resetData = () => {
        setComment('');
        setStar(0);
    }

    const handleClose = () => {
        setShow(false);
        resetData();
    };
    const handleShow = () => setShow(true);

    const handleSubmit = async e => {
        e?.preventDefault();
        try {
            const data = {
                productId: product._id,
                content: comment,
                star
            }
            const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/comment`, data);
            setMessage({
                type: 'success',
                content: rsp.data.msg
            });
            setReload(prev => !prev);
            handleClose();
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            });
        }
    }

    let body = (
        <>
            <Row>
                <Col xs={12} className='text-primary mb-3 text-center'><h5>{product.name}</h5></Col>
                <Col className='text-center'>
                    <img alt='' src={product.image?.url} width='120px' height='120px' />
                </Col>
            </Row>
            <Row className='text-center mb-3'>
                {stars.map(e =>
                    <Col key={e.id}>
                        {e.id <= star ?
                            <BsStarFill onClick={() => setStar(e.id)} className={cx('star')} /> :
                            <BsStar onClick={() => setStar(e.id)} className={cx('star')} />
                        }
                        <br />{e.decs}
                    </Col>)
                }
            </Row>
            <Row className='mb-3'>
                <Form>
                    <Form.Control
                        as='textarea'
                        rows={2}
                        placeholder='Hãy bày tỏ cảm nhận của bạn về sản phẩm'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    >

                    </Form.Control>
                </Form>
            </Row>
        </>
    )

    return (
        <>
            <Button
                variant="success"
                onClick={isAuthenticated ? handleShow : (() => navigate('/login'))}
                className='mb-3'
                size='lg'
            >
                Viết đánh giá
            </Button>

            <Modal show={show} onHide={handleClose} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá của tôi</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {body}
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button
                        size='lg'
                        disabled={comment === '' || star === 0}
                        variant="success"
                        onClick={handleSubmit}
                    >
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCommentModal
