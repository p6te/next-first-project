import Link from "next/link";
import Heading from "@/components/Heading";
import { getReview, getReviews } from "@/lib/reviews";

interface ReviewPageParams {
  slug: string;
}

export const metadata = {
  title: "Reviews",
};

const ReviewsPage: React.FC = async () => {
  const reviews = await getReviews();
  return (
    <div>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
            key={review.title}
          >
            <Link href={`/reviews/${review.slug}`}>
              <img
                src={review.image}
                alt=""
                width="320"
                height="180"
                className="rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
