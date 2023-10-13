import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ScrollBrands, Header, Footer, CarouselAds } from '../../components';
import { HotProducts, NewProducts } from '../../components/Product';

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
            <Header />
            <CarouselAds />
            <Container>
                <ScrollBrands />
                <HotProducts formatPrice={formatPrice} formatName={formatName} />
                <NewProducts formatPrice={formatPrice} formatName={formatName} />
            </Container>
            <Footer />
        </>
    )
}

export default Home
