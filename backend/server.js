import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import cloudinaryMulterRoutes from "./routes/cloudinaryMulterRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);
// we can use local storage to store uploaded image, if we dont't want to
// use cloudinary cloud storage

// app.use("/api/upload", cloudinaryRoutes);
// this uses cloudinary cloud storage, but with multer-storage-cloudinary
// package, which is currently being removed from the project.

app.use("/api/upload", cloudinaryMulterRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // app.use("/uploads", express.static("/var/data/uploads"));
  // this is for cloudinaryRoutes.js
  // app.use("/uploads", express.static("/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  // app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  // this is for cloudinaryRoutes.js
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
