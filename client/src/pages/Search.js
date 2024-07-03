import React from 'react';
import Layout from './../components/Layout/Layout';
import { useSearch } from '../context/search';
import AddToCartButton from '../components/AddToCartButton';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    return (
        <Layout title={'Search Results'}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6 className='mt-5'>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length} Result`} </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
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
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
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
    );
}

export default Search;
