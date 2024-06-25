import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createProductController } from '../controllers/productController.js';

const router = express.Router();

// routes

//? Create a product || POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// //? Update a product || PUT
// router.put('/update-product/:id', requireSignIn, isAdmin, updateProductController);

// //? Get all products || GET
// router.get('/get-all-products', getAllProductController);

// //? Get a single product || GET
// router.get('/single-product/:slug', getSingleProductController);

// //? Delete a product || DELETE
// router.delete('/delete-product/:id', deleteProductController);


export default router;
