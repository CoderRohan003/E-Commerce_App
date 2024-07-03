import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu.js';
import Layout from '../../components/Layout/Layout.js';
import moment from 'moment';  
import { useAuth } from '../../context/auth.js';
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;

const AdminOrders = () => {

    const [status, setStatus] = useState(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, status) => {
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: status});
            getOrders();
            // setChangeStatus(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={"Admin | View Orders"}>
            <div className="row m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>Admin Orders</h1>
                    <p>This is the admin orders page.</p>
                    {orders?.map((o, i) => {
                        return (
                            <div className="border shadow" key={o._id}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select bordered={false} onChange={(value) => handleChange(o._id,value)} defaultValue={o?.status}>
                                                    {status.map((s,i) => (
                                                        <Option key={i} value={s}>{s}</Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyers?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container">
                                    {o?.products?.map((p, j) => (
                                        <div className="row mb-2 p-3 card flex-row" key={j}>
                                            <div className="col-md-4 d-flex justify-content-center">
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.product._id}`}
                                                    className="card-img-top"
                                                    alt={p.product.name}
                                                    style={{ width: '11rem', height: 'auto' }}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <h5>Name:  {p.product.name}</h5>
                                                <p>Description:  {p.product.description ? p.product.description.substring(0, 30) : "No description available"}</p>
                                                <p>Price : {p.product.price}</p>
                                                <p>Quantity: {p.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders