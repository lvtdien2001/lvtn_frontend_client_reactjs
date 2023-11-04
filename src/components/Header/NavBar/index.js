import { useEffect, useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AiFillHome } from 'react-icons/ai';
import axios from 'axios';
import styles from './NavBar.module.scss';
import { LoadingAnimation } from '../..';

const cx = classNames.bind(styles);

const NavBar = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
                setBrands(rsp.data.brands);
                setLoading(false);
            } catch (_) { }
        }
        fetchApi();
    }, [])

    let brandsList = (
        <Dropdown>
            <Dropdown.Toggle
                as='b'
                className={cx('text-menu')}
            >
                THƯƠNG HIỆU
            </Dropdown.Toggle>

            <Dropdown.Menu className={cx('dropdown-menu')}>
                {loading ? <LoadingAnimation /> : brands.map(brand => {
                    return (
                        <Dropdown.Item
                            as={'div'}
                            key={brand._id}
                            className={`text-center mb-1 ${cx('dropdown-items')}`}
                        >
                            <img
                                alt='logo thuong hieu'
                                src={brand.logo?.url}
                                width={'100px'}
                            />
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )

    let menu = (
        <Row className='text-center align-items-center'>
            <Col
                className={`text-end ${cx('desktop')}`}
                xs={1}
            >
                <b
                    className={cx('text-menu', 'home')}
                    onClick={() => navigate('/')}
                >
                    <AiFillHome />
                </b>
            </Col>
            <Col>
                {brandsList}
            </Col>
            <Col>
                <b
                    className={cx('text-menu')}
                    onClick={() => navigate('/product?gender=1')}
                >
                    ĐỒNG HỒ NAM
                </b>
            </Col>
            <Col>
                <b
                    className={cx('text-menu')}
                    onClick={() => navigate('/product?gender=2')}
                >
                    ĐỒNG HỒ NỮ
                </b>
            </Col>
            <Col>
                <b
                    className={cx('text-menu')}
                    onClick={() => navigate('/product?gender=0')}
                >
                    ĐỒNG HỒ ĐÔI
                </b>
            </Col>
            <Col>
                <b
                    className={cx('text-menu')}
                >
                    LIÊN HỆ
                </b>
            </Col>
            <Col>
                <b
                    className={cx('text-menu')}
                >
                    KINH NGHIỆM
                </b>
            </Col>
            <Col>
                <b
                    className={cx('text-menu')}
                >
                    GIỚI THIỆU
                </b>
            </Col>
        </Row>
    )

    return (
        <div>
            {menu}
        </div>
    );
}

export default NavBar
