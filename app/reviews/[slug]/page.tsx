import Image from "next/image";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/shareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";
import { notFound } from "next/navigation";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import CommentListSkeleton from "@/components/CommentListSekeleton";

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
      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
        <h2 className="font-bold flex gap-2 items-center text-xl">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
        <CommentForm slug={slug} title={review.title} />
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList slug={slug} />
        </Suspense>
      </section>
    </div>
  );
};

export default ReviewPage;
