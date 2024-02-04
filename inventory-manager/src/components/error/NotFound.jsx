import { Link } from "react-router-dom";
import './NotFound.css'
export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    )
}