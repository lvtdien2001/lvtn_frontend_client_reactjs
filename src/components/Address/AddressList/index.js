import { Row, Col, Table, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './AddressList.module.scss';
import { ChangeDefaultAddress, UpdateAddressModal, DeleteAddressModal } from '..';

const cx = classNames.bind(styles);

const AddressList = ({ addresses, setMessage, setReload }) => {

    let body = (
        <Table hover striped borderless responsive>
            <tbody>
                {addresses.map(address => {
                    return (
                        <tr key={address._id}>
                            <td>
                                <h5>
                                    {address.fullName} {address.isDefault && <Button size='sm' variant='outline-danger' disabled>Mặc định</Button>}
                                </h5>
                                <span className={cx('text-blur')}>
                                    {address.phoneNumber} | {address.description}, {address.ward.name}, {address.district.name}, {address.province.name}
                                </span>
                            </td>
                            <td className='text-end'>
                                <p>
                                    <UpdateAddressModal setMessage={setMessage} setReload={setReload} address={address} />
                                    <DeleteAddressModal setReload={setReload} setMessage={setMessage} addressId={address._id} />
                                </p>
                                {!address.isDefault && <ChangeDefaultAddress setReload={setReload} id={address._id} setMessage={setMessage} />}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )

    let empty = (
        <Row style={{ minHeight: '375px' }} className='text-center align-items-center'>
            <Col>
                <h5>Chưa có địa chỉ nào</h5>
            </Col>
        </Row>
    )

    return (
        <div className={`${cx('wrapper')} mb-3`}>
            {addresses.length === 0 ? empty : body}
        </div>
    )
}

export default AddressList
