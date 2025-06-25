import './styles/App.css';
import './styles/Navbar.css';
import {Route, Routes} from 'react-router-dom';
import MatrixPage from './MatrixPage';
import Navbar from './components/Navbar';
import Home from './Home';
import NotFound from "./NotFound";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/MatrixPage" element={<MatrixPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
