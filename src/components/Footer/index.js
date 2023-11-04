import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaSkype, FaInstagram, FaYoutube } from 'react-icons/fa6';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import img from '../../assets/images/bo_cong_thuong.png';

const cx = classNames.bind(styles);

const Footer = () => {
    let body = (
        <>
            <Row
                style={{ borderBottom: 'solid 1px var(--bs-gray-300)' }}
                className='mb-3'
            >
                <Col
                    lg={3}
                    xs={12}
                    md={6}
                    className='mb-3'
                >
                    <h5 className='mb-3 text-secondary'>VỀ CHÚNG TÔI</h5>
                    <div className={`mb-1 ${cx('link')}`}>Giới thiệu về Đồng hồ Thanh Điền</div>
                    <div className={`mb-1 ${cx('link')}`}>Triết lý kinh doanh</div>
                    <div className={`mb-1 ${cx('link')}`}>Giấy chứng nhận và giải thưởng</div>
                    <div className={`mb-1 ${cx('link')}`}>Khách hàng nói gì về chúng tôi</div>
                </Col>
                <Col
                    lg={3}
                    xs={12}
                    md={6}
                    className='mb-3'
                >
                    <h5 className='mb-3 text-secondary'>CHĂM SÓC KHÁCH HÀNG</h5>
                    <div className={`mb-1 ${cx('link')}`}>Hướng dẫn mua hàng</div>
                    <div className={`mb-1 ${cx('link')}`}>Chính sách đổi trả</div>
                    <div className={`mb-1 ${cx('link')}`}>Chính sách bảo hành</div>
                    <div className={`mb-1 ${cx('link')}`}>Dịch vụ và sửa chữa</div>
                    <div className={`mb-1 ${cx('link')}`}>Hướng dẫn sử dụng đồng hồ</div>
                    <div className={`mb-1 ${cx('link')}`}>Chính sách khách hàng thân thiết</div>
                </Col>
                <Col
                    lg={3}
                    xs={12}
                    md={6}
                    className='mb-3'
                >
                    <h5 className='mb-3 text-secondary'>TIỆN ÍCH</h5>
                    <div className={`mb-1 ${cx('link')}`}>Tin tức và sự kiện</div>
                    <div className={`mb-1 ${cx('link')}`}>Tuyển dụng</div>
                    <div className={`mb-1 ${cx('link')}`}>Thanh toán</div>
                    <div className={`mb-1 ${cx('link')}`}>Mua hàng online</div>
                    <div className={`mb-1 ${cx('link')}`}>Mua hàng trả góp</div>
                </Col>
                <Col
                    lg={3}
                    xs={12}
                    md={6}
                    className='mb-3'
                >
                    <h5 className='mb-3 text-secondary'>LIÊN KẾT</h5>
                    <div className='d-flex mb-3'>
                        <div className={`ms-2 me-2 text-primary ${cx('social')}`}>
                            <FaFacebook />
                        </div>
                        <div className={`ms-2 me-2 ${cx('social')}`}>
                            <FaInstagram />
                        </div>
                        <div className={`ms-2 me-2 text-info ${cx('social')}`}>
                            <FaSkype />
                        </div>
                        <div className={`ms-2 me-2 text-danger ${cx('social')}`}>
                            <FaYoutube />
                        </div>
                    </div>

                    <div className='mt-3'>
                        <img
                            alt=''
                            src={img}
                        />
                    </div>
                </Col>
            </Row>

            <Row className='justify-content-center mb-3'>
                <Col
                    className='text-center text-secondary me-3'
                    lg={5}
                    style={{ borderBottom: 'solid 1px var(--bs-gray-300)' }}
                >
                    <h6>TRẦN HƯNG ĐẠO - THÀNH PHỐ HỒ CHÍ MINH</h6>
                    <div>
                        Địa chỉ: 205 Trần Hưng Đạo, phường Cô Giang, Quận 1, TP.Hồ Chí Minh (gần Ngân hàng Vietinbank)<br />
                        Điện thoại: 0836.88.99.86<br />
                        Email: thanhdienwatch@gmail.com
                    </div>
                </Col>

                <Col
                    className='text-center text-secondary ms-3'
                    lg={5}
                    style={{ borderBottom: 'solid 1px var(--bs-gray-300)' }}
                >
                    <h6>HAI BÀ TRƯNG - THÀNH PHỐ HỒ CHÍ MINH</h6>
                    <div>
                        Địa chỉ: 300 Hai Bà Trưng, phường Tân Định, Quận 1, TP. Hồ Chí Minh (gần nhà thờ Tân Định)<br />
                        Điện thoại: 08899.36168<br />
                        Email: thanhdienwatch@gmail.com
                    </div>
                </Col>
            </Row>

            <Row className='justify-content-center mb-3'>
                <Col
                    className='text-center text-secondary'
                    lg={5}
                    style={{ borderBottom: 'solid 1px var(--bs-gray-300)' }}
                >
                    <h6>NGUYỄN VIỆT HỒNG - THÀNH PHỐ CẦN THƠ</h6>
                    <div>
                        Địa chỉ: 160 Nguyễn Việt Hồng, phường Xuân Khánh, Quận Ninh Kiều, TP. Cần Thơ<br />
                        Điện thoại: 0836.88.99.86<br />
                        Email: thanhdienwatch@gmail.com
                    </div>
                </Col>

                <Col
                    className='text-center text-secondary'
                    lg={5}
                    style={{ borderBottom: 'solid 1px var(--bs-gray-300)' }}
                >
                    <h6>ĐƯỜNG 3/2 - THÀNH PHỐ CẦN THƠ</h6>
                    <div>
                        Địa chỉ: 3/2 phường Hưng Lợi, Quận Ninh Kiều, TP. Cần Thơ<br />
                        Điện thoại: 08899.36168<br />
                        Email: thanhdienwatch@gmail.com
                    </div>
                </Col>
            </Row>
        </>
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
