import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // Use the connection string directly since it already includes the DB name
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\nMongoDB connected || DB Host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("Mongo DB Connection error: ", error)
        process.exit(1)
    }
}

export default connectDB