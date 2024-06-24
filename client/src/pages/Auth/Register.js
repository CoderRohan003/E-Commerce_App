import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    // UseState Hooks 

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate();

    // Handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name, email, password, phone, address});
            if (response.data.success) {
                console.log("User registration successful")
                toast.success(response.data.message);
                navigate("/login");
            } else {
                console.log("User registration Unsuccessful")
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }


    return (
        <Layout title={"Register"}>
            <div className="register-page">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="register-card shadow p-5">
                        <h1 className="register-heading text-center mb-4">Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputName" className="form-label" >Name</label>
                                <input type="text" placeholder='John Smith' value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                                <input type="email" placeholder='abc@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                                <input type="text" placeholder='+91-' value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                                <input type="text" placeholder='1/23 - Mall Road' value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Register;
