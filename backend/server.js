import express from "express";
import { connectDB } from "../config/db.js";


import productsRoutes from './route/product.routes.js'

const app = express();
app.use(express.json());


app.use("/api/products", productsRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("conected to db");
});
