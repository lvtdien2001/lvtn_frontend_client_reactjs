import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../contexts';

const InputSearch = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e?.preventDefault();
        if (searchValue.length < 2) {
            return;
        }
        navigate(`/search?key=${searchValue}`);
    }

    return (
        <Form onSubmit={e => handleSubmit(e)} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Nhập từ khóa . . ."
                className='me-1'
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <Button type='submit' variant="outline-success"><BsSearch /></Button>
        </Form>
    )
}

export default InputSearch
