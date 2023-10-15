import classNames from 'classnames/bind';
import styles from './EmptyProducts.module.scss';
import productImg from '../../../assets/images/product.jpg';

const cx = classNames.bind(styles);

const EmptyProducts = () => {
    return (
        <div className={`${cx('wrapper')}`}>
            <div className='text-center'>
                <img alt='' src={productImg} width='70px' height='70px' />
                <p className='text-secondary fs-5'>Không tìm thấy sản phẩm phù hợp</p>
            </div>
        </div>
    )
}

export default EmptyProducts
