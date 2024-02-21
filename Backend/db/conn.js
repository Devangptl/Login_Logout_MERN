import mongoose from "mongoose";

const connectDb = async() =>{

    try {

         await mongoose.connect(`${process.env.DB_URL}`)

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }

}

export default connectDb