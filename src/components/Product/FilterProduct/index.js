import { useState } from 'react';
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import { BiFilterAlt } from 'react-icons/bi';
import { genders, systems, glasses, straps, prices } from './contants';

const FilterProduct = ({ brands, setFilter, filter }) => {
    const [show, setShow] = useState({
        brand: false, gender: false, system: false, glass: false, strap: false, price: false
    })

    const handleChange = (type, value) => {
        switch (type) {
            case 'brand':
                setFilter(prev => { return { ...prev, brand: value } });
                setShow(prev => { return { ...prev, brand: !prev.brand } })
                break;
            case 'gender':
                setFilter(prev => { return { ...prev, gender: value } });
                setShow(prev => { return { ...prev, gender: !prev.gender } })
                break;
            case 'system':
                setFilter(prev => { return { ...prev, system: value } });
                setShow(prev => { return { ...prev, system: !prev.system } })
                break;
            case 'glass':
                setFilter(prev => { return { ...prev, glass: value } });
                setShow(prev => { return { ...prev, glass: !prev.glass } })
                break;
            case 'strap':
                setFilter(prev => { return { ...prev, strap: value } });
                setShow(prev => { return { ...prev, strap: !prev.strap } })
                break;
            case 'price':
                setFilter(prev => { return { ...prev, price: value } });
                setShow(prev => { return { ...prev, price: !prev.price } })
                break;
            default:
                throw new Error('Invalid type in handleChange filter')
        }
    }

    let filterBrands = (
        <Dropdown show={show.brand}>
            <Dropdown.Toggle
                variant='outline-success'
                style={{ width: '130px' }}
                onClick={() => setShow(prev => { return { ...prev, brand: !prev.brand } })}
            >
                Thương hiệu
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ height: '400px', overflow: 'scroll', overflowX: 'hidden' }}>
                {brands.map(brand => {
                    return (
                        <Dropdown.Item key={brand._id} as='div'>
                            <Button
                                className='ms-1 me-1 mb-2'
                                variant='outline-success'
                                size='sm'
                                onClick={() => handleChange('brand', brand._id)}
                                active={brand._id === filter.brand}
                            >
                                <img src={brand.logo?.url} alt='' width='100px' />
                            </Button>
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )

    let filterGender = (
        <Dropdown show={show.gender}>
            <Dropdown.Toggle
                variant='outline-success'
                style={{ width: '130px' }}
                onClick={() => setShow(prev => { return { ...prev, gender: !prev.gender } })}
            >
                Giới tính
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {genders.map(gender => {
                    return (
                        <Button
                            className='ms-1 me-1 mb-2'
                            variant='outline-success'
                            size='sm'
                            onClick={() => handleChange('gender', gender.code)}
                            active={gender.code === filter.gender}
                            key={gender.code}
                        >
                            {gender.name}
                        </Button>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )

    let filterSystem = (
        <Dropdown show={show.system}>
            <Dropdown.Toggle
                variant='outline-success'
                style={{ width: '130px' }}
                onClick={() => setShow(prev => { return { ...prev, system: !prev.system } })}
            >
                Bộ máy
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {systems.map(system => {
                    return (
                        <Button
                            className='ms-1 me-1 mb-2'
                            variant='outline-success'
                            size='sm'
                            onClick={() => handleChange('system', system.code)}
                            active={system.code === filter.system}
                            key={system.code}
                        >
                            {system.name}
                        </Button>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )

    let filterGlass = (
        <Dropdown show={show.glass}>
            <Dropdown.Toggle
                variant='outline-success'
                style={{ width: '130px' }}
                onClick={() => setShow(prev => { return { ...prev, glass: !prev.glass } })}
            >
                Mặt kính
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {glasses.map(glass => {
                    return (
                        <Button
                            className='ms-1 me-1 mb-2'
                            variant='outline-success'
                            size='sm'
                            onClick={() => handleChange('glass', glass.code)}
                            active={glass.code === filter.glass}
                            key={glass.code}
                        >
                            {glass.name}
                        </Button>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )

    let filterStrap = (
        <Dropdown show={show.strap}>
            <Dropdown.Toggle
                variant='outline-success'
                style={{ width: '130px' }}
                onClick={() => setShow(prev => { return { ...prev, strap: !prev.strap } })}
            >
                Dây đeo
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {straps.map(strap => {
                    return (
                        <Button
                            className='ms-1 me-1 mb-2'
                            variant='outline-success'
                            size='sm'
                            onClick={() => handleChange('strap', strap.code)}
                            active={strap.code === filter.strap}
                            key={strap.code}
                        >
                            {strap.name}
                        </Button>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )

    let filterPrice = (
        <Dropdown show={show.price}>
            <Dropdown.Toggle
                variant='outline-success'
                style={{ width: '130px' }}
                onClick={() => setShow(prev => { return { ...prev, price: !prev.price } })}
            >
                Đơn giá
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {prices.map(price => {
                    return (
                        <Button
                            className='ms-1 me-1 mb-2'
                            variant='outline-success'
                            size='sm'
                            onClick={() => handleChange('price', price.code)}
                            active={price.code === filter.price}
                            key={price.code}
                        >
                            {price.name}
                        </Button>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )

    return (
        <Row className='align-items-center'>
            <Col><h5>Bộ lọc <BiFilterAlt />:</h5></Col>
            <Col>
                {filterBrands}
            </Col>
            <Col>
                {filterGender}
            </Col>
            <Col>
                {filterPrice}
            </Col>
            <Col>
                {filterSystem}
            </Col>
            <Col>
                {filterGlass}
            </Col>
            <Col>
                {filterStrap}
            </Col>
            <Col lg={2}></Col>
        </Row>
    )
}

export default FilterProduct