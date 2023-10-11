import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Header, Footer } from '../../components';

const Payment = () => {
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/payment/vnp_ipn?${searchParams}`);
                setMessage(rsp.data.msg);
            } catch (error) {
                setMessage(error.response?.data.msg || error.message);
            }
        }
        fetchApi()
    }, [searchParams])

    return (
        <>
            <Header />
            <Container style={{ minHeight: '440px' }}>
                <h5 className='text-center text-danger'>{message}</h5>
            </Container>
            <Footer />
        </>
    )
}

export default Payment
