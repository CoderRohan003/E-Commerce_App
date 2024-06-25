import slugify from "slugify";
import productModel from "../models/productModel.js";  // Ensure .js extension is included if using ES Modules
import fs from 'fs';

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

// // Update product Controller
// const updateProductController = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const { id } = req.params;
//         const product = await productModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
//         res.status(200).send({
//             success: true,
//             message: 'Product Updated Successfully',
//             product
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error Updating product',
//             error
//         });
//     }
// };

// // Get All Product Controller
// const getAllProductController = async (req, res) => {
//     try {
//         const categories = await productModel.find({});
//         res.status(200).send({
//             success: true,
//             message: 'All Categories List',
//             categories
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error getting all categories',
//             error
//         });
//     }
// };

// // Get a single Product

// const getSingleProductController = async (req, res) => {
//     try {
//         const product = await productModel.findOne({ slug: req.params.slug });
//         res.status(200).send({
//             success: true,
//             message: 'Product Details',
//             product
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: `Error getting product '${req.params.slug}'`,
//             error
//         });
//     }
// };

// // Delete Product Controller
// const deleteProductController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await productModel.findByIdAndDelete(id);
//         res.status(200).send({
//             success: true,
//             message: 'Product Deleted Successfully',
//             product
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error Deleting product',
//             error
//         });
//     }
// };


// export { createProductController, updateProductController, getAllProductController, getSingleProductController, deleteProductController };
export { createProductController };