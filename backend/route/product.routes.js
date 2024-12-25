import express from 'express';

import { createProducts, deleteProducts, getProducts, updateProducts } from '../controllers/product.controllers.js';

const router = express.Router();


router.post("/create", createProducts)
router.delete("/delete/:id", deleteProducts)
router.get("/", getProducts)
router.put("/update/:id", updateProducts)





export default router;