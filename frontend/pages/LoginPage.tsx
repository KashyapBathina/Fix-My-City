import React from 'react';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';

// Import necessary stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/styles.css';

const LoginPage = () => {
    return(
        <div className="login-page-wrapper">
            <Navbar />
            <PageTitle title="Fix-My-City: Log In" />
            <Login />
        </div>
    );
};

export default LoginPage;