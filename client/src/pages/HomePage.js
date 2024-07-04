import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from "antd";
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import '../css/HomePage.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState(false);

    const navigate = useNavigate();
    const limit = 10;

    const getTotalCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
            setTotal(data?.totalProducts);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-categories`);
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getAllCategories();
        getTotalCount();
    }, []);

    const getAllProducts = async (reset = false) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}?limit=${limit}`);
            setLoading(false);
            setProducts(reset ? data.products : [...products, ...data.products]);
            setFiltered(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (!filtered) {
            getAllProducts(page === 1);
        }
    }, [page]);

    const handleFilter = (value, categoryId) => {
        let all = [...checked];
        if (value) {
            all.push(categoryId);
        } else {
            all = all.filter((id) => id !== categoryId);
        }
        setChecked(all);
        setPage(1);
    };

    useEffect(() => {
        if (!checked.length && !radio.length) {
            getAllProducts(true);
        } else {
            setPage(1);
            filteredProducts();
        }
    }, [checked.length, radio.length]);

    const filteredProducts = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/products-filter`, { checked, radio, page, limit });
            setProducts(data.products);
            setTotal(data.totalFiltered);
            setFiltered(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"Home Page"}>
            <div className="homepage-container">
                <div className="filters-column">
                    <h4 className="filter-title">Filter By Category</h4>
                    <div className="category-filters">
                        {categories?.map(category => (
                            <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                {category.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className="filter-title">Filter By Price</h4>
                    <div className="price-filters">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <button className="reset-button" onClick={() => window.location.reload()}>Reset Filters</button>
                </div>
                <div className="products-column">
                    <h1 className="page-title">All Products</h1>
                    <div className="products-grid">
                        {products?.map((p) => (
                            <div className="product-card" key={p._id}>
                                <div className="product-image-container">
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="product-image"
                                        alt={p.name}
                                    />
                                </div>
                                <div className="product-details">
                                    <h5 className="product-title" title={p.name}>
                                        {p.name.length > 42 ? p.name.substring(0, 42) + "..." : p.name}
                                    </h5>
                                    <p className="product-description">{p.description.length > 115 ? p.description.substring(0, 115) + "..." : p.description}</p>
                                    <p className="product-price">₹ {p.price}</p>
                                    <div className="product-buttons">
                                        <button className='details-button' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <AddToCartButton product={p} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='load-more-container'>
                        {products && products.length < total && (
                            <button className='load-more-button' onClick={(e) => { e.preventDefault(); setPage(page + 1); }}>
                                {loading ? "loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;








/*

//* CHATGPT CODE




import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from "antd";
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cart";
import { toast } from 'react-toastify';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const { cart, setCart, addToCart } = useCart();

    const navigate = useNavigate();

    // Get total count of products
    const getTotalCount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
            const { data } = response;
            if (data.success) {
                setTotal(data.totalProducts); // Assuming data.totalProducts is a number
            } else {
                console.error('Failed to fetch total count');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Function to fetch all categories
    const getAllCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-categories`);
            const { data } = response;
            if (data.success) {
                setCategories(data.categories); // Assuming data.categories is an array
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getAllCategories();
        getTotalCount();
    }, []); // Run once on component mount

    // TO get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    // Load More
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Function to filter products by category
    const handleFilter = (value, categoryId) => {
        let all = [...checked];
        if (value) {
            all.push(categoryId);
        } else {
            all = all.filter((id) => id !== categoryId);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filteredProducts();
    }, [checked, radio]);

    // Get filtered products
    const filteredProducts = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/products-filter`, { checked, radio });
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"Home Page"}>
            <div className="row m-3">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((category) => (
                            <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                {category.name}
                            </Checkbox>
                        ))}
                    </div>
                   
                    <h4 className="text-center mt-5">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className="d-flex flex-column">
                        <button className="btn btn-danger mt-4" onClick={() => window.location.reload()}>Reset Filters</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-3" style={{ width: "21rem", minHeight: "19.5rem" }} key={p._id}>
                                <div className="d-flex justify-content-center" style={{ backgroundColor: "lightgray" }}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ maxWidth: '70%', height: 'auto' }}
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p>{p.description.length > 50 ? p.description.substring(0, 50) + "..." : p.description}</p>
                                    <p className="card-text"> ₹ {p.price}</p>
                                    <button className='btn btn-primary mx-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className='btn btn-secondary mx-1' onClick={() => {
                                        addToCart(p);
                                        toast.success("Item added to Cart");
                                    }}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='m-2 p-2'>
                        {products && products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>
                                {loading ? "loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
*/