import express from 'express';
import {registerController, loginController, testController} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';


// Create a Router Object
const router = express.Router();

// routing function
//! REGISTER --> POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

// TestRoutes
router.get('/test',requireSignIn, testController);

export default router;