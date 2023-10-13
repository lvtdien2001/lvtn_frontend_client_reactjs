import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { LoadingAnimation, Message, Header, Footer } from '../../components';
import { AddProductModal } from '../../components/Cart';
import { SuggestProducts, Comment } from '../../components/Product';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', content: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    const formatPrice = input => {
        const price = String(input);
        if (price.length <= 3) {
            return price + ' đ';
        }
        let priceFormat = [];
        for (let i = price.length; i > 0; i -= 3) {
            priceFormat.push(price.substring(i - 3, i));
        }
        return priceFormat.reverse().join('.') + ' đ';
    }

    const formatName = input => input.length < 25 ? input : (input.substring(0, 25) + ' ...');

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`);
                if (rsp.data.success) {
                    setProduct(rsp.data.product);
                    setLoading(false);
                }
            } catch (error) { }
        }

        fetchApi();

        document.title = 'Chi tiết sản phẩm';
    }, [id])

    let body = (
        <>
            <h3 className='text-primary text-center mb-3 mt-3'>{product.name}</h3>
            <Row className='mb-3'>
                <Col className='text-center' lg={6} xs={12}>
                    <img src={product.image?.url} alt='Hinh anh san pham' width='100%' />
                </Col>
                <Col className={cx('par')} lg={6} xs={12}>
                    <h4 className='text-center fs-4'>Thông tin sản phẩm</h4>
                    <p className={`mt-3 ${cx('text')}`}><b>Thương hiệu:</b> {product.brand?.name}</p>
                    <p className={`mt-3 ${cx('text')}`}><b>Giới tính:</b> {Number(product.gender) === 1 ? 'Nam' : 'Nữ'}</p>
                    <p className={`mt-3 ${cx('text')}`}><b>Phong cách:</b> {product.style?.name}</p>
                    <p className={`mt-3 ${cx('text')}`}><b>Mặt kính:</b> {product.glass?.name}</p>
                    <p className={`mt-3 ${cx('text')}`}><b>Dây đeo:</b> {product.strap?.name}</p>
                    <p className={`mt-3 ${cx('text')}`}><b>Bộ máy:</b> {product.system?.name}</p>
                    <p className='text-danger fs-4 mt-3'><b>Đơn giá: {formatPrice(product.price)}</b></p>
                    <AddProductModal product={product} formatPrice={formatPrice} setMessage={setMessage} />
                    <p className={`fs-5 ${cx('par')}`}><b>Mô tả:</b> {product.description}</p>
                </Col>
            </Row>
            <Row>
                <Col className={`mb-3`} lg={6}>
                    <Comment setMessage={setMessage} product={product} />
                </Col>
            </Row>
        </>
    )

    return (
        <>
            <Header />
            <Container className={cx('wrapper')}>
                <div className='ms-2 text-primary mb-3 fs-5'>
                    <b style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>&#8617; Quay lại</b>
                </div>
                {loading ? <LoadingAnimation /> : body}
                {!loading && <SuggestProducts currentProduct={product} formatName={formatName} formatPrice={formatPrice} />}
            </Container>
            {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
            <Footer />
        </>
    )
}

export default ProductDetail
