import { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { VscNote } from 'react-icons/vsc';
import { AiOutlineUser, AiTwotonePhone } from 'react-icons/ai';
import { FaRegAddressCard } from 'react-icons/fa';
import axios from 'axios';

const UpdateAddressModal = ({ setMessage, setReload, address }) => {
    const [show, setShow] = useState(false);
    const [submitData, setSubmitData] = useState({
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        province: address.province,
        district: address.district,
        ward: address.ward,
        description: address.description
    });
    const [isInvalid, setIsInvalid] = useState({
        fullName: false, phoneNumber: false, province: false, district: false, ward: false, description: false
    })
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const resetData = () => {
        setSubmitData({ fullName: '', phoneNumber: '', province: { code: '', name: '' }, district: { code: '', name: '' }, ward: { code: '', name: '' }, description: '' });
        setIsInvalid({ fullName: false, phoneNumber: false, province: false, district: false, ward: false, description: false });
        setDistricts([]);
        setWards([]);
    }

    const handleSubmit = async e => {
        e?.preventDefault();

        // validate form
        const isFullName = submitData.fullName.length >= 5 && !(submitData.fullName.match(/[0-9]/));
        const isPhoneNumber = /(03|05|07|08|09|01)+([0-9]{8})\b/.test(submitData.phoneNumber);
        const isProvince = document.getElementById('province').value !== '';
        const isDistrict = document.getElementById('district').value !== '';
        const isWard = document.getElementById('ward').value !== '';
        const isDesc = submitData.description !== '';

        if (!isDistrict || !isFullName || !isPhoneNumber || !isProvince || !isWard || !isDesc) {
            setIsInvalid({
                fullName: !isFullName,
                phoneNumber: !isPhoneNumber,
                province: !isProvince,
                district: !isDistrict,
                ward: !isWard,
                description: !isDesc
            })
        } else {
            setIsInvalid({ fullName: false, phoneNumber: false, province: false, district: false, ward: false, description: false });
            try {
                const rsp = await axios.put(`${process.env.REACT_APP_API_URL}/address/${address._id}`, submitData);
                if (rsp.data.success) {
                    setMessage({
                        type: 'success',
                        content: rsp.data.msg
                    });
                    setReload(prev => !prev);
                    setShow(false);
                    resetData();
                }
            } catch (error) {
                setMessage({
                    type: 'danger',
                    content: error.response?.data.msg || error.message
                })
            }
        }
    }

    const handleChange = (e, type) => {
        const code = e.target.value;
        const name = document.getElementById(code).innerHTML;
        switch (type) {
            case 'province':
                setSubmitData(prev => { return { ...prev, province: { code: code, name: name } } });
                break;
            case 'district':
                setSubmitData(prev => { return { ...prev, district: { code: code, name: name } } });
                break;
            case 'ward':
                setSubmitData(prev => { return { ...prev, ward: { code: code, name: name } } });
                break;
            default:
                throw new Error('Invalid type')
        }
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/dist/province`);
                if (rsp.data.success) {
                    setProvinces(rsp.data.provinces);
                }
            } catch (error) { }
        }
        fetchApi();
    }, []);

    useEffect(() => {
        setWards([]);
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/dist/district?parent_code=${submitData.province.code}`);
                if (rsp.data.success) {
                    setDistricts(rsp.data.districts);
                }
            } catch (error) { }
        }
        fetchApi();

    }, [submitData.province.code])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/dist/ward?parent_code=${submitData.district.code}`);
                if (rsp.data.success) {
                    setWards(rsp.data.wards);
                }
            } catch (error) { }
        }
        fetchApi();
    }, [submitData.district.code])

    let body = (
        <Form onSubmit={e => handleSubmit(e)}>
            <Row>
                <Col xs={12} lg={6}>
                    <InputGroup hasValidation className="mb-3">
                        <InputGroup.Text className='text-light bg-success'><AiOutlineUser /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Họ và tên"
                            required
                            value={submitData.fullName}
                            onChange={e => setSubmitData(prev => { return { ...prev, fullName: e.target.value } })}
                            isInvalid={isInvalid.fullName}
                        />
                        <Form.Control.Feedback className='text-end' type="invalid">
                            Họ và tên phải có ít nhất 5 ký tự
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={6}>
                    <InputGroup hasValidation className="mb-3">
                        <InputGroup.Text className='text-light bg-success'><AiTwotonePhone /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Số điện thoại"
                            required
                            value={submitData.phoneNumber}
                            onChange={e => setSubmitData(prev => { return { ...prev, phoneNumber: e.target.value } })}
                            isInvalid={isInvalid.phoneNumber}
                        />
                        <Form.Control.Feedback className='text-end' type="invalid">
                            Số điện thoại không hợp lệ
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col xs={12} lg={4}>
                    <InputGroup hasValidation className="mb-3">
                        <InputGroup.Text className='text-light bg-success'><FaRegAddressCard /></InputGroup.Text>
                        <Form.Select
                            required
                            value={submitData.province.code}
                            onChange={e => handleChange(e, 'province')}
                            isInvalid={isInvalid.province}
                            id='province'
                        >
                            <option value="" hidden>Tỉnh/Thành phố</option>
                            {provinces.map(province => {
                                return (
                                    <option id={province.code} key={province.code} code={province.code} value={province.code}>{province.name}</option>
                                )
                            })}
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={4}>
                    <InputGroup hasValidation className="mb-3">
                        <InputGroup.Text className='text-light bg-success'><FaRegAddressCard /></InputGroup.Text>
                        <Form.Select
                            required
                            value={submitData.district.code}
                            onChange={e => handleChange(e, 'district')}
                            disabled={submitData.province.code === ''}
                            isInvalid={isInvalid.district}
                            id='district'
                        >
                            <option value="" hidden>Quận/Huyện</option>
                            {districts.map(district => {
                                return (
                                    <option id={district.code} key={district.code} value={district.code}>{district.name}</option>
                                )
                            })}
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col xs={12} lg={4}>
                    <InputGroup hasValidation className="mb-3">
                        <InputGroup.Text className='text-light bg-success'><FaRegAddressCard /></InputGroup.Text>
                        <Form.Select
                            required
                            value={submitData.ward.code}
                            onChange={e => handleChange(e, 'ward')}
                            disabled={submitData.district.code === ''}
                            isInvalid={isInvalid.ward}
                            id='ward'
                        >
                            <option value="" hidden>Xã/Phường</option>
                            {wards.map(ward => {
                                return (
                                    <option id={ward.code} key={ward.code} value={ward.code}>{ward.name}</option>
                                )
                            })}
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>

            <InputGroup hasValidation className="mb-3">
                <InputGroup.Text className='text-light bg-success'><VscNote /></InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Số nhà, tên đường, khu vực, ấp, tổ,..."
                    required
                    value={submitData.description}
                    onChange={e => setSubmitData(prev => { return { ...prev, description: e.target.value } })}
                    isInvalid={isInvalid.description}
                />
                <Form.Control.Feedback className='text-end' type="invalid">
                    Bạn chưa nhập địa chỉ chi tiết
                </Form.Control.Feedback>
            </InputGroup>
        </Form>
    )

    return (
        <>
            <Button size='sm' variant="success" onClick={handleShow}>
                Cập nhật
            </Button>

            <Modal size='lg' className='mt-3' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin địa chỉ</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {body}
                </Modal.Body>

                <Modal.Footer className='justify-content-center'>
                    <Button onClick={handleSubmit} variant="outline-success">
                        Hoàn thành
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateAddressModal
