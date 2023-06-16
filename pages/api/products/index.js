// pages/api/products/index.js
import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const products = await Product.find({});
      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  return response.status(404).json({ error: "Not Found" });
}
