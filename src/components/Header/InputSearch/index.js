import { Form, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const InputSearch = () => {
    return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Nhập từ khóa . . ."
                aria-label="Search"
                className='me-1'
            />
            <Button variant="outline-success"><BsSearch /></Button>
        </Form>
    )
}

export default InputSearch
