import { comparePassword, hashPassword } from '../helpers/authEncryption.js';
import Order from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import JWT from "jsonwebtoken";


const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        // Validations
        if (!name)
            return res.status(400).send({ message: "Name is required" });
        if (!email)
            return res.status(400).send({ message: "Email is required" });
        if (!phone)
            return res.status(400).send({ message: "Phone No. is required" });
        if (!password)
            return res.status(400).send({ message: "Password is required" });
        if (!address)
            return res.status(400).send({ message: "Address is required" });
        if (!answer)
            return res.status(400).send({ message: "Answer is required" });

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'User already exists , Please Login',
            });
        }
        // Register new user
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer
        });
        // Save the user
        await newUser.save();
        res.status(201).send({
            success: true,
            message: 'User created successfully',
            user: newUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error creating user',
            error
        });
    }
};

// POST -> LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validations
        if (!email)
            return res.send({ message: "Email is required" });
        if (!password)
            return res.send({ message: "Password is required" });

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User does not exists, Please Register',
            });
        }
        // Check if password is correct
        const isPasswordCorrect = await comparePassword(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(200).send({
                success: false,
                message: 'Password is incorrect',
            });
        }
        // Generate JWT
        const token = await JWT.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            user: {
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                address: existingUser.address,
                role: existingUser.role,
            },
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error logging in user',
            error
        })

    }

};

// Forgot Password Controller
const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        // Validations
        if (!email)
            return res.status(400).send({ message: "Email is required" });
        if (!answer)
            return res.status(400).send({ message: "Answer is required" });
        if (!newPassword)
            return res.status(400).send({ message: "New Password is required" });

        // Check 
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer',
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error logging in user',
            error
        })
    }
}

// Test Conntroller
const testController = (req, res) => {
    try {
        res.status(200).send("Protected Route")
    } catch (error) {
        console.log(error);
        res.status(404).send({ error });
    }
}

const dashboardController = (req, res) => {
    res.status(200).send({ ok: true });
}

const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const user = await userModel.findById(req.user._id);
        // password check
        if(password)
            {
                return res.status(400).send({ message: "Password is required" });
            }
            const hashedPassword = password ? await hashPassword(password) : undefined;
        const userUpdated = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true });

        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            userUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error updating profile',
            error
        });
    }
};


const orderController = async (req, res) => {
    try {
        const orders = await Order.find({ buyers: req.user._id })
            .populate({
                path: 'products.product', // Change from products to products.product
                select: '-photo' // Add the fields you need
            })
            .populate('buyers', 'name');

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching orders',
            error
        });
    }
};



const getAllordersController = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate({
                path: 'products.product', // Populate the 'product' field within the 'products' array
                select: '-photo' // Exclude the 'photo' field from 'product'
            })
            .populate('buyers', 'name') // Populate 'buyers' with only the 'name' field
            .sort({ createdAt: -1 }); // Sort orders by createdAt in descending order

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching orders',
            error
        });
    }
};

// order status update
const updateOrderStatusController = async (req, res) => {
    try {
            const { orderId } = req.params
            const { status } = req.body;
            const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
            res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error updating status of orders',
            error
        });
    }
}



const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
            .select('name email phone address role createdAt') // Select the fields you need
            .exec();

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(400).json({
            success: false,
            message: 'Error fetching users',
            error: error.message,
        });
    }
};




export { getAllUsersController, updateOrderStatusController, getAllordersController, orderController, updateProfileController, registerController, loginController, testController, dashboardController, forgotPasswordController };
