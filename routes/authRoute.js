import express from 'express';
import { registerController, loginController, testController, dashboardController, forgotPasswordController, updateProfileController, orderController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


// Create a Router Object
const router = express.Router();

// routing function
//! REGISTER --> POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

// TestRoutes
//? Two Middleware check -> (1) checks sign in ; (2) checks if Admin 
router.get('/test', requireSignIn, isAdmin, testController);

//? Protected Routes for Dashboard Users
router.get('/user-auth', requireSignIn, dashboardController);

//? Protected Routes for Dashboard Users | Update Profile | Put
router.put('/profile', requireSignIn, updateProfileController);

//? Protected Routes for Dashboard Admin
router.get('/admin-auth', requireSignIn, isAdmin, dashboardController);

//? Orders || GET
router.get('/orders', requireSignIn, orderController);
export default router;