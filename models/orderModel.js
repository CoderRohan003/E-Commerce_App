import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products:[{
        type: mongoose.ObjectId,
        ref: 'Product',
        required: true,
        quantity: Number
    }],
    payment : {},
    buyers: {
        type: mongoose.ObjectId,
        ref: 'users',
        required: true,
    },
    status : {
        type: String,
        required: true,
        default: 'Pending',
        enum : ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled' ],
    }
},{
    timestamps: true
});

export default mongoose.model('Order', orderSchema);
