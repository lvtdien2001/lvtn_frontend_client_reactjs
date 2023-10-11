import { Container, Row, Col } from 'react-bootstrap';
import { FaLocationDot, FaPhoneFlip, FaFacebook, FaSkype, FaInstagram } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    let body = (
        <Row>
            <Col className='mb-1' lg={4} xs={12}>
                <h5>HÂN HẠNH ĐƯỢC PHỤC VỤ QUÝ KHÁCH</h5><br />
                <FaLocationDot /> Địa chỉ: số 112, Trần Hưng Đạo, Ninh Kiều, Cần Thơ <br />
                <FaPhoneFlip /> Điện thoại: 0392 313 131 - 0909 252 525 <br />
                &copy; Coppyright 2023 Lê Văn Thanh Điền
            </Col>
            <Col lg={4} xs={12}>
                <h5>LIÊN HỆ CHÚNG TÔI</h5><br />
                <FaFacebook /> Facebook: <Link to='https://www.facebook.com/vuthanhdien.tahmkench'>https://www.facebook.com/</Link> <br />
                <FaSkype /> Skype: <Link to='#'>https://www.skype.com/</Link> <br />
                <FaInstagram /> Instagram: <Link to='#'>https://www.instagram.com/</Link>
            </Col>
            <Col></Col>
        </Row>
    )

    return (
        <footer className={cx('wrapper')}>
            <Container>
                {body}
            </Container>
        </footer>
    )
}

export default Footer
