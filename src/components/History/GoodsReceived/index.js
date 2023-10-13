import axios from 'axios';
import { Button } from 'react-bootstrap';

const GoodsReceived = ({ setMessage, setReload, orderId }) => {

    const handleSubmit = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/order/status/${orderId}`, { statusCode: '04' });
            setMessage({
                type: 'success',
                content: 'Cảm ơn quý khách đã mua hàng'
            });
            setReload(prev => !prev)
        } catch (error) {
            setMessage({
                type: 'danger',
                content: error.response?.data.msg || error.message
            })
        }
    }

    return (
        <Button onClick={handleSubmit} variant='success'>
            Đã nhận hàng
        </Button>
    )
}

export default GoodsReceived
