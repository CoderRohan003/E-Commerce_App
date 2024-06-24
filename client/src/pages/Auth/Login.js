import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';

const Login = () => {
    // UseState Hooks 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[auth, setAuth] = useAuth()
    const navigate = useNavigate();

    // Handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (response.data.success) {
                console.log("User login successful");
                toast.success(response.data.message);

                // Set user in context
                setAuth({
                    ...auth,
                    token: response.data.token,
                    user: {
                        name: response.data.user.name,
                        email: response.data.user.email,
                        phone: response.data.user.phone,
                        address: response.data.user.address,
                    }
                })
                //? Store the User Info in Local Storage
                localStorage.setItem("auth", JSON.stringify(response.data));
                //? Redirect to Home Page
                navigate("/");
            } else {
                console.log("User login unsuccessful");
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title={"Login"}>
            <div className="register-page">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="register-card shadow p-5">
                        <h1 className="register-heading text-center mb-4">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                                <input type="email" placeholder='abc@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
