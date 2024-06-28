import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from "antd";
import { Prices } from '../components/Prices';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

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
    }, []); // Run once on component mount

    // TO get all proucts
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-products`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to filter products by category
    const handleFilter = (value, categoryId) => {
        let all = [...checked]
        if (value) {
            all.push(categoryId);
        } else {
            all = all.filter((id) => id !== categoryId);
        }
        setChecked(all);
    };

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout title={"Home Page"}>
            <div className="row m-3">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map(category => (
                            <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>{category.name}</Checkbox>
                        ))}
                    </div>
                    {/* Filter by Price  */}
                    <h4 className="text-center mt-5">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>

                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                </div>
                <div className="col-md-9">
                    {JSON.stringify(checked, null, 4)}
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (

                            <div className="card m-3" style={{ width: "21rem", minHeight: "19.5rem" }}>
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
                                    <p className="card-text">{p.description}</p>
                                    <button className='btn btn-primary mx-1' >More Details</button>
                                    <button className='btn btn-secondary mx-1'>Add to Cart</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage