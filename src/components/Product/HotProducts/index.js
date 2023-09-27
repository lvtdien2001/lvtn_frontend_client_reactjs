import { useEffect, useState } from 'react';
import { Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';
import { LoadingAnimation } from '../..';
import styles from './HotProducts.module.scss';

const cx = classNames.bind(styles);

const HotProducts = ({ formatPrice, formatName }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product/hot`);
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
                    <h4>SẢN PHẨM BÁN CHẠY</h4>
                </Col>
            </Row>
            {loading ? <LoadingAnimation /> : body}
        </div>
    )
}

export default HotProducts
