import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound, ProductDetail, Cart, Address, Payment, Products, Profile, Search, History, Order } from './views';
import { ProtectedRoute, Chatbot } from './components';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path='/login' />
                    <Route element={<ProductDetail />} path='/product/:id' />
                    <Route element={<Products />} path='/product' />
                    <Route element={<Search />} path='/search' />
                    <Route element={<ProtectedRoute><Cart /></ProtectedRoute>} path='/cart' />
                    <Route element={<ProtectedRoute><Address /></ProtectedRoute>} path='/address' />
                    <Route element={<ProtectedRoute><Payment /></ProtectedRoute>} path='/order/payment' />
                    <Route element={<ProtectedRoute><Profile /></ProtectedRoute>} path='/profile' />
                    <Route element={<ProtectedRoute><History /></ProtectedRoute>} path='/history' />
                    <Route element={<ProtectedRoute><Order /></ProtectedRoute>} path='/order/:id' />
                    <Route element={<NotFound />} path='/*' />
                </Routes>
                <Chatbot />
            </Router>
        </>
    );
}

export default App;
