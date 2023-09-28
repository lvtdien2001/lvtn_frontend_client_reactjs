import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    }, [])

    const handleClick = productId => {
        navigate(`/product/${productId}`);
    }

    let body = (
        <Row>
            {products.map(product => {
                const renderTooltip = (props) => (
                    <Tooltip id="button-tooltip" {...props}>
                        {product.name}
                    </Tooltip>
                );
                return (
                    <Col key={product._id}>
                        <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                        >
                            <Card className={`p-1 ${cx('card')}`} onClick={() => handleClick(product._id)}>
                                <Card.Img variant="top" src={product.image.url} alt='Hinh anh san pham' />
                                <Card.Body>
                                    <Card.Text>
                                        <b className='text-primary'>{formatName(product.name)}</b><br />
                                        <b className='text-danger'>{formatPrice(product.price)}</b>
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
            <Row>
                <Col>
                    <h4>SẢN PHẨM GỢI Ý</h4>
                </Col>
                <Col className='text-end'>
                    <Link className={cx('link')} to='/product'>
                        <h5>Xem tất cả sản phẩm &#10145;</h5>
                    </Link>
                </Col>
            </Row>
            {loading ? <LoadingAnimation /> : body}
        </div>
    )
}

export default SuggestProducts
