import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavbarStyles.css';
//import favicon from '../assets/favicon.ico'; 
import fixmycityicon from '../assets/fixmycity_icon.png';

function Navbar() {
    return (
        <nav className="bg-light border navbar navbar-expand-md navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span><img src={fixmycityicon} className="img-fluid" alt="Fix My City Logo" height="50" width="50" /></span>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '10px' }}>Fix My City</span>
                </Link>
                <button 
                    aria-controls="navbar" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation" 
                    className="navbar-toggler" 
                    data-bs-target="#navbar" 
                    data-bs-toggle="collapse" 
                    type="button"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav ms-auto mt-2">
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Log In</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
