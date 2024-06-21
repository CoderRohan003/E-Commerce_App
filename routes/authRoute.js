import express from 'express';
import { registerController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


// Create a Router Object
const router = express.Router();

// routing function
//! REGISTER --> POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

// TestRoutes
//! Two Middleware check -> (1) checks sign in ; (2) checks if Admin 

router.get('/test', requireSignIn, isAdmin, testController);

export default router;