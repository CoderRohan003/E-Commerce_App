import { comparePassword, hashPassword } from '../helpers/authEncryption.js';
import userModel from '../models/userModel.js';
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // Validations
        if (!name)
            return res.send("Name is required");
        if (!email)
            return res.send("Email is required");
        if (!phone)
            return res.send("Phone No. is required");
        if (!password)
            return res.send("Password is required");
        if (!address)
            return res.send("Address is required");

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
            address
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
            return res.send("Email is required");
        if (!password)
            return res.send("Password is required");

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
        const token = await JWT.sign({_id:existingUser._id}, process.env.JWT_SECRET, {
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

}
export {registerController, loginController};
