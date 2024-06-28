// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";

// const ProductCard = ({ product }) => {
//   const { _id, name, description, slug, price, shipping } = product;
//   const [productDetails, setProductDetails] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const getProductDetails = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`
//         );
//         setProductDetails(data);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch product details");
//       }
//     };

//     getProductDetails();
//   }, [slug]);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div
//       className="card m-2"
//       style={{
//         width: "18rem",
//         transition: "transform 0.2s ease-in-out",
//         transform: isHovered ? "scale(1.05)" : "scale(1)",
//       }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Link
//         to={`/dashboard/admin/product/${slug}`}
//         className="product-link "
//         style={{ textDecoration: "none" }}
//       >
//         <div className="d-flex justify-content-center" style={{backgroundColor: "lightgray"}}>
//         <img
//           src={productDetails?.photoUrl || `${process.env.REACT_APP_API}/api/v1/product/product-photo/${_id}`}
//           className="card-img-top w-75 "
//           alt={name}
//           style={{ transition: "filter 0.2s ease-in-out" }}
//         />
//         </div>
//         <div className="card-body">
//           <h5 className="card-title" style={{color:"black", fontWeight:"1.8rem"}}>{productDetails?.name || name}</h5>
//           <p className="card-text" style={{color:"gray", fontWeight:"0.8rem"}}>{productDetails?.description || description}</p>
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <h6 className="text-muted">${price}</h6>
//             {shipping && (
//               <span className="badge bg-success">Shipping Available</span>
//             )}
//           </div>
//         </div>
//       </Link>
//       <div className="card-footer">
//         <button
//           className="btn btn-warning w-100"
//           style={{}}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/get-all-products`
//       );
//       setProducts(data.products);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <Layout title={"Admin | View Products"}>
//       <div className="row m-3 p-3">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1 className="text-center">All Products List</h1>
//           {loading ? (
//             <div className="text-center">Loading...</div>
//           ) : (
//             <div className="d-flex flex-wrap">
//               {products?.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Products;







import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const Products = () => {
    const [products, setProducts] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-products`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title={"Admin | View Products"}>
            <div className="row m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products List</h1>
                    <div className="d-flex flex-wrap justify-content-center">
                        {products?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                className="product-link"
                                style={{
                                    textDecoration: 'none',
                                    margin: '0.5rem',
                                    transition: 'transform 0.2s ease-in-out',
                                    transform: 'scale(1)',
                                    display: 'block',
                                    width: '18rem',
                                    ':hover': {
                                        transform: 'scale(1.5)',
                                    }
                                }}
                            >
                                <div className="card" style={{ width: "18rem" , minHeight:"19.5rem"}}>
                                    <div className="d-flex justify-content-center" style={{backgroundColor:"lightgray"}}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ maxWidth: '70%', height: 'auto'}}
                                    />
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
