import dotenv from "dotenv";
import connectDB from "./db/db.js";
import express from "express"
import {app} from './app.js'

dotenv.config({
    path:'src/.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running at port ${process.env.PORT}` );
    })
})
.catch((err) => {
    console.log("MONGO DB Connection Failed! ", err);
    
})