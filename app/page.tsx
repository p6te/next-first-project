import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";

const HomePage: React.FC = async () => {
  const { image, slug, title } = await getFeaturedReview();

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <div
        className="bg-white border rounded shadow w-80
                      hover:shadow-xl sm:w-full"
      >
        <Link href={`/reviews/${slug}`} className="flex flex-col sm:flex-row">
          <img
            src={image}
            alt=""
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
            {title}
          </h2>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
