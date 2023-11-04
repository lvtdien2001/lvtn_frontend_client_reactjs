import { useEffect, useState, useContext } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import classNames from 'classnames/bind';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';
import styles from './Comment.module.scss';
import { LoadingAnimation } from '../..';
import { AddComment } from '..';
import { AuthContext } from '../../../contexts';
import avatar from '../../../assets/avatars/male.png';

const cx = classNames.bind(styles);

const Comment = ({ setMessage, product }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    // const [avg, setAvg] = useState(0);
    const [comment, setComment] = useState();
    const stars = new Array(5).fill('');
    const { authState: { user } } = useContext(AuthContext);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);

                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/comment?productId=${product._id}`);
                setComments(rsp.data.comments);
                // const totalStar = rsp.data.comments.reduce((total, comment) => total + comment.star, 0);
                // rsp.data.comments.length > 0 && setAvg(parseFloat(totalStar / rsp.data.comments.length).toFixed(1));

                setLoading(false);
            } catch (_) { }

            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/comment/by-user?productId=${product._id}&userId=${user._id}`);
                setComment(rsp.data.comment);
            } catch (_) { }
        }

        fetchApi();
    }, [reload, user, product])

    let body = (
        <>
            {comments.map(comment => {
                return (
                    <div
                        key={comment._id}
                        className='mb-3'
                    >
                        <div className='d-flex'>
                            <div className='me-3'>
                                <img
                                    alt=''
                                    src={comment.user?.avatar?.url || avatar}
                                    className={cx('avatar')}
                                />
                            </div>
                            <div>
                                <b>
                                    {comment.user?.fullName}
                                </b>&nbsp;
                                <span className='text-secondary'>
                                    {moment(comment.updatedAt).fromNow()}
                                </span><br />
                                {stars.map((e, i) => {
                                    return comment.star >= (i + 1) ?
                                        <BsStarFill key={i} className={cx('star')} /> :
                                        <BsStar key={i} className={cx('star')} />
                                })} <br />
                                {comment.content}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )

    return (
        <>
            <h4 className='text-secondary'>
                ĐÁNH GIÁ - BÌNH LUẬN
            </h4>
            <p>
                Có <b>{comments.length}</b> bình luận, đánh giá về <b>{product?.name}</b>
            </p>
            {loading ? <LoadingAnimation /> :
                <>
                    <AddComment
                        comment={comment}
                        setReload={setReload}
                        product={product}
                        setMessage={setMessage}
                    />
                    <div className={cx('comments-list')}>
                        {body}
                    </div>
                </>
            }
        </>
    )
}

export default Comment
