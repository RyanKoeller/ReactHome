import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
    return (
        <header className="navbar">
            <h1 className="navbar-title">App</h1>
            <nav className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/MatrixPage">Matrix</Link>
            </nav>
        </header>
    );
}
