import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        product: {  // Change from type to an embedded document with product reference and quantity
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    payment: {},
    buyers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);
