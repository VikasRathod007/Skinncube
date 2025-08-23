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
  origin: `${process.env.FRONT_END}`,
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

// Configure static file serving with proper MIME types
app.use('/public', express.static(path.join(__dirname, '..', 'public'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();

    // Set proper MIME types for images
    if (ext === '.webp') {
      res.setHeader('Content-Type', 'image/webp');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (ext === '.png') {
      res.setHeader('Content-Type', 'image/png');
    } else if (ext === '.gif') {
      res.setHeader('Content-Type', 'image/gif');
    } else if (ext === '.svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
    }

    // Set cache headers for images
    if (ext.match(/\.(webp|jpg|jpeg|png|gif|svg)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for images
    }
  }
}));

app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: true, limit: "2mb" }))
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
import blogRouter from './routes/blog.routes.js'
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

// Blog
app.use("/api/v1/blog", blogRouter)

export { app }