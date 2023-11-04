import { Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './AddressList.module.scss';
import { ChangeDefaultAddress, UpdateAddressModal, DeleteAddressModal } from '..';

const cx = classNames.bind(styles);

const AddressList = ({ addresses, setMessage, setReload }) => {

    let body = (
        <>
            {addresses.map(address => {
                return (
                    <Row
                        className={cx('items')}
                        key={address._id}
                    >
                        <Col>
                            <h5>
                                {address.fullName}&nbsp;
                                {address.isDefault &&
                                    <Button
                                        size='sm'
                                        variant='outline-danger'
                                        disabled
                                    >
                                        Mặc định
                                    </Button>
                                }
                            </h5>
                            <span className={cx('text-blur')}>
                                {address.phoneNumber} | {address.description}, {address.ward.name}, {address.district.name}, {address.province.name}
                            </span>
                        </Col>
                        <Col className='text-end'>
                            {!address.isDefault &&
                                <ChangeDefaultAddress
                                    setReload={setReload}
                                    id={address._id}
                                    setMessage={setMessage}
                                />
                            }
                            <UpdateAddressModal
                                setMessage={setMessage}
                                setReload={setReload}
                                address={address}
                            />
                            <DeleteAddressModal
                                setReload={setReload}
                                setMessage={setMessage}
                                address={address}
                            />
                        </Col>
                    </Row>
                )
            })}
        </>
    )

    let empty = (
        <div className={cx('wrapper-empty')}>
            <div className={cx('wrapper-svg')}>
                <div className={cx('svg')}>
                    <svg fill="none" viewBox="0 0 121 120" class="+elnpp">
                        <path d="M16 79.5h19.5M43 57.5l-2 19" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M56.995 78.791v-.001L41.2 38.195c-2.305-5.916-2.371-12.709.44-18.236 1.576-3.095 4.06-6.058 7.977-8 5.061-2.5 11.038-2.58 16.272-.393 3.356 1.41 7 3.92 9.433 8.43v.002c2.837 5.248 2.755 11.853.602 17.603L60.503 78.766v.001c-.617 1.636-2.88 1.643-3.508.024Z" fill="#fff" stroke="#BDBDBD" stroke-width="2"></path>
                        <path d="m75.5 58.5 7 52.5M13 93h95.5M40.5 82.5 30.5 93 28 110.5" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M44.5 79.5c0 .55-.318 1.151-1.038 1.656-.717.502-1.761.844-2.962.844-1.2 0-2.245-.342-2.962-.844-.72-.505-1.038-1.105-1.038-1.656 0-.55.318-1.151 1.038-1.656.717-.502 1.761-.844 2.962-.844 1.2 0 2.245.342 2.962.844.72.505 1.038 1.105 1.038 1.656Z" stroke="#BDBDBD" stroke-width="2"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M48.333 68H18.5a1 1 0 1 0 0 2h30.667l-.834-2Zm20.5 2H102a1 1 0 0 0 0-2H69.667l-.834 2Z" fill="#BDBDBD"></path>
                        <path d="M82 73h20l3 16H84.5L82 73ZM34.5 97H76l1.5 13H33l1.5-13ZM20.5 58h18l-1 7h-18l1-7Z" fill="#E8E8E8"></path>
                        <path clip-rule="evenodd" d="M19.5 41a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM102.5 60a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#E8E8E8" stroke-width="2"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M93.5 22a1 1 0 0 0-1 1v3h-3a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3v-3a1 1 0 0 0-1-1Z" fill="#E8E8E8"></path>
                        <circle cx="58.5" cy="27" r="7" stroke="#BDBDBD" stroke-width="2"></circle>
                    </svg>
                </div>
            </div>
            <h5 className='text-secondary'>Bạn chưa có địa chỉ</h5>
        </div>
    )

    return (
        <div className={`${cx('wrapper')} mb-3`}>
            {addresses.length === 0 ? empty : body}
        </div>
    )
}

export default AddressList
