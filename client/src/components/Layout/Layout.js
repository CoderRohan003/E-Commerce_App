import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";

const Layout = ({children, title, description, author, keyword}) => {
    return (
        <div>
            {/* This is for SEO Optimization . React-Helmet is used */}
            <Helmet>  
                <meta charSet="utf-8" />
                <title>Urban Cart | {title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author} />
            </Helmet>
            <Header />
            <main style={{minHeight: "80vh"}}>
                {children}
            </main>
            <Footer/>
        </div>
    );
}

Layout.defaultProps = {
    title: "E-Commerce Application",
    description: "MERN stack Project",
    author: "Urban Cart",
    keyword: "React, NodeJS, MongoDB, Express.js"
}

export default Layout;
