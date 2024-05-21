import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import config from "./app/config";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// const mongoURI = process.env.MONGODB_URI;

app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(config.database_url as string, {})
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
