import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={"Admin Dashboard"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="dashboard-content p-3 shadow-sm rounded">
                            <h2 className="mb-4">Welcome to the Admin Dashboard</h2>
                            <div className="admin-info mb-4 p-3 shadow-sm rounded">
                                <h4>Admin Information</h4>
                                <p><strong>Name:</strong> {auth?.user?.name}</p>
                                <p><strong>Email:</strong> {auth?.user?.email}</p>
                                <p><strong>Phone:</strong> {auth?.user?.phone}</p>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <div className="card text-white bg-primary mb-3">
                                        <div className="card-header">Total Products</div>
                                        <div className="card-body">
                                            <h5 className="card-title">150</h5>
                                            <p className="card-text">Number of products in the database.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-white bg-success mb-3">
                                        <div className="card-header">Total Categories</div>
                                        <div className="card-body">
                                            <h5 className="card-title">25</h5>
                                            <p className="card-text">Number of categories in the database.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-white bg-warning mb-3">
                                        <div className="card-header">Total Users</div>
                                        <div className="card-body">
                                            <h5 className="card-title">300</h5>
                                            <p className="card-text">Number of registered users.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="overview-panel">
                                <h3>Overview</h3>
                                <p>Welcome to the admin dashboard. Here you can manage your products, categories, and users. Use the menu on the left to navigate through different management options. Below are some quick stats to give you an overview of the current status.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
