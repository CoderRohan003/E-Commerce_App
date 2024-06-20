import express from 'express';
import {registerController, loginController} from '../controllers/authController.js';

// Create a Router Object
const router = express.Router();

// routing function
//! REGISTER --> POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

export default router;