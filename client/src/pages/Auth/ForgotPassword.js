import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    // UseState Hooks 
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // Handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newPassword, answer });
            if (response.data.success) {
                console.log("Password reset successful");
                toast.success(response.data.message);
                // Redirect to login page
                navigate("/login");
            } else {
                console.log("Error in resetting password");
                toast.error(response.data.message);
            }
        } catch (error) {
            const err = JSON.parse(error.request.responseText).message
            console.log(err);
            toast.error(err);
        }
    }

    return (
        <Layout title="Reset Password">
            <div className="register-page">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="register-card shadow p-5">
                        <h1 className="register-heading text-center mb-4">Reset Password</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    id="exampleInputEmail"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputNewPassword" className="form-label">New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="form-control"
                                    id="exampleInputNewPassword"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputAnswer" className="form-label">Answer</label>
                                <input
                                    type="text"
                                    placeholder="Enter your Favorite place"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="form-control"
                                    id="exampleInputAnswer"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
