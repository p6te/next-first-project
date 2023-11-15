import Link from "next/link";

const ReviewsPage: React.FC = () => {
  return (
    <div>
      reviews
      <nav>
        <ul>
          <li>
            <Link href={"/reviews/hollow-knight"}>Hollow Knight</Link>
          </li>
          <li>
            <Link href={"/reviews/stardew-valley"}>Stardew Valley</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ReviewsPage;
