import { comparePassword, hashPassword } from '../helpers/authEncryption.js';
import userModel from '../models/userModel.js';
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        // Validations
        if (!name)
            return res.status(400).send({message:"Name is required"});
        if (!email)
            return res.status(400).send({message:"Email is required"});
        if (!phone)
            return res.status(400).send({message:"Phone No. is required"});
        if (!password)
            return res.status(400).send({message:"Password is required"});
        if (!address)
            return res.status(400).send({message:"Address is required"});
        if(!answer)
            return res.status(400).send({message:"Answer is required"});

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
            return res.send({message: "Email is required"});
        if (!password)
            return res.send({message: "Password is required"});

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

};

// Forgot Password Controller
const forgotPasswordController = async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body
        // Validations
        if (!email)
            return res.status(400).send({message: "Email is required"});
        if (!answer)
            return res.status(400).send({message: "Answer is required"});
        if (!newPassword)
            return res.status(400).send({message: "New Password is required"});

        // Check 
        const user = await userModel.findOne({email, answer});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer',
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
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
        res.status(404).send({error});
    }
}

const dashboardController = (req, res) => {
    res.status(200).send({ ok: true });
}

export {registerController, loginController, testController, dashboardController, forgotPasswordController};
