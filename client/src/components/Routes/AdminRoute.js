import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

function AdminRoute(){
    const[ok, setOk] = useState(false);
    const[auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`, {
                    headers: {
                        "Authorization": auth?.token
                    }
                });
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Handle 401 error here, e.g., redirect to an unauthorized page or show a message.
                    // Set the ok response to false if any error
                    setOk(false);
                } else {
                    console.error(error);
                    // Optionally, you can setOk(false) here as well if you want to handle other errors in the same way
                    setOk(false);
                }
            }
        }            
        if(auth?.token) authCheck()
    },[auth?.token])

    return ok? <Outlet /> : <Spinner path=""/>;
}

export default AdminRoute;