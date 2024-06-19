import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDb ${error}`)
    }
};

export default connectDB;