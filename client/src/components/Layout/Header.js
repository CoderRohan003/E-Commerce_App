import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import {useCart} from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart()
    const category = useCategory();

    //? Handle Logout Method
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        });
        localStorage.removeItem('auth');
        toast.success("Logged out Successfully");
    }
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
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={"/category"} data-bs-toggle="dropdown" >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li> <Link className="dropdown-item" to={"/categories"}>All Categories</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    {category?.map((c) => (
                                        <li>
                                            <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                                        </li>
                                    ))}
                                </ul>


                            </li>

                            {/* Giving option of Register or Login if user is not there or if user is logged in then logout */}
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">Login</NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" to="/dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink></li>
                                            {/* <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li> */}
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink></li>
                                        </ul>
                                    </li>
                                </>)
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                <NavLink to="/cart" className="nav-link">Cart</NavLink>
                                </Badge>
                              
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
