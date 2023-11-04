import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import { LoadingAnimation } from '../..';
import styles from './ScrollBrands.module.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const cx = classNames.bind(styles);

const ScrollBrands = () => {
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
                if (rsp.data.success) {
                    setBrands(rsp.data.brands);
                    setLoading(false);
                }
            } catch (error) { }
        }

        fetchApi();
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    const CustomArrow = ({ onClick, ...rest }) => {
        // const {
        //     onMove,
        //     carouselState: { currentSlide, deviceType }
        // } = rest;
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} />;
    };

    let body = (
        <Carousel
            responsive={responsive}
            autoPlay={true}
            rewind={true}
            customRightArrow={<CustomArrow />}
            customLeftArrow={<CustomArrow />}
        >
            {brands.map(brand => {
                const src = brand.logo?.url;
                return (
                    <div
                        className={cx('img-brand')}
                        key={brand._id}
                        onClick={() => navigate(`/product?brand=${brand._id}`)}
                    >
                        <img
                            alt=''
                            src={src}
                            width='100%'
                            height='100%'
                        />

                    </div>
                )
            })}
        </Carousel>
    )

    return (
        <div className={`mb-3 ${cx('wrapper')}`}>
            {loading ? <LoadingAnimation /> : body}
        </div>
    )
}

export default ScrollBrands
