import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // Use the connection string directly without appending DB_NAME 
        // since it's already included in the MONGODB_URI
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\nMongoDB connected || DB Host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("Mongo DB Connection error: ", error)
        process.exit(1)
    }
}

export default connectDB