import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
    return (
        <Layout>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src="/images/aboutUs.png" alt="About Us" className="img-fluid" style={{width: "90%"}}/>
                    </div>
                    <div className="col-md-6">
                        <h1>About Us</h1>
                        <p>
                            Welcome to Urban Cart, your one-stop destination for all things trendy and affordable in fashion,
                            accessories, home decor, and more. Since our inception, we have been committed to providing our
                            customers with the latest styles, top-quality products, and an exceptional shopping experience.
                        </p>
                        <h2>Our Services</h2>
                        <ul>
                            <li>Wide range of products: Explore a diverse collection of fashion apparel, accessories,
                                home essentials, electronics, and much more, all curated to meet your lifestyle needs.</li>
                            <li>Fast and reliable delivery: Enjoy speedy delivery of your orders right to your doorstep,
                                ensuring that you receive your items in a timely manner.</li>
                            <li>Secure online transactions: Shop with confidence using our secure payment gateways,
                                ensuring the safety and privacy of your financial information.</li>
                            <li>Responsive customer support: Our dedicated support team is available to assist you with any
                                inquiries, concerns, or assistance you may need throughout your shopping journey.</li>
                        </ul>
                        <h2>Our Commitment to Customers</h2>
                        <p>
                            At Urban Cart, we prioritize customer satisfaction above all else. We believe in building lasting
                            relationships with our customers by providing:
                        </p>
                        <ul>
                            <li>Exceptional product quality: We source our products from trusted suppliers and brands, ensuring
                                that you receive only the best in terms of quality and craftsmanship.</li>
                            <li>Transparent policies: Our transparent policies, including easy returns and exchanges, fair pricing,
                                and clear product information, ensure that you have a hassle-free shopping experience.</li>
                            <li>Personalized shopping experience: Tailored recommendations, exclusive offers, and personalized
                                customer support are just a few ways we make your shopping experience with us special.</li>
                            <li>Community engagement: We are committed to giving back to the community and supporting causes that
                                matter to our customers and society as a whole.</li>
                        </ul>
                        <p>
                            Shop with us today and experience the Urban Cart difference. Join our community of fashion-forward
                            individuals and enjoy the convenience, affordability, and style that Urban Cart has to offer.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
