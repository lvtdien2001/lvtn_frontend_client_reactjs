import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound, ProductDetail } from './views';
import { Header, Footer } from './components';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path='/login' />
                    <Route element={<ProductDetail />} path='/product/:id' />
                    <Route element={<NotFound />} path='/*' />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
