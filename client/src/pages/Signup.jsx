import React from 'react';

import Layout from './Layout';
import SignUpForm from '../components/forms/SignUpForm';
const Signup = () => {
    return (
        <Layout
            title="Sign Up"
            description="Create an account with us, to get our best books!"
            className="container col-md-4 offset-md-4"
        >
            <SignUpForm />
        </Layout>
    );
};

export default Signup;
