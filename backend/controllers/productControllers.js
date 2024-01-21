import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  // Set the response status to 200 and send a JSON object with the message "All Products".
  res.status(200).json({
    message: "All Products",
  });
};

// Create new Product   =>  /api/v1/admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
};
