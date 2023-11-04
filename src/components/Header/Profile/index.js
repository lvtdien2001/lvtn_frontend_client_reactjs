import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { AiOutlineLogout, AiOutlineContacts } from 'react-icons/ai';
import { FaRegAddressCard, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';
import defaultAvatar from '../../../assets/avatars/male.png';
import { CartContext } from '../../../contexts';

const cx = classNames.bind(styles);

const Profile = ({ user, logout }) => {
    const { setNum } = useContext(CartContext);

    const handleLogout = () => {
        setNum(0);
        logout();
    }

    return (
        <Dropdown
            align='end'
            className='ms-2'
        >
            <Dropdown.Toggle variant="outline-success">
                <img className={cx('avatar')} src={user?.avatar.url || defaultAvatar} alt='' />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Link to='/address' className={cx('link')}>
                    <Dropdown.Item as='div'><FaRegAddressCard /> Quản lý địa chỉ</Dropdown.Item>
                </Link>

                <Link to='/history' className={cx('link')}>
                    <Dropdown.Item as='div'><FaHistory /> Lịch sử giao dịch</Dropdown.Item>
                </Link>

                <Link to='/profile' className={cx('link')}>
                    <Dropdown.Item as='div'><AiOutlineContacts /> Hồ sơ người dùng</Dropdown.Item>
                </Link>

                <Dropdown.Divider />

                <Link onClick={handleLogout} className={cx('link')} to='#'>
                    <Dropdown.Item className='text-danger' as='div'><AiOutlineLogout /> Đăng xuất</Dropdown.Item>
                </Link>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Profile
