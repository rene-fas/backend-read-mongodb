import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";
import Review from "../../../db/models/Review";

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id).populate("reviews");
        if (!product) {
          return response.status(404).json({ status: "Not Found" });
        }
        response.status(200).json(product);
      } catch (error) {
        response.status(500).json({ error: "Server Error" });
      }
      break;
    default:
      response.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
