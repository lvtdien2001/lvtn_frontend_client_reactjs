import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ScrollBrands } from '../../components';
import { HotProducts, NewProducts } from '../../components/Product';

const cx = classNames.bind(styles);

const Home = () => {
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
        document.title = 'Trang chủ'
    }, [])

    return (
        <>
            <div className={cx('ads')} ></div>
            <Container>
                <ScrollBrands />
                <HotProducts formatPrice={formatPrice} formatName={formatName} />
                <NewProducts formatPrice={formatPrice} formatName={formatName} />
            </Container>
        </>
    )
}

export default Home
