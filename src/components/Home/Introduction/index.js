import { Row, Col } from 'react-bootstrap';
import img1 from '../../../assets/images/longines-sale_1698035530.jpg';
import img2 from '../../../assets/images/tissot-prx_1667530751.jpg';

const Introduction = () => {
    return (
        <Row className='mt-3 mb-3'>
            <Col style={{ cursor: 'pointer' }}>
                <img
                    alt=''
                    src={img1}
                    width={'100%'}
                    height={'100%'}
                />
            </Col>
            <Col style={{ cursor: 'pointer' }}>
                <img
                    alt=''
                    src={img2}
                    width={'100%'}
                    height={'100%'}
                />
            </Col>
        </Row>
    )
}

export default Introduction
