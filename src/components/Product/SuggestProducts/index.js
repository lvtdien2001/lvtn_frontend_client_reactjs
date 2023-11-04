import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Tooltip, Row, Col, OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './SuggestProducts.module.scss';
import axios from 'axios';
import { LoadingAnimation } from '../..';

const cx = classNames.bind(styles);

const SuggestProducts = ({ formatName, formatPrice, currentProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios
                    .get(`${process.env.REACT_APP_API_URL}/product/suggest?price=${currentProduct?.price}&gender=${currentProduct?.gender}&id=${currentProduct._id}`);
                if (rsp.data.success) {
                    setProducts(rsp.data.products);
                    setLoading(false);
                }
            } catch (error) { }
        }

        fetchApi()
    }, [currentProduct])

    const handleClick = productId => {
        navigate(`/product/${productId}`);
    }

    let body = (
        <Row className='mb-3'>
            {products.map(product => {
                const renderTooltip = (props) => (
                    <Tooltip id="button-tooltip" {...props}>
                        {product.name}
                    </Tooltip>
                );
                return (
                    <Col
                        key={product._id}
                        lg={3}
                        xs={6}
                    >
                        <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                        >
                            <Card
                                className={` ${cx('card')}`}
                                onClick={() => handleClick(product._id)}
                            >
                                <Card.Img
                                    variant="top"
                                    src={product.image.url}
                                    alt='Hinh anh san pham'
                                />
                                <Card.Body>
                                    <Card.Text as='div' className='text-center'>
                                        <p className={`${cx('product-name')} text-secondary`}>
                                            {product.name}
                                        </p>
                                        <p className={`${cx('product-price')} text-danger`}>
                                            Giá: {formatPrice(product.price)}
                                        </p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </OverlayTrigger>
                    </Col>
                )
            })}
        </Row>
    )

    return (
        <div className={`mb-3 ${cx('wrapper')}`}>
            <h3 className='text-center mb-3 text-secondary'>SẢN PHẨM GỢI Ý</h3>
            {loading ? <LoadingAnimation /> : body}

            <div
                className={`text-center ${cx('text-all-product')}`}
            >
                <span onClick={() => navigate('/product')}>XEM TẤT CẢ SẢN PHẨM</span>
            </div>
        </div>
    )
}

export default SuggestProducts
