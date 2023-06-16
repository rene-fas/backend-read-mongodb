import dbConnect from "../../../db/connect";
import Review from "../../../db/models/Review";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await dbConnect();

    const reviews = await Review.find({ productId: id });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
