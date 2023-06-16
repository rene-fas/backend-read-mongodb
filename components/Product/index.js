import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data: productData, error: productError } = useSWR(
    `/api/products/${id}`
  );
  const { data: reviewsData, error: reviewsError } = useSWR(`/api/reviews`);

  if (productError || reviewsError) {
    return <h1>Error loading data</h1>;
  }

  if (!productData || !reviewsData) {
    return <h1>Loading...</h1>;
  }

  const {
    name,
    description,
    price,
    currency,
    reviews: productReviews,
  } = productData;
  const productReviewsIds = productReviews.map((review) =>
    review._id.toString()
  ); // Update this line

  console.log("Product Reviews IDs:", productReviewsIds);
  console.log("Reviews Data:", reviewsData);

  const filteredReviews = reviewsData.reviews
    ? reviewsData.reviews.filter((review) =>
        productReviewsIds.includes(review._id.toString())
      )
    : [];

  console.log("Filtered Reviews:", filteredReviews);

  return (
    <ProductCard>
      <h2>{name}</h2>
      <p>Description: {description}</p>
      <p>
        Price: {price} {currency}
      </p>
      <h3>Reviews:</h3>
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review) => (
          <div key={review._id}>
            <h4>{review.title}</h4>
            <p>{review.text}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
