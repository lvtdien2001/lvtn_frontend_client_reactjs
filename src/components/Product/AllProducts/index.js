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
        <Row>
            {products.map(product => {
                const renderTooltip = (props) => (
                    <Tooltip id="button-tooltip" {...props}>
                        {product.name}
                    </Tooltip>
                );
                return (
                    <Col lg={3} xs={6} key={product._id}>
                        <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                        >
                            <Card className={`p-1 mt-2 ${cx('card')}`} onClick={() => handleClick(product._id)}>
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
            {body}
        </div>
    )
}

export default AllProducts
