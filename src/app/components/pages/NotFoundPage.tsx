import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './404Page.css'; // Optional custom CSS
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container text-center vh-100 d-flex flex-column justify-content-center">
            <h1 className="display-1">404</h1>
            <h2 className="display-4">Page Not Found</h2>
            <p className="lead">Sorry, the page you are looking for does not exist.</p>
            <Link to="/"  className="btn btn-primary"> Go back to Login Page</Link>
        </div>
    );
};

export default NotFoundPage;