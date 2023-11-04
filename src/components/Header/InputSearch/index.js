import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './InputSearch.module.scss';
import { SearchContext } from '../../../contexts';

const cx = classNames.bind(styles);

const InputSearch = ({ className }) => {
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
        <Form
            onSubmit={e => handleSubmit(e)}
            className={`d-flex ${cx('form-wrapper')} ${className}`}
        >
            <Form.Control
                type="search"
                placeholder="Tìm kiếm sản phẩm . . ."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className={cx('form')}
            />
            <div
                className={cx('search-icon')}
                onClick={handleSubmit}
            >
                <BsSearch />
            </div>
        </Form>
    )
}

export default InputSearch
