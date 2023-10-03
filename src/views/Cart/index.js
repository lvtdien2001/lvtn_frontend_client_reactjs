import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HotProducts } from '../../components/Product';
import { CartTable } from '../../components/Cart';
import { Message } from '../../components';

const Cart = () => {
    const [message, setMessage] = useState({ type: '', content: '' });
    const navigate = useNavigate();

    const formatPrice = input => {
        const price = String(input);
        if (price.length <= 3) {
            return price + ' đ';
        }
        let priceFormat = [];
        for (let i = price.length; i > 0; i -= 3) {
            priceFormat.push(price.substring(i - 3, i));
        }
        return priceFormat.reverse().join('.') + ' đ';
    }

    const formatName = input => input.length < 25 ? input : (input.substring(0, 25) + ' ...');

    useEffect(() => {
        document.title = 'Giỏ hàng';
    }, [])

    return (
        <Container>
            <h3 className='text-center mt-3'>GIỎ HÀNG CỦA BẠN</h3>
            <div onClick={() => navigate('/product')} style={{ cursor: 'pointer' }} className='ms-2 text-primary'>
                <h5>&#8617; Tiếp tục mua hàng</h5>
            </div>
            <CartTable setMessage={setMessage} formatPrice={formatPrice} />
            <HotProducts formatName={formatName} formatPrice={formatPrice} />
            {message.content && <Message type={message.type} message={message.content} setMessage={setMessage} />}
        </Container>
    )
}

export default Cart
