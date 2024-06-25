import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from './../controllers/categoryController.js';

const router = express.Router();

// routes

//? Create a category || POST
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//? Update a category || PUT
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//? Get all categories || GET
router.get('/get-all-categories', getAllCategoryController);

//? Get a single category || GET
router.get('/single-category/:slug', getSingleCategoryController);

//? Delete a category || DELETE
router.delete('/delete-category/:id', deleteCategoryController);


export default router;
