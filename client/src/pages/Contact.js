import React from 'react';
import Layout from '../components/Layout/Layout';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Import React icons


const ContactUs = () => {
    return (
        <Layout title={"Contact Us"}>
            <div className="contact-banner">
                <h1>Contact Us</h1>
                <p>Got questions or feedback? We're here to help!</p>
            </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src="/images/contactUs.jpg" alt="Contact Us" className="img-fluid" style={{width:"60%"}}/>
                    </div>
                    <div className="col-md-6">
                        <div className="contact-info">
                            <h2>Reach Out to Us</h2>
                            <ul className="list-unstyled">
                                <li><a href="tel:+9756842631"><FaPhoneAlt className="icon" /> +91-9756842631</a></li>
                                <li><a href="mailto:info@urbancart.com"><FaEnvelope className="icon" /> info@urbancart.com</a></li>
                                <li><a href="https://maps.google.com"><FaMapMarkerAlt className="icon" /> 1234 Main Street, City, Country</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContactUs;
