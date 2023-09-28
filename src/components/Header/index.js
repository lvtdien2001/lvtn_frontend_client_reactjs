import { useContext } from 'react';
import { Button, Container, Badge, Navbar } from 'react-bootstrap';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import NavBar from './NavBar';
import InputSearch from './InputSearch';
import Profile from './Profile';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
    const { authState: { user, isAuthenticated }, logout } = useContext(AuthContext);

    let cart = (
        <Button className='ms-2' variant='outline-success'>
            <FaShoppingCart /> Giỏ hàng <Badge bg="danger">9</Badge>
        </Button>
    )

    let login = (
        <Link to='login'>
            <Button className='ms-2' variant='outline-success'>
                <FaUserAlt /> Đăng nhập
            </Button>
        </Link>
    )

    return (
        <>
            <div className={cx('nav-fixed')}>
                <Navbar expand="lg" className={`bg-body-tertiary`}>
                    <Container className={`${cx('wrapper')}`} fluid>
                        <NavBar />
                        <InputSearch />
                        {cart}
                        {isAuthenticated ? <Profile user={user} logout={logout} /> : login}
                    </Container>
                </Navbar>
            </div>
            <div style={{ height: '80px' }}></div>
        </>
    )
}

export default Header
