import { useContext, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FaUserAlt, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import logo from '../../assets/images/logo2.jpg';
import NavBar from './NavBar';
import InputSearch from './InputSearch';
import Profile from './Profile';
import { CartButtonDesktop, CartButtonMobile } from './CartButton';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
    const { authState: { user, isAuthenticated }, logout } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    let loginDesktop = (
        <Link to='/login'>
            <Button
                className={`ms-2 ${cx('desktop')}`}
                variant='outline-success'
            >
                <FaUserAlt /> Đăng nhập
            </Button>
        </Link>
    )

    let loginMobile = (
        <Link to='/login'>
            <Button
                className={`ms-1 ${cx('mobile')}`}
                variant='outline-success'
                size='sm'
            >
                <FaUserAlt />
            </Button>
        </Link>
    )

    let desktop = (
        <Container className={cx('desktop')}>
            <Row className='align-items-center mb-3'>
                <Col className='text-center'>
                    <img
                        alt='logo'
                        src={logo}
                        width={'100px'}
                        className={cx('logo')}
                        onClick={() => navigate('/')}
                    />
                </Col>
                <Col>
                    <InputSearch />

                </Col>
                <Col className='justify-content-end d-flex'>
                    <CartButtonDesktop isAuthenticated={isAuthenticated} />
                    {isAuthenticated ?
                        <Profile
                            user={user}
                            logout={logout}
                            navigate={navigate}
                        />
                        : loginDesktop
                    }
                </Col>
            </Row>
            <NavBar />
        </Container>
    )

    let mobile = (
        <Container className={cx('mobile')}>
            <Row className='mt-1 align-items-center'>
                <Col>
                    <img
                        alt='logo'
                        src={logo}
                        width={'100px'}
                        className={cx('logo')}
                        onClick={() => navigate('/')}
                    />
                </Col>
                <Col className='text-end mb-2'>
                    <FaBars
                        className={cx('bar-icon')}
                        onClick={() => setShow(prev => !prev)}
                    />

                    {show && <ListGroup className='text-start'>
                        <ListGroup.Item
                            className={cx('nav')}
                            onClick={() => navigate('/product?gender=1')}
                        >
                            ĐỒNG HỒ NAM
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={cx('nav')}
                            onClick={() => navigate('/product?gender=2')}
                        >
                            ĐỒNG HỒ NỮ
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={cx('nav')}
                            onClick={() => navigate('/product?gender=0')}
                        >
                            ĐỒNG HỒ ĐÔI
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={cx('nav')}
                            onClick={() => navigate('/')}
                        >
                            LIÊN HỆ
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={cx('nav')}
                            onClick={() => navigate('/')}
                        >
                            GIỚI THIỆU
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={cx('nav')}
                            onClick={() => navigate('/')}
                        >
                            KINH NGHIỆM
                        </ListGroup.Item>
                    </ListGroup>}

                    <div className='mt-3 d-flex justify-content-end'>
                        <CartButtonMobile isAuthenticated={isAuthenticated} />
                        {isAuthenticated ?
                            <Profile
                                user={user}
                                logout={logout}
                                navigate={navigate}
                            />
                            : loginMobile
                        }
                    </div>
                </Col>
            </Row>
            <InputSearch className='mb-1' />
        </Container>
    )

    return (
        <header className={`${cx('wrapper')} mb-3`}>
            {desktop}

            {mobile}
        </header>
    )
}

export default Header
