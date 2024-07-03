import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import '../css/Categories.css';

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title={'All Categories'}>
            <div className="container my-5">
                <h2 className="text-center mb-4">Browse Our Categories</h2>
                <div className="row">
                    {categories.map((category) => (
                        <div className="col-md-4 col-sm-6 mb-4" key={category._id}>
                            <Link to={`/category/${category.slug}`} className="category-card">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                        <h4 className="card-title">{category.name}</h4>
                                        <div className="corner-decoration"></div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Categories;