import { Link } from 'react-router-dom';
import './styles/NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/">Go back home</Link>
        </div>
    );
}