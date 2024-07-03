import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null); // Ensure initial state is null
    const [loading, setLoading] = useState(false);

    // Total Price Calculation
    const totalPrice = () => {
        try {
            let totalPrice = 0;
            cart?.forEach((item) => {
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
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === productId);
            if (index > -1) {
                myCart.splice(index, 1);
                setCart(myCart);
                localStorage.setItem('cart', JSON.stringify(myCart));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Get Payment Gateway
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            console.log("Client Token:", data?.clientToken); // Debugging log
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
            navigate('/dashboard/user/orders')   
            toast.success("Payment successful!"); // Display success message

        } catch (error) {
            console.log("Payment error:", error);
            setLoading(false); // Stop loading in case of error
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
                        {cart?.map(p => (
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
                                    <p className='mt-4'>{p.description ? (p.description.length > 300 ? p.description.substring(0, 300) + "..." : p.description) : "No description available"}</p>
                                    <p>Price: ₹ {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
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
                            </>
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
                        <div className="mt-2">
                            {clientToken ? (
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: "vault"
                                        }
                                    }}
                                    onInstance={(instance) => {
                                        console.log("Braintree instance:", instance); // Debugging log
                                        setInstance(instance);
                                    }}
                                />
                            ) : (
                                <p>Loading payment gateway...</p>
                            )}
                            <button
                                className='btn btn-warning mt-3'
                                onClick={handlePayment}
                                disabled={!instance || loading || !auth?.token}
                            >
                                {loading ? "Processing..." : "Make Payment"}
                            </button>
                            <div className='mt-3 text-danger'>{loading && "Loading..."}</div>
                        </div>
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