import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../css/CreateProduct.css'

const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState(false);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-categories`);
                const { data } = response;
                if (data.success) {
                    setCategories(data.categories);
                } else {
                    toast.error('Failed to fetch categories');
                }
            } catch (error) {
                toast.error('Error fetching categories');
            }
        };

        fetchCategories();
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPhotoURL(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', selectedCategory);
        formData.append('photo', photo);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('shipping', shipping);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, formData);

            const { data } = response;
            if (data.success) {
                toast.success('Product created successfully');
                setSelectedCategory('');
                setPhoto(null);
                setPhotoURL('');
                setName('');
                setDescription('');
                setPrice('');
                setQuantity('');
                setShipping(false);
            } else {
                toast.error(data.message);
                navigate(`${process.env.REACT_APP_API}/dashboard/admin/products`);
            }
        } catch (error) {
            toast.error('Error creating product');
        }
    };

    return (
        <Layout title={"Admin | Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="product-form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <Select
                                        className="select-control"
                                        showSearch
                                        placeholder="Select Category"
                                        optionFilterProp="children"
                                        value={selectedCategory || undefined}
                                        onChange={(value) => setSelectedCategory(value)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {categories.map((category) => (
                                            <Option key={category._id} value={category._id}>
                                                {category.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="custom-file-input mb-3">
                                    <input
                                        type="file"
                                        id="photo"
                                        onChange={handlePhotoChange}
                                    />
                                    <label htmlFor="photo" className="upload-btn">Upload Photo</label>
                                    {photoURL && (
                                        <div className="image-preview">
                                            <img src={photoURL} alt="Uploaded" />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Product Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={shipping}
                                            onChange={(e) => setShipping(e.target.checked)}
                                        />{' '}
                                        Shipping Available
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Create Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
