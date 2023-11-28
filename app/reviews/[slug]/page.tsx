import Image from "next/image";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/shareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";
import { notFound } from "next/navigation";

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
  if (!review) {
    notFound();
  }

  return {
    title: review.title,
  };
}

const ReviewPage = async ({ params: { slug } }: ReviewPageProps) => {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }

  const { body, date, image, title, subtitle } = review;

  return (
    <div>
      <Heading>{title}</Heading>
      <p className="font-semibold pb-3">{subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
        priority
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </div>
  );
};

export default ReviewPage;
