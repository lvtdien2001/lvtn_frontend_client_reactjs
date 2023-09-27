import { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TbMailFilled, TbQrcode } from 'react-icons/tb';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ForgotPasswordForm.module.scss';
import { LoadingAnimation } from '../..';

const cx = classNames.bind(styles);

const ForgotPasswordForm = ({ setCurrentForm, setMessage }) => {
    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [OTPInvalid, setOTPInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);

    const resetData = () => {
        setEmail('');
        setOTP('');
        setLoading(false);
    }

    const sendOTP = async () => {
        try {
            setLoading(true);
            setOTP('');
            const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/otp/send`, { email });
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
        const isEmail = email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!isEmail) {
            setEmailInvalid(true);
        } else if (!showOTP) {
            setEmailInvalid(false);

            // send OTP
            try {
                setLoading(true);

                const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/otp/send`, { email });
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
        } else {
            setEmailInvalid(false);
            // validate OTP
            if (OTP.length !== 6) {
                setOTPInvalid(true);
            } else {
                setOTPInvalid(false);
                try {
                    // check OTP
                    setLoading(true);
                    const rspCheckOTP = await axios.post(`${process.env.REACT_APP_API_URL}/otp/check`, { email, otp: OTP });
                    if (rspCheckOTP.data.success) {
                        try {
                            // send request forgot password
                            const rspForgotPassword = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email, otp: OTP });
                            if (rspForgotPassword.data.success) {
                                setLoading(false);
                                setMessage({ type: 'success', content: rspForgotPassword.data.msg || 'Mật khẩu đã được gửi vào email của bạn' })
                            };
                            resetData();
                        } catch (error) {
                            setLoading(false)
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    isInvalid={emailInvalid}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Email không hợp lệ
                </Form.Control.Feedback>
            </InputGroup>

            {showOTP && inputOTP}

            <Row className='justify-content-beetwen mb-2'>
                <Col><Link onClick={() => setCurrentForm('login')} to='#'>Đăng nhập</Link></Col>
                <Col className='text-end'><Link onClick={() => setCurrentForm('register')} to='#'>Tạo tài khoản?</Link></Col>
            </Row>
        </>
    )

    return (
        <Form onSubmit={e => handleSubmit(e)} className={cx('form')} style={{ width: '350px' }}>
            <h2 className='text-center text-success mb-4'>QUÊN MẬT KHẨU</h2>

            {loading ? <LoadingAnimation /> : body}

            <Button
                variant="outline-success"
                type="submit"
                style={{ width: '100%' }}
                size='lg'
            >
                XÁC NHẬN
            </Button>
        </Form>
    )
}

export default ForgotPasswordForm
