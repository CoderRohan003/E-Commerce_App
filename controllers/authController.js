import userModel from '../models/userModel.js';

const registerController = async (req,res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        // Validations
        if
        // Check if user already exists
        const userExists = await userModel.findOne({email});
        if (userExists) {
            return res.status(400).json({msg: 'User already exists'});
        }
        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password,
            phone,
            address
        });
        // Save the user
        await newUser.save();
        res.status(201).json({msg: 'User created successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error creating user',
            error
        });
    }
};

export default registerController;
