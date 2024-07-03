//? This is a script for generating fake orders since PAYPAL is not linked in payments system

import mongoose from 'mongoose';
import Order from './models/orderModel.js'; // Adjust the path to your order model
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB successfully');

    // Sample product and user IDs
    const sampleProduct1 = new mongoose.Types.ObjectId("667ab03475cfa8a15d63c88c");
    const sampleProduct2 = new mongoose.Types.ObjectId("667c2166733257bf8153750b");
    const sampleUser1 = new mongoose.Types.ObjectId("6679c7f7d125f0b92014f460");

    const orders = [
        {
            products: [
                { product: sampleProduct1, quantity: 2 },
                { product: sampleProduct2, quantity: 1 }
            ],
            payment: {
                transactionId: "txn_01",
                amount: 1000
            },
            buyers: sampleUser1,
            status: 'Pending'
        },
        {
            products: [
                { product: sampleProduct2, quantity: 3 }
            ],
            payment: {
                transactionId: "txn_02",
                amount: 1500,
                success: true
            },
            buyers: sampleUser1,
            status: 'Processing'
        },
        {
            products: [
                { product: sampleProduct1, quantity: 1 }
            ],
            payment: {
                transactionId: "txn_03",
                amount: 500,
                success: true
            },
            buyers: sampleUser1,
            status: 'Shipped'
        },
        {
            products: [
                { product: sampleProduct1, quantity: 4 },
                { product: sampleProduct2, quantity: 2 }
            ],
            payment: {
                transactionId: "txn_04",
                amount: 2000,
                success: true
            },
            buyers: sampleUser1,
            status: 'Delivered'
        },
        {
            products: [
                { product: sampleProduct2, quantity: 5 }
            ],
            payment: {
                transactionId: "txn_05",
                amount: 2500
            },
            buyers: sampleUser1,
            status: 'Cancelled'
        }
    ];

    // Insert the sample orders into the database
    Order.insertMany(orders)
        .then(() => {
            console.log("Sample orders inserted successfully");
            mongoose.connection.close();
        })
        .catch((error) => {
            console.error("Error inserting sample orders:", error);
            mongoose.connection.close();
        });
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
