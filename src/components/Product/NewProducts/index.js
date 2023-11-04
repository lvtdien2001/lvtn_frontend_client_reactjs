import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Card, Row, Col, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './NewProducts.module.scss';
import { LoadingAnimation } from '../..';

const cx = classNames.bind(styles);

const NewProducts = ({ formatName, formatPrice }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gender, setGender] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product/new?gender=${gender}`);
                if (rsp.data.success) {
                    setProducts(rsp.data.products);
                    setLoading(false);
                }
            } catch (error) { }
        }

        fetchApi()
    }, [gender])

    const handleClick = productId => {
        navigate(`/product/${productId}`);
    }

    let nav = (
        <div
            className={`${cx('nav-wrapper')} d-flex justify-content-center mb-3`}
        >
            <div
                className={`${cx('nav-text', gender === 1 && 'nav-active')} ms-2 me-2 text-center`}
                onClick={() => setGender(1)}
            >
                ĐỒNG HỒ NAM
            </div>
            <div
                className={`${cx('nav-text', gender === 2 && 'nav-active')} ms-2 me-2 text-center`}
                onClick={() => setGender(2)}
            >
                ĐỒNG HỒ NỮ
            </div>
            <div
                className={`${cx('nav-text', gender === 0 && 'nav-active')} ms-2 me-2 text-center`}
                onClick={() => setGender(0)}
            >
                ĐỒNG HỒ ĐÔI
            </div>
        </div>
    )

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
                        lg={3}
                        xs={6}
                        key={product._id}
                    >
                        <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                        >
                            <Card
                                className={`mb-3 ${cx('card')}`}
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
            <h3 className='text-center text-secondary mb-3'>SẢN PHẨM MỚI</h3>

            {nav}

            {loading ? <LoadingAnimation /> : body}

            <div
                className={`text-center ${cx('text-all-product')}`}
            >
                <span onClick={() => navigate('/product')}>XEM TẤT CẢ SẢN PHẨM</span>
            </div>
        </div>
    )
}

export default NewProducts
