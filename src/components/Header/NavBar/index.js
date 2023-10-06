import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';

const NavBar = () => {
    let nav = (
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
        >
            <Nav.Link href="#action1">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link as={Link} to='/product?gender=1'>NAM</Nav.Link>
            <Nav.Link as={Link} to='/product?gender=2'>NỮ</Nav.Link>
            <Nav.Link as={Link} to='/product?gender=0'>CẶP ĐÔI</Nav.Link>
            <Nav.Link as={Link} to='/'>GIỚI THIỆU</Nav.Link>
        </Nav>
    )

    return (
        <>
            <Navbar.Brand href="/">
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
