import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../../assets/images/logo.jpg';

const NavBar = () => {
    let nav = (
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
        >
            <Nav.Link href="#action1">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link href="#action2">NAM</Nav.Link>
            <Nav.Link href="#action2">NỮ</Nav.Link>
            <Nav.Link href="#action2">GIỚI THIỆU</Nav.Link>
            <Nav.Link href="#action2">TIN TỨC</Nav.Link>
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
