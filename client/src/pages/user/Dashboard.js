import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';
import { FaRegSmile } from 'react-icons/fa';

const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={"User Dashboard"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="dashboard-content p-3 shadow-sm rounded">
                            <h2 className="mb-4">Welcome to Dashboard Mr. {auth?.user?.name}</h2>
                            <div className="admin-info mb-4 p-3 shadow-sm rounded">
                                <h4>User Information</h4>
                                <p><strong>Name:</strong> {auth?.user?.name}</p>
                                <p><strong>Email:</strong> {auth?.user?.email}</p>
                                <p><strong>Phone:</strong> {auth?.user?.phone}</p>
                                <p><strong>Address:</strong> {auth?.user?.address}</p>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <div className="card-dashboard text-white bg-primary mb-3">
                                        <div className="card-header">Total Orders</div>
                                        <div className="card-body-dashboard">
                                            <h5 className="card-title-dashboard">150</h5>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="overview-panel">
                                <h3>A Warm Welcome</h3>
                                <p>Welcome to your dashboard! Here, you can explore products, find exciting deals,
                                    and manage your account with ease. Use the menu to navigate different sections and
                                    discover new features. Check out your order history and stay updated on the latest
                                    news and offers.</p>
                                    <p className='text-center'>"Enjoy your shopping experience!"<FaRegSmile style={{fontSize: '2em', width:"70px"}}/></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
