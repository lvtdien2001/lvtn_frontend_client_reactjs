import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { Message, LoadingAnimation, Pagination, Header, Footer } from '../../components';
import { AllProducts, FilterProduct, EmptyProducts } from '../../components/Product';
import axios from 'axios';
import { Nav, NavBreadCrumb, NavLink } from '../../components/Nav';

const Products = () => {
    const [message, setMessage] = useState({ type: '', content: '' });
    const [products, setProducts] = useState([]);
    // const [countProducts, setCountProducts] = useState(0);
    const [brands, setBrands] = useState([]);
    const [filter, setFilter] = useState({
        brand: '', gender: '', price: '', system: '', style: '', glass: '', strap: ''
    })
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [lastPage, setLastPage] = useState(1);
    const [searchParams] = useSearchParams();

    const resetData = () => {
        setFilter({
            brand: '', gender: '', price: '', system: '', style: '', glass: '', strap: ''
        });
        setPage(1);
        setLastPage(1);
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
        let query = '';
        filter.brand && (query += `&brand=${filter.brand}`);
        filter.system && (query += `&systemCode=${filter.system}`);
        filter.gender !== '' && (query += `&gender=${filter.gender}`);
        filter.glass && (query += `&glassCode=${filter.glass}`);
        filter.price && (query += `&price=${filter.price}`);
        filter.strap && (query += `&strapCode=${filter.strap}`);

        const fetchApi = async () => {
            setLoading(true);
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/product?page=${page}${query}`);
                if (rsp.data.success) {
                    setProducts(rsp.data.products);
                    setLastPage(rsp.data.pagination.lastPage);
                    // setCountProducts(rsp.data.pagination.countProduct);
                    setLoading(false);
                }
            } catch (error) { }
        }

        fetchApi();
    }, [page, filter])

    useEffect(() => {
        setPage(1);
        setLastPage(1);
    }, [filter]);

    useEffect(() => {
        const brand = searchParams.get('brand');
        const gender = searchParams.get('gender');
        resetData();
        setFilter(prev => {
            return {
                ...prev,
                brand: brand || prev.brand,
                gender: gender || prev.gender
            }
        })
    }, [searchParams])

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

        document.title = 'Đồng hồ'
    }, [])

    return (
        <>
            <Header />
            <Container style={{ backgroundColor: '#fff', padding: '20px' }} className='mt-3 mb-3'>
                <Nav>
                    <NavLink to='/'>TRANG CHỦ</NavLink>
                    <NavBreadCrumb />
                    <NavLink to='#'>ĐỒNG HỒ</NavLink>
                </Nav>

                {loading ? <LoadingAnimation /> :
                    <Row>
                        <Col lg={2}>
                            <FilterProduct
                                filter={filter}
                                setFilter={setFilter}
                                brands={brands}
                                resetData={resetData}
                            />
                        </Col>

                        <Col>
                            {products.length === 0 ? <EmptyProducts /> :
                                <AllProducts
                                    formatName={formatName}
                                    formatPrice={formatPrice}
                                    setPage={setPage}
                                    products={products}
                                />}
                            {lastPage > 1 &&
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    lastPage={lastPage}
                                    align='justify-content-center'
                                />
                            }
                        </Col>
                    </Row>
                }
            </Container>
            {message.content &&
                <Message
                    type={message.type}
                    message={message.content}
                    setMessage={setMessage}
                />
            }
            <Footer />
        </>
    )
}

export default Products
