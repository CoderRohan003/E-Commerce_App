import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';

const CategoryProduct = () => {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate()

    const getProductsByCategory = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProduct(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        if(params?.slug) getProductsByCategory();
    },[params?.slug])

    return (
        <Layout>
            <div className="container mt-3">
                <h4 className='text-center'>{category?.name}</h4>
                <h6 className='text-center'>{product?.length} result found</h6>
                <div className="row">
                <div className="d-flex flex-wrap">
                        {product?.map((p) => (

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
                                    <p className="card-text">{p.description.substring(0,30)}...</p>
                                    <p className="card-text"> ₹ {p.price}</p>
                                    <button className='btn btn-primary mx-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <AddToCartButton product={p} />
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct