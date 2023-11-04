import { useState, useContext } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TbLock, TbMailFilled } from 'react-icons/tb';
import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { AuthContext } from '../../../contexts';

const cx = classNames.bind(styles);

const LoginForm = ({ setCurrentForm, setMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState({ email: false, password: false });
    const { login } = useContext(AuthContext);

    const handleSubmit = async e => {
        e?.preventDefault();

        // validate form
        const isEmail = email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const isPassword = password?.length >= 8;
        if (!isEmail || !isPassword) {
            setIsInvalid({ email: !isEmail ? true : false, password: !isPassword })
        } else {
            setIsInvalid({ email: false, password: false })
            try {
                // login
                const loginData = await login(email, password);

                if (!loginData.success) {
                    setMessage({
                        type: 'danger',
                        content: loginData.msg
                    })
                }
            } catch (error) {
                console.log(error);
            }

        }
    }

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
                    isInvalid={isInvalid.email}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Email không hợp lệ
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text><TbLock /></InputGroup.Text>
                <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    isInvalid={isInvalid.password}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Mật khẩu phải có ít nhất 8 ký tự
                </Form.Control.Feedback>
            </InputGroup>

            <Row className='justify-content-beetwen mb-2'>
                <Col><Link onClick={() => setCurrentForm('forgotPassword')} to='#'>Quên mật khẩu?</Link></Col>
                {/* <Col className='text-end'><Link onClick={() => setCurrentForm('register')} to='#'>Tạo tài khoản?</Link></Col> */}
            </Row>
        </>
    )

    return (
        <Form onSubmit={e => handleSubmit(e)} className={cx('form')} style={{ width: '350px' }}>
            <h2 className='text-center text-success mb-4'>ĐĂNG NHẬP</h2>

            {body}

            <div className={`${cx('btn-div')}`}>
                <Button
                    variant="success"
                    type="submit"
                    className='me-1'
                >
                    Đăng nhập
                </Button>
                <Button
                    variant="outline-success"
                    type="submit"
                    className='ms-1'
                    onClick={() => setCurrentForm('register')}
                >
                    Tạo tài khoản
                </Button>
            </div>
        </Form>
    )
}

export default LoginForm
