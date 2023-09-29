import { useState } from 'react';
import CartContext from './CartContext';

const CartProvider = ({ children }) => {
    const [num, setNum] = useState(0);

    const data = { num, setNum };

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
