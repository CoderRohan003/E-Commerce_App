import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    // UseState Hooks 

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [auth, setAuth] = useAuth()

    // get user data
    useEffect(() => {
        const { email, name, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhone(phone);
    }, [])

    // Handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { name, email, password, phone, address });
            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data?.userUpdated });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data?.userUpdated;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            console.log(error);
            const err = JSON.parse(error.request.responseText).message
            console.log(err);
            toast.error(err);
        }
    }

    return (
        <Layout title={"User Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="register-page" style={{ backgroundColor: "lightgray", backgroundImage: "none" }}>
                            <div className="container d-flex justify-content-center align-items-center">
                                <div className="register-card shadow p-5">
                                    <h1 className="register-heading text-center mb-4">User Profile</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputName" className="form-label" >Name</label>
                                            <input type="text" placeholder='John Smith' value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" autoComplete='off' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                                            <input type="email" placeholder='abc@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" autoComplete='off' disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" autoComplete='new-password' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                                            <input type="text" placeholder='+91-' value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" autoComplete='off' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                                            <input type="text" placeholder='1/23 - Mall Road' value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" autoComplete='off' />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">Update Details</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile