import React from 'react'
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // Total Price Calculation
    const totalPrice = () => {
        try {
            let totalPrice = 0;
            cart?.map((item) => {
                totalPrice = item.price + totalPrice;
            });
            return totalPrice.toLocaleString("en-IN",{
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
              });
        } catch (error) {
            console.log(error)
        }
    }

    // delete item
    const removeCartItem = (productId) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === productId)
            if (index > -1) {
                myCart.splice(index, 1);
                setCart(myCart);
                localStorage.setItem('cart', JSON.stringify(myCart));
            }
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
                                    <div className="row my-3 card flex-row">
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
                                    <p className='mt-4'>{p.description.length > 300 ? p.description.substring(0, 300) + "..." : p.description}
                                    </p>
                                    <p>Price: ₹ {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                                ))
                            }
                    </div>
                    <div className="col-md-4 text-center">
                        <h4>Cart Summary</h4>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total : {totalPrice()}</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage