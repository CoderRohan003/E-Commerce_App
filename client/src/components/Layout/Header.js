import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/">
                            <img src="/images/logo.png" alt="Urban Cart Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            Urban Cart
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/category" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
                                    Categories
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink to="/category/electronics" className="dropdown-item">Electronics</NavLink></li>
                                    <li><NavLink to="/category/fashion" className="dropdown-item">Fashion</NavLink></li>
                                    <li><NavLink to="/category/home-garden" className="dropdown-item">Home & Garden</NavLink></li>
                                    <li><NavLink to="/category/sports" className="dropdown-item">Sports</NavLink></li>
                                    <li><NavLink to="/category/toys" className="dropdown-item">Toys</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">Cart (0)</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
