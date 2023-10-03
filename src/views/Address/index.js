import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Message, LoadingAnimation } from '../../components';
import { AddAddressModal, AddressList } from '../../components/Address';

const Address = () => {
    const [message, setMessage] = useState({ type: '', content: '' });
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

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

    return (
        <Container>
            <Row className='justify-content-between mt-3 mb-3'>
                <Col>
                    <h4>Địa chỉ của tôi</h4>
                </Col>
                <Col className='text-end'>
                    <AddAddressModal setMessage={setMessage} setReload={setReload} />
                </Col>
            </Row>
            {loading ? <LoadingAnimation /> : <AddressList addresses={addresses} setMessage={setMessage} setReload={setReload} />}
            {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
        </Container>
    )
}

export default Address
