import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import '../css/PrivacyPolicy.css';


const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="container my-5">
                <div className="privacy-policy">
                    <h1 className='text-center mb-5'>Privacy Policy</h1>
                    <p>
                        At Urban Cart, we are committed to protecting your privacy and ensuring the security of your personal information.
                        This Privacy Policy outlines how we collect, use, disclose, and protect the information you provide to us.
                    </p>
                    <h2>Information Collection and Use</h2>
                    <p>
                        We collect personal information such as your name, email address, phone number, and shipping address when
                        you create an account, place an order, or contact us for support.
                    </p>
                    <h2>How We Use Your Information</h2>
                    <p>
                        We use the information we collect to process orders, provide customer support, personalize your shopping experience,
                        and communicate with you about promotions, updates, and new products.
                    </p>
                    <h2>Information Sharing and Disclosure</h2>
                    <p>
                        We do not sell, trade, or rent your personal information to third parties. However, we may share your information
                        with trusted service providers who assist us in operating our website, conducting business, or servicing you.
                    </p>
                    <h2>Security</h2>
                    <p>
                        We implement security measures to protect your personal information from unauthorized access, alteration, disclosure,
                        or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot
                        guarantee absolute security.
                    </p>
                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately
                        upon posting on our website. We encourage you to review this Privacy Policy periodically for any updates.
                    </p>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns about our Privacy Policy, please contact us at 
                        <Link to="/contact" >Contact Us</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
