import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chatbot.module.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BsSend, BsFillChatLeftTextFill, BsRobot } from 'react-icons/bs';
import axios from 'axios';

const cx = classNames.bind(styles);

const Chatbot = () => {
    const [messages, setMessages] = useState([{
        text: 'Xin chào! Rất vui được hỗ trợ bạn.',
        sender: 'bot'
    }]);
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async e => {
        e.preventDefault();

        setMessages(prev => [...prev, { text, sender: 'customer' }]);
        setText('');

        try {
            setLoading(true);
            const rsp = await axios.post(`${process.env.REACT_APP_API_RASA}`, { message: text });
            rsp.data?.map(msg => {
                setMessages(prev => [...prev, { text: msg.text, sender: 'bot' }])
            })
            if (rsp.data.length === 0) {
                setMessages(prev => [...prev, { text: 'Xin lỗi quý khách, tôi chưa hiểu được yêu cầu của quý khách ạ!', sender: 'bot' }])
            }
            setLoading(false);
        } catch (error) {
        }
    }

    let title = (
        <>
            <BsRobot />
            <b className='fs-5 ms-2'>RASA Chatbot</b>
        </>
    )

    let send = (
        <>
            <InputGroup
                as={Form}
                hasValidation
                className={`${cx('form')}`}
                onSubmit={e => handleSend(e)}
            >
                <Form.Control
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{ borderRadius: '10px' }}
                />
                <Button
                    variant='outline-success'
                    size='lg'
                    type='submit'
                >
                    <BsSend />
                </Button>
            </InputGroup>
        </>
    )

    let body = (
        <>
            <p className='text-center text-secondary'>
                Bắt đầu trò chuyện với Chatbot. Hỗ trợ chăm sóc khách hàng 24/7.
            </p>
            {messages.map((message, index) => {
                return (
                    <div
                        key={index}
                        className={`mb-2 ms-2 me-2 ${cx(message.sender === 'customer' ? 'text-customer' : 'text-bot')}`}
                    >
                        <div
                            style={{ width: 'max-content', maxWidth: '250px' }}
                            className={`text-start ${cx('text', message.sender === 'customer' ? 'bg-customer' : 'bg-bot')}`}
                        >
                            {message.text}
                        </div>
                    </div>
                )
            })}
        </>
    )

    useEffect(() => {
        const body = document.getElementById('body');
        body.scrollTop = body.scrollHeight - body.clientHeight;
    }, [messages])

    return (
        <div className={cx('fixed')}>
            <div className={cx('chat-frame', !show && 'hide')}>
                <div className={`text-start ${cx('title')}`}>
                    {title}
                </div>
                <div id='body' className={cx('body')}>
                    {body}

                    {loading && <span className={cx('loading')}>
                        Đang soạn tin . . .
                    </span>}
                </div>
                <div className={cx('send')}>
                    {send}
                </div>
            </div>

            <Button
                className={cx('btn-chat')}
                size='lg'
                variant='success'
                onClick={() => setShow(prev => !prev)}
            >
                <BsFillChatLeftTextFill />
            </Button>
        </div>
    )
}

export default Chatbot
