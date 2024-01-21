// Retrieves all products.
export const getProducts = async (req, res) => {
  // Set the response status to 200 and send a JSON object with the message "All Products".
  res.status(200).json({
    message: "All Products",
  });
};
