import { Carousel } from 'react-bootstrap';
import img1 from '../../../assets/images/carousel-DH-CC.png';
import img2 from '../../../assets/images/carousel-g-shock.png';
import img3 from '../../../assets/images/carousel-orient.png';
import img4 from '../../../assets/images/carousel-CASIO.png';

const CarouselAds = () => {
    return (
        <Carousel
            fade
            indicators={false}
        >
            <Carousel.Item>
                <img alt='' src={img1} width='100%' />
            </Carousel.Item>
            <Carousel.Item>
                <img alt='' src={img2} width='100%' />
            </Carousel.Item>
            <Carousel.Item>
                <img alt='' src={img3} width='100%' />
            </Carousel.Item>
            <Carousel.Item>
                <img alt='' src={img4} width='100%' />
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselAds;