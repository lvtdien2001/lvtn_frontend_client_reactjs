import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import { LoadingAnimation } from '..';
import styles from './ScrollBrands.module.scss';

const cx = classNames.bind(styles);

const ScrollBrands = () => {
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);

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

    let body = (
        <>
            {brands.map(brand => {
                return (
                    <Button
                        size='sm'
                        className='ms-1 me-1'
                        variant='outline-dark'
                        key={brand._id}
                    >
                        <Link className={cx('link')} to={`/product?brand=${brand._id}`}>
                            <img src={brand.logo?.url} alt='logo' width='120px' height='30px' />
                        </Link>
                    </Button>
                )
            })}
        </>
    )

    return (
        <div className={`${cx('wrapper')} mt-3 mb-3 p-3`}>
            {loading ? <LoadingAnimation /> : body}
        </div>
    )
}

export default ScrollBrands
