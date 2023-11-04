import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsStar, BsStarFill } from 'react-icons/bs';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AddComment.module.scss';

const cx = classNames.bind(styles);

const AddComment = ({ product, setMessage, setReload, comment }) => {
    const [star, setStar] = useState(0);
    const [content, setContent] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const stars = [
        { id: 1, decs: 'Rất tệ' },
        { id: 2, decs: 'Tệ' },
        { id: 3, decs: 'Tạm ổn' },
        { id: 4, decs: 'Tốt' },
        { id: 5, decs: 'Rất tốt' },
    ]

    const handleSubmit = async e => {
        e?.preventDefault();
        if (star === 0) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
            try {
                const data = {
                    productId: product._id,
                    content,
                    star
                }
                const rsp = comment
                    ? await axios.put(`${process.env.REACT_APP_API_URL}/comment/${comment._id}`, data)
                    : await axios.post(`${process.env.REACT_APP_API_URL}/comment`, data)
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                setReload(prev => !prev);
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                });
            }
        }
    }

    useEffect(() => {
        if (comment) {
            setContent(comment?.content);
            setStar(comment?.star);
        }
    }, [comment])

    return (
        <>
            <h6>
                <b>Nhận xét và đánh giá</b>
            </h6>

            <div className='d-flex'>
                {stars.map(e =>
                    <div
                        key={e.id}
                        className={cx('star-wrapper')}
                    >
                        {e.id <= star ?
                            <BsStarFill onClick={() => setStar(e.id)} className={cx('star')} /> :
                            <BsStar onClick={() => setStar(e.id)} className={cx('star')} />
                        }
                        <br />{e.decs}
                    </div>)
                }
            </div>
            {isInvalid && <div className='text-danger mb-3'>
                Bạn chưa đánh giá sản phẩm
            </div>}

            <Form
                className={`mb-3 ${cx('form')}`}
                onSubmit={e => handleSubmit(e)}
            >
                <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Viết đánh giá của bạn . . .'
                    value={content}
                    required
                    onChange={e => setContent(e.target.value)}
                />
                <Button
                    type='submit'
                    className='mt-1 mb-3'
                    variant='success'
                >
                    {comment ? 'Sửa bình luận' : 'Gửi bình luận'}
                </Button>
            </Form>
        </>
    );
}

export default AddComment
