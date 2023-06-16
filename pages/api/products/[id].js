// pages/api/products/[id].js
import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { id } = request.query;

    try {
      const product = await Product.findById(id);

      if (!product) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(product);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  return response.status(404).json({ error: "Not Found" });
}
