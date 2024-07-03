import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AddToCartButton from '../components/AddToCartButton'

const ProductDetails = () => {
    // get product details
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    const getProduct = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getRelatedProducts(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    };

    // Get similar Products 

    const getRelatedProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-products/${pid}/${cid}`);
            setRelatedProduct(data?.products);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ maxWidth: '70%', height: 'auto', margin: "2rem", outline: "1px solid black" }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    {/* {JSON.stringify(product, null, 4)} */}
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <h6>Shipping : {product.shipping ? "Available" : "Not Available"}  in your location</h6>
                    <AddToCartButton product={product} />
                </div>
                <hr />

                <div className="row">
                    <h3>Similar Products</h3>
                    {/* {JSON.stringify(relatedProduct, null, 4)} */}
                    {relatedProduct.length < 1 && (<p className='text-center'>No Similar Product Found</p>)}
                    <div className="d-flex flex-wrap">
                        {relatedProduct?.map((p) => (

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
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text"> ₹ {p.price}</p>
                                    <AddToCartButton product={p} />                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default ProductDetails