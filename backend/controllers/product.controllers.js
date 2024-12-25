import Product from "../models/product.models.js";



export const createProducts = async (req, res) => {
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
};



  export const deleteProducts = async (req, res) => {
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
};


  export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error fetching products" });
    }
};


  export const updateProducts = async (req, res) => {
    const id = req.params.id;
    const product = req.body;
  
    // if(!mongoose.Types.ObjectId.isValid){
    //   return res.status(404).json({success: false, message: "Invalid id"});
    // }
  
  
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
};