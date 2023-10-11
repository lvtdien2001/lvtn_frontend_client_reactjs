import { useEffect, useState, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { BsStar, BsStarFill } from 'react-icons/bs';
import classNames from 'classnames/bind';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';
import styles from './Comment.module.scss';
import { LoadingAnimation } from '../..';
import { AddCommentModal, UpdateCommentModal } from '..';
import avatar from '../../../assets/avatars/male.png';
import { AuthContext } from '../../../contexts';

const cx = classNames.bind(styles);

const Comment = ({ setMessage, product }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [avg, setAvg] = useState(0);
    const [comment, setComment] = useState();
    const stars = new Array(5).fill('');
    const { authState: { user } } = useContext(AuthContext);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);

                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/comment?productId=${product._id}`);
                setComments(rsp.data.comments);
                const totalStar = rsp.data.comments.reduce((total, comment) => total + comment.star, 0);
                rsp.data.comments.length > 0 && setAvg(parseFloat(totalStar / rsp.data.comments.length).toFixed(1));


                setLoading(false);
            } catch (error) { }

            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/comment/by-user?productId=${product._id}&userId=${user._id}`);
                setComment(rsp.data.comment);
            } catch (error) { }
        }

        fetchApi();
    }, [reload])

    let body = (
        <>
            {comments.length > 0 && <ListGroup className={`mb-3 ${cx('content')}`}>
                {comments.map(comment => {
                    return (
                        <ListGroup.Item key={comment._id}>
                            <img alt='' src={comment.user.avatar?.url || avatar} className={cx('avatar')} />
                            <b> {comment.user?.fullName} </b>
                            {moment(comment.updatedAt).fromNow()}<br />

                            {stars.map((e, i) => {
                                return comment.star >= (i + 1) ?
                                    <BsStarFill key={i} className={cx('star')} /> :
                                    <BsStar key={i} className={cx('star')} />
                            })} <br />

                            {comment.content}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>}
            {comment ?
                <UpdateCommentModal product={product} rating={comment} setMessage={setMessage} setReload={setReload} /> :
                <AddCommentModal setReload={setReload} product={product} setMessage={setMessage} />
            }
        </>
    )

    return (
        <>
            <h4>Đánh giá sản phẩm ({avg === 0 ? 'Chưa có đánh giá' : <>{avg} <BsStarFill className={cx('star')} /></>})</h4>
            {loading ? <LoadingAnimation /> : body}
        </>
    )
}

export default Comment
