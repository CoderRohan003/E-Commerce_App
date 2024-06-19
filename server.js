import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

// Configure env
dotenv.config();

// Database configuration
connectDB();

// Create a rest app
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to E-Commerce Application</h1>');
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})