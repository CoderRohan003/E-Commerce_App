import React from 'react';
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/Header.css';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate('/product-search');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="search-form" role="search" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    className="form-control search-input"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn1 btn-search" type="submit">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchInput;