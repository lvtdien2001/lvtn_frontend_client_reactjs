import { useContext, useState } from 'react';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import axios from 'axios';
import { BiShow, BiHide } from 'react-icons/bi';
import { LoadingAnimation, Message, Header, Footer } from '../../components';
import { AuthContext } from '../../contexts';
import styles from './Profile.module.scss';
import avatar from '../../assets/avatars/male.png';

const cx = classNames.bind(styles);

const Profile = () => {
    const { authState: { authLoading, user }, setReloadUser } = useContext(AuthContext);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [profile, setProfile] = useState({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        image: {}
    });
    const [changePassword, setChangePassword] = useState({
        password: '', newPassword: '', confirmPassword: ''
    })
    const [isInvalid, setIsInvalid] = useState({
        fullName: false, phoneNumber: false, newPassword: false, confirmPassword: false
    })
    const [demoAvatar, setDemoAvatar] = useState(user.avatar?.url);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [isShow, setIsShow] = useState({
        password: false, newPassword: false, confirmPassword: false
    })

    const handleChangeAvatar = e => {
        if (e.target.files[0]) {
            let url = URL.createObjectURL(e.target.files[0]);
            setDemoAvatar(url);
            setProfile(prev => {
                return { ...prev, image: e.target.files[0] }
            });
        } else {
            setDemoAvatar(user.avatar?.url);
            setProfile(prev => {
                return { ...prev, image: {} }
            });
        }
    }

    const handleSubmitProfile = async () => {
        // validate
        const isFullName = profile.fullName.length >= 5 && !(profile.fullName.match(/[0-9]/));
        const isPhoneNumber = /(03|05|07|08|09|01)+([0-9]{8})\b/.test(profile.phoneNumber);
        if (!isFullName || !isPhoneNumber) {
            setIsInvalid(prev => {
                return { ...prev, phoneNumber: !isPhoneNumber, fullName: !isFullName }
            })
        }
        else {
            setIsInvalid(prev => {
                return { ...prev, phoneNumber: false, fullName: false }
            })
            try {
                setLoadingInfo(true);
                const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/user/${user._id}`, {
                    fullName: profile.fullName,
                    phoneNumber: profile.phoneNumber
                })
                if (profile.image.name) {
                    const formData = new FormData();
                    formData.append('image', profile.image);
                    await axios.put(`${process.env.REACT_APP_API_URL}/user/update-avatar/${user._id}`, formData)
                }
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                setReloadUser(prev => !prev);
                setLoadingInfo(false);
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        }
    }

    const resetPassword = () => {
        setChangePassword({
            password: '', newPassword: '', confirmPassword: ''
        });
        setIsShow({
            password: false, newPassword: false, confirmPassword: false
        });
    }

    const handleSubmitPassword = async () => {
        // validate
        const isNewPassword = changePassword.newPassword.length >= 8;
        const isConfirmPassword = changePassword.confirmPassword === changePassword.newPassword;
        if (!isNewPassword || !isConfirmPassword) {
            setIsInvalid(prev => {
                return { ...prev, newPassword: !isNewPassword, confirmPassword: !isConfirmPassword }
            })
        } else {
            setIsInvalid(prev => {
                return { ...prev, newPassword: false, confirmPassword: false }
            });
            try {
                setLoadingPassword(true);
                const data = {
                    oldPassword: changePassword.password,
                    newPassword: changePassword.newPassword
                }
                const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/auth/change-password`, data);
                setMessage({
                    type: 'success',
                    content: rsp.data.msg
                });
                resetPassword();
                setLoadingPassword(false);
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                });
                setLoadingPassword(false);
            }
        }
    }

    let body = (
        <>
            <Row>
                {/* change profile */}
                <Col className='text-center'>
                    {loadingInfo ? <LoadingAnimation /> : <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className={cx('label')}>Email</InputGroup.Text>
                            <Form.Control
                                value={user.email}
                                disabled
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className={cx('label')}>Họ và tên</InputGroup.Text>
                            <Form.Control
                                placeholder='Nhập họ và tên'
                                value={profile.fullName}
                                onChange={e => setProfile(prev => { return { ...prev, fullName: e.target.value } })}
                                isInvalid={isInvalid.fullName}
                            />
                            <Form.Control.Feedback className='text-end' type="invalid">
                                Họ và tên phải có ít nhất 5 ký tự
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className={cx('label')}>Số điện thoại</InputGroup.Text>
                            <Form.Control
                                placeholder='Nhập số điện thoại'
                                value={profile.phoneNumber}
                                onChange={e => setProfile(prev => { return { ...prev, phoneNumber: e.target.value } })}
                                isInvalid={isInvalid.phoneNumber}
                            />
                            <Form.Control.Feedback className='text-end' type="invalid">
                                Số điện thoại không hợp lệ
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className={cx('label')}>Ảnh đại diện</InputGroup.Text>
                            <Form.Control
                                type='file'
                                onChange={e => handleChangeAvatar(e)}
                            />
                        </InputGroup>

                        <img className='mb-3' alt='' src={demoAvatar || avatar} width='105px' />
                        <br />
                        <Button className='mb-3' variant='outline-success' onClick={handleSubmitProfile}>
                            Lưu thay đổi
                        </Button>
                    </>}
                </Col>

                {/* change password */}
                <Col className='text-center'>
                    {loadingPassword ? <LoadingAnimation /> : <>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className={cx('label')}>Mậu khẩu cũ</InputGroup.Text>
                            <Form.Control
                                type={isShow.password ? 'text' : 'password'}
                                className={cx('b-r-n')}
                                value={changePassword.password}
                                onChange={e => setChangePassword(prev => { return { ...prev, password: e.target.value } })}
                            />
                            <InputGroup.Text
                                className={cx('toggle')}
                                onClick={() => setIsShow(prev => { return { ...prev, password: !prev.password } })}
                            >
                                {isShow.password ? <BiHide /> : <BiShow />}
                            </InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className={cx('label')}>Mậu khẩu mới</InputGroup.Text>
                            <Form.Control
                                type={isShow.newPassword ? 'text' : 'password'}
                                className={cx('b-r-n')}
                                value={changePassword.newPassword}
                                onChange={e => setChangePassword(prev => { return { ...prev, newPassword: e.target.value } })}
                                isInvalid={isInvalid.newPassword}
                            />
                            <InputGroup.Text
                                className={cx('toggle')}
                                onClick={() => setIsShow(prev => { return { ...prev, newPassword: !prev.newPassword } })}
                            >
                                {isShow.newPassword ? <BiHide /> : <BiShow />}
                            </InputGroup.Text>
                            <Form.Control.Feedback className='text-end' type="invalid">
                                Mật khẩu phải có ít nhất 8 ký tự
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className={cx('label')}>Nhập lại mật khẩu</InputGroup.Text>
                            <Form.Control
                                type={isShow.confirmPassword ? 'text' : 'password'}
                                className={cx('b-r-n')}
                                value={changePassword.confirmPassword}
                                onChange={e => setChangePassword(prev => { return { ...prev, confirmPassword: e.target.value } })}
                                isInvalid={isInvalid.confirmPassword}
                            />
                            <InputGroup.Text
                                className={cx('toggle')}
                                onClick={() => setIsShow(prev => { return { ...prev, confirmPassword: !prev.confirmPassword } })}
                            >
                                {isShow.confirmPassword ? <BiHide /> : <BiShow />}
                            </InputGroup.Text>
                            <Form.Control.Feedback className='text-end' type="invalid">
                                Mật khẩu không khớp
                            </Form.Control.Feedback>
                        </InputGroup>

                        <Button className='mb-3' variant='outline-success' onClick={handleSubmitPassword}>
                            Đổi mật khẩu
                        </Button>
                    </>}
                </Col>
            </Row>

            <Row>

            </Row>
        </>
    )

    return (
        <>
            <Header />
            <Container>
                <div className={cx('wrapper')}>
                    <h4>Hồ sơ của tôi</h4>
                    <h6 className='text-secondary mb-3'>Quản lý thông tin hồ sơ để bảo mật tài khoản</h6>
                    {authLoading ? LoadingAnimation : body}
                </div>
            </Container>
            {message.content && <Message message={message.content} type={message.type} setMessage={setMessage} />}
            <Footer />
        </>
    )
}

export default Profile
