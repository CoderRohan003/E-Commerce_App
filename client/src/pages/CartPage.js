import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import '../css/CartPage.css';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);

    // Remove duplicates from cart (by _id)
    const uniqueCart = cart.filter((item, index, self) =>
        index === self.findIndex((t) => t._id === item._id)
    );

    // Total Price Calculation
    const totalPrice = () => {
        try {
            let totalPrice = 0;
            uniqueCart?.forEach((item) => {
                totalPrice += item.price;
            });
            return totalPrice.toLocaleString("en-IN", {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // delete item
    const removeCartItem = (productId) => {
        try {
            console.log("Product ID to remove:", productId); // Debugging log
            let myCart = [...uniqueCart];
            let index = myCart.findIndex(item => item._id === productId);
            console.log("Item index found:", index); // Debugging log
            if (index > -1) {
                myCart.splice(index, 1);
                setCart(myCart);
                localStorage.setItem('cart', JSON.stringify(myCart));
                console.log("Item removed. Updated cart:", myCart); // Debugging log
            } else {
                console.log("Item not found in cart."); // Debugging log
            }
        } catch (error) {
            console.log("Error removing item:", error);
        }
    };

    // Get Payment Gateway
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // Handle payment
    const handlePayment = async () => {
        try {
            setLoading(true); // Start loading
            
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce,
                cart
            });
            console.log("Payment response:", data);
            setLoading(false); // Stop loading after payment is complete

            // Clear cart
            setCart([]);
            localStorage.removeItem('cart');
            navigate('/dashboard/user/orders');
            toast.success("Payment successful!"); // Display success message

        } catch (error) {
            console.log("Payment error:", error);
            setLoading(false); // Stop loading in case of error
        }
    };

    return (
        <Layout>
            <div className="container cart-container">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="row"
                >
                    <div className="col-12">
                        <h1 className='text-center mb-4 p-3 cart-header'>
                            {`Welcome, ${auth?.token ? auth?.user.name : 'Guest'}`}
                        </h1>
                        <h4 className='text-center cart-subheader'>
                            {uniqueCart?.length ? (
                                <>
                                    {`You have ${uniqueCart?.length} items in your cart`}
                                    {!auth?.token && <div className='mt-3'>Please Login to checkout</div>}
                                </>
                            ) : (
                                "Your cart is Empty"
                            )}
                        </h4>
                    </div>
                </motion.div>
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        {uniqueCart?.map((p, index) => (
                            <motion.div 
                                className="card cart-item-card my-3"
                                key={p._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="row g-0">
                                    <div className="col-md-4 col-sm-12 d-flex align-items-center justify-content-center">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="img-fluid rounded-start cart-item-image"
                                            alt={p.name}
                                        />
                                    </div>
                                    <div className="col-md-8 col-sm-12">
                                        <div className="card-body">
                                            <h4 className="card-title">{p.name}</h4>
                                            <p className="card-text">{p.description ? (p.description.length > 100 ? p.description.substring(0, 100) + "..." : p.description) : "No description available"}</p>
                                            <p className="card-text"><strong>Price:</strong> ₹ {p.price}</p>
                                            <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <motion.div 
                            className="card cart-summary-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="card-body">
                                <h4 className="card-title text-center">Cart Summary</h4>
                                <hr />
                                <h4 className="text-center">Total : {totalPrice()} </h4>
                                {auth?.user?.address ? (
                                    <div className="mb-3">
                                        <h5>Current Address</h5>
                                        <p>{auth?.user?.address}</p>
                                        <button
                                            className="btn btn-outline-primary w-100"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mb-3">
                                        {auth?.token ? (
                                            <button
                                                className="btn btn-outline-primary w-100"
                                                onClick={() => navigate("/dashboard/user/profile")}
                                            >
                                                Update Address
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-primary w-100"
                                                onClick={() =>
                                                    navigate("/login", {
                                                        state: "/cart",
                                                    })
                                                }
                                            >
                                                Please Login to checkout
                                            </button>
                                        )}
                                    </div>
                                )}
                                <div className="mt-3">
                                    {clientToken && (
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault"
                                                }
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                    )}
                                    <button
                                        className='btn btn-success w-100 mt-3'
                                        onClick={handlePayment}
                                        disabled={!instance || loading || !auth?.token}
                                    >
                                        {loading ? "Processing..." : "Make Payment"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;




















/* Giving option of Register or Login if user is not there or if user is logged in then logout


//* CHATGPT GENERATED CODE


import React from 'react';
import Layout from '../components/Layout/Layout';

import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';

const CartPage = () => {
const { cart, addToCart, removeCartItem, incrementQuantity, decrementQuantity } = useCart();
const [auth] = useAuth();
const navigate = useNavigate();

const totalPrice = () => {
try {
let totalPrice = 0;
cart?.forEach((item) => {
  totalPrice += item.price * item.quantity;
});
return totalPrice.toLocaleString("en-IN", {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
});
} catch (error) {
console.log(error);
}
};

return (
<Layout>
<div className="container">
  <div className="row">
      <div className="col-md-12">
          <h1 className='text-center mb-1 p-2 bg-light'>
              {`Hello ${auth?.token && auth?.user.name}`}
          </h1>
          <h4 className='text-center'>
              {cart?.length ? (
                  <>
                      {`You have ${cart?.length} items in your cart`}
                      {auth?.token ? "" : <div className='mt-5'><br />Please Login to checkout</div>}
                  </>
              ) : (
                  "Your cart is Empty"
              )}
          </h4>
      </div>
  </div>
  <div className="row">
      <div className="col-md-8">
          {
              cart?.map(p => (
                  <div className="row my-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                          <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top m-4"
                              alt={p.name}
                              style={{ maxWidth: '70%', height: 'auto' }}
                          />
                      </div>
                      <div className="col-md-8">
                          <h4>{p.name}</h4>
                          <p className='mt-4'>{p.description.length > 300 ? p.description.substring(0, 300) + "..." : p.description}</p>
                          <p>Price: ₹ {p.price}</p>
                          <p>Quantity: {p.quantity}</p>
                          <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                          <button className='btn btn-primary' onClick={() => incrementQuantity(p._id)}>+</button>
                          <button className='btn btn-secondary' onClick={() => decrementQuantity(p._id)}>-</button>
                      </div>
                  </div>
              ))
          }
      </div>
      <div className="col-md-4 text-center">
          <h4>Cart Summary</h4>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total : {totalPrice()} </h4>
          {auth?.user?.address ? (
              <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                  >
                      Update Address
                  </button>
              </div>
          ) : (
              <div className="mb-3">
                  {auth?.token ? (
                      <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                      >
                          Update Address
                      </button>
                  ) : (
                      <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                              navigate("/login", {
                                  state: "/cart",
                              })
                          }
                      >
                          Please Login to checkout
                      </button>
                  )}
              </div>
          )}
      </div>
  </div>
</div>
</Layout>
);
};

export default CartPage;

*/