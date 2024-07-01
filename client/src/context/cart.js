import { useState, useContext, createContext, useEffect } from "react";


const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingItem = localStorage.getItem('cart');
        if (existingItem) {
            setCart(JSON.parse(existingItem));
        }
    },[])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//? Creating a Custom Hook
const useCart = () => useContext(CartContext)

export { useCart, CartProvider };

/*

//* CHATGPT GENERATED CODE


import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const existingCart = localStorage.getItem('cart');
        if (existingCart) {
            setCart(JSON.parse(existingCart));
        }
    }, []);

    const addToCart = (product) => {
        const currentCart = [...cart];
        const productIndex = currentCart.findIndex(item => item._id === product._id);

        if (productIndex > -1) {
            currentCart[productIndex].quantity += 1;
        } else {
            currentCart.push({ ...product, quantity: 1 });
        }

        setCart(currentCart);
        localStorage.setItem('cart', JSON.stringify(currentCart));
    };

    const removeCartItem = (productId) => {
        const currentCart = [...cart];
        const updatedCart = currentCart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const incrementQuantity = (productId) => {
        const currentCart = [...cart];
        const productIndex = currentCart.findIndex(item => item._id === productId);

        if (productIndex > -1) {
            currentCart[productIndex].quantity += 1;
            setCart(currentCart);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
    };

    const decrementQuantity = (productId) => {
        const currentCart = [...cart];
        const productIndex = currentCart.findIndex(item => item._id === productId);

        if (productIndex > -1) {
            if (currentCart[productIndex].quantity > 1) {
                currentCart[productIndex].quantity -= 1;
            } else {
                currentCart.splice(productIndex, 1);
            }
            setCart(currentCart);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeCartItem, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
*/