import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [category, setCategory] = useState([]);
    
    // Get all categories
    const getCategories = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-categories`);
            setCategory(data?.categories);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() =>{
        getCategories();
    },[])
    
    return category;
}