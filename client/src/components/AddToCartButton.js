// AddToCartButton.js
import React from 'react';
import { useCart } from "../context/cart";
import { toast } from 'react-toastify';

const AddToCartButton = ({ product }) => {
    const [cart, setCart] = useCart();

    const handleAddToCart = () => {
        setCart([...cart, product]);
        localStorage.setItem('cart', JSON.stringify([...cart, product]));
        toast.success("Item added to Cart");
    };

    return (
        <button className='btn btn-secondary mx-1' onClick={handleAddToCart}>
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
