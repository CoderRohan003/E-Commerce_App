import express from 'express';
import registerController from '../controllers/authController.js';

// Create a Router Object
const router = express.Router();

// routing function
//! REGISTER --> POST
router.post('/register', registerController);

export default router;