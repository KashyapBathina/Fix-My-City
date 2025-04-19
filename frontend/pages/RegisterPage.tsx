import React from 'react';
import Register from '../components/Register';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';

const RegisterPage = () => {
    return(
        <div className="register-page-wrapper">
            <Navbar />
            <PageTitle title="Fix-My-City: Register" />
            <Register />
        </div>
    );
};

export default RegisterPage;