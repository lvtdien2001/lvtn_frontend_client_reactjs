import { useNavigate } from 'react-router-dom';
import { Row, Col, Tooltip, OverlayTrigger, Card } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './AllProducts.module.scss';

const cx = classNames.bind(styles);

const AllProducts = ({ products, formatName, formatPrice }) => {
    const navigate = useNavigate();

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
                                    <Card.Text className='text-center'>
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
            {body}
        </div>
    )
}

export default AllProducts
