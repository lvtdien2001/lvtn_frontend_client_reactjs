import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Message, LoadingAnimation, Header, Footer } from '../../components';
import { AddAddressModal, AddressList } from '../../components/Address';
import { Nav, NavBreadCrumb, NavLink } from '../../components/Nav';

const Address = () => {
    const [message, setMessage] = useState({ type: '', content: '' });
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/address`);
                if (rsp.data.success) {
                    setAddresses(rsp.data.addresses);
                    setLoading(false);
                }
            } catch (error) { }
        }

        fetchApi();
    }, [reload])

    useEffect(() => { document.title = 'Địa chỉ của tôi' }, [])

    return (
        <>
            <Header navigate={navigate} />
            <Container className='mb-5'>
                <Nav>
                    <NavLink to='/'>TRANG CHỦ</NavLink>
                    <NavBreadCrumb />
                    <NavLink to='#'>ĐỊA CHỈ</NavLink>
                </Nav>

                <Row
                    className='justify-content-between mt-3 mb-3 pb-1'
                    style={{ borderBottom: 'solid 1px var(--bs-gray-300)' }}
                >
                    <Col className='text-secondary'>
                        <h4>ĐỊA CHỈ CỦA TÔI</h4>
                    </Col>
                    <Col className='text-end'>
                        <AddAddressModal
                            setMessage={setMessage}
                            setReload={setReload}
                        />
                    </Col>
                </Row>
                {loading
                    ? <LoadingAnimation />
                    : <AddressList
                        addresses={addresses}
                        setMessage={setMessage}
                        setReload={setReload}
                    />
                }
                {message.content &&
                    <Message
                        type={message.type}
                        message={message.content}
                        setMessage={setMessage}
                    />
                }
            </Container>
            <Footer />
        </>
    )
}

export default Address
