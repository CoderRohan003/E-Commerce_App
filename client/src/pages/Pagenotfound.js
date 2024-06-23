import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
    return (
        <Layout>
            <div className="container text-center mt-5 ">
                <h1 className="display-1 mb-3">404</h1>
                <h2 className='mb-5'>Page Not Found</h2>
                <p className='display-2 mb-5' >The page you are looking for does not exist.</p>
                <p><Link to="/" className="btn btn-primary">Go Back</Link></p>
            </div>
        </Layout>
    );
};

export default Pagenotfound;