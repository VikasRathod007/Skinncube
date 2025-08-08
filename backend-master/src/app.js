import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
// imports for storage on local host
import path from "path"
import { fileURLToPath } from 'url';
// end imports for local storage

const app = express()

// Enable CORS
app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }));
app.use(morgan("dev"))
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))


// code for using public folder to react server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
// end

app.use(express.json({limit: "26kb"}))
app.use(express.urlencoded({extended: true, limit: "26kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import userRouter from './routes/user.routes.js'
import pharmacyRouter from './routes/pharmacy.routes.js'
import subcategoryRouter from './routes/subcategory.routes.js'
import categoryRouter from './routes/category.routes.js'
import labelRouter from './routes/labels.routes.js'
import medicineRouter from './routes/medicine.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
// routes declaration

// User
app.use("/api/v1/users", userRouter)

// Pharmacy
app.use("/api/v1/pharmacy", pharmacyRouter)

// Category
app.use("/api/v1/category", categoryRouter)

// Subcategory
app.use("/api/v1/subcategory", subcategoryRouter)

// Labels
app.use("/api/v1/labels", labelRouter)

// Medicine
app.use("/api/v1/medicine", medicineRouter)

// Cart
app.use("/api/v1/cart", cartRouter)

// Order
app.use("/api/v1/order", orderRouter)


export { app }