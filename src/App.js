import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login } from './views';
import { Header } from './components';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path='/login' />
                </Routes>
            </Router>
        </>
    );
}

export default App;
