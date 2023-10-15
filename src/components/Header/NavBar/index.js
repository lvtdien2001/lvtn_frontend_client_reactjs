import { useEffect, useState } from 'react';
import { Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LoadingAnimation } from '../..';
import logo from '../../../assets/images/logo.jpg';

const NavBar = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
                setBrands(rsp.data.brands);
                setLoading(false);
            } catch (error) { }
        }
        fetchApi();
    }, [])

    let nav = (
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
        >
            <NavDropdown title='THƯƠNG HIỆU'>
                <div style={{ maxHeight: '400px', overflow: 'scroll', overflowX: 'hidden', zIndex: '10000' }}>
                    {loading ? <LoadingAnimation /> :
                        brands.map(brand => {
                            return (
                                <NavDropdown.Item key={brand._id} as='div'>
                                    <Button
                                        className='mb-1'
                                        size='sm'
                                        variant='outline-dark'
                                        key={brand._id}
                                    >
                                        <Link to={`/product?brand=${brand._id}`}><img alt='' src={brand.logo?.url} width='100px' /></Link>
                                    </Button>
                                </NavDropdown.Item>
                            )
                        })
                    }
                </div>
            </NavDropdown>
            <Nav.Link as={Link} to='/product?gender=1'>NAM</Nav.Link>
            <Nav.Link as={Link} to='/product?gender=2'>NỮ</Nav.Link>
            <Nav.Link as={Link} to='/product?gender=0'>CẶP ĐÔI</Nav.Link>
            <Nav.Link as={Link} to='/'>GIỚI THIỆU</Nav.Link>
        </Nav>
    )

    return (
        <>
            <Navbar.Brand as={Link} to="/">
                <img src={logo} alt='logo' width='50px' height='50px' />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="navbarScroll">
                {nav}
            </Navbar.Collapse>

        </>
    );
}

export default NavBar
