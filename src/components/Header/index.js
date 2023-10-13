import { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import NavBar from './NavBar';
import InputSearch from './InputSearch';
import Profile from './Profile';
import CartButton from './CartButton';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
    const { authState: { user, isAuthenticated }, logout } = useContext(AuthContext);
    const location = useLocation();

    let login = (
        <Link to='/login'>
            <Button className='ms-2' variant='outline-success'>
                <FaUserAlt /> Đăng nhập
            </Button>
        </Link>
    )

    return (
        <header>
            <div className={cx('nav-fixed')}>
                <Navbar expand="lg" className={`bg-body-tertiary`}>
                    <Container className={`${cx('wrapper')}`} fluid>
                        <NavBar />
                        <InputSearch />
                        <CartButton isAuthenticated={isAuthenticated} />
                        {isAuthenticated ? <Profile user={user} logout={logout} /> : login}
                    </Container>
                </Navbar>
            </div>
            {location.pathname !== '/login' && <div className={cx('bg')}></div>}
        </header>
    )
}

export default Header
