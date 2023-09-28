import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { LoadingAnimation, Message } from '../../components';
import { AddProductModal } from '../../components/Cart';
import { SuggestProducts } from '../../components/Product';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', content: '' });
    const { id } = useParams();

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
                <Col lg={1}></Col>
                <Col className='text-center' lg={4} xs={12}>
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
                </Col>
            </Row>
            <Row>
                <p className={`fs-5 ${cx('par')}`}><b>Mô tả:</b> {product.description}</p>
            </Row>
        </>
    )

    return (
        <>
            <Container className={cx('wrapper')}>
                {loading ? <LoadingAnimation /> : body}
                {!loading && <SuggestProducts currentProduct={product} formatName={formatName} formatPrice={formatPrice} />}
            </Container>
            {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
        </>
    )
}

export default ProductDetail
