import { Row, Col } from 'react-bootstrap';
import img1 from '../../../assets/images/bst-dong-ho-nam.webp';
import img2 from '../../../assets/images/bst-dong-ho-nu.webp';
import img3 from '../../../assets/images/bst-dong-ho-moi.webp';
import classNames from 'classnames/bind';
import styles from './Collection.module.scss';

const cx = classNames.bind(styles);

const Collection = ({ }) => {
    return (
        <>
            <Row className={`${cx('desktop')} mt-3 mb-3`}>
                <Col
                    xs={12}
                    lg={4}
                    xxl={4}
                    className='text-center mb-5'
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        alt=''
                        src={img1}
                        width={'100%'}
                        height={'100%'}
                    />
                    <div className='text-secondary fs-5'>BST ĐỒNG HỒ NAM HOT</div>
                </Col>
                <Col
                    xs={12}
                    lg={4}
                    xxl={4}
                    className='text-center mb-5'
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        alt=''
                        src={img2}
                        width={'100%'}
                        height={'100%'}
                    />
                    <div className='text-secondary fs-5'>BST ĐỒNG HỒ NỮ HOT</div>
                </Col>
                <Col
                    xs={12}
                    lg={4}
                    xxl={4}
                    className='text-center mb-5'
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        alt=''
                        src={img3}
                        width={'100%'}
                        height={'100%'}
                    />
                    <div className='text-secondary fs-5'>CÁC MẪU ĐỒNG HỒ MỚI</div>
                </Col>
            </Row>
        </>
    )
}

export default Collection
