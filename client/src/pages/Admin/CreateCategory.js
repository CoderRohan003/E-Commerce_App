import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';
import '../../css/CreateCategory.css';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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
            toast.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []); // Run once on component mount

    // Handle form submission to create a new category
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });

            if (data?.success) {
                console.log(data);
                toast.success(`${name} category created`);
                setName(''); // Clear input field after successful creation
                getAllCategories(); // Refresh categories list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Failed to create category');
        }
    };

    // Update Category
    const handleUpdatedName = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data?.success) {
                console.log(data);
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName('');
                setVisible(false);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    // Delete Category
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${deleteId}`);
            if (data?.success) {
                console.log(data);
                toast.success(`${data.category.name} is deleted`);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setDeleteConfirmVisible(false);
            setDeleteId(null);
        }
    };

    const showDeleteConfirm = (id) => {
        setDeleteId(id);
        setDeleteConfirmVisible(true);
    };

    return (
        <Layout title={"Admin | Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='mt-5'>
                            <h3 className='m-4'>All Categories</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Edit Category</th>
                                        <th scope="col">Delete Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map(category => (
                                            <tr key={category._id}>
                                                <td>{category.name}</td>
                                                <td><button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(category.name); setSelected(category) }}>Edit</button></td>
                                                <td><button className='btn btn-danger ms-2' onClick={() => showDeleteConfirm(category._id)}>Delete</button></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">No categories found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdatedName} />
                    </Modal>
                    <Modal
                        visible={deleteConfirmVisible}
                        onOk={handleDelete}
                        onCancel={() => setDeleteConfirmVisible(false)}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <p>Are you sure you want to delete this category?</p>
                    </Modal>
                </div>
            </div>
        </Layout>
    );
}

export default CreateCategory;
