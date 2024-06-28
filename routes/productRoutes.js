import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createProductController, deleteProductController, filterProductsController, getAllProductController, getPhotoController, getSingleProductController, updateProductController } from '../controllers/productController.js';

const router = express.Router();

// routes

//? Create a product || POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//? Update a product || PUT
router.put('/update-product/:pid', requireSignIn, isAdmin , formidable(), updateProductController);

//? Get all products || GET
router.get('/get-all-products', getAllProductController);

//? Get a single product || GET
router.get('/get-product/:slug', getSingleProductController);

//? get photo || GET
router.get('/product-photo/:pid', getPhotoController);

//? Delete a product || DELETE
router.delete('/delete-product/:pid', deleteProductController);


//? Filter products || POST
router.post('/products-filter', filterProductsController);


export default router;
