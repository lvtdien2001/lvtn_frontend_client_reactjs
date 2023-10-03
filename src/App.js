import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound, ProductDetail, Cart, Address, Payment } from './views';
import { Header, Footer, ProtectedRoute } from './components';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path='/login' />
                    <Route element={<ProductDetail />} path='/product/:id' />
                    <Route element={<ProtectedRoute><Cart /></ProtectedRoute>} path='/cart' />
                    <Route element={<ProtectedRoute><Address /></ProtectedRoute>} path='/address' />
                    <Route element={<ProtectedRoute><Payment /></ProtectedRoute>} path='/order/payment' />
                    <Route element={<NotFound />} path='/*' />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
