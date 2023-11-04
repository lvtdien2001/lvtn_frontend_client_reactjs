import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Message, LoadingAnimation, Header, Footer } from '../../components';
import { LoginForm, RegisterForm, ForgotPasswordForm } from '../../components/Auth';
import { AuthContext } from '../../contexts';

const cx = classNames.bind(styles);

const Login = () => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    const [currentForm, setCurrentForm] = useState('login');
    const [message, setMessage] = useState({
        type: '',
        content: ''
    });

    useEffect(() => {
        document.title = 'Đăng nhập'
    }, [])

    let body;
    if (authLoading) {
        body = (
            <LoadingAnimation />
        )
    } else if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Header />
            {body}
            <div
                className={`${cx('wrapper')} mb-5`}
            >
                {currentForm === 'login' ?
                    <LoginForm setCurrentForm={setCurrentForm} setMessage={setMessage} /> :
                    (currentForm === 'register' ? <RegisterForm setCurrentForm={setCurrentForm} setMessage={setMessage} /> :
                        <ForgotPasswordForm setCurrentForm={setCurrentForm} setMessage={setMessage} />
                    )}
            </div>
            {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
            <Footer />
        </>
    )
}

export default Login
