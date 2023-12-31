import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingAnimation, Pagination, Header, Footer } from '../../components';
import { AllProducts, FilterProduct } from '../../components/Product';
import { Nav, NavBreadCrumb, NavLink } from '../../components/Nav';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [brands, setBrands] = useState([]);
    const [filter, setFilter] = useState({
        brand: '', gender: '', price: '', system: '', style: '', glass: '', strap: ''
    })

    const resetData = () => {
        setPage(1);
        setLastPage(1);
        // setCountProducts(0);
        setFilter({
            brand: '', gender: '', price: '', system: '', style: '', glass: '', strap: ''
        })
    }

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
        setPage(1);
        setLastPage(1);
    }, [filter]);

    useEffect(() => resetData(), [searchParams]);

    useEffect(() => {
        let query = '';
        filter.brand && (query += `&brand=${filter.brand}`);
        filter.system && (query += `&systemCode=${filter.system}`);
        filter.gender !== '' && (query += `&gender=${filter.gender}`);
        filter.glass && (query += `&glassCode=${filter.glass}`);
        filter.price && (query += `&price=${filter.price}`);
        filter.strap && (query += `&strapCode=${filter.strap}`);

        const fetchApi = async () => {
            try {
                setLoading(true);
                const key = searchParams.get('key');
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product/search?key=${key}&page=${page}${query}`);
                setProducts(rsp.data.products);
                setLastPage(rsp.data.pagination.lastPage);
                setCountProducts(rsp.data.pagination.countProduct);
                setLoading(false);
            } catch (error) { }
        }

        fetchApi();
    }, [searchParams, page, filter])

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

        document.title = 'Tìm kiếm sản phẩm'
    }, [])

    return (
        <>
            <Header />
            <Container style={{ backgroundColor: '#fff', padding: '20px' }} className='mt-3 mb-3'>
                <Nav>
                    <NavLink to='/'>TRANG CHỦ</NavLink>
                    <NavBreadCrumb />
                    <NavLink to='/product'>ĐỒNG HỒ</NavLink>
                    <NavBreadCrumb />
                </Nav>

                {loading ? <LoadingAnimation /> :
                    <>
                        <h5 className='text-secondary mb-3'><i>Kết quả tìm kiếm: {searchParams.get('key')}</i></h5>
                        <FilterProduct
                            filter={filter}
                            setFilter={setFilter}
                            brands={brands}
                            resetData={resetData}
                        />
                        <h5 className='text-secondary mt-3'><i>{countProducts} sản phẩm</i></h5>
                        <AllProducts
                            formatName={formatName}
                            formatPrice={formatPrice}
                            setPage={setPage}
                            products={products}
                        />
                        {lastPage > 1 &&
                            <Pagination
                                page={page}
                                setPage={setPage}
                                lastPage={lastPage}
                                align='justify-content-center'
                            />
                        }
                    </>
                }
            </Container>
            <Footer />
        </>
    )
}

export default Search
