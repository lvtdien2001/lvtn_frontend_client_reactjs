import { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TbLock, TbMailFilled, TbUserSquare, TbPhoneCall, TbQrcode, TbArrowBack } from 'react-icons/tb';
import classNames from 'classnames/bind';
import styles from './RegisterForm.module.scss';
import axios from 'axios';
import { LoadingAnimation } from '..';

const cx = classNames.bind(styles);

const RegisterForm = ({ setCurrentForm, setMessage }) => {
    const [data, setData] = useState({
        email: '', fullName: '', phoneNumber: '', password: '', confirmPassword: ''
    });
    const [isInValid, setIsInvalid] = useState({
        email: false, fullName: false, phoneNumber: false, password: false, confirmPassword: false
    });
    const [showOTP, setShowOTP] = useState(false);
    const [OTP, setOTP] = useState('');
    const [OTPInvalid, setOTPInvalid] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetData = () => {
        setData({
            email: '', fullName: '', phoneNumber: '', password: '', confirmPassword: ''
        });
        setIsInvalid({
            email: false, fullName: false, phoneNumber: false, password: false, confirmPassword: false
        });
        setShowOTP(false);
        setOTPInvalid(false);
        setOTP('');
    }

    const sendOTP = async () => {
        try {
            setLoading(true);
            setOTP('');
            const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/otp/send`, { email: data.email });
            if (rsp.data.success) {
                setLoading(false);
                setMessage({
                    type: 'success',
                    content: 'Gửi mã OTP thành công'
                })
            }
        } catch (error) {
            setLoading(false);
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    const handleSubmit = async (e) => {
        e?.preventDefault();

        // validate form
        const isEmail = data.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const isFullName = data.fullName.length >= 5 && !(data.fullName.match(/[0-9]/));
        const isPhoneNumber = /(03|05|07|08|09|01)+([0-9]{8})\b/.test(data.phoneNumber);
        const isPassword = data.password.length >= 8 && data.password.length <= 24;
        const isConfirmPassword = data.confirmPassword === data.password;

        if (!isEmail || !isFullName || !isPhoneNumber || !isConfirmPassword || !isPassword) {
            setIsInvalid({
                email: !isEmail ? true : false,
                fullName: !isFullName,
                phoneNumber: !isPhoneNumber,
                password: !isPassword,
                confirmPassword: !isConfirmPassword
            })
        } else if (!showOTP) {
            setIsInvalid({
                email: false, fullName: false, phoneNumber: false, password: false, confirmPassword: false
            })
            // check email and send OTP
            try {
                setLoading(true);
                const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/auth/check-account`, { email: data.email });
                if (rsp.data.success) {
                    try {
                        const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/otp/send`, { email: data.email });
                        if (rsp.data.success) {
                            setLoading(false);
                            setShowOTP(true);
                            setMessage({ type: 'success', content: 'Đã gửi mã xác thực OTP' })
                        }
                    } catch (error) {
                        setLoading(false);
                        setMessage({
                            type: 'danger',
                            content: error.response?.data.msg || error.message
                        })
                    }
                }
            } catch (error) {
                setLoading(false);
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        } else {
            setIsInvalid({
                email: false, fullName: false, phoneNumber: false, password: false, confirmPassword: false
            })
            // validate OTP
            if (OTP.length !== 6) {
                setOTPInvalid(true);
            } else {
                setOTPInvalid(false);
                try {
                    // check OTP
                    setLoading(true);
                    const rspCheckOTP = await axios.post(`${process.env.REACT_APP_API_URL}/otp/check`, { email: data.email, otp: OTP });
                    if (rspCheckOTP.data.success) {
                        const { email, password, fullName, phoneNumber } = data;
                        const submitData = {
                            email, password, fullName, phoneNumber, otp: rspCheckOTP.data.otp
                        }
                        try {
                            // register account
                            const rspRegister = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, submitData);
                            if (rspRegister.data.success) {
                                setLoading(false);
                                setMessage({ type: 'success', content: rspRegister.data.msg || 'Tạo tài khoản thành công' })
                            };
                            resetData();
                        } catch (error) {
                            setMessage({ type: 'danger', content: error.response?.data.msg || error.message })
                        }
                    }
                } catch (error) {
                    setLoading(false);
                    setMessage({
                        type: 'danger', content: error.response?.data.msg || error.message
                    })
                }
            }
        }
    }

    let inputOTP = (
        <>
            <Button onClick={() => setShowOTP(false)} size='sm' variant='success' className='mb-3'>
                <TbArrowBack /> Trở lại
            </Button>

            <InputGroup hasValidation className="mb-3">
                <InputGroup.Text>
                    <TbQrcode />
                </InputGroup.Text>
                <Form.Control
                    type="number"
                    placeholder="Nhập mã OTP"
                    required
                    value={OTP}
                    onChange={e => setOTP(e.target.value)}
                    isInvalid={OTPInvalid}
                />
                <Button variant='success' onClick={sendOTP}>Gửi lại OTP</Button>
                <Form.Control.Feedback className='text-end' type="invalid">
                    Mã OTP không hợp lệ
                </Form.Control.Feedback>
                <Form.Text>Mã OTP được gửi qua email của bạn</Form.Text>
            </InputGroup>
        </>
    )

    let body = (
        <>
            <InputGroup hasValidation className="mb-3">
                <InputGroup.Text><TbMailFilled /></InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Nhập email của bạn"
                    required
                    value={data.email}
                    onChange={e => setData(prev => { return { ...prev, email: e.target.value } })}
                    isInvalid={isInValid.email}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Email không hợp lệ
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup hasValidation className="mb-3">
                <InputGroup.Text><TbUserSquare /></InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Họ và tên của bạn"
                    required
                    value={data.fullName}
                    onChange={e => setData(prev => { return { ...prev, fullName: e.target.value } })}
                    isInvalid={isInValid.fullName}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Họ và tên phải có ít nhất 5 ký tự
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup hasValidation className="mb-3">
                <InputGroup.Text><TbPhoneCall /></InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Số điện thoại của bạn"
                    required
                    value={data.phoneNumber}
                    onChange={e => setData(prev => { return { ...prev, phoneNumber: e.target.value } })}
                    isInvalid={isInValid.phoneNumber}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Số điện thoại không hợp lệ
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text><TbLock /></InputGroup.Text>
                <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required
                    value={data.password}
                    onChange={e => setData(prev => { return { ...prev, password: e.target.value } })}
                    isInvalid={isInValid.password}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Mật khẩu phải có ít nhất 8 ký tự
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text><TbLock /></InputGroup.Text>
                <Form.Control
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    required
                    value={data.confirmPassword}
                    onChange={e => setData(prev => { return { ...prev, confirmPassword: e.target.value } })}
                    isInvalid={isInValid.confirmPassword}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Mật khẩu không khớp
                </Form.Control.Feedback>
            </InputGroup>

            <Row className='justify-content-beetwen mb-2'>
                <Col><Link onClick={() => setCurrentForm('forgotPassword')} to='#'>Quên mật khẩu?</Link></Col>
                <Col className='text-end'><Link onClick={() => setCurrentForm('login')} to='#'>Đăng nhập</Link></Col>
            </Row>
        </>
    )

    return (
        <Form onSubmit={(e) => handleSubmit(e)} className={cx('form')} style={{ width: '350px' }}>
            <h2 className='text-center text-success mb-4'>TẠO TÀI KHOẢN MỚI</h2>

            {loading ? <LoadingAnimation /> : (showOTP ? inputOTP : body)}

            <Button
                variant="outline-success"
                type="submit"
                style={{ width: '100%' }}
                size='lg'
                onClick={handleSubmit}
            >
                {showOTP ? 'Xác nhận' : 'Tạo tài khoản'}
            </Button>
        </Form>
    )
}

export default RegisterForm
