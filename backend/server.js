import express from "express";
import { connectDB } from "../config/db.js";
import Product from "./models/product.models.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "product created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error creating product" });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting product" });
  }
});

app.get("/api/all-products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
});

app.put("/api/update/:id", async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  if(!mongoose.Types.ObjectId.isValid){
    return res.status(404).json({success: false, message: "Invalid id"});
  }


  try {
   const updatedProducts =  await Product.findByIdAndUpdate(id, product, { new: true });
    res
      .status(200)
      .json({ success: true, message: "product updated successfully", data: updatedProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating product" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("conected to db");
});
