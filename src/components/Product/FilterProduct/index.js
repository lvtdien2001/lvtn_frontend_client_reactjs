import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BiFilterAlt, BiPlus, BiMinus } from 'react-icons/bi';
import classNames from 'classnames/bind';
import styles from './FilterProduct.module.scss';
import { genders, systems, glasses, straps, prices } from './constants';

const cx = classNames.bind(styles);

const FilterProduct = ({ brands, setFilter, filter, resetData, className }) => {
    const [show, setShow] = useState({
        brand: filter.brand || false,
        gender: filter.gender || false,
        system: filter.system || false,
        glass: filter.glass || false,
        strap: filter.strap || false,
        price: filter.price || false
    })
    const [showFilter, setShowFilter] = useState(false);

    const handleChange = (type, value) => {
        switch (type) {
            case 'brand':
                setFilter(prev => {
                    return {
                        ...prev,
                        brand: filter.brand === value ? '' : value
                    }
                });
                setShow(prev => {
                    return { ...prev, brand: !prev.brand }
                })
                break;
            case 'gender':
                setFilter(prev => {
                    return {
                        ...prev,
                        gender: filter.gender === value ? '' : value
                    }
                });
                setShow(prev => {
                    return { ...prev, gender: !prev.gender }
                })
                break;
            case 'system':
                setFilter(prev => {
                    return {
                        ...prev,
                        system: filter.system === value ? '' : value
                    }
                });
                setShow(prev => {
                    return { ...prev, system: !prev.system }
                })
                break;
            case 'glass':
                setFilter(prev => {
                    return {
                        ...prev,
                        glass: filter.glass === value ? '' : value
                    }
                });
                setShow(prev => {
                    return { ...prev, glass: !prev.glass }
                })
                break;
            case 'strap':
                setFilter(prev => {
                    return {
                        ...prev,
                        strap: filter.strap === value ? '' : value
                    }
                });
                setShow(prev => {
                    return { ...prev, strap: !prev.strap }
                })
                break;
            case 'price':
                setFilter(prev => {
                    return {
                        ...prev,
                        price: filter.price === value ? '' : value
                    }
                });
                setShow(prev => {
                    return { ...prev, price: !prev.price }
                })
                break;
            default:
                throw new Error('Invalid type in handleChange filter')
        }
    }

    return (
        <div className={`text-secondary ${className}`}>
            <div className={`d-flex justify-content-between text-secondary align-items-center ${cx('border-b')}`}>
                <div
                    className={cx('text-filter')}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    Bộ lọc <BiFilterAlt />
                </div>
                <div
                    className={cx('text-all')}
                    onClick={resetData}
                >
                    Tất cả
                </div>
            </div>

            <div className={cx('responsive', showFilter ? 'show' : 'hide')}>
                {/* price */}
                <div className={cx('border-b')}>
                    <div
                        className={`d-flex justify-content-between ${cx('text-title')}`}
                        onClick={() => setShow(prev => {
                            return { ...prev, price: !prev.price }
                        })}
                    >
                        <div>Đơn giá</div>
                        <div>
                            {show.price ? <BiMinus /> : <BiPlus />}
                        </div>
                    </div>
                    {/* toggle show */}
                    {show.price &&
                        <div className='mt-3 mb-3'>
                            {prices.map(price => {
                                return (
                                    <Button
                                        size='sm'
                                        variant='outline-success'
                                        key={price.code}
                                        className='m-1'
                                        onClick={() => handleChange('price', price.code)}
                                        active={price.code === filter.price}
                                    >
                                        {price.name}
                                    </Button>
                                )
                            })}
                        </div>
                    }
                </div>
                {/* brand */}
                <div className={cx('border-b')}>
                    <div
                        className={`d-flex justify-content-between ${cx('text-title')}`}
                        onClick={() => setShow(prev => {
                            return { ...prev, brand: !prev.brand }
                        })}
                    >
                        <div>Thương hiệu</div>
                        <div>
                            {show.brand ? <BiMinus /> : <BiPlus />}
                        </div>
                    </div>
                    {/* toggle show */}
                    {show.brand &&
                        <div className='mt-3 mb-3'>
                            {brands.map(brand => {
                                return (
                                    <Button
                                        size='sm'
                                        variant='outline-success'
                                        key={brand._id}
                                        className='m-1'
                                        onClick={() => handleChange('brand', brand._id)}
                                        active={brand._id === filter.brand}
                                    >
                                        {brand.name}
                                    </Button>
                                )
                            })}
                        </div>
                    }
                </div>
                {/* gender */}
                <div className={cx('border-b')}>
                    <div
                        className={`d-flex justify-content-between ${cx('text-title')}`}
                        onClick={() => setShow(prev => {
                            return { ...prev, gender: !prev.gender }
                        })}
                    >
                        <div>Giới tính</div>
                        <div>
                            {show.gender ? <BiMinus /> : <BiPlus />}
                        </div>
                    </div>
                    {/* toggle show */}
                    {show.gender &&
                        <div className='mt-3 mb-3'>
                            {genders.map(gender => {
                                return (
                                    <Button
                                        size='sm'
                                        variant='outline-success'
                                        key={gender.code}
                                        className='m-1'
                                        onClick={() => handleChange('gender', gender.code)}
                                        active={gender.code === filter.gender}
                                    >
                                        {gender.name}
                                    </Button>
                                )
                            })}
                        </div>
                    }
                </div>
                {/* system */}
                <div className={cx('border-b')}>
                    <div
                        className={`d-flex justify-content-between ${cx('text-title')}`}
                        onClick={() => setShow(prev => {
                            return { ...prev, system: !prev.system }
                        })}
                    >
                        <div>Bộ máy</div>
                        <div>
                            {show.system ? <BiMinus /> : <BiPlus />}
                        </div>
                    </div>
                    {/* toggle show */}
                    {show.system &&
                        <div className='mt-3 mb-3'>
                            {systems.map(system => {
                                return (
                                    <Button
                                        size='sm'
                                        variant='outline-success'
                                        key={system.code}
                                        className='m-1'
                                        onClick={() => handleChange('system', system.code)}
                                        active={system.code === filter.system}
                                    >
                                        {system.name}
                                    </Button>
                                )
                            })}
                        </div>
                    }
                </div>
                {/* glass */}
                <div className={cx('border-b')}>
                    <div
                        className={`d-flex justify-content-between ${cx('text-title')}`}
                        onClick={() => setShow(prev => {
                            return { ...prev, glass: !prev.glass }
                        })}
                    >
                        <div>Mặt kính</div>
                        <div>
                            {show.glass ? <BiMinus /> : <BiPlus />}
                        </div>
                    </div>
                    {/* toggle show */}
                    {show.glass &&
                        <div className='mt-3 mb-3'>
                            {glasses.map(glass => {
                                return (
                                    <Button
                                        size='sm'
                                        variant='outline-success'
                                        key={glass.code}
                                        className='m-1'
                                        onClick={() => handleChange('glass', glass.code)}
                                        active={glass.code === filter.glass}
                                    >
                                        {glass.name}
                                    </Button>
                                )
                            })}
                        </div>
                    }
                </div>
                {/* strap */}
                <div className={cx('border-b')}>
                    <div
                        className={`d-flex justify-content-between ${cx('text-title')}`}
                        onClick={() => setShow(prev => {
                            return { ...prev, strap: !prev.strap }
                        })}
                    >
                        <div>Dây đeo</div>
                        <div>
                            {show.strap ? <BiMinus /> : <BiPlus />}
                        </div>
                    </div>
                    {/* toggle show */}
                    {show.strap &&
                        <div className='mt-3 mb-3'>
                            {straps.map(strap => {
                                return (
                                    <Button
                                        size='sm'
                                        variant='outline-success'
                                        key={strap.code}
                                        className='m-1'
                                        onClick={() => handleChange('strap', strap.code)}
                                        active={strap.code === filter.strap}
                                    >
                                        {strap.name}
                                    </Button>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterProduct