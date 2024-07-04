import slugify from "slugify";
import productModel from "../models/productModel.js";  // Ensure .js extension is included if using ES Modules;
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
import orderModel from "../models/orderModel.js";
import { error } from "console";
import braintree from "braintree";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


// payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Token 
const getBraintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// Payment 

const getBraintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0
        cart.map((i) => { total += i.price })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (err, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyers: req.user._id,
                    }).save()
                    res.json({ ok: true })
                }
                else {
                    res.status(500).send(error);
                }
            }
        )
    }
    catch (error) {
        console.log(error);

    }
}

const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //Validations
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and should be less that 1mb" });
        }
        const newProduct = new productModel({
            ...req.fields,
            slug: slugify(name)
        });
        if (photo) {
            newProduct.photo.data = fs.readFileSync(photo.path);
            newProduct.photo.contentType = photo.type;
        }
        await newProduct.save();
        res.status(201).send({
            success: true,
            message: 'New Product created successfully',
            newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error creating product',
            error
        });
    }
};

// Update product Controller
const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //Validations
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            // case photo && photo.size > 1000000:
            //     return res.status(500).send({ error: "Photo is required and should be less that 1mb" });
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: 'Product Updated Successfully',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Updating product',
            error
        });
    }
};

// Get All Product Controller
const getAllProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalProducts: products.length,
            message: 'All Products List',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting all Products',
            error
        });
    }
};

// Get a single Product

const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category');
        res.status(200).send({
            success: true,
            message: 'Single Product Fetched',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error getting product '${req.params.slug}'`,
            error
        });
    }
};

// Get Photo

const getPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (!product) {
            return res.status(404).send({
                success: false,
                message: `Product '${req.params.slug}' not found`
            });
        }
        res.set('Content-Type', product.photo.contentType);
        return res.status(200).send(product.photo.data);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error getting product '${req.params.slug}'`,
            error
        });
    }
};

// Delete Product Controller
const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findByIdAndDelete(pid).select('-photo');
        res.status(200).send({
            success: true,
            message: 'Product Deleted Successfully',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Deleting product',
            error
        });
    }
};

// Filter Products Controller
const filterProductsController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {}
        if (checked.length > 0) {
            args.category = checked
        }
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            totalProducts: products.length,
            message: 'Filtered Products List',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error filtering products',
            error
        });
    }
};

// Product Count Controller

const countProductsController = async (req, res) => {
    try {
        const count = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            totalProducts: count,
            message: 'Product Count'
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error counting products',
            error
        });
    }
};

// Product list based on page
const getProductsController = async (req, res) => {
    try {
        const perPage = 9
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
            message: 'Got per page product'
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error per page get products',
            error
        });
    }
}

// Search for products
const searchProductsController = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },  // i means case insensitive
                { description: { $regex: keyword, $options: 'i' } },

            ]
        }).select("-photo")
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error searching products',
            error
        });
    }
};

// Find similar products
const getSimilarProductsController = async (req, res) => {
    try {
        const limitSimilarProducts_number = 10
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },  // ne is not included
        }).select("-photo").limit(limitSimilarProducts_number).populate("category");
        res.status(200).send({
            success: true,
            message: 'Similar Products List',
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting similar products',
            error
        });
    }
};

// Get products by category

const categoryProductsController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate('category');

        res.status(200).send({
            success: true,
            message: 'Products by Category',
            category,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: `Error getting products by category '${req.params.cid}'`,
            error
        });
    }
};


export { getBraintreePaymentController, getBraintreeTokenController, categoryProductsController, getSimilarProductsController, searchProductsController, getProductsController, countProductsController, filterProductsController, createProductController, updateProductController, deleteProductController, getPhotoController, getAllProductController, getSingleProductController }