import Heading from "@/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";
import type { Metadata } from "next";

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

const ReviewPage = async ({ params: { slug } }: ReviewPageProps) => {
  const { body, date, image, title } = await getReview(slug);

  return (
    <div>
      <Heading>{title}</Heading>
      <p className="italic pb-2">{date}</p>
      <img
        src={image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </div>
  );
};

export default ReviewPage;
